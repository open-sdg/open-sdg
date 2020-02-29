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

### Data requirements for binary charts

Your data (CSV files typically) cannot have "Yes" and "No" for values. Instead you must use `1` to indicate "Yes" and `-1` to indicate "No".
