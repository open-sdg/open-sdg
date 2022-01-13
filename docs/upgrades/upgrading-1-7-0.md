<h1>Upgrading to 1.7.0</h1>

This document is intended for developers, to help with the process of upgrading to version 1.7.0 of Open SDG, from 1.6.0 or higher.

## Upgrade data repository to sdg-build 1.7.0

In your data repository, update your `requirements.txt` file to:

```
git+git://github.com/open-sdg/sdg-build@1.7.0
```

## Upgrade translations to sdg-translations 1.7.0

In your data repository's config file, update the version of sdg-translations in the "translations" section:

```
translations:
  - class: TranslationInputSdgTranslations
    source: https://github.com/open-sdg/sdg-translations.git
    tag: 1.7.0
```

## Update version of Open SDG to 1.7.0

In your site repository's `_config.yml` file, update the version of Open SDG in `remote_theme`, like so:

```
remote_theme: open-sdg/open-sdg@1.7.0
```

## Update version of jekyll-open-sdg-plugins to 1.7.0

In your site repository's `Gemfile`, update the version of jekyll-open-sdg-plugins like so:

```
gem "jekyll-open-sdg-plugins", "1.7.0"
```

## Recommended updates to the site configuration

This release contains a custom layout for 404 (page-not-found) pages. If you would like to use this layout, navigate to the `_pages` folder in the site repository and create a new file. As a guide you can use the [404 page in the starter repository](https://github.com/open-sdg/open-sdg-site-starter/blob/develop/_pages/404.md). Ensure that the `permalink` for the new page is `404.html`, just like it is in the starter repository.

## GitHub security policy change on 11 January 2022

Around the time of this release, GitHub instituted a new security policy which may affect older installations of Open SDG. For more information, please see these [instructions on how to fix problems caused by this change](https://open-sdg.org/blog/2022-01-11-fix-for-github-data-builds/).
