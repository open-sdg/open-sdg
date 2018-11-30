# Translation

This platform is designed to be multilingual, and leverages the translations being maintained in [a separate repository](https://github.com/OpenDataEnterprise/sdg-translations). This document provides an overview of how the platform accomplishes this, and how it can be extended.

## Translation data

In order to compile the platform in multiple languages, Jekyll needs the translations themselves. This platform leverages translations from [this repository](https://github.com/OpenDataEnterprise/sdg-translation).

> An important note about the sdg-translation repository: Each translation receives
> a "key" which can uniquely identify it. This is important to the mechanism for
> using these translations throughout this theme.

There are 2 ways to get this translation data into Jekyll.

1. Manually copy the [translations folder](https://github.com/OpenDataEnterprise/sdg-translations/tree/develop/translations) into your [data folder](https://jekyllrb.com/docs/datafiles/).
2. (Recommended) Use a Jekyll plugin, such as [Jekyll Get](https://github.com/18F/jekyll-get), to pull in the [json data](https://opendataenterprise.github.io/sdg-translations/translations.json) at build time.

Note that the [sdg-indicators-starter](https://github.com/OpenDataEnterprise/sdg-indicators-starter) comes pre-configured to use approach #2 above.

## Setting up translation-related variables

The next key ingredient in the multilingual setup is the [multilingual.html](../../_includes/multilingual.html) include file. This sets up 4 variables to be used throughout the rest of the templates in this theme:

* `t`: For translating by "key" (more on this later)
* `default_language`: The 2-letter code for the default language
* `current_language`: The 2-letter code for the current language
* `baseurl_folder`: The subfolder that should be added for all internal links

## Using translated text in Jekyll templates

When writing Jekyll templates for this theme, there should never be any direct text written. For example, you should never see anything like this:

`<h1>Sustainable Development Goals</h1>`

Instead, you should see something like this:

`<h1>{{ t.general.sdg }}</h1>

The `t` variable contains a nested structure of translation values, corresponding to the folder structure of the [sdg-translations](https://github.com/OpenDataEnterprise/sdg-translations) repository. In the example above, the "general" refers to [this file](https://github.com/OpenDataEnterprise/sdg-translations/blob/develop/translations/en/general.yml), and the "sdg" refers to [that line within the file](https://github.com/OpenDataEnterprise/sdg-translations/blob/develop/translations/en/general.yml#L5).

In this way, Jekyll can compile pages in multiple languages.

## Overriding and extending translation data

To override translations, or to add new translations, simply add them in your site repository's data folder. Any new or overridden translations will be reflected in the `t` variable available to Jekyll templates. The folder/file hierarchy to follow corresponds to the [translations folder in the sdg-indicators repository](https://github.com/OpenDataEnterprise/sdg-translations/tree/develop/translations).

The following illustrates this:

```
<site repository>
\--<data folder>
   \--translations
      \--en
         \--foo.yml
      \--es
         \--foo.yml
```

And imagining that `en/foo.yml` contains this text:

```
hello: Hello World
```

And that `es/foo.yml` contains this text:

```
hello: Hola Mundo
```

Then you would be able to put something like this into Jekyll templates:

`<p>{{ t.foo.hello }}<p>`

> **NOTE**: If you make a translation that you think would be useful to others, please
> submit it as a pull-request in the [sdg-translations](https://github.com/OpenDataEnterprise/sdg-translations) repository!
