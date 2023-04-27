<h1>Upgrading to 2.2.0</h1>

This document is intended for developers, to help with the process of upgrading to version 2.2.0 of Open SDG, from 2.1.0 or higher.

## Upgrade data repository to sdg-build 2.2.0

In your data repository, update your `requirements.txt` file to:

```
git+https://github.com/open-sdg/sdg-build@2.2.0
```

## Upgrade translations to sdg-translations 2.2.0

In your data repository's config file, update the version of sdg-translations in the "translations" section:

```
translations:
  - class: TranslationInputSdgTranslations
    source: https://github.com/open-sdg/sdg-translations.git
    tag: 2.2.0
```

## Update version of Open SDG to 2.2.0

In your site repository's `_config.yml` file, update the version of Open SDG in `remote_theme`, like so:

```
remote_theme: open-sdg/open-sdg@2.2.0
```

## Update version of jekyll-open-sdg-plugins to 2.2.0

In your site repository's `Gemfile`, update the version of jekyll-open-sdg-plugins like so:

```
gem "jekyll-open-sdg-plugins", "2.2.0"
```

## Updating overridden files

If you are overriding certain files, you may need to adjust your version in order to benefit from the latest features, bugfixes, and design changes. If you are unsure, check the `_includes` and `_layouts` folders in your site repository. If they contain any of the following files, you may want to incorporate the latest changes into your overrides. The links below will show you the latest changes for each file.

* [_includes/assets/js/indicatorInit.js](https://github.com/open-sdg/open-sdg/compare/2.1.0-dev...2.2.0-dev#diff-d3270eb1675e4923dfa8f3909cd0382c3998f8ccdbfcdf80945977d69b348587)
* [_includes/assets/js/indicatorModel.js](https://github.com/open-sdg/open-sdg/compare/2.1.0-dev...2.2.0-dev#diff-899e3bbfb5eeef11ac59cd311c1cf8fa874cb773986b5982832f44ff68f04a8d)
* [_includes/assets/js/indicatorView.js](https://github.com/open-sdg/open-sdg/compare/2.1.0-dev...2.2.0-dev#diff-acba7023c8817a67d9425348551a51700b2bdb142fad73af0bfb272bbdd08a01)
* [_includes/assets/js/mapView.js](https://github.com/open-sdg/open-sdg/compare/2.1.0-dev...2.2.0-dev#diff-4fc5a820f12b634018e2047fcc6eb1d47d5d8c8a8bb7b0f1d2c6a16ebae5a3af)
* [_includes/assets/js/plugins/jquery.sdgMap.js](https://github.com/open-sdg/open-sdg/compare/2.1.0-dev...2.2.0-dev#diff-090de3bceb9b3c5022e042a3d45e82f32e68f7e0c63ca881da87eb4bfec071a3)
* [_includes/assets/js/plugins/leaflet.disaggregationControls.js](https://github.com/open-sdg/open-sdg/compare/2.1.0-dev...2.2.0-dev#diff-9204baadb9a4b331bcb7bd572063083f64b02abcc94dd9b7c5a6608a738f27a2)
* [_includes/assets/js/view/chartHelpers.js](https://github.com/open-sdg/open-sdg/compare/2.1.0-dev...2.2.0-dev#diff-57ca50c7583a665d330ac4d254cffa269768af5b0a14612501fa2c1bae4ddcd2)
* [_includes/assets/js/view/constants.js](https://github.com/open-sdg/open-sdg/compare/2.1.0-dev...2.2.0-dev#diff-270ab36c059ac58980a0fd2e9282f25b69419f3b178470b58d8ac042fa245d64)
* [_includes/assets/js/view/helpers.js](https://github.com/open-sdg/open-sdg/compare/2.1.0-dev...2.2.0-dev#diff-a72fa66c288892e54b7da213ab409c0548ec0a9ec112e58dc988c67b47fe54c4)
* [_includes/assets/js/view/seriesHelpers.js](https://github.com/open-sdg/open-sdg/compare/2.1.0-dev...2.2.0-dev#diff-5e61772ea34953912ec178644f6e5982baf4a262c6a2026bfd897cc45c70b196)
* [_includes/assets/js/view/tableHelpers.js](https://github.com/open-sdg/open-sdg/compare/2.1.0-dev...2.2.0-dev#diff-1be01a56e52c4500f5559b96bffdd01cdb98ee8945683b845115a419caede5dc)
* [_includes/components/charts/chart.html](https://github.com/open-sdg/open-sdg/compare/2.1.0-dev...2.2.0-dev#diff-ed38e7f6a92c1d9f02d5a18618afd07986c88c8d7718cfe9605c7588b39ca3ca)
* [_includes/components/goal/goal-content.html](https://github.com/open-sdg/open-sdg/compare/2.1.0-dev...2.2.0-dev#diff-c59c74d5a960ffb79a02e183d20d1d05209031ca4e571bede2c45047a24e9c8a)
* [_includes/components/goal/header.html](https://github.com/open-sdg/open-sdg/compare/2.1.0-dev...2.2.0-dev#diff-ba28740e5ea85b15540924951dd8012f76a4edd84e576fa3eaeaa55d49ae2f92)
* [_includes/components/indicator/indicator-main.html](https://github.com/open-sdg/open-sdg/compare/2.1.0-dev...2.2.0-dev#diff-0fe5236d3abca07c9e56d3e8503826f1c9f1564e81c7a160ab15894c6cde0bbc)
* [_includes/components/indicator/series-template.html](https://github.com/open-sdg/open-sdg/compare/2.1.0-dev...2.2.0-dev#diff-ed93427727ff82dd7558dabc676254f6ab8240a01b910b400776c2f00204972f)
* [_includes/components/reportingstatus/reporting-status-label.html](https://github.com/open-sdg/open-sdg/compare/2.1.0-dev...2.2.0-dev#diff-bec86ffb92033294cce72604d9c005e9a3521f30fb3b3d6ad421d22b74955cc2)
* [_includes/components/reportingstatus/reporting-status-overall.html](https://github.com/open-sdg/open-sdg/compare/2.1.0-dev...2.2.0-dev#diff-73139ac1d3d1df23afd409fa229236a2352f290528b506bc4fe9a8a1ab232245)
* [_includes/head.html](https://github.com/open-sdg/open-sdg/compare/2.1.0-dev...2.2.0-dev#diff-e241bda4e3c3c6dc1c0b00185b61f6ce19b5eb16e294dd955ca9fa6d01befb0e)
* [_includes/javascript-variables.html](https://github.com/open-sdg/open-sdg/compare/2.1.0-dev...2.2.0-dev#diff-e96a4a24ce2e1564e7270837c5a918377e2f6b428937ea0b02517fdd9239473e)
* [_includes/polyfills.html](https://github.com/open-sdg/open-sdg/compare/2.1.0-dev...2.2.0-dev#diff-e345fb463902dac4d25df39f69c83acabef4fc4887aada6ae6d01fee57c2d9a0)
* [_includes/title-tag.html](https://github.com/open-sdg/open-sdg/compare/2.1.0-dev...2.2.0-dev#diff-1d25daa0584480441d7f90851b75946dbb502082122e34aa8aa5bdf10fe3211d)
* [_layouts/data-editor.html](https://github.com/open-sdg/open-sdg/compare/2.1.0-dev...2.2.0-dev#diff-c65f37aeacf840ed2df9fa6171af20edfe03504795b26cd1c92c170c4d7bf326)
* [_layouts/indicator.html](https://github.com/open-sdg/open-sdg/compare/2.1.0-dev...2.2.0-dev#diff-622cf5f30ae671450bb475d66c9b680ca2332f9cb14b51dcbd82fd712cd77f1d)
* [_layouts/reportingstatus.html](https://github.com/open-sdg/open-sdg/compare/2.1.0-dev...2.2.0-dev#diff-f3789d9a98b0217b53eb383897faf37ac74aedbcc63a078300947d8d65a192cd)

Note that we strive to avoid any breaking changes, so this process of updating overridden files is optional. However we strongly recommend keeping your overridden files as current as possible.

## New features

This release introduces some optional features that you may be interested in adding to your platform.

### Proxy

Open SDG now has the functionality to mark indicator data as “proxy” data with a label and definition, meaning that it is somehow different than the expected UN global indicator.

To set an entire indicator to be a "proxy", this line is needed in each indicator configuration file in the metadata section on indicator pages:

```
proxy: proxy
```

If your data has multiple series and not all of them are proxies, this is needed instead, to define which series are proxies (for example):

```
proxy: both
proxy_series:
  - my first proxy series
  - my other proxy series
```

To change the text that appears for the proxy description as default, add this to the `site_config.yml` file in your site repository to customise the description text. Note: you will need to update the translation for this if you use any other languages on the site.

```
proxy_indicators:
  label: Proxy
  description: My alternate proxy description
```
