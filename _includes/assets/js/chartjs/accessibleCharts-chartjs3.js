// This plugin allows users to cycle through tooltips by keyboard.
Chart.register({
    id: 'open-sdg-accessible-charts',
    afterInit: function(chart) {
        var plugin = this;
        plugin.chart = chart;
        plugin.selectedIndex = -1;
        plugin.currentDataset = 0;
        plugin.setMeta();
        plugin.initElements();
        console.log('running after init');
        chart.canvas.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowRight') {
                console.log('firing');
                plugin.activateNext();
                e.preventDefault();
            }
            else if (e.key === 'ArrowLeft') {
                console.log('firing');
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
        console.log('activateNext');
        console.log(this.selectedIndex);
        this.clearActive();
        this.selectedIndex += 1;
        if (this.selectedIndex >= this.meta.data.length) {
            console.log('going back to first index');
            this.selectedIndex = 0;
            this.nextDataset();
        }
        this.activate();
        console.log('finished');
    },
    activatePrev: function() {
        this.clearActive();
        this.selectedIndex -= 1;
        if (this.selectedIndex < 0) {
            console.log('jumping to last index');
            this.prevDataset();
            this.selectedIndex = this.meta.data.length - 1;
        }
        this.activate();
    },
    getTooltips: function() {
        var tooltips = [];
        if (this.chart.config.type == 'line') {
            
        }
    },
    nextDataset: function() {
        console.log('nextDataset');
        //console.log(this.chart.data.datasets);
        var numDatasets = this.chart.data.datasets.length;
        this.currentDataset += 1;
        if (this.currentDataset >= numDatasets) {
            console.log('going back to first dataset');
            this.currentDataset = 0;
        }
        this.setMeta();
    },
    prevDataset: function() {
        console.log('prevDataset');
        var numDatasets = this.chart.data.datasets.length;
        this.currentDataset -= 1;
        if (this.currentDataset < 0) {
            console.log('jumping to last dataset');
            this.currentDataset = numDatasets - 1;
        }
        this.setMeta();
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
