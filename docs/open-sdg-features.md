<h1>Open SDG features</h1>

Open SDG platforms are very customisable and there are a variety of optional features which can be easily configured.

## Multilingual
By default, the site is created in English but this can be changed and multiple languages can be added.

An example of a site just using the English language (default) is the [UK site](https://sustainabledevelopment-uk.github.io/).

An example of a site using multiple languages is the [Armenian site](https://armstat.github.io/sdg-site-armenia/).

## Monitoring traffic
Google Analytics functionality is built in to Open SDG so it's easy to start monitoring traffic to an Open SDG platform. A number of events can be tracked straight of out the box e.g. data downloads and more custom event tracking can easily be added.

For more information about using Google Analytics with an Open SDG platform, see the [Analytics section](analytics.md).

## Site search
Open SDG platforms have a search function, where users can search for terms to quickly help them find information.

By default, the following fields are searched:

- The title of an indicator, goal, or page i.e. words within an indicator title, short goal title, long goal title or page title e.g. FAQ
- The content of the indicator e.g. on the [UK 3.4.2 indicator page](https://sdgdata.gov.uk/3-4-2/) the content is the text which starts with "In 2018..." and ends with "[Further Quality and Methodology information](https://www.ons.gov.uk/peoplepopulationandcommunity/birthsdeathsandmarriages/deaths/methodologies/suicideratesintheukqmi) is available."
- The content of pages such as the About or FAQ page i.e. everything on the page below the title e.g on the [UK FAQ page](https://sdgdata.gov.uk/faq/), everything below the title (Frequently Asked Questions (FAQ)) is the page content
- The ID number of an indicator or goal e.g. 3 or 3.1.2

The search functionality also includes fuzzy search meaning the search function will also find pages that are likely to be relevant to a search term even when the term doesn't correspond exactly to the wanted information. For example, pages with searched fields that contain "smoke" or "smoker" may be returned when a user searches for "smoking". However, the project that is used for fuzzy search has implemented the feature for a set of languages, but not all. Currently, Open SDG languages supported include Arabic, English, French, German, Russian and Spanish (see the [full list of supported languages](https://lunrjs.com/guides/language_support.html)). If a language is not supported, the search feature will still work but it will find fewer results as the search query must be exact. For example, "smoking" would not return "smoke".

It is possible to "boost" one or more fields in the search index, so that more relevant fields will appear in search results. See the [search_index_boost configuration option](https://open-sdg.readthedocs.io/en/latest/configuration/#search_index_boost) for more information and guidance on how to configure this option.

It is also possible to index additional metadata fields, so that more fields are searched e.g. if you wanted the search to return pages where the graph title contains the search term. See the [search_index_extra_fields configuration option](https://open-sdg.readthedocs.io/en/latest/configuration/#search_index_extra_fields) for how to configure this.

## Charts

Open SDG supports several types of charts for displaying indicator data:

* Line: [example](https://visar.hagstofa.is/heimsmarkmidin/2-a-1), [documentation](../charts#line)
* Bar: [example](https://sustainabledevelopment-uk.github.io/2-1-2/), [documentation](../charts#bar)
* Binary (yes/no): [example](https://sdg.data.gov/1-5-1/), [documentation](../charts/#binary)

## Maps
By default, data uploaded to an Open SDG platform is displayed on a chart and a table. You can configure your platform and data to also display data on a map.

Some examples of data being shown on maps are:

* [5.1.a on Germany's national Open SDG platform](https://sustainabledevelopment-deutschland.github.io/5-1-a/)
* [3.c.1 on UK's Open SDG platform](https://sustainabledevelopment-uk.github.io/3-a-1/)

For guidance on how set up your site and data in order to be able to display data on a map (as well as on a chart and table), see the [Maps page](maps.md).

## Embedded content
Another way of showing data/information on a indicator page is by embedding content from other websites/applications.

An examples of embedded content as main content is a [macro-economic dashboard on the UK's Open SDG platform](https://sustainabledevelopment-uk.github.io/17-13-1/)

Content can also be embedded on a data tab next to the Chart and Table tabs.

Embedded features are configured in the indicator configuration files. See the [Embedded feature settings](indicator-configuration.md#embedded-feature-settings) section for more guidance.

## Targets on goal pages
By default, targets are not shown on the goal pages. An example of this is the [UK Open SDG platform](https://sustainabledevelopment-uk.github.io/1/).

However, Open SDG platforms can be configured to show targets on the goal pages. An example of this is [Armenia's Open SDG platform](https://armstat.github.io/sdg-site-armenia/1/)

For guidance on how to display targets on your goal pages, see the Customisations page [*Optional feature: Goal page layouts*](customisation.md#optional-feature-goal-page-layouts) section.

## Reporting status options
By default, the reporting status options dispayed are **Complete**, **In progress** and **Exploring data sources**. However, these options can be changed to meet your needs. For example, options can be removed or another option, **Not applicable**, can be used.

An example of using the default options is [Ghana's Reporting status page](https://sustainabledevelopment-ghana.github.io/reporting-status/).

An example of removing one of the options is the [UK's Reporting status page](https://sustainabledevelopment-uk.github.io/reporting-status/).

An example of using the **Not applicable** option is [Rwanda's Reporting status page](https://sustainabledevelopment-rwanda.github.io/reporting-status/).

For more detailed information see the [Reporting status](reporting-status.md) page.

## Display data for national indicators as well as global indicators
There are various approaches to publishing national and global indicators:

* National indiators are displayed next to global indicators but are tagged as 'national' to distinguish them, for example in [Armenia's platform](https://armstat.github.io/sdg-site-armenia/1/).

* Separate pages for national and global indicators within the same site, for example [Poland's platform](http://sdg.gov.pl/en).

* Separate sites for national and global indicators, for example [Germany's national indicator site](https://sustainabledevelopment-deutschland.github.io/en/) and [Germany's global indicator site](https://sustainabledevelopment-germany.github.io/en/).

## Accessibility High Contrast version
As well as the default contrast version, Open SDG also offers a high contrast version. By default two menu buttons show, to allow users to choose between the different contrast levels, for example on the [US site](https://sdg.data.gov/). Another approach is to use a contrast toggle button, for example on the [UK site](https://sustainabledevelopment-uk.github.io/).

For guidance on how to use the more accessible contrast button, see the Configuration page [contrast_type](configuration.md) section.

## Add pages
By default, there are four pages which show in the menu bar: Reporting status, About, Guidance and FAQ.

An example of using just the four default menu items is [Kyrgyzstan's site](https://sdg-kyrgyzstan.github.io/open-sdg-site-starter/en/)

An example of menu items being added is [UK's site](https://sustainabledevelopment-uk.github.io/)

Even though only four pages are linked to in the menu by default, there are other pages provided for use (e.g. Contacts, News) as well as the option to easily create your own pages.

For guidance on how to add more pages to the menu, see the Configuration page [menu](configuration.md#menu) section.

## Filter by disaggregation
Open SDG platforms allow data to be displayed in a way in which it can be filtered by disaggregation. This allows user to compare different breakdowns for a particular indicator.

An example of providing disaggregation filtering is [indicator 5.2.2 on the UK site](https://sustainabledevelopment-uk.github.io/5-2-2/).

This feature is configured with the data files. For guidance on how to provide disaggregation filtering, see the [Data format page](data-format.md).

## News, posts, and categories
Open SDG includes the ability to post news and updates to your site. In all respects, this functionality matches what is described in [this Jekyll documentation](https://jekyllrb.com/docs/posts/).

The [site starter](https://github.com/open-sdg/open-sdg-site-starter) includes 2 pages to support this functionality:

* a News page, which lists your posts (see an [example](https://open-sdg.github.io/open-sdg-site-starter/news/) and the [code](https://github.com/open-sdg/open-sdg-site-starter/blob/develop/_pages/news.md))
* a Categories page which lists the "categories" used in your posts (see an [example](https://open-sdg.github.io/open-sdg-site-starter/categories/) and the [code](https://github.com/open-sdg/open-sdg-site-starter/blob/develop/_pages/categories.md))

> *Note for multilingual sites*: The News and Categories pages mentioned above, as
> well as any posts you create, will need to be duplicated for each of your
> languages, and translated individually.
