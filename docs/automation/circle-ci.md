<h1>CircleCI</h1>

CircleCI is a "continuous integration" (CI) cloud service. It is useful for Open SDG in a way that is typical of open-source projects: it "listens" for certain events in your GitHub repository, and then provides temporary virtual machines to perform various server-side tasks. Open SDG needs a CI tool to accomplish these things:

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

## Build site automatically after data has been deployed

If making changes to data, you normally have to send an empty commit to the site repository to trigger the site to build. To avoid having to do this you can do the following:

1. Go to the [user settings](https://circleci.com/gh/sdg-kyrgyzstan/open-sdg-data-starter/edit#env-vars) of your CircleCI account
2. Select Personal API Tokens
3. Click Create New Token
4. Give the token a name and click Add API Token
5. Copy the token
6. Go to data repository settings for the production organization on CircleCI
7. Go the Environment Variables and add the following variables:

* CIRCLE_TOKEN: paste the token from step 5
* ORGANIZATION: production organization name
* PROJECT: data repository name
* BRANCH: develop
