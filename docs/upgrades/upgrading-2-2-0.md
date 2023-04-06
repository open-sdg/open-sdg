<h1>Upgrading to 2.2.0</h1>

This document is intended for developers, to help with the process of upgrading to version 2.2.0 of Open SDG, from 2.1.0 or higher.

## Upgrade data repository to sdg-build 2.2.0

In your data repository, update your `requirements.txt` file to:

```
git+https://github.com/open-sdg/sdg-build@2.2.0-beta1
```

## Upgrade translations to sdg-translations 2.2.0

In your data repository's config file, update the version of sdg-translations in the "translations" section:

```
translations:
  - class: TranslationInputSdgTranslations
    source: https://github.com/open-sdg/sdg-translations.git
    tag: 2.2.0-beta1
```

## Update version of Open SDG to 2.2.0

In your site repository's `_config.yml` file, update the version of Open SDG in `remote_theme`, like so:

```
remote_theme: open-sdg/open-sdg@2.2.0-beta1
```

## Update version of jekyll-open-sdg-plugins to 2.2.0

In your site repository's `Gemfile`, update the version of jekyll-open-sdg-plugins like so:

```
gem "jekyll-open-sdg-plugins", "2.2.0.pre.beta1"
```

## Updating overridden files

If you are overriding certain files, you may need to adjust your version in order to benefit from the latest features, bugfixes, and design changes. If you are unsure, check the `_includes` and `_layouts` folders in your site repository. If they contain any of the following files, you may want to incorporate the latest changes into your overrides. The links below will show you the exact changes for each file.

[TODO]

Note that we strive to avoid any breaking changes, so this process of updating overridden files is optional. However we strongly recommend keeping your overridden files as current as possible.
