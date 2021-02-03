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
 * @param {Array} items Objects optionally containing 'unit' and/or 'series'
 * @param {String} selectedUnit
 * @param {String} selectedSeries
 * @return {object|false} The first match given the selected unit/series, or false
 */
function getMatchByUnitSeries(items, selectedUnit, selectedSeries) {
  if (!items || items.length < 0) {
    return false;
  }
  if (!selectedUnit && !selectedSeries) {
    return items[0];
  }
  var match = items.find(function(item) {
    if (selectedUnit && selectedSeries) {
      return item.unit === selectedUnit && item.series === selectedSeries;
    }
    else if (selectedUnit) {
      return item.unit === selectedUnit;
    }
    else if (selectedSeries) {
      return item.series === selectedSeries;
    }
  });
  if (!match) {
    // If no match was found, allow for a partial match (eg, unit only).
    match = items.find(function(item) {
      if (selectedUnit) {
        return item.unit === selectedUnit;
      }
      else if (selectedSeries) {
        return item.series === selectedSeries;
      }
    });
  }
  return match || false;
}
