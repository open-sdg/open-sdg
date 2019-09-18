var indicatorModel = function (options) {

  Array.prototype.containsValue = function(val) {
    return this.indexOf(val) != -1;
  };

  // events:
  this.onDataComplete = new event(this);
  this.onSeriesComplete = new event(this);
  this.onSeriesSelectedChanged = new event(this);
  this.onUnitsComplete = new event(this);
  this.onUnitsSelectedChanged = new event(this);
  this.onFieldsStatusUpdated = new event(this);
  this.onFieldsCleared = new event(this);
  this.onSelectionUpdate = new event(this);
  this.onNoHeadlineData = new event(this);

  // json conversion:
  var convertJsonFormat = function(data) {
    var keys = _.keys(data);

    return _.map(data[keys[0]], function(item, i) {
      return _.object(keys, _.map(keys, function(k) {
        return data[k][i];
      }));
    });
  }

  // general members:
  var that = this;
  this.data = convertJsonFormat(options.data);
  this.edgesData = convertJsonFormat(options.edgesData);
  this.hasHeadline = true;
  this.country = options.country;
  this.indicatorId = options.indicatorId;
  this.shortIndicatorId = options.shortIndicatorId;
  this.chartTitle = options.chartTitle;
  this.graphType = options.graphType;
  this.measurementUnit = options.measurementUnit;
  this.copyright = options.copyright;
  this.dataSource = options.dataSource;
  this.geographicalArea = options.geographicalArea;
  this.footnote = options.footnote;
  this.startValues = options.startValues;
  this.showData = options.showData;
  this.selectedFields = [];
  this.allowedFields = [];
  this.selectedUnit = undefined;
  this.fieldsByUnit = undefined;
  this.dataHasUnitSpecificFields = false;
  this.fieldValueStatuses = [];
  this.validParentsByChild = {};
  this.hasGeoData = false;
  this.geoData = [];
  this.geoCodeRegEx = options.geoCodeRegEx;
  this.showMap = options.showMap;

  // initialise the field information, unique fields and unique values for each field:
  (function initialise() {

    var extractUnique = function(prop) {
      return _.chain(that.data).pluck(prop).uniq().sortBy(function(year) {
        return year;
      }).value();
    };

    that.years = extractUnique('Year');

    if(that.data[0].hasOwnProperty('GeoCode')) {
      that.hasGeoData = true;

      // Year, GeoCode, Value
      that.geoData = _.filter(that.data, function(dataItem) {
        return dataItem.GeoCode;
      });
    }

    if(that.data[0].hasOwnProperty('Units')) {
      that.units = extractUnique('Units');
      that.selectedUnit = that.units[0];

      // what fields have values for a given unit?
      that.fieldsByUnit = _.chain(_.map(that.units, function(unit) {
        return _.map(_.filter(Object.keys(that.data[0]), function (key) {
              return ['Year', 'Value', 'Units'].indexOf(key) === -1;
          }), function(field) {
          return {
            unit: unit,
            field: field,
            fieldData: !!_.find(_.where(that.data, { Units: unit }), function(d) { return d[field]; })
          };
        });
      })).map(function(r) {
        return r.length ? {
          unit: r[0].unit,
          fields: _.pluck(_.where(r, { fieldData: true }), 'field')
        } : {};
      }).value();

      // determine if the fields vary by unit:
      that.dataHasUnitSpecificFields = !_.every(_.pluck(that.fieldsByUnit, 'fields'), function(fields) {
        return _.isEqual(_.sortBy(_.pluck(that.fieldsByUnit, 'fields')[0]), _.sortBy(fields));
      });
    }

    that.fieldItemStates = _.map(_.filter(Object.keys(that.data[0]), function (key) {
        return ['Year', 'Value', 'Units', 'GeoCode', 'Observation status', 'Unit multiplier', 'Unit measure'].indexOf(key) === -1;
      }), function(field) {
      return {
        field: field,
        hasData: true,
        values: _.map(_.chain(that.data).pluck(field).uniq().filter(function(f) { return f; }).sort().value(),
          function(f) { return {
            value: f,
            state: 'default',
            hasData: true
          };
        })
      };
    });

    // Set up the validParentsByChild object, which lists the parent field
    // values that should be associated with each child field value.
    var parentFields = _.pluck(that.edgesData, 'From');
    var childFields = _.pluck(that.edgesData, 'To');
    that.validParentsByChild = {};
    _.each(childFields, function(childField, fieldIndex) {
      var fieldItemState = _.findWhere(that.fieldItemStates, {field: childField});
      var childValues = _.pluck(fieldItemState.values, 'value');
      var parentField = parentFields[fieldIndex];
      that.validParentsByChild[childField] = {};
      _.each(childValues, function(childValue) {
        var rowsWithParentValues = _.filter(that.data, function(row) {
          var childMatch = row[childField] == childValue;
          var parentNotEmpty = row[parentField];
          return childMatch && parentNotEmpty;
        });
        var parentValues = _.pluck(rowsWithParentValues, parentField);
        parentValues = _.uniq(parentValues);
        that.validParentsByChild[childField][childValue] = parentValues;
      });
    });

    that.selectableFields = _.pluck(that.fieldItemStates, 'field');

    // determine if there are any 'child' fields: those that can
    // only be selected if their parent has one or more selections:
    that.allowedFields = _.difference(that.selectableFields, _.pluck(that.edgesData, 'To'));

    // prepare the data according to the rounding function:
    that.data = _.map(that.data, function(item) {

      // only apply a rounding function for non-zero values:
      if(item.Value != 0) {
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
    });

    that.datasetObject = {
      fill: false,
      pointHoverRadius: 5,
      pointBackgroundColor: '#ffffff',
      pointHoverBorderWidth: 1,
      tension: 0,
      spanGaps: false
    };

    that.footerFields = {};
    that.footerFields[translations.indicator.source] = that.dataSource;
    that.footerFields[translations.indicator.geographical_area] = that.geographicalArea;
    that.footerFields[translations.indicator.unit_of_measurement] = that.measurementUnit;
    that.footerFields[translations.indicator.copyright] = that.copyright;
    that.footerFields[translations.indicator.footnote] = that.footnote;
    // Filter out the empty values.
    that.footerFields = _.pick(that.footerFields, _.identity);
  }());

  var headlineColor = '777777';
  var colors = ['7e984f', '8d73ca', 'aaa533', 'c65b8a', '4aac8d', 'c95f44'];

  // allow headline + (2 x others)
  var maxDatasetCount = 2 * colors.length;

  this.getHeadline = function(fields) {
    var that = this, allUndefined = function (obj) {
      for (var loop = 0; loop < that.selectableFields.length; loop++) {
        if (obj[that.selectableFields[loop]])
          return false;
      }
      return true;
    };

    return _.chain(that.data)
      .filter(function (i) {
        return allUndefined(i);
      })
      .sortBy(function (i) {
        return that.selectedUnit ? i.Units : i.Year;
      })
      .map(function (d) {
        return _.pick(d, function(val) { return val !== null });
      })
      .value();
  };

  this.clearSelectedFields = function() {
    this.selectedFields = [];
    this.getData();
    this.onFieldsCleared.notify();
  };

  this.updateSelectedFields = function (fields) {
    this.selectedFields = fields;

    // update parent/child statuses:
    var selectedFields = _.pluck(this.selectedFields, 'field');
    _.each(this.edgesData, function(edge) {
      if(!_.contains(selectedFields, edge.From)) {
        // don't allow any child fields of this association:
        this.selectedFields = _.without(this.selectedFields, _.findWhere(this.selectedFields, {
          field: edge.From
        }));
      }
    });

    // reset the allowedFields:
    this.allowedFields = _.difference(this.selectableFields, _.pluck(this.edgesData, 'To'));

    // and reinstate based on selectedFields:
    var parentFields = _.pluck(this.edgesData, 'From');
    _.each(parentFields, function(parentField) {
      if(_.contains(selectedFields, parentField)) {
        // resinstate
        var childFields = _.chain(that.edgesData).where({ 'From' : parentField }).pluck('To').value();
        that.allowedFields = that.allowedFields.concat(childFields);
        // check each value in the child fields to see if it has data in common
        // with the selected parent value.
        var selectedParent = _.find(that.selectedFields, function(selectedField) {
          return selectedField.field == parentField;
        });
        _.each(that.fieldItemStates, function(fieldItem) {
          // We only care about child fields.
          if (_.contains(childFields, fieldItem.field)) {
            var fieldHasData = false;
            _.each(fieldItem.values, function(childValue) {
              var valueHasData = false;
              _.each(selectedParent.values, function(parentValue) {
                if (_.contains(that.validParentsByChild[fieldItem.field][childValue.value], parentValue)) {
                  valueHasData = true;
                  fieldHasData = true;
                }
              });
              childValue.hasData = valueHasData;
            });
            fieldItem.hasData = fieldHasData;
          }
        });
      }
    });

    // remove duplicates:
    that.allowedFields = _.uniq(that.allowedFields);

    this.getData();
    this.onSelectionUpdate.notify({
      selectedFields: fields,
      allowedFields: that.allowedFields
    });
  };

  this.updateSelectedUnit = function(selectedUnit) {
    this.selectedUnit = selectedUnit;

    // if fields are dependent on the unit, reset:
    this.getData({
      unitsChangeSeries: this.dataHasUnitSpecificFields
    });

    this.onUnitsSelectedChanged.notify(selectedUnit);
  };

  this.getCombinationData = function(obj) {
    var getCombinations = function(fields, arr, n) {
      var index = 0, ret = [];
      for(var i = 0; i < arr.length; i++) {
        var elem = (n == 1) ? arr[i] : arr.shift();
        var field = (n == 1) ? fields[i] : fields.shift();
        for(var j = 0; j < elem.length; j++) {
          if(n == 1) {
            ret.push({
              value: elem[j],
              field: field
            });
          } else {
            var childperm = getCombinations(fields.slice(), arr.slice(), n-1);
            for(var k = 0; k < childperm.length; k++) {
              ret.push([{
                value: elem[j],
                field: field
              }].concat(childperm[k]));
            }
          }
        }
      }
      return ret;
    };

    var	loop = 1,
        res = [],
        src = JSON.parse(JSON.stringify(obj));

    for(; loop <= src.length; loop++) {
      obj = JSON.parse(JSON.stringify(src));
      res = res.concat(getCombinations(_.pluck(obj, 'field'), _.pluck(obj, 'values'), loop));
    }

    return _.map(res, function(r) {
      if(!_.isArray(r)) {
        r = [r];
      }
      return _.object(
        _.pluck(r, 'field'),
        _.pluck(r, 'value')
      );
    });
  };

  this.getData = function(options) {
    // field: 'Grade'
    // values: ['A', 'B']
    var options = _.defaults(options || {}, {
        initial: false,
        unitsChangeSeries: false
      }),
      fields = this.selectedFields,
      selectedFieldTypes = _.pluck(fields, 'field'),
      datasets = [],
      that = this,
      seriesData = [],
      headlineTable = undefined,
      datasetIndex = 0,
      getCombinationDescription = function(combination) {
        return _.map(Object.keys(combination), function(key) {
          return translations.t(combination[key]);
          //return key + ' ' + combination[key];
        }).join(', ');
      },
      getColor = function(datasetIndex) {

        // offset if there is no headline data:
        if(!that.hasHeadline) {
          datasetIndex += 1;
        }

        if(datasetIndex === 0) {
          return headlineColor;
        } else {
          if(datasetIndex > colors.length) {
            return colors[datasetIndex - 1 - colors.length];
          } else {
            return colors[datasetIndex - 1];
          }
        }

        return datasetIndex === 0 ? headlineColor : colors[datasetIndex];
      },
      getBorderDash = function(datasetIndex) {

        // offset if there is no headline data:
        if(!this.hasHeadline) {
          datasetIndex += 1;
        }

        // 0 -
        // the first dataset is the headline:
        return datasetIndex > colors.length ? [5, 5] : undefined;
      },
      convertToDataset = function (data, combinationDescription /*field, fieldValue*/) {
        // var fieldIndex = field ? _.findIndex(that.selectedFields, function (f) {
        //     return f === field;
        //   }) : undefined,
        var fieldIndex,
          ds = _.extend({
            label: combinationDescription ? combinationDescription : that.country,
            borderColor: '#' + getColor(datasetIndex),
            backgroundColor: '#' + getColor(datasetIndex),
            pointBorderColor: '#' + getColor(datasetIndex),
            borderDash: getBorderDash(datasetIndex),
            data: _.map(that.years, function (year) {
              var found = _.findWhere(data, {
                Year: year
              });
              return found ? found.Value : null;
            }),
            borderWidth: combinationDescription ? 2 : 4
          }, that.datasetObject);
        datasetIndex++;
        return ds;
      };

    if (fields && !_.isArray(fields)) {
      fields = [].concat(fields);
    }

    var isSingleValueSelected = function() { return that.selectedFields.length === 1 && that.selectedFields[0].values.length === 1; },
        matchedData = that.data;

    // filter the data:
    //if(!isSingleValueSelected()) {
    if(that.selectedUnit) {
      matchedData = _.where(matchedData, { Units: that.selectedUnit});
    }

    matchedData = _.filter(matchedData, function(rowItem) {
      var matched = false;
      for(var fieldLoop = 0; fieldLoop < that.selectedFields.length; fieldLoop++) {
        if(that.selectedFields[fieldLoop].values.containsValue(rowItem[that.selectedFields[fieldLoop].field])) {
          matched = true;
          break;
        }
      }
      return matched;
    });

    var fieldSelectionInfo = [];

    this.onFieldsStatusUpdated.notify({
      data: this.fieldItemStates,
      selectionStates: fieldSelectionInfo
    });

    // get the headline data:
    var headline = this.getHeadline();

    // Catch the case where this is the initial display, there is a default
    // selected unit (the first one), there is a headline, and this headline
    // uses another unit.
    if (options.initial && headline.length && this.selectedUnit && this.selectedUnit != headline[0]['Units']) {
      // In this scenario we need to correct the selected unit here.
      this.selectedUnit = headline[0]['Units'];
    }

    // all units for headline data:
    if(headline.length) {
      headlineTable = {
        title: 'Headline data',
        headings: that.selectedUnit ? ['Year', 'Units', 'Value'] : ['Year', 'Value'],
        data: _.map(headline, function (d) {
          return that.selectedUnit ? [d.Year, d.Units, d.Value] : [d.Year, d.Value];
        })
      };
    }

    // headline plot should use the specific unit, if any,
    // but there may not be any headline data at all, or for the
    // specific unit:
    if(that.selectedUnit) {
      headline = _.where(headline, { Units : that.selectedUnit });
    }

    // only add to the datasets if there is any headline data:
    if(headline.length) {
      datasets.push(convertToDataset(headline));
    } else {
      this.hasHeadline = false;
    }

    // extract the possible combinations for the selected field values
    var combinations = this.getCombinationData(this.selectedFields);

    var filteredDatasets = [];
    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    _.each(combinations, function(combination) {
      var filtered = _.filter(matchedData, function(dataItem) {
        var matched = true;
        for (var loop = 0; loop < that.selectableFields.length; loop++) {
          if (dataItem[that.selectableFields[loop]] !== combination[that.selectableFields[loop]])
            matched = false;
        }
        return matched;
      });

      if(filtered.length) {
        // but some combinations may not have any data:
        filteredDatasets.push({
          data: filtered,
          combinationDescription: getCombinationDescription(combination)
        });
      }
    });

    var datasetCountExceedsMax = false;
    // restrict count if it exceeds the limit:
    if(filteredDatasets.length > maxDatasetCount) {
      datasetCountExceedsMax = true;
    }

    _.chain(filteredDatasets)
      .sortBy(function(ds) { return ds.combinationDescription; })
      .each(function(ds) { datasets.push(convertToDataset(ds.data, ds.combinationDescription)); });

    // convert datasets to tables:
    var selectionsTable = {
      data: []
    };
    selectionsTable.headings = ['Year'].concat(_.pluck(datasets, 'label'));
    _.each(this.years, function(year, yearIndex) {
      selectionsTable.data.push([year].concat(_.map(datasets, function(ds) {
        return ds.data[yearIndex]
      })));
    });

    this.onDataComplete.notify({
      datasetCountExceedsMax: datasetCountExceedsMax,
      datasets: datasetCountExceedsMax ? datasets.slice(0, maxDatasetCount) : datasets,
      labels: this.years,
      headlineTable: headlineTable,
      selectionsTable: selectionsTable,
      indicatorId: this.indicatorId,
      shortIndicatorId: this.shortIndicatorId,
      selectedUnit: this.selectedUnit,
      footerFields: this.footerFields
    });

    if(options.initial || options.unitsChangeSeries) {

      if(options.initial) {
        // order the fields based on the edge data, if any:
        if(this.edgesData.length) {
          var orderedEdges = _.chain(this.edgesData)
            .groupBy('From')
            .map(function(value, key) { return [key].concat(_.pluck(value, 'To')); })
            .flatten()
            .value();

          var customOrder = orderedEdges.concat(_.difference(_.pluck(this.fieldItemStates, 'field'), orderedEdges));

          // now order the fields:
          this.fieldItemStates = _.sortBy(this.fieldItemStates, function(item) {
            return customOrder.indexOf(item.field);
          });
        }

        this.onUnitsComplete.notify({
          units: this.units,
          selectedUnit: this.selectedUnit
        });
      }

      // update the series:
      this.onSeriesComplete.notify({
        series: that.dataHasUnitSpecificFields ? _.filter(that.fieldItemStates, function(fis) {
          return _.findWhere(that.fieldsByUnit, { unit : that.selectedUnit }).fields.indexOf(fis.field) != -1;
        }) : this.fieldItemStates,
        allowedFields: this.allowedFields,
        edges: this.edgesData,
        hasGeoData: this.hasGeoData,
        geoData: this.geoData,
        geoCodeRegEx: this.geoCodeRegEx,
        showMap: this.showMap
      });


    } else {
      this.onSeriesSelectedChanged.notify({
        series: this.selectedFields
      });
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    if((options.initial || options.unitsChangeSeries) && !this.hasHeadline) {
      // if there is no initial data, select some:

      var minimumFieldSelections = {},
          forceUnit = false;
      // First, do we have some already pre-configured from data_start_values?
      if (this.startValues) {
        // We need to confirm that these values are valid, and pair them up
        // with disaggregation categories. The value, at this point, is a string
        // which we assume to be pipe-delimited.
        var valuesToLookFor = this.startValues.split('|');
        // Match up each field value with a field.
        _.each(this.fieldItemStates, function(fieldItem) {
          _.each(fieldItem.values, function(fieldValue) {
            if (_.contains(valuesToLookFor, fieldValue.value)) {
              minimumFieldSelections[fieldItem.field] = fieldValue.value;
            }
          });
        });
      }
      if (_.size(minimumFieldSelections) == 0) {
        // If we did not have any pre-configured start values, we calculate them.
        // We have to decide what filters will be selected, and in some cases it
        // may need to be multiple filters. So we find the smallest row (meaning,
        // the row with the least number of disaggregations) and then sort it by
        // it's field values. This should have the affect of selecting the first
        // value in each drop-down, up until there are enough selected to display
        // data on the graph. First we get the number of fields:
        var fieldNames = _.pluck(this.fieldItemStates, 'field');
        // Manually add "Units" so that we can check for required units.
        fieldNames.push('Units');
        // We filter our full dataset to only those fields.
        var fieldData = _.map(this.data, function(item) { return _.pick(item, fieldNames); });
        // We then sort the data by each field. We go in reverse order so that the
        // first field will be highest "priority" in the sort.
        _.each(fieldNames.reverse(), function(fieldName) {
          fieldData = _.sortBy(fieldData, fieldName);
        });
        // But actually we want the top-priority sort to be the "size" of the
        // rows. In other words we want the row with the fewest number of fields.
        fieldData = _.sortBy(fieldData, function(item) { return _.size(item); });
        minimumFieldSelections = fieldData[0];
        // If we ended up finding something with "Units", we need to remove it
        // before continuing and then remember to force it later.
        if ('Units' in minimumFieldSelections) {
          forceUnit = minimumFieldSelections['Units'];
          delete minimumFieldSelections['Units'];
        }
      }

      // Ensure that we only force a unit on the initial load.
      if (!options.initial) {
        forceUnit = false;
      }

      // Now that we are all sorted, we notify the view that there is no headline,
      // and pass along the first row as the minimum field selections.
      this.onNoHeadlineData.notify({
        minimumFieldSelections: minimumFieldSelections,
        forceUnit: forceUnit
      });
    }
  };
};

indicatorModel.prototype = {
  initialise: function () {
    this.getData({
      initial: true
    });
  },
  getData: function () {
    this.getData();
  }
};
