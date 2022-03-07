// This plugin allows users to cycle through tooltips by keyboard.
Chart.register({
    id: 'open-sdg-accessible-charts',
    afterInit: function(chart) {
        var plugin = this;
        plugin.chart = chart;
        plugin.selectedIndex = -1;
        plugin.currentDataset = 0;
        plugin.meta = chart.getDatasetMeta(plugin.currentDataset);
        plugin.initElements();
        chart.canvas.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowRight') {
                plugin.activateNext();
                e.preventDefault();
            }
            else if (e.key === 'ArrowLeft') {
                plugin.activatePrev();
                e.preventDefault();
            }
        });
        chart.canvas.addEventListener('focus', function() {
            if (plugin.selectedIndex === -1) {
                plugin.activateNext();
            } else {
                plugin.activate();
            }
        });

        chart.canvas.addEventListener('blur', function() {
            plugin.clearActive();
            chart.render();
        });
    },
    initElements: function() {
        $('<span/>')
            .addClass('sr-only')
            .attr('id', 'chart-tooltip-status')
            .attr('role', 'status')
            .appendTo('#chart');
        if (window.innerWidth <= 768) {
            $(this.chart.canvas).text(translations.indicator.chart + '. ' + translations.indicator.data_tabular_alternative);
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
    clearActive: function() {
        if (this.selectedIndex > -1) {
            this.meta.controller.removeHoverStyle(this.meta.data[this.selectedIndex], this.currentDataset, this.selectedIndex);
        }
    },
    activate: function() {
        this.meta.controller.setHoverStyle(this.meta.data[this.selectedIndex], this.currentDataset, this.selectedIndex);
        this.chart.tooltip.setActiveElements([{datasetIndex: this.currentDataset, index: this.selectedIndex}]);
        this.chart.render();
        //this.announceTooltips()
    },
    activateNext: function() {
        this.clearActive();
        console.log(this.chart.data);
        this.selectedIndex = (this.selectedIndex + 1) % this.meta.data.length;
        this.activate();
    },
    activatePrev: function() {
        this.clearActive();
        this.selectedIndex = (this.selectedIndex || this.meta.data.length) -1;
        this.activate();
    },
    getTooltips: function() {
        var tooltips = [];
        if (this.chart.config.type == 'line') {
            
        }
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
