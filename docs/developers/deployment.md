# Deployment

## Run-time vs. Build-time

This platform compiles to a static web site, which means that it can be deployed to any host that can serve files (most notably Github's free "Github Pages" offering). At run-time, it requires no server-side technologies.

That said, the platform does require some server-side technologies to *build* the site. At build-time, this platform requires Python and Ruby.

## Automation services

The easiest way to perform these builds is to use a free automation service like TravisCI or CircleCI. Alternatives such as self-hosted Jenkins are possible, but require more maintenance and likely would not be free.

> Note that the "starter" repositories mentioned in the [forking](forking.md)
> section are pre-configured for to handle all of the tasks mentioned in this
> document. The starter repositories are configured to use TravisCI.

## Hosting providers

Once the platform has been built, it simply needs to be uploaded to a hosting provider. Github's free "Github Pages" offering is the easiest host to use, since it only requires committing the built files to a certain Git branch. This documentation will assume the use of Github Pages as a host.

However, alternatives are easy - after all, it's merely uploading files.

## Staging vs Production

It is helpful to have both a "staging" and "production" version of the site, in order to preview changes (staging) before they are presented to the public (production). If using Github Pages as a host, the simplest way to do this to create a second Github account specifically for the purpose of hosting the production site.

After acheiving a successful staging deployment, [see here](travisci/production.md) for a production setup steps using TravisCI.

## Deployment overview for the two repositories

As mentioned in the [forking](forking.md) documentation, implementing this platform requires 2 separate repositories, which we call the "site repository" and the "data repository". A deployment workflow will need to be set up for both of these repositories.

### 1. Deploying the data repository

To deploy the data repository requires these tasks (which, again, are pre-configured in the starter repositories):

1. Validate the data and metadata to ensure quality
1. Convert the data (CSV) and metadata (YAML) into optimized JSON format
1. Commit and push the built files to the "gh-pages" branch. (This is the equivalent of uploading the build to Github Pages.)

For detailed steps on setting up the starter data repository with TravisCI automation, [see here](travisci/data-repository.md).

### 2. Deploying the site repository

To deploy the site repository requires these tasks (which, again, are pre-configured in the starter repositories):

1. Build the Jekyll site
1. Validate the HTML of the site to ensure quality
1. Commit and push the built files to the "gh-pages" branch. (This is the equivalent of uploading the build to Github Pages.)

For detailed steps on setting up the starter site repository with TravisCI automation, [see here](travisci/site-repository.md).
