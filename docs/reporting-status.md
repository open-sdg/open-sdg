<h1>Reporting status</h1>

Out of the box, Open SDG provides a page showing the "reporting status" of all the indicators, grouped by which goal they are in. This can be helpful in measuring the completeness of the platform, by clearly showing how many indicators have data and how many do not.

## Reporting status options

By default, the reporting status options dispayed are **Complete**, **In progress** and **Exploring data sources**. However, these options can be changed to meet your needs. For example, options can be removed or another option, such as **Not applicable**, can be used.

The options available can be controlled by adjusting the [schema file](https://open-sdg.readthedocs.io/en/latest/metadata-format/#schema). For example, [here is the section](https://github.com/open-sdg/open-sdg-data-starter/blob/develop/_prose.yml#L135) in the data starter repository, where you would adjust the available options for reporting status.

## Alternative groupings

Apart from grouping by _goal_, you might like to show the reporting status in different ways (such as "status by _tier_", for example). To do this, your data repository needs to be configured to generate the necessary data. See the `config_data.yml` file in the data starter, [here](https://github.com/open-sdg/open-sdg-data-starter/blob/develop/config_data.yml#L24), for an example.
