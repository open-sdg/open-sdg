<h1>Customisation</h1>

## Jekyll configuration

Jekyll configuration is stored at the root of the site repository in a YAML file called `_config.yml`. General documentation about Jekyll configuration can be found [here](https://jekyllrb.com/docs/configuration/).

The [site starter repository](https://github.com/open-sdg/open-sdg-site-starter) contains and [example config file](https://github.com/open-sdg/open-sdg-site-starter/blob/develop/_config.yml) with documentation of each of the platform-specific settings.

## Working with (remote) Jekyll themes

This project (the repository you are reading currently) functions as a [Jekyll theme](https://jekyllrb.com/docs/themes/), which can most easily be used with the help of the [Remote Theme plugin](https://github.com/benbalter/jekyll-remote-theme). As with any Jekyll theme (and as can be seen in the [folder structure of this project](https://github.com/open-sdg/open-sdg)) the entirety of the theme is contained in these 3 folders:

1. _includes
1. _layouts
1. assets

Any file in these folders can be "overridden" simply by placing the same file in your site repository. When Jekyll compiles the platform, it will give precedence to files in your site repository, over the corresponding file in this remote theme.

In this way, any of the files in these folders can be customised to your platform's needs, without requiring any changes to the files in this theme.

> **NOTE**: If you make an improvement that you think would be useful to others, please
> submit it as a pull-request in this repository!

### Overriding Javascript

As you can see, the [main Javascript file](https://github.com/open-sdg/open-sdg/blob/master/assets/js/sdg.js) is simply a series of include statements, being aggregated into one file. Jekyll looks for "includes" in the `_includes` folder, and indeed you can see these individual Javascript files [in there](https://github.com/open-sdg/open-sdg/tree/master/_includes/assets/js). This gives you the ability to override any of these Javascript files individually.

The main takeaway here is that these indivdual Javascript files are in `_includes` rather than `assets`, as you might normally expect.

## Adding custom CSS

You may have noticed in the Jekyll configuration section above the `custom_css` option. Using this, you can easily add custom CSS files, to be loaded onto the page after the "default" CSS of this platform.
