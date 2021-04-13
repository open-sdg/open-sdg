/**
 * Model helper functions related to units.
 */

/**
 * @param {Array} rows
 * @return {boolean}
 */
function dataHasUnits(columns) {
  return columns.includes(UNIT_COLUMN);
}

/**
 * @param {Array} fieldsUsedByUnit Field names
 * @return {boolean}
 */
function dataHasUnitSpecificFields(fieldsUsedByUnit) {
  return !_.every(_.map(fieldsUsedByUnit, 'fields'), function(fields) {
    return _.isEqual(_.sortBy(_.map(fieldsUsedByUnit, 'fields')[0]), _.sortBy(fields));
  });
}

/**
 * @param {Array} units
 * @param {Array} rows
 * @return {Array} Field names
 */
function fieldsUsedByUnit(units, rows, columns) {
  var fields = getFieldColumnsFromData(columns);
  return units.map(function(unit) {
    return {
      unit: unit,
      fields: fields.filter(function(field) {
        return fieldIsUsedInDataWithUnit(field, unit, rows);
      }, this),
    }
  }, this);
}

/**
 * @param {string} field
 * @param {string} unit
 * @param {Array} rows
 */
function fieldIsUsedInDataWithUnit(field, unit, rows) {
  return rows.some(function(row) {
    return row[field] && row[UNIT_COLUMN] === unit;
  }, this);
}

/**
 * @param {Array} rows
 * @param {string} unit
 * @return {Array} Rows
 */
function getDataByUnit(rows, unit) {
  return rows.filter(function(row) {
    return row[UNIT_COLUMN] === unit;
  }, this);
}

/**
 * @param {Array} rows
 * @return {string}
 */
function getFirstUnitInData(rows) {
  return rows.find(function(row) {
    return row[UNIT_COLUMN];
  }, this)[UNIT_COLUMN];
}

/**
 * @param {Array} startValues Objects containing 'field' and 'value'
 * @return {string|boolean} Unit, or false if none were found
 */
function getUnitFromStartValues(startValues) {
  var match = startValues.find(function(startValue) {
    return startValue.field === UNIT_COLUMN;
  }, this);
  return (match) ? match.value : false;
}
