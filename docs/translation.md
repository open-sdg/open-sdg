<h1>Translation</h1>

This platform is designed to be multilingual, and leverages the translations being maintained in separate repositories:

1. [Open SDG specific translations](https://github.com/open-sdg/translations-open-sdg)
2. [Translations of UN global metadata](https://github.com/open-sdg/translations-un-sdg)

This document provides an overview of how the platform accomplishes this, and how it can be extended.

Throughout this discussion of translation, there will be repeated mention of "translation keys". See [here](https://open-sdg.readthedocs.io/en/latest/glossary/#translation-keys) for a definition.

## Translation data

In order to compile the platform in multiple languages, Jekyll needs the translations themselves. The recommended way to pull in the translations is through the data repository. Note that the [open-sdg-data-starter](https://github.com/open-sdg/open-sdg-data-starter) comes pre-configured to use this approach.

## Adding new languages

There are 4 requirements for adding a new language to the platform

1. Check that the new language is implemented in the two repositories mentioned above. If it is not, you can copy those repositories and implement the language yourself.
    * Specifically, you will need to translate all the YAML files in [this folder](https://github.com/open-sdg/translations-open-sdg/tree/master/translations/en) and [this folder](https://github.com/open-sdg/translations-un-sdg/tree/master/translations/en).
2. Make sure that translated goal icons have been created. These are currently maintained [here](https://github.com/open-sdg/translations-un-sdg/).
    * Specifically, you will need to produce translated versions of all the PNG files in [this folder](https://github.com/open-sdg/translations-un-sdg/tree/master/docs/assets/img/goals/en) and [this folder](https://github.com/open-sdg/translations-un-sdg/tree/master/docs/assets/img/high-contrast/goals/en) (for high contrast versions).
3. Add the new language in the 'languages' list in your site config (`_config.yml`) and data config (`config_data.yml`) files.
4. Create new versions of any Jekyll pages that you would like to have available in the new language. Note that the open-sdg-site-starter project includes a [script](https://github.com/open-sdg/open-sdg-site-starter/blob/develop/scripts/batch/add_language.py) to make this easier.

## Using translated text in Jekyll templates

When writing Jekyll templates for this platform, there should never be any direct text written. For example, you should never see anything like this:

`<h1>Sustainable Development Goals</h1>`

Instead, you should see something like this:

`<h1>{{ page.t.general.sdg }}</h1>`

The `page.t` variable contains a nested structure of translation values, corresponding to the folder structure of the repositories mentioned above. For example, in the example above, the "general" refers to [this file](https://github.com/open-sdg/translations-open-sdg/blob/master/translations/en/general.yml), and the "sdg" refers to [that line within the file](https://github.com/open-sdg/translations-open-sdg/blob/master/translations/en/general.yml#L9).

Jekyll will display translated text according to the "language" specified in the "front matter" of the current document.

## Translating variables in Jekyll templates

Sometimes you may need to translate something that exists as a Liquid variable in a Jekyll template. This can be accomplished using the "t" filter, that is provided by the [jekyll-open-sdg-plugins](https://github.com/open-sdg/jekyll-open-sdg-plugins) Ruby gem. A contrived example of how this works is as follows:

```
{% assign foo = "general.sdg" %}
<h1>{{ foo | t }}</h1>
```

Note that it is always safe to run variables through this `t` filter, even if you aren't sure whether it actually contains a translation key. If the variable doesn't actually contain a translation key, then it will be unchanged.

## Translating indicator metadata

The translate indicator metadata, you put "translation keys" directly into the indicator metadata. For example, instead of:

```lang-yaml
un_custodian_agency: UN Habitat
```

You might do:

```lang-yaml
un_custodian_agency: agencies.un_habitat
```

Assuming that `agencies.un_habitat` refers to an actual translation key in your translations, this will translate the field according to that entry.

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

To translate the disaggregations and columns in your data (such as "Age", "Sex", "Female", etc.) you will need to make sure that the disaggregation values in your CSV files correspond to translation keys. For example, instead of a column called `Sex` you could call it `data.Sex`. Assuming that `data.Sex` refers to an actual translations key in your translations, this will translate the disaggregation according to that entry.

Similarly, instead of a values like `Female`, you could use `data.Female` to correspond to a translation by that key.

> NOTE: There is a shortcut available here. Because data disaggregations/columns
> will almost always refer to the `data` group, you can actually leave the `data.`
> off.

## Available translation-related variables

In addition to the `page.t` variable for displaying translations, there are 3 other Liquid variables of general use:

* `page.language`: The 2-letter code for the current language
* `page.language_public`: Version of the code for use in public URLs
* `page.baseurl`: A version of site.baseurl including any language code

These variables are available in all Jekyll documents.

## Overriding and extending translation data

Inevitably an implementation of this platform will need to display some text that is not already included in the repositories mentioned above, and that is likely specific to a particular country. There are two recommended options for this:

1. Copy/fork one of the repositories mentioned above, and maintain your translations there.
2. Put the translations directly into your data repository, in a `translations` folder. See [here](https://github.com/open-sdg/open-sdg-data-starter/tree/develop/translations) for details.

> **NOTE**: If you make a translation that you think would be useful to others, please
> submit it as a pull-request!
