<h1>Site configuration</h1>

In addition to the [usual Jekyll configuration options](https://jekyllrb.com/docs/configuration/), there are many options specific to Open SDG. These are detailed below, along with usage examples. **All of these settings go in the `data/site_config.yml` file.** Alternatively, you can make changes using the site configuration forms.

This document covers the "site configuration", which is distinct from "data configuration". See more [details on data configuration](data-configuration.md).

_Note about "strings": Many of the settings detailed here contain human-readable "strings" (ie, text). In most cases, they can be replaced by [translation keys](translation.md) for better multilingual support. For example, "Indicator" could be replaced with "general.indicator"._

> To see many of these options in action, the [site starter repository](https://github.com/open-sdg/open-sdg-site-starter) contains an [example config file](https://github.com/open-sdg/open-sdg-site-starter/blob/develop/_config.yml).

### analytics

_Optional_: This setting can be used to facilitate the installation of Google Analytics. You can do this in multiple ways:

* ua (analytics.js)
* gtag (gtag.js)
* gtm (Google Tag Manager)

Google provides a number that would be used in each of these cases. The numbers typically have the following prefixes:

* UA-xxxxxxxx
* G-xxxxxxxx
* GTM-xxxxxxxx

To use this setting, put the appropriate number next to the corresponding item. For example:

```nohighlight
analytics:
  ua: UA-xxxxxxxx
  gtag: G-xxxxxxxx
  gtm: GTM-xxxxxxxx
```

Notes:

1. The don't need to use all of them. You can use 1, 2, or none at all.
1. The `ua` option was previously called `ga_prod` which also still works.
1. As an alternative to using these settings, you can alternatively override the `_includes/head-custom.html` and/or `_includes/scripts-custom.html` files in order to insert any Google Analytics snippets you might need.
1. The `ua` option also captures certain custom events, such as the clicking of the contrast toggle button.
1. If you are using the `cookie_consent_form` setting, these analytics will be automatically included in the cookie consent form. This allows the user to decline the setting of the following cookies: "_gat", "_gid", and "ga". If using the `gtag` approach, then some additional cookies may be set (see the [official documentation](https://developers.google.com/analytics/devguides/collection/analyticsjs/cookie-usage#gtagjs_google_analytics_4_-_cookie_usage)). You can specify these with an `extra_cookies` option, for example:

```
analytics:
  gtag: G-xxxxxxxx
  extra_cookies:
    - _ga_123456789
    - _gac_gb_123456789
```
