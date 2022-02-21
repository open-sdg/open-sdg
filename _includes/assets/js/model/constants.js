/**
 * Constants to be used in indicatorModel.js and helper functions.
 */
var UNIT_COLUMN = '{{ site.data_fields.units | default: "Units" }}';
var SERIES_COLUMN = '{{ site.data_fields.series | default: "Series" }}';
var GEOCODE_COLUMN = 'GeoCode';
var YEAR_COLUMN = 'Year';
var VALUE_COLUMN = 'Value';
// Note this headline color is overridden in indicatorView.js.
var HEADLINE_COLOR = '#777777';
var SERIES_TOGGLE = {{ site.series_toggle | default: false }};
var GRAPH_TITLE_FROM_SERIES = {{ site.graph_title_from_series | default: false }};
var CHARTJS_3 = {{ site.chartjs_3 | default: false }};
