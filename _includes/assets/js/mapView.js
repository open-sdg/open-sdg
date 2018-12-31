var mapView = function () {

  "use strict";

  this.initialise = function(geoData, geoCodeRegEx) {
    $('.map').show();
    $('#map').sdgMap({
      geoData: geoData,
      geoCodeRegEx: geoCodeRegEx,
      mapOptions: {{ site.map_options | jsonify }},
      mapLayers: {{ site.map_layers | jsonify }},
    });
  };
};
