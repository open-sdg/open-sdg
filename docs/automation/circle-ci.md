# CircleCI

CircleCI is a "continuous integration" (CI) cloud service. It is useful for Open SDG in a way that is typical of open-source projects: it "listens" for certain events in your Github repository, and then provides temporary virtual machines to perform various server-side tasks. Open SDG needs a CI tool to accomplish these things:

* Run each new proposed change through certain tests, to prevent regression bugs
* Build and deploy the platform to a "staging" environment whenever changes are made
* Build and deploy the platform to a "production" environment whenever a new release is made

## Pros

* Although there are paid plans, the free tier is sufficient for Open SDG implementations
* Built-in integrations with Github repositories

## Cons

There are not many downsides to CircleCI, making it a good choice for Open SDG.

## Set-up

CircleCI's tight integration with Github repositories makes it relatively simple to set up. The [Quick start](../quick-start.md) page details the process of using CircleCI with Open SDG.

## Usage

Using CircleCI involves putting a configuration file (`.circleci/config.yml`) in your repository. The [site starter](https://github.com/open-sdg/open-sdg-site-starter) and [data starter](https://github.com/open-sdg/open-sdg-data-starter) repositories include working configurations.
