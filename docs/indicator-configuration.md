In your [data repository](glossary.md#data-repository) the indicator configuration is maintained on an indicator-by-indicator basis. This indicator configuration contains set fields, which have specific uses in Open SDG. This page details those fields.

## Note about indicator configuration file formats

By default, Open SDG platforms expect the individual indicator configuration files to be uploaded in YML format to the "indicator-config" folder. See this [example in the data starter repo](https://github.com/open-sdg/open-sdg-data-starter/blob/develop/indicator-config/1-1-1.yml)

### Indicator configuration forms
To help with configuring indicators, you can optionally enable user-friendly indicator configuration forms, which will allow you to fill in a form and then download a YML file which will be ready to upload to your platform.

For more details on how to enable these forms, see the [indicator_config_form site configuration setting](configuration.md#indicator_config_form).

## Note about translation keys
Indicator configuration values can either be filled in with normal text ("My field value") or with [translation keys](glossary.md#translation-keys) (my_translations.my_translation). In the examples below, we will try to demonstrate both possibilities.

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

## Indicator configuration fields

### composite_breakdown_label

**_Optional_** This setting is used when importing data from SDMX to specify a more useful label for the COMPOSITE_BREAKDOWN column (if present). Translation keys are supported, as always. Using the example below would change the COMPOSITE_BREAKDOWN label to "Hazard type" for this indicator:

```nohighlight
composite_breakdown_label: Hazard type
```

### computation_units

**_Recommended_**: This setting is used to specify the unit used in the headline data for the indicator. It will display below the graph and table, on the graph y-axis, and on the graph tooltips on the indicator page.

```nohighlight
computation_units: Metric tons
```

With translation key:

```nohighlight
computation_units: my_translations.metric_tons
```

### copyright

**_Optional_**: This setting can be used to display copyright information below the graph and table on the indicator page.

```nohighlight
copyright: Copyright 2019 - My organisation
```

With translation key:

```nohighlight
copyright: my_translations.copyright_message
```

### data_footnote

**_Optional_**: This setting can be used to display additional inforamtion about the data below the graph and table on the indicator page.


```nohighlight
data_footnote: My additional information
```

With translation key:

```nohighlight
data_footnote: my_translations.1-1-1-footnote
```


### data_not_statistical

**_Required_**: This setting is used to specify whether the indicator is statistical (can be charted/graphed) or not. If you have uploaded data that you want to display on a chart/table for an indicator, set this to `false`.

```nohighlight
data_non_statistical: false
```

### Data notices

You may want to display some very important information which site viewers must keep in mind when using the data provided. To display a notice above the graph in a coloured box, you can use the following fields within the metadata file.

### data_notice_class

**_Optional_**: This setting can be used to set the colour of a data notice using CSS classes.

```nohighlight
standalone: success
```

Options out-of-the-box are:
* success (green)
* warning (amber)
* danger (red)

### data_notice_heading

**_Optional_**: This setting can be used to set the title of a data notice.

```nohighlight
data_notice_heading: Important Note
```

With translation key:

```nohighlight
data_notice_heading: my_translations.important_note
```

### data_notice_text

**_Optional_**: This setting can be used to set the text to display within a data notice.

```nohighlight
data_notice_text: My note text
```

With translation key:

```nohighlight
data_notice_text: my_translations.1-1-1-data-notice
```

### data_show_map

**_Optional_** This setting can be used to specify whether or not to display a map for the indicator, if you have configured maps. See the [Maps guidance](maps.md) for more information on how to configure maps.

```nohighlight
data_show_map: true
```

### data_start_values

**_Optional_**: This setting is used to specify if you would like an indicator load with certain disaggregation values already selected. Using the example below, the indicator would load with both "Females" and "15 to 19" selected.

```nohighlight
data_start_values:
  - field: Sex
    value: Females
  - field: Age
    value: 15 to 19
```

### Embedded feature settings

You may want to add an additional feature which isn't created from data, such as an iframe. You can create an extra tab to display this feature by adding the following fields to the metadata file. You can either specify a URL (use `embedded_feature_url`) or some HTML (use `embedded_feature_html`) for the feature you want to embed.

### embedded_feature_footer

**_Recommended_** (if using embedded feature): This setting can be used to specify information about an embedded feature which displays below embed.

```nohighlight
embedded_feature_footer: This graph is provided by "My Organisation"
```

### embedded_feature_html

**_Required_** (if not using embedded_feature_url when using embedded feature): This setting can be used to specify HTML code of the feature that you want to embed. You may use this when you don't have control of the original feature that you want to embed, and so need to make some changes e.g. to the size, title, or other attributes.

```nohighlight
embedded_feature_html: <iframe width="1110" height="700" title="Childhood Vaccination Coverage Statistics" src="https://app.powerbi.com/view?r=eyJrIjoiZTI3NWZhNzItMTIyZS00OWM2LTg0MzMtOGY5YTJjMGY0MjI1IiwidCI6IjUwZjYwNzFmLWJiZmUtNDAxYS04ODAzLTY3Mzc0OGU2MjllMiIsImMiOjh9&pageName=ReportSection" frameborder="0" allowFullScreen="true"></iframe>
```

### embedded_feature_tab_title

**_Required_** (if using embedded feature): This setting can be used to specify the text that will display on the tab which your embedded feature will display within.

```nohighlight
embedded_feature_tab_title: Embedded Chart
```

### embedded_feature_title

**_Recommended_** (if using embedded feature): This setting can be used to specify the title to be shown above the embedded feature

```nohighlight
embedded_feature_title: My embedded chart
```

### embedded_feature_url

**_Required_** (if not using embedded_feature_html when using embedded feature): This setting can be used to specify the the URL of feature that you want to embed. You may use this when you have control over the original feature that you want to embed, and don't need to make any changes e.g. if the feature is already the correct size.

```nohighlight
embedded_feature_url: http://example.com/embed-1-1-1.html
```

### expected_disaggregations

**_Optional_**: This setting is used to supply metrics to the disaggregation status report (see the [reporting_status site configuration](configuration.md#reporting_status)). It should contain a list of the disaggregations (i.e. columns in the CSV file) that the indicator should have.

```nohighlight
expected_disaggregations:
  - Age
  - Sex
```

The following fields affect the display of graphs. Currently only longitudinal graphs are available but more are planned. These fields are experimental. Graph fields do not show up on the web page as metadata; we will use them in the future for setting how a graphic should render, some extra labels etc.

### graph_annotations

**_Optional_**: This setting can be used to add line annotations to the graph, such as target lines to show the progress towards the 2030 goal for an indicator. Like `graph_titles` it can include multiple annotations, and limited to particular units or series. Each item can have the following settings:
    
    * `series`: If specified, the annotation will only display when the user is looking at this series.
    * `unit`: If specified, the annotation will only display when the user is looking at this unit of measurement.
    * `value`: Used for line annotations. The value at which to draw the line. For horizontal lines, this number corresponds to your actual data. For vertical lines, this number should be between 0 (the left side of the chart) and the number of years minus 1 (the right side of the chart). See [Chart.js documentation](https://github.com/chartjs/chartjs-plugin-annotation/blob/master/README.md) for details.
    * `endValue`: Used for line annotations. Optional value at which the line ends. See [Chart.js documentation](https://github.com/chartjs/chartjs-plugin-annotation/blob/master/README.md) for details.
    * `description`: Either a string or function returning a description of the annotation. This is necessary for accessibility, as the description is read by screenreaders. The description does not appear visually on the page.
    * `mode`: Can be "vertical" or "horizontal". See [Chart.js documentation](https://github.com/chartjs/chartjs-plugin-annotation/blob/master/README.md) for details.
    * `borderColor`: The color of the line/box. See [Chart.js documentation](https://github.com/chartjs/chartjs-plugin-annotation/blob/master/README.md) for details.
    * `borderDash`: The type of dashes for a line. See [Chart.js documentation](https://github.com/chartjs/chartjs-plugin-annotation/blob/master/README.md) for details.
    * `label`: Additional settings for controlling the label:
        * `position`: Can be "top", "bottom", "left", "right", or "center". See [Chart.js documentation](https://github.com/chartjs/chartjs-plugin-annotation/blob/master/README.md) for details.
        * `content`: The text of the label (can be a translation key). See [Chart.js documentation](https://github.com/chartjs/chartjs-plugin-annotation/blob/master/README.md) for details.
        * `fontColor`: The color of the label text. See [Chart.js documentation](https://github.com/chartjs/chartjs-plugin-annotation/blob/master/README.md) for details.
        * `backgroundColor`: The background color of the label text. See [Chart.js documentation](https://github.com/chartjs/chartjs-plugin-annotation/blob/master/README.md) for details.
    * `highContrast`: Overrides of the color-related settings described above (`borderColor`, and the label's `fontColor` and `backgroundColor`) for when the user is in high-contrast mode. For examples see [the javascript file containing presets](https://github.com/open-sdg/open-sdg/blob/master/_includes/components/charts/annotation_presets.js).
    * `preset`: A "preset" is a pre-bundled set of configurations. The only available preset is `target_line`. For examples see [the javascript file containing presets](https://github.com/open-sdg/open-sdg/blob/master/_includes/components/charts/annotation_presets.js). Note that you can use a preset and also override any of that preset's individual settings.

This is an example of using annotations

 ```nohighlight
graph_annotations:
  - unit: tons
    value: 19
    borderColor: red
  - unit: passengers
    value: 1900
    borderColor: red
```  

This is an example of using the `target_line` preset:

 ```nohighlight
graph_annotations:
  - unit: tons
    value: 19
    preset: target_line
  - unit: passengers
    value: 1900
    preset: target_line
```

### graph_limits

**_Optional_**: This setting can be used to control the lowest/highest values to be shown on the y-axis by specifying min/max limits. Optionally they can refer to a specific unit of measurement or series. Note that this involves a slightly more complex metadata structure.

```nohighlight
graph_limits:
  - unit: tons
    minimum: 2
    maximimum: 20
  - unit: passengers
    minimum: 200
    maximum: 2000
```

### graph_stacked_disaggregation

**_Optional_**: This setting can be used with the "bar" graph type to place a certain disaggregation (such as "Age") into the same "stacked" bars.
        
```nohighlight
graph_stacked_disaggregation: Age
```

### graph_title

**_Required_** (for statistical indicators): This setting is used to specify the title that displays above the graph/chart. This can be simple text (or a translation key) if you would like the chart title to be the same for all units of measurement.

```nohighlight
graph_title: My graph title for 1.1.1
```

With translation key:

```nohighlight
graph_title: my_translations.1-1-1-graph_title
```

### graph_titles

**_Required_** (for statistical indicators): This setting is used if you would like the chart title to depend on the user-selected unit of measurement. It has a more complex structure than `graph_title` (*singular*)

```nohighlight
graph_titles:
          - unit: Percent
            title: My title for percentages
          - unit: Total
            title: My alternate title for totals
```

  Note: To use the currently-selected series as the chart title (where possible), set the site configuration option [graph_title_from_series](configuration.md#graph_title_from_series) to `true`.
  
### graph_type

**_Required_** (for statistical indicators): This setting is used to specify what type of graph to use for the indicator. [More information about charts here](charts.md).

```nohighlight
graph_type: line
```

Options out-of-the-box are:
* line
* bar
* binary (Yes/No graph)


### indicator_available

**_Recommended_**: This setting is intended for use when the global indicator name might not accurately describe the available national/regional statistics. It should provide an alternate name for the indicator. If specified it will display just below the indicator banner.

```nohighlight
indicator_available: A more suitable name for the data that is provided
```

### indicator_name

**_Required_**: This setting is used to specify the name of the indicator, which displays at the top of the indicator page.

```nohighlight
indicator_name: Proportion of population living below the national poverty line, by sex and age
```

With translation key:

```nohighlight
indicator_name: global_indicators.1-2-1-title
```

### indicator_number

**_Required_**: This setting is used to specify the number (or "id") for the indicator.

```nohighlight
indicator_number: 1.2.1
```

### national_geographical_coverage

**_Required_** (for statistical indicators): This setting is used to specify what label should be used in the absence of any disaggregation (i.e. for headline data)

```nohighlight
national_geographical_coverage: Australia
```

With translation key:

```nohighlight
national_geographical_coverage: my_translations.australia
```

### page_content

**_Optional_**: This setting can be use to add content (e.g. tables, lists, links, headings, etc.) above the graph near the top of the screen. This is a useful place to add information about an indicator that doesn't fit in with the rest of the metadata.

See this [guide to writing Markdown](https://guides.github.com/features/mastering-markdown/).

```nohighlight
page_content: My additional information about the indicator
```

### permalink

**_Optional_**: This setting can be used to control the URL of a standalone indicator. This does not require any preceding/trailing slashes. See the `standalone` metadata field below for information on how to set an indicator as standalone.

```nohighlight
permalink: my-custom-indicator-path
```

### precision

**_Optional_**: This setting is used to force a particular number of decimal places. 

Note: Normally trailing zeroes are removed from decimals before being displayed. For example, "23.60" will be displayed as "23.6".

The example below could be used to force "23.60" to actually display as "23.60". Along the same lines, "23" would display as "23.00".

```nohighlight
precision:
  - decimals: 2
```

You can also specify multiple precisions, and each one can apply to a particular unit and/or series. Here is an example if you want to force a precision of 2 on "percentage" units, and a precision of 1 on "total" units:

```nohighlight
precision:
  - unit: percentage
    decimals: 2
  - unit: total
    decimals: 1
```

### reporting_status

**_Required_**: This setting is used to specify the status of the indicator. This feeds into the reporting status page and also displays on the goal pages.

```nohighlight
reporting_status: complete
```

Options out-of-the-box are:
* complete
* inprogress
* notstarted
* notapplicable



### sort

**_Optional_**: This setting can be used to override this automatic ordering for a particular indicator by setting `sort` in the metadata for that indicator.

The order in which indicators are displayed in lists is determined behind the scenes, according to the indicator number. This is done by automatically converting the indicator number to a string which sorts correctly when alphabetized. (For example, indicator 1.2.1 gets sorted as '010201'.) The example below shows how this setting could be used to make 1.2.1 appear at the end of goal 1, target 2.

```nohighlight
sort: 0102zz
```

### standalone

**_Optional_**: This setting can be used to set the indicator as `standalone` which will prevent it from appearing as part of a goal, and keeps the indicator off the reporting status, disaggregation status, and other disaggregation reports. It is useful if you would like to post statistical indicators that are not part of the SDGs (such as Covid-19 data).

```nohighlight
standalone: true
```

In this case you may also want to control the URL of the indicator. You can do this with the `permalink` metadata field (see above).

### tags

**_Optional_**: This setting is used to supply a list of "tags" to display under the indicator when it is listed on its goal page

```nohighlight
tags:
  - My tag
  - My other tag
```
