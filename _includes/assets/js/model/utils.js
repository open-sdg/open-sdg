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
 * @param {Array} columns
 * @return {boolean}
 */
function dataHasGeoCodes(columns) {
  return columns.includes(GEOCODE_COLUMN);
}

/**
 * @param {Array} rows
 * @return {Array} Columns from first row
 */
function getColumnsFromData(rows) {
  return Object.keys(rows.reduce(function(result, obj) {
    return Object.assign(result, obj);
  }, {}));
}

/**
 * @param {Array} columns
 * @return {Array} Columns without non-fields
 */
function getFieldColumnsFromData(columns) {
  var omitColumns = nonFieldColumns();
  return columns.filter(function(col) {
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
 * @param {Boolean} requireFullMatch Whether to require both unit and series to match
 * @param {Boolean} disallowFallbacks Whether to disallow fallbacks to non-unit/non-series items
 * @return {object|false} The first match given the selected unit/series, or false
 */
function getMatchByUnitSeries(items, selectedUnit, selectedSeries, requireFullMatch, disallowFallback) {
  var matches = getMatchesByUnitSeries(items, selectedUnit, selectedSeries, requireFullMatch, disallowFallback);
  return (matches.length > 0) ? matches[0] : false;
}

/**
 * @param {Array} items Objects optionally containing 'unit' and/or 'series'
 * @param {String} selectedUnit
 * @param {String} selectedSeries
 * @param {Boolean} requireFullMatch Whether to require both unit and series to match
 * @param {Boolean} disallowFallback Whether to disallow fallbacks to non-unit/non-series items
 * @return {Array} All matches given the selected unit/series, if any.
 */
function getMatchesByUnitSeries(items, selectedUnit, selectedSeries, requireFullMatch, disallowFallback) {
  if (!items || items.length === 0) {
    return [];
  }
  if (!selectedUnit && !selectedSeries) {
    return items;
  }
  var matches = items.filter(function(item) {
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
  if (matches.length === 0 && !requireFullMatch) {
    // If no match was found, allow for a partial match (eg, unit only).
    matches = items.filter(function(item) {
      if (selectedUnit) {
        return item.unit === selectedUnit;
      }
      else if (selectedSeries) {
        return item.series === selectedSeries;
      }
    });
  }
  if (matches.length === 0 && !disallowFallback) {
    matches = items.filter(function(item) {
      if (selectedUnit && selectedSeries) {
        return !item.unit && !item.series;
      }
      else if (selectedSeries) {
        return !item.series;
      }
      else if (selectedUnit) {
        return !item.unit;
      }
    });
  }
  return matches;
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
