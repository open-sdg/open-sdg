<h1>Reporting status</h1>

Out of the box, Open SDG provides a page showing the "reporting status" of all the indicators, grouped by which goal they are in. This can be helpful in measuring the completeness of the platform, by clearly showing how many indicators have data and how many do not.

## Reporting status options

By default, the reporting status options dispayed are **Complete**, **In progress** and **Exploring data sources**. However, these options can be changed to meet your needs. For example, options can be removed or another option, such as **Not applicable**, can be used.

The options available can be controlled by adjusting the [schema file](metadata-format.md#schema). For example, [here is the section](https://github.com/open-sdg/open-sdg-data-starter/blob/develop/_prose.yml#L135) in the data starter repository, where you would adjust the available options for reporting status.

## Color-coding

The horizontal bars on the reporting status page have color-coded segments. The default options mentioned above are already color-coded for green, yellow, and red, respectively. That color-coding is controlled in CSS code in [this file](https://github.com/open-sdg/open-sdg/blob/master/_sass/layouts/_reporting_status.scss).

To color-code your custom options, add your own CSS code (such as in a `custom.scss` file) using a class name that is the same as the option value. For example, if your custom options are configured like so:

```
- name: "reporting_status"
  field:
    element: select
    label: "Reporting status"
    options:
      - name: 'My first option'
        value: 'option-1'
      - name: 'My second option'
        value: 'option-2'
      - name: 'My third option'
        value: 'option-3'
  scope: data
```

Then you could color-code the options by adding this in your CSS:

```
.option-1 { color: pink; }
.option-2 { color: blue; }
.option-3 { color: cyan; }
```

## Alternative groupings

Apart from grouping by _goal_, you might like to show the reporting status in different ways (such as "status by _tier_", for example). To do this, your data repository needs to be configured to generate the necessary data. See the `config_data.yml` file in the data starter, [here](https://github.com/open-sdg/open-sdg-data-starter/blob/develop/config_data.yml#L24), for an example.

Note that the value of that setting in the data repository should be a list of fields which are present in your indicator metadata files.

For example, suppose you would like to show reporting status grouped by UN custodian agency. To do this, you must have a field in your indicator metadata which specifies the UN custodian agency. (In fact, the data starter ships with such a field, called `un_custodian_agency`.) To accomplish this, you could have the following configuration for your data repository's `reporting_status_extra_fields`:

```
reporting_status_extra_fields:
  - un_custodian_agency
```

There is no configuration necessary in the site repository, for this feature. Open SDG can automatically detect whether you have `reporting_status_extra_fields` configured in the data repository.
