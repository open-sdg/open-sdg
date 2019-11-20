<h1>Customisation</h1>

## Jekyll configuration

Jekyll configuration is stored at the root of the site repository in a YAML file called `_config.yml`. General documentation about Jekyll configuration can be found [here](https://jekyllrb.com/docs/configuration/).

In addition to general Jekyll configurations, Open SDG needs some specific configurations. For more information on these, please see the [configuration page](https://open-sdg.readthedocs.io/en/latest/configuration/).

## Optional features

As with any Jekyll theme, Open SDG can be easily customised. The platform comes with some out-of-the-box optional features that can serve as examples of possible customisations.

### Optional feature: Goal page layouts

Open SDG includes two alternative [layouts](https://jekyllrb.com/docs/step-by-step/04-layouts/) for the 17 goal pages:

1. [`goal`](https://github.com/open-sdg/open-sdg/blob/master/_layouts/goal.html) - Indicators are displayed in a responsive grid
1. [`goal-by-target`](https://github.com/open-sdg/open-sdg/blob/master/_layouts/goal-by-target.html) - Targets on the left, and indicators on the right

As with any Jekyll layout, you can use these by adjusting the [front matter](https://jekyllrb.com/docs/front-matter/) of the goal file. For example, to use the goal-by-target layout, you would need this in the goal's front matter:

`layout: goal-by-target`

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

## Working with Jekyll templates

Jekyll provides a `page` variable for use in any of files in `_layouts` and `_includes` (referred to here as "templates"). This `page` variable contains helpful contextual information about the current page being rendered. Open SDG adds additional information for your use.

### Variables available on all pages

The following variables can be used on any page:

#### page.goals

An array of all the SDG Goals available. Each item in the array contains information about the goal. See "Goal objects" below.

Usage example - printing the names of each goal:

```
{% for goal in page.goals %}
  {{ goal.name }}
{% endfor %}
```

#### page.targets

An array of all the SDG Targets available. Each item in the array contains information about the target. See "Target objects" below.

Usage example - printing the names of each target:

```
{% for target in page.targets %}
  {{ target.name }}
{% endfor %}
```

#### page.indicators

An array of all the SDG Indicators available. Each item in the array contains information about the indicator. See "Indicator objects" below.

Usage example - printing the names of each indicator:

```
{% for indicator in page.indicators %}
  {{ indicator.name }}
{% endfor %}
```

#### page.baseurl

This should be used instead of `site.baseurl`, because it includes necessary subfolders according to the language of the current page.

Usage example - printing a link to another page:

```
<a href="{{ page.baseurl }}/my-page/">My page</a>
```

#### page.language

The language code for the current page.

Usage example - printing the current language code:

```
The current language code is {{ page.language }}.
```

#### page.language_public

The "public" language code for the current page. This may be different from `page.language` in special cases where you prefer a language code that is different from the standard language code for your language. Most sites will not use this.

Usage example - printing the current public language code:

```
The current language code is {{ page.language }}, but the "public" language code is {{ page.language_public }}.
```

#### page.t

The translations for the current language. More detail on this is available [here](https://open-sdg.readthedocs.io/en/latest/configuration/).

Usage example - printing the translation of the word "Goal" (which is available with the key "goal" in the "general" group:

```
{{ page.t.general.goal }}
```

### Variables available on Goal pages only

The following variables can be used on goal pages only:

#### page.goal

Information about the current goal. See "Goal objects" below.

Usage example - printing the name of the current goal:

```
{{ page.goal.name }}
```

### Variables available on Indicator pages only

The following variables can be used on indicator pages only:

#### page.goal

Information about the current goal. See "Goal objects" below.

Usage example - printing the name of the current goal:

```
{{ page.goal.name }}
```

#### page.target

Information about the current target. See "Target objects" below.

Usage example - printing the name of the current target:

```
{{ page.target.name }}
```

#### page.indicator

Information about the current indicator. See "Indicator objects" below.

Usage example - printing the name of the current indicator:

```
{{ page.indicator.name }}
```

### Goal objects

The goal objects mentioned above in `page.goal` and `page.goals` each contain the following information:

* icon - the URL of the goal's icon, for the current language
    Example: "https://example.com/goal-icons/english/goal-1.png"
* name - the translated name of the goal
    Example: "End poverty in all its forms everywhere"
* number - the number of the goal
    Example: "1", "2", etc.
* short - the translated short name of the goal
    Example: "No poverty"
* slug - the slug for the goal, for use in URLs
    For goals this is identical to "number"
* sort - a string suitable for use in sorting the goal
    Example: "01", "02", etc.
* url - the URL of the goal's page in the platform, for the current language
    Example: "/my-base-url/en/1/"

### Target objects

* goal_number - the number of the goal that the target is part of
    Example: "1", "2", etc.
* name - the translated name of the target
    Example: "By 2030, eradicate extreme poverty for all people everywhere, currently measured as people living on less than $1.25 a day"
* number - the number of the target
    Example: "1.1", "1.2", etc.
* slug - the slug for the target, for use in URLs
    Example: "1-1", "1-2", etc.
* sort - a string suitable for use in sorting the goal
    Example: "0101", "0102", etc.

### Indicator objects

* goal_number - the number of the goal that the indicator is part of
    Example: "1", "2", etc.
* name - the translated name of the indicator
    Example: "Proportion of population living below the national poverty line, by sex and age"
* number - the number of the indicator
    Example: "1.1.1", "1.2.1", etc.
* slug - the slug for the indicator, for use in URLs
    Example: "1-1-1", "1-2-1", etc.
* sort - a string suitable for use in sorting the indicator
    Example: "010101", "010201", etc.
* target_number - the number of the target that the indicator is part of
    Example: "1.1", "1.2", etc.
* url - the URL of the indicators's page in the platform, for the current language
    Example: "/my-base-url/en/1-1-1/"
* [all metadata fields for the indicator]
    The indicator object contains ALL metadata fields associated with the indicator, as set in the data repository.
