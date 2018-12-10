<h1>Translation</h1>

This platform is designed to be multilingual, and leverages the translations being maintained in [a separate repository](https://github.com/open-sdg/sdg-translations). This document provides an overview of how the platform accomplishes this, and how it can be extended.

## Translation data

In order to compile the platform in multiple languages, Jekyll needs the translations themselves. This platform leverages translations from [this project](https://open-sdg.github.io/sdg-translations).

> An important note about the sdg-translation project: Each translation receives
> a "key" which can uniquely identify it. This is important to the mechanism for
> using these translations throughout this platform.

There are 2 ways to get this translation data into Jekyll.

1. Manually copy the [translations folder](https://github.com/open-sdg/sdg-translations/tree/develop/translations) into your [data folder](https://jekyllrb.com/docs/datafiles/).
2. (Recommended) Use a Jekyll plugin, such as [Jekyll Get](https://github.com/18F/jekyll-get), to pull in the [json data](https://open-sdg.github.io/sdg-translations/translations.json) at build time.

Note that the [open-sdg-site-starter](https://github.com/open-sdg/open-sdg-site-starter) comes pre-configured to use approach #2 above.

## Adding new languages

There are 4 requirements for adding a new language to the platform

1. Make sure that the new language is implemented in the [SDG Translations project](https://open-sdg.github.io/sdg-translations). If it is not, you can fork that repository and implement the language yourself.
2. Make sure that translated goal icons have been created in this platform. These can be found [here](https://github.com/open-sdg/open-sdg/tree/master/assets/img/goals) and [here](https://github.com/open-sdg/open-sdg/tree/master/assets/img/high-contrast/goals) (high-contrast versions).
3. Add the new language in the 'languages' list in your `_config.yml` file.
4. Add new subdirectories for the translated goals, indicators, and pages, and populate them with content. NOTE: The [open-sdg-site-starter](https://github.com/open-sdg/open-sdg-site-starter) ships with a script to do this for you.

## Using translated text in Jekyll templates

When writing Jekyll templates for this platform, there should never be any direct text written. For example, you should never see anything like this:

`<h1>Sustainable Development Goals</h1>`

Instead, you should see something like this:

`<h1>{{ t.general.sdg }}</h1>

The `t` variable contains a nested structure of translation values, corresponding to the folder structure of the [sdg-translations](https://github.com/open-sdg/sdg-translations) repository. In the example above, the "general" refers to [this file](https://github.com/open-sdg/sdg-translations/blob/develop/translations/en/general.yml), and the "sdg" refers to [that line within the file](https://github.com/open-sdg/sdg-translations/blob/develop/translations/en/general.yml#L5).

Jekyll will display translated text according to the "language" specified in the "front matter" of the current document.

## Available translation-related variables

In addition to the `t` variable for displaying translations, there are 3 other variables of general use:

* `default_language`: The 2-letter code for the default language
* `current_language`: The 2-letter code for the current language
* `baseurl_folder`: The subfolder that should be added for all internal links

These variables are available in all Jekyll documents.

## Overriding and extending translation data

Inevitably an implementation of this platform will need to display some text that is not already included in the SDG Translations project, and that is likely specific to a particular country. The recommended way to accomplish this is to fork the SDG Translations repository. Once forked, you can add new translation files custom to your implementation.

It is recommended that you limit the changes in your fork of SDG Transations to new files only -- and refrain from changing existing files. The reason for this approach is to make it easier to merge in the latest upstream updates, should any occur.

> **NOTE**: If you make a translation that you think would be useful to others, please
> submit it as a pull-request in the [sdg-translations](https://github.com/open-sdg/sdg-translations) repository!
