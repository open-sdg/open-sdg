# Customisation

Prior to getting started with customising the platform, you should have already forked a "starter" repository, and renamed it to something like `sdg-indicators-sweden` (for example). If you have not done this yet, [start here](forking.md). In this documentation we will refer to this as the "site repository".

## Jekyll configuration

Jekyll configuration is stored at the root of the site repository in a YAML file called `_config.yml`. General documentation about Jekyll configuration can be found [here](https://jekyllrb.com/docs/configuration/).

Additionally, here are some commonly-used configuration items specific to this platform, along with examples in the YAML format. You will need to update these options in your `_config.yml` file:

```
# This tells the platform's Javascript code where pull remote data from.
remotedatabaseurl: "https://my-github-organisation.github.io/sdg-data-sweden"

# This tells Jekyll itself where to pull remote data from.
jekyll_get_data:
  # Pull in the metadata for all the indicators.
  - data: meta
    json: 'https://my-github-organisation.github.io/sdg-data-sweden/meta/all.json'
  # Pull in the headlines for all the indicators.
  - data: headlines
    json: 'https://my-github-organisation.github.io/sdg-data-sweden/headline/all.json'
  # Pull in the metadata schema for the indicators.
  - data: schema
    json: 'https://my-github-organisation.github.io/sdg-data-sweden/meta/schema.json'
  # Pull in the text translations for SDG-related words/phrases.
  - data: translations
    json: 'https://opendataenterprise.github.io/sdg-translations/translations.json'

# Set the email addresses that appear on the platform
email_contacts:
  questions: questions@example.com
  suggestions: suggestions@example.com
  functional: functional@example.com

# For Prose.io integration, some information about the "data repository".
repo_name: sdg-data-sweden
branch: develop
org_name: my-github-organisation

# Some information about your locale.
country:
  name: Sweden
  adjective: Swedish

# Control the items in the main menu.
menu:
  - path: /reporting-status
    translation_key: reporting_status
  - path: /about
    translation_key: about
  - path: /guidance
    translation_key: guidance
  - path: /faq
    translation_key: faq

# The list of languages that are translated. The first one is the default.
# This is a required setting, but if you don't want to use other languages,
# you can just have one language listed here.
languages:
  - en
  - es
  - fr

# Tell Jekyll to use the Remote Theme plugin.
plugins:
  - jekyll-remote-theme

# Tell the Remote Theme plugin to use this project!
remote_theme: ONSDigital/sdg-theme

# Load any number of custom CSS files.
custom_css:
  - /assets/css/custom.css
```

## Working with (remote) Jekyll themes

This project (the repository you are reading currently) functions as a [Jekyll theme](https://jekyllrb.com/docs/themes/), which can most easily be used with the help of the [Remote Theme plugin](https://github.com/benbalter/jekyll-remote-theme). As with any Jekyll theme (and as can be seen in the [folder structure of this project](https://github.com/ONSDigital/sdg-theme)) the entirety of the theme is contained in these 3 folders:

1. _includes
1. _layouts
1. assets

Any file in these folders can be "overridden" simply by placing the same file in your site repository. When Jekyll compiles the platform, it will give precedence to files in your site repository, over the corresponding file in this remote theme.

In this way, any of the files in these folders can be customised to your platform's needs, without requiring any changes to the files in this theme.

> **NOTE**: If you make an improvement that you think would be useful to others, please
> submit it as a pull-request in this repository!

### Overriding Javascript

As you can see, the [main Javascript file](../../assets/js/sdg.js) is simply a series of include statements, being aggregated into one file. Jekyll looks for "includes" in the `_includes` folder, and indeed you can see these individual Javascript files [in there](../../_includes/assets/js). This gives you the ability to override any of these Javascript files individually.

The main takeaway here is that these indivdual Javascript files are in `_includes` rather than `assets`, as you might normally expect.

## Adding custom CSS

You may have noticed in the Jekyll configuration section above the `custom_css` option. Using this, you can easily add custom CSS files, to be loaded onto the page after the "default" CSS of this platform.

## Customisation through translation

In some cases, you may want to change a word or phrase in a minor way. As we have seen, this can be done by overriding any of the files in the theme, but perhaps that seems like "overkill". As an alternative, you can override text using the translation system. This is discussed in detail [here](translation.md), so this is mentioned here only to note this alternative approach to minor text customisations.
