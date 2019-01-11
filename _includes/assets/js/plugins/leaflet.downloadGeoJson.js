/*
 * Leaflet download map.
 *
 * This is a Leaflet control for downloading the current GeoJSON layer.
 */
(function () {
  "use strict";

  L.Control.DownloadGeoJson = L.Control.extend({

    initialize: function(plugin) {
      this.plugin = plugin;
      this.setPosition('topleft');
    },

    onAdd: function() {
      var div = L.DomUtil.create('div', 'download-geojson leaflet-bar');
      div.innerHTML = '<a id="download-geojson-anchor-elem" style="display:none;"></a>';
      var trigger = L.DomUtil.create('a', 'download-geojson-button leaflet-bar-part', div);
      trigger.innerHTML = '<i aria-hidden title="Download" class="fa fa-download"></i>' +
        '<span class="visuallyhidden">Download</span>';
      var plugin = this.plugin;
      L.DomEvent.on(trigger, 'click', (function(e) {
        e.preventDefault();
        e.stopPropagation();
        plugin.getVisibleLayers().eachLayer(function(layer) {
          var dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(layer.geoJsonObject));
          var dlAnchorElem = document.getElementById('download-geojson-anchor-elem');
          dlAnchorElem.setAttribute('href', dataStr);
          dlAnchorElem.setAttribute('download', 'map.geo.json');
          dlAnchorElem.click();
        });
      }));

      return div;
    },

  });

  // Factory function for this class.
  L.Control.downloadGeoJson = function(plugin) {
    return new L.Control.DownloadGeoJson(plugin);
  };
}());

