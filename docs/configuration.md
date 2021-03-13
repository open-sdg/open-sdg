<h1>Site configuration</h1>

In addition to the [usual Jekyll configuration options](https://jekyllrb.com/docs/configuration/), there are many options specific to Open SDG. These are detailed below, along with usage examples. **All of these settings go in the `_config.yml` file.** Alternatively, you can add any/all of these settings to a `site_config.yml` file in your data folder (usually `data/site_config.yml`).

This document covers the "site configuration", which is distinct from "data configuration". See more [details on data configuration](data-configuration.md).

_Note about "strings": Many of the settings detailed here contain human-readable "strings" (ie, text). In most cases, they can be replaced by [translation keys](translation.md) for better multilingual support. For example, "Indicator" could be replaced with "general.indicator"._

> To see many of these options in action, the [site starter repository](https://github.com/open-sdg/open-sdg-site-starter) contains an [example config file](https://github.com/open-sdg/open-sdg-site-starter/blob/develop/_config.yml).

### accessible_charts

_Optional_: This setting can be set to `true` to enable chart functionality that is intended to increase accessibility by adding support for screenreaders and keyboard navigation. If omitted, this defaults to `false`, however setting this to `true` is recommended.

```nohighlight
accessible_charts: false
```

### accessible_tabs

_Optional_: This setting can be set to `true` to enable tab functionality that is compliant with the [WAI-ARIA best practices](https://www.w3.org/TR/wai-aria-practices/#tabpanel). This adds improved keyboard navigation of the tabs. If omitted, this defaults to `false`, however setting this to `true` is recommended.

```nohighlight
accessible_tabs: false
```

### analytics

_Optional_: This setting can contain another (indented) setting, `ga_prod`, which should be a [Google Analytics tracking ID](https://support.google.com/analytics/answer/1008080?hl=en#GAID). If these settings are used, usage statistics will be sent to Google Analytics. For more information about this, see the [analytics](analytics.md) page.

```nohighlight
analytics:
  ga_prod: 'paste ID here'
```

### breadcrumbs

_Optional_: This setting can contain breadcrumb settings for each of the supported collection types: `goal`, `indicator`, and `post`. Each should have a list of label/path objects. For example, the following configuration would add the breadcumbs `Home > Updates` at the top of each post:

```nohighlight
breadcrumbs:
  post:
    - label: Home
      path: /
    - label: Updates
      path: /news
```

Or with the addition of translation keys for multilingual sites:

```nohighlight
breadcrumbs:
  post:
    - label: general.home
      path: /
    - label: menu.updates
      path: /news
```

Here is a full exmaple including `goal` and `indicator` as well:

```nohighlight
breadcrumbs:
  post:
    - label: general.home
      path: /
    - label: menu.updates
      path: /news
  goal:
    - label: general.home
      path: /
    - label: general.goals
      path: /goals
  indicator:
    - label: general.home
      path: /
    - label: general.goals
      path: /goals
```

Note that `indicator` will automatically add a final item, which is a link to the goal that the indicator belongs to. You do not need to specify this, since it is done dynamically and automatically.

### contrast_type

_Optional_: This setting allows you to change the type of contrast button your site uses. By default there are two buttons containing 'A'. If you use this option one single button will be displayed with the text 'High contrast' / 'Default contrast', depending on which mode of contrast is active.

```nohighlight
contrast_type: long
```

### country

**_Required_**: This setting should contain two more (indented) settings: `name` and `adjective`. This are intended to allow the platform to refer to the country (or if appropriate, locality or organisation) using the platform.

```nohighlight
country:
  name: Australia
  adjective: Australian
```

### create_config_forms

_Optional_: This setting can be used to automatically create the configuration form pages. Without this setting, you will need to maintain your site and indicator configuration using a text editor. This setting should include another (indented) setting indicating the Jekyll layout to use for the config form pages (usually `config-builder`). After setting this, you will have a site configuration form available through a link in the footer, as well as indicator configuration forms available in the "Edit" tab.

```nohighlight
create_config_forms:
  layout: config-builder
```

### create_goals

_Optional_: This setting can be used to automatically create the goal pages. Without this setting, you will need a file for each goal (per language), in a `_goals` folder. This setting should include another (indented) setting indicating the Jekyll layout to use for the goals. You can optionally turn on previous/next links as well.

Additionally, there can be a `goals` item that includes an array of objects, each with a `content` field. Use this to specify specific content for goal pages, which can include Markdown, or can be a translation key.

```nohighlight
create_goals:
  layout: goal
  previous_next_links: true
  goals:
    - content: My content for goal 1
    - content: My content for goal 2 with a [link](https://example.com)
    - content: custom.my_translation_key_for_goal_3
```

### create_indicators

_Optional_: This setting can be used to automatically create the indicator pages. Without this setting, you will need a file for each indicator (per language), in an `_indicators` folder. This setting should include another (indented) setting indicating the Jekyll layout to use for the indicators. You can optionally turn on previous/next links as well.

```nohighlight
create_indicators:
  layout: indicator
  previous_next_links: true
```

### create_pages

_Optional_: This setting can be used to automatically create 4 platform-dependent pages:

* the home page
* the indicators.json page
* the search results page
* the reporting status page

Without this setting, you will need a file for each of these 4 pages (per language), in a `_pages` folder. This setting can include more advanced settings (see this [jekyll-open-sdg-plugins code](https://github.com/open-sdg/jekyll-open-sdg-plugins/blob/master/lib/jekyll-open-sdg-plugins/create_pages.rb#L18)) but can also simply be set to `true`.

```nohighlight
create_pages: true
```

If you would like to use the alternative frontpage (`frontpage-alt`) alongside a dedicated "goals" page, you can used this configuration:

```nohighlight
create_pages:
  - folder: /
    layout: frontpage-alt
  - folder: /goals
    layout: goals
  - folder: /reporting-status
    layout: reportingstatus
  - filename: indicators.json
    folder: /
    layout: indicator-json
  - folder: /search
    layout: search
```

The `folder` property is required, and controls the URL path of the page. The `filename` property is optional, and is needed only in the rare case where your page needs an unusual filename (such as "indicators.json" in the example above). All other properties are treated like "frontmatter" in a regular Jekyll page, such as the `layout` properties above.

### custom_css

_Optional_: This setting can be used to load additional CSS files on each page. It should be a list of relative paths to CSS files.

```
custom_css:
  - /assets/css/custom.css
```

NOTE: This approach is deprecated. It is recommended to instead [put your custom styles into a _sass folder](customisation.md#adding-custom-css).

### custom_js

_Optional_: This setting can be used to load additional JavaScript files on each page. It should be a list of relative paths to JavaScript files, or remote paths to third-party Javascript files.

```
custom_js:
  - /assets/js/custom.js
  - https://example.com/index.js
```

### data_edit_url

**_Required_**: This setting controls the URL of the "Edit Data" that appear on the staging site's indicator pages. It should be a full URL. Note that you can include `[id]` in the URL, and it will be dynamically replaced with the indicator's id (dash-delimited).

```nohighlight
data_edit_url: http://prose.io/#my-org/my-repo/edit/develop/data/indicator_[id].csv
```

### data_fields

_Optional_: This setting can be used if your data source has non-standard fields for unit and/or series -- for example, if you have CSV files with units in a "UNIT_MEASURE" column, rather than the usual "Units". If this is omitted, the following defaults are used:

```nohighlight
data_fields:
  series: Series
  units: Units
```

If your data source is coming directly from SDMX, for example, you might use something like this:

```nohighlight
data_fields:
  series: SERIES
  units: UNIT_MEASURE
```

### date_formats

_Optional_: This setting can be used to control date formats for use in the site, such as in the news/category/post layouts. Any number date formats can be entered, and each must have an arbitrary `type`, such as "standard". Make sure that each `type` has a variant for each of your languages. For example, here is how you might configure a "standard" date format:

```nohighlight
date_formats:
  - type: standard
    language: en
    format: "%b %d, %Y"
  - type: standard
    language: es
    format: "%d de %b de %Y"
```

The `%` variables in the formats correspond to the variables listed in this [Ruby DateTime documentation](https://ruby-doc.org/stdlib-2.6.1/libdoc/date/rdoc/DateTime.html#method-i-strftime).

Note that the "standard" type is used in Open SDG's news/post functionality. Additional format types can be added for custom purposes.

### decimal_separator

_Optional_: This setting can be used to replace the default decimal separator -- `.` -- with any other symbol. For example, the following is how you could use a comma as a decimal separator:

```
decimal_separator: ','
```

### disclaimer

_Optional_: This setting controls the content of the disclaimer that appears at the top of each page. If you are not happy with the default ("ALPHA: This is a development website. We welcome your feedback.") then you can use something like the following example configuration:

```nohighlight
disclaimer:
  phase: BETA
  message: This is my disclaimer message.
```

The above configuration would result in: "BETA: This is my disclaimer message."

If you only want to change the phase (to "BETA" for example), you can omit the `message` like so:

```
disclaimer:
  phase: BETA
```

As always, you can use translation keys.

### email_contacts

**_Required_**: This setting should contain three more (indented) settings for email addresses: `questions`, `suggestions`, and `functional`. This allows the platform to direct users to appropriate inboxes from various parts of your site.

```nohighlight
email_contacts:
  questions: test@example.com
  suggestions: test@example.com
  functional: test@example.com
```

### environment

**_Required_**: This setting should be either `staging` or `production`. Certain features of the platform, such as data management links, will only appear on `staging`. Typically you will have this set to `staging` in the `_config.yml` file, and set to `production` in the `_config_prod.yml` file.

```nohighlight
environment: staging
```

### footer_language_toggle

_Optional_: This setting controls the type of language toggle to be used in the footer. Possible settings are `dropdown`, `links`, and `none`. If this is omitted, the default is `none`.

```nohighlight
footer_language_toggle: none
```

### footer_menu

**_Required_**: This setting controls the footer menu for the platform. It should contain a list of menu items, each containing a `path` and a [translation key](translation.md).

The following example provides a footer menu matching older versions of Open SDG, which included options for social media and email contacts.

```nohighlight
footer_menu:
  - path: mailto:my-email-address@example.com
    translation_key: menu.contact_us
  - path: https://twitter.com/MyTwitterAccount
    translation_key: general.twitter
  - path: https://facebook.com/MyFacebookAccount
    translation_key: general.facebook
  - path: /faq
    translation_key: menu.faq
  - path: /cookies
    translation_key: menu.cookies
```

Note that the `path` of an item can be a translation key itself. This is useful if you want the link to go to different URLs depending on what language is active (for example if you have multiple language-specific Twitter accounts).

### frontpage_cards

_Optional_: This setting is only used in the `frontpage-alt` layout. It can display any number of "cards" in 3-column rows, beneath the grid of goal tiles. It should be a list of cards. Each configuration is optional, and here is an displaying one card with all of the options:

```
frontpage_cards:
    -
      # This controls the color of the line at the top of the card.
      rule_color: orange
      # This sets the title of the card.
      title: My card title
      # This sets the content of the card. Markdown is supported. Note that all
      # internal links should be relative to the frontpage. For example, instead
      # of [link](/path) you should use [link](path).
      content: |
        * List item
        * List item with [link](https://example.com)
      # This displays any file in the `_includes` folder.
      include: components/download-all-data.html
      # This controls the text for a call-to-action button.
      button_label: My button text
      # This controls the URL the button links to.
      button_link: https://example.com
    -
      title: My second card
      etc...
```

### frontpage_goals_grid

_Optional_: This setting is only used in the `frontpage-alt` layout. It can display a title and description above the grid of goal tiles. It can be configured in the following way:

```
frontpage_goals_grid:
    title: title goes here
    description: description goes here
```

Markdown is supported in the description. However note that all internal links
should be relative to the frontpage. For example, instead of `[link](/path)` you should use `[link](path)`.

### frontpage_heading

_Optional_: This setting can control the heading that appears on the front page. This setting is only used in the `frontpage` layout.

```nohighlight
frontpage_heading: Australian data for Sustainable Development Goal indicators
```

### frontpage_instructions

_Optional_: This setting can control the instructions that appear on the front page. This setting is only used in the `frontpage` layout.

```nohighlight
frontpage_instructions: Click on each goal for Australian statistics for Sustainable Development Goal global indicators.
```

### frontpage_introduction_banner

_Optional_: This setting adds a banner to your site's homepage, in order to introduce your users to your site. This setting is used in both the `frontpage` and `frontpage-alt` layouts. To add a banner update the `_config.yml` file with these settings:

```yaml
frontpage_introduction_banner:
    title: title goes here
    description: description goes here
```

### goal_image_base

_Optional_: This setting controls the base URL for downloading the imagery for the goal images. The platform will use this as a base, and complete the URLs (behind the scenes) by adding a language and number. For example, if you set this to `https://example.com`, then the platform will try to download the Spanish image for Goal 4 at: `https://example.com/en/4.png`.

If omitted, the following default will be used:

```nohighlight
goal_image_base: https://open-sdg.org/sdg-translations/assets/img/goals
```

### goal_image_extension

_Optional_: This setting controls the type of file (the file "extension") that will be used for the goal images. If omitted, the default will be `png`. The precending dot (eg, `.png`) is **not** needed.

```nohighlight
goal_image_extension: png
```

**NOTE**: Please ensure that files of this type are available at the location specified in `goal_image_base` in each language that you use. For example, if your `goal_image_base` is `https://example.com`, and your `goal_image_extension` is `svg`, and your language is French, the goal 5 icon should be available at: `https://example.com/fr/5.svg`.

### goals_page

_Optional_: This setting controls certain aspects of the `goals` layout. The available settings are:

* `title`: Controls the title of the goals page. Defaults to "Goals".
* `description`: Controls the introductory text under the title. If omitted there will be no introductory text.

Here is an example of using these settings:

```yaml
goals_page:
    title: title goes here
    description: description goes here
```

As always, for multilingual support, these settings can refer to translation keys, and the description can include Markdown.

### graph_color_headline

_Optional_: This setting can be used to control the color of the "headline" (eg, the national dataset, without any disaggregations selected) on charts. The default is #004466.

### graph_color_headline_high_contrast

_Optional_: This setting can be used to control the color of the "headline" (eg, the national dataset, without any disaggregations selected) on charts, in high-contrast mode. The default is #55a6e5.

### graph_color_set

_Optional_: This setting can be used to customize the color set used in the charts. There are five possible entries:

* `graph_color_set: 'accessible'` a 6-color set that is specifically chosen for optimal accessibility (recommended)
* `graph_color_set: 'default'` a deprecated 6-color set that is still the default (for reasons of backwards compatibility)
* `graph_color_set: 'sdg'` to use the 17 SDG colors in all charts
* `graph_color_set: 'goal'` to use shades of the color of the current indicator's goal
* `graph_color_set: 'custom'` to use a set of customized colors. In this case, write the hexadecimal color codes of the colors you want to use to the list in `graph_color_list` (see below).

> **NOTE**: Whatever color scheme you choose here, please ensure that all colors satisfy
> the accessibility (minimum contrast) standards in your region. These colors will need to
> be visible on white and black backgrounds. The `accessible` color scheme is designed to
> meet this requirement, and so it is recommended.

### graph_color_list

_Optional_: This setting can be used to define a set of colors to be used in the charts. Precondition is `graph_color_set` to be `custom`. Enter a list of hexadecimal color codes.
```yaml
graph_color_list': ['3fd64f','cfd63f','4eecec','ec4ed9']
```

### graph_color_number

_Optional_: This setting can be used to limit the length of the list of colors selected via `graph_color_set`. The maximum value for `graph_color_set: 'default'` is 6, for `graph_color_set: 'sdg'` is 17, for `graph_color_set: 'goal'` is 9 and for `graph_color_set: 'custom'` the length of `graph_color_list`. If nothing is defined here, the corresponding maximum is used. Be aware that the number selected here affects how many datasets can be displayed simultaneously in the charts (2 times this value - once as a normal line or bar and once as a dashed line or bar).

### header

_Optional_: This setting can control aspects of the header that is displayed at the top of each page. The available options are:

* `include`: This specifies an include file, assumed to be inside of `_includes/components/header/`, to use for the header.

Here is an example, showing the default that is used if this setting is omitted:

```nohighlight
header:
    include: header-default.html
```

The configuration above will include the file `_includes/components/header/header-default.html` at the top of each page.

The `header-menu-left-aligned.html` option is also available, and is recommended.

### header_language_toggle

_Optional_: This setting controls the type of language toggle to be used in the header. Possible settings are `dropdown`, `links`, and `none`. If this is omitted, the default is `dropdown`. The general recommendation is to use `dropdown` if you have more than 3 languages, and otherwise to use `links`.

```nohighlight
header_language_toggle: dropdown
```

### hide_empty_metadata

_Optional_: This setting can be used to hide any metadata fields that are empty. In other words, this setting can ensure that if an indicator has no data for a particular metadata field, that field will not display at all. The default behavior if for all metadata fields to be displayed, regardless of whether the indicator has the required data.

```nohighlight
hide_empty_metadata: true
```

### indicator_config_form

_Optional_: This setting controls the behavior of the indicator config forms. The available settings are:

* `dropdowns`: This can be used to convert any `string` field into a dropdown. Each item should have these properties:

    * `jsonschema`: The path into the jsonschema's `properties` object, to the property that you would like to convert into a dropdown. In most cases this is simply the name of the property, but in nested situations, you can use dot-syntax to drill down into the jsonschema object.
    * `values`: A list of values for the dropdown.
    * `labels`: An optional list of human-readable labels, corresponding to the `values` list.

  For example, the following would convert the `reporting_status` property into a dropdown:

      site_config_form:
        dropdowns:
          - jsonschema: reporting_status
            values:
              - complete
              - notstarted

### languages

**_Required_**: This setting controls the languages to be used on the site. This should be a list of language codes, and the first is assumed to be the default.

```nohighlight
languages:
  - es
  - en
```

### languages_public

_Optional_: This setting can be used if you are not happy with any of the standard language codes. For example, if the standard code for a language is `xyz` but you would prefer that it show up in your URLs as `abc`, then you could do the following:

```nohighlight
languages_public:
  - language: xyz
    language_public: abc
```

### metadata_edit_url

**_Required_**: This setting controls the URL of the "Edit Metadata" that appear on the staging site's indicator pages. It should be a full URL. Note that you can include `[id]` in the URL, and it will be dynamically replaced with the indicator's id (dash-delimited).

```nohighlight
metadata_edit_url: http://prose.io/#my-org/my-repo/edit/develop/meta/[id].md
```

### metadata_tabs

_Optional_: This setting can control the metadata tabs which appear on the indicator pages. This is directly tied to the "schema" of your data repository (ie, the `_prose.yml` file). The "scope" in each object must correspond to the "scope" of the fields in that schema file. The following configuration is assumed if this setting is omitted:

```nohighlight
metadata_tabs:
  - scope: national
    title: indicator.national_metadata
    description: indicator.national_metadata_blurb
  - scope: global
    title: indicator.global_metadata
    description: indicator.global_metadata_blurb
  - scope: sources
    title: indicator.sources
    description: ''
```

About the "Sources" tab:

While the "scopes" above, such as "national" and "global", are arbitrary, the "sources" scope is special. The "Sources" tab will only display if the scope under `metadata_tabs` is specifically `sources`.

### menu

**_Required_**: This setting controls the main navigation menu for the platform. It should contain a list of menu items, each containing a `path` and a [translation key](translation.md).

```nohighlight
menu:
  - path: /reporting-status
    translation_key: menu.reporting_status
  - path: /about
    translation_key: menu.about
  - path: /faq
    translation_key: menu.faq
```

Menu items can also be turned into dropdowns by putting additional menu items under a `dropdown` setting. For example, this would move "/about" and "/faq" under a "More information" dropdown:

```nohighlight
menu:
  - path: /reporting-status
    translation_key: menu.reporting_status
  - translation_key: More information
    dropdown:
      - path: /faq
        translation_key: menu.faq
      - path: /about
        translation_key: menu.about
```

### news

_Optional_: This setting can be used to control the behavior of the `news` and `post` layouts. The available settings are:

* `category_links`: Whether you would like the `categories` of posts to generate links to dedicated category pages. Default is `true`, but set to `false` to disable category links.

### non_global_metadata

_Optional_: This setting can be used to control the text of the tab containing non-global metadata. The default text is "National Metadata", but if you are implementing a sub-national platform, you could use "Local Metadata", or similar. Note that using a [translation key](translation.md) is recommended for better multilingual support.

```nohighlight
non_global_metadata: indicator.national_metadata
```

NOTE: This approach is deprecated. It is now possible to have complete control over all the metadata tabs using the `metadata_tabs` configuration setting (see above).

### plugins

**_Required_**: This is a general Jekyll setting, but it is mentioned here to indicate the required plugins. At a minimum you should include the following:

```
plugins:
  - jekyll-remote-theme
  - jekyll-open-sdg-plugins
```

### remote_data_prefix

**_Required_**: This setting tells the platform where to find your hosted [data repository](glossary.md#data-repository).

```nohighlight
remote_data_prefix: https://my-github-org.github.io/my-data-repository
```

Note that this is typically a remote URL, but it also works as a relative path to a local folder on disk. For example:

```nohighlight
remote_data_prefix: my-data-build-folder
```

### remote_theme

**_Required_**: This is not specific to Open SDG, but it is very important to always use a specific version of Open SDG (as opposed to using the latest version). For example, to use version 0.8.0 of the platform, use the following:

```nohighlight
remote_theme: open-sdg/open-sdg@0.8.0
```

This is far safer and more recommended than using the latest version, such as the following (which is **not recommended**):

```nohighlight
remote_theme: open-sdg/open-sdg
```

### reporting_status

_Optional_: This setting controls certain aspects of the reporting status page. The available settings are:

* `title`: Controls the title of the reporting status page. Defaults to "Reporting status".
* `description`: Controls the introductory text under the title. If omitted there will be no introductory text.
* `disaggregation_tabs`: Whether or not to display disaggregation status tabs. If omitted, this defaults to false. If you enable this setting, you should also use "expected_disaggregations" in your indicator configuration, in order to provide the disaggregation status report with useful metrics. For more information see [expected_disaggregations](metadata-format.md#recommended-special-fields).

Here is an example of using these settings:

```yaml
reporting_status:
    title: title goes here
    description: description goes here
    disaggregation_tabs: true
```

As always, for multilingual support, the title/description settings can refer to translation keys, and description can include Markdown.

### search_index_boost

_Optional_: This setting can be used to give a "boost" to one or more fields in the search index. The boost number should be a positive integer. The higher the number, the more "relevant" that field will be in search results. If omitted, the following defaults will be used:

```
search_index_boost:
  - field: title
    boost: 10
```

The following example shows additional fields that can be boosted:

```
search_index_boost:
  # The title of the indicator, goal, or page.
  - field: title
    boost: 10
  # The content of the indicator, goal, or page.
  - field: content
    boost: 1
  # The id number of the indicator or goal.
  - field: id
    boost: 5
```

Additionally, any fields set in the `search_index_extra_fields` setting may also be boosted. For example:

```
search_index_boost:
  # Assumes that "national_agency" was set in "search_index_extra_fields".
  - field: national_agency
    boost: 5
```

### search_index_extra_fields

_Optional_: This setting can be used to "index" additional metadata fields in your indicators, for the purposes of affecting the site-wide search. For example, if you have a metadata field called `national_agency` and you would like the sitewide search to include that field, add it in a list here, like so:

```nohighlight
search_index_extra_fields:
  - national_agency
```

### series_toggle

_Optional_: This setting enables the special treatment of the "Series" column in the data. If set to `true`, when an indicator's data includes a "Series" column, it will be displayed above "Units" as radio buttons. If omitted or `false`, the normal behavior is that the "Series" column will display below "Units" as checkboxes. Example:

```nohighlight
series_toggle: true
```

### site_config_form

_Optional_: This setting controls the behavior of the site config form. The available settings are:

* `dropdowns`: This works the same as in the `indicator_config_form` setting.

### sharethis_property

_Optional_: This setting creates a [ShareThis](https://sharethis.com/platform/share-buttons/) widget along the left side of every page. It should be the [property id](https://sharethis.com/support/faq/how-do-i-find-my-property-id/) for your ShareThis account. For more information about this, see the [sharing](social-media-sharing.md) page.

### validate_indicator_config

_Optional_: This setting, if true, will run a validation of each indicator's configuration during the site build. This defaults to `false`.

### validate_site_config

_Optional_: This setting, if true, will run a validation of the site configuration during the site build. This defaults to `false`.
