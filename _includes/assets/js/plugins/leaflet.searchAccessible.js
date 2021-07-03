/*
 * Leaflet search.
 *
 * This is customized version of L.Control.Search.
 * See here: https://github.com/stefanocudini/leaflet-search
 */
(function () {
  "use strict";

  if (typeof L === 'undefined') {
    return;
  }

  L.Control.SearchAccessible = L.Control.Search.extend({
    onAdd: function(map) {
      var container = L.Control.Search.prototype.onAdd.call(this, map);

      this._input.setAttribute('aria-label', this._input.placeholder);
      this._tooltip.setAttribute('aria-label', this._input.placeholder);

      this._button.setAttribute('role', 'button');
      this._accessibleCollapse();
      this._button.innerHTML = '<i class="fa fa-search" aria-hidden="true"></i>';

      this._cancel.setAttribute('role', 'button');
      this._cancel.setAttribute('aria-label', this._cancel.title);
      this._cancel.innerHTML = '<i class="fa fa-close" aria-hidden="true"></i>';

      // Prevent the delayed collapse when tabbing out of the input box.
      L.DomEvent.on(this._cancel, 'focus', this.collapseDelayedStop, this);

      return container;
    },
    _createInput: function (text, className) {
      var input = L.Control.Search.prototype._createInput.call(this, text, className);
      input.setAttribute('aria-autocomplete', 'list');
      input.setAttribute('aria-controls', 'map-search-listbox');
      var combobox = L.DomUtil.create('div', '', this._container);
      combobox.setAttribute('role', 'combobox');
      combobox.setAttribute('aria-expanded', 'false');
      combobox.setAttribute('aria-owns', 'map-search-listbox');
      combobox.setAttribute('aria-haspopup', 'listbox');
      combobox.id = 'map-search-combobox';
      combobox.append(input);
      this._combobox = combobox;
      return input;
    },
    _createTooltip: function(className) {
      var tooltip = L.Control.Search.prototype._createTooltip.call(this, className);
      tooltip.id = 'map-search-listbox';
      tooltip.setAttribute('role', 'listbox');
      return tooltip;
    },
    _accessibleExpand: function() {
      this._accessibleDescription(translations.indicator.map_search_hide);
      this._button.setAttribute('aria-expanded', 'true');
    },
    _accessibleCollapse: function() {
      this._accessibleDescription(translations.indicator.map_search_show);
      this._button.setAttribute('aria-expanded', 'false');
      this._button.focus();
    },
    _accessibleDescription: function(description) {
      this._button.title = description;
      this._button.setAttribute('aria-label', description);
    },
    expand: function(toggle) {
      L.Control.Search.prototype.expand.call(this, toggle);
      this._accessibleExpand();
      return this;
    },
    collapse: function() {
      L.Control.Search.prototype.collapse.call(this);
      this._accessibleCollapse();
      return this;
    },
    cancel: function() {
      L.Control.Search.prototype.cancel.call(this);
      this._accessibleExpand();
      this._combobox.setAttribute('aria-expanded', 'false');
      this._input.removeAttribute('aria-activedescendant');
      return this;
    },
    showTooltip: function(records) {
      L.Control.Search.prototype.showTooltip.call(this, records);
      this._accessibleDescription(translations.indicator.map_search);
      this._button.removeAttribute('aria-expanded');
      this._combobox.setAttribute('aria-expanded', 'true');
      if (this._countertips > 0) {
        this._input.setAttribute('aria-activedescendant', this._tooltip.childNodes[0].id);
      }
      return this._countertips;
    },
    _createTip: function(text, val) {
      var tip = L.Control.Search.prototype._createTip.call(this, text, val);
      tip.setAttribute('role', 'option');
      tip.id = 'map-search-option-' + val.layer.feature.properties.geocode;
      return tip;
    },
    _handleSubmit: function(e) {
      // Prevent the enter key from immediately collapsing the search bar.
      if ((typeof e === 'undefined' || e.type === 'keyup') && this._input.value === '') {
        return;
      }
      L.Control.Search.prototype._handleSubmit.call(this, e);
    },
    _handleArrowSelect: function(velocity) {
      L.Control.Search.prototype._handleArrowSelect.call(this, velocity);
      var searchTips = this._tooltip.hasChildNodes() ? this._tooltip.childNodes : [];
			for (i=0; i<searchTips.length; i++) {
			  searchTips[i].setAttribute('aria-selected', 'false');
      }
      var selectedTip = searchTips[this._tooltip.currentSelection];
      if (typeof selectedTip === 'undefined') {
        selectedTip = searchTips[0];
      }
      selectedTip.setAttribute('aria-selected', 'true');
      this._input.setAttribute('aria-activedescendant', selectedTip.id);
    },
    _createAlert: function(className) {
      var alert = L.Control.Search.prototype._createAlert.call(this, className);
      alert.setAttribute('role', 'alert');
      return alert;
    }
  });
}());
