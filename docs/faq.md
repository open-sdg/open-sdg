<h1>Frequently Asked Questions</h1>

## Is the Open SDG platform free to reuse?

Yes. Open SDG is open source and is free for anyone to reuse. See the [What does the NRP cost?](https://open-sdg.readthedocs.io/en/latest/about/#what-does-the-nrp-cost) section for
more information.

## How do I copy the Open SDG platform?

The [Quick start](https://open-sdg.readthedocs.io/en/latest/quick-start/) guide gives technical
instructions on the quickest way to get a copy of the open-sdg platform up and running.

## How long would it take to set up a copy of Open SDG

With the right skills, it should take less than a day to set up a standard copy, ready for data to be imported. 

## Can the Open SDG platform be customised?

Yes. Copies of Open SDG can be adapted to local needs – technical developer resource will
be needed to do this. The [Customisation](https://open-sdg.readthedocs.io/en/latest/customisation/) section gives detailed technical guidance.

## Are maps available in Open SDG?

Yes. Maps can be automatically generated from the data if GeoCodes are included and the required geographical boundary files are available: see the UK and Rwanda links below for examples of how these look and operate.
- [UK map](https://sustainabledevelopment-uk.github.io/3-a-1/) (3.a.1: 'Age-standardized prevalence of current tobacco use among persons aged 15 years and older')
- [Rwanda map](https://sustainabledevelopment-rwanda.github.io/1-2-1/) (1.2.1: 'Proportion of population living below the national poverty line, by sex and age')

Maps from other systems or publications can also be embedded. See the [Maps](https://open-sdg.readthedocs.io/en/latest/maps/) section
for more information, and the UK [Mapping guidance](https://github.com/ONSdigital/sdg-indicators/wiki/Mapping) for step-by-step instructions on setting up a map.

## Can content from other websites be embedded in Open SDG?

Yes, content can be embedded into the indicator page using HTML.
- [Embedded content as a tab](https://sustainabledevelopment-uk.github.io/3-4-2/) - link to [code example](https://raw.githubusercontent.com/ONSdigital/sdg-data/master/meta/3-4-2.md)
- [Embedded content as main content](https://sustainabledevelopment-uk.github.io/17-13-1/) - link to [code example](https://raw.githubusercontent.com/ONSdigital/sdg-data/master/meta/17-13-1.md)

## Can the Open SDG platform be translated into other languages?

Yes – Open SDG has been designed to be multilingual. As well as English, many elements
are already available in French and Spanish. The [Translation](https://open-sdg.readthedocs.io/en/latest/translation/) section gives more technical information, including
how to add a language.

## Can I use Open SDG with other databases?

Open SDG is designed to read its data from CSV files. But it is possible to use scripts to "pre-process" your data, fetching it from a database and then writing it to CSV files. This will require coding expertise in a language such as Python or PHP.

## Does Open SDG work with SDMX?

We are currently developing functionality which will allow Open SDG users to import and export data in SDMX format.

## In what formats are data available?

Currently data can be downloaded in CSV format for every indicator that has data. For indicators that have maps, data can also be downloaded in GeoJSON format.

If users want to access your data and metadata programmatically, you can point them to the following:

**data**: https://[GITHUB ORGANISATION].github.io/[DATA REPO NAME]/data/[INDICATOR CODE].json e.g. https://onsdigital.github.io/sdg-data/data/1-2-1.json

**metatdata**: https://[GITHUB ORGANISATION].github.io/[DATA REPO NAME]/meta/[INDICATOR CODE].json e.g. https://onsdigital.github.io/sdg-data/meta/1-2-1.json

## Can data in a platform be accessed via API?

There isn't an API available at the moment but data can be accessed programmatically as described above.


