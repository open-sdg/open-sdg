<h1>Upgrading to 1.0.0</h1>

This document is intended for developers, to help with the process of upgrading to version 1.0.0 of Open SDG, from any previous release. In particular, this will detail the requirements of 1.0.0, the recommended procedures for upgrading, and the breaking changes to look out for.

## Data repository updates

As a first step, it is recommended to make the following updates to your data repository.

### Upgrade to sdg-build 1.0.0

Update your `requirements.txt` file to:

```
git+git://github.com/open-sdg/sdg-build@1.0.0
```

### Take advantage of YAML-based configuration

If you are using the default data management approach -- .CSV files for data and .MD files for metadata -- then it is recommended that you adopt a new, simpler data repository configuration. You can do this by emulating the [data starter](https://github.com/open-sdg/open-sdg-data-starter), but here are the details:

1. Add a configuration file called `config_data.yml`. Start with [this file](https://github.com/open-sdg/open-sdg-data-starter/blob/develop/config_data.yml) and edit as needed. In particular, adjust the `languages` list.
2. Replace the contents of the scripts you use to check and build data. They are likely called `check_data.py` and `build_data.py`, in your `scripts` folder. Unless you need special customisations, you can use the exact versions from the data starter, [here](https://github.com/open-sdg/open-sdg-data-starter/blob/develop/scripts/check_data.py) and [here](https://github.com/open-sdg/open-sdg-data-starter/blob/develop/scripts/build_data.py).

If you are not able to use this new YAML-based configuration approach, or you would prefer not to, you can use the sdg-build classes directly, as demonstrated [here](https://github.com/open-sdg/sdg-build/blob/master/docs/examples/open_sdg.py).

### Confirm that your data and metadata passes validation

The validation rules for data and metadata have changed, in some ways becoming more strict. To save time in resolving any issues, you can run the validation locally (if you have Python 3 installed) like so:

```
pip install -r scripts/requirements.txt
python scripts/check_data.py
```

If you see no output from the above command, that means your data and metadata is already fine. However if you see any output, you will need to fix your data and/or metadata as described in the output.

### Copy over any translations from your site repository

With Open SDG 1.0.0, it is recommended that your custom translations be in your data repository instead of your site repository. You can simply move them over as-is. They should be in a folder in your data repository called `translations`, as described [here](https://github.com/open-sdg/open-sdg-data-starter/tree/develop/translations).

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

The following changes should be made in the `_config.yml` file, if needed:

* Change `remotedatabaseurl` to `remote_data_prefix`
* Check the format of the `menu` settings and make sure they match what is [here](https://github.com/open-sdg/open-sdg-site-starter/blob/develop/_config.yml#L68)
* Change the value of `goal_image_base` to the following (unless you need it pointed to a particular place): https://open-sdg.github.io/translations-un-sdg/assets/img/goals

The following config settings can be removed, if needed:

* Remove `remote_translations`
* Remove `jekyll_get_json`
* Remove `repo_name`, `branch`, and `org_name`
* Remove `defaults` (unless you had a custom use for it)
* Remove `- jekyll-get-json` from `plugins` if it's there
* Remove `custom_css` (and see below about updating custom CSS)
* Remove `twitter` and `facebook`

The follow config settings should be added, if needed:

* Add `data_edit_url` as done [here](https://github.com/open-sdg/open-sdg-site-starter/blob/develop/_config.yml#L20)
* Add `metadata_edit_url` as done [here](https://github.com/open-sdg/open-sdg-site-starter/blob/develop/_config.yml#L22)
* Add `create_indicators` as done [here](https://github.com/open-sdg/open-sdg-site-starter/blob/develop/_config.yml#L26)
* Add `create_goals` as done [here](https://github.com/open-sdg/open-sdg-site-starter/blob/develop/_config.yml#L28)
* Add `create_pages` as done [here](https://github.com/open-sdg/open-sdg-site-starter/blob/develop/_config.yml#L30)
* Add and cusotmise `footer_menu` as done [here](https://github.com/open-sdg/open-sdg-site-starter/blob/develop/_config.yml#L82)
* Add `non_global_metadata` as done [here](https://github.com/open-sdg/open-sdg-site-starter/blob/develop/_config.yml#L94)

### Update any custom CSS

As you may have gathered from above, the `custom_css` configuration option is deprecated in favor of a more standard Jekyll approach. To add custom styles it is recommended to put a `custom.scss` in your site repository's `_sass` folder. This has the effect of overriding [this file](https://github.com/open-sdg/open-sdg/blob/master/_sass/custom.scss).

In short, create a `_sass` folder and a file inside it called `custom.scss`. Copy all of your custom CSS into this folder.

> **Important**: This file does NOT need the `---` lines at the top, like you
> may have had previously. You must remove those lines.

### Map configuration

TODO

### Custom includes and layouts

TODO
