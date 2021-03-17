const cucumber = require('@cucumber/cucumber');
const mink = require('cucumber-mink');

const driver = new mink.Mink({
  baseUrl: 'http://127.0.0.1:4000',
  viewport: {
    width: 1366,
    height: 768,
  },
  selectors: {
    "the Table tab": "#tab-tableview",
    "the Chart tab": "#tab-chartview",
    "the Map tab": "#tab-mapview",
    "sortable table": "#tableview table",
    "visual chart": "#chartview canvas",
    "map": "#mapview #map.leaflet-container",
    "the Global metadata tab": "#tab-global",
    "the National metadata tab": "#tab-national",
    "the Sources metadata tab": "#tab-sources",
    "goal indicator": ".goal-indicator",
    "goal target": ".goal-target",
    "the high-contrast button": ".navbar .contrast-high a",
    "goal icon": ".goal-tiles a img",
    "high-contrast goal icon": ".goal-tiles a img[src*='high-contrast']",
    "the language toggle dropdown": ".navbar .dropdown-toggle",
    "the first language option": ".navbar .dropdown-menu li:first-child a",
    "the last language option": ".navbar .dropdown-menu li:last-child a",
    "goal status": ".goal .frame",
    "the second reporting status tab": ".nav-tabs.reporting-status-view li:last-child a",
    "the search box": "#indicator_search",
    "disaggregation filter": ".variable-selector",
    "the filter drop-down button": ".variable-selector .accessBtn",
    "the first filter option": ".variable-selector .variable-options label",
    "the last filter option": ".variable-selector .variable-options label:last-child",
    "selected unit of measurement": "#units input[checked='']",
    "the first unit of measurement": "#units label:nth-of-type(1) input",
    "the last unit of measurement": "#units label:last-child input",
    "the first series": "#serieses label:nth-of-type(1) input",
    "the second series": "#serieses label:nth-of-type(2) input",
    "the last series": "#serieses label:last-child input",
    "chart legend": "#legend li",
    "chart legend item": "#legend li",
    "data table": "#selectionsTable",
    "data table column": "#selectionsTable thead th",
    "the 'Select all' button": "button[data-type='select']",
    "the 'Clear all' button": "button[data-type='clear']",
    "the 'Clear selections' button": "button#clear",
    "success data notice": "div.alert.success",
    "disaggregation sidebar": "#indicator-sidebar:not(.indicator-sidebar-hidden)",
    "available indicator": '.metadata-available-indicator',
    "chart footer": "#selectionChartFooter",
    "chart footer item": "#selectionChartFooter dt",
    "table footer": "#selectionTableFooter",
    "table footer item": "#selectionTableFooter dt",
    "map footer": "#mapFooter",
    "map footer item": "#mapFooter dt",
    "table has no data": "#selectionsTable.table-has-no-data h3",
    "chart has no data": "#selectionsChart.chart-has-no-data canvas",
    "breadcrumbs": ".breadcrumb",
    "table value": "#tableview tbody .table-value",
  }
});

// Avoid timeout issues.
cucumber.setDefaultTimeout(60 * 1000);

driver.hook(cucumber);
