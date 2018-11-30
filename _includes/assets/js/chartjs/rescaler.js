Chart.plugins.register({
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

    if (chart.isScaleUpdate) {
      chart.isScaleUpdate = false;
      return;
    }

    var datasets = _.filter(chart.data.datasets, function (ds, index) {
      var meta = chart.getDatasetMeta(index).$filler;
      return meta && meta.visible;
    });

    var ranges = _.chain(datasets).pluck('allData').map(function (data) {
      return {
        min: _.findIndex(data, _.identity),
        max: _.findLastIndex(data, _.identity)
      };
    }).value();

    var dataRange = ranges.length ? {
      min: _.chain(ranges).pluck('min').min().value(),
      max: _.chain(ranges).pluck('max').max().value()
    } : undefined;

    if (dataRange) {
      chart.data.labels = chart.data.allLabels.slice(dataRange.min, dataRange.max + 1);

      chart.data.datasets.forEach(function (dataset) {
        dataset.data = dataset.allData.slice(dataRange.min, dataRange.max + 1);
      });

      chart.isScaleUpdate = true;
      chart.update();
    }
  }
});