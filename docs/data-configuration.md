<h1>Data configuration</h1>

Typically an Open SDG implementation is split into a [site repository](glossary.md#site-repository) and a [data repository](glossary.md#data-repository). For this reason the Open SDG configuration is split into [site configuration](configuration.md) and data configuration. This document details the available settings for data configuration.

> To see many of these options in action, the [data starter repository](https://github.com/open-sdg/open-sdg-data-starter) contains an [example config file](https://github.com/open-sdg/open-sdg-data-starter/blob/develop/data_config.yml).

### docs_branding

The data repository will automatically generate a website which summarizes the available endpoints in your build. The `docs_*` settings affect how that website is built.

_Optional_: This `docs_branding` setting controls the title which displays at the top of these website pages. The default if omitted is shown below:

```nohighlight
docs_branding: Build docs
```

### docs_intro

_Optional_: This adds an introductory paragraph on the homepage of the automatically-generated website. If omitted, no introductory paragraph will appear. Here is an example:

```nohighlight
docs_intro: This is a list of examples of endpoints and output that are
  available on this service. Click each of the links below for more information
  on the available output.
```

### docs_indicator_url

_Optional_: This can be used to convert any indicator IDs in the automatically-generated website into actual links to your implementation's indicator pages. If omitted, the indicator IDs will not be hyperlinked. Here is an example:

```nohighlight
docs_indicator_url: https://my-github-org.github.io/my-site-repository/[id]
```

### indicator_downloads

_Optional_: This creates additional "download" buttons on each indicator page of your Open SDG implementation. Use this if there are additional per-indicator files (such as SDMX files) that you would like to make available for download.

This should be a list of objects, each having certain parameters. The available parameters are:

* `button_label`: The label of the button to display. This can be a translation key.
* `source_pattern`: A wildcard pattern used to identify the files you would like to make available for download.
* `output_folder`: A folder in which to create for placing the files, where they will be available for download.
* `indicator_id_pattern`: A regular expression to convert filenames into indicator IDs. The default is `indicator_(.*)`, which would convert "indicator_1-1-1" into "1-1-1". For more help with regular expressions, look for online tools such as [Regex 101](https://regex101.com/).

The following example would ensure that all files matching `data/indicator_*.csv` will be available for download in the build at `downloads/data-csv/indicator_*.csv`:

```nohighlight
indicator_downloads:
  - button_label: csv
    source_pattern: tests/data/indicator_*.csv
    output_folder: data-csv
    indicator_id_pattern: indicator_(.*)
```

### indicator_options

_Optional_: This controls how your indicators are loaded. The available parameters are:

* non_disaggregation_columns: This specifies a list of columns that should not be considered disaggregations.

Here are the defaults that are assumed if this is omitted:

```nohighlight
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
```

### inputs

_Optional_: This setting identifies the source (or sources) of your data and metadata. This can be omitted if you are using the standard Open SDG approach of CSV data and YAML metadata. But if you would like to use non-standard inputs (such as SDMX) then you can use this as needed.

Each item must have a "class" which corresponds to classes in the [/sdg/inputs folder of the sdg-build library](https://github.com/open-sdg/sdg-build/tree/master/sdg/inputs). Further, each item can have any/all of the parameters that class uses. Below are full descriptions of all the possible inputs and their corresponding parameters:

**InputCkan**: Input data from a [CKAN](https://ckan.org/) service. The available parameters are:

  * `endpoint`: The remote URL of the endpoint for fetching indicators.
  * `indicator_id_map`: Map of API ids (such as "resource ids") to indicator ids.

> For more technical information see the [InputCkan class definition](https://github.com/open-sdg/sdg-build/blob/master/sdg/inputs/InputCkan.py) and an [example of using InputCkan in Python code](https://github.com/open-sdg/sdg-build/blob/master/docs/examples/ckan.py).

**InputCsvData**: Input data from a folder of CSV files. The available parameters are:

  * `path_pattern`: A wildcard pattern used for identifying the source files.

> To see this in practice see this [example of InputCsvData configuration](https://github.com/open-sdg/sdg-build/blob/master/docs/examples/open_sdg_config.yml#L30). For more technical information see the [InputCsvData class definition](https://github.com/open-sdg/sdg-build/blob/master/sdg/inputs/InputCsvData.py).

**InputCsvMeta**: Input metadata from a folder of CSV files. The available parameters are:

  * `path_pattern`: Same as described above in other inputs.
  * `metadata_mapping`: A map of human-readable labels to machine keys or a path to a CSV file containing that mapping. This allows the CSV metadata files to use human-readable labels instead of machine keys, which makes management easier.
  * `git`: Whether to use Git (version control) information to populate "last updated" dates in the metadata. This is a convenience feature to save you from the manual work of keeping the "last updated" dates accurate.
  * `git_data_dir`: Only used if you are using the "git" option described above. Location of folder containing the data files.
  * `git_data_filemask`: Only used if you are using the "git" option described above. A pattern for data filenames, where "*" is the indicator id. Any indicator can override this setting by having a metadata field called "data_filename" with the name of the data file for that indicator.

> For more technical information see the [InputCsvMeta class definition](https://github.com/open-sdg/sdg-build/blob/master/sdg/inputs/InputCsvMeta.py).

**InputExcelMeta**: Input metadata from a folder of Excel files. The available parameters are the same as in InputCsvMeta.

> For more technical information see the [InputExcelMeta class definition](https://github.com/open-sdg/sdg-build/blob/master/sdg/inputs/InputExcelMeta.py).

**InputSdmxJson**: Input data from an SDMX-JSON file or endpoint. The available parameters are:

  * `source`: Remote URL of the SDMX source, or path to local SDMX file.
  * `drop_dimensions`: List of SDMX dimensions/attributes to ignore
  * `drop_singleton_dimensions`: Whether to drop dimensions/attributes with only 1 variation
  * `dimension_map`: Map of SDMX ids to human-readable names. For dimension names, the key is simply the dimension id. For dimension value names, the key is the dimension id and value id, separated by a pipe (|). This also includes attributes.
  * `indicator_id_map`: A map of SDMX series codes to indicator ids. Normally this is not needed, but sometimes the DSD may contain typos or mistakes, or the DSD may not contain any reference to the indicator ID numbers. This need not contain all indicator ids, only those that need it. If a particular series should be mapped to multiple indicators, then they can be a list of strings. Otherwise each indicator is a string.
  * `import_names`: Whether to import names. Set to false to rely on global names.
  * `import_translation_keys`: Whether to import translation keys instead of text values. Set to true to import translation keys, which will be in the format of `code.[id]` or `concept.[id]`. If left false, text values are imported instead, taken from the first language in the DSD.
  * `dsd`: Remote URL of the SDMX DSD (data structure definition) or path to local file.
  * `indicator_id_xpath`: An xpath query to find the indicator id within each Series code.
  * `indicator_name_xpath`: An xpath query to find the indicator name within each Series code.

> For more technical information see the [InputSdmxJson class definition](https://github.com/open-sdg/sdg-build/blob/master/sdg/inputs/InputSdmxJson.py), an [example of InputSdmxJson configuration](https://github.com/open-sdg/sdg-build/blob/master/docs/examples/open_sdg_config_sdmx.yml#L29), and an [example of using InputSdmxJson in Python code](https://github.com/open-sdg/sdg-build/blob/master/docs/examples/sdmx_json.py).

**InputSdmxMl_Multiple**: Input data from multiple SDMX-ML files (which can be a mix of either "Structure" or "Structure Specific"). The available parameters are the same as in InputSdmxJson, along with these additional parameters:

  * `path_pattern`: Same as described above in other inputs.

> For more technical information see the [InputSdmxMl_Multiple class definition](https://github.com/open-sdg/sdg-build/blob/master/sdg/inputs/InputSdmxMl_Multiple.py).

**InputSdmxMl_Structure**: Input data from an SDMX-ML Structure file. The available parameters are the same as in InputSdmxJson.

> For more technical information see the [InputSdmxMl_Structure class definition](https://github.com/open-sdg/sdg-build/blob/master/sdg/inputs/InputSdmxMl_Structure.py), and an [example of using InputSdmxMl_Structure in Python code](https://github.com/open-sdg/sdg-build/blob/master/docs/examples/sdmx_ml.py).

**InputSdmxMl_StructureSpecific**: Input data from an SDMX-ML Structure Specific (also known as "Compact") file. The available parameters are the same as in InputSdmxJson.

> For more technical information see the [InputSdmxMl_StructureSpecific class definition](https://github.com/open-sdg/sdg-build/blob/master/sdg/inputs/InputSdmxMl_StructureSpecific.py).

**InputYamlMdMeta**: Input metadata from a folder of YAML/Markdown files. The available parameters are the same as in InputCsvMeta.

Note that YAML/Markdown files should have a `---` at the bottom. Any Markdown text below that line will be used as the `page_content` metadata field.

> For more technical information see the [InputYamlMdMeta class definition](https://github.com/open-sdg/sdg-build/blob/master/sdg/inputs/InputYamlMdMeta.py) and an [example of InputYamlMdMeta configuration](https://github.com/open-sdg/sdg-build/blob/master/docs/examples/open_sdg_config.yml#L33).

**Defaults**: As mentioned above, this `inputs` setting is optional. The defaults below show what is assumed if `inputs` is omitted entirely.

```nohighlight
inputs:
  - class: InputCsvData
    path_pattern: data/*-*.csv
  - class: InputYamlMdMeta
    path_pattern: meta/*-*.md
    git: true
    git_data_dir: data
```

### languages

_Optional_: This setting corresponds exactly to the [language setting in the site configuration](configuration.md#languages). However it is optional here. If you use this setting, your data will be translated and placed in language subfolders. For more information on how this translation works, see documentation on [translating metadata](translation.md#translating-indicator-metadata) and [translating data](translation.md#translating-data-disaggregations-and-columns).

```nohighlight
languages:
  - es
  - en
```

### map_layers

_Optional_: This allows the build to generate one or more GeoJSON files to be used by Open SDG maps. This should be a list of layers, each one containing certain parameters. The parameters available correspond to the [sdg-build library's OutputGeoJson class](https://github.com/open-sdg/sdg-build/blob/master/sdg/outputs/OutputGeoJson.py) and are described below:

* `geojson_file`: A path to a GeoJSON file (remote or local) which contains all of the "geometries" for the regions to include. Each region should have an id and a name, in properties (see name_property and id_property).
* `name_property`: The property in the geometry file which contains the region's name.
* `id_property`: The property in the geometry file which contains the region's id.
* `id_column`: The name of a column in the indicator data which corresponds to the id that is in the "id_property" of the geometry file. This serves to "join" the indicator data with the geometry file.
* `output_subfolder`: A folder beneath 'geojson' to put the files. The full path will be: `[output_folder]/geojson/[output_subfolder]/[indicator_id].geojson`
* `filename_prefix`A prefix added before the indicator id to construct a filename for each geojson file.
* `exclude_columns`: A list of strings, each a column name in the indicator data that should not be included in the disaggregation. This is typically for any columns that mirror the region referenced by the id column.
* `id_replacements`: An optional for with replacements to apply to the values in the id_column. This is typically used if another column exists which "mirrors" what would be in an id column, to avoid duplicate work. For example, maybe a "Region" column exists with the names of the regions as values. This can be used to "map" those region names to geocodes, and save you the work of maintaining a separate id column.

Below is an example of a possible configuration which includes one layer:

```nohighlight
map_layers:
  - geojson_file: https://geoportal1-ons.opendata.arcgis.com/datasets/4fcca2a47fed4bfaa1793015a18537ac_4.geojson
    name_property: rgn17nm
    id_property: rgn17cd
    output_subfolder: regions
    filename_prefix: indicator_
```

### reporting_status_extra_fields

_Optional_: This allows the build to generate stats for reporting status by additional fields, beyond the default "status by goal" report. This is optional, but the example below shows how to generate reporting status by the `un_custodian_agency` field:

```nohighlight
reporting_status_extra_fields:
  - un_custodian_agency
```

### schema_file

_Optional_: This identifies a file containing the schema (possible fields) for metadata. Currently this needs to be a prose.io config, and defaults to '_prose.yml'.

```nohighlight
schema_file: _prose.yml
```

### site_dir

_Optional_: This identifies a directory to hold the "built" files. The default is '_site'.

```nohighlight
site_dir: _site
```

### src_dir

_Optional_: This setting controls the directory in which scripts should find source files. In most cases this can be left at the default ('') which points to the root of the data repository. However this is available in case you need to place your source files in a subfolder.

```nohighlight
src_dir: ''
```

### translations

_Optional_: This setting identifies the source (or sources) of your translations. This can be omitted if your languages are already included in [sdg-translations](https://github.com/open-sdg/sdg-translations) and you do not need any custom translations. But if you are using other languages or need custom translations, then you can use this as needed.

Each item must have a "class" which corresponds to classes in the [/sdg/translations folder of the sdg-build library](https://github.com/open-sdg/sdg-build/tree/master/sdg/translations). Further, each item can have any/all of the parameters that class uses. Below are full descriptions of all the possible translations and their corresponding parameters:

**TranslationInputCsv**: Input translations from a folder of local CSV files. The available parameters are:

  * `source`: The folder containing the translation files. Defaults to "translations".

> For more technical information see the [TranslationInputCsv class definition](https://github.com/open-sdg/sdg-build/blob/master/sdg/translations/TranslationInputCsv.py).

**TranslationInputSdgTranslations**: Input translations from a Git repository structured like the [sdg-translations](https://github.com/open-sdg/sdg-build/tree/master/sdg/translations) project. The available parameters are:

  * `tag`: Specifies a particular tag (or branch or commit) to use in the Git repository.
  * `branch`: Specifies a particular branch (or tag or commit) to use in the Git repository. Alias for "tag".
  * `source`: Specifies the endpoint for the Git repository. Defaults to the sdg-translations project: 'https://github.com/open-sdg/sdg-translations.git'

> For more technical information see the [TranslationInputSdgTranslations class definition](https://github.com/open-sdg/sdg-build/blob/master/sdg/translations/TranslationInputSdgTranslations.py) and an [example of TranslationInputSdgTranslations configuration](https://github.com/open-sdg/sdg-build/blob/master/docs/examples/open_sdg_config.yml#L56).

**TranslationInputSdmx**: Input translations from an SDMX DSD file. The available parameters are:

  * `source`: The location of the SDMX DSD file (either local or remote).

> For more technical information see the [TranslationInputSdmx class definition](https://github.com/open-sdg/sdg-build/blob/master/sdg/translations/TranslationInputSdmx.py) and an [example of TranslationInputSdmx configuration](https://github.com/open-sdg/sdg-build/blob/master/docs/examples/open_sdg_config_sdmx.yml#L55).

**TranslationInputYaml**: Input translations from a folder of local YAML files. The available parameters are the same as in TranslationInputCsv above.

> For more technical information see the [TranslationInputYaml class definition](https://github.com/open-sdg/sdg-build/blob/master/sdg/translations/TranslationInputYaml.py) and an [example of TranslationInputYaml configuration](https://github.com/open-sdg/sdg-build/blob/master/docs/examples/open_sdg_config_sdmx.yml#L53).

**Defaults**: As mentioned above, this `translations` setting is optional. The defaults below show what is assumed if `translations` is omitted entirely.

```nohighlight
translations:
  - class: TranslationInputSdgTranslations
    source: https://github.com/open-sdg/sdg-translations.git
    branch: master
  - class: TranslationInputYaml
    source: translations
```
