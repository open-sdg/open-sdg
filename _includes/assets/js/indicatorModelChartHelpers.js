/**
 * Model helper functions related to charts and datasets.
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

function getDataMatchingCombination(data, combination, selectableFields) {
  return data.filter(function(row) {
    return selectableFields.every(function(field) {
      return row[field] === combination[field];
    });
  });
}

function getCombinationDescription(combination, fallback) {
  var keys = Object.keys(combination);
  if (keys.length === 0) {
    return fallback;
  }
  return keys.map(function(key) {
    return translations.t(combination[key]);
  }).join(', ');
}

function getHeadlineColor() {
  // TODO: Make this dynamic to support high-contrast.
  return '777777';
}

function getHeadlineBackground() {
  // TODO: Make this dynamic to support high-contrast.
  return '#FFFFFF';
}

function getColor(datasetIndex, colors) {
  if (datasetIndex > colors.length) {
    return colors[datasetIndex - colors.length];
  } else {
    return colors[datasetIndex];
  }
}

function getBackgroundColor(datasetIndex, colors) {
  return '#' + getColor(datasetIndex, colors);
}

function getBackgroundPattern(color) {
  if (window.pattern && typeof window.pattern.draw === 'function') {
    return window.pattern.draw('diagonal', color);
  }
  return color;
}

function getBackground(datasetIndex, colors) {
  var color = getBackgroundColor(datasetIndex, colors);

  if (datasetIndex > colors.length) {
    color = getBackgroundPattern(color);
  }

  return color;
}

function getBorderDash(datasetIndex, colors) {
  return datasetIndex > colors.length ? [5, 5] : undefined;
}

function prepareDataForDataset(years, data) {
  return years.map(function(year) {
    return data
      .filter(function(row) { return row[YEAR_COLUMN] === year; }, this)
      .map(function(row) { return row[VALUE_COLUMN]; }, this)[0];
  }, this);
}

function makeHeadlineDataset(years, data, label) {
  var dataset = getBaseDataset();
  return Object.assign(dataset, {
    label: label,
    borderColor: '#' + getHeadlineColor(),
    backgroundColor: getHeadlineBackground(),
    pointBorderColor: '#' + getHeadlineColor(),
    data: prepareDataForDataset(years, data),
  });
}

function makeDataset(years, data, combination, labelFallback, color, background, border) {
  var dataset = getBaseDataset();
  return Object.assign(dataset, {
    label: getCombinationDescription(combination, labelFallback),
    disaggregation: combination,
    borderColor: '#' + color,
    backgroundColor: background,
    pointBorderColor: '#' + color,
    borderDash: border,
    borderWidth: 4,
    data: prepareDataForDataset(years, data),
  });
}
