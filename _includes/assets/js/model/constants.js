/**
 * Constants to be used in indicatorModel.js and helper functions.
 */
var UNIT_COLUMN = '{{ site.data_fields.units | default: "Units" }}';
var SERIES_COLUMN = '{{ site.data_fields.series | default: "Series" }}';
var GEOCODE_COLUMN = 'GeoCode';
var YEAR_COLUMN = 'Year';
var VALUE_COLUMN = 'Value';
var HEADLINE_COLOR = '#777777';
var SERIES_TOGGLE = {{ site.series_toggle | default: false }};
