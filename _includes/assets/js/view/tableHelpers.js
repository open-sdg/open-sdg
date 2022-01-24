/**
 * @param {Object} config
 * @param {Object} info
 * @return null
 */
function alterTableConfig(config, info) {
    opensdg.tableConfigAlterations.forEach(function (callback) {
        callback(config, info);
    });
}

/**
 * @param {Object} tableData
 * @return {String}
 */
function toCsv(tableData) {
    var lines = [],
        headings = _.map(tableData.headings, function (heading) { return '"' + translations.t(heading) + '"'; });

    lines.push(headings.join(','));

    _.each(tableData.data, function (dataValues) {
        var line = [];

        _.each(headings, function (heading, index) {
            line.push(dataValues[index]);
        });

        lines.push(line.join(','));
    });

    return lines.join('\n');
}

/**
 * @param {Element} el
 * @param {Object} info
 * @return null
 */
function initialiseDataTable(el, info) {
    var nonYearColumns = [];
    for (var i = 1; i < info.table.headings.length; i++) {
        nonYearColumns.push(i);
    }
    var datatables_options = OPTIONS.datatables_options || {
        paging: false,
        bInfo: false,
        bAutoWidth: false,
        searching: false,
        responsive: false,
        order: [[0, 'asc']],
        columnDefs: [
            {
                targets: nonYearColumns,
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).text(alterDataDisplay(cellData, rowData, 'table cell'));
                },
            },
        ],
    }, table = $(el).find('table');

    datatables_options.aaSorting = [];

    alterTableConfig(datatables_options, info);
    table.DataTable(datatables_options);
    table.removeAttr('role');
    table.find('thead th').removeAttr('rowspan').removeAttr('colspan').removeAttr('aria-label');
    setDataTableWidth(table);
};

/**
 * @param {Object} chartInfo
 * @return null
 */
function createSelectionsTable(chartInfo) {
    createTable(chartInfo.selectionsTable, chartInfo.indicatorId, '#selectionsTable', true);
    $('#tableSelectionDownload').empty();
    createTableTargetLines(chartInfo.graphAnnotations);
    createDownloadButton(chartInfo.selectionsTable, 'Table', chartInfo.indicatorId, '#tableSelectionDownload');
    createSourceButton(chartInfo.shortIndicatorId, '#tableSelectionDownload');
    createIndicatorDownloadButtons(chartInfo.indicatorDownloads, chartInfo.shortIndicatorId, '#tableSelectionDownload');
};

/**
 * @param {Array} graphAnnotations
 * @return null
 */
function createTableTargetLines(graphAnnotations) {
    var targetLines = graphAnnotations.filter(function (a) { return a.preset === 'target_line'; });
    var $targetLines = $('#tableTargetLines');
    $targetLines.empty();
    targetLines.forEach(function (targetLine) {
        var targetLineLabel = targetLine.label.content;
        if (!targetLineLabel) {
            targetLineLabel = opensdg.annotationPresets.target_line.label.content;
        }
        $targetLines.append('<dt>' + targetLineLabel + '</dt><dd>' + targetLine.value + '</dd>');
    });
    if (targetLines.length === 0) {
        $targetLines.hide();
    }
    else {
        $targetLines.show();
    }
}

/**
 * @param {Object} table
 * @return bool
 */
function tableHasData(table) {
    for (var i = 0; i < table.data.length; i++) {
        if (table.data[i].length > 1) {
            return true;
        }
    }
    return false;
}

/**
 * @param {Object} table
 * @param {String} indicatorId
 * @param {Element} el
 * @return null
 */
function createTable(table, indicatorId, el) {

    var table_class = OPTIONS.table_class || 'table table-hover';

    // clear:
    $(el).html('');

    if (table && tableHasData(table)) {
        var currentTable = $('<table />').attr({
            'class': table_class,
            'width': '100%'
        });

        currentTable.append('<caption>' + MODEL.chartTitle + '</caption>');

        var table_head = '<thead><tr>';

        var getHeading = function (heading, index) {
            var arrows = '<span class="sort"><i class="fa fa-sort-down"></i><i class="fa fa-sort-up"></i></span>';
            var button = '<span tabindex="0" role="button" aria-describedby="column-sort-info">' + translations.t(heading) + '</span>';
            return (!index) ? button + arrows : arrows + button;
        };

        table.headings.forEach(function (heading, index) {
            table_head += '<th' + (!index ? '' : ' class="table-value"') + ' scope="col">' + getHeading(heading, index) + '</th>';
        });

        table_head += '</tr></thead>';
        currentTable.append(table_head);
        currentTable.append('<tbody></tbody>');

        table.data.forEach(function (data) {
            var row_html = '<tr>';
            table.headings.forEach(function (heading, index) {
                // For accessibility set the Year column to a "row" scope th.
                var isYear = (index == 0);
                var cell_prefix = (isYear) ? '<th scope="row"' : '<td';
                var cell_suffix = (isYear) ? '</th>' : '</td>';
                row_html += cell_prefix + (isYear ? '' : ' class="table-value"') + '>' + (data[index] !== null && data[index] !== undefined ? data[index] : '-') + cell_suffix;
            });
            row_html += '</tr>';
            currentTable.find('tbody').append(row_html);
        });

        $(el).append(currentTable);

        // initialise data table and provide some info for alterations.
        var alterationInfo = {
            table: table,
            indicatorId: indicatorId,
        };
        initialiseDataTable(el, alterationInfo);

        $(el).removeClass('table-has-no-data');
        $('#selectionTableFooter').show();

        $(el).find('th')
            .removeAttr('tabindex')
            .click(function () {
                var sortDirection = $(this).attr('aria-sort');
                $(this).find('span[role="button"]').attr('aria-sort', sortDirection);
            });
    } else {
        $(el).append($('<h3 />').text(translations.indicator.data_not_available));
        $(el).addClass('table-has-no-data');
        $('#selectionTableFooter').hide();
    }
}

/**
 * @param {Object} table
 * @return null
 */
function setDataTableWidth(table) {
    table.find('thead th').each(function () {
        var textLength = $(this).text().length;
        for (var loop = 0; loop < VIEW._tableColumnDefs.length; loop++) {
            var def = VIEW._tableColumnDefs[loop];
            if (textLength < def.maxCharCount) {
                if (!def.width) {
                    $(this).css('white-space', 'nowrap');
                } else {
                    $(this).css('width', def.width + 'px');
                    $(this).data('width', def.width);
                }
                break;
            }
        }
    });

    table.removeAttr('style width');

    var totalWidth = 0;
    table.find('thead th').each(function () {
        if ($(this).data('width')) {
            totalWidth += $(this).data('width');
        } else {
            totalWidth += $(this).width();
        }
    });

    // ascertain whether the table should be width 100% or explicit width:
    var containerWidth = table.closest('.dataTables_wrapper').width();

    if (totalWidth > containerWidth) {
        table.css('width', totalWidth + 'px');
    } else {
        table.css('width', '100%');
    }
}

/**
 * @param {Object} table
 * @return null
 */
function updateChartDownloadButton(table) {
    if (typeof VIEW._chartDownloadButton !== 'undefined') {
        var tableCsv = toCsv(table);
        var blob = new Blob([tableCsv], {
            type: 'text/csv'
        });
        var fileName = VIEW._chartDownloadButton.attr('download');
        if (window.navigator && window.navigator.msSaveBlob) {
            // Special behavior for IE.
            VIEW._chartDownloadButton.off('click.openSdgDownload')
            VIEW._chartDownloadButton.on('click.openSdgDownload', function (event) {
                window.navigator.msSaveBlob(blob, fileName);
            });
        }
        else {
            VIEW._chartDownloadButton
                .attr('href', URL.createObjectURL(blob))
                .data('csvdata', tableCsv);
        }
    }
}
