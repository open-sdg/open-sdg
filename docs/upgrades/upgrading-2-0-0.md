<h1>Upgrading to 2.0.0</h1>

This document is intended for developers, to help with the process of upgrading to version 2.0.0 of Open SDG, from 1.8.0 or higher.

## Upgrade data repository to sdg-build 2.0.0

In your data repository, update your `requirements.txt` file to:

```
git+https://github.com/open-sdg/sdg-build@2.0.0
```

## Upgrade translations to sdg-translations 2.0.0

In your data repository's config file, update the version of sdg-translations in the "translations" section:

```
translations:
  - class: TranslationInputSdgTranslations
    source: https://github.com/open-sdg/sdg-translations.git
    tag: 2.0.0
```

## Update version of Open SDG to 2.0.0

In your site repository's `_config.yml` file, update the version of Open SDG in `remote_theme`, like so:

```
remote_theme: open-sdg/open-sdg@2.0.0
```

## Update version of jekyll-open-sdg-plugins to 2.0.0

In your site repository's `Gemfile`, update the version of jekyll-open-sdg-plugins like so:

```
gem "jekyll-open-sdg-plugins", "2.0.0"
```

## Changes in 2.0.0

Because 2.0.0 is a major upgrade, there are many changes to be aware of:

### accessible_charts - always on

The `accessible_charts` site configuration has been removed because the platform now automatically includes the accessibility improvements to charts.

### accessible_tabs - always on

The `accessible_tabs` site configuration has been removed because the platform now automatically includes the accessibility improvements to tabs.

### bootstrap_5 - always on

The `bootstrap_5` site configuration that was added in 1.8.0 has been removed because the platform now automatically uses Bootstrap 5.

Notably, any "include" files that were placed into the "bootstrap5" subfolder have been moved out of that folder, and any "layout" files that ended with "-bootstrap5" have been renamed to remove that suffix. See the "Overrides" section below for more details on this.

### chartjs_3 - always on

The `chartjs_3` site configuration that was added in 1.8.0 has been removed because the platform now automatically uses Chart.js 3.

Notably, any "include" files that ended with "-chartjs3" have been renamed to remove that suffix. See the "Overrides" section below for more details on this.

### contrast_type - removed

The `contrast_type` site configuration has been removed and the platform will behave as though the "single" option were chosen, there the contrast toggle button is a single button in the top right corner.

### create_goals - layout removed

The `layout` option in the `create_goals` site configuration has been removed, and the platform will always use the "goal" layout.

### create_pages - automate two pages

Throughout 1.x the `create_pages` site configuration has been expected to contain items for the frontpage and for an "indicators.json" file. These can now be removed from `create_pages` because they will be automatically created. For example, see the difference between the `create_pages` settings from the 1.8.0 site starter and the 2.0.0 site starter (links TBD).

### create_pages - deprecated structure removed

Throughout 1.x the `create_pages` site configuration has supported an older structure, but in 2.0.0 this will no longer work. Your `create_pages` setting will need to fit the structure [detailed in our documentation](https://open-sdg.readthedocs.io/en/latest/configuration/#create_pages).

### data build - indicator property changes

The data build automatically assigns various properties as metadata to each indicator. A few of these properties were being duplicated for backwards compatibility, but those duplicates will now be removed. These will likely not affect you unless you had some custom code (such as data or metadata alterations) which was relying on the older properties. The changes are:

* `indicator_number` instead of `indicator`
* `target_number` instead of `target_id`
* `goal_number` instead of `sdg_goal`

### data columns/fields - default sorting change

Throughout 1.x the default sorting logic for disaggregation dropdowns and options has been "alphabetical", but now the default will be "default" -- where the sorting is based on position in the data. See the [`datapackage` "sorting" option](https://open-sdg.readthedocs.io/en/latest/data-configuration/#datapackage) for more information.

### date_formats - deprecated structure removed

Throughout 1.x the `date_formats` site configuration has supported an older structure, but in 2.0.0 this will no longer work. Your `data_formats` setting will need to fit the structure [detailed in our documentation](https://open-sdg.readthedocs.io/en/latest/configuration/#date_formats).

### favicons - removed

The `favicons` site configuration has been removed and the platform will always use the `favicon.io` approach. This may be a breaking change for any implementation still using older favicon images, and in this case you would need to create new favicon images according to [this favicon tutorial](https://open-sdg.readthedocs.io/en/latest/tutorials/change-logo/#find-a-favicon).

### frontpage_heading - removed

The `frontpage_heading` site configuration has been removed. The new setting used to control this text on the frontpage is [`frontpage_introduction_banner`](https://open-sdg.readthedocs.io/en/latest/configuration/#frontpage_introduction_banner).

### frontpage_instructions - removed

The `frontpage_instructions` site configuration has been removed. The new setting used to control this text on the frontpage is [`frontpage_goals_grid`](https://open-sdg.readthedocs.io/en/latest/configuration/#frontpage_goals_grid).

### header - removed

The `header` site configuration has been removed, and the platform will always use a consistent header.

### languages - required

The `languages` setting is now required, in both the [site configuration](https://open-sdg.readthedocs.io/en/latest/configuration/#languages) and [data configuration](https://open-sdg.readthedocs.io/en/latest/data-configuration/#languages) and must have at least one language. These two settings should be identical to each other.

A more technical consequence is that, while previously there was a distinction between a "translated build" and "non-translated build", now all builds will be translated. This will make no difference in practice, but you may notice that your data builds are placed in a subfolder for each language, if you were not already using languages.

### non_global_metadata - removed

The `non_global_metadata` setting has been removed. The only affects platforms that were using something other than "National" for the non-global metadata tab. In order to maintain this feature you will need to use the [`metadata_tabs` site configuration](https://open-sdg.readthedocs.io/en/latest/configuration/#metadata_tabs) to specify the labels used for each tab.

### series_toggle - always on

The `series_toggle` setting has been removed and the platform will behave as if it were always on. This means that the series column in your data will be rendered more like a *unit* and less like a *disaggregation*. Note that you can [control the name of the series column](https://open-sdg.readthedocs.io/en/latest/configuration/#data_fields), and you also have control over your data columns, so there are multiple ways to continue to have your series behave like a disaggregation if you would prefer that.
