/**
 * Model helper functions related to tables.
 */

/**
 * @param {Array} datasets
 * @param {Array} years
 * @return {Object} Object containing 'headings' and 'data'
 */
function tableDataFromDatasets(datasets, years) {
  return {
    headings: [YEAR_COLUMN].concat(datasets.map(function(ds) { return ds.label; })),
    data: years.map(function(year, index) {
      return [year].concat(datasets.map(function(ds) { return ds.data[index]; }));
    }),
  };
}

/**
 * @param {Array} rows
 * @param {string} selectedUnit
 * @return {Object} Object containing 'title', 'headings', and 'data'
 */
function getHeadlineTable(rows, selectedUnit) {
  return {
    title: 'Headline data',
    headings: selectedUnit ? [YEAR_COLUMN, UNIT_COLUMN, VALUE_COLUMN] : [YEAR_COLUMN, VALUE_COLUMN],
    data: rows.map(function (row) {
      return selectedUnit ? [row[YEAR_COLUMN], row[UNIT_COLUMN], row[VALUE_COLUMN]] : [row[YEAR_COLUMN], row[VALUE_COLUMN]];
    }),
  };
}
