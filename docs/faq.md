<h1>Frequently Asked Questions</h1>

## Is the Open SDG platform free to reuse?

Yes. Open SDG is open source and is free for anyone to reuse. See the [What does the NRP cost?](./about.md#what-does-the-nrp-cost) section for
more information.

## How do I copy the Open SDG platform?

The [Quick start](./quick-start.md) guide gives technical
instructions on the quickest way to get a copy of the open-sdg platform up and running.

## How long would it take to set up a copy of Open SDG

With the right skills, it should take less than a day to set up a standard copy, ready for data to be imported.

## Can the Open SDG platform be customised?

Yes. Copies of Open SDG can be adapted to local needs – technical developer resource will
be needed to do this. The [Customisation](./customisation.md) section gives detailed technical guidance.

## Can I monitor traffic to an Open SDG platform?

Yes. It's easy to start monitoring traffic to an Open SDG platform as there is Google Analytics functionality built in. In the [*_config_prod.yml* file](https://github.com/open-sdg/open-sdg-site-starter/blob/develop/_config_prod.yml#L19-L21) in the site repo, there is a placeholder, where you can add your Google Analytics tracking code.

To get a Google Analytics tracking code, sign in to Google and then [create a Google Analytics account](https://analytics.google.com/analytics/web/provision/#/provision/create). After you enter your website's details, you will be given a tracking code.

For more information about using Google Analytics with an Open SDG platform, see the [Analytics](./analytics.md) section.

## Are maps available in Open SDG?

Yes. Maps can be automatically generated from the data if GeoCodes are included and the required geographical boundary files are available: see the UK and Rwanda links below for examples of how these look and operate.
- [Map for UK indicator 3.a.1](https://sustainabledevelopment-uk.github.io/3-a-1/) ('Prevalence of tobacco use among persons aged 15 years and older')
- [Map for Rwanda indicator 1.2.1](https://sustainabledevelopment-rwanda.github.io/1-2-1/) (1.2.1: 'Proportion of population living below the national poverty line')

Maps from other systems or publications can also be embedded. See the [Maps](./maps.md) section
for more information, and the UK [Mapping guidance](https://github.com/ONSdigital/sdg-indicators/wiki/Mapping) for step-by-step instructions on setting up a map.

## Can content from other websites be embedded in Open SDG?

Yes, content can be embedded into the indicator page using HTML.
- [Embedded content as a tab](https://sustainabledevelopment-uk.github.io/3-4-2/) - link to [code example](https://raw.githubusercontent.com/ONSdigital/sdg-data/master/meta/3-4-2.md)
- [Embedded content as main feature](https://sustainabledevelopment-uk.github.io/17-13-1/) - link to [code example](https://raw.githubusercontent.com/ONSdigital/sdg-data/master/meta/17-13-1.md)

## Can the Open SDG platform be translated into other languages?

Yes – Open SDG has been designed to be multilingual. As well as English, many elements
are already available in French and Spanish. The [Translation](./translation.md) section gives more technical information, including
how to add a language.

## Can I use Open SDG with other databases?

Open SDG is designed to read its data from CSV files. But it is possible to use scripts to "pre-process" your data, fetching it from a database and then writing it to CSV files. This will require coding expertise in a language such as Python or PHP.

## Does Open SDG work with SDMX?

We are currently developing functionality which will allow Open SDG users to import and export data in SDMX format.

## In what formats are data available?

Currently data can be downloaded in CSV format for every indicator that has data. For indicators that have maps, data can also be downloaded in GeoJSON format.

## Can data in a platform be accessed via API?

The data and metadata for an Open SDG implementation is available at predictable and documented paths and so can be accessed programmatically as described below:

**data**: https://[GITHUB ORGANISATION].github.io/[DATA REPO NAME]/data/[INDICATOR CODE].json e.g. https://onsdigital.github.io/sdg-data/data/1-2-1.json

**metatdata**: https://[GITHUB ORGANISATION].github.io/[DATA REPO NAME]/meta/[INDICATOR CODE].json e.g. https://onsdigital.github.io/sdg-data/meta/1-2-1.json

## What is the difference between the double-repository and the single-repository approach?

With the **double-repository** approach, site content is kept separate from data/metadata by splitting them into two repositories: a *site repository* and a *data repository*. This is the most popular approach, because it provides the following benefits:

1. The staff responsible for updating the site repository can be different from the staff responsible for updating the data repository. This allows for more fine-grained user management.
2. Activity logs on the site repository do not appear on the data repository, and vice versa. This helps make the process of maintenance and review easier.
3. Having the data and site in separate repositories adds a layer of protection against accidental version control problems.

The double-repository approach is detailed in the [Quick Start](./quick-start.md) with the help of the [site starter](https://github.com/open-sdg/open-sdg-site-starter) and [data starter](https://github.com/open-sdg/open-sdg-data-starter) template projects.

By contrast, with the **single-repository** approach, site content and data/metadata are contained with the same single repository. This approach can be useful for local testing and development, as it simplifies the architecture of the platform. The benefits include:

1. Faster quick-start process
2. Simpler workflow for testing out changes locally

The single-repository is exemplified in the [simple starter](https://github.com/open-sdg/open-sdg-simple-starter) template project.

## Can content from other websites be embedded in Open SDG?

Yes, content can be embedded using HTML. You can either embed content in a tab in the data tab panel as shown [here](https://sustainabledevelopment-uk.github.io/3-4-2/) or as main content as shown [here](https://sustainabledevelopment-uk.github.io/17-13-1/).

