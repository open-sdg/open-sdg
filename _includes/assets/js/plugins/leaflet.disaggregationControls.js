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
            this.list = null;
            this.form = null;
            this.currentDisaggregation = 0;
            this.displayedDisaggregation = 0;
            this.seriesColumn = '{{ site.data_fields.series | default: "Series" }}';
            this.unitsColumn = '{{ site.data_fields.units | default: "Units" }}';
            this.displayForm = {{ site.map_options.disaggregation_controls | jsonify }};
            this.updateDisaggregations();
        },

        updateDisaggregations: function() {
            // TODO: Not all of this needs to be done
            // at every update.
            this.disaggregations = this.getVisibleDisaggregations();
            this.fieldsInOrder = this.getFieldsInOrder();
            this.valuesInOrder = this.getValuesInOrder();
            this.allSeries = this.getAllSeries();
            this.allUnits = this.getAllUnits();
            this.allDisaggregations = this.getAllDisaggregations();
            this.hasSeries = (this.allSeries.length > 0);
            this.hasUnits = (this.allUnits.length > 0);
            this.hasDisaggregations = this.hasDissagregationsWithValues();
        },

        getVisibleDisaggregations: function() {
            var features = this.plugin.getVisibleLayers().toGeoJSON().features;
            var disaggregations = features[0].properties.disaggregations;
            // The purpose of the rest of this function is to
            // "prune" the disaggregations by removing any keys
            // that are identical across all disaggregations.
            var allKeys = Object.keys(disaggregations[0]);
            var relevantKeys = {};
            var rememberedValues = {};
            disaggregations.forEach(function(disagg) {
                for (var i = 0; i < allKeys.length; i++) {
                    var key = allKeys[i];
                    if (rememberedValues[key]) {
                        if (rememberedValues[key] !== disagg[key]) {
                            relevantKeys[key] = true;
                        }
                    }
                    rememberedValues[key] = disagg[key];
                }
            });
            relevantKeys = Object.keys(relevantKeys);
            var pruned = [];
            disaggregations.forEach(function(disaggregation) {
                var clone = Object.assign({}, disaggregation);
                Object.keys(clone).forEach(function(key) {
                    if (!(relevantKeys.includes(key))) {
                        delete clone[key];
                    }
                });
                pruned.push(clone);
            });
            return pruned;
        },

        update: function() {
            this.updateDisaggregations();
            this.updateList();
            if (this.displayForm) {
                this.updateForm();
            }
        },

        getFieldsInOrder: function () {
            return this.plugin.dataSchema.fields.map(function(field) {
                return field.name;
            });
        },

        getValuesInOrder: function () {
            var valuesInOrder = {};
            this.plugin.dataSchema.fields.forEach(function(field) {
                if (field.constraints && field.constraints.enum) {
                    valuesInOrder[field.name] = field.constraints.enum;
                }
            });
            return valuesInOrder;
        },

        hasDissagregationsWithValues: function () {
            var hasDisaggregations = false;
            this.allDisaggregations.forEach(function(disaggregation) {
                if (disaggregation.values.length > 0 && disaggregation.values[0] !== '') {
                    hasDisaggregations = true;
                }
            });
            return hasDisaggregations;
        },

        updateList: function () {
            var list = this.list;
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
                this.allDisaggregations.forEach(function(disaggregation) {
                    var title = L.DomUtil.create('dt', 'disaggregation-title'),
                        definition = L.DomUtil.create('dd', 'disaggregation-definition'),
                        container = L.DomUtil.create('div', 'disaggregation-container'),
                        field = disaggregation.field;
                    //title.innerHTML = translations.t(key);
                    title.innerHTML = field;
                    //var disaggregationValue = translations.t(currentDisaggregation[key]);
                    var disaggregationValue = currentDisaggregation[field];
                    if (disaggregationValue !== '') {
                        definition.innerHTML = disaggregationValue;
                        container.append(title);
                        container.append(definition);
                        list.append(container);
                    }
                });
            }
        },

        updateForm: function() {
            var seriesColumn = this.seriesColumn,
                unitsColumn = this.unitsColumn,
                container = this.form,
                formInputs = L.DomUtil.create('div', 'disaggregation-form-inner'),
                that = this;
            container.innerHTML = '';
            container.append(formInputs)
            L.DomEvent.disableScrollPropagation(formInputs);
            if (this.hasSeries) {
                var form = L.DomUtil.create('div', 'disaggregation-fieldset-container'),
                    legend = L.DomUtil.create('legend', 'disaggregation-fieldset-legend'),
                    fieldset = L.DomUtil.create('fieldset', 'disaggregation-fieldset');
                legend.innerHTML = translations.indicator.series;
                fieldset.append(legend);
                form.append(fieldset);
                formInputs.append(form);
                this.allSeries.forEach(function(series) {
                    var input = L.DomUtil.create('input', 'disaggregation-input');
                    input.type = 'radio';
                    input.name = 'map-' + seriesColumn;
                    input.value = series;
                    input.tabindex = 0;
                    input.checked = (series === that.getCurrentSeries()) ? 'checked' : '';
                    var label = L.DomUtil.create('label', 'disaggregation-label');
                    label.innerHTML = series;
                    label.prepend(input);
                    fieldset.append(label);
                    input.addEventListener('change', function(e) {
                        that.currentDisaggregation = that.getSelectedDisaggregationIndex();
                        that.updateForm();
                    });
                });
            }
            if (this.hasUnits) {
                var form = L.DomUtil.create('div', 'disaggregation-fieldset-container'),
                    legend = L.DomUtil.create('legend', 'disaggregation-fieldset-legend'),
                    fieldset = L.DomUtil.create('fieldset', 'disaggregation-fieldset');
                legend.innerHTML = translations.indicator.unit_of_measurement;
                fieldset.append(legend);
                form.append(fieldset);
                formInputs.append(form);
                this.allUnits.forEach(function(unit) {
                    var input = L.DomUtil.create('input', 'disaggregation-input');
                    if (that.isDisaggegrationValidGivenCurrent(unitsColumn, unit)) {
                        input.type = 'radio';
                        input.name = 'map-' + unitsColumn;
                        input.value = unit;
                        input.tabindex = 0;
                        input.checked = (unit === that.getCurrentUnit()) ? 'checked' : '';
                        var label = L.DomUtil.create('label', 'disaggregation-label');
                        label.innerHTML = unit;
                        label.prepend(input);
                        fieldset.append(label);
                        input.addEventListener('change', function(e) {
                            that.currentDisaggregation = that.getSelectedDisaggregationIndex();
                            that.updateForm();
                        });
                    }
                });
            }
            if (this.hasDisaggregations) {
                var currentDisaggregation = this.disaggregations[this.currentDisaggregation];
                this.allDisaggregations.forEach(function (disaggregation) {
                    var form = L.DomUtil.create('div', 'disaggregation-fieldset-container'),
                        legend = L.DomUtil.create('legend', 'disaggregation-fieldset-legend'),
                        fieldset = L.DomUtil.create('fieldset', 'disaggregation-fieldset'),
                        field = disaggregation.field;
                    legend.innerHTML = field;
                    fieldset.append(legend);
                    form.append(fieldset);
                    formInputs.append(form);
                    disaggregation.values.forEach(function (value) {
                        var input = L.DomUtil.create('input', 'disaggregation-input');
                        if (that.isDisaggegrationValidGivenCurrent(field, value)) {
                            input.type = 'radio';
                            input.name = 'map-' + field;
                            input.value = value;
                            input.tabindex = 0;
                            input.checked = (value === currentDisaggregation[field]) ? 'checked' : '';
                            var label = L.DomUtil.create('label', 'disaggregation-label');
                            label.innerHTML = (value === '') ? 'All' : value;
                            label.prepend(input);
                            fieldset.append(label);
                            input.addEventListener('change', function(e) {
                                that.currentDisaggregation = that.getSelectedDisaggregationIndex();
                                that.updateForm();
                            });
                        }
                    });
                });
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

            if (this.hasSeries || this.hasUnits || this.hasDisaggregations) {
                this.list = list;
                div.append(list);
                this.updateList();

                var numSeries = this.allSeries.length,
                    numUnits = this.allUnits.length,
                    displayForm = this.displayForm;

                if (displayForm && (this.hasDisaggregations || (numSeries > 1 || numUnits > 1))) {

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
                }
            }

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

        getAllSeries: function () {
            var seriesColumn = this.seriesColumn;
            if (typeof this.disaggregations[0][seriesColumn] === 'undefined' || !this.disaggregations[0][seriesColumn]) {
                return [];
            }
            var allSeries = _.uniq(this.disaggregations.map(function(disaggregation) {
                return disaggregation[seriesColumn];
            }));
            var sortedSeries = this.valuesInOrder[seriesColumn];
            allSeries.sort(function(a, b) {
                return sortedSeries.indexOf(a) - sortedSeries.indexOf(b);
            });
            return allSeries;
        },

        getAllUnits: function () {
            var unitsColumn = this.unitsColumn;
            if (typeof this.disaggregations[0][unitsColumn] === 'undefined' || !this.disaggregations[0][unitsColumn]) {
                return [];
            }
            var allUnits = _.uniq(this.disaggregations.map(function(disaggregation) {
                return disaggregation[unitsColumn];
            }));
            var sortedUnits = this.valuesInOrder[unitsColumn];
            allUnits.sort(function(a, b) {
                return sortedUnits.indexOf(a) - sortedUnits.indexOf(b);
            });
            return allUnits;
        },

        getAllDisaggregations: function () {
            var disaggregations = this.disaggregations,
                valuesInOrder = this.valuesInOrder,
                validFields = Object.keys(disaggregations[0]),
                invalidFields = [this.seriesColumn, this.unitsColumn],
                allDisaggregations = [];

            this.fieldsInOrder.forEach(function(field) {
                if (!(invalidFields.includes(field)) && validFields.includes(field)) {
                    var sortedValues = valuesInOrder[field],
                        item = {
                            field: field,
                            values: _.uniq(disaggregations.map(function(disaggregation) {
                                return disaggregation[field];
                            })),
                        };
                    item.values.sort(function(a, b) {
                        return sortedValues.indexOf(a) - sortedValues.indexOf(b);
                    });
                    allDisaggregations.push(item);
                }
            });

            return allDisaggregations;
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
