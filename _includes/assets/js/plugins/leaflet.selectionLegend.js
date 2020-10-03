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
      var selectionStatus = L.DomUtil.get('selection-status');
      var parsedSelection = this.parseSelection(selection);
      selectionStatus.innerHTML = 'Selection added: ' + parsedSelection.name + ': ' + parsedSelection.value + '.';
      this.selections.push(selection);
      this.update();
      this.focusOnSelection(this.selections.length - 1);
    },

    removeSelection: function(selection) {
      var selectionStatus = L.DomUtil.get('selection-status');
      var parsedSelection = this.parseSelection(selection);
      selectionStatus.innerHTML = 'Selection removed: ' + parsedSelection.name + '.';
      var index = this.selections.indexOf(selection);
      this.selections.splice(index, 1);
      this.update();
      this.focusOnSelection(index);
    },

    focusOnSelection: function(index) {
      var selectionList = L.DomUtil.get('selection-list'),
          selectionItems = selectionList.getElementsByTagName('li');
      if (selectionItems[index]) {
        selectionItems[index].focus();
      }
      else if (selectionItems[0]) {
        selectionItems[0].focus();
      }
    },

    isSelected: function(selection) {
      return (this.selections.indexOf(selection) !== -1);
    },

    parseSelection: function(selection) {
      var plugin = this.plugin,
          valueRange = this.plugin.valueRange,
          value = plugin.getData(selection.feature.properties),
          percentage,
          valueStatus;
      if (value) {
        valueStatus = 'has-value';
        var fraction = (value - valueRange[0]) / (valueRange[1] - valueRange[0]);
        percentage = Math.round(fraction * 100);
      }
      else {
        value = '';
        valueStatus = 'no-value';
        percentage = 0;
      }
      return {
        name: selection.feature.properties.name,
        valueStatus: valueStatus,
        percentage: percentage,
        value: value,
      };
    },

    onAdd: function() {
      var controlTpl = '' +
        '<div id="selection-status" role="status" class="sr-only"></div>' +
        '<ul id="selection-list" aria-label="Selected regions: press items to remove them from the list."></ul>' +
        '<div class="legend-swatches">' +
          '{legendSwatches}'
        '</div>' +
        '<div class="legend-values" aria-label="Mapped values range from {lowValue} to {highValue}.">' +
          '<span class="legend-value left">{lowValue}</span>' +
          '<span class="arrow left"></span>' +
          '<span class="legend-value right">{highValue}</span>' +
          '<span class="arrow right"></span>' +
        '</div>';
      var swatchTpl = '<span class="legend-swatch" style="width:{width}%; background:{color};"></span>';
      var swatchWidth = 100 / this.plugin.options.colorRange.length;
      var swatches = this.plugin.options.colorRange.map(function(swatchColor) {
        return L.Util.template(swatchTpl, {
          width: swatchWidth,
          color: swatchColor,
        });
      }).join('');
      var div = L.DomUtil.create('div', 'selection-legend');
      div.innerHTML = L.Util.template(controlTpl, {
        lowValue: this.plugin.valueRange[0],
        highValue: this.plugin.valueRange[1],
        legendSwatches: swatches,
      });
      return div;
    },

    update: function() {
      var selectionList = L.DomUtil.get('selection-list');
      var selectionTpl = '' +
        '<li tabindex="0" role="button" aria-label="Press to remove {name} from the list." class="{valueStatus}">' +
          '<span class="selection-name">{name}</span>' +
          '<span class="selection-value" style="left: {percentage}%;">{value}</span>' +
          '<span class="selection-bar" style="width: {percentage}%;"></span>' +
          '<i class="selection-close fa fa-remove"></i>' +
        '</li>';
      var control = this;
      selectionList.innerHTML = this.selections.map(function(selection) {
        return L.Util.template(selectionTpl, control.parseSelection(selection));
      }).join('');

      // Assign click/enter behavior.
      $('#selection-list li').click(function(e) {
        var index = $(e.target).closest('li').index()
        var selection = control.selections[index];
        control.removeSelection(selection);
        control.plugin.unhighlightFeature(selection);
      }).keyup(function(e) {
        if (e.keyCode === 13) {
          e.preventDefault();
          $(this).click();
        }
      });

    }

  });

  // Factory function for this class.
  L.Control.selectionLegend = function(plugin) {
    return new L.Control.SelectionLegend(plugin);
  };
}());

