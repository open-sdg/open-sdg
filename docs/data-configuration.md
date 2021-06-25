<h1>Data configuration</h1>

Typically an Open SDG implementation is split into a [site repository](glossary.md#site-repository) and a [data repository](glossary.md#data-repository). For this reason the Open SDG configuration is split into [site configuration](configuration.md) and data configuration. This document details the available settings for data configuration.

These settings are mostly related to the conversion/alteration of data, metadata, translations, and schema. Also, many of these settings (those that start with "docs_") affect the construction of the "data documentation" mini-website that is automatically generated to document your particular data service. This website includes examples of each type of output, as well as a useful disaggregation report.

> To see many of these options in action, the [data starter repository](https://github.com/open-sdg/open-sdg-data-starter) contains an [example config file](https://github.com/open-sdg/open-sdg-data-starter/blob/develop/data_config.yml).

### csvw

_Optional_: If specified, then your data will be converted into [CSVW](https://www.w3.org/TR/tabular-data-primer/) format. The available parameters correspond to the parameters available in the [OutputCsvw class](https://github.com/open-sdg/sdg-build/blob/master/sdg/outputs/OutputCsvw.py).

* `common_properties`: Key/value pairs showing common properties to add to the CSVW metadata. Here is a [list of support properties](https://w3c.github.io/csvw/metadata/#common-properties). Note that this can also be set per-indicator in a "csvw" metadata property.
* `at_properties`: Key/value pairs showing "at" properties (those starting with @). Note that this can also be set per-indicator in a "csvw" metadata property.
* `table_schema_properties`: Key/value pairs showing properties to add to the CSVW table schema. Supported properties include (but may not be limited to) "aboutUrl". Note that this can also be set per-indicator in a "csvw" metadata property.
* `column_properties`: Key/value pairs (where each value is itself key/value pairs) showing properties to add to the CSVW columns, keyed by column name. Supported properties include (but may not be limited to) "propertyUrl" and "valueUrl". Note that this can also be set per-indicator in a "csvw" metadata property.
* `sorting`: This works the same as in the `datapackage` setting below.

### datapackage

_Optional_: Your data will automatically be converted into a machine-readable standard known as [datapackages](https://frictionlessdata.io/data-package/). This setting can be used to affect the way that these datapackages are constructed.

**NOTE**: These datapackages are actually used in Open SDG to determine the order in which the disaggregations and their values are displayed to the end-user. So, the "sorting" option described below has a direct effect on your Open SDG site.

The available parameters correspond to the parameters available in the [OutputDataPackage class](https://github.com/open-sdg/sdg-build/blob/master/sdg/outputs/OutputDataPackage.py):

* `field_properties`: Key/value pairs (where each value is itself a set of key/value pairs) showing properties to add to specific fields, keyed by field name. Note that this can also be set per-indicator in a "datapackage" metadata property.
* `package_properties`: Key/value pairs showing common properties to add to all the data packages. Note that this can also be set per-indicator in a "datapackage" metadata property.
* `resource_properties`: Key/value pairs showing common properties to add to the resource in all data packages. Note that this can also be set per-indicator in a "datapackage" metadata property.
* `sorting`: Which strategy to use when sorting the columns and values. The available options are:

  - alphabetical: Sort columns/values in alphabetical order. For example, assuming the data came from the following CSV file, "Age" would be before "Sex", and "Female" would be before "Male":

          Year,Sex,Age,Value
          2021,Male,5 years,43
          2021,Female,5 years,53

    Note that this alphabetizing happens before the columns/values are translated.

  - default: Sort columns/values according to their position in the source data. For example, assuming the data came from the same CSV shown above, "Sex" would be before "Age", and "Male" would be before "Female".

  For backwards-compatibility reasons, if `sorting` is not specified, Open SDG assumes that you want "alphabetical".

  If you require more direct control over the sorting of your data columns/values, see the `data_schema` setting below.

### data_schema

_Optional_: If you need direct control of the sorting and/or validation of your data column/values, you can maintain individual "data schema" for selected indicators. Note that if this is omitted, all indicators will have an "inferred" data schema. So this setting is rarely used -- typically only in cases where you are not happy with the inferred data schema (such as if you are not happy with the order of the disaggregation controls in Open SDG).

The specifics of these "data schema" depend on which of the [data schema classes](https://github.com/open-sdg/sdg-build/tree/master/sdg/data_schemas) you use, which you can specify with the "class" option. The available classes are:

**DataSchemaInputSdmxDsd**: Use an SDMX DSD to import the data schema. Note that this single schema will apply to all indicators. The available parameters are:

  * `source`: The path or remote URL to the SDMX DSD. For example, this would use the global DSD:

          data_schema:
            class: DataSchemaInputSdmxDsd
            source: 'https://registry.sdmx.org/ws/public/sdmxapi/rest/datastructure/IAEG-SDGs/SDG/latest/?format=sdmx-2.1&detail=full&references=children'

**DataSchemaInputTableSchemaYaml**: Import data schema from a folder of YAML files following the [Table Schema spec](https://specs.frictionlessdata.io/table-schema/) and named according to their indicator (eg, "1-1-1.yml"). Note that each of these files applies to only one particular indicator. Indicators that do not have a data schema file will get an "inferred" schema based on its data. The available parameters are:

  * `source`: The folder/file pattern to use to load the files. For example, this would use a local folder called "data-schema":

          data_schema:
            class: DataSchemaInputTableSchemaYaml
            source: data-schema/*.yml

### docs_baseurl

**_Required_**: A baseurl to put at the beginning of all absolute links in the "data documentation" website. If this is not set then there may be some incorrect links in the "data documentation". This is usually the name of your data repository, after a slash. For example, if your data repository is "data", then this should be:

```nohighlight
docs_baseurl: /data
```

### docs_branding

_Optional_: This setting controls the title which displays at the top of the data documentation website. The default if omitted is shown below:

```nohighlight
docs_branding: Build docs
```

### docs_extra_disaggregation

_Optional_: An optional list of extra columns that would not otherwise be included in the data documentation website's "disaggregation report". Common columns included here are the Series and/or Units columns (SERIES and UNIT_MEASURE, if using SDMX column names) since they would not normally be considered "disaggregation", but are still useful to include in this report. For example:

```nohighlight
docs_extra_disaggregation:
  - Series
  - Units
```

### docs_intro

_Optional_: This adds an introductory paragraph on the homepage of the data documentation website. If omitted, no introductory paragraph will appear. Here is an example:

```nohighlight
docs_intro: This is a list of examples of endpoints and output that are
  available on this service. Click each of the links below for more information
  on the available output.
```

### docs_indicator_url

_Optional_: This can be used to convert any indicator IDs in the data documentation website into actual links to your implementation's indicator pages. If omitted, the indicator IDs will not be hyperlinked. Here is an example:

```nohighlight
docs_indicator_url: https://my-github-org.github.io/my-site-repository/[id]
```

### docs_subfolder

_Optional_: This can be used to put your documentation website into a subfolder. This is rarely used. Typically it is only used if you have combined your data repository and site repository into one single repository. Eg:

```nohighlight
docs_subfolder: my-subfolder
```

### docs_translate_disaggregations

_Optional_: If set to true, then the documentation website's "disaggregation report" will include extra columns showing the translations of each disaggregation into the languages you specified in `languages`. For example:

```nohighlight
docs_translate_disaggregations: true
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

### indicator_export_filename

Open SDG will automatically convert all data to CSV and provide a zip file. This setting controls the name of that file. Note that the ".zip" extension should not be added here. The following example shows the default, if omitted:

```nohighlight
indicator_export_filename: all_indicators
```

### indicator_options

_Optional_: This controls how your indicators are loaded. The available parameters are:

* non_disaggregation_columns: This specifies a list of columns that should not be considered disaggregations.
* series_column: The name of the data column that should be considered the series. Historically this has been "Series", but if your data source is SDMX then it may be "SERIES".
* unit_column: The name of the data column that should be considered the unit of measurement. Historically this has been "Units", but if your data source is SDMX then it may be "UNIT_MEASURE".

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
  series_column: Series
  unit_column: Units
```

### inputs

_Optional_: This setting identifies the source (or sources) of your data and metadata. This can be omitted if you are using the legacy Open SDG approach of CSV data and YAML/markdown metadata, _but it is strongly recommended to specify your inputs using this setting_. This is required if you are using any other input, such as SDMX or Word templates.

Each item must have a "class" which corresponds to classes in the [/sdg/inputs folder of the sdg-build library](https://github.com/open-sdg/sdg-build/tree/master/sdg/inputs). Further, each item can have any/all of the parameters that class uses. Below are full descriptions of all the possible inputs and their corresponding parameters.

The following parameters can be used for any input:

* `column_map`: The path to a local CSV file which contains two columns: "Text" and "Value". This will be used to change the names of any data columns. For example, the following will change any data column named "Foo" to "Bar":

        Text,Value
        Foo,Bar

* `code_map`: The path to a local CSV file which contains three columns: "Text", "Dimension", and "Value". This will be used to change the names of any data cells, where "Dimension" is the column name. For example, the following will change any data cell named "Foo" into "Bar" if it is found in the "Baz" column:

        Text,Dimension,Value
        Foo,Baz,Bar

* `request_params`: Options to apply to any remote HTTP requests that may happen during the input's execution. These options are detailed in the [urllib.request.Request](https://docs.python.org/3/library/urllib.request.html#urllib.request.Request) documentation. For example, the following could give a custom HTTP header:

        request_params:
          headers:
            My-Custom-Header: my-value

Now here are specific descriptions and parameters available for each class:

**InputCkan**: Input data from a [CKAN](https://ckan.org/) service. The available parameters are:

  * `endpoint`: The remote URL of the endpoint for fetching indicators.
  * `indicator_id_map`: Map of API ids (such as "resource ids") to indicator ids.
  * `post_data`: Key/value pairs which will be passed as a payload in a POST request, rather than the usual GET request.
  * `year_column`: The name of the column which will be changed to "Year".
  * `value_column`: The name of the column which will be changed to "Value".
  * `sleep`: Number of seconds to wait in between each request.

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

**InputSdgMetadata**: Input metadata from a folder or repository of subfolders that follow the same pattern as the [SDG Metadata](https://github.com/worldbank/sdg-metadata) project. Specifically, each subfolder must be a language code (like `en`), and each language folder contains one YAML file per indicator, named like `1-1-1.yml`.

  * `source`: The local path or remote Git repository.
  * `tag`: If using a Git repository, the Git tag to use.
  * `branch`: If using a Git repository, the Git branch to use.
  * `repo_subfolder`: If using a Git repository, the name of the folder within the repo to use as the main folder.
  * `default_language`: Which language is your site's main language.

> For more technical information see the [InputSdgMetadata class definition](https://github.com/open-sdg/sdg-build/blog/master/sdg/inputs/InputSdgMetadata.py).

**InputSdmxJson**: Input data from an SDMX-JSON file or endpoint. The available parameters are:

  * `source`: Remote URL of the SDMX source, or path to local SDMX file.
  * `drop_dimensions`: List of SDMX dimensions/attributes to ignore
  * `drop_singleton_dimensions`: Whether to drop dimensions/attributes with only 1 variation
  * `dimension_map`: Map of SDMX ids to human-readable names. For dimension names, the key is simply the dimension id. For dimension value names, the key is the dimension id and value id, separated by a pipe (|). This also includes attributes.
  * `indicator_id_map`: A map of SDMX series codes to indicator ids. Normally this is not needed, but sometimes the DSD may contain typos or mistakes, or the DSD may not contain any reference to the indicator ID numbers. This need not contain all indicator ids, only those that need it. If a particular series should be mapped to multiple indicators, then they can be a list of strings. Otherwise each indicator is a string.
  * `import_names`: Whether to import names. Set to false to rely on global names.
  * `import_codes`: Whether to import codes instead of text values. If left false, text values are imported instead, taken from the first language in the DSD. This is strongly recommended to be set to true.
  * `import_series_attributes`: Recommended to be set to true.
  * `import_observation_attributes`: Recommended to be set to true.
  * `dsd`: Remote URL of the SDMX DSD (data structure definition) or path to local file.
  * `indicator_id_xpath`: An xpath query to find the indicator id within each Series code.
  * `indicator_name_xpath`: An xpath query to find the indicator name within each Series code.

> For more technical information see the [InputSdmxJson class definition](https://github.com/open-sdg/sdg-build/blob/master/sdg/inputs/InputSdmxJson.py), an [example of InputSdmxJson configuration](https://github.com/open-sdg/sdg-build/blob/master/docs/examples/open_sdg_config_sdmx.yml#L29), and an [example of using InputSdmxJson in Python code](https://github.com/open-sdg/sdg-build/blob/master/docs/examples/sdmx_json.py).

**InputSdmxMeta**: Input metadata from SDMX, either remote inputs or a local file. The available parameters are the same as in InputSdmxJson.

> For more technical information see the [InputSdmxMeta class definition](https://github.com/open-sdg/sdg-build/blog/master/sdg/inputs/InputSdmxMeta.py).

**InputSdmxMl_Multiple**: Input data from multiple SDMX-ML files (which can be a mix of either "Structure" or "Structure Specific"). The available parameters are the same as in InputSdmxJson, along with these additional parameters:

  * `path_pattern`: Same as described above in other inputs.

> For more technical information see the [InputSdmxMl_Multiple class definition](https://github.com/open-sdg/sdg-build/blob/master/sdg/inputs/InputSdmxMl_Multiple.py).

**InputSdmxMl_Structure**: Input data from an SDMX-ML Structure file. The available parameters are the same as in InputSdmxJson.

> For more technical information see the [InputSdmxMl_Structure class definition](https://github.com/open-sdg/sdg-build/blob/master/sdg/inputs/InputSdmxMl_Structure.py), and an [example of using InputSdmxMl_Structure in Python code](https://github.com/open-sdg/sdg-build/blob/master/docs/examples/sdmx_ml.py).

**InputSdmxMl_StructureSpecific**: Input data from an SDMX-ML Structure Specific (also known as "Compact") file. The available parameters are the same as in InputSdmxJson.

> For more technical information see the [InputSdmxMl_StructureSpecific class definition](https://github.com/open-sdg/sdg-build/blob/master/sdg/inputs/InputSdmxMl_StructureSpecific.py).

**InputSdmxMl_UnitedNationsApi**: Input data from the United Nations Global SDG Database. The available parameters are the same as in InputSdmxJson, plus the following:

  * `reference_area`: The SDMX in the REF_AREA dimension. Defaults to '1' (world).
  * `dimension_query`: Key/value pairs for SDMX dimensions to use in generating the query. For details see the [UN SDG API manual](https://unstats.un.org/sdgs/files/SDMX_SDG_API_MANUAL.pdf).

> For more technical information see the [InputSdmxMl_UnitedNationsApi class definition](https://github.com/open-sdg/sdg-build/blog/master/sdg/inputs/InputSdmxMl_UnitedNationsApi.py).

**InputWordMeta**: Input data from the [Microsoft Word templates](https://github.com/sdmx-sdgs/metadata) popular for SDG metdata. The available parameters are the same as InputCsvMeta.

> For more technical information see the [InputWordMeta class definition](https://github.com/open-sdg/sdg-build/blog/master/sdg/inputs/InputWordMeta.py).

**InputYamlMeta**: Input metadata from YAML files. The available parameters are the same as InputCsvMeta.

> For more technical information see the [InputYamlMeta class definition](https://github.com/open-sdg/sdg-build/blog/master/sdg/inputs/InputYamlMeta.py).

**InputYamlMdMeta**: Input metadata from a folder of YAML/Markdown files. The available parameters are the same as in InputCsvMeta.

Note that YAML/Markdown files should have a `---` at the bottom. Any Markdown text below that line will be used as the `page_content` metadata field.

> For more technical information see the [InputYamlMdMeta class definition](https://github.com/open-sdg/sdg-build/blob/master/sdg/inputs/InputYamlMdMeta.py) and an [example of InputYamlMdMeta configuration](https://github.com/open-sdg/sdg-build/blob/master/docs/examples/open_sdg_config.yml#L33).

**Defaults**: As mentioned above, this `inputs` setting is optional. The defaults below show what is assumed if `inputs` is omitted entirely. Note that these defaults should not be considered the recommended approach -- they are left only for backwards compatibility.

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

_Optional_: This setting corresponds exactly to the [language setting in the site configuration](configuration.md#languages). It is technically optional, but **strongly recommended**, and will be required in future releases. If you use this setting, your data will be translated and placed in language subfolders. For more information on how this translation works, see documentation on [translating metadata](translation.md#translating-indicator-metadata) and [translating data](translation.md#translating-data-disaggregations-and-columns).

```nohighlight
languages:
  - es
  - en
```

### logging

_Optional_: This determines the types of logs that will appear when the Python code is running to perform these "builds". The available log types are:

  * `warn`: Show warnings - ie, things that may be problems but that are not so bad that they halt the build.
  * `debug`: Show more details on every step of the build - usually used to help with development of sdg-build.

The default is just "warn". So if omitted, the following is assumed:

```nohighlight
logging:
  - warn
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

### schema

_Optional_: This can be used as an alternative to the `schema_file` setting. Whereas `schema_file` needs to point to a particular type of schema (the _prose.yml style) the `schema` setting can point to any of the sdg-build schema inputs (described below).

This setting can even point to multiple schemas. Each item must have a "class" which corresponds to classes in the [/sdg/schemas folder of the sdg-build library](https://github.com/open-sdg/sdg-build/tree/master/sdg/schemas). Further, each item can have any/all of the parameters that class uses. Below are full descriptions of all the possible translations and their corresponding parameters:

**SchemaInputOpenSdg**: Input a metadata schema from the Prose.io-style schema, historically called `_prose.yml`. The available parameters are:

  * `schema_path`: A path (remote or local) to the schema file or endpoint
  * `scope`: Which metadata scope the fields should apply to. Not usually used here, since "scope" can be assigned in the Prose.io schema per field.
  * `request_params`: Only used in the case of a remote schema_path, to control the behavior of the HTTP request. Not usually used since the Prose.io schema is typically a local file.

> For more technical information see the [SchemaInputOpenSdg class definition](https://github.com/open-sdg/sdg-build/blob/master/sdg/schemas/SchemaInputOpenSdg.py).

**SchemaInputSdmxMsd**: Input a metadata schema from an SDMX metadata structure definition. The available parameters are:

  * `schema_path`: A path (remote or local) to the schema file or endpoint
  * `scope`: Which metadata scope the fields should apply to. This is necessary here, since the MSD has no idea about the Open SDG concept of "scope".
  * `request_params`: Only used in the case of a remote schema_path, to control the behavior of the HTTP request.

> For more technical information see the [SchemaInputSdmxMsd class definition](https://github.com/open-sdg/sdg-build/blob/master/sdg/schemas/SchemaInputSdmxMsd.py).

Example:

```nohighlight
schema:
  - class: SchemaInputOpenSdg
    schema_path: _prose.yml
  - class: SchemaInputSdmxMsd
    schema_path: https://example.com/my-msd-file.xml
    scope: national
    request_params:
      headers:
        My-Custom-Header: my-value
```

### schema_file

_Optional_: This identifies a file containing the schema (possible fields) for metadata. Currently this needs to be a prose.io config, and defaults to '_prose.yml'. Note that if you are using the `schema` setting described above, you do not need to use `schema_file` (and vice versa).

```nohighlight
schema_file: _prose.yml
```

### site_dir

_Optional_: This identifies a directory to hold the "built" files. The default is '_site' and you usually do not need to change this.

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

**TranslationInputSdmxMsd**: Input translations from an SDMX MSD (metadata structure definition) file. The available parameters are:

  * `source`: The location of the SDMX MSD file (either local or remote).

> For more technical information see the [TranslationInputSdmxMsd class definition](https://github.com/open-sdg/sdg-build/blob/master/sdg/translations/TranslationInputSdmxMsd.py).

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
