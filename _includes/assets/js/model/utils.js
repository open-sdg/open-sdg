/**
 * Model helper functions with general utility.
 */

/**
 * @param {string} prop Property to get unique values from
 * @param {Array} rows
 */
function getUniqueValuesByProperty(prop, rows) {
  var uniques = new Set();
  rows.forEach(function(row) {
    if (row[prop] != null) {
      uniques.add(row[prop])
    }
  });
  return Array.from(uniques).sort();
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
  var columns = [
    YEAR_COLUMN,
    VALUE_COLUMN,
    UNIT_COLUMN,
    GEOCODE_COLUMN,
    'Observation status',
    'Unit multiplier',
    'Unit measure',
  ];
  if (SERIES_TOGGLE) {
    columns.push(SERIES_COLUMN);
  }
  return columns;
}

/**
 * Move an item from one position in an array to another, in place.
 */
function arrayMove(arr, fromIndex, toIndex) {
  while (fromIndex < 0) {
    fromIndex += arr.length;
  }
  while (toIndex < 0) {
    toIndex += arr.length;
  }
  var paddingAdded = [];
  if (toIndex >= arr.length) {
    var k = toIndex - arr.length;
    while ((k--) + 1) {
      arr.push(undefined);
      paddingAdded.push(arr.length - 1);
    }
  }
  arr.splice(toIndex, 0, arr.splice(fromIndex, 1)[0]);

  // Get rid of the undefined elements that were added.
  paddingAdded.sort();
  while (paddingAdded.length > 0) {
    var paddingIndex = paddingAdded.pop() - 1;
    arr.splice(paddingIndex, 1);
  }
}
