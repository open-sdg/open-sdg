<h1>Upgrading to 2.1.0-beta1</h1>

This document is intended for developers, to help with the process of upgrading to version 2.1.0-beta1 of Open SDG, from 2.0.0 or higher.

## Upgrade data repository to sdg-build 2.1.0-beta2

In your data repository, update your `requirements.txt` file to:

```
git+https://github.com/open-sdg/sdg-build@2.1.0-beta2
```

## Upgrade translations to sdg-translations 2.1.0-beta1

In your data repository's config file, update the version of sdg-translations in the "translations" section:

```
translations:
  - class: TranslationInputSdgTranslations
    source: https://github.com/open-sdg/sdg-translations.git
    tag: 2.1.0-beta1
```

## Update version of Open SDG to 2.1.0-beta1

In your site repository's `_config.yml` file, update the version of Open SDG in `remote_theme`, like so:

```
remote_theme: open-sdg/open-sdg@2.1.0-beta1
```

## Update version of jekyll-open-sdg-plugins to 2.1.0-beta1

In your site repository's `Gemfile`, update the version of jekyll-open-sdg-plugins like so:

```
gem "jekyll-open-sdg-plugins", "2.1.0.pre.beta1"
```

## Recommended updates to the site configuration

* Empty metadata placeholders?
