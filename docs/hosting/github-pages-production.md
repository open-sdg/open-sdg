<h1>GitHub Pages for a production environment</h1>

<iframe width="560" height="315" src="https://www.youtube.com/embed/6qXgJfq-qtw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></br>

GitHub Pages is a great option for hosting your production environment, because it is free to use, reliable, and requires no maintenance. The setup process is fairly similar to the [quick start](../quick-start.md) procedure, but requires a bit more explanation. This document will explain the technical details.

## Requirements

Before setting up your production site, you will need to [configure triggered builds](https://open-sdg.readthedocs.io/en/latest/automation/triggered-site-builds/), if you have not already done so.

## Default site address

By default, a GitHub Pages site's address is equal to your GitHub organisation plus `.github.io`, plus a subfolder equal to your site repository name.

For example, if your organisation is `my-stats-org` and your site repository name is `sdg-site`, then your default GitHub pages deployment might be available at `https://my-stats-org.github.io/sdg-site`.

As discussed above with the `baseurl` setting, you probably don't want a subfolder for your production site. So instead of `https://my-stats-org.github.io/sdg-site` you might prefer `https://my-stats-org.github.io`. (Actually you probably want something even more custom, but we will discuss that later.) In order to accomplish this, you will need a second GitHub organisation.

## Production organisation and repositories

First, create a second organisation to use for production. This will a public-facing organisation, so choose the name accordingly. For example if your country is France, you might choose `sustainabledevelopment-france`. Here is a [link to the page where you can create GitHub organisations](https://github.com/organizations/plan) (choose the free option).

After you've created the organisation, you will need to create 2 repositories inside it. The names of the repositories is discussed below.

1. Repository for production data: This repository can be named whatever you would like. Perhaps something like `sdg-data`, `sdg-data-prod`, `sdg-data-france`, etc.
2. **IMPORTANT**: Repository for production site: This repository **must** be named the same as your **organisation** above, plus `.github.io`. For example, if your organisation is `my-stats-org`, then you **must** name this repository exactly: `my-stats-org.github.io`.

You can create these repositories a on [GitHub.com "new" page](https://github.com/new). **IMPORTANT**: Make sure to remember the following **required** items when creating **both** repositories:

1. Select your new production organisation under "Owner".
2. Ensure this repository is set as **public**
3. Check the "Initialize this repository with a README".

## Contents of the "production" repositories

Note that you will never be manually adding anything to these "production" repositories. The content of these repositories will be 100% automated. So, for the rest of this document, we will go back to referring to your original "site repository" and "data repository".

## Setting up production deployments - data repository

If you started by using the [data starter](https://github.com/open-sdg/open-sdg-data-starter) as a template, then you already have a [GitHub Actions workflow](https://github.com/open-sdg/open-sdg-data-starter/blob/develop/.github/workflows/deploy-to-production.yml) for production deployments.

Find that file in your data repository under `.github/workflows/deploy-to-production.yml`, and change it as instructed in the file. (If you do not have the file already, create a new one in that location using the [starter version](https://github.com/open-sdg/open-sdg-data-starter/blob/develop/.github/workflows/deploy-to-production.yml) as a guide.)

## Performing a production deployment - data repository

To perform the *first* production deployment of your **data**, you need to create a `master` branch. This can be done as follows:

1. Go to your data repository in GitHub.com.
2. Switch to the branch `develop` if it is not already selected from the dropdown underneath the `Actions` tab.
3. Type `master` and then click on `Create branch: master from 'develop'`.

This will start the process of performing a production deployment of data. However, for all future production deployments, the process is different. So, for future reference, here is the normal process for production deployments. (You don't need to do this now.)

1. Go to your data repository in GitHub.com.
2. Click on the `Pull requests` tab
3. Press the `New pull request` button
4. Press `base: develop` and choose `master`. You should see something like:

    base: master <- compare: develop

5. For "Title" enter anything, such as "Production release".
6. Press the green "Create pull request" button.
7. Wait for any automated tests to complete. This may take a few minutes.
8. Press the green "Merge pull request" button.

Meanwhile, your first production deployment is already in progress. You can go to the "Actions" section of your GitHub.com repository to watch the progress. It should succeed after a few minutes.

## Setting up production deployment - site repository

If you started by using the [site starter](https://github.com/open-sdg/open-sdg-site-starter) as a template, then you already have a [GitHub Actions workflow](https://github.com/open-sdg/open-sdg-site-starter/blob/develop/.github/workflows/deploy-to-production.yml) for production deployments.

Find that file in your site repository under `.github/workflows/deploy-to-production.yml`, and change it as instructed in the file. (If you do not have the file already, create a new one in that location using the [starter version](https://github.com/open-sdg/open-sdg-site-starter/blob/develop/.github/workflows/deploy-to-production.yml) as a guide.)

Before we can perform a deployment, we have to tell the site repository where to find the production data. If you started by using the [site starter](https://github.com/open-sdg/open-sdg-site-starter) as a template, then you should have a production-specific config file: [site_config_prod.yml](https://github.com/open-sdg/open-sdg-site-starter/blob/develop/_data/site_config_prod.yml). (If you do not have the file already, create a new one in that location, using the [starter version](https://github.com/open-sdg/open-sdg-site-starter/blob/develop/_data/site_config_prod.yml) as a guide.) This file may be contained within the `_data` folder if you have recently created your Open SDG platform. 

Edit the [remote_data_prefix line](https://github.com/open-sdg/open-sdg-site-starter/blob/develop/_data/site_config_prod.yml#L19) in that file to point to the GitHub Pages URL for your production organisation and repository. For example, if your production organisation is `my-stats-org`, and your production **data** repository is `sdg-data`, then use:

```
remote_data_prefix: "https://my-stats-org.github.io/sdg-data"
```

## Performing a production deployment - site repository

Just as with the data repository, to perform the *first* production deployment of your **site**, you need to create a `master` branch. As before, this can be done as follows:

1. Go to your site repository in GitHub.com.
2. Switch to the branch `develop` if it is not already selected from the dropdown underneath the `Actions` tab.
3. Type `master` and then click on `Create branch: master from 'develop'`.

This will start the process of performing a production deployment of the site. However, just as with the data repository, for all future production deployments the process is different. So, for future reference, here is the normal process for production deployments. (You don't need to do this now.)

1. Go to your site repository in GitHub.com.
2. Click on the `Pull requests` tab
3. Press the `New pull request` button
4. Press `base: develop` and choose `master`. You should see something like:

    base: master <- compare: develop

5. For "Title" enter anything, such as "Production release".
6. Press the green "Create pull request" button.
7. Wait for any automated tests to complete. This may take a few minutes.
8. Press the green "Merge pull request" button.

This will trigger the production deployment. You can go to the "Actions" section of your GitHub.com repository to watch the progress. It should succeed after a few minutes.

## Viewing the production site

Your production site, once it has been deployed as described in the previous step, will be available at a URL depending on your production organisation name. For example, if your production organisation is `my-stats-org`, you can visit your production site at `https://my-stats-org.github.io`.

## Custom domain

For your production site's domain you will likely want something other than `my-stats-org.github.io` (for example). A common approach is adding `sdg` as a subdomain for an existing domain, such as `https://sdg.example.com`. Whatever you choose, please refer to the [GitHub documentation for configuring a custom domain](https://help.github.com/en/github/working-with-github-pages/configuring-a-custom-domain-for-your-github-pages-site).
