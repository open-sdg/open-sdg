<h1>Tutorial: SDMX integration</h1>

This tutorial will describe how to integrate your Open SDG platform with SDMX data, metadata, and translations.

## Topics covered

* Using SDMX data
* Using SDMX metadata
* Using SDMX translations

## Requirements

* This tutorial assumes you already have your data in SDMX format via a remote SDMX API. (However this approach also works with local SDMX files.)
* This tutorial assumes you have already set up an Open SDG platform.

## Level of difficulty

Anyone can follow the steps to complete the tutorial, however you will be using the YAML syntax involved in most Open SDG configurations. YAML requires particular indentation and spacing, so some attention to detail will be needed.

Some basic knowledge of SDMX is helpful but not required.

## Removing the CSV input

The Open SDG platform out-of-the-box is configured to use CSV files as a data source - one file for each SDG indicator. In terms of Open SDG configuration, there is a "CSV input". When switching to SDMX, you will usually want to remove the CSV input.

There may be unusual cases where you need to keep some indicators as CSV-based because you don't have their data in SDMX format yet. So this section is optional.

The inputs are controlled in your [data configuration](../data-configuration.md#inputs) (config_data.yml file) in your data repository. This setting contains any number of inputs in a list. To remove the CSV input, simply delete that item from the list. For example, if you are starting with this:

```
inputs:
  - class: InputCsvData
    path_pattern: data/*.csv
  - class: InputYamlMeta
    path_pattern: indicator-config/*.yml
    git: false
```

You can remove the CSV input by changing it to this:

```
inputs:
  - class: InputYamlMeta
    path_pattern: indicator-config/*.yml
    git: false
```

## Adding the SDMX data input

Next we will add some code in the same place, but this time it will refer to your SDMX data source.

### Gather the URLs for your data and structure

Before proceeding you will need to know the location for your data, and the location for your structure. (The structure is often referred to as the "DSD".) Assuming you are using a remote SDMX API, these should both be URLs (i.e., they should start with "https://"). Get these URLs from your SDMX API, or by consulting your data managers. For this tutorial we will assume the URLs are:

* https://my-sdmx-api.org/my-data
* https://my-sdmx-api.org/my-structure

> Note that it is also possible to use "local" data and structure files which are uploaded to your data repository. Simply upload them and then, instead of a URL, use the path within the repository (eg, "some-folder/my-data.xml").

### Add the configuration for the data input

Now you will add something under that "inputs" section in the data configuration (the same place where you removed the CSV input). Here is a recommended starting place for what to add:

```
inputs:
  - class: InputSdmxMl_Structure
    source: https://my-sdmx-api.org/my-data
    dsd: https://my-sdmx-api.org/my-structure
    import_series_attributes: true
    import_observation_attributes: true
    import_codes: true
    indicator_id_map:
     my_custom_code381: 3-8-1
     my_custom_code411a: 4-1-1
     my_custom_code411b: 4-1-1
    drop_singleton_dimensions: false
    drop_dimensions:
      - FREQ
      - REPORTING_TYPE
      - NATURE
      - TIME_PERIOD
```

However you may tweak these configuration settings as needed. Here is some guidance about each individual setting:

* `class`: This should be either "InputSdmxMl_Structure" or "InputSdmxMl_StructureSpecific". If you are unsure which one applies to your case, you might consult with your data managers to learn which to use.
* `source`: This is the URL for your data that you collected earlier.
* `dsd`: This is the URL for your structure that you collected earlier.
* `import_series_attributes`: This controls whether to import SDMX "attributes" at the series level.
* `import_observation_attributes`: This controls whether to import SDMX "attributes" at the observation level.
* `import_codes`: This must be included for several features to work correctly, and it must be set to `true`.
* `indicator_id_map`: This must be included if you have made custom series codes so that Open SDG knows which indicator the series belongs to. You should add all your custom series to the list. You can add multiple series here to appear on the same indicator page.
* `drop_singleton_dimensions`: This setting will automatically drop any SDMX "dimensions" that contain only a single value. It is recommended to set this to `false` and then specify exactly which dimensions you would like to drop in `drop_dimensions` (see below).
* `drop_dimensions`: This optional setting will drop specified SDMX dimensions that do not serve any purpose in Open SDG. Common candidates for dropping here are: FREQ, REPORTING_TYPE, NATURE, and TIME_PERIOD. If you notice some dimensions are appearing as disaggregation dropdowns on your indicator pages, you can add them to the list. e.g. UNIT_MULT, OBS_STATUS etc.

Before continuing, ensure that the new "input" is added with the correct spacing/indentation. For example, along with another input, it might look like this:

```
inputs:
  - class: InputSdmxMl_Structure
    source: https://my-sdmx-api.org/my-data
    dsd: https://my-sdmx-api.org/my-structure
    import_series_attributes: true
    import_observation_attributes: true
    import_codes: true
    drop_singleton_dimensions: false
    drop_dimensions:
      - FREQ
      - REPORTING_TYPE
      - NATURE
      - TIME_PERIOD
  - class: InputYamlMeta
    path_pattern: indicator-config/*.yml
    git: false
```

## Adding the SDMX translation input

Next we will add some code in the same file that will pull in translations. Note that this is necessary even if your site uses only one language. This converts the codes in your DSD into human-readable labels. For example, if your site is in English, this converts "F" into "Female" and "M" into "Male".

### Add the configuration for the translation input

Look for the `translations` section of the same data configuration file. Using the same "structure" (aka, DSD) URL that you used above, add a new entry at the bottom like this:

```
  - class: TranslationInputSdmx
    source: https://my-sdmx-api.org/my-structure
```

To confirm, the "source" parameter here should contain the URL of your DSD, or structure.

Before continuing, ensure that the new "translation" is added with the correct spacing/indentation. For example, along with other translations, it might look like this:

```
translations:
  - class: TranslationInputSdgTranslations
    source: https://github.com/open-sdg/sdg-translations.git
    tag: 2.3.0
  - class: TranslationInputYaml
    source: translations
  - class: TranslationInputSdmx
    source: https://my-sdmx-api.org/my-structure
```

## Adding the SDMX metadata input

This section is not required, but it is standard practice to use Microsoft Word files, using a particular template, to maintain the metadata for each indicator. This can be done instead of the out-of-the-box YAML files that might be present in your data repository.

### Removing the YAML metadata input and files

If you used the Open SDG quick start or "data starter", you likely have an existing "input" for metadata in YAML format. Look in your data configuration's `inputs` section for something like this, pointing to a "meta" folder:

```
  - class: InputYamlMeta
    path_pattern: meta/*-*.yml
    git: false
```

Just as you did above with the others, remove this item.

### Adding the Word metadata input and files

Now add a new item like this:

```
  - class: InputWordMeta
    path_pattern: meta/*.docm
```

As above, make sure that you keep the proper spacing and indentation for this new item.

### Adding metadata for each indicator

This section is a long-term project because it is so time-consuming, but here are the steps for adding metadata for a new indicator.

1. Download a blank copy of the [Word metadata template](https://github.com/sdmx-sdgs/metadata).
2. Fill in the content of the file as needed, using Microsoft Word.
3. Name the file according to the indicator id number, eg: `1-1-1.docm`
4. Upload the file to your data repository's `meta` folder.

You can repeat the process above an additional time for each additional language. The only difference is that in step 4 you would upload the file to a subfolder named according the language code. For example, `es` for Spanish metadata.

## Indicator Options

There is an `indicator_options` section in the data configuration that may also need tweaks. Here is a recommended starting place for SDMX, but you can tweak as needed:

```
indicator_options:
  non_disaggregation_columns:
    - Year
    - Units
    - Series
    - Value
    - GeoCode
    - Observation status
    - Unit multiplier
    - Unit measure
    - UNIT_MEASURE
    - SERIES
    - COMMENT_TS
    - DATA_LAST_UPDATE
    - TIME_DETAIL
  series_column: SERIES
  unit_column: UNIT_MEASURE
  observation_attributes:
    - COMMENT_OBS
    - SOURCE_DETAIL
```

## Necessary changes to the site configuration

Having finished the data configuration changes, the next step is a few required changes in the site configuration.

### Data fields

Because SDMX uses different fields for Series (`SERIES`) and Units (`UNIT_MEASURE`), you will need to use these values for the `data_fields` site configuration:

```
data_fields:
  units: 'UNIT_MEASURE'
  series: 'SERIES'
```

You can either use the site configuration form to generate a new `_data/site_config.yml` file, or change the file directly in your site repository.

### Time-series attributes

If you have attributes in your SDMX at the series level, you can display them in Open SDG by specifying them in the `time_series_attributes` setting. For example, if you have a `COMMENT_TS` attribute on each series in your SDMX, you can display it in Open SDG using any custom label:

```
time_series_attributes:
  - field: COMMENT_TS
    label: My custom label
```

As above, you can either use the site configuration form to generate a new `_data/site_config.yml` file, or change the file directly in your site repository.

### Observation attributes

If you have attributes in your SDMX data at the observation level, you can display them in Open SDG by specifying them in the observation_attributes setting. For example, if you have a `COMMENT_OBS` attribute on each observation in your SDMX, you can display it in Open SDG using any custom label:

```
observation_attributes:
  - field: COMMENT_OBS
    label: My custom label
```

As above, you can either use the site configuration form to generate a new `_data/site_config.yml` file, or change the file directly in your site repository.

Note that these correspond to the `observation_attributes` in the `indicator_options` section of the data configuration you set above.
