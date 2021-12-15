<h1>Upgrading to 1.6.0</h1>

This document is intended for developers, to help with the process of upgrading to version 1.6.0 of Open SDG, from 1.5.0 or higher.

## Upgrade data repository to sdg-build 1.6.0

In your data repository, update your `requirements.txt` file to:

```
git+git://github.com/open-sdg/sdg-build@1.6.0
```

## Upgrade translations to sdg-translations 1.6.0

In your data repository's config file, update the version of sdg-translations in the "translations" section:

```
translations:
  - class: TranslationInputSdgTranslations
    source: https://github.com/open-sdg/sdg-translations.git
    tag: 1.6.0
```

## Update version of Open SDG to 1.6.0

In your site repository's `_config.yml` file, update the version of Open SDG in `remote_theme`, like so:

```
remote_theme: open-sdg/open-sdg@1.6.0
```

## Update version of jekyll-open-sdg-plugins to 1.6.1

In your site repository's `Gemfile`, update the version of jekyll-open-sdg-plugins like so:

```
gem "jekyll-open-sdg-plugins", "1.6.1"
```

> Note the "1.6.1" above is intentional - that project needed a hotfix release.

## Recommended updates to the site configuration

If you would like to make use of the new metadata-reporting functionality, set the [`docs_metadata_fields` setting in the data configuration](https://open-sdg.readthedocs.io/en/latest/data-configuration/#docs_metadata_fields). This feature is optional.

If you would like to try the new progress-reporting functionality, see the [`progress_status` setting in the site configuration](https://open-sdg.readthedocs.io/en/latest/configuration/#accessible_tabs). This feature is also optional.
