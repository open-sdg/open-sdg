<h1>Configuration</h1>

In addition to the [usual Jekyll configuration options](https://jekyllrb.com/docs/configuration/), there are many options specific to Open SDG. These are detailed below, along with usage examples.

_Note about "strings": Many of the settings detailed here contain human-readable "strings" (ie, text). In most cases, they can be replaced by [translation keys](https://open-sdg.readthedocs.io/en/latest/translation/) for better multilingual support. For example, "Indicator" could be replaced with "general.indicator"._

## Required settings

### country

This **required** setting should contain two more (indented) settings: `name` and `adjective`. This are intended to allow the platform to refer to the country (or if appropriate, locality or organisation) using the platform.

```nohighlight
country:
  name: Australia
  adjective: Australian
```

### data_edit_url

This **required** setting controls the URL of the "Edit Data" that appear on the staging site's indicator pages. It should be a full URL. Note that you can include `[id]` in the URL, and it will be dynamically replaced with the indicator's id (dash-delimited).

```nohighlight
data_edit_url: http://prose.io/#my-org/my-repo/edit/develop/data/indicator_[id].csv
```

### email_contacts

This **required** setting should contain three more (indented) settings for email addresses: `questions`, `suggestions`, and `functional`. This allows the platform to direct users to appropriate inboxes from various parts of your site.

```nohighlight
email_contacts:
  questions: test@example.com
  suggestions: test@example.com
  functional: test@example.com
```

### environment

This **required** setting should be either `staging` or `production`. Certain features of the platform, such as data management links, will only appear on `staging`. Typically you will have this set to `staging` in the `_config.yml` file, and set to `production` in the `_config_prod.yml` file.

```nohighlight
environment: staging
```

### goal_image_base

This **required** setting controls the base URL for downloading the imagery for the goals (PNG files). The platform will use this as a base, and complete the URLs (behind the scenes) by adding a language and number. For example, if you set this to `https://example.com`, then the platform will try to download the Spanish image for Goal 4 at: `https://example.com/en/4.png`.

```nohighlight
goal_image_base: https://open-sdg.github.io/sdg-translations/assets/img/goals
```

### languages

This **required** setting controls the languages to be used on the site. This should be a list of language codes, and the first is assumed to be the default.

Note that the [Jekyll defaults](https://jekyllrb.com/docs/configuration/front-matter-defaults/) mechanism should also be used, to ensure that all pages on the will be assigned a default language.

```nohighlight
languages:
  - es
  - en

defaults:
  -
    scope:
      path: ""
    values:
      language: "es"
```

### metadata_edit_url

This **required** setting controls the URL of the "Edit Metadata" that appear on the staging site's indicator pages. It should be a full URL. Note that you can include `[id]` in the URL, and it will be dynamically replaced with the indicator's id (dash-delimited).

```nohighlight
metadata_edit_url: http://prose.io/#my-org/my-repo/edit/develop/meta/[id].md
```

### menu

This **required** setting controls the main navigation menu for the platform. It should contain a list of menu items, each containing a `path` and a [translation key](https://open-sdg.readthedocs.io/en/latest/translation/).

```nohighlight
menu:
  - path: /reporting-status
    translation_key: menu.reporting_status
  - path: /about
    translation_key: menu.about
  - path: /faq
    translation_key: menu.faq
```

### plugins

This is a general Jekyll setting, but it is mentioned here to indicate the required plugins. At a minimum you should include the following:

```
plugins:
  - jekyll-remote-theme
  - jekyll-open-sdg-plugins
```

### remote_data_prefix

This **required** setting tells the platform where to find your hosted [data repository](https://open-sdg.readthedocs.io/en/latest/glossary/#data-repository).

```nohighlight
remote_data_prefix: https://my-github-org.github.io/my-data-repository
```

### remote_theme

This is not specific to Open SDG, but it is very important to always use a specific version of Open SDG (as opposed to using the latest version). For example, to use version 0.8.0 of the platform, use the following:

```nohighlight
remote_theme: open-sdg/open-sdg@0.8.0
```

This is far safer and more recommended than using the latest version, such as the following (which is **not recommended**):

```nohighlight
remote_theme: open-sdg/open-sdg
```

### remote_translations

This **required** setting tells the platform where look for remote language translation files. Note that this should be list of one or more URLs, which allows you to pull in multiple translation files.

```nohighlight
remote_translations:
  - https://open-sdg.github.io/sdg-translations/translations.json
```

## Optional settings

### analytics

This optional setting can contain another (indented) setting, `ga_prod`, which should be a [Google Analytics tracking ID](https://support.google.com/analytics/answer/1008080?hl=en#GAID). If these settings are used, usage statistics will be sent to Google Analytics. For more information about this, see the [analytics](https://open-sdg.readthedocs.io/en/latest/analytics/) page.

```nohighlight
analytics:
  ga_prod: 'paste ID here'
```

### contrast_type

This optional setting allows you to change the type of contrast button your site uses. By default there are two buttons containing 'A'. If you use this option one single button will be displayed with the text 'High contrast' / 'Default contrast', depending on which mode of contrast is active.

```nohighlight
contrast_type: long
```

### create_goals

This optional setting can be used to automatically create the goal pages. Without this setting, you will need a file for each goal (per language), in a `_goals` folder. This setting should include another (indented) setting indicating the Jekyll layout to use for the goals.

```nohighlight
create_goals:
  layout: goal
```

### create_indicators

This optional setting can be used to automatically create the indicator pages. Without this setting, you will need a file for each indicator (per language), in an `_indicators` folder. This setting should include another (indented) setting indicating the Jekyll layout to use for the indicators.

```nohighlight
create_indicators:
  layout: indicator
```

### create_pages

This optional setting can be used to automatically create 4 platform-dependent pages:

* the home page
* the indicators.json page
* the search results page
* the reporting status page

Without this setting, you will need a file for each of these 4 pages (per language), in a `_pages` folder. This setting can include more advanced settings (see [here](https://github.com/open-sdg/jekyll-open-sdg-plugins/blob/master/lib/jekyll-open-sdg-plugins/create_pages.rb#L18)) but can also simply be set to `true`.

```nohighlight
create_pages: true
```

### custom_css

This optional setting can be used to load additional CSS files on each page. It should be a list of relative paths to CSS files.

```
custom_css:
  - /assets/css/custom.css
```

### custom_js

This optional setting can be used to load additional JavaScript files on each page. It should be a list of relative paths to JavaScript files.

```
custom_js:
  - /assets/js/custom.js
```

### twitter

This optional setting creates a [Twitter](https://twitter.com) link in the platform's footer. It should be a Twitter account name.

```nohighlight
twitter: MyTwitterAccount
```

### facebook

This optional setting creates a [Facebook](https://facebook.com) link in the platform's footer. It should be a Facebook account name.

```nohighlight
facebook: MyFacebookAccount
```

### frontpage_heading

This optional setting can control the heading that appears on the front page.

```nohighlight
frontpage_heading: Australian data for Sustainable Development Goal indicators
```

### frontpage_instructions

This optional setting can control the instructions that appear on the front page.

```nohighlight
frontpage_instructions: Click on each goal for Australian statistics for Sustainable Development Goal global indicators.
```

### hide_empty_metadata

This optional setting can be used to hide any metadata fields that are empty. In other words, this setting can ensure that if an indicator has no data for a particular metadata field, that field will not display at all. The default behavior if for all metadata fields to be displayed, regardless of whether the indicator has the required data.

```nohighlight
hide_empty_metadata: true
```

### metadata_tabs

This optional setting can control the metadata tabs which appear on the indicator pages. This is directly tied to the "schema" of your data repository (ie, the `_prose.yml` file). This keys of this object must correspond to the "scope" of the fields in that schema file. The following configuration is assumed if this setting is omitted:

```nohighlight
metadata_tabs:
  national:
    title: indicator.national_metadata
    blurb: indicator.national_metadata_blurb
  global:
    title: indicator.global_metadata
    blurb: indicator.global_metadata_blurb
```

### non_global_metadata

This optional setting can be used to control the text of the tab containing non-global metadata. The default text is "National Metadata", but if you are implementing a sub-national platform, you could use "Local Metadata", or similar. Note that using a [translation key](https://open-sdg.readthedocs.io/en/latest/translation/) is recommended for better multilingual support.

```nohighlight
non_global_metadata: indicator.national_metadata
```

### sharethis_property

This optional setting creates a [ShareThis](https://sharethis.com/platform/share-buttons/) widget along the left side of every page. It should be the [property id](https://sharethis.com/support/faq/how-do-i-find-my-property-id/) for your ShareThis account. For more information about this, see the [sharing](https://open-sdg.readthedocs.io/en/latest/social-media-sharing/) page.

## Examples

To see many of these options in action, the [site starter repository](https://github.com/open-sdg/open-sdg-site-starter) contains an [example config file](https://github.com/open-sdg/open-sdg-site-starter/blob/develop/_config.yml).
