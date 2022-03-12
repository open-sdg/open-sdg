var indicatorModel = function (options) {

  var helpers = {% include assets/js/model/helpers.js %}

  // events:
  this.onDataComplete = new event(this);
  this.onFieldsComplete = new event(this);
  this.onUnitsComplete = new event(this);
  this.onUnitsSelectedChanged = new event(this);
  this.onSeriesesComplete = new event(this);
  this.onSeriesesSelectedChanged = new event(this);
  this.onFieldsStatusUpdated = new event(this);
  this.onFieldsCleared = new event(this);
  this.onSelectionUpdate = new event(this);

  // general members:
  var that = this;
  this.data = helpers.inputData(options.data);
  this.edgesData = helpers.inputEdges(options.edgesData);
  this.hasHeadline = true;
  this.country = options.country;
  this.indicatorId = options.indicatorId;
  this.shortIndicatorId = options.shortIndicatorId;
  this.chartTitle = options.chartTitle,
  this.chartTitles = options.chartTitles;
  this.graphType = options.graphType;
  this.graphTypes = options.graphTypes;
  this.measurementUnit = options.measurementUnit;
  this.xAxisLabel = options.xAxisLabel;
  this.startValues = options.startValues;
  this.showData = options.showData;
  this.selectedFields = [];
  this.allowedFields = [];
  this.selectedUnit = undefined;
  this.fieldsByUnit = undefined;
  this.dataHasUnitSpecificFields = false;
  this.selectedSeries = undefined;
  this.fieldsBySeries = undefined;
  this.dataHasSeriesSpecificFields = false;
  this.fieldValueStatuses = [];
  this.validParentsByChild = {};
  this.hasGeoData = false;
  this.showMap = options.showMap;
  this.graphLimits = options.graphLimits;
  this.stackedDisaggregation = options.stackedDisaggregation;
  this.graphAnnotations = options.graphAnnotations;
  this.graphTargetLines = options.graphTargetLines;
  this.graphSeriesBreaks = options.graphSeriesBreaks;
  this.indicatorDownloads = options.indicatorDownloads;
  this.compositeBreakdownLabel = options.compositeBreakdownLabel;
  this.precision = options.precision;
  this.dataSchema = options.dataSchema;

  this.initialiseUnits = function() {
    if (this.hasUnits) {
      this.units = helpers.getUniqueValuesByProperty(helpers.UNIT_COLUMN, this.data);
      helpers.sortFieldValueNames(helpers.UNIT_COLUMN, this.units, this.dataSchema);
      this.selectedUnit = this.units[0];
      this.fieldsByUnit = helpers.fieldsUsedByUnit(this.units, this.data, this.allColumns);
      this.dataHasUnitSpecificFields = helpers.dataHasUnitSpecificFields(this.fieldsByUnit);
    }
  }

  this.refreshSeries = function() {
    if (this.hasSerieses) {
      if (helpers.GRAPH_TITLE_FROM_SERIES) {
        this.chartTitle = this.selectedSeries;
      }
      this.data = helpers.getDataBySeries(this.allData, this.selectedSeries);
      this.years = helpers.getUniqueValuesByProperty(helpers.YEAR_COLUMN, this.data).sort();
      this.fieldsBySeries = helpers.fieldsUsedBySeries(this.serieses, this.data, this.allColumns);
      this.dataHasSeriesSpecificFields = helpers.dataHasSeriesSpecificFields(this.fieldsBySeries);
    }
  }

  this.initialiseFields = function() {
    this.fieldItemStates = helpers.getInitialFieldItemStates(this.data, this.edgesData, this.allColumns, this.dataSchema);
    this.validParentsByChild = helpers.validParentsByChild(this.edgesData, this.fieldItemStates, this.data);
    this.selectableFields = helpers.getFieldNames(this.fieldItemStates);
    this.allowedFields = helpers.getInitialAllowedFields(this.selectableFields, this.edgesData);
  }

  // Before continuing, we may need to filter by Series, so set up all the Series stuff.
  this.allData = helpers.prepareData(this.data);
  this.allColumns = helpers.getColumnsFromData(this.allData);
  this.hasSerieses = helpers.SERIES_TOGGLE && helpers.dataHasSerieses(this.allColumns);
  this.serieses = this.hasSerieses ? helpers.getUniqueValuesByProperty(helpers.SERIES_COLUMN, this.allData) : [];
  this.hasStartValues = Array.isArray(this.startValues) && this.startValues.length > 0;
  if (this.hasSerieses) {
    helpers.sortFieldValueNames(helpers.SERIES_COLUMN, this.serieses, this.dataSchema);
    this.selectedSeries = this.serieses[0];
    if (this.hasStartValues) {
      this.selectedSeries = helpers.getSeriesFromStartValues(this.startValues) || this.selectedSeries;
    }
    this.refreshSeries();
  }
  else {
    this.data = this.allData;
    this.years = helpers.getUniqueValuesByProperty(helpers.YEAR_COLUMN, this.data).sort();
  }

  // calculate some initial values:
  this.hasGeoData = helpers.dataHasGeoCodes(this.allColumns);
  this.hasUnits = helpers.dataHasUnits(this.allColumns);
  this.initialiseUnits();
  this.initialiseFields();
  this.colors = opensdg.chartColors(this.indicatorId);
  this.maxDatasetCount = 2 * this.colors.length;
  this.colorAssignments = [];

  this.clearSelectedFields = function() {
    this.selectedFields = [];
    this.getData();
    this.onFieldsCleared.notify();
  };

  this.updateFieldStates = function(selectedFields) {
    this.selectedFields = helpers.removeOrphanSelections(selectedFields, this.edgesData);
    this.allowedFields = helpers.getAllowedFieldsWithChildren(this.selectableFields, this.edgesData, selectedFields);
    this.fieldItemStates = helpers.getUpdatedFieldItemStates(this.fieldItemStates, this.edgesData, selectedFields, this.validParentsByChild);
    this.onSelectionUpdate.notify({
      selectedFields: this.selectedFields,
      allowedFields: this.allowedFields
    });
  }

  this.updateSelectedFields = function (selectedFields) {
    this.updateFieldStates(selectedFields);
    this.getData();
  };

  this.updateChartTitle = function() {
    this.chartTitle = helpers.getChartTitle(this.chartTitle, this.chartTitles, this.selectedUnit, this.selectedSeries);
  }

  this.updateChartType = function() {
    this.graphType = helpers.getChartType(this.graphType, this.graphTypes, this.selectedUnit, this.selectedSeries, helpers.CHARTJS_3);
  }

  this.updateSelectedUnit = function(selectedUnit) {
    this.selectedUnit = selectedUnit;
    this.getData({
      updateFields: this.dataHasUnitSpecificFields
    });
    this.onUnitsSelectedChanged.notify(selectedUnit);
  };

  this.updateSelectedSeries = function(selectedSeries) {
    // Updating the Series is akin to loading a whole new indicator, so
    // here we re-initialise most everything on the page.
    this.selectedSeries = selectedSeries;
    this.refreshSeries();
    this.clearSelectedFields();
    this.initialiseUnits();
    this.initialiseFields();
    this.getData({ updateFields: true, changingSeries: true });
    this.onSeriesesSelectedChanged.notify(selectedSeries);
  };

  this.getData = function(options) {
    options = Object.assign({
      initial: false,
      updateFields: false,
      changingSeries: false,
    }, options);

    var headlineUnfiltered = helpers.getHeadline(this.selectableFields, this.data);
    var headline;
    if (this.hasUnits && !this.hasSerieses) {
      headline = helpers.getDataByUnit(headlineUnfiltered, this.selectedUnit);
    }
    else if (this.hasSerieses && !this.hasUnits) {
      headline = helpers.getDataBySeries(headlineUnfiltered, this.selectedSeries);
    }
    else if (this.hasSerieses && this.hasUnits) {
      headline = helpers.getDataByUnit(headlineUnfiltered, this.selectedUnit);
      headline = helpers.getDataBySeries(headline, this.selectedSeries);
    }
    else {
      headline = headlineUnfiltered;
    }

    // If this is the initial load, check for special cases.
    var selectionUpdateNeeded = false;
    if (options.initial || options.changingSeries) {
      // Decide on a starting unit.
      if (this.hasUnits) {
        var startingUnit = this.selectedUnit;
        if (this.hasStartValues) {
          var unitInStartValues = helpers.getUnitFromStartValues(this.startValues);
          if (unitInStartValues && this.units.includes(unitInStartValues)) {
            startingUnit = unitInStartValues;
          }
        }
        else {
          // If our selected unit causes the headline to be empty, change it
          // to the first one available that would work.
          if (headlineUnfiltered.length > 0 && headline.length === 0) {
            startingUnit = helpers.getFirstUnitInData(headlineUnfiltered);
          }
        }
        // Re-query the headline if needed.
        if (this.selectedUnit !== startingUnit) {
          headline = helpers.getDataByUnit(headlineUnfiltered, startingUnit);
        }
        this.selectedUnit = startingUnit;
      }

      // Decide on a starting series.
      if (this.hasSerieses && !options.changingSeries) {
        var startingSeries = this.selectedSeries;
        if (this.hasStartValues) {
          var seriesInStartValues = helpers.getSeriesFromStartValues(this.startValues);
          if (seriesInStartValues) {
            startingSeries = seriesInStartValues;
          }
        }
        else {
          // If our selected series causes the headline to be empty, change it
          // to the first one available that would work.
          if (headlineUnfiltered.length > 0 && headline.length === 0) {
            startingSeries = helpers.getFirstSeriesInData(headlineUnfiltered);
          }
        }
        // Re-query the headline if needed.
        if (this.selectedSeries !== startingSeries) {
          headline = helpers.getDataBySeries(headlineUnfiltered, startingSeries);
        }
        this.selectedSeries = startingSeries;
      }

      // Decide on starting field values.
      var startingFields = this.selectedFields;
      if (this.hasStartValues) {
        startingFields = helpers.selectFieldsFromStartValues(this.startValues, this.selectableFields);
      }
      else {
        if (headline.length === 0) {
          startingFields = helpers.selectMinimumStartingFields(this.data, this.selectableFields, this.selectedUnit);
        }
      }
      if (startingFields.length > 0) {
        this.selectedFields = startingFields;
        selectionUpdateNeeded = true;
      }

      this.onUnitsComplete.notify({
        units: this.units,
        selectedUnit: this.selectedUnit
      });

      this.onSeriesesComplete.notify({
        serieses: this.serieses,
        selectedSeries: this.selectedSeries
      });
    }

    if (options.initial || options.updateFields) {
      this.onFieldsComplete.notify({
        fields: helpers.fieldItemStatesForView(
          this.fieldItemStates,
          this.fieldsByUnit,
          this.selectedUnit,
          this.dataHasUnitSpecificFields,
          this.fieldsBySeries,
          this.selectedSeries,
          this.dataHasSeriesSpecificFields,
          this.selectedFields,
          this.edgesData,
          this.compositeBreakdownLabel
        ),
        allowedFields: this.allowedFields,
        edges: this.edgesData,
        hasGeoData: this.hasGeoData,
        indicatorId: this.indicatorId,
        showMap: this.showMap,
        precision: helpers.getPrecision(this.precision, this.selectedUnit, this.selectedSeries),
      });
    }

    if (selectionUpdateNeeded || options.updateFields) {
      this.updateFieldStates(this.selectedFields);
    }

    var filteredData = helpers.getDataBySelectedFields(this.data, this.selectedFields);
    if (this.hasUnits) {
      filteredData = helpers.getDataByUnit(filteredData, this.selectedUnit);
    }

    var timeSeriesAttributes = [];
    if (filteredData.length > 0) {
      timeSeriesAttributes = helpers.getTimeSeriesAttributes(filteredData);
    }
    else if (headline.length > 0) {
      timeSeriesAttributes = helpers.getTimeSeriesAttributes(headline);
    }

    filteredData = helpers.sortData(filteredData, this.selectedUnit);
    if (headline.length > 0) {
      headline = helpers.sortData(headline, this.selectedUnit);
    }

    var combinations = helpers.getCombinationData(this.selectedFields);
    var datasets = helpers.getDatasets(headline, filteredData, combinations, this.years, this.country, this.colors, this.selectableFields, this.colorAssignments);
    var selectionsTable = helpers.tableDataFromDatasets(datasets, this.years);

    var datasetCountExceedsMax = false;
    // restrict count if it exceeds the limit:
    if(datasets.length > this.maxDatasetCount) {
      datasetCountExceedsMax = true;
    }

    this.updateChartTitle();
    this.updateChartType();

    this.onFieldsStatusUpdated.notify({
      data: this.fieldItemStates,
      // TODO: Why is selectionStates not used?
      selectionStates: []
    });

    this.onDataComplete.notify({
      datasetCountExceedsMax: datasetCountExceedsMax,
      datasets: datasets.filter(function(dataset) { return dataset.excess !== true }),
      labels: this.years,
      headlineTable: helpers.getHeadlineTable(headline, this.selectedUnit),
      selectionsTable: selectionsTable,
      indicatorId: this.indicatorId,
      shortIndicatorId: this.shortIndicatorId,
      selectedUnit: this.selectedUnit,
      selectedSeries: this.selectedSeries,
      graphLimits: helpers.getGraphLimits(this.graphLimits, this.selectedUnit, this.selectedSeries),
      stackedDisaggregation: this.stackedDisaggregation,
      graphAnnotations: helpers.getGraphAnnotations(this.graphAnnotations, this.selectedUnit, this.selectedSeries, this.graphTargetLines, this.graphSeriesBreaks),
      chartTitle: this.chartTitle,
      chartType: this.graphType,
      indicatorDownloads: this.indicatorDownloads,
      precision: helpers.getPrecision(this.precision, this.selectedUnit, this.selectedSeries),
      timeSeriesAttributes: timeSeriesAttributes,
    });
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
