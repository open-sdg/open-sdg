<h1>UK - Case Study</h1>

## Link to platform

[https://sustainabledevelopment-uk.github.io/](https://sustainabledevelopment-uk.github.io/)

## Why was Open SDG chosen?

Open SDG is the result of collaboration between the UK Office for National Statistics, US government and the Center for Open Data Enterprise. As Open SDG was largely created from previous versions of the US and UK platforms, it was the obvious choice for us to use Open SDG.

## Which organisation was responsible for choosing and implementing the platform?

The Office for National Statistics.

## How did you set up your country platform based on Open SDG?

Since Open SDG was created from the previous UK/US site, moving over to Open SDG was straightforward for us.
We didn’t need to make any changes to our data repository as it was already structured in the way required by Open SDG, with our data in ‘long’ format .csv files and our metadata in yaml .md files.
In our site repository, we needed to add and change some configuration settings required by Open SDG. 

## How long did it take to set up the platform?

It took just a few hours to set up our copy of Open SDG, with all our existing data and metadata migrated into it (data and metadata were already in the required format in our previous version of the UK platform).

## How do you upload data and metadata into the platform?

We have a dedicated SDG Data team within the Office for National Statistics who source and load data and metadata onto our reporting platform. We store data and metadata in Excel files on a secure shared drive, with one Excel file for each indicator. We then run Python code to write out the data .csv and metadata .md files in the required formats ready for loading into the GitHub repository. For some indicators we have automated data collection by using APIs and Python scripts.

## How is the platform hosted? (GitHub, local server, other platform)

Currently our staging (preview) site and our live production site are both hosted on GitHub.

## How are support and maintenance managed for the platform?

We have a small team within the Office for National Statistics (including one in-house software developer) who are responsible for maintaining the technical aspects of the UK site and developing new features for our site and for Open SDG. This team also implements all upgrades to new versions of Open SDG.

## What languages is your platform available in?

English.

## What customisations were added to the Open SDG platform?

We have often added customisations to the UK site first in order to meet our country needs and then, following further testing by the Open SDG development team, these customisations have been built into Open SDG.
All our current customisations will be included within Open SDG version 1.0.0, so once we have upgraded to that version we will have no separate customisations on the UK site.

## What advice and lessons learned could you give to other countries considering using Open SDG?

Setting up an initial ‘out-of-the-box’ version of Open SDG can be done quickly with just a laptop and does not require software developer skills. We are aware of several organisations who have set up their own versions of Open SDG with no or minimal support. Give it a try and contact the Open SDG if you do have any queries.

