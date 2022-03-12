/**
 * Model helper functions related to data and conversion.
 */

/**
 * @param {Object} data Object imported from JSON file
 * @param {Array} dropKeys Array of keys to drop from the rows
 * @return {Array} Rows
 */
function convertJsonFormatToRows(data, dropKeys) {
  var keys = Object.keys(data);
  if (keys.length === 0) {
    return [];
  }

  if (dropKeys && dropKeys.length > 0) {
    keys = keys.filter(function(key) {
      return !(dropKeys.includes(key));
    });
  }

  return data[keys[0]].map(function(item, index) {
    return _.zipObject(keys, keys.map(function(key) {
      return data[key][index];
    }));
  });
}

/**
 * @param {Array} selectableFields Field names
 * @param {Array} rows
 * @return {Array} Headline rows
 */
function getHeadline(selectableFields, rows) {
  return rows.filter(function (row) {
    return selectableFields.every(function(field) {
      return !row[field];
    });
  }).map(function (row) {
    // Remove null fields in each row.
    return _.pickBy(row, function(val) { return val !== null });
  });
}

/**
 * @param {Array} rows
 * @return {Array} Prepared rows
 */
function prepareData(rows) {
  return rows.map(function(item) {

    if (item[VALUE_COLUMN] != 0) {
      // For rounding, use a function that can be set on the global opensdg
      // object, for easier control: opensdg.dataRounding()
      if (typeof opensdg.dataRounding === 'function') {
        item.Value = opensdg.dataRounding(item.Value);
      }
    }

    // remove any undefined/null values:
    Object.keys(item).forEach(function(key) {
      if (item[key] === null || typeof item[key] === 'undefined') {
        delete item[key];
      }
    });

    return item;
  }, this);
}

/**
 * @param {Array} rows
 * @param {string} selectedUnit
 * @return {Array} Sorted rows
 */
function sortData(rows, selectedUnit) {
  var column = selectedUnit ? UNIT_COLUMN : YEAR_COLUMN;
  return _.sortBy(rows, column);
}

/**
 * @param {Array} precisions Objects containing 'unit' and 'title'
 * @param {String} selectedUnit
 * @param {String} selectedSeries
 * @return {int|false} number of decimal places, if any
 */
function getPrecision(precisions, selectedUnit, selectedSeries) {
  var match = getMatchByUnitSeries(precisions, selectedUnit, selectedSeries);
  return (match) ? match.decimals : false;
}

/**
 * @param {Object} data Object imported from JSON file
 * @return {Array} Rows
 */
function inputData(data) {
  var dropKeys = [];
  {% if site.ignored_disaggregations and site.ignored_disaggregations.size > 0 %}
  dropKeys = {{ site.ignored_disaggregations | jsonify }};
  {% endif %}
  return convertJsonFormatToRows(data, dropKeys);
}

/**
 * @param {Object} edges Object imported from JSON file
 * @return {Array} Rows
 */
function inputEdges(edges) {
  var edgesData = convertJsonFormatToRows(edges);
  {% if site.ignored_disaggregations and site.ignored_disaggregations.size > 0 %}
  var ignoredDisaggregations = {{ site.ignored_disaggregations | jsonify }};
  edgesData = edgesData.filter(function(edge) {
    if (ignoredDisaggregations.includes(edge.To) || ignoredDisaggregations.includes(edge.From)) {
      return false;
    }
    return true;
  });
  {% endif %}
  return edgesData;
}

/**
 * @param {Array} rows
 * @return {Array} Objects containing 'field' and 'value', to be placed in the footer.
 */
function getTimeSeriesAttributes(rows) {
  if (rows.length === 0) {
    return [];
  }
  var timeSeriesAttributes = [],
      possibleAttributes = {{ site.time_series_attributes | jsonify }},
      firstRow = rows[0],
      firstRowKeys = Object.keys(firstRow);
  possibleAttributes.forEach(function(possibleAttribute) {
    var field = possibleAttribute.field;
    if (firstRowKeys.includes(field) && firstRow[field]) {
      timeSeriesAttributes.push({
        field: field,
        value: firstRow[field],
      });
    }
  });
  return timeSeriesAttributes;
}
