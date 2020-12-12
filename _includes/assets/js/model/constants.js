/**
 * Constants to be used in indicatorModel.js and helper functions.
 */
var UNIT_COLUMN = '{{ site.column_names.units | default: "Units" }}';
var SERIES_COLUMN = '{{ site.column_names.series | default: "Series" }}';
var GEOCODE_COLUMN = 'GeoCode';
var YEAR_COLUMN = '{{ site.column_names.year | default: "Year" }}';
var VALUE_COLUMN = '{{ site.column_names.value | default: "Value" }}';
var HEADLINE_COLOR = '#777777';
var SERIES_TOGGLE = {{ site.series_toggle | default: false }};
