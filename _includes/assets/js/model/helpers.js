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
  {% include assets/js/model/unitHelpers.js %}
  {% include assets/js/model/fieldHelpers.js %}
  {% include assets/js/model/chartHelpers.js %}
  {% include assets/js/model/tableHelpers.js %}
  {% include assets/js/model/dataHelpers.js %}

  return {
    UNIT_COLUMN: UNIT_COLUMN,
    GEOCODE_COLUMN: GEOCODE_COLUMN,
    YEAR_COLUMN: YEAR_COLUMN,
    VALUE_COLUMN: VALUE_COLUMN,
    convertJsonFormatToRows: convertJsonFormatToRows,
    getUniqueValuesByProperty: getUniqueValuesByProperty,
    dataHasUnits: dataHasUnits,
    dataHasGeoCodes: dataHasGeoCodes,
    getFirstUnitInData: getFirstUnitInData,
    getDataByUnit: getDataByUnit,
    getDataBySelectedFields: getDataBySelectedFields,
    getUnitFromStartValues: getUnitFromStartValues,
    selectFieldsFromStartValues: selectFieldsFromStartValues,
    selectMinimumStartingFields: selectMinimumStartingFields,
    fieldsUsedByUnit: fieldsUsedByUnit,
    dataHasUnitSpecificFields: dataHasUnitSpecificFields,
    getInitialFieldItemStates: getInitialFieldItemStates,
    validParentsByChild: validParentsByChild,
    getFieldNames: getFieldNames,
    getInitialAllowedFields: getInitialAllowedFields,
    prepareData: prepareData,
    footerFields: footerFields,
    getHeadline: getHeadline,
    sortData: sortData,
    getHeadlineTable: getHeadlineTable,
    removeOrphanSelections: removeOrphanSelections,
    getAllowedFieldsWithChildren: getAllowedFieldsWithChildren,
    getUpdatedFieldItemStates: getUpdatedFieldItemStates,
    fieldItemStatesForView: fieldItemStatesForView,
    getChartTitle: getChartTitle,
    getCombinationData: getCombinationData,
    getDatasets: getDatasets,
    tableDataFromDatasets: tableDataFromDatasets,
    getValuesWithDataByField: getValuesWithDataByField,
    updateAvailableFieldValues: updateAvailableFieldValues,
  }
})();
