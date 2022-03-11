/*
 * Leaflet fullscreenAccessible.
 *
 * This is an override of L.Control.Fullscreen for accessibility fixes.
 * See here: https://github.com/Leaflet/Leaflet.fullscreen
 */
(function () {
    "use strict";

    if (typeof L === 'undefined') {
        return;
    }

    L.Control.FullscreenAccessible = L.Control.Fullscreen.extend({
        onAdd: function(map) {
            var container = L.Control.Fullscreen.prototype.onAdd.call(this, map);
            this.link.setAttribute('role', 'button');
            this.link.setAttribute('aria-label', this.link.title);
            this.link.innerHTML = '<i class="{% if site.bootstrap_5 %}bi bi-fullscreen{% else %}fa fa-expand{% endif %}" aria-hidden="true"></i>';
            return container;
        },
        _toggleTitle: function() {
            L.Control.Fullscreen.prototype._toggleTitle.call(this);
            this.link.setAttribute('aria-label', this.link.title);
            {% if site.bootstrap_5 %}
            var biClass = this._map.isFullscreen() ? 'bi-fullscreen-exit' : 'bi-fullscreen';
            this.link.innerHTML = '<i class="bi ' + biClass + '" aria-hidden="true"></i>';
            {% else %}
            var faClass = this._map.isFullscreen() ? 'fa-compress' : 'fa-expand'
            this.link.innerHTML = '<i class="fa ' + faClass + '" aria-hidden="true"></i>';
            {% endif %}
        }
    });

  }());
