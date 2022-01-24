opensdg.chartTypes.line = function(info) {
    var config = opensdg.chartTypes.base(info);
    var overrides = {
        type: 'line',
        options: {
            plugins: {
                tooltip: {
                    mode: 'index',
                    intersect: false,
                },
            },
        },
        plugins: [{
            beforeDatasetsDraw: function(chart) {
                if (chart.tooltip._active && chart.tooltip._active.length) {
                    var activePoint = chart.tooltip._active[0],
                        ctx = chart.ctx,
                        x = activePoint.element.x,
                        topY = chart.scales.y.top,
                        bottomY = chart.scales.y.bottom;

                    // draw line
                    ctx.save();
                    ctx.beginPath();
                    ctx.moveTo(x, topY);
                    ctx.lineTo(x, bottomY);
                    ctx.lineWidth = 2;
                    ctx.strokeStyle = '#757575';
                    ctx.stroke();
                    ctx.restore();
                }
            }
        }],
    };
    // Add these overrides onto the normal config, and return it.
    _.merge(config, overrides);
    return config;
}