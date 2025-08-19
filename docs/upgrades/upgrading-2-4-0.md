<h1>Upgrading to 2.4.0</h1>

This document is intended for developers, to help with the process of upgrading to version 2.4.0 of Open SDG, from 2.3.0 or higher.

## Upgrade data repository to sdg-build 2.4.0

In your data repository, update your `requirements.txt` file to:

```
git+https://github.com/open-sdg/sdg-build@2.4.0
```

## Upgrade translations to sdg-translations 2.4.0

In your data repository's config file, update the version of sdg-translations in the "translations" section:

```
translations:
  - class: TranslationInputSdgTranslations
    source: https://github.com/open-sdg/sdg-translations.git
    tag: 2.4.0
```

## Update version of Open SDG to 2.4.0

In your site repository's `_config.yml` file, update the version of Open SDG in `remote_theme`, like so:

```
remote_theme: open-sdg/open-sdg@2.4.0
```

## Update version of jekyll-open-sdg-plugins to 2.4.0

In your site repository's `Gemfile`, update the version of jekyll-open-sdg-plugins like so:

```
gem "jekyll-open-sdg-plugins", "2.4.0"
```

## Updating overridden files

If you are overriding certain files, you may need to adjust your version in order to benefit from the latest features, bugfixes, and design changes. If you are unsure, check the `_includes` and `_layouts` folders in your site repository. If they contain any of the following files, you may want to incorporate the latest changes into your overrides. The links below will show you the latest changes for each file.

* [_includes/head.html](https://github.com/open-sdg/open-sdg/compare/2.3.0-dev...2.4.0-dev#diff-e241bda4e3c3c6dc1c0b00185b61f6ce19b5eb16e294dd955ca9fa6d01befb0e)
* [_includes/javascript-variables.html](https://github.com/open-sdg/open-sdg/compare/2.3.0-dev...2.4.0-dev#diff-e96a4a24ce2e1564e7270837c5a918377e2f6b428937ea0b02517fdd9239473e)
* [_includes/scripts.html](https://github.com/open-sdg/open-sdg/compare/2.3.0-dev...2.4.0-dev#diff-d2aabec5480c331c0119175a7e808edf76bfb7e63bf903691b6c5f4f84eb4476)
* [_layouts/config-builder.html](https://github.com/open-sdg/open-sdg/compare/2.3.0-dev...2.4.0-dev#diff-cfd16c1ebd077a07473ba538af4d790d819243bdf0d212cbd078b5fb602ff78b)
* [_layouts/data-editor.html](https://github.com/open-sdg/open-sdg/compare/2.3.0-dev...2.4.0-dev#diff-c65f37aeacf840ed2df9fa6171af20edfe03504795b26cd1c92c170c4d7bf326)
* [_layouts/search.html](https://github.com/open-sdg/open-sdg/compare/2.3.0-dev...2.4.0-dev#diff-f12837113109f2f0551117731fc0167534e09edbd8f768026accc824984c3597)

Note that we strive to avoid any breaking changes, so this process of updating overridden files is optional. However we strongly recommend keeping your overridden files as current as possible.

## New features

This release introduces some optional features that you may be interested in adding to your platform.

* Progress status auto-calculation: Previously the progress status of each indicator needed to be manually set. This release includes new functionality developed by Statistics Canada which allows the progress status to be automatically calculated, based on the indicator data and configuration options. [More information is available here](../progress.md).
* PXWeb integration: With this release, in collaboration with Statistics Faroe Islands we have added integration with the PxWeb platform via a direct parsing of PX files. This integration uses the PX files to import data, translations, and some metadata. [More information is available here](../tutorials/data-source-pxweb.md).

## Bug-fixes and improvements

* Indicator configuration form upgrade (#2104)
* Show yes/no on table if chart type is binary (#2135)
* Allow blank progress status (#2148)
* Do not export rows in data edit form with empty values (#2158)
* Use start values when changing series, unless there would be zero results (#2159)
* Add SRI hashes to script tags (#2164)
* Support languages_numbers setting and still use decimal_separator even after localString. (#2178)
* Allow configurable js library for config forms (#2181)
