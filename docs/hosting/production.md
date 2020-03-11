<h1>Production environments</h1>

Having two environments deployed at once gives you the option to treat one as "staging" and the other as "production". The idea here is that the staging environment is where you most often make changes and try things out, and the production environment is a stable version of the site which is updated less often. The production environment would be the environment that the general public is expected to use.

## Production site and production data

The typical Open SDG setup involves 2 separately-hosted repositories: the [site repository](../glossary/#site-repository) and the [data repository](../glossary/#data-repository). Both of these can have the staging/production versions, giving you a total of four environments:

* Staging data
* Staging site
* Production data
* Production site

As you would expect, the production site should be configured to display the production data, and likewise the staging site should be configured to display the staging data.

This arrangement gives you the freedom to make both data changes and site changes, without any fear of affecting your public-facing "production" environment.

## Production configuration

Typically you may need your production environment to be configured differently than your staging environment. For example, you may want [analytics](../analytics.md) on traffic to your production site, but you not your staging site.

To accomplish this, you should have a special configuration file that applies only to your production environment. If you started with the [site starter](https://github.com/open-sdg/open-sdg-site-starter), then you already have [such a file](https://github.com/open-sdg/open-sdg-site-starter/blob/develop/_config_prod.yml).

Here are the main bits of configuration to be aware of:

1. [baseurl](https://github.com/open-sdg/open-sdg-site-starter/blob/develop/_config_prod.yml#L14): Assuming your site is hosted with GitHub Pages, you may notice that your site appears in a subfolder which is the same as your site repository name. However you probably don't want that for your production site, so this `baseurl` configuration should be set to `""` in your production configuration.
2. [remote_data_prefix](https://github.com/open-sdg/open-sdg-site-starter/blob/develop/_config_prod.yml#L17): As mentioned above, you can also have "production data". This is where you would point your production site to your production data.
3. [analytics](https://github.com/open-sdg/open-sdg-site-starter/blob/develop/_config_prod.yml#L19): Also as mentioned above, you probably only want analytics for your production traffic, and so that can be configured here.

Note that the production configuration need not contain all the settings from the staging configuration. It only needs to contain those settings that are different.

## Hosting location

Government policy may dictate your choice of where to host your production environment. Common choices are an [on-premise server](./linux-server.md) or a [cloud provider](./aws-s3.md). Be aware that these choices do carry some cost (however small).

Another choice which is completely free is to host your production environment on GitHub Pages. Doing this is fairly similar to the [quick start](../quick-start.md) procedure, but requires a bit more explanation.

## GitHub Pages for a production environment

Using GitHub Pages is free and reliable, making it a great choice for hosting your production environment. However it does require some extra steps in regards to the URL of your site.

By default, a GitHub Pages site has a domain name equal to your GitHub organisation plus `.github.io`. In addition, as mentioned above, it typically requires the use of a subfolder equal to your site repository name.

For example, if your organisation is `my-stats-org` and your site repository name is `sdg-site`, then your default GitHub pages deployment might be available at `https://my-stats-org.github.io/sdg-site`.

For your production site you will likely want something much more simple and custom to your needs. A common approach is adding `sdg` as a subdomain, such as `https://sdg.example.com`.


