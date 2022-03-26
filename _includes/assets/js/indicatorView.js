var indicatorView = function (model, options) {

  "use strict";

  var view_obj = this;
  this._model = model;

  this._chartInstance = undefined;
  this._rootElement = options.rootElement;
  this._tableColumnDefs = options.tableColumnDefs;
  this._mapView = undefined;
  this._legendElement = options.legendElement;
  this._precision = undefined;
  this._decimalSeparator = options.decimalSeparator;

  var chartHeight = screen.height < options.maxChartHeight ? screen.height : options.maxChartHeight;

  $('.plot-container', this._rootElement).css('height', chartHeight + 'px');

  $(document).ready(function() {
    $(view_obj._rootElement).find('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
      if($(e.target).attr('href') == '#tableview') {
        setDataTableWidth($(view_obj._rootElement).find('#selectionsTable table'));
      } else {
        $($.fn.dataTable.tables(true)).css('width', '100%');
        $($.fn.dataTable.tables(true)).DataTable().columns.adjust().draw();
      }
    });

    // Execute the hide/show functionality for the sidebar, both on
    // the currently active tab, and each time a tab is clicked on.
    $('.data-view .nav-item.active .nav-link').each(toggleSidebar);
    $('.data-view .nav-link').on('click', toggleSidebar);
    function toggleSidebar() {
      var $sidebar = $('.indicator-sidebar'),
          $main = $('.indicator-main'),
          hideSidebar = $(this).data('no-disagg'),
          mobile = window.matchMedia("screen and (max-width: 990px)");
      if (hideSidebar) {
        $sidebar.addClass('indicator-sidebar-hidden');
        $main.addClass('indicator-main-full');
        // On mobile, this can be confusing, so we need to scroll to the tabs.
        if (mobile.matches) {
          $([document.documentElement, document.body]).animate({
            scrollTop: $("#indicator-main").offset().top - 40
          }, 400);
        }
      }
      else {
        $sidebar.removeClass('indicator-sidebar-hidden');
        $main.removeClass('indicator-main-full');
      }
    };
  });

  this._model.onDataComplete.attach(function (sender, args) {

    view_obj._precision = args.precision;

    if(view_obj._model.showData) {

      $('#dataset-size-warning')[args.datasetCountExceedsMax ? 'show' : 'hide']();

      if(!view_obj._chartInstance) {
        view_obj.createPlot(args);
      } else {
        view_obj.updatePlot(args);
      }
    }

    view_obj.createSelectionsTable(args);

    view_obj.updateChartTitle(args.chartTitle);
    view_obj.updateSeriesAndUnitElements(args.selectedSeries, args.selectedUnit);
    view_obj.updateUnitElements(args.selectedUnit);
    view_obj.updateTimeSeriesAttributes(args.timeSeriesAttributes);
  });

  this._model.onFieldsComplete.attach(function(sender, args) {
    view_obj.initialiseFields(args);

    if(args.hasGeoData && args.showMap) {
      view_obj._mapView = new mapView();
      view_obj._mapView.initialise(args.indicatorId, args.precision, view_obj._decimalSeparator);
    }
  });

  this._model.onUnitsComplete.attach(function(sender, args) {
    view_obj.initialiseUnits(args);
  });

  if (this._model.onSeriesesComplete) {
    this._model.onSeriesesComplete.attach(function(sender, args) {
      view_obj.initialiseSerieses(args);
    });
  }

  this._model.onFieldsCleared.attach(function(sender, args) {
    $(view_obj._rootElement).find(':checkbox').prop('checked', false);
    $(view_obj._rootElement).find('#clear')
      .addClass('disabled')
      .attr('aria-disabled', 'true')
      .attr('disabled', 'disabled');

    // reset available/unavailable fields
    updateWithSelectedFields();

    $(view_obj._rootElement).find('.selected').css('width', '0');
  });

  this._model.onSelectionUpdate.attach(function(sender, args) {
    if (args.selectedFields.length) {
      $(view_obj._rootElement).find('#clear')
        .removeClass('disabled')
        .attr('aria-disabled', 'false')
        .removeAttr('disabled');
    }
    else {
      $(view_obj._rootElement).find('#clear')
        .addClass('disabled')
        .attr('aria-disabled', 'true')
        .attr('disabled', 'disabled');
    }

    // loop through the available fields:
    $('.variable-selector').each(function(index, element) {
      var currentField = $(element).data('field');
      var element = $(view_obj._rootElement).find('.variable-selector[data-field="' + currentField + '"]');

      // is this an allowed field:
      if (args.allowedFields.includes(currentField)) {
        $(element).removeClass('disallowed');
        $(element).find('> button').removeAttr('aria-describedby');
      }
      else {
        $(element).addClass('disallowed');
        $(element).find('> button').attr('aria-describedby', 'variable-hint-' + currentField);
      }
    });
  });

  this._model.onFieldsStatusUpdated.attach(function (sender, args) {

    _.each(args.data, function(fieldGroup) {
      _.each(fieldGroup.values, function(fieldItem) {
        var element = $(view_obj._rootElement).find(':checkbox[value="' + fieldItem.value + '"][data-field="' + fieldGroup.field + '"]');
        element.parent().addClass(fieldItem.state).attr('data-has-data', fieldItem.hasData);
      });
      // Indicate whether the fieldGroup had any data.
      var fieldGroupElement = $(view_obj._rootElement).find('.variable-selector[data-field="' + fieldGroup.field + '"]');
      fieldGroupElement.attr('data-has-data', fieldGroup.hasData);
      var fieldGroupButton = fieldGroupElement.find('> button'),
          describedByCurrent = fieldGroupButton.attr('aria-describedby') || '',
          noDataHintId = 'no-data-hint-' + fieldGroup.field.replace(/ /g, '-');
      if (!fieldGroup.hasData && !describedByCurrent.includes(noDataHintId)) {
        fieldGroupButton.attr('aria-describedby', describedByCurrent + ' ' + noDataHintId);
      }
      else {
        fieldGroupButton.attr('aria-describedby', describedByCurrent.replace(noDataHintId, ''));
      }

      // Re-sort the items.
      view_obj.sortFieldGroup(fieldGroupElement);
    });
  });

  $(this._rootElement).on('click', '#clear', function() {
    view_obj._model.clearSelectedFields();
  });

  $(this._rootElement).on('click', '#fields label', function (e) {

    if(!$(this).closest('.variable-selector').hasClass('disallowed')) {
      $(this).find(':checkbox').trigger('click');
    }

    e.preventDefault();
    e.stopPropagation();
  });

  $(this._rootElement).on('change', '#units input', function() {
    view_obj._model.updateSelectedUnit($(this).val());
  });

  $(this._rootElement).on('change', '#serieses input', function() {
    view_obj._model.updateSelectedSeries($(this).val());
  });

  // generic helper function, used by clear all/select all and individual checkbox changes:
  var updateWithSelectedFields = function() {
    view_obj._model.updateSelectedFields(_.chain(_.map($('#fields input:checked'), function (fieldValue) {
      return {
        value: $(fieldValue).val(),
        field: $(fieldValue).data('field')
      };
    })).groupBy('field').map(function(value, key) {
      return {
        field: key,
        values: _.map(value, 'value')
      };
    }).value());
  }

  $(this._rootElement).on('click', '.variable-options button', function(e) {
    var type = $(this).data('type');
    var $options = $(this).closest('.variable-options').find(':checkbox');

    // The clear button can clear all checkboxes.
    if (type == 'clear') {
      $options.prop('checked', false);
    }
    // The select button must only select checkboxes that have data.
    if (type == 'select') {
      $options.parent().not('[data-has-data=false]').find(':checkbox').prop('checked', true)
    }

    updateWithSelectedFields();

    e.stopPropagation();
  });

  $(this._rootElement).on('click', ':checkbox', function(e) {

    // don't permit disallowed selections:
    if ($(this).closest('.variable-selector').hasClass('disallowed')) {
      return;
    }

    updateWithSelectedFields();

    e.stopPropagation();
  });

  $(this._rootElement).on('click', '.variable-selector', function(e) {

    var $button = $(e.target).closest('button');
    var $options = $(this).find('.variable-options');

    if ($options.is(':visible')) {
      $options.hide();
      $button.attr('aria-expanded', 'false');
    }
    else {
      $options.show();
      $button.attr('aria-expanded', 'true');
    }

    e.stopPropagation();
  });

  this.initialiseFields = function(args) {
    var fieldsContainValues = args.fields.some(function(field) {
      return field.values.length > 0;
    });
    if (fieldsContainValues) {
      var template = _.template($("#item_template").html());

      if(!$('button#clear').length) {
        $('<button id="clear" disabled="disabled" aria-disabled="true" class="disabled">' + translations.indicator.clear_selections + ' <i class="fa fa-remove"></i></button>').insertBefore('#fields');
      }

      $('#fields').html(template({
        fields: args.fields,
        allowedFields: args.allowedFields,
        childFields: _.uniq(args.edges.map(function(edge) { return edge.To })),
        edges: args.edges
      }));

      $(this._rootElement).removeClass('no-fields');

    } else {
      $(this._rootElement).addClass('no-fields');
    }
  };

  this.initialiseUnits = function(args) {
    var template = _.template($('#units_template').html()),
        units = args.units || [],
        selectedUnit = args.selectedUnit || null;

    $('#units').html(template({
      units: units,
      selectedUnit: selectedUnit
    }));

    {% if site.hide_single_unit %}
    if (units.length <= 1) {
    {% else %}
    if (units.length < 1) {
    {% endif %}
      $(this._rootElement).addClass('no-units');
    }
    else {
      $(this._rootElement).removeClass('no-units');
    }
  };

  this.initialiseSerieses = function(args) {
    var templateElement = $('#series_template');
    if (templateElement.length > 0) {
      var template = _.template(templateElement.html()),
          serieses = args.serieses || [],
          selectedSeries = args.selectedSeries || null;

      $('#serieses').html(template({
        serieses: serieses,
        selectedSeries: selectedSeries
      }));

      {% if site.hide_single_series %}
      if (serieses.length <= 1) {
      {% else %}
      if (serieses.length < 1) {
      {% endif %}
        $(this._rootElement).addClass('no-serieses');
      }
    }
  };

  this.alterChartConfig = function(config, info) {
    opensdg.chartConfigAlterations.forEach(function(callback) {
      callback(config, info);
    });
  };

  this.alterTableConfig = function(config, info) {
    // deprecated start
    if (typeof opensdg.tableConfigAlterations === 'undefined') {
      opensdg.tableConfigAlterations = [];
    }
    // deprecated end
    opensdg.tableConfigAlterations.forEach(function(callback) {
      callback(config, info);
    });
  };

  this.alterDataDisplay = function(value, info, context) {
    // If value is empty, we will not alter it.
    if (value == null || value == undefined) {
      return value;
    }
    // Before passing to user-defined dataDisplayAlterations, let's
    // do our best to ensure that it starts out as a number.
    var altered = value;
    if (typeof altered !== 'number') {
      altered = Number(value);
    }
    // If that gave us a non-number, return original.
    if (isNaN(altered)) {
      return value;
    }
    // Now go ahead with user-defined alterations.
    // @deprecated start
    if (typeof opensdg.dataDisplayAlterations === 'undefined') {
      opensdg.dataDisplayAlterations = [];
    }
    // @deprecated end
    opensdg.dataDisplayAlterations.forEach(function(callback) {
      altered = callback(altered, info, context);
    });
    // Now apply our custom precision control if needed.
    if (view_obj._precision || view_obj._precision === 0) {
      altered = Number.parseFloat(altered).toFixed(view_obj._precision);
    }
    // Now apply our custom decimal separator if needed.
    if (view_obj._decimalSeparator) {
      altered = altered.toString().replace('.', view_obj._decimalSeparator);
    }
    return altered;
  }

  this.updateChartTitle = function(chartTitle) {
    if (typeof chartTitle !== 'undefined') {
      $('.chart-title').text(chartTitle);
    }
  }

  this.updateSeriesAndUnitElements = function(selectedSeries, selectedUnit) {
    var hasSeries = typeof selectedSeries !== 'undefined',
        hasUnit = typeof selectedUnit !== 'undefined',
        hasBoth = hasSeries && hasUnit;
    if (hasSeries || hasUnit || hasBoth) {
      $('[data-for-series], [data-for-unit]').each(function() {
        var elementSeries = $(this).data('for-series'),
            elementUnit = $(this).data('for-unit'),
            seriesMatches = elementSeries === selectedSeries,
            unitMatches = elementUnit === selectedUnit;
        if ((hasSeries || hasBoth) && !seriesMatches && elementSeries !== '') {
          $(this).hide();
        }
        else if ((hasUnit || hasBoth) && !unitMatches && elementUnit !== '') {
          $(this).hide();
        }
        else {
          $(this).show();
        }
      });
    }
  }

  this.updateUnitElements = function(selectedUnit) {
    var hasUnit = typeof selectedUnit !== 'undefined';
    var fallback = this._model.measurementUnit;
    if (hasUnit || fallback) {
        var unitToDisplay = selectedUnit || fallback;
        $('.data-controlled-footer-field.unit-from-data').show();
        $('dd.data-controlled-footer-field.unit-from-data').text(translations.t(unitToDisplay));
    }
    else {
        $('.data-controlled-footer-field.unit-from-data').hide();
    }
  }

  this.updateTimeSeriesAttributes = function(tsAttributeValues) {
    var timeSeriesAttributes = {{ site.time_series_attributes | jsonify }};
    timeSeriesAttributes.forEach(function(tsAttribute) {
      var field = tsAttribute.field,
          valueMatch = tsAttributeValues.find(function(tsAttributeValue) {
            return tsAttributeValue.field === field;
          }),
          value = (valueMatch) ? valueMatch.value : '',
          $labelElement = $('dt[data-ts-attribute="' + field + '"]'),
          $valueElement = $('dd[data-ts-attribute="' + field + '"]');

      if (!value) {
        $labelElement.hide();
        $valueElement.hide();
      }
      else {
        $labelElement.show();
        $valueElement.show().text(translations.t(value));
      }
    });
  }

  this.updatePlot = function(chartInfo) {
    this.updateIndicatorDataViewStatus(view_obj._chartInstance.data.datasets, chartInfo.datasets);
    view_obj._chartInstance.data.datasets = chartInfo.datasets;
    view_obj._chartInstance.data.labels = chartInfo.labels;
    this.updateHeadlineColor(this.isHighContrast() ? 'high' : 'default', view_obj._chartInstance);

    if(chartInfo.selectedUnit) {
      view_obj._chartInstance.options.scales.yAxes[0].scaleLabel.labelString = translations.t(chartInfo.selectedUnit);
    }

    // Create a temp object to alter, and then apply. We go to all this trouble
    // to avoid completely replacing view_obj._chartInstance -- and instead we
    // just replace it's properties: "type", "data", and "options".
    var updatedConfig = {
      type: view_obj._chartInstance.type,
      data: view_obj._chartInstance.data,
      options: view_obj._chartInstance.options
    }
    this.alterChartConfig(updatedConfig, chartInfo);
    view_obj._chartInstance.type = updatedConfig.type;
    view_obj._chartInstance.data = updatedConfig.data;
    view_obj._chartInstance.options = updatedConfig.options;

    view_obj._chartInstance.update(1000, true);

    $(this._legendElement).html(view_obj._chartInstance.generateLegend());
    view_obj.updateChartDownloadButton(chartInfo.selectionsTable);
  };



  this.createPlot = function (chartInfo) {

    var that = this;
    var gridColor = that.getGridColor();
    var tickColor = that.getTickColor();

    var chartConfig = {
      type: this._model.graphType,
      data: chartInfo,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        spanGaps: true,
        scrollX: true,
        scrollCollapse: true,
        sScrollXInner: '150%',
        scales: {
          xAxes: [{
            maxBarThickness: 150,
            gridLines: {
              color: 'transparent',
              zeroLineColor: '#757575',
            },
            ticks: {
              fontColor: tickColor,
            },
            scaleLabel: {
              display: this._model.xAxisLabel ? true : false,
              labelString: this._model.xAxisLabel,
              fontColor: tickColor,
              fontSize: 14,
              fontFamily: "'Open Sans', Helvetica, Arial, sans-serif",
            }
          }],
          yAxes: [{
            gridLines: {
              color: gridColor,
              zeroLineColor: '#757575',
              drawBorder: false,
            },
            ticks: {
              suggestedMin: 0,
              fontColor: tickColor,
              callback: function(value) {
                return view_obj.alterDataDisplay(value, undefined, 'chart y-axis tick');
              },
            },
            scaleLabel: {
              display: this._model.selectedUnit ? translations.t(this._model.selectedUnit) : this._model.measurementUnit,
              labelString: this._model.selectedUnit ? translations.t(this._model.selectedUnit) : this._model.measurementUnit,
              fontColor: tickColor,
              fontSize: 14,
              fontFamily: "'Open Sans', Helvetica, Arial, sans-serif",
            }
          }]
        },
        legendCallback: function(chart) {
            var text = [];
            text.push('<h5 class="sr-only">' + translations.indicator.plot_legend_description + '</h5>');
            text.push('<ul id="legend" class="legend-for-' + chart.config.type + '-chart">');
            _.each(chart.data.datasets, function(dataset) {
              text.push('<li>');
              text.push('<span class="swatch' + (dataset.borderDash ? ' dashed' : '') + (dataset.headline ? ' headline' : '') + '" style="background-color: ' + dataset.borderColor + '">');
              text.push('<span class="swatch-inner" style="background-color: ' + dataset.borderColor + '"></span>');
              text.push('</span>');
              text.push(translations.t(dataset.label));
              text.push('</li>');
            });
            text.push('</ul>');
            return text.join('');
        },
        legend: {
          display: false
        },
        title: {
          display: false
        },
        plugins: {
          scaler: {}
        },
        tooltips: {
          backgroundColor: 'rgba(0,0,0,0.7)',
          callbacks: {
            label: function(tooltipItems, data) {
              return data.datasets[tooltipItems.datasetIndex].label + ': ' + view_obj.alterDataDisplay(tooltipItems.yLabel, data, 'chart tooltip');
            },
            afterBody: function() {
              var unit = view_obj._model.selectedUnit ? translations.t(view_obj._model.selectedUnit) : view_obj._model.measurementUnit;
              if (typeof unit !== 'undefined' && unit !== '') {
                return '\n' + translations.indicator.unit + ': ' + unit;
              }
            }
          }
        }
      }
    };
    this.alterChartConfig(chartConfig, chartInfo);
    if (this.isHighContrast()) {
      this.updateGraphAnnotationColors('high', chartConfig);
      this.updateHeadlineColor('high', chartConfig);
    }
    else {
      this.updateHeadlineColor('default', chartConfig);
    }

    this._chartInstance = new Chart($(this._rootElement).find('canvas'), chartConfig);

    window.addEventListener('contrastChange', function(e) {
      var gridColor = that.getGridColor(e.detail);
      var tickColor = that.getTickColor(e.detail);
      that.updateHeadlineColor(e.detail, view_obj._chartInstance);
      that.updateGraphAnnotationColors(e.detail, view_obj._chartInstance);
      view_obj._chartInstance.options.scales.yAxes[0].scaleLabel.fontColor = tickColor;
      view_obj._chartInstance.options.scales.yAxes[0].gridLines.color = gridColor;
      view_obj._chartInstance.options.scales.yAxes[0].ticks.fontColor = tickColor;
      view_obj._chartInstance.options.scales.xAxes[0].ticks.fontColor = tickColor;
      view_obj._chartInstance.update();
      $(view_obj._legendElement).html(view_obj._chartInstance.generateLegend());
    });

    Chart.pluginService.register({
      afterDraw: function(chart) {
        var $canvas = $(that._rootElement).find('canvas'),
        font = '12px Arial',
        canvas = $canvas.get(0),
        ctx = canvas.getContext("2d");

        ctx.font = font;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#6e6e6e';
      }
    });

    this.createDownloadButton(chartInfo.selectionsTable, 'Chart', chartInfo.indicatorId, '#chartSelectionDownload');
    this.createSourceButton(chartInfo.shortIndicatorId, '#chartSelectionDownload');
    this.createIndicatorDownloadButtons(chartInfo.indicatorDownloads, chartInfo.shortIndicatorId, '#chartSelectionDownload');

    $("#btnSave").click(function() {
      var filename = chartInfo.indicatorId + '.png',
          element = document.getElementById('chart-canvas'),
          height = element.clientHeight + 70,
          width = element.clientWidth + 50;
      var options = {
        // These options fix the height, width, and position.
        height: height,
        width: width,
        windowHeight: height,
        windowWidth: width,
        x: 0,
        y: 0,
        scrollX: 0,
        scrollY: 0,
        backgroundColor: view_obj.isHighContrast() ? '#000000' : '#FFFFFF',
        // Allow a chance to alter the screenshot's HTML.
        onclone: function (clone) {
          // Add a body class so that the screenshot style can be custom.
          clone.body.classList.add('image-download-in-progress');
        },
        // Decide which elements to skip.
        ignoreElements: function (el) {
          // Keep all style, head, and link elements.
          var keepTags = ['STYLE', 'HEAD', 'LINK'];
          if (keepTags.indexOf(el.tagName) !== -1) {
            return false;
          }
          // Keep all elements contained by (or containing) the screenshot
          // target element.
          if (element.contains(el) || el.contains(element)) {
            return false;
          }
          // Leave out everything else.
          return true;
        }
      };
      // First convert the target to a canvas.
      html2canvas(element, options).then(function (canvas) {
        // Then download that canvas as a PNG file.
        canvas.toBlob(function (blob) {
          saveAs(blob, filename);
        });
      });
    });

    $(this._legendElement).html(view_obj._chartInstance.generateLegend());
  };

  this.getHeadlineColor = function(contrast) {
    return this.isHighContrast(contrast) ? '{{ site.graph_color_headline_high_contrast | default: "#FFDD00" }}' : '{{ site.graph_color_headline | default: "#00006a" }}';
  }

  this.getGridColor = function(contrast) {
    return this.isHighContrast(contrast) ? '#222' : '#ddd';
  };

  this.getTickColor = function(contrast) {
    return this.isHighContrast(contrast) ? '#fff' : '#000';
  }

  this.isHighContrast = function(contrast) {
    if (contrast) {
      return contrast === 'high';
    }
    else {
      return $('body').hasClass('contrast-high');
    }
  };

  this.updateGraphAnnotationColors = function(contrast, chartInfo) {
    if (chartInfo.options.annotation) {
      chartInfo.options.annotation.annotations.forEach(function(annotation) {
        if (contrast === 'default') {
          $.extend(true, annotation, annotation.defaultContrast);
        }
        else if (contrast === 'high') {
          $.extend(true, annotation, annotation.highContrast);
        }
      });
    }
  };

  this.updateHeadlineColor = function(contrast, chartInfo) {
    if (chartInfo.data.datasets.length > 0) {
      var firstDataset = chartInfo.data.datasets[0];
      var isHeadline = (typeof firstDataset.disaggregation === 'undefined');
      if (isHeadline) {
        var newColor = this.getHeadlineColor(contrast);
        firstDataset.backgroundColor = newColor;
        firstDataset.borderColor = newColor;
        firstDataset.pointBackgroundColor = newColor;
        firstDataset.pointBorderColor = newColor;
      }
    }
  }

  this.toCsv = function (tableData) {
    var lines = [],
    headings = _.map(tableData.headings, function(heading) { return '"' + translations.t(heading) + '"'; });

    lines.push(headings.join(','));

    _.each(tableData.data, function (dataValues) {
      var line = [];

      _.each(headings, function (heading, index) {
        line.push(dataValues[index]);
      });

      lines.push(line.join(','));
    });

    return lines.join('\n');
  };

  var setDataTableWidth = function(table) {
    table.find('thead th').each(function() {
      var textLength = $(this).text().length;
      for(var loop = 0; loop < view_obj._tableColumnDefs.length; loop++) {
        var def = view_obj._tableColumnDefs[loop];
        if(textLength < def.maxCharCount) {
          if(!def.width) {
            $(this).css('white-space', 'nowrap');
          } else {
            $(this).css('width', def.width + 'px');
            $(this).data('width', def.width);
          }
          break;
        }
      }
    });

    table.removeAttr('style width');

    var totalWidth = 0;
    table.find('thead th').each(function() {
      if($(this).data('width')) {
        totalWidth += $(this).data('width');
      } else {
        totalWidth += $(this).width();
      }
    });

    // ascertain whether the table should be width 100% or explicit width:
    var containerWidth = table.closest('.dataTables_wrapper').width();

    if(totalWidth > containerWidth) {
      table.css('width', totalWidth + 'px');
    } else {
      table.css('width', '100%');
    }
  };

  var initialiseDataTable = function(el, info) {
    var nonYearColumns = [];
    for (var i = 1; i < info.table.headings.length; i++) {
      nonYearColumns.push(i);
    }
    var datatables_options = options.datatables_options || {
      paging: false,
      bInfo: false,
      bAutoWidth: false,
      searching: false,
      responsive: false,
      order: [[0, 'asc']],
      columnDefs: [
        {
          targets: nonYearColumns,
          createdCell: function(td, cellData, rowData, row, col) {
            $(td).text(view_obj.alterDataDisplay(cellData, rowData, 'table cell'));
          },
        },
      ],
    }, table = $(el).find('table');

    datatables_options.aaSorting = [];

    view_obj.alterTableConfig(datatables_options, info);
    table.DataTable(datatables_options);
    table.removeAttr('role');
    table.find('thead th').removeAttr('rowspan').removeAttr('colspan').removeAttr('aria-label');
    setDataTableWidth(table);
  };

  this.createSelectionsTable = function(chartInfo) {
    this.createTable(chartInfo.selectionsTable, chartInfo.indicatorId, '#selectionsTable', true);
    $('#tableSelectionDownload').empty();
    this.createTableTargetLines(chartInfo.graphAnnotations);
    this.createDownloadButton(chartInfo.selectionsTable, 'Table', chartInfo.indicatorId, '#tableSelectionDownload');
    this.createSourceButton(chartInfo.shortIndicatorId, '#tableSelectionDownload');
    this.createIndicatorDownloadButtons(chartInfo.indicatorDownloads, chartInfo.shortIndicatorId, '#tableSelectionDownload');
  };

  this.createTableTargetLines = function(graphAnnotations) {
    var targetLines = graphAnnotations.filter(function(a) { return a.preset === 'target_line'; });
    var $targetLines = $('#tableTargetLines');
    $targetLines.empty();
    targetLines.forEach(function(targetLine) {
      var targetLineLabel = targetLine.label.content;
      if (!targetLineLabel) {
        targetLineLabel = opensdg.annotationPresets.target_line.label.content;
      }
      $targetLines.append('<dt>' + targetLineLabel + '</dt><dd>' + targetLine.value + '</dd>');
    });
    if (targetLines.length === 0) {
      $targetLines.hide();
    }
    else {
      $targetLines.show();
    }
  }

  this.createDownloadButton = function(table, name, indicatorId, el) {
    if(window.Modernizr.blobconstructor) {
      var downloadKey = 'download_csv';
      if (name == 'Chart') {
        downloadKey = 'download_chart';
      }
      if (name == 'Table') {
        downloadKey = 'download_table';
      }
      var gaLabel = 'Download ' + name + ' CSV: ' + indicatorId.replace('indicator_', '');
      var tableCsv = this.toCsv(table);
      var fileName = indicatorId + '.csv';
      var downloadButton = $('<a />').text(translations.indicator[downloadKey])
        .attr(opensdg.autotrack('download_data_current', 'Downloads', 'Download CSV', gaLabel))
        .attr({
          'download': fileName,
          'title': translations.indicator.download_csv_title,
          'class': 'btn btn-primary btn-download',
          'tabindex': 0
        });
      var blob = new Blob([tableCsv], {
        type: 'text/csv'
      });
      if (window.navigator && window.navigator.msSaveBlob) {
        // Special behavior for IE.
        downloadButton.on('click.openSdgDownload', function(event) {
          window.navigator.msSaveBlob(blob, fileName);
        });
      }
      else {
        downloadButton
          .attr('href', URL.createObjectURL(blob))
          .data('csvdata', tableCsv);
      }
      if (name == 'Chart') {
        this._chartDownloadButton = downloadButton;
      }
      $(el).append(downloadButton);
    } else {
      var headlineId = indicatorId.replace('indicator', 'headline');
      var id = indicatorId.replace('indicator_', '');
      var gaLabel = 'Download Headline CSV: ' + id;
      $(el).append($('<a />').text(translations.indicator.download_headline)
      .attr(opensdg.autotrack('download_data_headline', 'Downloads', 'Download CSV', gaLabel))
      .attr({
        'href': opensdg.remoteDataBaseUrl + '/headline/' + id + '.csv',
        'download': headlineId + '.csv',
        'title': translations.indicator.download_headline_title,
        'class': 'btn btn-primary btn-download',
        'tabindex': 0
      }));
    }
  }

  this.updateChartDownloadButton = function(table) {
    if (typeof this._chartDownloadButton !== 'undefined') {
      var tableCsv = this.toCsv(table);
      var blob = new Blob([tableCsv], {
        type: 'text/csv'
      });
      var fileName = this._chartDownloadButton.attr('download');
      if (window.navigator && window.navigator.msSaveBlob) {
        // Special behavior for IE.
        this._chartDownloadButton.off('click.openSdgDownload')
        this._chartDownloadButton.on('click.openSdgDownload', function(event) {
          window.navigator.msSaveBlob(blob, fileName);
        });
      }
      else {
        this._chartDownloadButton
          .attr('href', URL.createObjectURL(blob))
          .data('csvdata', tableCsv);
      }
    }
  }

  this.updateIndicatorDataViewStatus = function(oldDatasets, newDatasets) {
    var status = '',
        hasData = newDatasets.length > 0,
        dataAdded = newDatasets.length > oldDatasets.length,
        dataRemoved = newDatasets.length < oldDatasets.length,
        getDatasetLabel = function(dataset) { return dataset.label; },
        oldLabels = oldDatasets.map(getDatasetLabel),
        newLabels = newDatasets.map(getDatasetLabel);

    if (!hasData) {
      status = translations.indicator.announce_data_not_available;
    }
    else if (dataAdded) {
      status = translations.indicator.announce_data_added;
      var addedLabels = [];
      newLabels.forEach(function(label) {
        if (!oldLabels.includes(label)) {
          addedLabels.push(label);
        }
      });
      status += ' ' + addedLabels.join(', ');
    }
    else if (dataRemoved) {
      status = translations.indicator.announce_data_removed;
      var removedLabels = [];
      oldLabels.forEach(function(label) {
        if (!newLabels.includes(label)) {
          removedLabels.push(label);
        }
      });
      status += ' ' + removedLabels.join(', ');
    }

    var current = $('#indicator-data-view-status').text();
    if (current != status) {
      $('#indicator-data-view-status').text(status);
    }
  }

  this.createSourceButton = function(indicatorId, el) {
    var gaLabel = 'Download Source CSV: ' + indicatorId;
    $(el).append($('<a />').text(translations.indicator.download_source)
    .attr(opensdg.autotrack('download_data_source', 'Downloads', 'Download CSV', gaLabel))
    .attr({
      'href': opensdg.remoteDataBaseUrl + '/data/' + indicatorId + '.csv',
      'download': indicatorId + '.csv',
      'title': translations.indicator.download_source_title,
      'class': 'btn btn-primary btn-download',
      'tabindex': 0
    }));
  }

  this.createIndicatorDownloadButtons = function(indicatorDownloads, indicatorId, el) {
    if (indicatorDownloads) {
      var buttonLabels = Object.keys(indicatorDownloads);
      for (var i = 0; i < buttonLabels.length; i++) {
        var buttonLabel = buttonLabels[i];
        var href = indicatorDownloads[buttonLabel].href;
        var buttonLabelTranslated = translations.t(buttonLabel);
        var gaLabel = buttonLabel + ': ' + indicatorId;
        $(el).append($('<a />').text(buttonLabelTranslated)
        .attr(opensdg.autotrack(buttonLabel, 'Downloads', buttonLabel, gaLabel))
        .attr({
          'href': opensdg.remoteDataBaseUrl + '/' + href,
          'download': href.split('/').pop(),
          'title': buttonLabelTranslated,
          'class': 'btn btn-primary btn-download',
          'tabindex': 0
        }));
      }
    }
  }

  this.tableHasData = function(table) {
    for (var i = 0; i < table.data.length; i++) {
      if (table.data[i].length > 1) {
        return true;
      }
    }
    return false;
  }

  this.createTable = function(table, indicatorId, el) {

    options = options || {};
    var that = this,
    table_class = options.table_class || 'table table-hover';

    // clear:
    $(el).html('');

    if(table && this.tableHasData(table)) {
      var currentTable = $('<table />').attr({
        'class': table_class,
        'width': '100%'
      });

      currentTable.append('<caption>' + that._model.chartTitle + '</caption>');

      var table_head = '<thead><tr>';

      var getHeading = function(heading, index) {
        var arrows = '<span class="sort"><i class="fa fa-sort-down"></i><i class="fa fa-sort-up"></i></span>';
        var button = '<span tabindex="0" role="button" aria-describedby="column-sort-info">' + translations.t(heading) + '</span>';
        return (!index) ? button + arrows : arrows + button;
      };

      table.headings.forEach(function (heading, index) {
        table_head += '<th' + (!index ? '': ' class="table-value"') + ' scope="col">' + getHeading(heading, index) + '</th>';
      });

      table_head += '</tr></thead>';
      currentTable.append(table_head);
      currentTable.append('<tbody></tbody>');

      table.data.forEach(function (data) {
        var row_html = '<tr>';
        table.headings.forEach(function (heading, index) {
          // For accessibility set the Year column to a "row" scope th.
          var isYear = (index == 0);
          var cell_prefix = (isYear) ? '<th scope="row"' : '<td';
          var cell_suffix = (isYear) ? '</th>' : '</td>';
          row_html += cell_prefix + (isYear ? '' : ' class="table-value"') + '>' + (data[index] !== null && data[index] !== undefined ? data[index] : '-') + cell_suffix;
        });
        row_html += '</tr>';
        currentTable.find('tbody').append(row_html);
      });

      $(el).append(currentTable);

      // initialise data table and provide some info for alterations.
      var alterationInfo = {
        table: table,
        indicatorId: indicatorId,
      };
      initialiseDataTable(el, alterationInfo);

      $(el).removeClass('table-has-no-data');
      $('#selectionTableFooter').show();

      $(el).find('th')
        .removeAttr('tabindex')
        .click(function() {
          var sortDirection = $(this).attr('aria-sort');
          $(this).find('span[role="button"]').attr('aria-sort', sortDirection);
        });
    } else {
      $(el).append($('<h3 />').text(translations.indicator.data_not_available));
      $(el).addClass('table-has-no-data');
      $('#selectionTableFooter').hide();
    }
  };

  this.sortFieldGroup = function(fieldGroupElement) {
    var sortLabels = function(a, b) {
      var aObj = { hasData: $(a).attr('data-has-data'), text: $(a).text() };
      var bObj = { hasData: $(b).attr('data-has-data'), text: $(b).text() };
      if (aObj.hasData == bObj.hasData) {
        return (aObj.text > bObj.text) ? 1 : -1;
      }
      return (aObj.hasData < bObj.hasData) ? 1 : -1;
    };
    fieldGroupElement.find('label')
    .sort(sortLabels)
    .appendTo(fieldGroupElement.find('#indicatorData .variable-options'));
  }
};
