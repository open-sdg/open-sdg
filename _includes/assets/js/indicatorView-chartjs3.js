var indicatorView = function (model, options) {

    "use strict";

    var MODEL = model,
        VIEW = this,
        OPTIONS = options;

    var helpers = {% include assets/js/view/helpers.js %}

    VIEW._chartInstance = undefined;
    VIEW._tableColumnDefs = OPTIONS.tableColumnDefs;
    VIEW._mapView = undefined;
    VIEW._legendElement = OPTIONS.legendElement;
    VIEW._precision = undefined;
    VIEW._chartInstances = {};

    var chartHeight = screen.height < OPTIONS.maxChartHeight ? screen.height : OPTIONS.maxChartHeight;
    $('.plot-container', OPTIONS.rootElement).css('height', chartHeight + 'px');

    $(document).ready(function () {

        $(OPTIONS.rootElement).find('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            if ($(e.target).attr('href') == '#tableview') {
                setDataTableWidth($(OPTIONS.rootElement).find('#selectionsTable table'));
            } else {
                $($.fn.dataTable.tables(true)).css('width', '100%');
                $($.fn.dataTable.tables(true)).DataTable().columns.adjust().draw();
            }
        });

        // Execute the hide/show functionality for the sidebar, both on
        // the currently active tab, and each time a tab is clicked on.
        $('.data-view .nav-item.active .nav-link').each(toggleSidebar);
        $('.data-view .nav-link').on('click', toggleSidebar);
        function toggleSidebar() {
            var $sidebar = $('.indicator-sidebar'),
                $main = $('.indicator-main'),
                hideSidebar = $(this).data('no-disagg'),
                mobile = window.matchMedia("screen and (max-width: 990px)");
            if (hideSidebar) {
                $sidebar.addClass('indicator-sidebar-hidden');
                $main.addClass('indicator-main-full');
                // On mobile, this can be confusing, so we need to scroll to the tabs.
                if (mobile.matches) {
                    $([document.documentElement, document.body]).animate({
                        scrollTop: $("#indicator-main").offset().top - 40
                    }, 400);
                }
            }
            else {
                $sidebar.removeClass('indicator-sidebar-hidden');
                $main.removeClass('indicator-main-full');
            }
        };
    });

    MODEL.onDataComplete.attach(function (sender, args) {

        VIEW._precision = args.precision;

        if (MODEL.showData) {
            $('#dataset-size-warning')[args.datasetCountExceedsMax ? 'show' : 'hide']();
            if (!VIEW._chartInstance) {
                helpers.createPlot(args);
                helpers.setPlotEvents(args);
            } else {
                helpers.updatePlot(args);
            }
        }

        helpers.createSelectionsTable(args);
        helpers.updateChartTitle(args.chartTitle);
        helpers.updateSeriesAndUnitElements(args.selectedSeries, args.selectedUnit);
        helpers.updateUnitElements(args.selectedUnit);
        helpers.updateTimeSeriesAttributes(args.timeSeriesAttributes);
    });

    MODEL.onFieldsComplete.attach(function (sender, args) {

        helpers.initialiseFields(args);

        if (args.hasGeoData && args.showMap) {
            VIEW._mapView = new mapView();
            VIEW._mapView.initialise(args.indicatorId, args.precision, OPTIONS.decimalSeparator);
        }
    });

    MODEL.onUnitsComplete.attach(function (sender, args) {

        helpers.initialiseUnits(args);
    });

    if (MODEL.onSeriesesComplete) {

        MODEL.onSeriesesComplete.attach(function (sender, args) {
            helpers.initialiseSerieses(args);
        });
    }

    MODEL.onFieldsCleared.attach(function (sender, args) {

        $(OPTIONS.rootElement).find(':checkbox').prop('checked', false);
        $(OPTIONS.rootElement).find('#clear')
            .addClass('disabled')
            .attr('aria-disabled', 'true')
            .attr('disabled', 'disabled');

        // reset available/unavailable fields
        helpers.updateWithSelectedFields();

        $(OPTIONS.rootElement).find('.selected').css('width', '0');
    });

    MODEL.onSelectionUpdate.attach(function (sender, args) {

        if (args.selectedFields.length) {
            $(OPTIONS.rootElement).find('#clear')
                .removeClass('disabled')
                .attr('aria-disabled', 'false')
                .removeAttr('disabled');
        }
        else {
            $(OPTIONS.rootElement).find('#clear')
                .addClass('disabled')
                .attr('aria-disabled', 'true')
                .attr('disabled', 'disabled');
        }

        // loop through the available fields:
        $('.variable-selector').each(function (index, element) {
            var currentField = $(element).data('field');
            var element = $(OPTIONS.rootElement).find('.variable-selector[data-field="' + currentField + '"]');

            // is this an allowed field:
            if (args.allowedFields.includes(currentField)) {
                $(element).removeClass('disallowed');
                $(element).find('> button').removeAttr('aria-describedby');
            }
            else {
                $(element).addClass('disallowed');
                $(element).find('> button').attr('aria-describedby', 'variable-hint-' + currentField);
            }
        });
    });

    MODEL.onFieldsStatusUpdated.attach(function (sender, args) {

        _.each(args.data, function (fieldGroup) {
            _.each(fieldGroup.values, function (fieldItem) {
                var element = $(OPTIONS.rootElement).find(':checkbox[value="' + fieldItem.value + '"][data-field="' + fieldGroup.field + '"]');
                element.parent().addClass(fieldItem.state).attr('data-has-data', fieldItem.hasData);
            });
            // Indicate whether the fieldGroup had any data.
            var fieldGroupElement = $(OPTIONS.rootElement).find('.variable-selector[data-field="' + fieldGroup.field + '"]');
            fieldGroupElement.attr('data-has-data', fieldGroup.hasData);
            var fieldGroupButton = fieldGroupElement.find('> button'),
                describedByCurrent = fieldGroupButton.attr('aria-describedby') || '',
                noDataHintId = 'no-data-hint-' + fieldGroup.field.replace(/ /g, '-');
            if (!fieldGroup.hasData && !describedByCurrent.includes(noDataHintId)) {
                fieldGroupButton.attr('aria-describedby', describedByCurrent + ' ' + noDataHintId);
            }
            else {
                fieldGroupButton.attr('aria-describedby', describedByCurrent.replace(noDataHintId, ''));
            }

            // Re-sort the items.
            helpers.sortFieldGroup(fieldGroupElement);
        });
    });

    $(OPTIONS.rootElement).on('click', '#clear', function () {
        MODEL.clearSelectedFields();
    });

    $(OPTIONS.rootElement).on('click', '#fields label', function (e) {

        if (!$(this).closest('.variable-selector').hasClass('disallowed')) {
            $(this).find(':checkbox').trigger('click');
        }

        e.preventDefault();
        e.stopPropagation();
    });

    $(OPTIONS.rootElement).on('change', '#units input', function () {
        MODEL.updateSelectedUnit($(this).val());
    });

    $(OPTIONS.rootElement).on('change', '#serieses input', function () {
        MODEL.updateSelectedSeries($(this).val());
    });

    $(OPTIONS.rootElement).on('click', '.variable-options button', function (e) {
        var type = $(this).data('type');
        var $options = $(this).closest('.variable-options').find(':checkbox');

        // The clear button can clear all checkboxes.
        if (type == 'clear') {
            $options.prop('checked', false);
        }
        // The select button must only select checkboxes that have data.
        if (type == 'select') {
            $options.parent().not('[data-has-data=false]').find(':checkbox').prop('checked', true)
        }

        helpers.updateWithSelectedFields();
        e.stopPropagation();
    });

    $(OPTIONS.rootElement).on('click', ':checkbox', function (e) {

        // don't permit disallowed selections:
        if ($(this).closest('.variable-selector').hasClass('disallowed')) {
            return;
        }

        helpers.updateWithSelectedFields();
        e.stopPropagation();
    });

    $(OPTIONS.rootElement).on('click', '.variable-selector', function (e) {

        var $button = $(e.target).closest('button');
        var $options = $(this).find('.variable-options');

        if ($options.is(':visible')) {
            $options.hide();
            $button.attr('aria-expanded', 'false');
        }
        else {
            $options.show();
            $button.attr('aria-expanded', 'true');
        }

        e.stopPropagation();
    });
};
