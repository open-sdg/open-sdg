/*
 * Leaflet disaggregation controls.
 *
 * This is a Leaflet control designed replicate the disaggregation
 * controls that are in the sidebar for tables and charts.
 */
(function () {
    "use strict";

    if (typeof L === 'undefined') {
        return;
    }

    L.Control.DisaggregationControls = L.Control.extend({

        options: {
            position: 'bottomleft'
        },

        initialize: function (plugin) {
            this.plugin = plugin;
            this.disaggregations = plugin.getVisibleLayers().toGeoJSON().features[0].properties.disaggregations;
            this.list = null;
            this.form = null;
            this.setSeries();
            this.setUnits();
            this.setDisaggregations();
        },

        updateList: function () {
            var seriesColumn = this.seriesColumn,
                unitsColumn = this.unitsColumn,
                list = this.list;
            list.innerHTML = '';
            if (this.hasSeries) {
                var title = L.DomUtil.create('dt', 'disaggregation-title'),
                    definition = L.DomUtil.create('dd', 'disaggregation-definition'),
                    container = L.DomUtil.create('div', 'disaggregation-container');
                title.innerHTML = translations.indicator.series;
                definition.innerHTML = this.getCurrentSeries();
                container.append(title);
                container.append(definition);
                list.append(container);
            }
            if (this.hasUnits) {
                var title = L.DomUtil.create('dt', 'disaggregation-title'),
                    definition = L.DomUtil.create('dd', 'disaggregation-definition'),
                    container = L.DomUtil.create('div', 'disaggregation-container');
                title.innerHTML = translations.indicator.unit;
                definition.innerHTML = this.getCurrentUnit();
                container.append(title);
                container.append(definition);
                list.append(container);
            }
            if (this.hasDisaggregations) {
                var currentDisaggregation = this.disaggregations[this.currentDisaggregation];
                Object.keys(currentDisaggregation).forEach(function(key) {
                    if (key !== seriesColumn && key !== unitsColumn) {
                        var title = L.DomUtil.create('dt', 'disaggregation-title'),
                            definition = L.DomUtil.create('dd', 'disaggregation-definition'),
                            container = L.DomUtil.create('div', 'disaggregation-container');
                        //title.innerHTML = translations.t(key);
                        title.innerHTML = key;
                        //var disaggregationValue = translations.t(currentDisaggregation[key]);
                        var disaggregationValue = currentDisaggregation[key];
                        if (disaggregationValue !== '') {
                            definition.innerHTML = disaggregationValue;
                            container.append(title);
                            container.append(definition);
                            list.append(container);
                        }
                    }
                });
            }
        },

        updateForm: function() {
            var seriesColumn = this.seriesColumn,
                unitsColumn = this.unitsColumn,
                container = this.form,
                that = this;
            container.innerHTML = '';
            if (this.hasSeries) {
                var form = L.DomUtil.create('div', 'disaggregation-fieldset-container'),
                    legend = L.DomUtil.create('legend', 'disaggregation-fieldset-legend'),
                    fieldset = L.DomUtil.create('fieldset', 'disaggregation-fieldset');
                legend.innerHTML = translations.indicator.series;
                fieldset.append(legend);
                form.append(fieldset);
                container.append(form);
                for (var i = 0; i < this.allSeries.length; i++) {
                    var series = this.allSeries[i],
                        input = L.DomUtil.create('input', 'disaggregation-input');
                    input.type = 'radio';
                    input.name = 'map-' + seriesColumn;
                    input.value = series;
                    input.tabindex = 0;
                    input.checked = (series === this.getCurrentSeries()) ? 'checked' : '';
                    var label = L.DomUtil.create('label', 'disaggregation-label');
                    label.innerHTML = series;
                    label.prepend(input);
                    fieldset.append(label);
                    input.addEventListener('change', function(e) {
                        that.currentDisaggregation = that.getSelectedDisaggregationIndex();
                        that.updateForm();
                    });
                }
            }
            if (this.hasUnits) {
                var form = L.DomUtil.create('div', 'disaggregation-fieldset-container'),
                    legend = L.DomUtil.create('legend', 'disaggregation-fieldset-legend'),
                    fieldset = L.DomUtil.create('fieldset', 'disaggregation-fieldset');
                legend.innerHTML = translations.indicator.unit_of_measurement;
                fieldset.append(legend);
                form.append(fieldset);
                container.append(form);
                for (var i = 0; i < this.allUnits.length; i++) {
                    var unit = this.allUnits[i],
                        input = L.DomUtil.create('input', 'disaggregation-input');
                    if (this.isDisaggegrationValidGivenCurrent(unitsColumn, unit)) {
                        input.type = 'radio';
                        input.name = 'map-' + unitsColumn;
                        input.value = unit;
                        input.tabindex = 0;
                        input.checked = (unit === this.getCurrentUnit()) ? 'checked' : '';
                        var label = L.DomUtil.create('label', 'disaggregation-label');
                        label.innerHTML = unit;
                        label.prepend(input);
                        fieldset.append(label);
                        input.addEventListener('change', function(e) {
                            that.currentDisaggregation = that.getSelectedDisaggregationIndex();
                            that.updateForm();
                        });
                    }
                }
            }
            if (this.hasDisaggregations) {
                var currentDisaggregation = this.disaggregations[this.currentDisaggregation];
                for (var i = 0; i < this.valuesByDisaggregation.length; i++) {
                    var form = L.DomUtil.create('div', 'disaggregation-fieldset-container'),
                        legend = L.DomUtil.create('legend', 'disaggregation-fieldset-legend'),
                        fieldset = L.DomUtil.create('fieldset', 'disaggregation-fieldset'),
                        disaggregation = this.valuesByDisaggregation[i],
                        field = disaggregation.field;
                    legend.innerHTML = disaggregation.field;
                    fieldset.append(legend);
                    form.append(fieldset);
                    container.append(form);
                    for (var j = 0; j < disaggregation.values.length; j++) {
                        var value = disaggregation.values[j],
                            input = L.DomUtil.create('input', 'disaggregation-input');
                        if (this.isDisaggegrationValidGivenCurrent(disaggregation.field, value)) {
                            input.type = 'radio';
                            input.name = 'map-' + disaggregation.field;
                            input.value = value;
                            input.tabindex = 0;
                            input.checked = (value === currentDisaggregation[disaggregation.field]) ? 'checked' : '';
                            var label = L.DomUtil.create('label', 'disaggregation-label');
                            label.innerHTML = value;
                            label.prepend(input);
                            fieldset.append(label);
                            input.addEventListener('change', function(e) {
                                that.currentDisaggregation = that.getSelectedDisaggregationIndex();
                                that.updateForm();
                            });
                        }
                    }
                }
            }

            var applyButton = L.DomUtil.create('button', 'disaggregation-apply-button'),
                cancelButton = L.DomUtil.create('button', 'disaggregation-cancel-button'),
                buttonContainer = L.DomUtil.create('div', 'disaggregation-form-buttons');
            applyButton.innerHTML = 'Apply';
            buttonContainer.append(applyButton);
            cancelButton.innerHTML = 'Cancel';
            buttonContainer.append(cancelButton);
            container.append(buttonContainer);

            cancelButton.addEventListener('click', function(e) {
                that.currentDisaggregation = that.displayedDisaggregation;
                $('.disaggregation-form-outer').toggle();
                that.updateForm();
            });
            applyButton.addEventListener('click', function(e) {
                that.plugin.currentDisaggregation = that.currentDisaggregation;
                that.plugin.setColorScale();
                that.plugin.updateColors();
                that.plugin.selectionLegend.resetSwatches();
                that.plugin.selectionLegend.update();
                that.updateList();
                $('.disaggregation-form-outer').toggle();
            });
        },

        onAdd: function () {
            var div = L.DomUtil.create('div', 'disaggregation-controls'),
                list = L.DomUtil.create('dl', 'disaggregation-list'),
                that = this;

            this.list = list;
            div.append(list);
            this.updateList();

            var button = L.DomUtil.create('button', 'disaggregation-button');
            button.innerHTML = 'Change breakdowns';
            button.addEventListener('click', function(e) {
                that.displayedDisaggregation = that.currentDisaggregation;
                $('.disaggregation-form-outer').show();
            });
            div.append(button);

            var container = L.DomUtil.create('div', 'disaggregation-form');
            var containerOuter = L.DomUtil.create('div', 'disaggregation-form-outer');
            containerOuter.append(container);
            this.form = container;
            div.append(containerOuter);
            this.updateForm();

            return div;
        },

        getCurrentSeries: function() {
            var disaggregation = this.disaggregations[this.currentDisaggregation];
            return disaggregation[this.seriesColumn];
        },

        getCurrentUnit: function() {
            var disaggregation = this.disaggregations[this.currentDisaggregation];
            return disaggregation[this.unitsColumn];
        },

        setSeries: function () {
            var seriesColumn = '{{ site.data_fields.series | default: "Series" }}';
            this.seriesColumn = seriesColumn;
            if (typeof this.disaggregations[0][seriesColumn] === 'undefined' || !this.disaggregations[0][seriesColumn]) {
                this.hasSeries = false;
                return;
            }
            this.hasSeries = true;
            this.allSeries = _.uniq(this.disaggregations.map(function(disaggregation) {
                //return translations.t(disaggregation[seriesColumn]);
                return disaggregation[seriesColumn];
            }));
        },

        setUnits: function () {
            var unitsColumn = '{{ site.data_fields.units | default: "Units" }}';
            this.unitsColumn = unitsColumn;
            if (typeof this.disaggregations[0][unitsColumn] === 'undefined' || !typeof this.disaggregations[0][unitsColumn]) {
                this.hasUnits = false;
                return;
            }
            this.hasUnits = true;
            this.allUnits = _.uniq(this.disaggregations.map(function(disaggregation) {
                //return translations.t(disaggregation[unitsColumn]);
                return disaggregation[unitsColumn];
            }));
        },

        setDisaggregations: function () {
            var disaggregations = {},
                seriesColumn = this.seriesColumn,
                unitsColumn  = this.unitsColumn,
                hasDisaggregations = false;
            this.disaggregations.forEach(function(disaggregation) {
                Object.keys(disaggregation).forEach(function(key) {
                    if (key !== seriesColumn && key !== unitsColumn) {
                        if (typeof disaggregations[key] === 'undefined') {
                            disaggregations[key] = [];
                        }
                        //var value = translations.t(disaggregation[key]);
                        var value = disaggregation[key];
                        if (!(disaggregations[key].includes(value))) {
                            hasDisaggregations = true;
                            disaggregations[key].push(value);
                        }
                    }
                });
            });
            this.valuesByDisaggregation = Object.keys(disaggregations).map(function(key) {
                return {
                    field: key,
                    values: disaggregations[key],
                };
            });
            this.currentDisaggregation = 0;
            this.displayedDisaggregation = 0;
            this.hasDisaggregations = hasDisaggregations;
        },

        getSelectedDisaggregationIndex: function() {
            for (var i = 0; i < this.disaggregations.length; i++) {
                var disaggregation = this.disaggregations[i],
                    keys = Object.keys(disaggregation),
                    matchesSelections = true;
                for (var j = 0; j < keys.length; j++) {
                    var key = keys[j],
                        inputName = 'map-' + key,
                        selection = $('input[name="' + inputName + '"]:checked').val();
                    if (selection !== disaggregation[key]) {
                        matchesSelections = false;
                        break;
                    }
                }
                if (matchesSelections) {
                    return i;
                }
            }
            throw('Could not find match');
        },

        isDisaggegrationValidGivenCurrent: function(field, value) {
            var currentDisaggregation = Object.assign({}, this.disaggregations[this.currentDisaggregation]);
            currentDisaggregation[field] = value;
            var keys = Object.keys(currentDisaggregation);
            for (var i = 0; i < this.disaggregations.length; i++) {
                var valid = true;
                var otherDisaggregation = this.disaggregations[i];
                for (var j = 0; j < keys.length; j++) {
                    var key = keys[j];
                    if (currentDisaggregation[key] !== otherDisaggregation[key]) {
                        valid = false;
                    }
                }
                if (valid) {
                    return true;
                }
            }
            return false;
        },

    });

    // Factory function for this class.
    L.Control.disaggregationControls = function (plugin) {
        return new L.Control.DisaggregationControls(plugin);
    };
}());
