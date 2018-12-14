var mapView = function () {

  "use strict";

  this.initialise = function(geoData, geoCodeRegEx) {
    $('.map').show();
    $('#map').sdgMap({
      geoData: geoData,
      geoCodeRegEx: geoCodeRegEx,
      geoLayers: [
        {
          min_zoom: 0,
          max_zoom: 6,
          serviceUrl: '[replaceme]',
          nameProperty: '[replaceme]',
          idProperty: '[replaceme]',
        },
        {
          min_zoom: 7,
          max_zoom: 20,
          serviceUrl: '[replaceme]',
          nameProperty: '[replaceme]',
          idProperty: '[replaceme]',
        },
      ],
      tileOptions: {
        accessToken: '[replaceme]',
        attribution: '[replaceme]',
      },
      minZoom: 6,
    });
  };
};
