var indicatorModel = function (options) {

  var helpers = {% include assets/js/indicatorModelHelpers.js %}

  // events:
  this.onDataComplete = new event(this);
  this.onSeriesComplete = new event(this);
  this.onSeriesSelectedChanged = new event(this);
  this.onUnitsComplete = new event(this);
  this.onUnitsSelectedChanged = new event(this);
  this.onFieldsStatusUpdated = new event(this);
  this.onFieldsCleared = new event(this);
  this.onSelectionUpdate = new event(this);
  this.onStartValuesNeeded = new event(this);

  // general members:
  var that = this;
  this.data = helpers.convertJsonFormat(options.data);
  this.edgesData = helpers.convertJsonFormat(options.edgesData);
  this.hasHeadline = true;
  this.country = options.country;
  this.indicatorId = options.indicatorId;
  this.shortIndicatorId = options.shortIndicatorId;
  this.chartTitle = options.chartTitle,
  this.chartTitles = options.chartTitles;
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
  this.showMap = options.showMap;
  this.graphLimits = options.graphLimits;
  this.stackedDisaggregation = options.stackedDisaggregation;

  // calculate some initial values:
  this.years = helpers.extractUnique(helpers.YEAR_COLUMN, this.data);
  this.hasGeoData = helpers.dataHasGeoCodes(this.data);
  if (helpers.dataHasUnits(this.data)) {
    this.units = helpers.extractUnique(helpers.UNIT_COLUMN, this.data);
    this.selectedUnit = this.units[0];
    this.fieldsByUnit = helpers.fieldsUsedByUnit(this.units, this.data);
    this.dataHasUnitSpecificFields = helpers.dataHasUnitSpecificFields(this.fieldsByUnit);
  }
  this.fieldItemStates = helpers.getInitialFieldItemStates(this.data);
  this.validParentsByChild = helpers.validParentsByChild(this.edgesData, this.fieldItemStates, this.data);
  this.selectableFields = helpers.getFieldNames(this.fieldItemStates);
  this.allowedFields = helpers.getInitialAllowedFields(this.selectableFields, this.edgesData);
  this.data = helpers.prepareData(this.data);
  this.footerFields = helpers.footerFields(this);
  this.datasetObject = helpers.chartBaseDataset();

  var headlineColor = '777777';

  // use custom colors
  var colors = opensdg.chartColors(this.indicatorId);

  // allow headline + (2 x others)
  var maxDatasetCount = 2 * colors.length;

  this.clearSelectedFields = function() {
    this.selectedFields = [];
    this.getData();
    this.onFieldsCleared.notify();
  };

  this.updateSelectedFields = function (selectedFields) {
    this.selectedFields = helpers.removeOrphanSelections(selectedFields, this.edgesData);
    this.allowedFields = helpers.getAllowedFieldsWithChildren(this.selectableFields, this.edgesData, selectedFields);
    this.fieldItemStates = helpers.getUpdatedFieldItemStates(this.fieldItemStates, this.edgesData, selectedFields, this.validParentsByChild);
    this.getData();
    this.onSelectionUpdate.notify({
      selectedFields: this.selectedFields,
      allowedFields: this.allowedFields
    });
  };

  this.updateChartTitle = function() {
    // We only need to change anything if this indicator has multiple titles.
    if (that.chartTitles && that.chartTitles.length > 0) {
      var chartTitle = _.findWhere(that.chartTitles, { unit: that.selectedUnit });
      that.chartTitle = (chartTitle) ? chartTitle.title : that.chartTitles[0].title;
    }
  }

  this.updateSelectedUnit = function(selectedUnit) {
    this.selectedUnit = selectedUnit;
    this.updateChartTitle();

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
      datasets = [],
      that = this,
      headlineTable = undefined,
      datasetIndex = 0,
      getCombinationDescription = function(combination) {
        return _.map(Object.keys(combination), function(key) {
          return translations.t(combination[key]);
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
      },
      getBackground = function(datasetIndex) {

        var color = getBackgroundColor(datasetIndex);

        // offset if there is no headline data:
        if(!this.hasHeadline) {
          datasetIndex += 1;
        }

        if (datasetIndex > colors.length) {
          color = getBackgroundPattern(color);
        }

        return color;
      },
      getBackgroundColor = function(datasetIndex) {
        return '#' + getColor(datasetIndex);
      },
      getBackgroundPattern = function(color) {
        if (window.pattern && typeof window.pattern.draw === 'function') {
          return window.pattern.draw('diagonal', color);
        }
        return color;
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
      convertToDataset = function (data, combinationDescription, combination) {
        var ds = _.extend({
            label: combinationDescription ? combinationDescription : that.country,
            disaggregation: combination,
            borderColor: '#' + getColor(datasetIndex),
            backgroundColor: getBackground(datasetIndex),
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

    var matchedData = that.data;

    // filter the data:
    if(that.selectedUnit) {
      matchedData = _.where(matchedData, { Units: that.selectedUnit});
    }

    matchedData = _.filter(matchedData, function(rowItem) {
      var matched = false;
      for(var fieldLoop = 0; fieldLoop < that.selectedFields.length; fieldLoop++) {
        if(that.selectedFields[fieldLoop].values.includes(rowItem[that.selectedFields[fieldLoop].field])) {
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
    var headline = helpers.getHeadline(this.selectableFields, this.selectedUnit, this.data);

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
          combinationDescription: getCombinationDescription(combination),
          combination: combination,
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
      .each(function(ds) { datasets.push(convertToDataset(ds.data, ds.combinationDescription, ds.combination)); });

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

    this.updateChartTitle();

    this.onDataComplete.notify({
      datasetCountExceedsMax: datasetCountExceedsMax,
      datasets: datasetCountExceedsMax ? datasets.slice(0, maxDatasetCount) : datasets,
      labels: this.years,
      headlineTable: headlineTable,
      selectionsTable: selectionsTable,
      indicatorId: this.indicatorId,
      shortIndicatorId: this.shortIndicatorId,
      selectedUnit: this.selectedUnit,
      footerFields: this.footerFields,
      graphLimits: this.graphLimits,
      stackedDisaggregation: this.stackedDisaggregation,
      chartTitle: this.chartTitle
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
        indicatorId: this.indicatorId,
        showMap: this.showMap
      });


    } else {
      this.onSeriesSelectedChanged.notify({
        series: this.selectedFields
      });
    }

    if ((options.initial || options.unitsChangeSeries) && (this.startValues || !this.hasHeadline)) {

      var startingFieldSelections = this.startValues,
          forceUnit = false;

      if (!startingFieldSelections) {
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
        // Convert to an array of objects with 'field' and 'value' keys.
        startingFieldSelections = _.map(_.keys(fieldData[0]), function(key) {
          return {
            field: key,
            value: fieldData[0][key]
          };
        });
      }

      var startingUnit = _.findWhere(startingFieldSelections, { field: 'Units' });
      if (startingUnit) {
        // If one of the starting field selections is a Unit, remember for later
        // and remove it from the list.
        forceUnit = startingUnit.value;
        startingFieldSelections = _.filter(startingFieldSelections, function(item) {
          return item.field !== 'Units';
        });
      }

      // Ensure that we only force a unit on the initial load.
      if (!options.initial) {
        forceUnit = false;
      }

      // Now that we are all sorted, we notify the view that there needs to be
      // starting values, and pass along the info.
      this.onStartValuesNeeded.notify({
        startingFieldSelections: startingFieldSelections,
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
