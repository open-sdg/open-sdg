<h1>Production environments</h1>

Having two environments deployed at once gives you the option to treat one as "staging" and the other as "production". The idea here is that the staging environment is where you most often make changes and try things out, and the production environment is a stable version of the site which is updated less often. The production environment would be the environment that the general public is expected to use.

## Production site and production data

The typical Open SDG setup involves 2 separately-hosted repositories: the [site repository](../glossary.md#site-repository) and the [data repository](../glossary.md#data-repository). Both of these can have the staging/production versions, giving you a total of four environments:

* Staging data
* Staging site
* Production data
* Production site

As you would expect, the production site should be configured to display the production data, and likewise the staging site should be configured to display the staging data.

This arrangement gives you the freedom to make both data changes and site changes, without any fear of affecting your public-facing "production" environment.

## Production configuration

Typically you may need your production environment to be configured differently than your staging environment. For example, you may want [analytics](../analytics.md) on traffic to your production site, but you not your staging site.

To accomplish this, you should have special configuration files that apply only to your production environment. If you started with the [site starter](https://github.com/open-sdg/open-sdg-site-starter), then you already have two such files:

* [/_config_prod.yml](https://github.com/open-sdg/open-sdg-site-starter/blob/develop/_config_prod.yml): This file contains any Jekyll configuration that should apply only to your production environment. The most common settings are below:
    * `baseurl`: Assuming your site is hosted with GitHub Pages, you may notice that your site appears in a subfolder which is the same as your site repository name. However you probably don't want that for your production site, so this `baseurl` configuration should be set to `""` in your production configuration.
* [/_data/site_config_prod.yml](https://github.com/open-sdg/open-sdg-site-starter/blob/develop/_data/site_config_prod.yml): This file contains any Open SDG configuration that should apply only to your production environment. The most common settings are below:
    * `remote_data_prefix`: As mentioned above, you can also have "production data". This is where you would point your production site to your production data.
    * `analytics`: Also as mentioned above, you probably only want analytics for your production traffic, and so that can be configured here.

Note that the production configuration files need not contain all the settings from the staging configuration files. They only need to contain those settings that you want to be different from staging.

## Jekyll command for compiling the production site

The staging site is compiled with the following command:

```
bundle exec jekyll build
```

But for the production site, the command is different:

```
JEKYLL_ENV=production bundle exec jekyll build --config _config.yml,_config_prod.yml
```

There are two important differences to note:

1. The `JEKYLL_ENV=production` is necessary to include the `_data/site_config_prod.yml` file described above.
2. The `--config _config.yml,_config_prod.yml` is necessary to include the `_config_prod.yml` file described above.

## Hosting location

Government policy may dictate your choice of where to host your production environment. The easiest option is GitHub Pages, which will be detailed below. But if GitHub Pages is not an option for you, common alternatives are an [on-premise server](./linux-server.md) or a [cloud provider](./aws-s3.md). Be aware that these choices do carry some cost (however small).

## GitHub Pages for a production environment

Using GitHub Pages to host your production environment is a good option, because it is free to use, reliable, and requires no maintenance. The setup process is fairly similar to the [quick start](../quick-start.md) procedure, but requires a bit more explanation. For a complete explanation of the details, see [here](./github-pages-production.md).
