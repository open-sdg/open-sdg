var indicatorInit = function () {
    if ($('#indicatorData').length) {
        var domData = $('#indicatorData').data();

        if (domData.showdata) {

            $('.async-loading').each(function (i, obj) {
                $(obj).append($('<img />').attr('src', $(obj).data('img')).attr('alt', translations.indicator.loading));
            });

            var remoteUrl = '/comb/' + domData.id + '.json';
            if (opensdg.remoteDataBaseUrl !== '/') {
                remoteUrl = opensdg.remoteDataBaseUrl + remoteUrl;
            }

            $.ajax({
                url: remoteUrl,
                success: function (res) {

                    $('.async-loading').remove();
                    $('.async-loaded').show();

                    var model = new indicatorModel({
                        data: res.data,
                        edgesData: res.edges,
                        showMap: domData.showmap,
                        country: domData.country,
                        indicatorId: domData.indicatorid,
                        shortIndicatorId: domData.id,
                        chartTitle: domData.charttitle,
                        chartTitles: domData.charttitles,
                        measurementUnit: domData.measurementunit,
                        xAxisLabel: domData.xaxislabel,
                        showData: domData.showdata,
                        graphType: domData.graphtype,
                        graphTypes: domData.graphtypes,
                        startValues: domData.startvalues,
                        graphLimits: domData.graphlimits,
                        stackedDisaggregation: domData.stackeddisaggregation,
                        graphAnnotations: domData.graphannotations,
                        graphTargetLines: domData.graphtargetlines,
                        graphSeriesBreaks: domData.graphseriesbreaks,
                        indicatorDownloads: domData.indicatordownloads,
                        dataSchema: domData.dataschema,
                        compositeBreakdownLabel: domData.compositebreakdownlabel,
                        precision: domData.precision,
                    });
                    var view = new indicatorView(model, {
                        rootElement: '#indicatorData',
                        legendElement: '#plotLegend',
                        decimalSeparator: '{{ site.decimal_separator }}',
                        maxChartHeight: 420,
                        tableColumnDefs: [
                            { maxCharCount: 25 }, // nowrap
                            { maxCharCount: 35, width: 200 },
                            { maxCharCount: Infinity, width: 250 }
                        ]
                    });
                    var controller = new indicatorController(model, view);
                    controller.initialise();
                }
            });
        }
    }
};
