<h1>Customisation</h1>

## Jekyll configuration

Jekyll configuration is stored at the root of the site repository in a YAML file called `_config.yml`. General documentation about Jekyll configuration can be found in the [official Jekyll documentation](https://jekyllrb.com/docs/configuration/).

In addition to general Jekyll configurations, Open SDG needs some specific configurations. For more information on these, please see the [configuration page](configuration.md).

## Optional features

As with any Jekyll theme, Open SDG can be easily customised. The platform comes with some out-of-the-box optional features that can serve as examples of possible customisations.

### Optional feature: Goal page layouts

Open SDG includes two alternative [layouts](https://jekyllrb.com/docs/step-by-step/04-layouts/) for the 17 goal pages:

1. [`goal`](https://github.com/open-sdg/open-sdg/blob/master/_layouts/goal.html) - Indicators are displayed in a responsive grid
1. [`goal-by-target`](https://github.com/open-sdg/open-sdg/blob/master/_layouts/goal-by-target.html) - Targets on the left, and indicators on the right

If you are using the `create_goals` setting, you can change the layout as described on the [configuration page in the "create goals" section](configuration.md#create_goals).

Otherwise you can set the layout by adjusting the [front matter](https://jekyllrb.com/docs/front-matter/) of the goal file. For example, to use the goal-by-target layout, you would need this in the goal's front matter:

`layout: goal-by-target`

## Working with (remote) Jekyll themes

This project (the repository you are reading currently) functions as a [Jekyll theme](https://jekyllrb.com/docs/themes/), which can most easily be used with the help of the [Remote Theme plugin](https://github.com/benbalter/jekyll-remote-theme). As with any Jekyll theme (and as can be seen in the [folder structure of this project](https://github.com/open-sdg/open-sdg)) the entirety of the theme is contained in these 3 folders:

1. _includes
1. _layouts
1. assets
1. _sass

Any file in these folders can be "overridden" simply by placing the same file in your site repository. When Jekyll compiles the platform, it will give precedence to files in your site repository, over the corresponding file in this remote theme.

In this way, any of the files in these folders can be customised to your platform's needs, without requiring any changes to the files in this theme.

> **NOTE on the `_sass` folder**: Individual files in the `_sass` folder that start with an underscore (eg, `_maps.scss`) cannot be overridden in the method mentioned above, unless you also override the [open-sdg.scss file](https://github.com/open-sdg/open-sdg/blob/master/_sass/open-sdg.scss). This is a quirk of Jekyll's Sass implementation. Because of this it is recommended that you avoid overriding individual Sass files starting with underscores, and instead put your changes in a custom CSS file as detailed below.

> **NOTE**: If you make an improvement that you think would be useful to others, please
> submit it as a pull-request in this repository!

### Overriding Javascript

As you can see, the [main Javascript file](https://github.com/open-sdg/open-sdg/blob/master/assets/js/sdg.js) is simply a series of include statements, being aggregated into one file. Jekyll looks for "includes" in the `_includes` folder, and indeed you can see these individual Javascript files [in there](https://github.com/open-sdg/open-sdg/tree/master/_includes/assets/js). This gives you the ability to override any of these Javascript files individually.

The main takeaway here is that these indivdual Javascript files are in `_includes` rather than `assets`, as you might normally expect.

## Adding custom Javascript

Custom javascript can be added in 2 ways:

### 1. `custom_js` site configuration

The site configuration has a `custom_js` setting which can contain any number of paths to relative or remote javascript files.

### 2. `scripts-custom.html` include file

The `_includes/scripts-custom.html` file can be overridden to contain any HTML you would like. This HTML is automatically placed close to the closing `</body>` tag and is intended to have custom local or third-party javascript.

## Adding custom CSS

To add custom styles on top of the out-of-the-box Open SDG styles, it is recommended to put a `custom.scss` in your site repository's `_sass` folder. This has the effect of overriding [this placeholder file in the starter repository](https://github.com/open-sdg/open-sdg/blob/master/_sass/custom.scss).

## Overriding color via Sass variables

In many cases, you may want to override the colors being used throughout the site. Rather than putting these types of changes in a custom CSS file (as mentioned above) a much simpler method is to override "Sass variables".

You can find a full list of Sass variables related to color in [this Sass variables file](https://github.com/open-sdg/open-sdg/blob/master/_sass/variables/_colors.scss).

By contrast to the method for overriding layouts and includes (mentioned above), overriding Sass variables can be done in a more easily-maintainable way. Instead of overriding the file containing the Sass variables, you instead override [this placeholder file for Sass variable overrides](https://github.com/open-sdg/open-sdg/blob/master/_sass/variables.scss). This allows you to override only the specific variables you need to change.

## Rounding data values

To apply a site-wide data-rounding function, you can override the `opensdg.dataRounding` function. For example, you could include this in your custom javascript:

```
opensdg.dataRounding = function(value) {
    // Round to 2 decimal places.
    return Math.round(parseFloat(value) * 100) / 100;
}
```

* You may get unexpected behavior if you return a string - so it is recommended to return a number.
* The passed value could either be a number or string, so make sure to use `parseFloat` as above if you need to operate on a number.

## Altering data values before displaying

If you need to make any last-minute changes to data values before displaying, you can pass a callback function to the `opensdg.dataDisplayAlter` function. For example, you could include this in your custom javascript:

```
opensdg.dataDisplayAlter(function(value) {
    // Perform any alterations here.
    return value;
});
```

* Unlike with dataRounding, you can feel free to return a string here.

## Altering the Chart.js configuration

The charts in Open SDG use [Chart.js](https://www.chartjs.org/). You can perform any alterations you would like by passing a callback function to the `opensdg.chartConfigAlter` function. For example, you could include this in your custom javascript:

```
opensdg.chartConfigAlter(function(config) {
    var overrides = {
        // Override any configuration here.
    };
    $.extend(true, config, overrides);
});
```

## Altering the jQuery Datatables configuration

The tables in Open SDG use [jQuery Datatables](https://datatables.net/). You can perform any alterations you would like by passing a callback function to the `opensdg.tableConfigAlter` function. For example, you could include this in your custom javascript:

```
opensdg.tableConfigAlter(function(config) {
    var overrides = {
        // Override any configuration here.
    };
    $.extend(true, config, overrides);
});
```