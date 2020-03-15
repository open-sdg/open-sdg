<h1>Data sources</h1>

Out of the box, the [data starter](https://github.com/open-sdg/open-sdg-data-starter) includes the data and metadata as [CSV](./data-format.md) and [YAML](./metadata-format.md) files, respectively.

## SDG Build

This data and metadata is processed by a Python library called [sdg-build](https://github.com/open-sdg/sdg-build). This library can input data/metadata from a variety of sources, and then outputs them in the format expected by Open SDG.

## Data repository config file

If you are using the out-of-the-box CSV/YAML approach mentioned above, you can take advantage of using a [configuration file](https://github.com/open-sdg/sdg-build/blob/master/docs/examples/open_sdg_config.yml) in your data repository. For an example of using this approach, see [here](https://github.com/open-sdg/sdg-build/blob/master/docs/examples/open_sdg_simple.py).

## Alternative data sources

You may want to maintain your data and/or metadata in some other way. With the help of the [sdg-build](https://github.com/open-sdg/sdg-build) library, there are additional options available for Open SDG.

NOTE: If using any of these alternative data sources, the "config file" approach mentioned above will not work.

### SDMX

Your data repository can contain SDMX files, either of the SDMX-ML or the SDMX-JSON format. Alternatively, your data repository can "point" to a remote SDMX API endpoint. Examples can be found [here](https://github.com/open-sdg/sdg-build/tree/master/docs/examples).

### CKAN

Your data repository can point to a CKAN instance containing data in a compatible format. Examples can be found [here](https://github.com/open-sdg/sdg-build/tree/master/docs/examples).
