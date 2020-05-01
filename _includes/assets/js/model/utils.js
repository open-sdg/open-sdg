/**
 * Model helper functions with general utility.
 */

/**
 * @param {string} prop Property to get unique values from
 * @param {Array} rows
 */
function getUniqueValuesByProperty(prop, rows) {
  return rows
    .map(function(row) { return row[prop]; })
    .filter(isElementUniqueInArray)
    .filter(function(row) { return row; })
    .sort();
}

// Use as a callback to Array.prototype.filter to get unique elements
function isElementUniqueInArray(element, index, arr) {
  return arr.indexOf(element) === index;
}

/**
 * @param {Array} rows
 * @return {boolean}
 */
function dataHasGeoCodes(rows) {
  return dataHasColumn(GEOCODE_COLUMN, rows);
}

/**
 * @param {string} column
 * @param {Array} rows
 * @return {boolean}
 */
function dataHasColumn(column, rows) {
  return getColumnsFromData(rows).includes(column);
}

/**
 * @param {Array} rows
 * @return {Array} Columns from first row
 */
function getColumnsFromData(rows) {
  return Object.keys(rows[0]);
}

/**
 * @param {Array} rows
 * @return {Array} Columns from first row, omitting non-fields
 */
function getFieldColumnsFromData(rows) {
  var omitColumns = nonFieldColumns();
  return getColumnsFromData(rows).filter(function(col) {
    return !omitColumns.includes(col);
  });
}

/**
 * @return {Array} Data columns that have a special purpose
 *
 * All other data columns can be considered "field columns".
 */
function nonFieldColumns() {
  return [
    YEAR_COLUMN,
    VALUE_COLUMN,
    UNIT_COLUMN,
    GEOCODE_COLUMN,
    'Observation status',
    'Unit multiplier',
    'Unit measure',
  ];
}
