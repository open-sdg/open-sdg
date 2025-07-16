<h1>Tutorial: PX Web integration</h1>

This tutorial will describe how to integrate your Open SDG platform with PX Web data, metadata, and translations.

## Topics covered

* Using PX Web data
* Using (limited) Px Web metadata
* Using PX Web translations

## Requirements

* This tutorial assumes you already have your data in PX Web format via a remote PX Web API. (However this approach also works with local PX files.)
* This tutorial assumes you have already set an Open SDG platform

## Level of difficulty

Anyone can follow the steps to complete the tutorial, however you will be using the YAML syntax involved in most Open SDG configurations. YAML requires particular indentation and spacing, so some attention to detail will be needed.

## Special tags in PX file

There are some tags in the PX file that have special significance when used with Open SDG.

* `CONTVARIABLE`: This is treated as the `Series`.
* `LANGUAGES`: This specifies all of the languages included in the PX file.
* `LANGUAGE`: This specifies the default language for the PX file.
* `TITLE`: This is treated as the `graph_title` and `indicator_name`.
* `NOTE`: This is treated as `page_content` and `data_footnote`.
* `UNITS`: This is treated as the `Units` and `computation_units`.
* `TIMEVAL`: This is treated as the `Year`.

## Removing the CSV input

The Open SDG platform out-of-the-box is configured to use CSV files as a data source -- one file for each SDG indicator. In terms of Open SDG configuration, there is a "CSV input". When switching to PxWeb, you will usually want to remove the CSV input.

There may be unusual cases where you need to keep some indicators as CSV-based because you don't have their data in PxWeb format yet. So this section is optional.

The inputs are controlled in your [data configuration](../data-configuration.md#inputs). This setting contains any number of inputs in a list. To remove the CSV input, simply delete that item from the list. For example, if you are starting with this:

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

## Adding the PxWeb data input

Next we will add some code in the same place, but this time it will refer to your PxWeb data source.

### Add the configuration for the data input

Now you will add something under that "inputs" section in the data configuration (the same place where you removed the CSV input). Here is a recommended starting place for what to add:

```
inputs:
  - class: InputPxFile
    indicator_id_map: indicator_id_map.yml
```

Here is some guidance about each individual setting:

* `indicator_id_map`: This refers to a separate file which contains a mapping between each PX file and one or more indicator IDs. See below for examples.


Before continuing, ensure that the new "input" is added with the correct spacing/indentation. For example, along with another input, it might look like this:

```
inputs:
  - class: InputPxFile
    indicator_id_map: indicator_id_map.yml
  - class: InputYamlMeta
    path_pattern: indicator-config/*.yml
    git: false
```

### Adding the indicator ID map

Without an indicator ID map, the PxWeb input will not do anything. It will only pull in data for indicators that are listed in the indicator ID map.

The indicator ID map should be a YAML file containing any number of URLs of PX files. For each PX file, you need to specify one or more indicator IDs.

Here is an example to demonstrate the syntax:

```
'https://my-pxweb-api.org/example1':
  - 1.1.1
'https://my-pxweb-api.org/example2':
  - 1.2.1
```

As with other YAML files, ensure that the spacing and indentation follows the example above. Save this file to the filename that you use in the `indicator_id_map` in the input above, and upload it to your data repository.

## Adding the PxWeb translation input

Next we will add some code in the same file that will pull in translations. Note that this is necessary even if your site uses only one language. This converts the codes in your PxWeb files into human-readable labels. For example, if your site is in English, this might convert "F" into "Female" and "M" into "Male".

### Add the configuration for the translation input

Look for the `translations` section of the same data configuration file. Using the same `indicator_id_map` that you used above, add a new entry at the bottom like this:

```
  - class: TranslationInputPx
    indicator_id_map: indicator_id_map.yml
```

Before continuing, ensure that the new "translation" is added with the correct spacing/indentation. For example, along with other translations, it might look like this:

```
translations:
  - class: TranslationInputSdgTranslations
    source: https://github.com/open-sdg/sdg-translations.git
    tag: 2.3.0
  - class: TranslationInputYaml
    source: translations
  - class: TranslationInputPx
    indicator_id_map: indicator_id_map.yml
```
