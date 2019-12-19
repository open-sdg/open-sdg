<h1>City of Los Angeles - Case Study</h1>

## Link to platform

[https://sdgdata.lamayor.org/](https://sdgdata.lamayor.org/)

## Why was Open SDG chosen?

The City of L.A. is committed to open data and its ability to provide transparency, encourage accountability, and empower Angelenos to participate in governance with greater understanding and impact.  The Open SDG reporting platform supports the City’s use of open data and provides the City an opportunity to share data and collaborate on reporting best practices with the Open SDG community.  The ease of use and ability to tailor to the needs of the City, as explained by the US SDG team, were also key factors in the selection.

## Which organisation was responsible for choosing and implementing the platform?

The platform was chosen and implemented by the City of L.A.’s Information Technology Agency (ITA) in partnership with the Mayor’s Office of International Affairs (MOIA) and the Mayor’s Fund for Los Angeles (MFLA).  ITA reviewed reporting platform options and with a great partnership with CODE, we were able to implement.

## How did you set up your 'city' platform based on Open SDG?

The City of L.A. began the setup of the reporting platform using the quick start guide.  Once the site and data repositories were set up, data was identified and added to the platform.  At launch, data was uploaded for priority goals (SDGs 5, 8, 11, 13 and 16).  Simultaneously, customizations were made (noted in Question #10) to localize the platform for the City. Once the platform was running well in the staging GitHub environment, the production environment was set up for access via City of LA domain: [sdgdata.lamayor.org](https://sdgdata.lamayor.org/).  

## How long did it take to set up the platform?

We forked the open data platform from the US SDG site [sdg.data.org](https://sdg.data.org/).  This initial process took about a week.  However, the process to identify local data sources, format data and customize the site for our initial five priority Goals, took about 4-5 months.

## How do you upload data and metadata into the platform?

Data and metadata are uploaded to the platform via the data repository in GitHub, using .csv and .md files.  The Prose.io editor is also used to edit local metadata.

## How is the platform hosted? (GitHub, local server, other platform)

Our staging environment is on GitHub and the production environment is on a local server.

## How are support and maintenance managed for the platform?

Support and maintenance for the production environment are managed by the City’s Information Technology Agency (ITA).

## What languages is your platform available in?

The platform is currently available in English.

## What customisations were added to the Open SDG platform?

The City of L.A. took several steps to customize the platform (specifications on new additions and modifications can be found in the  [City of LA GitHub wiki](https://github.com/dawncomer/open-sdg-site-starter/wiki/)):

* As part of the City of L.A.’s adoption of the U.N. SDGs, our initial work involved localizing the international targets to City priorities and policies.  As such, an initial step in setting up our site was to display the localized targets on the platform, in a two-column format, along with the indicators.  A global_targets.yml file was created  to display our local targets.
* To ensure visitors to the site are aware and have context of the City’s target localization efforts, a statement was added to each goal page, providing a link to the City’s SDG website, [sdg.lamayor.org](https://sdg.lamayor.org/), which explains the target localization process.  A localization.yml file was created to display this text.
* We needed to allow for the creation of new targets to meet local priorities, e.g., target 5.x.  Thus, new targets were also added to the global_targets.yml file. 
* In the process of identifying available indicator data, it was deemed necessary to take a bottom-up approach to localize the indicators.  The  localization approach used for City of L.A. targets was applied to local indicators.  A global_indicators.yml file was created to display new and/or revised indicators.  Also, a  ‘tagging’ system was implemented to visually highlight ‘new’ and ‘revised’  indicators on the site.
* The ‘National Metadata’ label was changed to ‘Local Metadata’ on the indicator pages
* We wanted to be able to list the alignment to World Council on City Data (WCCD) ISO 37120 Indicators under Local Metadata and to do so, we updated the  _prose.yml file with the necessary fields
* We incorporated our City of L.A. SDG Logo in the banner of the platform

## What advice and lessons learned could you give to other countries considering using Open SDG?

* Tracking and reporting for some goals may fall outside of City government jurisdiction.  Geographic coverage was limited to City bondaries where possible but some data a the County, Metropolitan Statistical Area (MSA) and State levels are also reported when City-level data is unavailable.
* If you do not have a central repository of local data, alot time for identifying available local data for the platform.
* The platform is very user friendly for those who are not programmers.  The Open SDG community is helpful for resolving issues, be sure to leverage everyone.
* The City of L.A. site is currently in English. Set in your plan time for translation to other languages, as well as identify team members who can support translation needs.
* All data is currently managed manually, we are exploring ways to automate updates to indicator data and encourage other cities to do the same.
