(function() {
  return {
    UNIT_COLUMN: 'Units',
    GEOCODE_COLUMN: 'GeoCode',
    YEAR_COLUMN: 'Year',
    VALUE_COLUMN: 'Value',
    convertJsonFormat: function(data) {
      var keys = _.keys(data);

      return _.map(data[keys[0]], function(item, i) {
        return _.object(keys, _.map(keys, function(k) {
          return data[k][i];
        }));
      });
    },
    extractUnique: function(prop, data) {
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
    getInitialFieldItemStates: function(data) {
      return this.getFieldColumnsFromData(data).map(function(field) {
        return {
          field: field,
          hasData: true,
          values: this.extractUnique(field, data).map(function(value) {
            return {
              value: value,
              state: 'default',
              hasData: true
            };
          }, this),
        };
      }, this);
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
    chartBaseDataset: function() {
      return {
        fill: false,
        pointHoverRadius: 5,
        pointBackgroundColor: '#ffffff',
        pointHoverBorderWidth: 1,
        tension: 0,
        spanGaps: false
      };
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
    getHeadline: function(selectableFields, selectedUnit, data) {
      var column = selectedUnit ? this.UNIT_COLUMN : this.YEAR_COLUMN;
      return data.filter(function (row) {
        return selectableFields.every(function(field) {
          return !row[field];
        });
      }).map(function (row) {
        return _.pick(row, function(val) { return val !== null });
      }).sort(function (a, b) {
        return a[column] - b[column];
      })
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
        console.log(parentFieldName);
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
  }
})();
