/** 
* Model helper functions related to comparing national and global data.
 */

function getCombinationDataForReportingTypeComparison(selectedFields) {
  var combinations = [{'Reporting type': 'National'}, {'Reporting type': 'Global'}]
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
	


function updateSelectedFieldsFromSelectedValue(selectedComparisonValue) {

  var selectedFields = [{
    field: "Reporting type",
    values: ["National", "Global"]}]
  var field = selectedComparisonValue.split("|")[0];
  var value = selectedComparisonValue.split("|")[1];
  if (value === "total") {
    // do nothing
  } else {
    selectedFields.push(_.map($('#category-select option'), function(option) {
      return {
	field: field,
        values: [value]
      };
    })[0])
  }
  return selectedFields
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

function headlineIsComparable(headlineHasGlobalData, headlineHasNationalData) {
  	return headlineHasGlobalData && headlineHasNationalData;
}

/**
 * @param {Array} Headline data
 * @return {boolean} 
 */
function headlineHasNationalReportingType(headlineRows) {
	return headlineRows.some(function(row) {
  	return row[REPORTINGTYPE_COLUMN] === 'National';
  }, this)

}

/**
 * @param {Array} Headline data
 * @return {boolean} 
 */
function headlineHasGlobalReportingType(headlineRows) {
	return headlineRows.some(function(row) {
  	return row[REPORTINGTYPE_COLUMN] === 'Global';
  }, this)

}


/**
 * @param {Array} Field items and values with global data
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
      }, this),
    };
  }, this);
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
      }, this),
    };
  }, this);
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
      }, this),
    };
  }, this);
}



/**
 * @param {string} field
 * @param {string} reportingType
 * @param {Array} rows
 */
function fieldValueHasGlobalReportingType(field, fieldValue, rows) {
  return rows.some(function(row) {
    return row[field] === fieldValue && row[REPORTINGTYPE_COLUMN] === 'Global';
  }, this);
}

/**
 * @param {string} field
 * @param {string} reportingType
 * @param {Array} rows
 */
function fieldValueHasNationalReportingType(field, fieldValue, rows) {
  return rows.some(function(row) {
    return row[field] === fieldValue && row[REPORTINGTYPE_COLUMN] === 'National';
  }, this);
}
