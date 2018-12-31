/**
 * TODO:
 * Integrate with high-contrast switcher.
 */
(function($, L, chroma, window, document, undefined) {

  // Create the defaults once
  var defaults = {

    // Options for using tile imagery with leaflet.
    tileURL: '[replace me]',
    tileOptions: {
      id: '[relace me]',
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
    styleStatic: {
      weight: 2,
      opacity: 1,
      fillOpacity: 0,
      color: '#172d44',
      dashArray: '5,5',
    },
  };

  // Defaults for each map layer.
  var mapLayerDefaults = {
    min_zoom: 0,
    max_zoom: 20,
    serviceUrl: '[replace me]',
    nameProperty: '[replace me]',
    idProperty: '[replace me]',
    staticBorders: false,
  };

  function Plugin(element, options) {

    this.element = element;
    this.options = $.extend(true, {}, defaults, options.mapOptions);
    this.mapLayers = [];
    this.geoData = options.geoData;
    this.geoCodeRegEx = options.geoCodeRegEx;

    // Require at least one geoLayer.
    if (!options.mapLayers.length) {
      console.log('Map disabled, no mapLayers in options.');
      return;
    }

    // Apply geoLayer defaults.
    for (var i = 0; i < options.mapLayers.length; i++) {
      this.mapLayers[i] = $.extend(true, {}, mapLayerDefaults, options.mapLayers[i]);
    }

    this._defaults = defaults;
    this._name = 'sdgMap';

    this.valueRange = [_.min(_.pluck(this.geoData, 'Value')), _.max(_.pluck(this.geoData, 'Value'))];
    this.colorScale = chroma.scale(this.options.colorRange)
      .domain(this.valueRange)
      .classes(this.options.colorRange.length);

    this.years = _.uniq(_.pluck(this.geoData, 'Year'));
    this.currentYear = this.years[0];

    this.init();
  }

  Plugin.prototype = {

    // Add time series to GeoJSON data and normalize the name and geocode.
    prepareGeoJson: function(geoJson, idProperty, nameProperty) {
      var geoData = this.geoData;
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

    // Zoom to a feature.
    zoomToFeature: function(layer) {
      this.map.fitBounds(layer.getBounds());
    },

    // Select a feature.
    highlightFeature: function(layer) {
      // Abort if the layer is not on the map.
      if (!this.map.hasLayer(layer)) {
        return;
      }
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
      if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
      }
      this.updateStaticLayers();
    },

    // Unselect a feature.
    unhighlightFeature: function(layer) {

      // Reset the feature's style.
      layer.setStyle(this.options.styleNormal);

      // Remove the tooltip if necessary.
      if (layer.getTooltip()) {
        layer.unbindTooltip();
      }

      // Make sure other selections are still highlighted.
      var plugin = this;
      this.selectionLegend.selections.forEach(function(selection) {
        plugin.highlightFeature(selection);
      });
    },

    // Get all of the GeoJSON layers.
    getAllLayers: function() {
      return L.featureGroup(this.dynamicLayers.layers);
    },

    // Get only the visible GeoJSON layers.
    getVisibleLayers: function() {
      // Unfortunately relies on an internal of the ZoomShowHide library.
      return this.dynamicLayers._layerGroup;
    },

    updateStaticLayers: function() {
      // Make sure the static borders are always visible.
      this.staticLayers._layerGroup.eachLayer(function(layer) {
        layer.bringToFront();
      });
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
      this.dynamicLayers = new ZoomShowHide();
      this.dynamicLayers.addTo(this.map);
      this.staticLayers = new ZoomShowHide();
      this.staticLayers.addTo(this.map);

      // Add zoom control.
      this.map.addControl(L.Control.zoomHome());

      // Add full-screen functionality.
      this.map.addControl(new L.Control.Fullscreen());

      // Add scale.
      this.map.addControl(L.control.scale({position: 'bottomright'}));

      // Add tile imagery.
      L.tileLayer(this.options.tileURL, this.options.tileOptions).addTo(this.map);

      // Because after this point, "this" rarely works.
      var plugin = this;

      // Add the year slider for desktop.
      if (!L.Browser.mobile) {
        this.map.addControl(L.Control.yearSlider({
          yearStart: this.years[0],
          yearEnd: this.years[this.years.length - 1],
          yearChangeCallback: function(e) {
            plugin.currentYear = new Date(e.time).getFullYear();
            plugin.updateColors();
            plugin.selectionLegend.update();
          }
        }));
      }

      // Add the selection legend.
      this.selectionLegend = L.Control.selectionLegend(plugin);
      this.map.addControl(this.selectionLegend);

      // Add the download button.
      this.map.addControl(L.Control.downloadGeoJson(plugin));

      // At this point we need to load the GeoJSON layer/s.
      var geoURLs = this.mapLayers.map(function(item) {
        return $.getJSON(item.serviceUrl);
      });
      $.when.apply($, geoURLs).done(function() {

        var geoJsons = arguments;
        for (var i in geoJsons) {
          // First add the geoJson as static (non-interactive) borders.
          if (plugin.mapLayers[i].staticBorders) {
            var staticLayer = L.geoJson(geoJsons[i][0], {
              style: plugin.options.styleStatic,
              interactive: false,
            });
            // Static layers should start appear when zooming past their dynamic
            // layer, and stay visible after that.
            staticLayer.min_zoom = plugin.mapLayers[i].max_zoom + 1;
            staticLayer.max_zoom = plugin.options.maxZoom;
            plugin.staticLayers.addLayer(staticLayer);
          }
          // Now go on to add the geoJson again as choropleth dynamic regions.
          var idProperty = plugin.mapLayers[i].idProperty;
          var nameProperty = plugin.mapLayers[i].nameProperty;
          var geoJson = plugin.prepareGeoJson(geoJsons[i][0], idProperty, nameProperty);

          var layer = L.geoJson(geoJson, {
            style: plugin.options.styleNormal,
            onEachFeature: onEachFeature,
          });
          // Set the "boundaries" for when this layer should be zoomed out of.
          layer.min_zoom = plugin.mapLayers[i].min_zoom;
          layer.max_zoom = plugin.mapLayers[i].max_zoom;
          // Listen for when this layer gets zoomed in or out of.
          layer.on('remove', zoomOutHandler);
          layer.on('add', zoomInHandler);
          // Save the GeoJSON object for direct access (download) later.
          layer.geoJsonObject = geoJson;
          // Add the layer to the ZoomShowHide group.
          plugin.dynamicLayers.addLayer(layer);
        }
        plugin.updateColors();

        // Now that we have layers, we can add the search feature.
        plugin.searchControl = new L.Control.Search({
          layer: plugin.getAllLayers(),
          propertyName: 'name',
          marker: false,
          moveToLocation: function(latlng) {
            plugin.zoomToFeature(latlng.layer);
            if (!plugin.selectionLegend.isSelected(latlng.layer)) {
              plugin.highlightFeature(latlng.layer);
              plugin.selectionLegend.addSelection(latlng.layer);
            }
          },
          autoCollapse: true,
        });
        plugin.map.addControl(plugin.searchControl);
        // The search plugin messes up zoomShowHide, so we have to reset that
        // with this hacky method. Is there a better way?
        var zoom = plugin.map.getZoom();
        plugin.map.setZoom(zoom + 1);
        plugin.map.setZoom(zoom);

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
            plugin.zoomToFeature(layer);
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
        // Event handler for when a geoJson layer is zoomed out of.
        function zoomOutHandler(e) {
          var geoJsonLayer = e.target;
          // For desktop, we have to make sure that no features remain
          // highlighted, as they might have been highlighted on mouseover.
          geoJsonLayer.eachLayer(function(layer) {
            if (!plugin.selectionLegend.isSelected(layer)) {
              plugin.unhighlightFeature(layer);
            }
          });
          plugin.updateStaticLayers();
        }
        // Event handler for when a geoJson layer is zoomed into.
        function zoomInHandler(e) {
          plugin.updateStaticLayers();
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
