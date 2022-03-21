// This plugin allows users to cycle through tooltips by keyboard.
Chart.{% unless site.chartjs_3 %}plugins.{% endunless %}register({
    id: 'open-sdg-accessible-charts',
    afterInit: function(chart) {
        var plugin = this;
        plugin.chart = chart;
        plugin.currentTooltip = null;
        plugin.initElements();
        $(chart.canvas).keydown(function(e) {
            switch (e.which) {
                case 37:
                    plugin.previousTooltip();
                    e.preventDefault();
                    break;
                case 39:
                    plugin.nextTooltip();
                    e.preventDefault();
                    break;
            }
        });
    },
    initElements: function() {
        $('<span/>')
            .addClass('sr-only')
            .attr('id', 'chart-tooltip-status')
            .attr('role', 'status')
            .appendTo('#chart');
        if (window.innerWidth <= 768) {
            var mobileInstructions = translations.indicator.chart + '. ' + translations.indicator.data_tabular_alternative;
            $(this.chart.canvas).html('<span class="hide-during-image-download">' + mobileInstructions + '</span>');
        }
        else {
            var keyboardInstructions = translations.indicator.data_keyboard_navigation;
            $('<span/>')
                .css('display', 'none')
                .attr('id', 'chart-keyboard')
                .text(', ' + keyboardInstructions)
                .appendTo('#chart');
            var describedBy = $('#chart canvas').attr('aria-describedby');
            $(this.chart.canvas)
                .attr('role', 'application')
                .attr('aria-describedby', 'chart-keyboard ' + describedBy)
                .html('<span class="hide-during-image-download">Chart. ' + keyboardInstructions + '</span>')
        }
    },
    afterDatasetsDraw: function() {
        var plugin = this;
        if (plugin.allTooltips == null) {
            plugin.allTooltips = plugin.getAllTooltips();
        }
    },
    afterUpdate: function() {
        var plugin = this;
        plugin.allTooltips = null;
        plugin.currentTooltip = null;
    },
    getAllTooltips: function() {
        var datasets = this.chart.data.datasets;
        var allTooltips = [];
        if (datasets.length == 0) {
            return allTooltips;
        }
        // For line charts, we group points into vertical tooltips.
        if (this.chart.config.type == 'line') {
            for (var pointIndex = 0; pointIndex < datasets[0].data.length; pointIndex++) {
                var verticalTooltips = [];
                for (var datasetIndex = 0; datasetIndex < datasets.length; datasetIndex++) {
                    var meta = this.chart.getDatasetMeta(datasetIndex);
                    if (meta.hidden) {
                        continue;
                    }
                    if (datasets[datasetIndex].data[pointIndex] !== null) {
                        verticalTooltips.push(meta.data[pointIndex]);
                    }
                }
                if (verticalTooltips.length > 0) {
                    allTooltips.push(verticalTooltips);
                }
            }
        }
        // For other charts, each point gets its own tooltip.
        else {
            for (var datasetIndex = 0; datasetIndex < datasets.length; datasetIndex++) {
                var meta = this.chart.getDatasetMeta(datasetIndex);
                if (meta.hidden) {
                    continue;
                }
                for (var pointIndex = 0; pointIndex < datasets[datasetIndex].data.length; pointIndex++) {
                    var singleTooltip = meta.data[pointIndex];
                    allTooltips.push([singleTooltip]);
                }
            }
        }
        return allTooltips;
    },
    previousTooltip: function() {
        var plugin = this,
            newTooltip = 0;
        if (plugin.currentTooltip !== null) {
            newTooltip = plugin.currentTooltip - 1;
        }
        if (newTooltip < 0) {
            newTooltip = plugin.allTooltips.length - 1;
        }
        plugin.activateTooltips(plugin.allTooltips[newTooltip]);
        plugin.currentTooltip = newTooltip;
    },
    nextTooltip: function() {
        var plugin = this,
            newTooltip = 0;
        if (plugin.currentTooltip !== null) {
            newTooltip = plugin.currentTooltip + 1;
        }
        if (newTooltip >= plugin.allTooltips.length) {
            newTooltip = 0;
        }
        plugin.activateTooltips(plugin.allTooltips[newTooltip]);
        plugin.currentTooltip = newTooltip;
    },
    activateTooltips: function(tooltips) {
        this.chart.tooltip._active = tooltips
        this.chart.tooltip.update(true);
        this.chart.draw();
        this.announceTooltips(tooltips);
    },
    announceTooltips: function(tooltips) {
        if (tooltips.length > 0) {
            var labels = {};
            for (var i = 0; i < tooltips.length; i++) {
                var datasetIndex = tooltips[i]._datasetIndex,
                    pointIndex = tooltips[i]._index,
                    year = this.chart.data.labels[pointIndex],
                    dataset = this.chart.data.datasets[datasetIndex],
                    label = dataset.label,
                    value = dataset.data[pointIndex];
                if (typeof labels[year] === 'undefined') {
                    labels[year] = [];
                }
                labels[year].push(label + ': ' + value);
            }
            var announcement = '';
            Object.keys(labels).forEach(function(year) {
                announcement += year + ' ';
                labels[year].forEach(function(label) {
                    announcement += label + ', ';
                });
            });
            var currentAnnouncement = $('#chart-tooltip-status').text();
            if (currentAnnouncement != announcement) {
                $('#chart-tooltip-status').text(announcement);
            }
        }
    }
});
