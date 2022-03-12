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
  return Array.from(uniques);
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
  var timeSeriesAttributes = {{ site.time_series_attributes | jsonify }};
  timeSeriesAttributes.forEach(function(tsAttribute) {
    columns.push(tsAttribute.field);
  });
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
  var matches = getMatchesByUnitSeries(items, selectedUnit, selectedSeries);
  return (matches.length > 0) ? matches[0] : false;
}

/**
 * @param {Array} items Objects optionally containing 'unit' and/or 'series'
 * @param {String} selectedUnit
 * @param {String} selectedSeries
 * @return {Array} All matches given the selected unit/series, if any.
 */
function getMatchesByUnitSeries(items, selectedUnit, selectedSeries) {
  if (!items || items.length === 0) {
    return [];
  }
  if (!selectedUnit && !selectedSeries) {
    return items;
  }
  // First pass to find any exact matches.
  var matches = items.filter(function(item) {
    var seriesMatch = item.series === selectedSeries,
        unitMatch = item.unit === selectedUnit;
    if (selectedUnit && selectedSeries) {
      return seriesMatch && unitMatch;
    }
    else if (selectedUnit) {
      return unitMatch;
    }
    else if (selectedSeries) {
      return seriesMatch;
    }
  });
  // Second pass to find any partial matches with unspecified unit/series.
  if (matches.length === 0) {
    matches = items.filter(function(item) {
      var seriesMatch = item.series === selectedSeries && item.series && !item.unit,
          unitMatch = item.unit === selectedUnit && item.unit && !item.series;
      if (selectedUnit && selectedSeries) {
        return seriesMatch || unitMatch;
      }
      else if (selectedUnit) {
        return unitMatch;
      }
      else if (selectedSeries) {
        return seriesMatch;
      }
    });
  }
  // Third pass to catch cases where nothing at all was specified.
  if (matches.length === 0) {
    matches = items.filter(function(item) {
      var nothingSpecified = !item.unit && !item.series;
      return nothingSpecified;
    });
  }
  return matches;
}
