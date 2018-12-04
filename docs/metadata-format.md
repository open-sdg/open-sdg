# Metadata format

When editing metadata, the individual fields are associated with a particular tag. This page details what each of those tags represents. This is mostly relevant for developers of the site, but users will also find it useful if they are adding additional "Raw Metadata" in the Prose interface.

# Mandatory fields

## Already populated from UN.STAT

Indicator name MANDATORY

Target name MANDATORY

Target number MANDATORY

UN designated tier RECOMMENDED

UN custodian agency RECOMMENDED

Link to UN metadata RECOMMENDED

Link to UN metadata text RECOMMENDED

## Require populating

Geographical coverage  MANDATORY

Unit of measurement  MANDATORY

Reporting status (needs to be complete')'  MANDATORY

Graph type (line by default)  MANDATORY

Graph title  MANDATORY

data_non_statistical (true/false)  MANDATORY

Source 1 active (checkbox) RECOMMENDED

Source 1: Organisation RECOMMENDED

Source 1: Link to data source RECOMMENDED

Source 1: Link to data source text RECOMMENDED

The rest are optional fields (incl. data sources 2-6)

# Metadata Groups

## National Metadata

| Tag                                 | Description                  |
|-------------------------------------|------------------------------|
| national_indicator_available        | Actual indicator available   |
| national_indicator_description      | Actual indicator description |
| national_indicator_periodicity      | Indicator periodicity        |
| national_earliest_available_data    | Earliest available data      |
| national_geographical_coverage      | Geographic coverage          |
| admin_release_date                  | Release date                 |
| admin_next_release                  | Next release date            |
| admin_statistical_classification    | Statistical classification   |
| computation_disaggregation          | Disaggregation               |
| comments_limitations                | Comments and limitations     |
| admin_contact_details               | Contact details              |

## Method of Computation Metadata

| Tag                                  | Description      |
|--------------------------------------|------------------|
| computation_units                    | Units of Measure |
| computation_calculations             | Calculations     |
| computation_numerator                | Numerator        |
| computation_denominator              | Denominator      |

## Global Metadata

| Tag                                 | Description                         |
|-------------------------------------|-------------------------------------|
| indicator_name                      | Indicator name                      |
| indicator                           | Indicator number                    |
| target                              | Target name                         |
| target_id                           | Target number                       |
| indicator_definition                | Global indicator description        |
| un_designated_tier                  | UN designated tier                  |
| un_custodial_agency                 | UN custodial agency                 |
| goal_meta_link                      | Link to UN metadata                 |
| goal_meta_link_text                 | The text to show instead of the URL |

## Data Sources Metadata

These metadata tags for the sources are available for 3 separate sources at the moment (replace the `#` with a 1, 2 or 3).

| Tag                                 | Description                                                                           |
|-------------------------------------|---------------------------------------------------------------------------------------|
| source_active_#                     | Binary indicator stating whether the source is availble - should be `true` or `false` |
| source_organisation_#               | Organisation                                                                          |
| source_periodicity_#                | Periodicity                                                                           |
| source_earliest_available_#         | Earliest available data                                                               |
| source_geographical_coverage_#      | Geographical coverage                                                                 |
| source_url_#                        | Link to data source                                                                   |
| source_url_text_#                   | The text to show instead of the URL                                                   |
| source_release_date_#               | Release date                                                                          |
| source_next_release_#               | Next release date                                                                     |
| source_statistical_classification_# | Statistical classification                                                            |
| source_contact_#                    | Contact details                                                                       |
| source_other_info_#                 | Other information                                                                     |

## Data Info

These are not displayed on the website but affect how it is laid out.

| Tag                                 | Description                        |
|-------------------------------------|------------------------------------|
| reporting_status                    | One of `notstarted` (red), `inprogress` (amber), or `complete` (green). |
| data_non_statistical                | `true` or `false` flag. Non-statistical data does not have csv or graphs. |

## Graph Metadata

Some additional tags are available for the graphs, including the graph type and the graph title. Currently only longitudinal graphs are available but more are planned. These tags are experimental. Graph tags do not show up on the web page as metadata; we will use them in the future for setting how a graphic should render, some extra labels etc.

| Tag                                 | Description                        |
|-------------------------------------|------------------------------------|
| graph_type                          | One of `line` or `bar`     |
| graph_title                         | The title to be shown on the graph |

# Non-Standard Information

In the Prose editor, you can add free Markdown text in the same file as the metadata. This is the `edit` section in prose and is part of the metadata. In the raw .md file this is the content underneath the yaml header. You can add any content you like in this section and the content will be converted to html and placed above the graph near the top of the screen.

A guide to writing [Markdown is here](https://guides.github.com/features/mastering-markdown/) and you can write your own tables, lists, links, headings, and so on. This is a useful place to add information about an indicator that doesn't fit in with the rest of the metadata.
