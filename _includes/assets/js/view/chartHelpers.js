/**
 * @param {Object} config
 * @param {Object} info
 * @return null
 */
function alterChartConfig(config, info) {
    opensdg.chartConfigAlterations.forEach(function (callback) {
        callback(config, info);
    });
}

/**
 * @param {String} chartTitle
 * @return null
 */
function updateChartTitle(chartTitle) {
    if (typeof chartTitle !== 'undefined') {
        $('.chart-title').text(chartTitle);
    }
}

/**
 * @param {Object} chartInfo
 * @return null
 */
function updatePlot(chartInfo) {
    updateIndicatorDataViewStatus(VIEW._chartInstance.data.datasets, chartInfo.datasets);
    VIEW._chartInstance.data.datasets = chartInfo.datasets;
    VIEW._chartInstance.data.labels = chartInfo.labels;
    this.updateHeadlineColor(this.isHighContrast() ? 'high' : 'default', VIEW._chartInstance);
    // TODO: Investigate assets/js/chartjs/rescaler.js and why "allLabels" is needed.
    VIEW._chartInstance.data.allLabels = chartInfo.labels;

    if (chartInfo.selectedUnit) {
        VIEW._chartInstance.options.scales.yAxes[0].scaleLabel.labelString = translations.t(chartInfo.selectedUnit);
    }

    // Create a temp object to alter, and then apply. We go to all this trouble
    // to avoid completely replacing VIEW._chartInstance -- and instead we
    // just replace it's properties: "type", "data", and "options".
    var updatedConfig = {
        type: VIEW._chartInstance.type,
        data: VIEW._chartInstance.data,
        options: VIEW._chartInstance.options
    }
    alterChartConfig(updatedConfig, chartInfo);
    VIEW._chartInstance.type = updatedConfig.type;
    VIEW._chartInstance.data = updatedConfig.data;
    VIEW._chartInstance.options = updatedConfig.options;

    VIEW._chartInstance.update(1000, true);

    $(VIEW._legendElement).html(VIEW._chartInstance.generateLegend());
    updateChartDownloadButton(chartInfo.selectionsTable);
};

/**
 * @param {Array} oldDatasets
 * @param {Array} newDatasets
 * @return null
 */
function updateIndicatorDataViewStatus(oldDatasets, newDatasets) {
    var status = '',
        hasData = newDatasets.length > 0,
        dataAdded = newDatasets.length > oldDatasets.length,
        dataRemoved = newDatasets.length < oldDatasets.length,
        getDatasetLabel = function (dataset) { return dataset.label; },
        oldLabels = oldDatasets.map(getDatasetLabel),
        newLabels = newDatasets.map(getDatasetLabel);

    if (!hasData) {
        status = translations.indicator.announce_data_not_available;
    }
    else if (dataAdded) {
        status = translations.indicator.announce_data_added;
        var addedLabels = [];
        newLabels.forEach(function (label) {
            if (!oldLabels.includes(label)) {
                addedLabels.push(label);
            }
        });
        status += ' ' + addedLabels.join(', ');
    }
    else if (dataRemoved) {
        status = translations.indicator.announce_data_removed;
        var removedLabels = [];
        oldLabels.forEach(function (label) {
            if (!newLabels.includes(label)) {
                removedLabels.push(label);
            }
        });
        status += ' ' + removedLabels.join(', ');
    }

    var current = $('#indicator-data-view-status').text();
    if (current != status) {
        $('#indicator-data-view-status').text(status);
    }
}

/**
 * @param {String} contrast
 * @param {Object} chartInfo
 * @return null
 */
function updateHeadlineColor(contrast, chartInfo) {
    if (chartInfo.data.datasets.length > 0) {
        var firstDataset = chartInfo.data.datasets[0];
        var isHeadline = (typeof firstDataset.disaggregation === 'undefined');
        if (isHeadline) {
            var newColor = getHeadlineColor(contrast);
            firstDataset.backgroundColor = newColor;
            firstDataset.borderColor = newColor;
            firstDataset.pointBackgroundColor = newColor;
            firstDataset.pointBorderColor = newColor;
        }
    }
}

/**
 * @param {String} contrast
 * @return {String} The headline color in hex form.
 */
function getHeadlineColor(contrast) {
    return isHighContrast(contrast) ? '{{ site.graph_color_headline_high_contrast | default: "#FFDD00" }}' : '{{ site.graph_color_headline | default: "#00006a" }}';
}

/**
 * @param {String} contrast
 * @return {String} The grid color in hex form.
 */
function getGridColor(contrast) {
    return isHighContrast(contrast) ? '#222' : '#ddd';
};

/**
 * @param {String} contrast
 * @return {String} The tick color in hex form.
 */
function getTickColor(contrast) {
    return isHighContrast(contrast) ? '#fff' : '#000';
}

/**
 * @param {Object} chartInfo
 * @return null
 */
function createPlot(chartInfo) {

    var gridColor = getGridColor();
    var tickColor = getTickColor();

    var chartConfig = {
        type: MODEL.graphType,
        data: chartInfo,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            spanGaps: true,
            scrollX: true,
            scrollCollapse: true,
            sScrollXInner: '150%',
            scales: {
                xAxes: [{
                    maxBarThickness: 150,
                    gridLines: {
                        color: 'transparent',
                        zeroLineColor: '#757575',
                    },
                    ticks: {
                        fontColor: tickColor,
                    },
                    scaleLabel: {
                        display: MODEL.xAxisLabel ? true : false,
                        labelString: MODEL.xAxisLabel,
                        fontColor: tickColor,
                        fontSize: 14,
                        fontFamily: "'Open Sans', Helvetica, Arial, sans-serif",
                    }
                }],
                yAxes: [{
                    gridLines: {
                        color: gridColor,
                        zeroLineColor: '#757575',
                        drawBorder: false,
                    },
                    ticks: {
                        suggestedMin: 0,
                        fontColor: tickColor,
                        callback: function (value) {
                            return alterDataDisplay(value, undefined, 'chart y-axis tick');
                        },
                    },
                    scaleLabel: {
                        display: MODEL.selectedUnit ? translations.t(MODEL.selectedUnit) : MODEL.measurementUnit,
                        labelString: MODEL.selectedUnit ? translations.t(MODEL.selectedUnit) : MODEL.measurementUnit,
                        fontColor: tickColor,
                        fontSize: 14,
                        fontFamily: "'Open Sans', Helvetica, Arial, sans-serif",
                    }
                }]
            },
            legendCallback: function (chart) {
                var text = [];
                text.push('<h5 class="sr-only">' + translations.indicator.plot_legend_description + '</h5>');
                text.push('<ul id="legend" class="legend-for-' + chart.config.type + '-chart">');
                _.each(chart.data.datasets, function (dataset) {
                    text.push('<li>');
                    text.push('<span class="swatch' + (dataset.borderDash ? ' dashed' : '') + (dataset.headline ? ' headline' : '') + '" style="background-color: ' + dataset.borderColor + '">');
                    text.push('<span class="swatch-inner" style="background-color: ' + dataset.borderColor + '"></span>');
                    text.push('</span>');
                    text.push(translations.t(dataset.label));
                    text.push('</li>');
                });
                text.push('</ul>');
                return text.join('');
            },
            legend: {
                display: false
            },
            title: {
                display: false
            },
            plugins: {
                scaler: {}
            },
            tooltips: {
                backgroundColor: 'rgba(0,0,0,0.7)',
                callbacks: {
                    label: function (tooltipItems, data) {
                        return data.datasets[tooltipItems.datasetIndex].label + ': ' + alterDataDisplay(tooltipItems.yLabel, data, 'chart tooltip');
                    },
                    afterBody: function () {
                        var unit = MODEL.selectedUnit ? translations.t(MODEL.selectedUnit) : MODEL.measurementUnit;
                        if (typeof unit !== 'undefined' && unit !== '') {
                            return '\n' + translations.indicator.unit + ': ' + unit;
                        }
                    }
                }
            }
        }
    };
    alterChartConfig(chartConfig, chartInfo);
    if (isHighContrast()) {
        updateGraphAnnotationColors('high', chartConfig);
        updateHeadlineColor('high', chartConfig);
    }
    else {
        updateHeadlineColor('default', chartConfig);
    }

    VIEW._chartInstance = new Chart($(OPTIONS.rootElement).find('canvas'), chartConfig);

    window.addEventListener('contrastChange', function (e) {
        var gridColor = getGridColor(e.detail);
        var tickColor = getTickColor(e.detail);
        updateHeadlineColor(e.detail, VIEW._chartInstance);
        updateGraphAnnotationColors(e.detail, VIEW._chartInstance);
        VIEW._chartInstance.options.scales.yAxes[0].scaleLabel.fontColor = tickColor;
        VIEW._chartInstance.options.scales.yAxes[0].gridLines.color = gridColor;
        VIEW._chartInstance.options.scales.yAxes[0].ticks.fontColor = tickColor;
        VIEW._chartInstance.options.scales.xAxes[0].ticks.fontColor = tickColor;
        VIEW._chartInstance.update();
        $(VIEW._legendElement).html(VIEW._chartInstance.generateLegend());
    });

    Chart.pluginService.register({
        afterDraw: function (chart) {
            var $canvas = $(OPTIONS.rootElement).find('canvas'),
                font = '12px Arial',
                canvas = $canvas.get(0),
                ctx = canvas.getContext("2d");

            ctx.font = font;
            ctx.textAlign = 'left';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = '#6e6e6e';
        }
    });

    createDownloadButton(chartInfo.selectionsTable, 'Chart', chartInfo.indicatorId, '#chartSelectionDownload');
    createSourceButton(chartInfo.shortIndicatorId, '#chartSelectionDownload');
    createIndicatorDownloadButtons(chartInfo.indicatorDownloads, chartInfo.shortIndicatorId, '#chartSelectionDownload');

    $("#btnSave").click(function () {
        var filename = chartInfo.indicatorId + '.png',
            element = document.getElementById('chart-canvas'),
            footer = document.getElementById('selectionChartFooter'),
            height = element.clientHeight + 25 + ((footer) ? footer.clientHeight : 0),
            width = element.clientWidth + 25;
        var options = {
            // These options fix the height, width, and position.
            height: height,
            width: width,
            windowHeight: height,
            windowWidth: width,
            x: 0,
            y: 0,
            scrollX: 0,
            scrollY: 0,
            // Allow a chance to alter the screenshot's HTML.
            onclone: function (clone) {
                // Add a body class so that the screenshot style can be custom.
                clone.body.classList.add('image-download-in-progress');
            },
            // Decide which elements to skip.
            ignoreElements: function (el) {
                // Keep all style, head, and link elements.
                var keepTags = ['STYLE', 'HEAD', 'LINK'];
                if (keepTags.indexOf(el.tagName) !== -1) {
                    return false;
                }
                // Keep all elements contained by (or containing) the screenshot
                // target element.
                if (element.contains(el) || el.contains(element)) {
                    return false;
                }
                // Leave out everything else.
                return true;
            }
        };
        // First convert the target to a canvas.
        html2canvas(element, options).then(function (canvas) {
            // Then download that canvas as a PNG file.
            canvas.toBlob(function (blob) {
                saveAs(blob, filename);
            });
        });
    });

    $(VIEW._legendElement).html(VIEW._chartInstance.generateLegend());
};

/**
 * @param {String} contrast
 * @param {Object} chartInfo
 * @return null
 */
function updateGraphAnnotationColors(contrast, chartInfo) {
    if (chartInfo.options.annotation) {
        chartInfo.options.annotation.annotations.forEach(function (annotation) {
            if (contrast === 'default') {
                $.extend(true, annotation, annotation.defaultContrast);
            }
            else if (contrast === 'high') {
                $.extend(true, annotation, annotation.highContrast);
            }
        });
    }
}
