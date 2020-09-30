/*
 * Leaflet year Slider.
 *
 * This is merely a specific configuration of Leaflet of L.TimeDimension.
 * See here: https://github.com/socib/Leaflet.TimeDimension
 */
(function () {
  "use strict";

  if (typeof L === 'undefined') {
    return;
  }

  var defaultOptions = {
    // YearSlider options.
    yearChangeCallback: null,
    years: [],
    // TimeDimensionControl options.
    timeSliderDragUpdate: true,
    speedSlider: false,
    position: 'bottomleft',
    // Player options.
    playerOptions: {
      transitionTime: 1000,
      loop: false,
      startOver: true
    },
  };

  L.Control.YearSlider = L.Control.TimeDimension.extend({

    // Hijack the displayed date format.
    _getDisplayDateFormat: function(date){
      return date.getFullYear();
    },

    // Override the _createButton method to prevent the date from being a link.
    _createButton: function(title, container) {
      if (title === 'Date') {
        var span = L.DomUtil.create('span', this.options.styleNS + ' timecontrol-' + title.toLowerCase(), container);
        span.title = title;
        return span;
      }
      else {
        return L.Control.TimeDimension.prototype._createButton.call(this, title, container);
      }
    }

  });

  // Helper function to compose the full widget.
  L.Control.yearSlider = function(options) {
    // Extend the defaults.
    options = L.Util.extend(defaultOptions, options);
    // Hardcode the timeDimension to year intervals.
    options.timeDimension = new L.TimeDimension({
      // We pad our years to at least January 2nd, so that timezone issues don't
      // cause any problems. This converts the array of years into a comma-
      // delimited string of YYYY-MM-DD dates.
      times: options.years.join('-01-02,') + '-01-02',
      currentTime: new Date(options.years[0] + '-01-02').getTime(),
    });
    // Create the player.
    options.player = new L.TimeDimension.Player(options.playerOptions, options.timeDimension);
    // Listen for time changes.
    if (typeof options.yearChangeCallback === 'function') {
      options.timeDimension.on('timeload', options.yearChangeCallback);
    };
    // Return the control.
    return new L.Control.YearSlider(options);
  };
}());
