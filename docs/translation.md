<h1>Translation</h1>

This platform is designed to be multilingual, and leverages the translations being maintained in [a separate repository](https://github.com/open-sdg/sdg-translations). This document provides an overview of how the platform accomplishes this, and how it can be extended.

## Translation data

In order to compile the platform in multiple languages, Jekyll needs the translations themselves. This platform leverages translations from [this project](https://open-sdg.github.io/sdg-translations).

> An important note about the sdg-translation project: Each translation receives
> a "translation key" which can uniquely identify it. This is important to the
> mechanism for using these translations throughout this platform.

There are 2 ways to get this translation data into Jekyll.

1. Manually copy the [translations folder](https://github.com/open-sdg/sdg-translations/tree/develop/translations) into your [data folder](https://jekyllrb.com/docs/datafiles/).
2. (Recommended) Use a Jekyll plugin, such as [Jekyll Get JSON](https://github.com/brockfanning/jekyll-get-json), to pull in the [json data](https://open-sdg.github.io/sdg-translations/translations.json) at build time.

Note that the [open-sdg-site-starter](https://github.com/open-sdg/open-sdg-site-starter) comes pre-configured to use approach #2 above.

## Adding new languages

There are 4 requirements for adding a new language to the platform

1. Make sure that the new language is implemented in the [SDG Translations project](https://open-sdg.github.io/sdg-translations). If it is not, you can fork that repository and implement the language yourself.
2. Make sure that translated goal icons have been created. These are should be included in the SDG Translations implementation mentioned above.
3. Add the new language in the 'languages' list in your `_config.yml` file.
4. Add new subdirectories for the translated goals, indicators, and pages, and populate them with content. NOTE: The [open-sdg-site-starter](https://github.com/open-sdg/open-sdg-site-starter) ships with a script to do this for you.

## Using translated text in Jekyll templates

When writing Jekyll templates for this platform, there should never be any direct text written. For example, you should never see anything like this:

`<h1>Sustainable Development Goals</h1>`

Instead, you should see something like this:

`<h1>{{ t.general.sdg }}</h1>`

The `t` variable contains a nested structure of translation values, corresponding to the folder structure of the [sdg-translations](https://github.com/open-sdg/sdg-translations) repository. In the example above, the "general" refers to [this file](https://github.com/open-sdg/sdg-translations/blob/develop/translations/en/general.yml), and the "sdg" refers to [that line within the file](https://github.com/open-sdg/sdg-translations/blob/develop/translations/en/general.yml#L5).

Jekyll will display translated text according to the "language" specified in the "front matter" of the current document.

## Translating variables in Jekyll templates

Sometimes you may need to translate something that exists as a Liquid variable in a Jekyll template. This can be accomplished using the "t" filter, that is provided by the [jekyll-open-sdg-plugins](https://github.com/open-sdg/jekyll-open-sdg-plugins) Ruby gem. A contrived example of how this works is as follows:

```
{% assign foo = "general.sdg" %}
<h1>{{ foo | t }}</h1>
```

## Translating indicator metadata

There are two methods available for translating metadata. Both are equally valid, and you are free to use one or both, depending on your preferences.

### 1. Translating indicator metadata via subfolders

Using this approach, for each language (other than the default language) you will create a subfolder inside the `meta` folder of your data repository, containing corresponding versions of each indicator. For example:

```lang-none
meta
└─1-1-1.md (this contains the metadata in your default language)
└─es
  └─1-1-1.md (this contains any Spanish translations of the metadata)
└─fr
  └─1-1-1.md (this contains any French translations of the metadata)
```

NOTE: The translated versions in the subfolders need not contain every metadata field. They only need to contain the fields that you want translated.

### 2. Translating indicator metadata via translation keys

Using this approach, you put "translation keys" directly into the indicator metadata. For example, instead of:

```lang-yaml
un_custodian_agency: UN Habitat
```

You might do:

```lang-yaml
un_custodian_agency: agencies.un_habitat
```

Assuming that `agencies.un_habitat` refers to an actual key in your SDG Translations data, this will translate the field according to that data.

## Translation in Javascript

There is a global object `translations` available to your Javascript. It can be used similarly to the `t` variable in Liquid templates. For example:

`var translatedText = translations.general.sdg;`

It also includes a function `t()` which can be used similarly to the `t` Liquid filter. For example:

```
var translationKey = 'general.sdg';
var translatedText = translations.t(translationKey);
```

NOTE: In contrast to Jekyll, any translation keys you will need in Javascript need to be "imported" before they can be used. The mechanism for importing translating keys is the Jekyll include `multilingual-js.html`. You can use this to import an entire translation group. For example, this is how you can import all the translation keys in the "general" group:

```
{% include multilingual-js.html key="general" %}
```

## Translating data disaggregations and columns

To translate the disaggregations and columns in your data (such as "Age", "Sex", "Female", etc.) you will need to make sure that the disaggregation values in your CSV files correspond to translation keys. For example, instead of a column called `Sex` you could call it `data.sex`. Assuming that `data.sex` refers to an actual key in your SDG Translations data, this will translate the disaggregation according to that data.

Similarly, instead of a values like `Female`, you could use `data.female` to correspond to a translation by that key.

> NOTE: There is a shortcut available here. Because data disaggregations/columns
> will almost always refer to the `data` group, you can actually leave the `data.`
> off.

## Available translation-related variables

In addition to the `t` variable for displaying translations, there are 3 other Liquid variables of general use:

* `default_language`: The 2-letter code for the default language
* `current_language`: The 2-letter code for the current language
* `baseurl_folder`: The subfolder that should be added for all internal links

These variables are available in all Jekyll documents.

## Overriding and extending translation data

Inevitably an implementation of this platform will need to display some text that is not already included in the SDG Translations project, and that is likely specific to a particular country. The recommended way to accomplish this is to fork the SDG Translations repository. Once forked, you can add new translation files custom to your implementation.

It is recommended that you limit the changes in your fork of SDG Transations to new files only -- and refrain from changing existing files. The reason for this approach is to make it easier to merge in the latest upstream updates, should any occur.

> **NOTE**: If you make a translation that you think would be useful to others, please
> submit it as a pull-request in the [sdg-translations](https://github.com/open-sdg/sdg-translations) repository!
