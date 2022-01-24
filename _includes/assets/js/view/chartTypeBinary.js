opensdg.convertBinaryValue = function (value) {
    if (typeof value === 'string') {
        value = parseInt(value, 10);
    }
    if (value === 1) {
        return 'Yes';
    }
    else if (value === BINARY_NEGATIVE) {
        return 'No';
    }
    return '';
}

opensdg.chartTypes.binary = function (info) {
    var config = opensdg.chartTypes.base(info);
    var overrides = {
        // Force the "bar" type instead of the "binary" type which Chart.js
        // does not recognize.
        type: 'bar',
        // Assign some callbacks to convert 1/-1 to Yes/No.
        options: {
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            var label = tooltipItem.dataset.label || '';
                            label += ': ' + opensdg.convertBinaryValue(tooltipItem.formattedValue);
                            return label;
                        },
                    },
                },
            },
            scales: {
                y: {
                    ticks: {
                        // Set the min/max to -1/1 so that the bars will start from the
                        // middle and either go up (for 1) or down (for -1).
                        min: BINARY_NEGATIVE,
                        max: 1,
                        callback: opensdg.convertBinaryValue,
                    },
                }
            },
        }
    }

    // Add these overrides onto the normal config.
    _.merge(config, overrides);
    return config;
};
