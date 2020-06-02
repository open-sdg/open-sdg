<h1>Glossary of terms</h1>

This document will define the common terminology used through this platform's documentation.

## Git

Git is a free industry-standard version control system that makes it easier to track changes to files. An Open SDG platform, its data and its metadata, are all powered by files. Changes to these files are tracked (or "versioned") by Git ensuring a complete history of every change to the platform (and its data and metadata) will always be available.

## Repository

A set of files that is versioned by Git is called a __repository__. Each repository has its own separate history and administrators.

## Github

Github.com is a service that hosts Git repositories, and provides a useful interface for maintaining them. Github does offer paid services, but everything that this platform needs is part of Github's free offerings.

## Forks

Github offers an easy way to make a copy of a repository, and the term they use is "fork." So, a __fork__ is a copy of a repository. It can also be used as a verb: "to fork" means "to copy a repository," and "forked" means "copied a repository."

## Environments: Staging vs production

It is important to be able to see proposed changes before releasing them to the general public. To accomplish this, there should be 2 separate __environments__:

### Staging

This is where proposed changes are first visible.

### Production

This is where the general public views the platform.

## Site repository vs data repository

The implementation of this platform involves maintaining 2 repositories:

### Data repository

This is where the platform's data and metadata are managed. A ["starter" repository](https://github.com/open-sdg/open-sdg-data-starter) is available which can be easily copied and customised.

### Site repository

This is where everything else is managed, such as presentation, pages, menus, and documents.  A ["starter" repository](https://github.com/open-sdg/open-sdg-site-starter) is available which can be easily copied and customised.

## Translation keys

Open SDG is a multilingual platform, so translation functionality is part of most aspects of the platform. A central concept is that of a "translation key". A translation key is any string of text that refers to a particular translated word/phrase/etc. Translation keys always start with a "group", which is separated by a dot.

NOTE: Because dots have a special meaning in translation keys, groups/keys should never contain any dots themselves.

To illustrate, here are a few examples of translation keys:

* `general.goal`
* `general.goals`
* `global_goals.1-title`
* `global_goals.2-title`

## Disaggregations

Disaggregated data is data that has been broken down by detailed sub-categories for example gender, age and ethnicity. 

## Headline

And indicator's "headline" is the data series that contains no disaggregations. It is the data series that is typically displayed first, upon viewing the indicator's page.
