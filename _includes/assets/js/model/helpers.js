{% comment %}
/**
 * Helper functions to be used in indicatorModel.js.
 *
 * Notes on parameters - here are some details on common parameters in the
 * methods throughout these files:
 * - Rows: This is an array of objects representing data. For example:
 *   [
 *     {Year: 2015, Value: 1},
 *     {Year: 2016, Value: 2}
 *   ]
 * - Field names: This is a flat array of strings. For example: ['Location', 'Sex']
 * - Field items: This is an array of objects representing fields. For example:
 *   [
 *     {field: 'Location', values: ['Rural', 'Urban']},
 *     {field: 'Sex', values: ['Female', 'Male']}
 *   ]
 * - Field item states: This is an array of object similar to "Field items",
 *   but with extra information. For example:
 *   [
 *     {
 *       field: 'Location',
 *       hasData: true,
 *       values: [
 *         {
 *           value: 'Rural',
 *           hasData: true
 *         }
 *       ]
 *     }
 *   ]
 * - Edges: An array of objects containing 'From' and 'To'. For example:
 *   [
 *     { From: 'Location', To: 'Sex' },
 *     { From: 'Location', To: 'Age' }
 *   ]
 */
{% endcomment %}
(function() {

  {% include assets/js/model/constants.js %}
  {% include assets/js/model/utils.js %}
  var arrayMove = deprecated('utils.arrayMove');
  {% include assets/js/model/unitHelpers.js %}
  {% include assets/js/model/seriesHelpers.js %}
  {% include assets/js/model/fieldHelpers.js %}
  {% include assets/js/model/chartHelpers.js %}
  {% include assets/js/model/tableHelpers.js %}
  {% include assets/js/model/dataHelpers.js %}

  function deprecated(name) {
    return function() {
      console.log('The ' + name + ' function has been removed. Please update any overridden files.');
    }
  }

  return {
    UNIT_COLUMN: UNIT_COLUMN,
    SERIES_COLUMN: SERIES_COLUMN,
    GEOCODE_COLUMN: GEOCODE_COLUMN,
    YEAR_COLUMN: YEAR_COLUMN,
    VALUE_COLUMN: VALUE_COLUMN,
    SERIES_TOGGLE: SERIES_TOGGLE,
    GRAPH_TITLE_FROM_SERIES: GRAPH_TITLE_FROM_SERIES,
    CHARTJS_3: CHARTJS_3,
    convertJsonFormatToRows: convertJsonFormatToRows,
    getUniqueValuesByProperty: getUniqueValuesByProperty,
    dataHasUnits: dataHasUnits,
    dataHasGeoCodes: dataHasGeoCodes,
    dataHasSerieses: dataHasSerieses,
    getFirstUnitInData: getFirstUnitInData,
    getFirstSeriesInData: getFirstSeriesInData,
    getDataByUnit: getDataByUnit,
    getDataBySeries: getDataBySeries,
    getDataBySelectedFields: getDataBySelectedFields,
    getUnitFromStartValues: getUnitFromStartValues,
    getSeriesFromStartValues: getSeriesFromStartValues,
    selectFieldsFromStartValues: selectFieldsFromStartValues,
    selectMinimumStartingFields: selectMinimumStartingFields,
    fieldsUsedByUnit: fieldsUsedByUnit,
    fieldsUsedBySeries: fieldsUsedBySeries,
    dataHasUnitSpecificFields: dataHasUnitSpecificFields,
    dataHasSeriesSpecificFields: dataHasSeriesSpecificFields,
    getInitialFieldItemStates: getInitialFieldItemStates,
    validParentsByChild: validParentsByChild,
    getFieldNames: getFieldNames,
    getInitialAllowedFields: getInitialAllowedFields,
    prepareData: prepareData,
    getHeadline: getHeadline,
    sortData: sortData,
    getHeadlineTable: getHeadlineTable,
    removeOrphanSelections: removeOrphanSelections,
    getAllowedFieldsWithChildren: getAllowedFieldsWithChildren,
    getUpdatedFieldItemStates: getUpdatedFieldItemStates,
    fieldItemStatesForView: fieldItemStatesForView,
    getChartTitle: getChartTitle,
    getChartType: getChartType,
    getCombinationData: getCombinationData,
    getDatasets: getDatasets,
    tableDataFromDatasets: tableDataFromDatasets,
    sortFieldNames: typeof sortFieldNames !== 'undefined' ? sortFieldNames : function() {},
    sortFieldValueNames: typeof sortFieldValueNames !== 'undefined' ? sortFieldValueNames : function() {},
    getPrecision: getPrecision,
    getGraphLimits: getGraphLimits,
    getGraphAnnotations: getGraphAnnotations,
    getColumnsFromData: getColumnsFromData,
    inputEdges: inputEdges,
    getTimeSeriesAttributes: getTimeSeriesAttributes,
    inputData: inputData,
    // Backwards compatibility.
    footerFields: deprecated('helpers.footerFields'),
  }
})();
