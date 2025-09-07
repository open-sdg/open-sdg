/**
 * Constants to be used in indicatorModel.js and helper functions.
 */
var UNIT_COLUMN = '{{ site.data_fields.units | default: "Units" }}';
var SERIES_COLUMN = '{{ site.data_fields.series | default: "Series" }}';
var REPORTINGTYPE_COLUMN = '{{ site.data_fields.reportingtype | default: "Reporting type" }}';
var GEOCODE_COLUMN = 'GeoCode';
var YEAR_COLUMN = 'Year';
var VALUE_COLUMN = 'Value';
var REPORTINGTYPE_NATIONAL = '{{ site.data_fields.reportingtype_national | default: "National" }}';
var REPORTINGTYPE_GLOBAL = '{{ site.data_fields.reportingtype_global | default: "Global" }}';
// Note this headline color is overridden in indicatorView.js.
var HEADLINE_COLOR = '#777777';
var GRAPH_TITLE_FROM_SERIES = {{ site.graph_title_from_series | default: false }};
