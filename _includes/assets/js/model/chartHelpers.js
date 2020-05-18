/**
 * Model helper functions related to charts and datasets.
 */

/**
 * @param {string} currentTitle
 * @param {Array} allTitles Objects containing 'unit' and 'title'
 * @param {String} selectedUnit
 * @return {String} Updated title
 */
function getChartTitle(currentTitle, allTitles, selectedUnit) {
  var newTitle = currentTitle;
  if (allTitles && allTitles.length > 0) {
    var unitTitle = allTitles.find(function(title) { return title.unit === selectedUnit });
    newTitle = (unitTitle) ? unitTitle.title : allTitles[0].title;
  }
  return newTitle;
}

/**
 * @param {Array} headline Rows
 * @param {Array} rows
 * @param {Array} combinations Objects representing disaggregation combinations
 * @param {Array} years
 * @param {string} defaultLabel
 * @param {Array} colors
 * @param {Array} selectableFields Field names
 * @return {Array} Datasets suitable for Chart.js
 */
function getDatasets(headline, data, combinations, years, defaultLabel, colors, selectableFields) {
  var datasets = [], index = 0, dataset, color, background, border;
  combinations.forEach(function(combination) {
    var filteredData = getDataMatchingCombination(data, combination, selectableFields);
    if (filteredData.length > 0) {
      color = getColor(index, colors);
      background = getBackground(index, colors);
      border = getBorderDash(index, colors);
      dataset = makeDataset(years, filteredData, combination, defaultLabel, color, background, border);
      datasets.push(dataset);
      index++;
    }
  }, this);
  datasets.sort(function(a, b) { return a.label > b.label; });
  if (headline.length > 0) {
    dataset = makeHeadlineDataset(years, headline, defaultLabel);
    datasets.unshift(dataset);
  }
  return datasets;
}

/**
 * @param {Array} rows
 * @param {Object} combination Key/value representation of a field combo
 * @param {Array} selectableFields Field names
 * @return {Array} Matching rows
 */
function getDataMatchingCombination(data, combination, selectableFields) {
  return data.filter(function(row) {
    return selectableFields.every(function(field) {
      return row[field] === combination[field];
    });
  });
}

/**
 * @param {int} datasetIndex
 * @param {Array} colors
 * @return Color from a list
 */
function getColor(datasetIndex, colors) {
  if (datasetIndex >= colors.length) {
    // Support double the number of colors, because we'll use striped versions.
    return '#' + colors[datasetIndex - colors.length];
  } else {
    return '#' + colors[datasetIndex];
  }
}

/**
 * @param {int} datasetIndex
 * @param {Array} colors
 * @return Background color or pattern
 */
function getBackground(datasetIndex, colors) {
  var color = getColor(datasetIndex, colors);

  if (datasetIndex >= colors.length) {
    color = getStripes(color);
  }

  return color;
}

/**
 * @param {string} color
 * @return Canvas pattern from color
 */
function getStripes(color) {
  if (window.pattern && typeof window.pattern.draw === 'function') {
    return window.pattern.draw('diagonal', color);
  }
  return color;
}

/**
 * @param {int} datasetIndex
 * @param {Array} colors
 * @return {Array|undefined} An array produces dashed lines on the chart
 */
function getBorderDash(datasetIndex, colors) {
  return datasetIndex >= colors.length ? [5, 5] : undefined;
}

/**
 * @param {Array} years
 * @param {Array} rows
 * @param {Object} combination
 * @param {string} labelFallback
 * @param {string} color
 * @param {string} background
 * @param {Array} border
 * @return {Object} Dataset object for Chart.js
 */
function makeDataset(years, rows, combination, labelFallback, color, background, border) {
  var dataset = getBaseDataset();
  return Object.assign(dataset, {
    label: getCombinationDescription(combination, labelFallback),
    disaggregation: combination,
    borderColor: color,
    backgroundColor: background,
    pointBorderColor: color,
    borderDash: border,
    borderWidth: 2,
    data: prepareDataForDataset(years, rows),
  });
}

/**
 * @return {Object} Starting point for a Chart.js dataset
 */
function getBaseDataset() {
  return Object.assign({}, {
    fill: false,
    pointHoverRadius: 5,
    pointBackgroundColor: '#FFFFFF',
    pointHoverBorderWidth: 1,
    tension: 0,
    spanGaps: false
  });
}

/**
 * @param {Object} combination Key/value representation of a field combo
 * @param {string} fallback
 * @return {string} Human-readable description of combo
 */
function getCombinationDescription(combination, fallback) {
  var keys = Object.keys(combination);
  if (keys.length === 0) {
    return fallback;
  }
  return keys.map(function(key) {
    return translations.t(combination[key]);
  }).join(', ');
}

/**
 * @param {Array} years
 * @param {Array} rows
 * @return {Array} Prepared rows
 */
function prepareDataForDataset(years, rows) {
  return years.map(function(year) {
    return rows
      .filter(function(row) { return row[YEAR_COLUMN] === year; }, this)
      .map(function(row) { return row[VALUE_COLUMN]; }, this)[0];
  }, this);
}

/**
 * @return {string} Hex number of headline color
 *
 * TODO: Make this dynamic to support high-contrast.
 */
function getHeadlineColor() {
  return HEADLINE_COLOR;
}

/**
 * @param {Array} years
 * @param {Array} rows
 * @param {string} label
 * @return {Object} Dataset object for Chart.js
 */
function makeHeadlineDataset(years, rows, label) {
  var dataset = getBaseDataset();
  return Object.assign(dataset, {
    label: label,
    borderColor: getHeadlineColor(),
    backgroundColor: getHeadlineColor(),
    pointBorderColor: getHeadlineColor(),
    borderWidth: 4,
    data: prepareDataForDataset(years, rows),
  });
}

/**
 * @param {Object} model
 * @return {Object} Translated footer fields keyed to values
 */
function footerFields(model) {
  var fields = {}
  fields[translations.indicator.source] = model.dataSource;
  fields[translations.indicator.geographical_area] = model.geographicalArea;
  fields[translations.indicator.unit_of_measurement] = model.measurementUnit;
  fields[translations.indicator.copyright] = model.copyright;
  fields[translations.indicator.footnote] = model.footnote;
  // Filter out the empty values.
  return _.pick(fields, _.identity);
}
