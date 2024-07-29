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
            this.needsMapUpdate = false;
            this.seriesColumn = '{{ site.data_fields.series | default: "Series" }}';
            this.unitsColumn = '{{ site.data_fields.units | default: "Units" }}';
            this.displayForm = {{ site.map_options.disaggregation_controls | jsonify }};
            this.updateDisaggregations(plugin.startValues);
        },

        updateDisaggregations: function(startValues) {
            // TODO: Not all of this needs to be done
            // at every update.
            var features = this.getFeatures();
            if (startValues && startValues.length > 0) {
                this.currentDisaggregation = this.getStartingDisaggregation(features, startValues);
                this.displayedDisaggregation = this.currentDisaggregation;
                this.needsMapUpdate = true;
            }
            this.disaggregations = this.getVisibleDisaggregations(features);
            this.fieldsInOrder = this.getFieldsInOrder();
            this.valuesInOrder = this.getValuesInOrder();
            this.allSeries = this.getAllSeries();
            this.allUnits = this.getAllUnits();
            this.allDisaggregations = this.getAllDisaggregations();
            this.hasSeries = (this.allSeries.length > 0);
            this.hasUnits = (this.allUnits.length > 0);
            this.hasDisaggregations = this.hasDissagregationsWithValues();
            this.hasDisaggregationsWithMultipleValuesFlag = this.hasDisaggregationsWithMultipleValues();
        },

        getFeatures: function() {
            return this.plugin.getVisibleLayers().toGeoJSON().features.filter(function(feature) {
                return typeof feature.properties.disaggregations !== 'undefined';
            });
        },

        getStartingDisaggregation: function(features, startValues) {
            if (features.length === 0) {
                return;
            }
            var disaggregations = features[0].properties.disaggregations,
                fields = Object.keys(disaggregations[0]),
                validStartValues = startValues.filter(function(startValue) {
                    return fields.includes(startValue.field);
                }),
                weighted = _.sortBy(disaggregations.map(function(disaggregation, index) {
                    var disaggClone = Object.assign({}, disaggregation);
                    disaggClone.emptyFields = 0;
                    disaggClone.index = index;
                    fields.forEach(function(field) {
                        if (disaggClone[field] == '') {
                            disaggClone.emptyFields += 1;
                        }
                    });
                    return disaggClone;
                }), 'emptyFields').reverse(),
                match = weighted.find(function(disaggregation) {
                    return _.every(validStartValues, function(startValue) {
                        return disaggregation[startValue.field] === startValue.value;
                    });
                });
            if (match) {
                return match.index;
            }
            else {
                return 0;
            }
        },

        getVisibleDisaggregations: function(features) {
            if (features.length === 0) {
                return [];
            }

            var disaggregations = features[0].properties.disaggregations;
            // The purpose of the rest of this function is to identiy
            // and remove any "region columns" - ie, any columns that
            // correspond exactly to names of map regions. These columns
            // are useful on charts and tables but should not display
            // on maps.
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
            if (features.length > 1) {
                // Any columns not already identified as "relevant" might
                // be region columns.
                var regionColumnCandidates = allKeys.filter(function(item) {
                    return relevantKeys.includes(item) ? false : true;
                });
                // Compare the column value across map regions - if it is
                // different then we assume the column is a "region column".
                // For efficiency we only check the first and second region.
                var regionColumns = regionColumnCandidates.filter(function(candidate) {
                    var region1 = features[0].properties.disaggregations[0][candidate];
                    var region2 = features[1].properties.disaggregations[0][candidate];
                    return region1 === region2 ? false : true;
                });
                // Now we can treat any non-region columns as relevant.
                regionColumnCandidates.forEach(function(item) {
                    if (!regionColumns.includes(item)) {
                        relevantKeys.push(item);
                    }
                });
            }
            relevantKeys.push(this.seriesColumn);
            relevantKeys.push(this.unitsColumn);
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

        hasDisaggregationsWithMultipleValues: function () {
            var hasDisaggregations = false;
            this.allDisaggregations.forEach(function(disaggregation) {
                if (disaggregation.values.length > 1 && disaggregation.values[1] !== '') {
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
                    title.innerHTML = translations.t(field);
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
                    if (that.plugin.proxySerieses.includes(series)) {
                        label.innerHTML += ' ' + that.plugin.viewHelpers.PROXY_PILL;
                    }
                    label.prepend(input);
                    fieldset.append(label);
                    input.addEventListener('change', function(e) {
                        that.currentDisaggregation = that.getSelectedDisaggregationIndex(seriesColumn, series);
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
                            that.currentDisaggregation = that.getSelectedDisaggregationIndex(unitsColumn, unit);
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
                    legend.innerHTML = translations.t(field);
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
                            label.innerHTML = (value === '') ? translations.indicator.total : value;
                            label.prepend(input);
                            fieldset.append(label);
                            input.addEventListener('change', function(e) {
                                that.currentDisaggregation = that.getSelectedDisaggregationIndex(field, value);
                                that.updateForm();
                            });
                        }
                    });
                });
            }

            var applyButton = L.DomUtil.create('button', 'disaggregation-apply-button'),
                cancelButton = L.DomUtil.create('button', 'disaggregation-cancel-button'),
                buttonContainer = L.DomUtil.create('div', 'disaggregation-form-buttons');
            applyButton.innerHTML = translations.indicator.apply;
            buttonContainer.append(applyButton);
            cancelButton.innerHTML = translations.indicator.cancel;
            buttonContainer.append(cancelButton);
            container.append(buttonContainer);

            cancelButton.addEventListener('click', function(e) {
                that.currentDisaggregation = that.displayedDisaggregation;
                $('.disaggregation-form-outer').toggle();
                that.updateForm();
            });
            applyButton.addEventListener('click', function(e) {
                that.updateMap();
                that.updateList();
                $('.disaggregation-form-outer').toggle();
            });
        },

        updateMap: function() {
            this.needsMapUpdate = false;
            this.plugin.currentDisaggregation = this.currentDisaggregation;
            this.plugin.updatePrecision();
            this.plugin.setColorScale();
            this.plugin.updateColors();
            this.plugin.updateTooltips();
            this.plugin.selectionLegend.resetSwatches();
            this.plugin.selectionLegend.update();
            this.plugin.updateTitle();
            this.plugin.updateFooterFields();
            this.plugin.replaceYearSlider();
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

                if (displayForm && (this.hasDisaggregationsWithMultipleValuesFlag || (numSeries > 1 || numUnits > 1))) {

                    var button = L.DomUtil.create('button', 'disaggregation-button');
                    button.innerHTML = translations.indicator.change_breakdowns;
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
            if (this.plugin.configObsAttributes && this.plugin.configObsAttributes.length > 0) {
                this.plugin.configObsAttributes.forEach(function(obsAttribute) {
                    invalidFields.push(obsAttribute.field);
                });
            }

            this.fieldsInOrder.forEach(function(field) {
                if (!(invalidFields.includes(field)) && validFields.includes(field)) {
                    var sortedValues = valuesInOrder[field],
                        item = {
                            field: field,
                            values: _.uniq(disaggregations.map(function(disaggregation) {
                                return disaggregation[field];
                            })),
                        };
                    if (typeof sortedValues === 'undefined') {
                        return;
                    }
                    item.values.sort(function(a, b) {
                        return sortedValues.indexOf(a) - sortedValues.indexOf(b);
                    });
                    allDisaggregations.push(item);
                }
            });

            return allDisaggregations;
        },

        getSelectedDisaggregationIndex: function(changedKey, newValue) {
            for (var i = 0; i < this.disaggregations.length; i++) {
                var disaggregation = this.disaggregations[i],
                    keys = Object.keys(disaggregation),
                    matchesSelections = true;
                for (var j = 0; j < keys.length; j++) {
                    var key = keys[j],
                        inputName = 'map-' + key,
                        $inputElement = $('input[name="' + inputName + '"]:checked'),
                        selection = $inputElement.val();
                    if ($inputElement.length > 0 && selection !== disaggregation[key]) {
                        matchesSelections = false;
                        break;
                    }
                }
                if (matchesSelections) {
                    return i;
                }
            }
            // If we are still here, it means that a recent change
            // has resulted in an illegal combination. In this case
            // we look at the recently-changed key and its value,
            // and we pick the first disaggregation that matches.
            for (var i = 0; i < this.disaggregations.length; i++) {
                var disaggregation = this.disaggregations[i],
                    keys = Object.keys(disaggregation);
                if (keys.includes(changedKey) && disaggregation[changedKey] === newValue) {
                    return i;
                }
            }
            // If we are still here, something went wrong.
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
