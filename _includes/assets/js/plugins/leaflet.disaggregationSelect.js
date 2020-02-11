/*
 * Leaflet disaggregation select.
 *
 * This is a Leaflet control designed to select the disaggregations available
 * in the GeoJSON.
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

    initialize: function(plugin, disaggregationOptions) {
      this.plugin = plugin;
      this.disaggregationOptions = disaggregationOptions;
    },

    onAdd: function() {
      // Use the first feature - assumes they are all the same.
      var div = L.DomUtil.create('div', 'disaggregation-select-container'),
          label = L.DomUtil.create('label', 'disaggregation-select-label', div),
          select = L.DomUtil.create('select', 'disaggregation-select', div);

      label.setAttribute('for', 'disaggregation-select-element');
      label.innerHTML = translations.indicator.sub_categories;
      select.setAttribute('id', 'disaggregation-select-element');
      select.innerHTML = this.disaggregationOptions.map(function(option) {
        return '<option>' + option  + '</option>';
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
  L.Control.disaggregationSelect = function(plugin, disaggregationOptions) {
    return new L.Control.DisaggregationSelect(plugin, disaggregationOptions);
  };
}());

