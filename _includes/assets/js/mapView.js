var mapView = function () {

  "use strict";

  this.initialise = function(geoData, geoCodeRegEx, indicatorId) {
    $('.map').show();
    $('#map').sdgMap({
      geoData: geoData,
      geoCodeRegEx: geoCodeRegEx,
      indicatorId: indicatorId,
      mapOptions: {{ site.map_options | jsonify }},
      mapLayers: {{ site.map_layers | jsonify }},
    });
  };
};
