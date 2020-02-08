var mapView = function () {

  "use strict";

  this.initialise = function(indicatorId) {
    $('.map').show();
    $('#map').sdgMap({
      indicatorId: indicatorId,
      mapOptions: {{ site.map_options | jsonify }},
      mapLayers: {{ site.map_layers | jsonify }},
    });
  };
};
