<h1>Chart types</h1>

Open SDG supports a few different types of charts. Each indicator will display a type of chart according to the `graph_type` metadata field. See below for more details on each type.

## Line

This type of chart is a horizontal line connecting points representing each year. Disaggregations are displayed by adding more lines to the chart.

> This type of chart works well for showing trends in SDG data.

To use this type, put `line` in the `graph_type` metadata field for an indicator. For example:

```
graph_type: line
```

## Bar

This type of chart shows each year as a vertical bar. Disaggregations are displayed by adding more bars above each year.

> This type of chart may be a suitable alternative to `line` in the case where you
> only have 1 or 2 years of data.

To use this type, put `bar` in the `graph_type` metadata field for an indicator. For example:

```
graph_type: bar
```

## Binary

This type of chart is meant to display data where the only possible values are "Yes" and "No". It does this by showing a bar going up for "Yes", and a bar going down for "No". See below for important data requirements.

To use this type, put `binary` in the `graph_type` metadata field for an indicator. For example:

```
graph_type: binary
```

In addition, see the special data requirements below.

### Data requirements for binary charts

Your data (CSV files typically) cannot have "Yes" and "No" for values. Instead you must use `1` to indicate "Yes" and `-1` to indicate "No".

## Stacked bar

This type of chart is similar to the bar chart, but is intended to display a certain disaggregation in a single "stacked" bar.

> This type of chart is useful in cases where you would like to highlight some
> disaggregation, such as Age or Sex. It is most commonly used in cases where
> the data is a percentage, adding up to 100.

For example, if an indicator is showing salaries, and you would like to highlight the difference between female and male salaries, you may want the "Sex" disaggregation to appear stacked in the same bar.

To use this type, put `stacked_bar` in the `graph_type` metadata field for an indicator. For example:

```
graph_type: stacked_bar
```

In addition, see the special data requirements below.

### Data requirements for stacked bar charts

The typical use-case for stacked bar charts requires quite a bit of special metadata. The following fields are recommended:

* `graph_stacked_disaggregation`: This identifies which disaggregation should appear stacked in the same bar. For example:

        graph_stacked_disaggregation: Sex

* `graph_units_without_headline`: When displaying stacked bar charts, you likely don't want to display the aggregate "headline", since you are trying to highlight the disaggregation. If your data does not have a headline, then you can skip this. But if your data *does* have a headline, and you would prefer to hide it, then you can do this with `graph_units_without_headline` like so:

        graph_units_without_headline:
          - percentage

* `data_start_values`: If you are using stacked bar charts you likely want to highlight a particular disaggregation, which means that you want the chart to appear with certain values (such as "Female" and "Male") already selected. You can do this with `data_start_values`, like so:

        data_start_values:
          - field: Sex
            value: Female
          - field: Sex
            value: Male
