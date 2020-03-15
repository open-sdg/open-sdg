<h1>Upgrading</h1>

## Open SDG dependencies

Your implementation of Open SDG depends on a few projects, which will occasionally release new versions. This is an overview of those dependencies, and the procedure for upgrading them.

### open-sdg (the Jekyll theme)

The [open-sdg Jekyll theme](https://github.com/open-sdg/open-sdg) (hereafter referred to as "open-sdg") is the main dependency, and the most frequently updated.

#### open-sdg -- Upgrade procedure

The version of open-sdg is controlled in the `_config.yml` file of your **site repository**. To upgrade, simply change the tag number referenced in that file. For example, if you are using version 0.9.0, the line in your `_config.yml` file might look like this:

```
remote_theme: open-sdg/open-sdg@0.9.0
```

To upgrade to version 1.0.0, you would change it to this:

```
remote_theme: open-sdg/open-sdg@1.0.0
```

#### open-sdg -- Considerations for upgrading

A common way of customising a Jekyll theme is to override any of the files in the `_includes`, `_layouts`, `_sass`, or `assets` folders. This allows for a great deal of flexibility, but it is important to be aware of these overrides when performing an upgrade. If the file that you are overriding has been changed in the upgraded version of open-sdg, your implementation will not "see" the upgraded file. Instead it will continue to use your overriding version.

In most cases, the worst that will happen is that you will miss out on any improvements or fixes that were made in that file. However, in some rare cases where an upgrade involves a breaking change, you may need to adjust your overridden versions of files. For this reason, here are some best practices in regards to overriding Jekyll theme files:

1. When possible, avoid overriding files. Prefer configuration changes and style changes, if possible, over overrides of files.
2. If an override is necessary, try to override `_includes` files before overriding `_layouts` files. The `_includes` files are smaller and easier to maintain.
3. When performing an upgrade, check the [changelog](./changelog/) to see if any of your overridden files have changed. If so, read the details in the changelog to help decide if you need to make any adjustments in your overridden versions.

### jekyll-open-sdg-plugins

The [jekyll-open-sdg-plugins](https://github.com/open-sdg/jekyll-open-sdg-plugins) project is a set of Jekyll plugins necessary for open-sdg to function.

#### jekyll-open-sdg-plugins -- Upgrade procedure

The version of jekyll-open-sdg-plugins is controlled in the `Gemfile` file of your **site repository**. To upgrade, simply change the tag number referenced in that file. For example, if you are using version 0.9.0, the line in your `Gemfile` file might look like this:

```
gem "jekyll-open-sdg-plugins", "0.9.0"
```

To upgrade to version 1.0.0, you would change it to this:

```
gem "jekyll-open-sdg-plugins", "1.0.0"
```

#### jekyll-open-sdg-plugins -- Considerations for upgrading

Unlike open-sdg, the jekyll-open-sdg-plugins project is not overridden -- it is simply used as-is. Consequently, there are no special considerations for upgrading. The open-sdg changelog mentioned above will alert you when/if you ever need to upgrade your version of jekyll-open-sdg-plugins.

### sdg-build

The [sdg-build](https://github.com/open-sdg/sdg-build) project is a Python library that is necessary for preparing the data that open-sdg expects.

#### sdg-build -- Upgrade procedure

The version of sdg-build is controlled in the `requirements.txt` file of your **data repository**. To upgrade, simply change the tag number referenced in that file. For example, if you are using version 0.9.0, the line in your `requirements.txt` file might look like this:

```
git+git://github.com/open-sdg/sdg-build@0.9.0
```

To upgrade to version 1.0.0, you would change it to this:

```
git+git://github.com/open-sdg/sdg-build@1.0.0
```

#### sdg-build -- Considerations for upgrading

Unlike open-sdg, the sdg-build project is not overridden -- it is simply used as-is. Consequently, there are no special considerations for upgrading. The open-sdg changelog mentioned above will alert you when/if you ever need to upgrade your version of sdg-build.

One exception for advanced users: if you are using object-oriented Python code to extend the sdg-build library, you will likely want to keep a close eye on any changes to the sdg-build API.

### sdg-translations

The labels, blurbs, and miscellaneous copy in Open SDG depend on a separate project containing translations:

* [sdg-translations](https://github.com/open-sdg/sdg-translations), which contains translations specific to Open SDG and translations of UN-controlled metadata about the indicators

This project is updated rarely, but may occasionally get fixes, or new translations as features are added to Open SDG.

#### translations -- Upgrade procedure

The version of these translations is typically controlled in the `config_data.yml` file of your **data repository**. (In more customised builds, it may be inside of a short Python script.) To upgrade, simply change the tag number referenced in that file. For example, if you are using version 0.9.0, the line in your `config_data.yml` file might look like this:

```
translations:
  - https://github.com/open-sdg/sdg-translations.git@0.9.0
```

To upgrade to version 1.0.0, you would change it to this:

```
translations:
  - https://github.com/open-sdg/sdg-translations.git@1.0.0
```

#### translations -- Considerations for upgrading

Upgrading versions of a translation repository will not cause anything to break. However, it is a good idea to be aware what is changing, so that the new copy/labels/blurbs do not come as a surprise. Each translation repository will have detailed change records for a new release.

## Note about version numbers

The projects discussed here all use "semantic versioning" -- a three-part version number, where each part has a special meaning:

[major release].[minor release].[hotfix release]

For example, the version number `1.6.2` means major release 1, minor release 6, and hotfix release 2.

Here are some important rules-of-thumb about version numbers:

* Upgrading from one *hotfix* release to another can always be done with confidence. For example, you can upgrade from `1.6.2` to `1.6.3` without worrying about anything breaking.
* Upgrading from one *minor* release to another should involve some testing. For example, you can upgrade from `1.6.2` to `1.7.0`, but you should test first on a non-production environment.
* Upgrading from one *major* release to another will likely involve significant configuration changes and careful testing. For example, you can upgrade from `1.6.2` to `2.0.0`, but you should expect to spend plenty of time on configuration changes and testing.
