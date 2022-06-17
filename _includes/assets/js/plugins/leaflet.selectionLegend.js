/*
 * Leaflet selection legend.
 *
 * This is a Leaflet control designed to keep track of selected layers on a map
 * and visualize the selections as stacked bar graphs.
 */
(function () {
  "use strict";

  if (typeof L === 'undefined') {
    return;
  }

  L.Control.SelectionLegend = L.Control.extend({

    initialize: function(plugin) {
      this.selections = [];
      this.plugin = plugin;
    },

    addSelection: function(selection) {
      this.selections.push(selection);
      this.update();
    },

    removeSelection: function(selection) {
      var index = this.selections.indexOf(selection);
      this.selections.splice(index, 1);
      this.update();
    },

    isSelected: function(selection) {
      return (this.selections.indexOf(selection) !== -1);
    },

    onAdd: function() {
      var div = L.DomUtil.create('div', 'selection-legend');
      this.legendDiv = div;
      this.resetSwatches();
      return div;
    },

    renderSwatches: function() {
      var controlTpl = '' +
        '<dl id="selection-list"></dl>' +
        '<div class="legend-footer">' +
          '<div class="legend-swatches">' +
            '{legendSwatches}' +
          '</div>' +
          '<div class="legend-values">' +
            '<span class="legend-value left">{lowValue}</span>' +
            '<span class="arrow left"></span>' +
            '<span class="legend-value right">{highValue}</span>' +
            '<span class="arrow right"></span>' +
          '</div>' +
        '</div>';
      var swatchTpl = '<span class="legend-swatch" style="width:{width}%; background:{color};"></span>';
      var swatchWidth = 100 / this.plugin.options.colorRange.length;
      var swatches = this.plugin.options.colorRange.map(function(swatchColor) {
        return L.Util.template(swatchTpl, {
          width: swatchWidth,
          color: swatchColor,
        });
      }).join('');
      return L.Util.template(controlTpl, {
        lowValue: this.plugin.alterData(opensdg.dataRounding(this.plugin.valueRanges[this.plugin.currentDisaggregation][0])),
        highValue: this.plugin.alterData(opensdg.dataRounding(this.plugin.valueRanges[this.plugin.currentDisaggregation][1])),
        legendSwatches: swatches,
      });
    },

    resetSwatches: function() {
      this.legendDiv.innerHTML = this.renderSwatches();
    },

    update: function() {
      var selectionList = L.DomUtil.get('selection-list');
      var selectionTplHighValue = '' +
        '<dt class="selection-name"><span class="selection-name-background">{name}</span></dt>' +
        '<dd class="selection-value-item {valueStatus}">' +
          '<span class="selection-bar" style="background-color: {color}; width: {percentage}%;">' +
            '<span class="selection-value selection-value-high">' +
              '<span class="selection-value-high-background">{value}</span>' +
            '</span>' +
          '</span>' +
          '<i class="selection-close fa fa-remove"></i>' +
        '</dd>';
      var selectionTplLowValue = '' +
      '<dt class="selection-name"><span class="selection-name-background">{name}</span></dt>' +
      '<dd class="selection-value-item {valueStatus}">' +
        '<span class="selection-bar" style="background-color: {color}; width: {percentage}%;"></span>' +
        '<span class="selection-value selection-value-low" style="left: {percentage}%;">' +
          '<span class="selection-value-low-background">{value}</span>' +
        '</span>' +
        '<i class="selection-close fa fa-remove"></i>' +
      '</dd>';
      var plugin = this.plugin;
      var valueRange = this.plugin.valueRanges[this.plugin.currentDisaggregation];
      selectionList.innerHTML = this.selections.map(function(selection) {
        var value = plugin.getData(selection.feature.properties);
        var color = '#FFFFFF';
        var percentage, valueStatus;
        var templateToUse = selectionTplHighValue;
        if (value) {
          color = plugin.colorScale(value).hex();
          valueStatus = 'has-value';
          var fraction = (value - valueRange[0]) / (valueRange[1] - valueRange[0]);
          percentage = Math.round(fraction * 100);
          if (percentage <= 50) {
            templateToUse = selectionTplLowValue;
          }
        }
        else {
          value = '';
          valueStatus = 'no-value';
          percentage = 0;
        }
        return L.Util.template(templateToUse, {
          name: selection.feature.properties.name,
          valueStatus: valueStatus,
          percentage: percentage,
          value: plugin.alterData(opensdg.dataRounding(value)),
          color: color,
        });
      }).join('');

      // Assign click behavior.
      var control = this,
          clickSelector = '#selection-list dd';
      $(clickSelector).click(function(e) {
        var index = $(clickSelector).index(this),
            selection = control.selections[index];
        control.removeSelection(selection);
        control.plugin.unhighlightFeature(selection);
      });
    }

  });

  // Factory function for this class.
  L.Control.selectionLegend = function(plugin) {
    return new L.Control.SelectionLegend(plugin);
  };
}());

