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
 * @param {Array} selectableFields Field names
 * @return {Array} Datasets almost suitable for Chart.js (colors are applied later)
 */
function getDatasets(headline, data, combinations, years, defaultLabel, selectableFields) {
  var datasets = [], dataset;
  combinations.forEach(function(combination) {
    var filteredData = getDataMatchingCombination(data, combination, selectableFields);
    if (filteredData.length > 0) {
      dataset = makeDataset(years, filteredData, combination, defaultLabel);
      datasets.push(dataset);
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
 * @param {Array} datasets Dataset objects without colors
 * @param {Array} colors
 * @param {Array} colorsUsedByCombination
 */
function applyColorToDatasets(datasets, colors, colorsUsedByCombination) {
  var index, color, background, border;
  datasets.forEach(function(dataset) {
    if (dataset.disaggregation) {
      index = getColorIndex(colorsUsedByCombination, dataset.disaggregation);
      color = getColor(colorsUsedByCombination, index);
      background = getBackground(index, colors, color);
      border = getBorderDash(index, colors);
      applyColorToDataset(dataset, color, background, border);
    }
  }, this);
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
 * @param {Array} colorsUsedByCombination
 * @param {Array} datasets
 * @param {Array} availableColors
 * return Updated version of colorsUsedByCombination
 */
function getColorsUsedByDatasets(colorsUsedByCombination, datasets, availableColors) {
  var lastColorUsed = colorsUsedByCombination.length % availableColors.length;
  var colorCodesUsed = availableColors.slice(0, lastColorUsed);
  datasets.forEach(function(dataset) {
    if (dataset.disaggregation) {
      var combinationKey = JSON.stringify(dataset.disaggregation);
      // If we have used up all of the available colors, clear the list so that we can use the same colors
      // again, but with a variation in pattern (eg, stripes).
      if (colorsUsedByCombination.length === availableColors.length) {
        colorCodesUsed = [];
      }
      if (!colorsUsedByCombination.some(function(color) { return color.combinationKey == combinationKey })) {
        for (var i = 0; i < availableColors.length; i++) {
          if (!colorCodesUsed.includes(availableColors[i])) {
            colorsUsedByCombination.push({
              combinationKey: combinationKey,
              color: availableColors[i],
            })
            colorCodesUsed.push(availableColors[i]);
            break;
          }
        }
      }
    }
  });
  return colorsUsedByCombination;
}

/**
 * @param {Array} colorsUsedByCombination
 * @param {Array} index
 * @return Matching color from colorsUsedByCombination
 */
function getColor(colorsUsedByCombination, index) {
  return '#' + colorsUsedByCombination[index].color;
}

/**
 * @param {Array} colorsUsedByCombination
 * @param {Array} combination
 * @return Index of matching color from colorsUsedByCombination
 */
function getColorIndex(colorsUsedByCombination, combination) {
  var combinationKey = JSON.stringify(combination);
  return colorsUsedByCombination.findIndex(function(color) { return color.combinationKey === combinationKey });
}

/**
 * @param {int} colorIndex
 * @param {Array} colors
 * @param {string} color
 * @return Background color or pattern
 */
function getBackground(colorIndex, colors, color) {
  if (colorIndex >= colors.length) {
    return getStripes(color);
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
 * @param {int} colorIndex
 * @param {Array} colors
 * @return {Array|undefined} An array produces dashed lines on the chart
 */
function getBorderDash(colorIndex, colors) {
  return colorIndex >= colors.length ? [5, 5] : undefined;
}

/**
 * @param {Array} years
 * @param {Array} rows
 * @param {Object} combination
 * @param {string} labelFallback
 * @return {Object} Dataset object for Chart.js
 */
function makeDataset(years, rows, combination, labelFallback) {
  var dataset = getBaseDataset();
  return Object.assign(dataset, {
    label: getCombinationDescription(combination, labelFallback),
    disaggregation: combination,
    data: prepareDataForDataset(years, rows),
  });
}

/**
 * @param {Object} dataset Dataset object without color
 * @param {string} color
 * @param {string} background
 * @param {Array} border
 */
function applyColorToDataset(dataset, color, background, border) {
  dataset.borderColor = color;
  dataset.backgroundColor = background;
  dataset.pointBorderColor = color;
  dataset.borderDash = border;
  dataset.borderWidth = 2;
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
    spanGaps: true
  });
}

/**
 * @param {Object} combination Key/value representation of a field combo
 * @param {string} fallback
 * @return {string} Human-readable description of combo
 */
function getCombinationDescription(combination, fallback) {
  var keys = Object.keys(combination).sort();
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
    var found = rows.find(function (row) {
      return row[YEAR_COLUMN] === year;
    });
    return found ? found[VALUE_COLUMN] : null;
  });
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
