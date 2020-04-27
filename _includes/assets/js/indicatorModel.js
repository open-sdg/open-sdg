var indicatorModel = function (options) {

  var helpers = {% include assets/js/indicatorModelHelpers.js %}

  // events:
  this.onDataComplete = new event(this);
  this.onFieldsComplete = new event(this);
  this.onUnitsComplete = new event(this);
  this.onUnitsSelectedChanged = new event(this);
  this.onFieldsStatusUpdated = new event(this);
  this.onFieldsCleared = new event(this);
  this.onSelectionUpdate = new event(this);

  // general members:
  var that = this;
  this.data = helpers.convertJsonFormatToRows(options.data);
  this.edgesData = helpers.convertJsonFormatToRows(options.edgesData);
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
  this.years = helpers.getUniqueValuesByProperty(helpers.YEAR_COLUMN, this.data);
  this.hasGeoData = helpers.dataHasGeoCodes(this.data);
  if (helpers.dataHasUnits(this.data)) {
    this.hasUnits = true;
    this.units = helpers.getUniqueValuesByProperty(helpers.UNIT_COLUMN, this.data);
    this.selectedUnit = this.units[0];
    this.fieldsByUnit = helpers.fieldsUsedByUnit(this.units, this.data);
    this.dataHasUnitSpecificFields = helpers.dataHasUnitSpecificFields(this.fieldsByUnit);
  }
  else {
    this.hasUnits = false;
  }
  this.fieldItemStates = helpers.getInitialFieldItemStates(this.data, this.edgesData);
  this.validParentsByChild = helpers.validParentsByChild(this.edgesData, this.fieldItemStates, this.data);
  this.selectableFields = helpers.getFieldNames(this.fieldItemStates);
  this.allowedFields = helpers.getInitialAllowedFields(this.selectableFields, this.edgesData);
  this.data = helpers.prepareData(this.data);
  this.footerFields = helpers.footerFields(this);
  this.colors = opensdg.chartColors(this.indicatorId);
  this.maxDatasetCount = 2 * this.colors.length;

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
    this.chartTitle = helpers.getChartTitle(this.chartTitle, this.chartTitles);
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

  this.getData = function(options) {
    options = Object.assign({
      initial: false,
      unitsChangeSeries: false
    }, options);

    var headlineWithoutUnit = helpers.getHeadline(this.selectableFields, this.data);
    var headline = this.hasUnits ? helpers.getDataByUnit(headlineWithoutUnit, this.selectedUnit) : headlineWithoutUnit;

    // If this is the initial load, check for special cases.
    var selectionUpdateNeeded = false;
    if (options.initial) {
      // Decide on a starting unit.
      if (this.hasUnits) {
        var startingUnit = this.selectedUnit;
        if (this.startValues) {
          var unitInStartValues = helpers.getUnitFromStartValues(this.startValues);
          if (unitInStartValues) {
            startingUnit = unitInStartValues;
          }
        }
        else {
          // If our selected unit causes the headline to be empty, change it
          // to the first one available that would work.
          if (headlineWithoutUnit.length > 0 && headline.length === 0) {
            startingUnit = helpers.getFirstUnitInData(headlineWithoutUnit);
          }
        }
        // Re-query the headline if needed.
        if (this.selectedUnit !== startingUnit) {
          headline = helpers.getDataByUnit(headlineWithoutUnit, startingUnit);
        }
        this.selectedUnit = startingUnit;
      }

      // Decide on starting field values.
      var startingFields = this.selectedFields;
      if (this.startValues) {
        startingFields = helpers.selectFieldsFromStartValues(this.startValues, this.selectableFields);
      }
      else {
        if (headline.length === 0) {
          startingFields = helpers.selectMinimumStartingFields(this.data, this.selectableFields);
        }
      }
      if (startingFields.length > 0) {
        this.selectedFields = startingFields;
        this.allowedFields = helpers.getAllowedFieldsWithChildren(this.selectableFields, this.edgesData, this.selectedFields);
        selectionUpdateNeeded = true;
      }

      this.onUnitsComplete.notify({
        units: this.units,
        selectedUnit: this.selectedUnit
      });
    }

    if (options.initial || options.unitsChangeSeries) {
      this.onFieldsComplete.notify({
        fields: helpers.fieldItemStatesForView(
          this.fieldItemStates,
          this.fieldsByUnit,
          this.selectedUnit,
          this.dataHasUnitSpecificFields,
          this.selectedFields
        ),
        allowedFields: this.allowedFields,
        edges: this.edgesData,
        hasGeoData: this.hasGeoData,
        indicatorId: this.indicatorId,
        showMap: this.showMap,
      });
    }

    if (selectionUpdateNeeded) {
      this.onSelectionUpdate.notify({
        selectedFields: this.selectedFields,
        allowedFields: this.allowedFields
      });
    }

    var filteredData = helpers.getDataBySelectedFields(this.data, this.selectedFields);
    if (this.hasUnits) {
      filteredData = helpers.getDataByUnit(filteredData, this.selectedUnit);
    }

    filteredData = helpers.sortData(filteredData, this.selectedUnit);
    if (headline.length > 0) {
      headline = helpers.sortData(headline, this.selectedUnit);
    }

    var combinations = helpers.getCombinationData(this.selectedFields);
    var datasets = helpers.getDatasets(headline, filteredData, combinations, this.years, this.country, this.colors, this.selectableFields);
    var selectionsTable = helpers.tableDataFromDatasets(datasets, this.years);

    var datasetCountExceedsMax = false;
    // restrict count if it exceeds the limit:
    if(datasets.length > this.maxDatasetCount) {
      datasetCountExceedsMax = true;
    }

    this.updateChartTitle();

    this.onDataComplete.notify({
      datasetCountExceedsMax: datasetCountExceedsMax,
      datasets: datasetCountExceedsMax ? datasets.slice(0, this.maxDatasetCount) : datasets,
      labels: this.years,
      headlineTable: helpers.getHeadlineTable(headline, this.selectedUnit),
      selectionsTable: selectionsTable,
      indicatorId: this.indicatorId,
      shortIndicatorId: this.shortIndicatorId,
      selectedUnit: this.selectedUnit,
      footerFields: this.footerFields,
      graphLimits: this.graphLimits,
      stackedDisaggregation: this.stackedDisaggregation,
      chartTitle: this.chartTitle
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
