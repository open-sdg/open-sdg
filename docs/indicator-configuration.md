In your [data repository](glossary.md#data-repository) the indicator configuration is maintained on an indicator-by-indicator basis. This indicator configuration contains set fields, which have specific uses in Open SDG. This page details those fields.

By default, Open SDG platforms expect the individual indicator configuration files to be uploaded in YML format to the "indicator-config" folder. See this [example in the data starter repo](https://github.com/open-sdg/open-sdg-data-starter/blob/develop/indicator-config/1-1-1.yml)

## Indicator configuration forms
To help with configuring indicators, you can optionally enable user-friendly indicator configuration forms, which will allow you to fill in a form and then download a YML file which will be ready to upload to your platform.

For more details on how to enable these forms, see the [indicator_config_form site configuration setting](configuration.md#indicator_config_form).

## Note about translation keys
Indicator configuration values can either be filled in with normal text ("My field value") or with [translation keys](glossary.md#translation-keys) (my_translations.my_translation). In the examples below, we will try to demonstrate both possibilities.

As an optional shorthand, if the translation key is in the `data` group, then the group can be omitted. For example, the translation key `data.female` can be written as simply `female`.

## Note about unit-specific and series-specific settings

Several indicator configuration settings can be limited to a particular Unit and/or Series. For example, the `graph_titles` setting can be configured like this:

```
graph_titles:
  - unit: Percent
    title: My title for percent
  - unit: Total
    title: My title for total
```

Indicator setting for a specific Series-Unit combination can be configured like this:

```
graph_titles:
  - series: Wastewater treated
    unit: Percent
    title: My title for percent of wastewater treated
```

In addition to graph_titles, the other fields like this include:

* graph_annotations
* graph_limits
* precision

These fields are described below. Note that if a unit/series is not specified, then the item will apply to any unit/series. For example:

```
graph_titles:
  - series: SERIES123
    title: This title will appear for SERIES123 only
  - series: ''
    title: This title will appear for all other series
```

## Mandatory fields

The following fields are required on all indicators:

* `data_non_statistical` - whether the indicator is statistical (can be charted/graphed) or not. Examples:
    * true (if non-statistical)
    * false (if statistical)
* `indicator_name` - the name for the indicator, which displays at the top of the indicator page. Examples:
    * Proportion of population living below the national poverty line, by sex and age
    * global_indicators.1-2-1-title
* `indicator_number` - the number (or "id") for the indicator. Examples:
    * 1.1.1
    * 1.2.1
* `reporting_status` - the status of the indicator. Examples:
    * complete
    * notstarted

## Mandatory for statistical indicators

If the indicator is going to display a graph, the following fields are required:

* `graph_title` - the title that displays above the graph/chart. This can be simple text (or a translation key) if you would like the chart title to be the same for all units of measurement. Examples:
    * My graph title for 1.1.1
    * my_translations.1-1-1-graph_title
* `graph_titles` - However if you would like the chart title to depend on the user-selected unit of measurement, then you can use `graph_titles` (*plural*) with a more complex structure:

        graph_titles:
          - unit: Percent
            title: My title for percentages
          - unit: Total
            title: My alternate title for totals
  Note: To use the currently-selected series as the chart title (where possible), set the site configuration option [graph_title_from_series](configuration.md#graph_title_from_series) to `true`.

* `graph_type` - what type of graph to use for the indicator. [More information here](charts.md). Examples:
    * line
    * bar
    * binary
* `national_geographical_coverage` - a label used in the absence of any disaggregation. Examples:
    * Australia
    * my_translations.australia

## Recommended special fields

The following fields are not strictly required, but are recommended because they serve special purposes:

* `indicator_available` - an alternate name for the indicator, intended for when the global indicator name might not accurately describe the available national/regional statistics
* `computation_units` - the unit used in the headline series for this indicator. Examples:
    * Metric tons
    * my_translations.metric_tons
* `expected_disaggregations` - a list of the disaggregations (ie, columns in the CSV file) that this indicator should have. Setting this value will supply metrics to the disaggregation status report (see the [reporting_status site configuration](configuration.md#reporting_status)). Here is an example for an indicator that should have disaggregation for "Age" and "Sex":

        expected_disaggregations:
          - Age
          - Sex

* `tags` - an optional list of "tags" to display under an indicator when it is listed on its goal page. Unlike most other fields, the `tags` field should be a list. Here is an example of what it might look like, in YAML form:

        tags:
          - My tag
          - My other tag

## Starting values

If you would like an indicator load with certain disaggregation values already selected, you can use the `data_start_values` field. For example by setting this in the metadata for an indicator...

```
data_start_values:
  - field: Fruit
    value: Apples
  - field: Grade
    value: A
```

...Open SDG will start with both "Apples" and "A" selected, instead of "Oranges".

## Composite Breakdown label

When importing data from SDMX it is common for disaggregations to be in COMPOSITE_BREAKDOWN. This is not particularly informative to the user, so it is possible to specify a more useful label for this particular data column. Whatever is specified here will be used as a label for the COMPOSITE_BREAKDOWN column, if it appears in the indicator data. Translation keys are supported, as always.

The example below would change the COMPOSITE_BREAKDOWN label to "Hazard type" for this indicator:

```nohighlight
composite_breakdown_label: Hazard type
```

## Graph Metadata

The following fields affect the display of graphs. Currently only longitudinal graphs are available but more are planned. These fields are experimental. Graph fields do not show up on the web page as metadata; we will use them in the future for setting how a graphic should render, some extra labels etc.

* `graph_limits` - a list of min/max limits controlling the lowest/highest values to be shown on the y-axis. Optionally they can refer to a specific unit of measurement. Note that this involves a slightly more complex metadata structure.

        graph_limits:
          - unit: tons
            minimum: 2
            maximimum: 20
          - unit: passengers
            minimum: 200
            maximum: 2000

* `graph_stacked_disaggregation` - this can be used with the "bar" graph type to place a certain disaggregation (such as "Age") into the same "stacked" bars. For example:

        graph_stacked_disaggregation: Age

* `graph_annotations` - this can be used to add line annotations to the graph, such as target lines to show the progress towards the 2030 goal for an indicator. Like `graph_titles` it can include multiple annotations, and limited to particular units or series. Each item can have the following settings:

    * `preset`: A "preset" is a pre-bundled set of configurations. The only available preset is `target_line`. For examples see [the javascript file containing presets](https://github.com/open-sdg/open-sdg/blob/master/_includes/components/charts/annotation_presets.js). Note that you can use a preset and also override any of that preset's individual settings.
    * `description`: Either a string or function returning a description of the annotation. This is necessary for accessibility, as the description is read by screenreaders. The description does not appear visually on the page.
    * `unit`: If specified, the annotation will only display when the user is looking at this unit of measurement.
    * `series`: If specified, the annotation will only display when the user is looking at this series.
    * `mode`: Can be "vertical" or "horizontal". See [Chart.js documentation](https://github.com/chartjs/chartjs-plugin-annotation/blob/master/README.md) for details.
    * `borderColor`: The color of the line/box. See [Chart.js documentation](https://github.com/chartjs/chartjs-plugin-annotation/blob/master/README.md) for details.
    * `borderDash`: The type of dashes for a line. See [Chart.js documentation](https://github.com/chartjs/chartjs-plugin-annotation/blob/master/README.md) for details.
    * `value`: Used for line annotations. The value at which to draw the line. For horizontal lines, this number corresponds to your actual data. For vertical lines, this number should be between 0 (the left side of the chart) and the number of years minus 1 (the right side of the chart). See [Chart.js documentation](https://github.com/chartjs/chartjs-plugin-annotation/blob/master/README.md) for details.
    * `endValue`: Used for line annotations. Optional value at which the line ends. See [Chart.js documentation](https://github.com/chartjs/chartjs-plugin-annotation/blob/master/README.md) for details.
    * `label`: Additional settings for controlling the label:
        * `position`: Can be "top", "bottom", "left", "right", or "center". See [Chart.js documentation](https://github.com/chartjs/chartjs-plugin-annotation/blob/master/README.md) for details.
        * `content`: The text of the label (can be a translation key). See [Chart.js documentation](https://github.com/chartjs/chartjs-plugin-annotation/blob/master/README.md) for details.
        * `fontColor`: The color of the label text. See [Chart.js documentation](https://github.com/chartjs/chartjs-plugin-annotation/blob/master/README.md) for details.
        * `backgroundColor`: The background color of the label text. See [Chart.js documentation](https://github.com/chartjs/chartjs-plugin-annotation/blob/master/README.md) for details.
    * `highContrast`: Overrides of the color-related settings described above (`borderColor`, and the label's `fontColor` and `backgroundColor`) for when the user is in high-contrast mode. For examples see [the javascript file containing presets](https://github.com/open-sdg/open-sdg/blob/master/_includes/components/charts/annotation_presets.js).

    Here is an example of using annotations:

        graph_annotations:
          - unit: tons
            value: 19
            borderColor: red
          - unit: passengers
            value: 1900
            borderColor: red

    Here is an example of using the `target_line` preset:

        graph_annotations:
          - unit: tons
            value: 19
            preset: target_line
          - unit: passengers
            value: 1900
            preset: target_line

* `graph_title` - mentioned above
* `graph_type` - mentioned above

## Precision

Normally trailing zeroes are removed from decimals before being displayed. For example, "23.60" will be displayed as "23.6". If you would like to force a particular number of decimal places, you can use the `precision` field. The following would force values to have 2 decimals places:

```
precision:
  - decimals: 2
```

For example, with the configuration above, "23.60" would actually display as "23.60". Along the same lines, "23" would display as "23.00".

You can also specify multiple precisions, and each one can apply to a particular unit and/or series. Here is an example if you want to force a precision of 2 on "percentage" units, and a precision of 1 on "total" units:

```
precision:
  - unit: percentage
    decimals: 2
  - unit: total
    decimals: 1
```

## Footer

The following fields will appear on indicator pages below the graph and the table.

* `computation_units` - mentioned above
* `copyright` - information about the copyright. Examples:
    * Copyright 2019 - My organisation
    * my_translations.copyright_message
* `data_footnote` - additional information on the data. Examples:
    * My additional information
    * my_translations.1-1-1-footnote
* `national_geographical_coverage` - mentioned above

## Display map

If you have configured maps using the [Maps guidance](maps.md), you can configure individual indicator maps.

* `data_show_map` - whether or not to display a map for the indicator. Examples:
    * true (to show map)
    * false (to not show map)

## Embedded Feature Metadata

You may want to add an additional feature which isn't created from data, such as an iframe. You can create an extra tab to display this feature by adding the following fields to the metadata file.

* `embedded_feature_footer` - information about the embedded feature which displays below embed. Examples:
    * This graph provided by "My Organisation"
    * my_translations.info_about_my_organisation
* `embedded_feature_tab_title` - tab title. Examples:
    * Embedded Chart
    * my_translations.embedded_chart
* `embedded_feature_title` - the title to be shown above the embedded feature. Examples:
    * My embedded chart
    * my_translatins.1-1-1-embedded-chart

You can either specify a URL or some HTML for the feature you want to embed:

* `embedded_feature_url` - the URL of feature that you want to embed. You may use this when you have control over the original feature that you want to embed, and don't need to make any changes e.g. if the feature is already the correct size. Examples:
    * http://example.com/embed-1-1-1.html
* `embedded_feature_html` - HTML code of the feature that you want to embed. You may use this when you don't have control of the original feature that you want to embed, and so need to make some changes e.g. to the size, title, or other attributes. Example:
    * `<iframe width="1110" height="700" title="Childhood Vaccination Coverage Statistics" src="https://app.powerbi.com/view?r=eyJrIjoiZTI3NWZhNzItMTIyZS00OWM2LTg0MzMtOGY5YTJjMGY0MjI1IiwidCI6IjUwZjYwNzFmLWJiZmUtNDAxYS04ODAzLTY3Mzc0OGU2MjllMiIsImMiOjh9&pageName=ReportSection" frameborder="0" allowFullScreen="true"></iframe>`

## Page content

You may want to add content (e.g. tables, lists, links, headings, etc.) above the graph near the top of the screen. This is a useful place to add information about an indicator that doesn't fit in with the rest of the metadata.

* `page_content` - content to show above the graph near the top of the screen

See this [guide to writing Markdown](https://guides.github.com/features/mastering-markdown/).

## Data Notice

You may want to display some very important information which site viewers must keep in mind when using the data provided. To display a notice above the graph in a coloured box, you can use the following fields within the metadata file.

* `data_notice_heading` - title of data notice. Examples:
    * Important Note
    * my_translations.important_note
* `data_notice_text` - text you want to display within the notice. Examples:
    * My note text
    * my_translations.1-1-1-data-notice
* `data_notice_class` - a CSS class to set on the notice. Examples:
    * success (green)
    * warning (amber)
    * danger (red)

## Standalone indicators

If you would like to post statistical indicators that are not part of the SDGs (such as Covid-19 data) then you can set the indicators to be `standalone`. This prevents the indicator from appearing as part of a goal, and keeps the indicator off the reporting status, disaggregation status, and other disaggregation reports.

In this case you may also want to control the URL of the indicator. You can do this with the `permalink` metadata field. This does not require any preceding/trailing slashes.

Here is an example of using `standalone` and `permalink` in a YAML metadata structure:

```
standalone: true
permalink: my-custom-indicator-path
```

## Sorting in lists

The order in which indicators are displayed in lists is determined behind the scenes, according to the indicator number. This is done by automatically converting the indicator number to a string which sorts correctly when alphabetized. (For example, indicator 1.2.1 gets sorted as '010201'.) However you can override this automatic ordering for a particular indicator by setting `sort` in the metadata for that indicator. For example:

```
# Ensure this indicator appears at the end of goal 1, target 2.
sort: 0102zz
```
