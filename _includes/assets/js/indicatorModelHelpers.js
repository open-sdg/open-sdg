(function() {
  return {
    UNIT_COLUMN: 'Units',
    GEOCODE_COLUMN: 'GeoCode',
    YEAR_COLUMN: 'Year',
    VALUE_COLUMN: 'Value',
    convertJsonFormatToRows: function(data) {
      var keys = Object.keys(data);
      if (keys.length === 0) {
        return [];
      }

      return data[keys[0]].map(function(item, index) {
        return _.object(keys, keys.map(function(key) {
          return data[key][index];
        }));
      });
    },
    extractUniqueValuesByProperty: function(prop, data) {
      return _.chain(data).pluck(prop).uniq().filter(function(f) { return f; }).sortBy(function(year) {
        return year;
      }).value();
    },
    getColumnsFromData: function(data) {
      return Object.keys(data[0]);
    },
    dataHasColumn: function(column, data) {
      return this.getColumnsFromData(data).includes(column);
    },
    dataHasUnits: function(data) {
      return this.dataHasColumn(this.UNIT_COLUMN, data);
    },
    dataHasGeoCodes: function(data) {
      return this.dataHasColumn(this.GEOCODE_COLUMN, data);
    },
    getFirstUnitInData: function(data) {
      return data.find(function(row) {
        return row[this.UNIT_COLUMN];
      }, this)[this.UNIT_COLUMN];
    },
    getDataByUnit: function(data, unit) {
      return data.filter(function(row) {
        return row[this.UNIT_COLUMN] === unit;
      }, this);
    },
    getDataBySelectedFields: function(data, selectedFields) {
      return data.filter(function(row) {
        return selectedFields.some(function(field) {
          return field.values.includes(row[field.field]);
        });
      });
    },
    getDataMatchingCombination: function(data, combination, selectableFields) {
      return data.filter(function(row) {
        return selectableFields.every(function(field) {
          return row[field] === combination[field];
        });
      });
    },
    getUnitFromStartValues: function(startValues) {
      var match = startValues.find(function(startValue) {
        return startValue.field === this.UNIT_COLUMN;
      }, this);
      return (match) ? match.value : false;
    },
    selectFieldsFromStartValues: function(startValues, selectableFields) {
      if (!startValues) {
        return [];
      }
      var specialFields = this.nonFieldColumns();
      var allowedStartValues = startValues.filter(function(startValue) {
        var normalField = !specialFields.includes(startValue.field);
        var allowedField = selectableFields.includes(startValue.field)
        return normalField && allowedField;
      });
      var valuesByField = {};
      allowedStartValues.forEach(function(startValue) {
        if (!(startValue.field in valuesByField)) {
          valuesByField[startValue.field] = [];
        }
        valuesByField[startValue.field].push(startValue.value);
      });
      return Object.keys(valuesByField).map(function(field) {
        return {
          field: field,
          values: valuesByField[field],
        };
      });
    },
    selectMinimumStartingFields: function(data, fieldNames) {
      var filteredData = data.filter(function(row) {
        return fieldNames.some(function(fieldName) {
          return row[fieldName];
        });
      });
      // Sort the data by each field. We go in reverse order so that the
      // first field will be highest "priority" in the sort.
      fieldNames.reverse().forEach(function(fieldName) {
        filteredData = _.sortBy(filteredData, fieldName);
      });
      // But actually we want the top-priority sort to be the "size" of the
      // rows. In other words we want the row with the fewest number of fields.
      filteredData = _.sortBy(filteredData, function(row) { return Object.keys(row).length; });

      // Convert to an array of objects with 'field' and 'values' keys, omitting
      // any special columns.
      var nonFieldColumns = this.nonFieldColumns();
      return Object.keys(filteredData[0]).filter(function(key) {
        return !nonFieldColumns.includes(key);
      }).map(function(field) {
        return {
          field: field,
          values: [filteredData[0][field]]
        };
      });
    },
    nonFieldColumns: function() {
      return [
        this.YEAR_COLUMN,
        this.VALUE_COLUMN,
        this.UNIT_COLUMN,
        this.GEOCODE_COLUMN,
        'Observation status',
        'Unit multiplier',
        'Unit measure',
      ];
    },
    getFieldColumnsFromArray: function(arr) {
      var omit = this.nonFieldColumns();
      return arr.filter(function(col) { return !omit.includes(col); });
    },
    getFieldColumnsFromData: function(data) {
      return this.getFieldColumnsFromArray(this.getColumnsFromData(data));
    },
    fieldsUsedByUnit: function(units, data) {
      var fields = this.getFieldColumnsFromData(data);
      return units.map(function(unit) {
        return {
          unit: unit,
          fields: fields.filter(function(field) {
            return this.fieldIsUsedInDataWithUnit(field, unit, data);
          }, this),
        }
      }, this);
    },
    fieldIsUsedInDataWithUnit: function(field, unit, data) {
      return data.some(function(row) {
        return row[field] && row[this.UNIT_COLUMN] === unit;
      }, this);
    },
    // Expects the output of the fieldsUsedByUnit method.
    dataHasUnitSpecificFields: function(fieldsUsedByUnit) {
      return !_.every(_.pluck(fieldsUsedByUnit, 'fields'), function(fields) {
        return _.isEqual(_.sortBy(_.pluck(fieldsUsedByUnit, 'fields')[0]), _.sortBy(fields));
      });
    },
    sortFieldItemStates: function(fieldItemStates, edges) {
      if (edges.length > 0) {
        var orderedEdges = _.chain(edges)
          .groupBy('From')
          .map(function(value, key) { return [key].concat(_.pluck(value, 'To')); })
          .flatten()
          .value();

        var customOrder = orderedEdges.concat(_.difference(_.pluck(fieldItemStates, 'field'), orderedEdges));

        // now order the fields:
        return _.sortBy(fieldItemStates, function(item) {
          return customOrder.indexOf(item.field);
        });
      }
      return fieldItemStates;
    },
    getInitialFieldItemStates: function(data, edges) {
      var initial = this.getFieldColumnsFromData(data).map(function(field) {
        return {
          field: field,
          hasData: true,
          values: this.extractUniqueValuesByProperty(field, data).map(function(value) {
            return {
              value: value,
              state: 'default',
              checked: false,
              hasData: true
            };
          }, this),
        };
      }, this);

      return this.sortFieldItemStates(initial, edges);
    },
    fieldItemStatesForUnit: function(fieldItemStates, fieldsByUnit, selectedUnit) {
      return fieldItemStates.filter(function(fis) {
        var fieldsBySelectedUnit = fieldsByUnit.filter(function(fieldByUnit) {
          return fieldByUnit.unit === selectedUnit;
        })[0];
        return fieldsBySelectedUnit.fields.includes(fis.field);
      });
    },
    getChildFieldNames: function(edges) {
      return edges.map(function(edge) { return edge.To; });
    },
    getParentFieldNames: function(edges) {
      return edges.map(function(edge) { return edge.From; });
    },
    getChildFieldNamesByParent: function(edges, parent) {
      var children = edges.filter(function(edge) {
        return edge.From === parent;
      });
      return this.getChildFieldNames(children);
    },
    // Expects the output of the fieldItemStates method.
    validParentsByChild: function(edges, fieldItemStates, data) {
      var parentFields = this.getParentFieldNames(edges);
      var childFields = this.getChildFieldNames(edges);
      var validParentsByChild = {};
      _.each(childFields, function(childField, fieldIndex) {
        var fieldItemState = _.findWhere(fieldItemStates, {field: childField});
        var childValues = _.pluck(fieldItemState.values, 'value');
        var parentField = parentFields[fieldIndex];
        validParentsByChild[childField] = {};
        _.each(childValues, function(childValue) {
          var rowsWithParentValues = _.filter(data, function(row) {
            var childMatch = row[childField] == childValue;
            var parentNotEmpty = row[parentField];
            return childMatch && parentNotEmpty;
          });
          var parentValues = _.pluck(rowsWithParentValues, parentField);
          parentValues = _.uniq(parentValues);
          validParentsByChild[childField][childValue] = parentValues;
        });
      });
      return validParentsByChild;
    },
    getFieldNames: function(fieldItems) {
      return fieldItems.map(function(item) { return item.field; });
    },
    getInitialAllowedFields: function(fields, edges) {
      return _.difference(fields, this.getChildFieldNames(edges));
    },
    prepareData: function(data) {
      return data.map(function(item) {

        if (item.Value != 0) {
          // For rounding, use a function that can be set on the global opensdg
          // object, for easier control: opensdg.dataRounding()
          if (typeof opensdg.dataRounding === 'function') {
            item.Value = opensdg.dataRounding(item.Value);
          }
        }

        // remove any undefined/null values:
        _.each(Object.keys(item), function(key) {
          if(_.isNull(item[key]) || _.isUndefined(item[key])) {
            delete item[key];
          }
        });

        return item;
      }, this).filter(function(item) {
        // Remove anything without a value (allowing for zero as a value).
        return item[this.VALUE_COLUMN] || item[this.VALUE_COLUMN] === 0;
      }, this);
    },
    getBaseDataset: function() {
      return Object.assign({}, {
        fill: false,
        pointHoverRadius: 5,
        pointBackgroundColor: '#FFFFFF',
        pointHoverBorderWidth: 1,
        tension: 0,
        spanGaps: false
      });
    },
    footerFields: function(model) {
      var fields = {}
      fields[translations.indicator.source] = model.dataSource;
      fields[translations.indicator.geographical_area] = model.geographicalArea;
      fields[translations.indicator.unit_of_measurement] = model.measurementUnit;
      fields[translations.indicator.copyright] = model.copyright;
      fields[translations.indicator.footnote] = model.footnote;
      // Filter out the empty values.
      return _.pick(fields, _.identity);
    },
    getHeadline: function(selectableFields, data) {
      return data.filter(function (row) {
        return selectableFields.every(function(field) {
          return !row[field];
        });
      }).map(function (row) {
        // Remove null fields in each row.
        return _.pick(row, function(val) { return val !== null });
      });
    },
    sortData: function(data, selectedUnit) {
      var column = selectedUnit ? this.UNIT_COLUMN : this.YEAR_COLUMN;
      return _.sortBy(data, column);
    },
    getHeadlineTable: function(data, selectedUnit) {
      return {
        title: 'Headline data',
        headings: selectedUnit ? ['Year', 'Units', 'Value'] : ['Year', 'Value'],
        data: data.map(function (row) {
          return selectedUnit ? [row.Year, row.Units, row.Value] : [row.Year, row.Value];
        }),
      };
    },
    removeOrphanSelections: function(selectedFields, edges) {
      var selectedFieldNames = _.pluck(selectedFields, 'field');
      edges.forEach(function(edge) {
        if(!selectedFieldNames.includes(edge.From)) {
          // don't allow any child fields of this association:
          selectedFields = _.without(selectedFields, _.findWhere(selectedFields, {
            field: edge.From
          }));
        }
      });
      return selectedFields;
    },
    getAllowedFieldsWithChildren: function(selectableFields, edges, selectedFields) {
      var allowedFields = this.getInitialAllowedFields(selectableFields, edges);
      var selectedFieldNames = this.getFieldNames(selectedFields);
      this.getParentFieldNames(edges).forEach(function(parentFieldName) {
        if (selectedFieldNames.includes(parentFieldName)) {
          var childFieldNames = this.getChildFieldNamesByParent(edges, parentFieldName);
          allowedFields = allowedFields.concat(childFieldNames);
        }
      }, this);
      return  _.uniq(allowedFields);
    },
    getUpdatedFieldItemStates: function(fieldItemStates, edges, selectedFields, validParentsByChild) {
      var selectedFieldNames = this.getFieldNames(selectedFields);
      this.getParentFieldNames(edges).forEach(function(parentFieldName) {
        if (selectedFieldNames.includes(parentFieldName)) {
          var childFieldNames = this.getChildFieldNamesByParent(edges, parentFieldName);
          var selectedParent = selectedFields.find(function(selectedField) {
            return selectedField.field === parentFieldName;
          }, this);
          fieldItemStates.forEach(function(fieldItem) {
            if (childFieldNames.includes(fieldItem.field)) {
              var fieldHasData = false;
              fieldItem.values.forEach(function(childValue) {
                var valueHasData = false;
                selectedParent.values.forEach(function(parentValue) {
                  if (validParentsByChild[fieldItem.field][childValue.value].includes(parentValue)) {
                    valueHasData = true;
                    fieldHasData = true;
                  }
                }, this);
                childValue.hasData = valueHasData;
              }, this);
              fieldItem.hasData = fieldHasData;
            }
          }, this);
        }
      }, this);
      return fieldItemStates;
    },
    fieldItemStatesForView: function(fieldItemStates, fieldsByUnit, selectedUnit, dataHasUnitSpecificFields, selectedFields) {
      var states = fieldItemStates.map(function(item) { return item; });
      if (dataHasUnitSpecificFields) {
        states = this.fieldItemStatesForUnit(fieldItemStates, fieldsByUnit, selectedUnit);
      }
      if (selectedFields.length > 0) {
        states.forEach(function(fieldItem) {
          var selectedField = selectedFields.find(function(selectedItem) {
            return selectedItem.field === fieldItem.field;
          });
          if (selectedField) {
            selectedField.values.forEach(function(selectedValue) {
              var fieldItemValue = fieldItem.values.find(function(valueItem) {
                return valueItem.value === selectedValue;
              });
              fieldItemValue.checked = true;
            })
          }
        });
      }
      return states;
    },
    getChartTitle: function(currentTitle, allTitles, selectedUnit) {
      var newTitle = currentTitle;
      if (allTitles && allTitles.length > 0) {
        var unitTitle = allTitles.find(function(title) { return title.unit === selectedUnit });
        newTitle = (unitTitle) ? unitTitle.title : allTitles[0].title;
      }
      return newTitle;
    },
    getCombinationData: function(fieldItems) {

      // First get a list of all the single field/value pairs.
      var fieldValuePairs = [];
      fieldItems.forEach(function(fieldItem) {
        fieldItem.values.forEach(function(value) {
          var pair = {};
          pair[fieldItem.field] = value;
          fieldValuePairs.push(pair);
        });
      });

      // Next get a list of each single pair combined with every other.
      var fieldValuePairCombinations = {};
      fieldValuePairs.forEach(function(fieldValuePair) {
        var combinationsForCurrentPair = Object.assign({}, fieldValuePair);
        fieldValuePairs.forEach(function(fieldValuePairToAdd) {
          // The following conditional reflects that we're not interested in combinations
          // within the same field. (Eg, not interested in combination of Female and Male).
          if (Object.keys(fieldValuePair)[0] !== Object.keys(fieldValuePairToAdd)[0]) {
            Object.assign(combinationsForCurrentPair, fieldValuePairToAdd);
            var combinationKeys = Object.keys(combinationsForCurrentPair).sort();
            var combinationValues = Object.values(combinationsForCurrentPair).sort();
            var combinationUniqueId = JSON.stringify(combinationKeys.concat(combinationValues));
            if (!(combinationUniqueId in fieldValuePairCombinations)) {
              fieldValuePairCombinations[combinationUniqueId] = Object.assign({}, combinationsForCurrentPair);
            }
          }
        });
      });
      fieldValuePairCombinations = Object.values(fieldValuePairCombinations);

      // Return a combination of both.
      return fieldValuePairs.concat(fieldValuePairCombinations);
    },
    getCombinationDescription: function(combination, fallback) {
      var keys = Object.keys(combination);
      if (keys.length === 0) {
        return fallback;
      }
      return keys.map(function(key) {
        return translations.t(combination[key]);
      }).join(', ');
    },
    getHeadlineColor: function() {
      // TODO: Make this dynamic to support high-contrast.
      return '777777';
    },
    getHeadlineBackground: function() {
      // TODO: Make this dynamic to support high-contrast.
      return '#FFFFFF';
    },
    getColor: function(datasetIndex, colors) {
      if (datasetIndex > colors.length) {
        return colors[datasetIndex - colors.length];
      } else {
        return colors[datasetIndex];
      }
    },
    getBackground: function(datasetIndex, colors) {
      var color = this.getBackgroundColor(datasetIndex, colors);

      if (datasetIndex > colors.length) {
        color = getBackgroundPattern(color);
      }

      return color;
    },
    getBackgroundColor: function(datasetIndex, colors) {
      return '#' + this.getColor(datasetIndex, colors);
    },
    getBackgroundPattern: function(color) {
      if (window.pattern && typeof window.pattern.draw === 'function') {
        return window.pattern.draw('diagonal', color);
      }
      return color;
    },
    getBorderDash: function(datasetIndex, colors) {
      return datasetIndex > colors.length ? [5, 5] : undefined;
    },
    prepareDataForDataset: function(years, data) {
      return years.map(function(year) {
        return data
          .filter(function(row) { return row[this.YEAR_COLUMN] === year; }, this)
          .map(function(row) { return row[this.VALUE_COLUMN]; }, this)[0];
      }, this);
    },
    makeHeadlineDataset: function(years, data, label) {
      var dataset = this.getBaseDataset();
      return Object.assign(dataset, {
        label: label,
        borderColor: '#' + this.getHeadlineColor(),
        backgroundColor: this.getHeadlineBackground(),
        pointBorderColor: '#' + this.getHeadlineColor(),
        data: this.prepareDataForDataset(years, data),
      });
    },
    makeDataset: function (years, data, combination, labelFallback, color, background, border) {
      var dataset = this.getBaseDataset();
      return Object.assign(dataset, {
        label: this.getCombinationDescription(combination, labelFallback),
        disaggregation: combination,
        borderColor: '#' + color,
        backgroundColor: background,
        pointBorderColor: '#' + color,
        borderDash: border,
        borderWidth: 4,
        data: this.prepareDataForDataset(years, data),
      });
    },
    getDatasets: function(headline, data, combinations, years, defaultLabel, colors, selectableFields) {
      var datasets = [], index = 0, dataset, color, background, border;
      combinations.forEach(function(combination) {
        var filteredData = this.getDataMatchingCombination(data, combination, selectableFields);
        if (filteredData.length > 0) {
          color = this.getColor(index, colors);
          background = this.getBackground(index, colors);
          border = this.getBorderDash(index, colors);
          dataset = this.makeDataset(years, filteredData, combination, defaultLabel, color, background, border);
          datasets.push(dataset);
          index++;
        }
      }, this);
      datasets.sort(function(a, b) { return a.label > b.label; });
      if (headline.length > 0) {
        color = this.getHeadlineColor();
        background = this.getHeadlineBackground();
        dataset = this.makeHeadlineDataset(years, headline, defaultLabel);
        datasets.unshift(dataset);
      }
      return datasets;
    },
    tableDataFromDatasets: function(datasets, years) {
      return {
        headings: [this.YEAR_COLUMN].concat(datasets.map(function(ds) { return ds.label; })),
        data: years.map(function(year, index) {
          return [year].concat(datasets.map(function(ds) { return ds.data[index]; }));
        }),
      };
    },
  }
})();
