{% comment %}
/**
 * Helper functions to be used in indicatorModel.js.
 *
 * Notes on parameters - here are some details on common parameters in the
 * methods throughout these files:
 * - Rows: This is an array of objects representing data. For example:
 *   [
 *     {Year: 2015, Value: 1},
 *     {Year: 2016, Value: 2}
 *   ]
 * - Field names: This is a flat array of strings. For example: ['Location', 'Sex']
 * - Field items: This is an array of objects representing fields. For example:
 *   [
 *     {field: 'Location', values: ['Rural', 'Urban']},
 *     {field: 'Sex', values: ['Female', 'Male']}
 *   ]
 * - Field item states: This is an array of object similar to "Field items",
 *   but with extra information. For example:
 *   [
 *     {
 *       field: 'Location',
 *       hasData: true,
 *       values: [
 *         {
 *           value: 'Rural',
 *           hasData: true
 *         }
 *       ]
 *     }
 *   ]
 * - Edges: An array of objects containing 'From' and 'To'. For example:
 *   [
 *     { From: 'Location', To: 'Sex' },
 *     { From: 'Location', To: 'Age' }
 *   ]
 */
{% endcomment %}
(function() {

  // Private helper functions.
  {% include assets/js/indicatorModelConstants.js %}
  {% include assets/js/indicatorModelFieldHelpers.js %}
  {% include assets/js/indicatorModelChartHelpers.js %}

  // Public helper functions.
  return {
    UNIT_COLUMN: UNIT_COLUMN,
    GEOCODE_COLUMN: GEOCODE_COLUMN,
    YEAR_COLUMN: YEAR_COLUMN,
    VALUE_COLUMN: VALUE_COLUMN,

    /**
     * @param {Object} data Object imported from JSON file
     * @return {Array} Rows
     */
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

    /**
     * @see getUniqueValuesByProperty in indicatorModelFieldHelpers.js
     */
    getUniqueValuesByProperty: getUniqueValuesByProperty,

    /**
     * @param {Array} rows
     * @return {boolean}
     */
    dataHasUnits: function(rows) {
      return dataHasColumn(UNIT_COLUMN, rows);
    },

    /**
     * @param {Array} rows
     * @return {boolean}
     */
    dataHasGeoCodes: function(rows) {
      return dataHasColumn(GEOCODE_COLUMN, rows);
    },

    /**
     * @param {Array} rows
     * @return {string}
     */
    getFirstUnitInData: function(rows) {
      return rows.find(function(row) {
        return row[UNIT_COLUMN];
      }, this)[UNIT_COLUMN];
    },

    /**
     * @param {Array} rows
     * @param {string} unit
     * @return {Array} Rows
     */
    getDataByUnit: function(rows, unit) {
      return rows.filter(function(row) {
        return row[UNIT_COLUMN] === unit;
      }, this);
    },

    /**
     * @param {Array} rows
     * @param {Array} selectedFields Field items
     * @return {Array} Rows
     */
    getDataBySelectedFields: function(rows, selectedFields) {
      return rows.filter(function(row) {
        return selectedFields.some(function(field) {
          return field.values.includes(row[field.field]);
        });
      });
    },

    /**
     * @param {Array} startValues Objects containing 'field' and 'value'
     * @return {string|boolean} Unit, or false if none were found
     */
    getUnitFromStartValues: function(startValues) {
      var match = startValues.find(function(startValue) {
        return startValue.field === UNIT_COLUMN;
      }, this);
      return (match) ? match.value : false;
    },

    /**
     * @param {Array} startValues Objects containing 'field' and 'value'
     * @param {Array} selectableFieldNames
     * @return {Array} Field items
     */
    selectFieldsFromStartValues: function(startValues, selectableFieldNames) {
      if (!startValues) {
        return [];
      }
      var allowedStartValues = startValues.filter(function(startValue) {
        var normalField = !nonFieldColumns().includes(startValue.field);
        var allowedField = selectableFieldNames.includes(startValue.field)
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

    /**
     * @param {Array} rows
     * @param {Array} selectableFieldNames Field names
     * @return {Array} Field items
     */
    selectMinimumStartingFields: function(rows, selectableFieldNames) {
      var filteredData = rows.filter(function(row) {
        return selectableFieldNames.some(function(fieldName) {
          return row[fieldName];
        });
      });
      // Sort the data by each field. We go in reverse order so that the
      // first field will be highest "priority" in the sort.
      selectableFieldNames.reverse().forEach(function(fieldName) {
        filteredData = _.sortBy(filteredData, fieldName);
      });
      // But actually we want the top-priority sort to be the "size" of the
      // rows. In other words we want the row with the fewest number of fields.
      filteredData = _.sortBy(filteredData, function(row) { return Object.keys(row).length; });

      // Convert to an array of objects with 'field' and 'values' keys, omitting
      // any non-field columns.
      return Object.keys(filteredData[0]).filter(function(key) {
        return !nonFieldColumns().includes(key);
      }).map(function(field) {
        return {
          field: field,
          values: [filteredData[0][field]]
        };
      });
    },

    /**
     * @param {Array} units
     * @param {Array} rows
     * @return {Array} Field names
     */
    fieldsUsedByUnit: function(units, rows) {
      var fields = getFieldColumnsFromData(rows);
      return units.map(function(unit) {
        return {
          unit: unit,
          fields: fields.filter(function(field) {
            return fieldIsUsedInDataWithUnit(field, unit, rows);
          }, this),
        }
      }, this);
    },

    /**
     * @param {Array} fieldsUsedByUnit Field names
     * @return {boolean}
     */
    dataHasUnitSpecificFields: function(fieldsUsedByUnit) {
      return !_.every(_.pluck(fieldsUsedByUnit, 'fields'), function(fields) {
        return _.isEqual(_.sortBy(_.pluck(fieldsUsedByUnit, 'fields')[0]), _.sortBy(fields));
      });
    },

    /**
     *
     * @param {Array} rows
     * @param {Array} edges
     * @return {Array} Field item states
     */
    getInitialFieldItemStates: function(rows, edges) {
      var initial = getFieldColumnsFromData(rows).map(function(field) {
        return {
          field: field,
          hasData: true,
          values: this.getUniqueValuesByProperty(field, rows).map(function(value) {
            return {
              value: value,
              state: 'default',
              checked: false,
              hasData: true
            };
          }, this),
        };
      }, this);

      return sortFieldItemStates(initial, edges);
    },

    /**
     * @param {Array} edges
     * @param {Array} fieldItemStates
     * @param {Array} rows
     * @return {Object} Arrays of parents keyed to children
     */
    validParentsByChild: function(edges, fieldItemStates, rows) {
      var parentFields = getParentFieldNames(edges);
      var childFields = getChildFieldNames(edges);
      var validParentsByChild = {};
      childFields.forEach(function(childField, fieldIndex) {
        var fieldItemState = fieldItemStates.find(function(fis) {
          return fis.field === childField;
        });
        var childValues = fieldItemState.values.map(function(value) {
          return value.value;
        });
        var parentField = parentFields[fieldIndex];
        validParentsByChild[childField] = {};
        childValues.forEach(function(childValue) {
          var rowsWithParentValues = rows.filter(function(row) {
            var childMatch = row[childField] == childValue;
            var parentNotEmpty = row[parentField];
            return childMatch && parentNotEmpty;
          });
          var parentValues = rowsWithParentValues.map(function(row) {
            return row[parentField];
          });
          parentValues = parentValues.filter(isElementUniqueInArray);
          validParentsByChild[childField][childValue] = parentValues;
        });
      });
      return validParentsByChild;
    },

    /**
     * @param {Array} fieldItems
     * @return {Array} Field names
     */
    getFieldNames: function(fieldItems) {
      return fieldItems.map(function(item) { return item.field; });
    },

    /**
     *
     * @param {Array} fieldNames
     * @param {Array} edges
     * @return {Array} Field names
     */
    getInitialAllowedFields: function(fieldNames, edges) {
      var children = getChildFieldNames(edges);
      return fieldNames.filter(function(field) { return !children.includes(field); });
    },

    /**
     * @param {Array} rows
     * @return {Array} Prepared rows
     */
    prepareData: function(rows) {
      return rows.map(function(item) {

        if (item.Value != 0) {
          // For rounding, use a function that can be set on the global opensdg
          // object, for easier control: opensdg.dataRounding()
          if (typeof opensdg.dataRounding === 'function') {
            item.Value = opensdg.dataRounding(item.Value);
          }
        }

        // remove any undefined/null values:
        Object.keys(item).forEach(function(key) {
          if (item[key] === null || typeof item[key] === 'undefined') {
            delete item[key];
          }
        });

        return item;
      }, this).filter(function(item) {
        // Remove anything without a value (allowing for zero as a value).
        return item[VALUE_COLUMN] || item[VALUE_COLUMN] === 0;
      }, this);
    },

    /**
     * @param {Object} model
     * @return {Object} Translated footer fields keyed to values
     */
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

    /**
     * @param {Array} selectableFields Field names
     * @param {Array} rows
     * @return {Array} Headline rows
     */
    getHeadline: function(selectableFields, rows) {
      return rows.filter(function (row) {
        return selectableFields.every(function(field) {
          return !row[field];
        });
      }).map(function (row) {
        // Remove null fields in each row.
        return _.pick(row, function(val) { return val !== null });
      });
    },

    /**
     * @param {Array} rows
     * @param {string} selectedUnit
     * @return {Array} Sorted rows
     */
    sortData: function(rows, selectedUnit) {
      var column = selectedUnit ? UNIT_COLUMN : YEAR_COLUMN;
      return _.sortBy(rows, column);
    },

    /**
     * @param {Array} rows
     * @param {string} selectedUnit
     * @return {Object} Object containing 'title', 'headings', and 'data'
     */
    getHeadlineTable: function(rows, selectedUnit) {
      return {
        title: 'Headline data',
        headings: selectedUnit ? [YEAR_COLUMN, UNIT_COLUMN, VALUE_COLUMN] : [YEAR_COLUMN, VALUE_COLUMN],
        data: rows.map(function (row) {
          return selectedUnit ? [row[YEAR_COLUMN], row[UNIT_COLUMN], row[VALUE_COLUMN]] : [row[YEAR_COLUMN], row[VALUE_COLUMN]];
        }),
      };
    },

    /**
     * @param {Array} selectedFields Field names
     * @param {Array} edges
     * @return {Array} Selected fields without orphans
     */
    removeOrphanSelections: function(selectedFields, edges) {
      var selectedFieldNames = selectedFields.map(function(selectedField) {
        return selectedField.field;
      });
      edges.forEach(function(edge) {
        if (!selectedFieldNames.includes(edge.From)) {
          selectedFields = selectedFields.filter(function(selectedField) {
            return selectedField.field !== edge.From;
          });
        }
      });
      return selectedFields;
    },

    /**
     * @param {Array} selectableFields Field names
     * @param {Array} edges
     * @param {Array} selectedFields Field items
     * @return {Array} Field names
     */
    getAllowedFieldsWithChildren: function(selectableFields, edges, selectedFields) {
      var allowedFields = this.getInitialAllowedFields(selectableFields, edges);
      var selectedFieldNames = this.getFieldNames(selectedFields);
      getParentFieldNames(edges).forEach(function(parentFieldName) {
        if (selectedFieldNames.includes(parentFieldName)) {
          var childFieldNames = getChildFieldNamesByParent(edges, parentFieldName);
          allowedFields = allowedFields.concat(childFieldNames);
        }
      }, this);
      return allowedFields.filter(isElementUniqueInArray);
    },

    /**
     * @param {Array} fieldItemStates
     * @param {Array} edges
     * @param {Array} selectedFields Field items
     * @param {Object} validParentsByChild Arrays of parents keyed to children
     * @return {Array} Field item states
     */
    getUpdatedFieldItemStates: function(fieldItemStates, edges, selectedFields, validParentsByChild) {
      var selectedFieldNames = this.getFieldNames(selectedFields);
      getParentFieldNames(edges).forEach(function(parentFieldName) {
        if (selectedFieldNames.includes(parentFieldName)) {
          var childFieldNames = getChildFieldNamesByParent(edges, parentFieldName);
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

    /**
     * @param {Array} fieldItemStates
     * @param {Array} fieldsByUnit Field names
     * @param {string} selectedUnit
     * @param {boolean} dataHasUnitSpecificFields
     * @param {Array} selectedFields Field items
     * @return {Array} Field item states
     */
    fieldItemStatesForView: function(fieldItemStates, fieldsByUnit, selectedUnit, dataHasUnitSpecificFields, selectedFields) {
      var states = fieldItemStates.map(function(item) { return item; });
      if (dataHasUnitSpecificFields) {
        states = fieldItemStatesForUnit(fieldItemStates, fieldsByUnit, selectedUnit);
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

    /**
     * @param {string} currentTitle
     * @param {Array} allTitles Objects containing 'unit' and 'title'
     * @param {String} selectedUnit
     * @return {String} Updated title
     */
    getChartTitle: function(currentTitle, allTitles, selectedUnit) {
      var newTitle = currentTitle;
      if (allTitles && allTitles.length > 0) {
        var unitTitle = allTitles.find(function(title) { return title.unit === selectedUnit });
        newTitle = (unitTitle) ? unitTitle.title : allTitles[0].title;
      }
      return newTitle;
    },

    /**
     * @param {Array} fieldItems
     * @return {Array} Objects representing disaggregation combinations
     */
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

    /**
     * @param {Array} headline Rows
     * @param {Array} rows
     * @param {Array} combinations Objects representing disaggregation combinations
     * @param {Array} years
     * @param {string} defaultLabel
     * @param {Array} colors
     * @param {Array} selectableFields Field names
     * @return {Array} Datasets suitable for Chart.js
     */
    getDatasets: function(headline, data, combinations, years, defaultLabel, colors, selectableFields) {
      var datasets = [], index = 0, dataset, color, background, border;
      combinations.forEach(function(combination) {
        var filteredData = getDataMatchingCombination(data, combination, selectableFields);
        if (filteredData.length > 0) {
          color = getColor(index, colors);
          background = getBackground(index, colors);
          border = getBorderDash(index, colors);
          dataset = makeDataset(years, filteredData, combination, defaultLabel, color, background, border);
          datasets.push(dataset);
          index++;
        }
      }, this);
      datasets.sort(function(a, b) { return a.label > b.label; });
      if (headline.length > 0) {
        color = getHeadlineColor();
        background = getHeadlineBackground();
        dataset = makeHeadlineDataset(years, headline, defaultLabel);
        datasets.unshift(dataset);
      }
      return datasets;
    },

    /**
     * @param {Array} datasets
     * @param {Array} years
     * @return {Object} Object containing 'headings' and 'data'
     */
    tableDataFromDatasets: function(datasets, years) {
      return {
        headings: [YEAR_COLUMN].concat(datasets.map(function(ds) { return ds.label; })),
        data: years.map(function(year, index) {
          return [year].concat(datasets.map(function(ds) { return ds.data[index]; }));
        }),
      };
    },
  }
})();
