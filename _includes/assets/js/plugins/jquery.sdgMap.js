/**
 * TODO:
 * Integrate with high-contrast switcher.
 */
(function($, L, chroma, window, document, undefined) {

  // Create the defaults once
  var defaults = {

    // Options for using tile imagery with leaflet.
    tileURL: 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}',
    tileOptions: {
      id: 'mapbox.light',
      accessToken: '[replace me]',
      attribution: '[replace me]',
    },
    // Zoom limits.
    minZoom: 5,
    maxZoom: 10,
    // Visual/choropleth considerations.
    colorRange: chroma.brewer.BuGn,
    noValueColor: '#f0f0f0',
    styleNormal: {
      weight: 1,
      opacity: 1,
      color: '#888',
      fillOpacity: 0.7
    },
    styleHighlighted: {
      weight: 1,
      opacity: 1,
      color: '#111',
      fillOpacity: 0.7
    },
  };

  // Defaults for each geoLayer.
  var geoLayerDefaults = {
    min_zoom: 0,
    max_zoom: 20,
    serviceUrl: '[replace me]',
    nameProperty: '[replace me]',
    idProperty: '[replace me]',
  }

  function Plugin(element, options) {

    this.element = element;
    this.options = $.extend(true, {}, defaults, options);

    // Require at least one geoLayer.
    if (!this.options.geoLayers.length) {
      console.log('Map disabled, no geoLayers in options.');
      return;
    }

    // Apply geoLayer defaults.
    for (var i = 0; i < this.options.geoLayers.length; i++) {
      this.options.geoLayers[i] = $.extend(true, {}, geoLayerDefaults, this.options.geoLayers[i]);
    }

    this._defaults = defaults;
    this._name = 'sdgMap';

    this.valueRange = [_.min(_.pluck(this.options.geoData, 'Value')), _.max(_.pluck(this.options.geoData, 'Value'))];
    this.colorScale = chroma.scale(this.options.colorRange)
      .domain(this.valueRange)
      .classes(this.options.colorRange.length);

    this.years = _.uniq(_.pluck(this.options.geoData, 'Year'));
    this.currentYear = this.years[0];

    this.init();
  }

  Plugin.prototype = {

    // Add time series to GeoJSON data and normalize the name and geocode.
    prepareGeoJson: function(geoJson, idProperty, nameProperty) {
      var geoData = this.options.geoData;
      geoJson.features.forEach(function(feature) {
        var geocode = feature.properties[idProperty];
        var name = feature.properties[nameProperty];
        // First add the time series data.
        var records = _.where(geoData, { GeoCode: geocode });
        records.forEach(function(record) {
          // Add the Year data into the properties.
          feature.properties[record.Year] = record.Value;
        });
        // Next normalize the geocode and name.
        feature.properties.name = name;
        feature.properties.geocode = geocode;
        delete feature.properties[idProperty];
        delete feature.properties[nameProperty];
      });
      return geoJson;
    },

    // Select a feature.
    highlightFeature: function(layer) {
      // Update the style.
      layer.setStyle(this.options.styleHighlighted);
      // Add a tooltip if not already there.
      if (!layer.getTooltip()) {
        var tooltipContent = layer.feature.properties.name;
        var tooltipData = this.getData(layer.feature.properties);
        if (tooltipData) {
          tooltipContent += ': ' + tooltipData;
        }
        layer.bindTooltip(tooltipContent, {
          permanent: true,
        }).addTo(this.map);
      }
    },

    // Unselect a feature.
    unhighlightFeature: function(layer) {

      // Reset the feature's style.
      layer.setStyle(this.options.styleNormal);

      // Remove the tooltip if necessary.
      if (layer.getTooltip()) {
        layer.unbindTooltip();
      }
    },

    // Get all of the GeoJSON layers.
    getAllLayers: function() {
      return L.featureGroup(this.zoomShowHide.layers);
    },

    // Get only the visible GeoJSON layers.
    getVisibleLayers: function() {
      // Unfortunately relies on an internal of the ZoomShowHide library.
      return this.zoomShowHide._layerGroup;
    },

    // Update the colors of the Features on the map.
    updateColors: function() {
      var plugin = this;
      this.getAllLayers().eachLayer(function(layer) {
        layer.setStyle(function(feature) {
          return {
            fillColor: plugin.getColor(feature.properties),
          }
        });
      });
    },

    // Get the data from a feature's properties, according to the current year.
    getData: function(props) {
      if (props[this.currentYear]) {
        return props[this.currentYear];
      }
      return false;
    },

    // Choose a color for a GeoJSON feature.
    getColor: function(props) {
      var data = this.getData(props);
      if (data) {
        return this.colorScale(data).hex();
      }
      else {
        return this.options.noValueColor;
      }
    },

    // Initialize the map itself.
    init: function() {

      // Create the map.
      this.map = L.map(this.element, {
        minZoom: this.options.minZoom,
        maxZoom: this.options.maxZoom,
        zoomControl: false,
      });
      this.map.setView([0, 0], 0);
      this.zoomShowHide = new ZoomShowHide();
      this.zoomShowHide.addTo(this.map);

      // Add zoom control.
      this.map.addControl(L.Control.zoomHome());

      // Add full-screen functionality.
      this.map.addControl(new L.Control.Fullscreen());

      // Add tile imagery.
      L.tileLayer(this.options.tileURL, this.options.tileOptions).addTo(this.map);

      // Because after this point, "this" rarely works.
      var plugin = this;

      // Add the year slider.
      this.map.addControl(L.Control.yearSlider({
        yearStart: this.years[0],
        yearEnd: this.years[this.years.length - 1],
        yearChangeCallback: function(e) {
          plugin.currentYear = new Date(e.time).getFullYear();
          plugin.updateColors();
          plugin.selectionLegend.update();
        }
      }));

      // Add the selection legend.
      this.selectionLegend = L.Control.selectionLegend(plugin);
      this.map.addControl(this.selectionLegend);

      // Add the download button.
      this.map.addControl(L.Control.downloadGeoJson(plugin));

      // At this point we need to load the GeoJSON layer/s.
      var geoURLs = this.options.geoLayers.map(function(item) {
        return $.getJSON(item.serviceUrl);
      });
      $.when.apply($, geoURLs).done(function() {

        var geoJsons = arguments;
        for (var i in geoJsons) {
          var idProperty = plugin.options.geoLayers[i].idProperty;
          var nameProperty = plugin.options.geoLayers[i].nameProperty;
          var geoJson = plugin.prepareGeoJson(geoJsons[i][0], idProperty, nameProperty);

          var layer = L.geoJson(geoJson, {
            style: plugin.options.styleNormal,
            onEachFeature: onEachFeature,
          });
          // Set the "boundaries" for when this layer should be zoomed out of.
          layer.min_zoom = plugin.options.geoLayers[i].min_zoom;
          layer.max_zoom = plugin.options.geoLayers[i].max_zoom;
          // Listen for when this layer gets zoomed out of.
          layer.on('remove', zoomoutHandler);
          // Save the GeoJSON object for direct access (download) later.
          layer.geoJsonObject = geoJson;
          // Add the layer to the ZoomShowHide group.
          plugin.zoomShowHide.addLayer(layer);
        }
        plugin.updateColors();

        // The list of handlers to apply to each feature on a GeoJson layer.
        function onEachFeature(feature, layer) {
          layer.on('click', clickHandler);
          layer.on('mouseover', mouseoverHandler);
          layer.on('mouseout', mouseoutHandler);
        }
        // Event handler for click/touch.
        function clickHandler(e) {
          var layer = e.target;
          if (plugin.selectionLegend.isSelected(layer)) {
            plugin.selectionLegend.removeSelection(layer);
            plugin.unhighlightFeature(layer);
          }
          else {
            plugin.selectionLegend.addSelection(layer);
            plugin.highlightFeature(layer);
            // Pan to selection.
            plugin.map.panTo(layer.getBounds().getCenter());
            // Bring layer to front.
            if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
              layer.bringToFront();
            }
          }
        }
        // Event handler for mouseover.
        function mouseoverHandler(e) {
          var layer = e.target;
          if (!plugin.selectionLegend.isSelected(layer)) {
            plugin.highlightFeature(layer);
          }
        }
        // Event handler for mouseout.
        function mouseoutHandler(e) {
          var layer = e.target;
          if (!plugin.selectionLegend.isSelected(layer)) {
            plugin.unhighlightFeature(layer);
          }
        }
        // Event handler for when a geoJson layer if zoomed out of.
        function zoomoutHandler(e) {
          var geoJsonLayer = e.target;
          // For desktop, we have to make sure that no features remain
          // highlighted, as they might have been highlighted on mouseover.
          geoJsonLayer.eachLayer(function(layer) {
            if (!plugin.selectionLegend.isSelected(layer)) {
              plugin.unhighlightFeature(layer);
            }
          })
        }
      });

      // Perform some last-minute tasks when the user clicks on the "Map" tab.
      $('.map .nav-link').click(function() {
        setTimeout(function() {
          $('#map #loader-container').hide();
          // Leaflet needs "invalidateSize()" if it was originally rendered in a
          // hidden element. So we need to do that when the tab is clicked.
          plugin.map.invalidateSize();
          // Also zoom in/out as needed.
          plugin.map.fitBounds(plugin.getVisibleLayers().getBounds());
          // Limit the panning to what we care about.
          plugin.map.setMaxBounds(plugin.getVisibleLayers().getBounds());
          // Make sure the info pane is not too wide for the map.
          var $legendPane = $('.selection-legend.leaflet-control');
          var widthPadding = 20;
          var maxWidth = $('#map').width() - widthPadding;
          if ($legendPane.width() > maxWidth) {
            $legendPane.width(maxWidth);
          }
          // Make sure the map is not too high.
          var heightPadding = 75;
          var maxHeight = $(window).height() - heightPadding;
          if ($('#map').height() > maxHeight) {
            $('#map').height(maxHeight);
          }
        }, 500);
      });
    },
  };

  // A really lightweight plugin wrapper around the constructor,
  // preventing against multiple instantiations
  $.fn['sdgMap'] = function(options) {
    return this.each(function() {
      if (!$.data(this, 'plugin_sdgMap')) {
        $.data(this, 'plugin_sdgMap', new Plugin(this, options));
      }
    });
  };
})(jQuery, L, chroma, window, document);
