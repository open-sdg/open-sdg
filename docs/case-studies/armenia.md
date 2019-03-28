<h1>Armenia - Case Study</h1>

## Link to platform

[https://armstat.github.io/sdg-site-armenia/](https://armstat.github.io/sdg-site-armenia/)

## Why was Open SDG chosen?

Open SDG was chosen based on the example and recommendation of the teams behind the U.S. national reporting platform, which also uses Open SDG. The most appealing aspects of Open SDG were the ease of maintenance, the high level of control, and the country ownership.

## Which organisation was responsible for choosing and implementing the platform?

Statistical Committee of the Republic of Armenia (ArmStat)

## How did you set up your country platform based on Open SDG?

We set the platform up in several steps. First we went through the Quick Start in the Open SDG documentation. Next, we wrote scripts to convert our existing data into the CSV format that Open SDG uses. Then we performed some translations of content into Armenian and Russian. Finally we configured our hosting server and configured our deployment workflows.

## How long did it take to set up the platform?

The initial setup took about 1 week. This included all the steps mentioned above in #4. This setup was done with the help of an on-site consultant.

## How do you upload data and metadata into the platform?

We edit data and metadata using the out-of-the-box mechanism in Open SDG: edits are proposed through Prose.io, and the review process is done in GitHub.com.

## How is the platform hosted? (GitHub, local server, other platform)

Our staging environment is hosted on GitHub, and our production environment is hosted on a local server.

## How are support and maintenance managed for the platform?

Armstat, with the help of a consultant, performs all maintenance needed for the platform. This includes translations, content updates, data and metadata updates, Open SDG version upgrades, and any other customisations.

## What languages is your platform available in?

English, Armenian, and Russian.

## What customisations were added to the Open SDG platform?

* We preferred to see the goal layout as a two-column target/indicator arrangement. This customisation was performed on our National Reporting Platform and then later contributed back to the Open SDG community, to become part of the core platform.
* We also wanted our national indicators to be distinct from the global indicators, and this suggestion led to a tagging feature being added to Open SDG.

## What advice and lessons learned could you give to other countries considering using Open SDG?

* Initially we were hesitant to use cloud-based free services like GitHub and CircleCI, but after trying them out and seeing the benefits, we like this approach.
* The documentation for Open SDG only exists in English, so it is helpful to have a technical team member that is comfortable with English.
