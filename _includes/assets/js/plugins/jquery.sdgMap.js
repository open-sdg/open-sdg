/**
 * TODO:
 * Integrate with high-contrast switcher.
 */
(function($) {

  if (typeof L === 'undefined') {
    return;
  }

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
      color: '#888888',
      fillOpacity: 0.7
    },
    styleHighlighted: {
      weight: 1,
      opacity: 1,
      color: '#111111',
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
    max_zoom: 10,
    subfolder: 'regions',
    label: 'indicator.map',
    staticBorders: false,
  };

  function Plugin(element, options) {

    this.element = element;

    // Support colorRange map option in string format.
    if (typeof options.mapOptions.colorRange === 'string') {
      var colorRangeParts = options.mapOptions.colorRange.split('.'),
          colorRange = window,
          overrideColorRange = true;
      for (var i = 0; i < colorRangeParts.length; i++) {
        var colorRangePart = colorRangeParts[i];
        if (typeof colorRange[colorRangePart] !== 'undefined') {
          colorRange = colorRange[colorRangePart];
        }
        else {
          overrideColorRange = false;
          break;
        }
      }
      if (overrideColorRange && typeof colorRange === 'function') {
        var indicatorId = options.indicatorId.replace('indicator_', ''),
            indicatorIdParts = indicatorId.split('-'),
            goalId = (indicatorIdParts.length > 0) ? indicatorIdParts[0] : null,
            indicatorIdDots = indicatorIdParts.join('.');
        colorRange = colorRange(indicatorIdDots, goalId);
      }
      options.mapOptions.colorRange = (overrideColorRange) ? colorRange : defaults.colorRange;
    }

    this.options = $.extend(true, {}, defaults, options.mapOptions);
    this.mapLayers = [];
    this.indicatorId = options.indicatorId;
    this._precision = options.precision;
    this.precisionItems = options.precisionItems;
    this._decimalSeparator = options.decimalSeparator;
    this.currentDisaggregation = 0;
    this.dataSchema = options.dataSchema;
    this.viewHelpers = options.viewHelpers;
    this.modelHelpers = options.modelHelpers;
    this.chartTitles = options.chartTitles;
    this.startValues = options.startValues;

    // Require at least one geoLayer.
    if (!options.mapLayers || !options.mapLayers.length) {
      console.log('Map disabled - please add "map_layers" in site configuration.');
      return;
    }

    // Apply geoLayer defaults.
    for (var i = 0; i < options.mapLayers.length; i++) {
      this.mapLayers[i] = $.extend(true, {}, mapLayerDefaults, options.mapLayers[i]);
    }

    // Sort the map layers according to zoom levels.
    this.mapLayers.sort(function(a, b) {
      if (a.min_zoom === b.min_zoom) {
        return a.max_zoom - b.max_zoom;
      }
      return a.min_zoom - b.min_zoom;
    });

    this._defaults = defaults;
    this._name = 'sdgMap';

    this.init();
  }

  Plugin.prototype = {

    // Update title.
    updateTitle: function() {
      if (!this.modelHelpers) {
        return;
      }
      var currentSeries = this.disaggregationControls.getCurrentSeries(),
          currentUnit = this.disaggregationControls.getCurrentUnit(),
          newTitle = null;
      if (this.modelHelpers.GRAPH_TITLE_FROM_SERIES) {
        newTitle = currentSeries;
      }
      else {
        var currentTitle = $('#map-heading').text();
        newTitle = this.modelHelpers.getChartTitle(currentTitle, this.chartTitles, currentUnit, currentSeries);
      }
      if (newTitle) {
        $('#map-heading').text(newTitle);
      }
    },

    // Update footer fields.
    updateFooterFields: function() {
      if (!this.viewHelpers) {
        return;
      }
      var currentSeries = this.disaggregationControls.getCurrentSeries(),
          currentUnit = this.disaggregationControls.getCurrentUnit();
      this.viewHelpers.updateSeriesAndUnitElements(currentSeries, currentUnit);
      this.viewHelpers.updateUnitElements(currentUnit);
    },

    // Update precision.
    updatePrecision: function() {
      if (!this.modelHelpers) {
        return;
      }
      var currentSeries = this.disaggregationControls.getCurrentSeries(),
          currentUnit = this.disaggregationControls.getCurrentUnit();
      this._precision = this.modelHelpers.getPrecision(this.precisionItems, currentUnit, currentSeries);
    },

    // Zoom to a feature.
    zoomToFeature: function(layer) {
      this.map.fitBounds(layer.getBounds());
    },

    // Build content for a tooltip.
    getTooltipContent: function(feature) {
      var tooltipContent = feature.properties.name;
      var tooltipData = this.getData(feature.properties);
      if (typeof tooltipData === 'number') {
        tooltipContent += ': ' + this.alterData(tooltipData);
      }
      return tooltipContent;
    },

    // Update a tooltip.
    updateTooltip: function(layer) {
      if (layer.getTooltip()) {
        var tooltipContent = this.getTooltipContent(layer.feature);
        layer.setTooltipContent(tooltipContent);
      }
    },

    // Create tooltip.
    createTooltip: function(layer) {
      if (!layer.getTooltip()) {
        var tooltipContent = this.getTooltipContent(layer.feature);
        layer.bindTooltip(tooltipContent, {
          permanent: true,
        }).addTo(this.map);
      }
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
      this.createTooltip(layer);
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

    // Update the tooltips of the selected Features on the map.
    updateTooltips: function() {
      var plugin = this;
      this.selectionLegend.selections.forEach(function(selection) {
        plugin.updateTooltip(selection);
      });
    },

    // Alter data before displaying it.
    alterData: function(value) {
      opensdg.dataDisplayAlterations.forEach(function(callback) {
        value = callback(value);
      });
      if (typeof value !== 'number') {
        if (this._precision || this._precision === 0) {
          value = Number.parseFloat(value).toFixed(this._precision);
        }
        if (this._decimalSeparator) {
          value = value.toString().replace('.', this._decimalSeparator);
        }
      }
      else {
        var localeOpts = {};
        if (this._precision || this._precision === 0) {
            localeOpts.minimumFractionDigits = this._precision;
            localeOpts.maximumFractionDigits = this._precision;
        }
        value = value.toLocaleString(opensdg.language, localeOpts);
      }
      return value;
    },

    // Get the data from a feature's properties, according to the current year.
    getData: function(props) {
      var ret = false;
      if (props.values && props.values.length && this.currentDisaggregation < props.values.length) {
        var value = props.values[this.currentDisaggregation][this.currentYear];
        if (typeof value === 'number') {
          ret = opensdg.dataRounding(value, { indicatorId: this.indicatorId });
        }
      }
      return ret;
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

    // Set (or re-set) the choropleth color scale.
    setColorScale: function() {
      this.colorScale = chroma.scale(this.options.colorRange)
        .domain(this.valueRanges[this.currentDisaggregation])
        .classes(this.options.colorRange.length);
    },

    // Get the (long) URL of a geojson file, given a particular subfolder.
    getGeoJsonUrl: function(subfolder) {
      var fileName = this.indicatorId + '.geojson';
      return [opensdg.remoteDataBaseUrl, 'geojson', subfolder, fileName].join('/');
    },

    getYearSlider: function() {
      var plugin = this,
          years = plugin.years[plugin.currentDisaggregation];
      return L.Control.yearSlider({
        years: years,
        yearChangeCallback: function(e) {
          plugin.currentYear = years[e.target._currentTimeIndex];
          plugin.updateColors();
          plugin.updateTooltips();
          plugin.selectionLegend.update();
        }
      });
    },

    replaceYearSlider: function() {
      var newSlider = this.getYearSlider();
      var oldSlider = this.yearSlider;
      this.map.addControl(newSlider);
      this.map.removeControl(oldSlider);
      this.yearSlider = newSlider;
      $(this.yearSlider.getContainer()).insertAfter($(this.disaggregationControls.getContainer()));
      this.yearSlider._timeDimension.setCurrentTimeIndex(this.yearSlider._timeDimension.getCurrentTimeIndex());
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

      // Add scale.
      this.map.addControl(L.control.scale({position: 'bottomright'}));

      // Add tile imagery.
      if (this.options.tileURL && this.options.tileURL !== 'undefined' && this.options.tileURL != '') {
        L.tileLayer(this.options.tileURL, this.options.tileOptions).addTo(this.map);
      }

      // Because after this point, "this" rarely works.
      var plugin = this;

      // Below we'll be figuring out the min/max values and available years.
      var minimumValues = [],
          maximumValues = [],
          availableYears = [];

      // At this point we need to load the GeoJSON layer/s.
      var geoURLs = this.mapLayers.map(function(item) {
        return $.getJSON(plugin.getGeoJsonUrl(item.subfolder));
      });
      $.when.apply($, geoURLs).done(function() {

        // Apparently "arguments" can either be an array of responses, or if
        // there was only one response, the response itself. This behavior is
        // odd and should be investigated. In the meantime, a workaround is a
        // blunt check to see if it is a single response.
        var geoJsons = arguments;
        // In a response, the second element is a string (like 'success') so
        // check for that here to identify whether it is a response.
        if (arguments.length > 1 && typeof arguments[1] === 'string') {
          // If so, put it into an array, to match the behavior when there are
          // multiple responses.
          geoJsons = [geoJsons];
        }

        // Do a quick loop through to see which layers actually have data.
        for (var i = 0; i < geoJsons.length; i++) {
          var layerHasData = true;
          if (typeof geoJsons[i][0].features === 'undefined') {
            layerHasData = false;
          }
          else if (!plugin.featuresShouldDisplay(geoJsons[i][0].features)) {
            layerHasData = false;
          }
          if (layerHasData === false) {
            // If a layer has no data, we'll be skipping it.
            plugin.mapLayers[i].skipLayer = true;
            // We also need to alter a sibling layer's min_zoom or max_zoom.
            var hasLayerBefore = i > 0;
            var hasLayerAfter = i < (geoJsons.length - 1);
            if (hasLayerBefore) {
              plugin.mapLayers[i - 1].max_zoom = plugin.mapLayers[i].max_zoom;
            }
            else if (hasLayerAfter) {
              plugin.mapLayers[i + 1].min_zoom = plugin.mapLayers[i].min_zoom;
            }
          }
          else {
            plugin.mapLayers[i].skipLayer = false;
          }
        }

        for (var i = 0; i < geoJsons.length; i++) {
          if (plugin.mapLayers[i].skipLayer) {
            continue;
          }
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
          var geoJson = geoJsons[i][0]
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

          // Add a download button below the map.
          var downloadLabel = translations.t(plugin.mapLayers[i].label)
          var downloadButton = $('<a></a>')
            .attr('href', plugin.getGeoJsonUrl(plugin.mapLayers[i].subfolder))
            .attr('download', '')
            .attr('class', 'btn btn-primary btn-download')
            .attr('title', translations.indicator.download_geojson_title + ' - ' + downloadLabel)
            .attr('aria-label', translations.indicator.download_geojson_title + ' - ' + downloadLabel)
            .text(translations.indicator.download_geojson + ' - ' + downloadLabel);
          $(plugin.element).parent().append(downloadButton);

          // Keep track of the minimums and maximums.
          _.each(geoJson.features, function(feature) {
            if (feature.properties.values && feature.properties.values.length > 0) {
              for (var valueIndex = 0; valueIndex < feature.properties.values.length; valueIndex++) {
                var validEntries = _.reject(Object.entries(feature.properties.values[valueIndex]), function(entry) {
                  return isMapValueInvalid(entry[1]);
                });
                var validKeys = validEntries.map(function(entry) {
                  return entry[0];
                });
                var validValues = validEntries.map(function(entry) {
                  return entry[1];
                });
                if (availableYears.length <= valueIndex) {
                  availableYears.push([]);
                }
                availableYears[valueIndex] = availableYears[valueIndex].concat(validKeys);
                if (minimumValues.length <= valueIndex) {
                  minimumValues.push([]);
                  maximumValues.push([]);
                }
                minimumValues[valueIndex].push(_.min(validValues));
                maximumValues[valueIndex].push(_.max(validValues));
              }
            }
          });
        }

        // Calculate the ranges of values, years and colors.
        function isMapValueInvalid(val) {
          return _.isNaN(val) || val === '';
        }

        plugin.valueRanges = [];
        for (var valueIndex = 0; valueIndex < minimumValues.length; valueIndex++) {
          minimumValues[valueIndex] = _.reject(minimumValues[valueIndex], isMapValueInvalid);
          maximumValues[valueIndex] = _.reject(maximumValues[valueIndex], isMapValueInvalid);
          plugin.valueRanges[valueIndex] = [_.min(minimumValues[valueIndex]), _.max(maximumValues[valueIndex])];
        }
        plugin.setColorScale();

        plugin.years = availableYears.map(function(yearsForIndex) {
          return _.uniq(yearsForIndex).sort();
        });
        //Start the map with the most recent year
        plugin.currentYear = plugin.years[plugin.currentDisaggregation].slice(-1)[0];
        plugin.currentYear = plugin.years.slice(-1)[0];

        // And we can now update the colors.
        plugin.updateColors();

        // Add zoom control.
        plugin.zoomHome = L.Control.zoomHome({
          zoomInTitle: translations.indicator.map_zoom_in,
          zoomOutTitle: translations.indicator.map_zoom_out,
          zoomHomeTitle: translations.indicator.map_zoom_home,
        });
        plugin.map.addControl(plugin.zoomHome);

        // Add full-screen functionality.
        plugin.map.addControl(new L.Control.FullscreenAccessible({
          title: {
              'false': translations.indicator.map_fullscreen,
              'true': translations.indicator.map_fullscreen_exit,
          },
        }));

        // Add the year slider.
        plugin.yearSlider = plugin.getYearSlider();
        plugin.map.addControl(plugin.yearSlider);

        // Add the selection legend.
        plugin.selectionLegend = L.Control.selectionLegend(plugin);
        plugin.map.addControl(plugin.selectionLegend);

        // Add the disaggregation controls.
        plugin.disaggregationControls = L.Control.disaggregationControls(plugin);
        plugin.map.addControl(plugin.disaggregationControls);
        if (plugin.disaggregationControls.needsMapUpdate) {
          plugin.disaggregationControls.updateMap();
        }
        else {
          plugin.updateTitle();
          plugin.updateFooterFields();
          plugin.updatePrecision();
        }

        // Add the search feature.
        plugin.searchControl = new L.Control.SearchAccessible({
          textPlaceholder: 'Search map',
          autoCollapseTime: 7000,
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
        });
        plugin.map.addControl(plugin.searchControl);
        // The search plugin messes up zoomShowHide, so we have to reset that
        // with this hacky method. Is there a better way?
        var zoom = plugin.map.getZoom();
        plugin.map.setZoom(plugin.options.maxZoom);
        plugin.map.setZoom(zoom);

        // Hide the loading image.
        $('.map-loading-image').hide();
        // Make the map unfocusable.
        $('#map').removeAttr('tabindex');

        // The list of handlers to apply to each feature on a GeoJson layer.
        function onEachFeature(feature, layer) {
          if (plugin.featureShouldDisplay(feature)) {
            layer.on('click', clickHandler);
            layer.on('mouseover', mouseoverHandler);
            layer.on('mouseout', mouseoutHandler);
          }
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
          if (plugin.disaggregationControls) {
            plugin.disaggregationControls.update();
          }
        }
        // Event handler for when a geoJson layer is zoomed into.
        function zoomInHandler(e) {
          plugin.updateStaticLayers();
          if (plugin.disaggregationControls) {
            plugin.disaggregationControls.update();
          }
        }
      });

      // Certain things cannot be done until the map is visible. Because our
      // map is in a tab which might not be visible, we have to postpone those
      // things until it becomes visible.
      if ($('#map').is(':visible')) {
        finalMapPreparation();
      }
      else {
        $('#tab-mapview').parent().click(finalMapPreparation);
      }
      function finalMapPreparation() {
        // Update the series/unit stuff in case it changed
        // while on the chart/table.
        plugin.updateTitle();
        plugin.updateFooterFields();
        plugin.updatePrecision();
        // The year slider does not seem to be correct unless we refresh it here.
        plugin.yearSlider._timeDimension.setCurrentTimeIndex(plugin.yearSlider._timeDimension.getCurrentTimeIndex());
        // Delay other things to give time for browser to do stuff.
        setTimeout(function() {
          $('#map #loader-container').hide();
          // Leaflet needs "invalidateSize()" if it was originally rendered in a
          // hidden element. So we need to do that when the tab is clicked.
          plugin.map.invalidateSize();
          // Also zoom in/out as needed.
          plugin.map.fitBounds(plugin.getVisibleLayers().getBounds());
          // Set the home button to return to that zoom.
          plugin.zoomHome.setHomeBounds(plugin.getVisibleLayers().getBounds());
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
          var minHeight = 400;
          var maxHeight = $(window).height() - heightPadding;
          if (maxHeight < minHeight) {
            maxHeight = minHeight;
          }
          if ($('#map').height() > maxHeight) {
            $('#map').height(maxHeight);
          }
        }, 500);
      };
    },

    featureShouldDisplay: function(feature) {
      var display = true;
      display = display && typeof feature.properties.name !== 'undefined';
      display = display && typeof feature.properties.geocode !== 'undefined';
      display = display && typeof feature.properties.values !== 'undefined';
      display = display && typeof feature.properties.disaggregations !== 'undefined';
      return display;
    },

    featuresShouldDisplay: function(features) {
      for (var i = 0; i < features.length; i++) {
        if (this.featureShouldDisplay(features[i])) {
          return true;
        }
      }
      return false;
    }
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
})(jQuery);
