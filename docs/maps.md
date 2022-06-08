<h1>Maps</h1>

Indicator data can be displayed on a [choropleth map](https://en.wikipedia.org/wiki/Choropleth_map), with the requisite data, metadata, boundaries, and site configuration. Here is a run-down of the steps necessary in order to get working maps.

## Data field: GeoCode

There must be a column in the CSV data called `GeoCode`. Each row that you would like mapped must have a value in the GeoCode column, which corresponds to an ID in the GeoJSON (see below).

> NOTE: Currently the mapping solution does not support disaggregation, so there is no need to add GeoCode values in disaggregated rows.

## Metadata field: data_show_map

The metadata field `data_show_map` must be set to `true`.

## Boundary data: GeoJSON

You will need to find at least one source for an accurate [GeoJSON](http://geojson.org/) file including the boundaries you have data for. For example, if you are implementing this platform for the United States, you likely will need a GeoJSON file that includes the boundaries of the 50 states.

> You can optionally include any number of more granular GeoJSON files, if your data supports it. For example, in the United States you might also include a second GeoJSON file that includes boundaries for the counties within each state.

These GeoJSON files will be processed and and hosted in the data repository. See the data starter for an example.

Each "feature" in the The GeoJSON must have the following in their `properties` attributes:

1. A property that holds the unique ID for the boundary (which must correspond to the GeoCode data column mentioned above)
2. A property that holds the human-readable name of the boundary

The specific keys for these properties are configured in the data repository. Here is an example of the relevant configuration settings for the data repository:

```
map_layers:
  -
    # This can be a local relative path or a remote URL.
    geojson_file: path/to/my/regions.geojson
    # This is the property in the GeoJSON that holds the name of the region.
    name_property: rgn17nm
    # This is the property in the GeoJSON that holds the "geocode" of the region.
    id_property: rgn17cd
    # This controls the subfolder that the GeoJSON file will be created in.
    output_subfolder: regions
    # This adds a prefix to all the GeoJSON filenames.
    filename_prefix: indicator_
  -
    # Add any number of additional layers, such as one for counties.
    geojson_file: path/to/my/counties.geojson
    name_property: cntynm
    id_property: cntycd
    output_subfolder: counties
    filename_prefix: indicator_
```

## Site configuration: map_options and map_layers

Lastly, there must be 2 sections in your `_config.yml` file to configure mapping behavior: `map_options` and `map_layers`.

### map_options

Here are possible configuration items for `map_options`. Defaults are listed below, so you can omit any that do not need to be changed.

```
map_options:
  # Whether the map should provide a button and form for changing the displayed disaggregation:
  disaggregation_controls: false
  # Control the limits on zooming in/out in the map:
  minZoom: 5
  maxZoom: 10
  # If you would like to use tile (background) imagery, use these:
  tileURL: replace me
  tileOptions:
    id: replace me
    accessToken: replace me
    attribution: replace me
  # Control the choropleth color range. See https://gka.github.io/chroma.js/#chroma-brewer
  colorRange: chroma.brewer.BuGn
  # Set the color for boundaries that have no data.
  noValueColor: #f0f0f0
  # For documentation on the style options below, see here:
  # https://leafletjs.com/reference-1.4.0.html#path-option
  # Set the default style for boundaries in the map:
  styleNormal:
    weight: 1
    opacity: 1
    color: #888888
    fillOpacity: 0.7
  # Set the style for boundaries that have been selected/highlighted:
  styleHighlighted:
    weight: 1
    opacity: 1
    color: #111111
    fillOpacity: 0.7
  # Set the style for top-level boundaries that are displaying in other layers.
  # Note: This is only applicable when using the "nested zoom" feature (see below).
  styleStatic:
    weight: 2
    opacity: 1
    fillOpacity: 0
    color: #172d44
    dashArray: 5,5
```

### map_layers

You must have at least one item in the `map_layers` array. Here are the possible configuration items and defaults for `map_layers`:

```
map_layers:
  -
    # The subfolder under 'geojson' in the data repository holding the GeoJSON files:
    subfolder: regions
    # The label to use in the "Download GeoJSON" button:
    label: indicator.map
    # The minimum zoom at which this layer should be visible.
    # For example, if this "min_zoom" is set to 4, then this
    # layer will be invisible at zoom level 3 or less.
    min_zoom: 0
    # The maximum zoom at which this layer should be visible.
    # For example, if this "max_zoom" is set to 8, then this
    # layer will be invisible at zoom level 9 or more.
    max_zoom: 20
    # Whether or not these boundaries should display statically
    # on lower layers.
    staticBorders: false
```

Note that the `min_zoom`, `max_zoom`, and `staticBorders` options can be used to accomplish a "nested zoom" functionality. For example, a top-level layer might have these settings:

```
min_zoom: 0
max_zoom: 6
staticBorders: true
```

While a lower-level layer might have these settings:

```
min_zoom: 7
max_zoom: 20
```

The experience would be that when the user zooms from 6 to 7, the map would switch to the lower-level layer, but would continue to show the higher-level layer as static boundaries.
