<h1>Translation</h1>

This platform is designed to be multilingual can be fully translated into any number of languages. Here are the key parts of the platform that should be translated:

1. The user interface (buttons, labels, etc.)
2. Indicator data disaggregation
3. Indicator metadata and configuration
4. Icons for the 17 goals
5. Any custom pages
6. Site configurations


Each of these 5 parts has its own unique translation challenges. Open SDG's translation system is flexible, which can make it seem confusing. So this document will describe recommended approaches for each of the 5 parts. After learning these recommended approaches, however, you may decide to mix and match approaches as you see fit.

## Part 1: The user interface

The "user interface" includes things like buttons, labels, help text, and other bits and pieces. Because this part is obviously specific to Open SDG, we (the Open SDG team) manage this part. This is handled in a [separate repository](https://github.com/open-sdg/sdg-translations) which is maintained via Weblate at this address:

* [SDG Translations](https://hosted.weblate.org/projects/sdg-translations/)

The number of languages supported in SDG Translations is continually growing, as more languages are requested. Here are instructions on how to take advantage of SDG Translations.

First, check [SDG Translations](https://github.com/open-sdg/sdg-translations/tree/HEAD/translations) and see if the desired language is already there. If so, you can skip the next step.

If not, check to see if you can use [Weblate](https://hosted.weblate.org/projects/sdg-translations/) to add the translations. On Weblate, click on any of the "components", such as [General](https://hosted.weblate.org/projects/sdg-translations/general/). Press "Start new translation" at the bottom to get started, and then follow the prompts to choose your language.

You can then proceed to translate each "component" in Weblate, such as General, Calendar, etc. For more details on using Weblate, see the [official Weblate documentation](https://docs.weblate.org/en/latest/user/basic.html).

Note, in the rare case that your language is not available in Weblate, you will need to manually translate all of the YAML files from the [Github repository](https://github.com/open-sdg/sdg-translations) and then submit your translations as a pull-request.

Important note about machine translations: The translations in SDG Translations are initially performed as machine translations, and then reviewed and corrected by users (like you!). So, the Open SDG team cannot make any guarantees about the quality of these translations. We need the help of our users to confirm that the machine translations are correct, or to improve them as needed.

SDG Translations can be pulled into your platform simply with the [`translations` section of your data configuration file](data-configuration.md#translations). Here is an example pulling in version 2.3.0 of SDG Translations:

```
translations:
  - class: TranslationInputSdgTranslations
    source: https://github.com/open-sdg/sdg-translations.git
    tag: 2.3.0
```

## Part 2: Indicator data disaggregation

This part includes the human-readable labels for the breakdowns of the data. For example, this would include translation of the words "Sex", "Female", and "Male". These translations appear on the indicator pages, in charts, tables, and dropdowns.

The recommend approach for translating disaggregation is to use YAML files in a `translations` folder in your data repository. Inside this folder you should have subfolders -- one for each language. Within these subfolders you should have YAML files -- one for each breakdown.

Here is an illustration of this folder structure, using the example described above of the "Sex" breakdown, translated into English (en) and Spanish (es):

```
translations
    en
        Sex.yml
    es
        Sex.yml

```

The contents of these YAML files should contain key/value pairs that connect the codes from the data with human-readable labels. For example, take the following data in CSV format:

Year|Sex|Value
---|---|---
2023||50
2024||60
2023|F|25
2024|F|30
2023|M|25
2024|M|30

Given that the codes in the data are "F" and "M" respectively, this would be the contents of the English translation file (translations/en/Sex.yml):

```
F: Female
M: Male
```

And this woud be the contents of the Spanish translation file (translations/es/Sex.yml):

```
F: Mujeres
M: Hombres
```

Importantly though, these files should contain a translation of the breakdown itself. So the full Spanish file would be:

```
Sex: Sexo
F: Mujeres
M: Hombres
```

As you might imagine, consistency in the codes and breakdowns used in data is very important, since each individual code needs to be translated.

## Part 3: Indicator metadata and configuration

The translation of metadata may be the most time-consuming. Because metadata for each indicator are verbose and unique, you can expect the translation of metadata to be a significant undertaking.

The recommended approach for structuring the translations of metadata is fairly straightforward:

1. Place the metadata files for your default ("source") language in a "meta" folder in your data repository, named according to the indicator number.
2. Create a subfolder for each other language.
3. Place copies of the metadata in each of the language subfolders, and translate the content accordingly.

Here is an example of this folder structure, showing the metadata for 1.1.1 and a subfolder for a Spanish translation of 1.1.1:

```
meta
    1-1-1.yml
    es
        1-1-1.yml
```

Note that unlike with the "translations" folder above, the source language is not in a subfolder. In other words, notice how there is no English (en) subfolder.

The contents of these YAML files are what you might expect -- key/value pairs connecting metadata fields/codes with the content. For example:

```
SDG_GOAL: '<p>Objetivo 1: Poner fin a la pobreza en todas sus formas y en todo el
  mundo</p>'
SDG_TARGET: >-
  <p>Meta 1.1: De aquí a 2030, erradicar para todas las personas y en todo el mundo
  la pobreza extrema (actualmente se considera que sufren pobreza extrema las personas
  que viven con menos de 1,25 dólares de los Estados Unidos al día)</p>
SDG_INDICATOR: >-
  <p> Indicador 1.1.1: Proporción de la población que vive por debajo del umbral de
  pobreza internacional por sexo, edad, situación laboral y ubicación geográfica (urbana/rural)</p>
```

Notice the use of the `>-` syntax, which is useful for large amounts of metadata, especially when it contains special characters.

Notice also that the metadata content can contain HTML.

Finally, recognize that everything mentioned above can also be applied to your "indicator configuration" -- the files inside the `indicator-config` folder in your data repository. Much of the contents of this "indicator configuration" may be technical in nature and not meant to be human readable, but there are some fields (such as "graph_title" and "indicator_name") that could indeed benefit from translation. In this case, the structure and recommended approach is the same.

## Part 4: Icons for the 17 goals

Although it is not a best practice to include text inside of images, the 17 goal icons have historically contained shortened versions of the goal titles.

We try to maintain translated goal icons in the SDG Translations library (mentioned above). [Here are the languages that we currently have goal icons for](https://github.com/open-sdg/sdg-translations/tree/2.4.0-dev/www/assets/img/goals).

The ideal implementation of the icons is SVG format with a transparent background. This allows for the most flexibility in displaying the icons clearly to all users. The next best format, however, is PNG, followed by JPG.






Throughout this discussion of translation, there will be repeated mention of "translation keys". See the [glossary page in the "translation keys" section](glossary.md#translation-keys) for a definition.

## Translation data

In order to compile the platform in multiple languages, Jekyll needs the translations themselves. The recommended way to pull in the translations is through the data repository. Note that the [open-sdg-data-starter](https://github.com/open-sdg/open-sdg-data-starter) comes pre-configured to use this approach.

## Adding new languages

There are 4 steps in adding a new language to your platform

### 1. Add the language to SDG Translations

First, check [SDG Translations](https://github.com/open-sdg/sdg-translations/tree/1.4.0-dev/translations) and see if the desired language is already there. If so, you can skip to step 2.

Next, check to see if you can use [Weblate](https://hosted.weblate.org/projects/sdg-translations/) to add the translations. On Weblate, click on any of the "components", such as [General](https://hosted.weblate.org/projects/sdg-translations/general/). Press "Start new translation" at the bottom to get started, and then follow the prompts to choose your language.

You can then proceed to translate each "component" in Weblate, such as General, Calendar, etc. For more details on using Weblate, see the [official Weblate documentation](https://docs.weblate.org/en/latest/user/basic.html).

Note, if your language is not available in Weblate, you will need to manually translate all of the YAML files from the [Github repository](https://github.com/open-sdg/sdg-translations) and then submit your translations as a pull-request.

### 2. Make sure that translated goal icons have been created. These are currently maintained in [the sdg-translations project](https://github.com/open-sdg/sdg-translations/).

Specifically, you will need to produce translated versions of all the PNG files in [this folder of goal images](https://github.com/open-sdg/sdg-translations/tree/master/www/assets/img/goals/en) and [this folder of high-contrast goal images](https://github.com/open-sdg/sdg-translations/tree/master/www/assets/img/high-contrast/goals/en) (for high contrast versions).

Note that if you use the SVG format for the images, you do not need to make high-contrast versions.

### 3. Update data configuration

Add the new language in the 'languages' list in your data config (`config_data.yml`) file.

### 4. Translate site pages and posts

Create new versions of any files in the `_pages` and `_posts` folders of your site repository. Note that the open-sdg-site-starter project includes a [script](https://github.com/open-sdg/open-sdg-site-starter/blob/develop/scripts/batch/add_language.py) to make this easier.

### 5. Update site configuration

Add the new language in the 'languages' list in your site config (`_config.yml`).

## Using translated text in Jekyll templates

When writing Jekyll templates for this platform, there should never be any direct text written. For example, you should never see anything like this:

`<h1>Sustainable Development Goals</h1>`

Instead, you should see something like this:

`<h1>{{ page.t.general.sdg }}</h1>`

The `page.t` variable contains a nested structure of translation values, corresponding to the folder structure of the repositories mentioned above. For example, in the example above, the "general" refers to [this general.yml translation file](https://github.com/open-sdg/sdg-translations/blob/master/translations/en/general.yml), and the "sdg" refers to [that particular line within the translation file](https://github.com/open-sdg/sdg-translations/blob/master/translations/en/general.yml#L9).

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

### Alternative approach: subfolders

Another mechanism available for translating metadata is to place pre-translated versions of your metadata files into subfolders, named by the language. The pre-translated versions need not contain all the fields - only the particular fields that you have translated.

For example, suppose you have a metadata file called `1-1-1.md` containing the following:

```
indicator_name: My English indicator name
some_other_field: XYZ
```

If you want to translate the indicator name into Spanish, you could create a subfolder called `es` and place inside a file called `1-1-1.md` containing the following:

```
indicator_name: My Spanish indicator name
```

This will translate the indicator name into Spanish, but will leave `some_other_field` alone.

### Subfolders vs translation keys

You may be wondering which of the above approaches you should use - subfolders, or translation keys. The answer depends on your preference. You can use either approach - or even both approaches - as you see fit.

A practical tip: You may find that using translation keys is preferable for smaller pieces of content that are shared by multiple indicators. Translation keys work best here, because they allow you to maintain the translation in only one place. By contrast, using the subfolder approach would require you to copy/paste the translation into each metadata file in the subfolder.

However, the subfolder approach can be more straightforward and direct, may be preferable for larger chunks of content that are specific to one indicator only, such as indicator descriptions.

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

## Using site configurations inside translations or content

Sometimes you might want to utilize a site configuration setting inside a translation, such as `country.name` or `country.adjective`. You can do this by adding a `%` in front. For example, "Statistical data on the SDGs for %country.name". You can also use this approach in page content. For example, "For more information please contact %email_contacts.suggestions".

## Translating data disaggregations and columns

To translate the disaggregations and columns in your data (such as "Age", "Sex", "Female", etc.) you will need to make sure that the translations exist which correspond to your columns and disaggregation values. The translation of the column itself should be have a translation group and a key both named the same as the column. So for example, the translation key of a "Sex" column should be "Sex.Sex". The translation keys of each disaggregation value belong within the same translation group, eg: "Sex.Female" and "Sex.Male". So, for example, an English translation file which handles the "Sex" column might look like this:

```
Sex: Sex
Female: Female
Male: Male
```

While the Chinese version might look like:

```
Sex: 性别
Female: 女
Male: 男
```

Alternatively, you can use actual translation keys inside your data. For example, your CSV files can include things like "custom.my_translation_key" instead of a column name or disaggregation value. However the recommended approach is to have one translation group per column, as described above.

## Available translation-related variables

In addition to the `page.t` variable for displaying translations, there are 3 other Liquid variables of general use:

* `page.language`: The 2-letter code for the current language
* `page.language_public`: Version of the code for use in public URLs
* `page.baseurl`: A version of site.baseurl including any language code

These variables are available in all Jekyll documents.

## Overriding and extending translation data

Inevitably an implementation of this platform will need to display some text that is not already included in the repositories mentioned above, and that is likely specific to a particular country. There are two recommended options for this:

1. Maintain your translations in a `translations` folder of any Git repository. An easy way to get started with this is to copy the [sdg-translations](https://github.com/open-sdg/sdg-translations) project and then clear out the `translations` folder. More detail on this process is below.
2. Put the translations directly into your data repository, in a `translations` folder. See [this folder in the data starter](https://github.com/open-sdg/open-sdg-data-starter/tree/develop/translations) for an example.

Whichever approach you take, make sure to adjust your data repository's configuration as needed. See this [example of a data repository's translation configuration](https://github.com/open-sdg/open-sdg-data-starter/blob/develop/config_data.yml#L66).

> **NOTE**: If you make a translation that you think would be useful to others, please
> submit it as a pull-request!

### Maintaining translation data in a separate repository

An implementation of Open SDG can pull its translations from any number of Git repositories. Out of the box, the starter repositories are configured to pull translations from the [sdg-translations](https://github.com/open-sdg/sdg-translations) project. To see an example, see [that part of the data starter configuration](https://github.com/open-sdg/open-sdg-data-starter/blob/develop/config_data.yml#L69).

However as mentioned above, you likely will need custom translations of text that are specific to your region. For a direct approach, as mentioned above, you can add these translations directly to a `translations` folder in the data repository. The starter repository is configured to pull translations from this folder, if it exists (see [that part of the data starter configuration](https://github.com/open-sdg/open-sdg-data-starter/blob/develop/config_data.yml#L73)).

But perhaps you would prefer to maintain your translations in a separate Git repository. The recommended approach here is to copy [sdg-translations](https://github.com/open-sdg/sdg-translations) by going there and clicking the green "Use this template" button. This will allow you to name it whatever you would like, and will give you an exact copy of sdg-translations.

You likely don't want to maintain *all* of the translations in sdg-translations, so it is recommended that you clear out the contents of the `translations` folder of your copied version. Next, you can add only the translations that you need. Then, you will need to update your data repository configuration so that it pulls from sdg-translations **AND** your copied version.

For example, if you named your copied version `my-github-org/my-translations-repo`, then you would update your data repository configuration from this:

```
translations:
  - class: TranslationInputSdgTranslations
    source: https://github.com/open-sdg/sdg-translations.git
    tag: master
```

...to this:

```
translations:
  - class: TranslationInputSdgTranslations
    source: https://github.com/open-sdg/sdg-translations.git
    tag: master
  - class: TranslationInputSdgTranslations
    source: https://github.com/my-github-org/my-translations-repo.git
    tag: master

```

Note that because your copied version is *after* the sdg-translations entry, you can "override" anything in the sdg-translations project by duplicating (and changing) it in your copied version.

Also note, as a good practice you should point at "tags" (such as "1.0.0") instead of "branches" (such as "master"). In other words, a better configuration would be something like:

```
translations:
  - class: TranslationInputSdgTranslations
    source: https://github.com/open-sdg/sdg-translations.git
    tag: 1.0.0
  - class: TranslationInputSdgTranslations
    source: https://github.com/my-github-org/my-translations-repo.git
    tag: 1.0.0

```
