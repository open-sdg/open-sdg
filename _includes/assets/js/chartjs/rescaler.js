// This "crops" the charts so that empty years are not displayed
// at the beginning or end of each dataset. This ensures that the
// chart will fill all the available space.
Chart.{% unless site.chartjs_3 %}plugins.{% endunless %}register({
  id: 'rescaler',
  beforeInit: function (chart, options) {
    chart.config.data.allLabels = chart.config.data.labels.slice(0);
  },
  afterDatasetsUpdate: function (chart) {
    _.each(chart.data.datasets, function (ds) {
      if (!ds.initialised) {
        ds.initialised = true;
        ds.allData = ds.data.slice(0);
      }
    });
  },
  afterUpdate: function (chart) {

    // Ensure this only runs once.
    if (chart.isScaleUpdate) {
      chart.isScaleUpdate = false;
      return;
    }

    // For each dataset, create an object showing the
    // index of the minimum value and the index of the
    // maximum value (not counting empty/null values).
    var ranges = _.chain(chart.data.datasets).map('allData').map(function (data) {
      return {
        min: _.findIndex(data, function(val) { return val !== null }),
        max: _.findLastIndex(data, function(val) { return val !== null })
      };
    }).value();

    // Figure out the overal minimum and maximum
    // considering all of the datasets.
    var dataRange = ranges.length ? {
      min: _.chain(ranges).map('min').min().value(),
      max: _.chain(ranges).map('max').max().value()
    } : undefined;

    if (dataRange) {
      // "Crop" the labels according to the min/max.
      chart.data.labels = chart.data.allLabels.slice(dataRange.min, dataRange.max + 1);

      // "Crop" the data of each dataset according to the min/max.
      chart.data.datasets.forEach(function (dataset) {
        dataset.data = dataset.allData.slice(dataRange.min, dataRange.max + 1);
      });

      chart.isScaleUpdate = true;
      chart.update();
    }
  }
});
