/*
 * Leaflet disaggregation select.
 *
 * This is a Leaflet control designed to select the disaggregations available
 * in the GeoJSON.
 *
 * @TODO: This needs a "clear" button and some accessible labels.
 */
(function () {
  "use strict";

  if (typeof L === 'undefined') {
    return;
  }

  L.Control.DisaggregationSelect = L.Control.extend({

    options: {
      position: 'topleft'
    },

    initialize: function(plugin) {
      this.plugin = plugin;
    },

    onAdd: function() {
      // Use the first feature - assumes they are all the same.
      var div = L.DomUtil.create('div', 'disaggregation-select-container'),
          select = L.DomUtil.create('select', 'disaggregation-select', div),
          feature = this.plugin.getVisibleLayers().toGeoJSON().features[0],
          disaggregations = feature.properties.disaggregations,
          options = disaggregations.map(function(disaggregation) {
            return Object.values(disaggregation).join(' - ');
          });

      select.innerHTML = options.map(function(option) {
        var label = (option === '') ? translations.indicator.sub_categories : option;
        return '<option>' + label  + '</option>';
      });
      var that = this;
      L.DomEvent.on(select, 'change', function(event) {
        that.plugin.currentDisaggregation = this.selectedIndex;
        that.plugin.updateColors();
        that.plugin.selectionLegend.update();
      });

      return div;
    }

  });

  // Factory function for this class.
  L.Control.disaggregationSelect = function(plugin) {
    return new L.Control.DisaggregationSelect(plugin);
  };
}());

