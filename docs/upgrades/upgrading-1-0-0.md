<h1>Upgrading to 1.0.0</h1>

This document is intended for developers, to help with the process of upgrading to version 1.0.0 of Open SDG, from any previous release.

## Translation updates

If your site is pointing at the standard set of translations (most likely something like `https://open-sdg.github.io/sdg-translations/translations.json`) then you can skip to "Data repository updates" below. But if your site is pointing to a forked set of translations, then you should be aware of some new required translation keys.

The new translation keys required by Open SDG, along with links to their English translations, are as follows:

* [calendar.January](https://github.com/open-sdg/sdg-translations/blob/master/translations/en/calendar.yml#L1) (along with the other 11 months of the year)
* [frontpage.download_all](https://github.com/open-sdg/sdg-translations/blob/master/translations/en/frontpage.yml#L5)
* [frontpage.zip_file](https://github.com/open-sdg/sdg-translations/blob/master/translations/en/frontpage.yml#L6)
* [general.built_using_open_sdg](https://github.com/open-sdg/sdg-translations/blob/master/translations/en/general.yml#L18)
* [general.page](https://github.com/open-sdg/sdg-translations/blob/master/translations/en/general.yml#L19)
* [general.pages](https://github.com/open-sdg/sdg-translations/blob/master/translations/en/general.yml#L20)
* [metadata_fields.other_info](https://github.com/open-sdg/sdg-translations/blob/master/translations/en/metadata_fields.yml#L2)
* [metadata_fields.quality_assurance](https://github.com/open-sdg/sdg-translations/blob/master/translations/en/metadata_fields.yml#L101)
* [metadata_fields.international_comparability](https://github.com/open-sdg/sdg-translations/blob/master/translations/en/metadata_fields.yml#L102)
* [metadata_fields.comments_limitations](https://github.com/open-sdg/sdg-translations/blob/master/translations/en/metadata_fields.yml#L103) (this is a change, rather than an addition)
* [metadata_fields.rational_interpretation](https://github.com/open-sdg/sdg-translations/blob/master/translations/en/metadata_fields.yml#L104)
* [search.did_you_mean](https://github.com/open-sdg/sdg-translations/blob/master/translations/en/search.yml#L10)
* [status.status_by_field](https://github.com/open-sdg/sdg-translations/blob/master/translations/en/status.yml#L9)

### Language code changes

If you are using the following languages, be aware that the language codes in sdg-translations have changed. Your translation folders should use the updated language code. Your site itself can continue using the old language code, as described below in site repository section, with the `languages_public` setting.

* Armenian: changed from "am" to "hy"
* Kazakh: changed from "kz" to "kk"

## Data repository updates

Next it is recommended to make the following updates to your data repository.

### Upgrade to sdg-build 1.0.0

Update your `requirements.txt` file to:

```
git+git://github.com/open-sdg/sdg-build@1.0.0
```

### Take advantage of YAML-based configuration

If you are using the default data management approach -- .CSV files for data and .MD files for metadata -- then it is recommended that you adopt a new, simpler data repository configuration. You can do this by emulating the [data starter](https://github.com/open-sdg/open-sdg-data-starter), but here are the details:

1. Add a configuration file called `config_data.yml`. Start with [this file](https://github.com/open-sdg/open-sdg-data-starter/blob/develop/config_data.yml) and edit as needed. You should read through the whole file, but in particular:
    1. Adjust the `languages` list (as described in the [data starter config](https://github.com/open-sdg/open-sdg-data-starter/blob/develop/config_data.yml#L10))
    2. If your site repository was pointing at custom translations repositories, adjust the defaults for `translations` (as described in the [data starter config](https://github.com/open-sdg/open-sdg-data-starter/blob/develop/config_data.yml#L57)).
        * Note that these should point directly to Git repositories (usually ending in .git) and NOT to .json files.
        * Note that if you are using the standard `open-sdg/sdg-translations` translations, that you should use version 1.0.0, as demonstrated here (link TBD).
    3. If your site uses the Open SDG mapping functionality, uncomment and adjust the `map_layers` (as described in the [data starter config](https://github.com/open-sdg/open-sdg-data-starter/blob/develop/config_data.yml#L81))
2. Replace the contents of the scripts you use to check and build data. They are likely called `check_data.py` and `build_data.py`, in your `scripts` folder. Unless you need special customisations, you can use the exact versions from the data starter ([check_data.py](https://github.com/open-sdg/open-sdg-data-starter/blob/develop/scripts/check_data.py) and [build_data.py](https://github.com/open-sdg/open-sdg-data-starter/blob/develop/scripts/build_data.py).

If you are not able to use this new YAML-based configuration approach, or you would prefer not to, you can use the sdg-build classes directly, as demonstrated in the [sdg-build example](https://github.com/open-sdg/sdg-build/blob/master/docs/examples/open_sdg.py). This requires some knowledge of Python.

### Update some special metadata fields, if you use them

The expected structure of the `data_start_values` metadata field has changed to be a list of objects, rather than a list of strings. See an [example of using data_start_values](../indicator-configuration.md#data_start_values). If you use `data_start_values` for any indicators, update their structure before going further.

### Confirm that your data and metadata passes validation

The validation rules for data and metadata have changed, in some ways becoming more strict. To save time in resolving any issues, you can run the validation locally (if you have Python 3 installed) like so:

```
pip install -r scripts/requirements.txt
python scripts/check_data.py
```

If you see no output from the above command, that means your data and metadata is already fine. However if you see any output, you will need to fix your data and/or metadata as described in the output.

### Copy over any local translations from your site repository

With Open SDG 1.0.0, it is recommended that your "local" custom translations be in your data repository instead of your site repository. If you have any such translations, they are likely in a "data/translations" folder in your site repository. You can simply move them over as-is.

The new locations for the translations should be in a folder in your data repository called `translations`, as demonstrated by the [data starter translations folder](https://github.com/open-sdg/open-sdg-data-starter/tree/develop/translations).

For example, if you had translations in your site repository at `/my-site-repository/data/translations` and your data repository is at `/my-data-repository`, then you would move them over with something like this:

```
mv /my-site-repository/data/translations /my-data-repository/
```

Afterwards you should have a folder of translations at `/my-data-repository/translations`.

### Deploy the updated data repository

At this point your data repository is ready to be deployed in the usual way, by merging the changes to the `develop` branch.

## Site repository updates

Next you should make the following updates to your site repository.

### Update version of Open SDG to 1.0.0

In your `_config.yml` file, update the version of Open SDG in `remote_theme`, like so:

```
remote_theme: open-sdg/open-sdg@1.0.0
```

### Update version of jekyll-open-sdg-plugins to 1.0.0

In your Gemfile, update the version of jekyll-open-sdg-plugins like so:

```
gem "jekyll-open-sdg-plugins", "1.0.0"
```

### Delete all indicator files, goal files, and some pages

Open SDG is now capable of automatically creating your indicators, goals, and some of your pages. This allows you to remove them from your site repository.

You still have the option of leaving them in, but it is recommended to remove them unless you have special circumstances that requires them.

If you chose to remove them, you can delete the following folders/files, if needed:

* the entire `_indicators` folder
* the entire `_goals` folder
* the following pages (along with any translated versions):
    * `index.md` (the home page)
    * `search.md` (the search page)
    * `reporting-status.md` (the reporting status page)
    * `indicators.json` (the data for the search page)

### Perform some updates to the `_config.yml` file

The following **changes** should be made in the `_config.yml` file, if needed:

* Change `remotedatabaseurl` to `remote_data_prefix`
* Check the format of the `menu` settings and make sure they match the [site starter config](https://github.com/open-sdg/open-sdg-site-starter/blob/develop/_config.yml#L76)
* Update the `map_layers` configuration, if your site is using the Open SDG mapping functionality. In particular:
    * Remove each map layer's `serviceUrl`, `nameProperty`, and `idProperty`
    * Add a `subfolder` (which should match the `output_subfolder` you added to your data repository)
    * Add a `label` (a human-readable description of the layer, which will be displayed on a download button)

The following config settings can be **removed**, if needed:

* Remove `remote_translations`
* Remove `jekyll_get_json`
* Remove `repo_name`, `branch`, and `org_name`
* Remove `defaults` (unless you had a custom use for it)
* Remove `- jekyll-get-json` from `plugins` if it's there
* Remove `custom_css` (and see below about updating custom CSS)
* Remove `twitter` and `facebook`

The follow config settings should be **added**, if needed:

* Add `data_edit_url` as done in [the site starter config](https://github.com/open-sdg/open-sdg-site-starter/blob/develop/_config.yml#L22)
* Add `metadata_edit_url` as done in [the site starter config](https://github.com/open-sdg/open-sdg-site-starter/blob/develop/_config.yml#L24)
* Add `create_indicators` as done in [the site starter config](https://github.com/open-sdg/open-sdg-site-starter/blob/develop/_config.yml#L28)
* Add `create_goals` as done in [the site starter config](https://github.com/open-sdg/open-sdg-site-starter/blob/develop/_config.yml#L30)
* Add `create_pages` as done in [the site starter config](https://github.com/open-sdg/open-sdg-site-starter/blob/develop/_config.yml#L32)
* Add and cusotmise `footer_menu` as done in [the site starter config](https://github.com/open-sdg/open-sdg-site-starter/blob/develop/_config.yml#L90)
* Add `non_global_metadata` as done in [the site starter config](https://github.com/open-sdg/open-sdg-site-starter/blob/develop/_config.yml#L100)
* If you are using the Armenian language, and would like to continue using a language code of "am", you should add the following:
    ```
    languages_public:
      hy: am
    ```
* If you are using the Kazakh language, and would like to continue using a language code of "kz", you should add the following:
    ```
    languages_public:
      kk: kz
    ```
* If you are upgradiing to 1.0.0 from a much lower version, there may be additional settings needed. You should scan through [the site starter config](https://github.com/open-sdg/open-sdg-site-starter/blob/develop/_config.yml) and decide if there is anything else you need to add to yours.

### Update any custom CSS

As you may have gathered from above, the `custom_css` configuration option is deprecated in favor of a more standard Jekyll approach. To add custom styles it is recommended to put a `custom.scss` in your site repository's `_sass` folder. This has the effect of overriding [the `_sass/custom.css` file in Open SDG](https://github.com/open-sdg/open-sdg/blob/master/_sass/custom.scss).

In short, create a `_sass` folder and a file inside it called `custom.scss`. Copy all of your custom CSS into this folder.

> **Important**: This file should NOT include the `---` lines at the top, like you
> may have had previously. You must remove those lines.

### Custom includes and layouts

If you have any files in your `_includes` and `_layouts` folders, you will most likely need to adjust them, as nearly every include/layout in Open SDG has changed. For each of these, the easiest route depends on how much you modified your version from the original:

#### For overrides with only small changes

If your version of a file contains only small changes from the original, you may find it easier to start with the updated originals from this theme (see [the Open SDG `_includes` folder](https://github.com/open-sdg/open-sdg/tree/master/_includes) and [the Open SDG `_layouts` folder](https://github.com/open-sdg/open-sdg/tree/master/_layouts)) and re-do your changes.

#### For overrides with large amounts of changes

If your version of a file is dramatically changed from the original, you may find it easier to understand what changed in version 1.0.0, and make those changes to your own version. See [this diff between 0.10.0 and 1.0.0](https://github.com/open-sdg/open-sdg/compare/0.10.0...1.0.0) and look for the file in question. In general, the main changes will be:

* `t` has changed to `page.t`. Eg: t.general.goal is now page.t.general.goal.
* Global variables like `meta`, `current_language`, etc. are no longer available, and have been replaced with variables on the `page` object, as described in [the Jekyll template customisation docs](../jekyll-templates.md).

### Test your site locally

Because this is a major version change, it is recommended that you test your site locally. As described in [the local development docs](../development.md), this requires Ruby, and the following commands:

```
bundle install
bundle exec jekyll serve
```

### Deploy the updated site repository

At this point your site repository is ready to be deployed in the usual way, by merging the changes to the `develop` branch.
