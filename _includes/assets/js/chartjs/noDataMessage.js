Chart.plugins.register({
	afterDraw: function(chart) {
  	if (chart.data.datasets.length === 0) {
    	// No data is present
      var ctx = chart.chart.ctx;
      var width = chart.chart.width;
      var height = chart.chart.height
      chart.clear();

      ctx.save();
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = "normal 40px 'Open Sans', Helvetica, Arial, sans-serif";
      ctx.fillText('No data to display', width / 2, height / 2);
      ctx.restore();
    }
  }
});
