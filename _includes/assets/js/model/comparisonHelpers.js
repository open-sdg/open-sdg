/** 
* Model helper functions related to comparing national and global data.
 */

/**
 * @param {Array} selectedFields
 * @return {Array}
 */
function getCombinationDataForReportingTypeComparison(selectedFields) {
  var combinations = [
    {REPORTINGTYPE_COLUMN: REPORTINGTYPE_NATIONAL},
    {REPORTINGTYPE_COLUMN: REPORTINGTYPE_GLOBAL},
  ];
  if (selectedFields.length < 2) {
    // do nothing  
  } else {
    var selectedComparisonValue = selectedFields.filter(key => (key.field != 'Reporting type'))
    var field = selectedComparisonValue[0]['field'];
    var value = selectedComparisonValue[0]['values'][0];
    combinations.forEach(object => {object[field] = value;});
  }
  return combinations
}

/**
 * @param {Array} selectedComparisonValue
 * @return {Array}
 */
function updateSelectedFieldsFromSelectedComparisonValue(selectedComparisonValue) {

  var selectedFields = [
    {
      field: REPORTINGTYPE_COLUMN,
      values: [REPORTINGTYPE_NATIONAL, REPORTINGTYPE_GLOBAL]
    }
  ];
  var field = selectedComparisonValue.split("|")[0];
  var value = selectedComparisonValue.split("|")[1];
  if (value !== "total") {
    selectedFields.push({
	    field: field,
      values: [value]
    });
  }
  return selectedFields;
}

/**
 * @param {Array} columns
 * @return {boolean}
 */
function dataHasReportingTypes(columns) {
  return columns.includes(REPORTINGTYPE_COLUMN);
}

/**
 * @param {boolean} headlineHasGlobalReportingType
 * @param {boolean} fieldsHaveGlobalReportingType
 * @return {boolean} 
 */
function dataIsComparable(headlineIsComparable, fieldsAreComparable) {
	return headlineIsComparable || fieldsAreComparable
}

/**
 * @param {boolean} headlineHasGlobalData
 * @param {boolean} headlineHasNationalData
 * @return {boolean} 
 */
function headlineIsComparable(headlineHasGlobalData, headlineHasNationalData) {
  	return headlineHasGlobalData && headlineHasNationalData;
}

/**
 * @param {Array} headlineRows
 * @return {boolean} 
 */
function headlineHasNationalReportingType(headlineRows) {
	return headlineRows.some(function(row) {
  	return row[REPORTINGTYPE_COLUMN] === REPORTINGTYPE_NATIONAL;
  });
}

/**
 * @param {Array} headlineRows
 * @return {boolean} 
 */
function headlineHasGlobalReportingType(headlineRows) {
	return headlineRows.some(function(row) {
  	return row[REPORTINGTYPE_COLUMN] === REPORTINGTYPE_GLOBAL;
  });
}

/**
 * @param {Array} comparableFieldValues
 * @return {boolean} 
 */
function fieldsAreComparable(comparableFieldValues) {
 	return _.map(comparableFieldValues, 'values').some(element => element.length > 0);
}
  

/**
 * @param {Array} rows
 * @param {Array} columns
 * @return {Array} Field items and values with global data
 */
function fieldValuesWithGlobalReportingType(rows, columns) {
  var fields = getFieldColumnsFromData(columns);
  return fields.map(function(field) {
    var values = getUniqueValuesByProperty(field, rows).filter(e =>  e);
    return {
      field: field,
      values: values.filter(function(fieldValue) {
        return fieldValueHasGlobalReportingType(field, fieldValue, rows);
      }),
    };
  });
}

/**
 * @param {Array} rows
 * @param {Array} columns
 * @return {Array} Field items and values with global data
 */
function fieldValuesWithNationalReportingType(rows, columns) {
  var fields = getFieldColumnsFromData(columns);
  return fields.map(function(field) {
    var values = getUniqueValuesByProperty(field, rows).filter(e =>  e);
    return {
      field: field,
      values: values.filter(function(fieldValue) {
        return fieldValueHasNationalReportingType(field, fieldValue, rows);
      }),
    };
  });
}

/**
 * @param {Array} rows
 * @param {Array} columns
 * @return {Array} Field items and values with national and global data
 */
function comparableFieldValues(rows, columns) {
  var fields = getFieldColumnsFromData(columns);
  return fields.map(function(field) {
    var values = getUniqueValuesByProperty(field, rows).filter(e =>  e);
    return {
      field: field,
      values: values.filter(function(fieldValue) {
        return fieldValueHasNationalReportingType(field, fieldValue, rows) && fieldValueHasGlobalReportingType(field, fieldValue, rows);
      }),
    };
  });
}

/**
 * @param {string} field
 * @param {string} reportingType
 * @param {Array} rows
 */
function fieldValueHasGlobalReportingType(field, fieldValue, rows) {
  return rows.some(function(row) {
    return row[field] === fieldValue && row[REPORTINGTYPE_COLUMN] === REPORTINGTYPE_GLOBAL;
  });
}

/**
 * @param {string} field
 * @param {string} reportingType
 * @param {Array} rows
 */
function fieldValueHasNationalReportingType(field, fieldValue, rows) {
  return rows.some(function(row) {
    return row[field] === fieldValue && row[REPORTINGTYPE_COLUMN] === REPORTINGTYPE_NATIONAL;
  });
}
