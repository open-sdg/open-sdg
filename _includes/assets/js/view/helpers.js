{% comment %}
/**
 * Helper functions to be used in indicatorView.js.
 */
{% endcomment %}
(function() {

  {% include assets/js/view/constants.js %}
  {% include assets/js/view/fieldHelpers.js %}
  {% include assets/js/view/unitHelpers.js %}
  {% include assets/js/view/seriesHelpers.js %}
  {% include assets/js/view/chartHelpers.js %}
  {% include assets/js/view/chartTypeBase.js %}
  {% include assets/js/view/chartTypeLine.js %}
  {% include assets/js/view/chartTypeBar.js %}
  {% include assets/js/view/chartTypeBinary.js %}
  {% include assets/js/view/tableHelpers.js %}
  {% include assets/js/view/dataHelpers.js %}
  {% include assets/js/view/utils.js %}

  return {
    HIDE_SINGLE_SERIES: HIDE_SINGLE_SERIES,
    HIDE_SINGLE_UNIT: HIDE_SINGLE_UNIT,
    initialiseFields: initialiseFields,
    initialiseUnits: initialiseUnits,
    initialiseSerieses: initialiseSerieses,
    alterChartConfig: alterChartConfig,
    alterTableConfig: alterTableConfig,
    alterDataDisplay: alterDataDisplay,
    updateChartTitle: updateChartTitle,
    updateWithSelectedFields: updateWithSelectedFields,
    updateSeriesAndUnitElements: updateSeriesAndUnitElements,
    updateUnitElements: updateUnitElements,
    updateTimeSeriesAttributes: updateTimeSeriesAttributes,
    updatePlot: updatePlot,
    isHighContrast: isHighContrast,
    getHeadlineColor: getHeadlineColor,
    getGridColor: getGridColor,
    getTickColor: getTickColor,
    updateHeadlineColor: updateHeadlineColor,
    createPlot: createPlot,
    setPlotEvents: setPlotEvents,
    toCsv: toCsv,
    createIndicatorDownloadButtons: createIndicatorDownloadButtons,
    createSourceButton: createSourceButton,
    createDownloadButton: createDownloadButton,
    createSelectionsTable: createSelectionsTable,
    sortFieldGroup: sortFieldGroup,
  }
})();
