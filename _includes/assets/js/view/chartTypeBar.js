opensdg.chartTypes.bar = function (info) {
    var config = opensdg.chartTypes.base(info);
    var overrides = {
        type: 'bar',
    };
    if (info.stackedDisaggregation) {
        overrides.options = {
            scales: {
                x: { stacked: true },
                y: { stacked: true },
            }
        };
        // If we have stackedDisaggregation, we need to group datasets into stacks.
        config.data.datasets.forEach(function (dataset) {
            var disaggregation = $.extend({}, dataset.disaggregation);
            // We're going to "stringify" each combination of disaggregations in order
            // to place them in their own "stacks". To place "stacked" disaggregations
            // into the same stack, we set them as "samestack" before stringifying.
            // Note that the string "samestack" is completely arbitrary.
            if (typeof disaggregation[info.stackedDisaggregation] !== 'undefined') {
                disaggregation[info.stackedDisaggregation] = 'samestack';
            }
            // Use the disaggregation as a unique id for each stack.
            dataset.stack = JSON.stringify(disaggregation);
        });
    }
    // Manually set the borderWidths to 0 to avoid a weird border effect on the bars.
    config.data.datasets.forEach(function(dataset) {
        dataset.borderWidth = 0;
    });
    // Add these overrides onto the normal config, and return it.
    _.merge(config, overrides);
    return config;
}