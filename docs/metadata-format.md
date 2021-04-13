<h1>Metadata format</h1>

In your [data repository](glossary.md#data-repository) the metadata is maintained on an indicator-by-indicator basis. This metadata can include any number of custom fields, as defined in a [schema file](https://github.com/open-sdg/open-sdg-data-starter/blob/develop/_prose.yml) (see the "Schema" section below) in your data repository. Some fields, however, are mandatory and/or have specific uses in Open SDG. This page details those fields.

## Note about translation keys

Metadata values can either be filled in with normal text ("My field value") or with [translation keys](glossary.md#translation-keys) (my_translations.my_translation). In the examples below, we will try to demonstrate both possibilities.

As an optional shorthand, if the translation key is in the `data` group, then the group can be omitted. For example, the translation key `data.female` can be written as simply `female`.

## Note about unit-specific and series-specific settings

Several indicator settings can be limited to a particular Unit and/or Series. For example, the `graph_titles` setting can be configured like this:

```
graph_titles:
  - unit: Percent
    title: My title for percent
  - unit: Total
    title: My title for total
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

* `source_active_1` - whether source #1 should be displayed. Examples:
    true
    false
* `source_organisation_1` - the name of the source #1 organisation. Examples:
    * My organisation name
    my_translations.my_organisation
* `source_url_1` - the URL of the source #1 website. Examples:
    * http://example.com
* `source_url_text_1` - the text to display as the link to the source #1 website. Examples:
    * Click here for my organisation's website
    * my_translations.click_here
* `un_designated_tier` - the "tier" for this indicator. Examples:
    * 1
    * 2
* `un_custodian_agency` - the custodian agency for this indicator. Examples:
    * World Bank
* `goal_meta_link` - URL of the official UN metadata for this indicator. Examples:
    * https://unstats.un.org/sdgs/metadata/files/Metadata-01-01-01a.pdf
* `goal_meta_link_text` - the text to display as the link to the official UN metadata for this indicator. Examples:
    * United Nations Sustainable Development Goals Metadata (pdf 894kB)
* `tags` - an optional list of "tags" to display under an indicator when it is listed on its goal page. Unlike most other fields, the `tags` field should be a list. Here is an example of what it might look like, in YAML form:

        tags:
          - My tag
          - My other tag

## Data Sources Metadata

Metadata about "data sources" must follow a special format. The keys for the metadata fields must start with `source_` and end with a `_#`, where "#" is number like 1, 2, 3, etc. For example:
* source_organisation_1
* source_contact_1
* source_organisation_2
* source_contact_2
* etc.

In this way, all of the source fields ending in "_1" refer to source #1. And all the source fields ending in "_2" refer to source #2, etc.

### Caution about URLs

Especially long sequences of characters, like those in a long URL, can cause formatting issues on webpages. It is recommended that particularly long URLs be included as links, instead of as plain text. For example:

Good:

`[This is a link to a long URL](https://example.com/abc/def/ghi/jkl/mno/pqr/stu?vwxyz=foo&bar=1234567890)`

Avoid:

`This a long plain-text URL: https://example.com/abc/def/ghi/jkl/mno/pqr/stu?vwxyz=foo&bar=1234567890`

## Data Info

Some of the metadata are not intended to be displayed on the site. These are put into a "scope" called "data" in the `_prose.yml` file. For example, see the [`data_non_statistical` field](https://github.com/open-sdg/open-sdg-data-starter/blob/develop/_prose.yml#L205).

Use this method to hide any fields needed, by putting them into the "data" scope.

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

* `graph_limits` - a list of min/max limits controlling the lowest/highest values to be shown on the y-axis. Optionally they can refer to a specific unit of measurement. Note that this involves a slightly more complex metadata structure. If using Prose.io, this will need to be set under "Raw Metadata". For example:

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

## Non-Standard Information

In the Prose editor, you can add free Markdown text in the same file as the metadata. This is the `edit` section in prose and is part of the metadata. In the raw .md file this is the content underneath the yaml header. You can add any content you like in this section and the content will be converted to html and placed above the graph near the top of the screen.

A guide to writing [Markdown is here](https://guides.github.com/features/mastering-markdown/) and you can write your own tables, lists, links, headings, and so on. This is a useful place to add information about an indicator that doesn't fit in with the rest of the metadata.

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

## Schema

The actual fields available on each indicator is fully configurable by editing the `_prose.yml` file in your data repository. For a full list of fields available out-of-the-box in the starter repository, see the [starter repository's `_prose.yml` file](https://github.com/open-sdg/open-sdg-data-starter/blob/develop/_prose.yml). This file also serves to control the behavior of the Prose.io service, which is the usual way that metadata is edited. (For technical information about Prose.io schema, see [the official Prose.io documentation](https://github.com/prose/prose/wiki/Prose-Configuration).)

## Renaming metadata fields

In the schema file mentioned above, each field can have a `translation_key` property. These can be changed from the defaults, as needed, to control the public-facing name for each field. For example, perhaps you want to change the public-facing label for the `indicator_name` field. You could update the schema, changing it from this:

```
- name: "indicator_name"
  field:
    element: text
    label: "Indicator name"
    translation_key: metadata_fields.indicator_name
    scope: global
```

To this:

```
- name: "indicator_name"
  field:
    element: text
    label: "Indicator name"
    translation_key: my_custom_translations.another_translation
    scope: global
```

### Advanced - label vs translation_key

You may think that it would make more sense for the `label` property above to control the public-facing name for the field. Indeed, if you are not using Prose.io, you are free to use `label` instead of `translation_key`. But Prose.io needs that `label` property for a special purpose: this is what data editors/managers will see when they're editing metadata. The Prose.io service is not multilingual, so its `label` property needs to already be translated. (This is why it is plain English out-of-the-box.)

## Metadata tabs

The metadata fields can be displayed on indicator pages in a tabbed format. For more information, see the [configuration page in the "metadata tabs" section](configuration.md#metadata_tabs).

## Reserved metadata fields

The following keys cannot be used as metadata fields, because they are used for special purposes in Open SDG:

* goals
* goal
* targets
* target
* indicators
* indicator
* language
* name
* number
* global
* url
* goal_number
* target_number
