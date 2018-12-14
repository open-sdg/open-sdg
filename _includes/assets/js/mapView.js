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
          serviceUrl: 'https://opendata.arcgis.com/datasets/4fcca2a47fed4bfaa1793015a18537ac_4.geojson',
          nameProperty: 'rgn17nm',
          idProperty: 'rgn17cd',
        },
        {
          min_zoom: 7,
          max_zoom: 20,
          serviceUrl: 'https://geoportal1-ons.opendata.arcgis.com/datasets/686603e943f948acaa13fb5d2b0f1275_4.geojson',
          nameProperty: 'lad16nm',
          idProperty: 'lad16cd',
        },
      ],
      tileOptions: {
        accessToken: 'pk.eyJ1IjoiYnJvY2tmYW5uaW5nMSIsImEiOiJjaXplbmgzczgyMmRtMnZxbzlmbGJmdW9pIn0.LU-BYMX69uu3eGgk0Imibg',
        attribution: '<a href="https://www.mapbox.com">Mapbox</a> | <a href="http://geoportal.statistics.gov.uk/">ONS</a>',
      },
      minZoom: 6,
    });
  };
};
