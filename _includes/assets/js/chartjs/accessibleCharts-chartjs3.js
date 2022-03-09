// This plugin allows users to cycle through tooltips by keyboard.
Chart.register({
    id: 'open-sdg-accessible-charts',
    afterInit: function(chart) {
        var plugin = this;
        plugin.chart = chart;
        plugin.selectedIndex = -1;
        plugin.currentDataset = 0;
        plugin.setMeta();

        if (!$(chart.canvas).data('keyboardNavInitialized')) {
            $(chart.canvas).data('keyboardNavInitialized', true);
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
        }
    },
    setMeta: function() {
        this.meta = this.chart.getDatasetMeta(this.currentDataset);
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
            if (this.chart.config.type === 'line') {
                var numDatasets = this.chart.data.datasets.length;
                for (var i = 0; i < numDatasets; i++) {
                    this.meta.controller.removeHoverStyle(this.chart.getDatasetMeta(i).data[this.selectedIndex], i, this.selectedIndex);
                }
            }
            else {
                this.meta.controller.removeHoverStyle(this.meta.data[this.selectedIndex], this.currentDataset, this.selectedIndex);
            }
        }
    },
    activate: function() {
        var activeElements = [];
        if (this.chart.config.type === 'line') {
            // For line charts, we combined all datasets into a single tooltip.
            var numDatasets = this.chart.data.datasets.length;
            for (var i = 0; i < numDatasets; i++) {
                activeElements.push({datasetIndex: i, index: this.selectedIndex});
                this.meta.controller.setHoverStyle(this.chart.getDatasetMeta(i).data[this.selectedIndex], i, this.selectedIndex);
            }
        }
        else {
            activeElements.push({datasetIndex: this.currentDataset, index: this.selectedIndex});
            this.meta.controller.setHoverStyle(this.meta.data[this.selectedIndex], this.currentDataset, this.selectedIndex);
        }
        this.chart.tooltip.setActiveElements(activeElements);
        this.chart.render();
        this.announceTooltips()
    },
    isSelectedIndexEmpty: function() {
        var isEmpty = true;
        if (this.chart.config.type === 'line') {
            var numDatasets = this.chart.data.datasets.length;
            for (var i = 0; i < numDatasets; i++) {
                var dataset = this.chart.data.datasets[i],
                    value = dataset.data[this.selectedIndex];
                if (typeof value !== 'undefined') {
                    isEmpty = false;
                }
            }
        }
        else {
            var dataset = this.chart.data.datasets[this.currentDataset],
                value = dataset.data[this.selectedIndex];
            if (typeof value !== 'undefined') {
                isEmpty = false;
            }
        }
        return isEmpty;
    },
    activateNext: function() {
        this.clearActive();
        this.selectedIndex += 1;
        if (this.selectedIndex >= this.meta.data.length) {
            this.selectedIndex = 0;
            if (this.chart.config.type !== 'line') {
                this.nextDataset();
            }
        }
        while (this.isSelectedIndexEmpty()) {
            // Skip any empty years.
            this.activateNext();
            return;
        }
        this.activate();
    },
    activatePrev: function() {
        this.clearActive();
        this.selectedIndex -= 1;
        if (this.selectedIndex < 0) {
            if (this.chart.config.type !== 'line') {
                this.prevDataset();
            }
            this.selectedIndex = this.meta.data.length - 1;
        }
        while (this.isSelectedIndexEmpty()) {
            // Skip any empty years.
            this.activatePrev();
            return;
        }
        this.activate();
    },
    nextDataset: function() {
        var numDatasets = this.chart.data.datasets.length;
        this.currentDataset += 1;
        if (this.currentDataset >= numDatasets) {
            this.currentDataset = 0;
        }
        this.setMeta();
    },
    prevDataset: function() {
        var numDatasets = this.chart.data.datasets.length;
        this.currentDataset -= 1;
        if (this.currentDataset < 0) {
            this.currentDataset = numDatasets - 1;
        }
        this.setMeta();
    },
    announceTooltips: function() {
        var tooltips = this.chart.tooltip.getActiveElements();
        if (tooltips.length > 0) {
            var labels = {};
            for (var i = 0; i < tooltips.length; i++) {
                var datasetIndex = tooltips[i].datasetIndex,
                    pointIndex = tooltips[i].index,
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
