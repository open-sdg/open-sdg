<h1>ABAS M&E Quick Start</h1>

<iframe width="560" height="315" src="https://www.youtube.com/embed/frvUcwdHC2Q" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

These instructions will help you through the process of setting up an ABAS & SDG platform. We will link these platforms together to allow users to access related/linked indicators in each framework

This document will go over the quickest way to get these platforms up and running. Here we will choose the simplest approach for automation and hosting, which is to use GitHub. Note, however, that there are alternatives to this approach, as detailed under the Automation and Hosting sections.

## Signing up and creating repositories (SDG)

1. If you don't already have a Github.com account, [go to Github.com](https://github.com/) to sign up and then log in.
1. Create a new, free organisation by navigating to "Your organisations" in the menu. This can be called anything you like e.g. SDG-your-country.
1. Go to the [SDG site starter](https://github.com/open-sdg/open-sdg-site-starter) and click the green "Use this template" button, then "Create a new repository".
1. Check the "Include all branches" toggle so it is "On". (**required**)
2. Change the owner to be your new organsation.
1. You can enter any name for the repository. Here we recommend using "site".
1. Change the visibility to be "Public". (**required**)
1. Click "Create repository".
    * Bookmark the created repository -- this is your *SDG site repository*.
1. Go to the [ABAS site starter]() and click the green "Use this template" button, then "Create a new repository".
1. Check the "Include all branches" toggle so it is "On". (**required**)
2. Change the owner to be your new organsation.
1. You can enter any name for the repository. Here we recommend using "site".
1. Change the visibility to be "Public". (**required**)
1. Click "Create repository".
    * Bookmark the created repository -- this is your *ABAS site repository*.
1. Go to the [SDG data starter](https://github.com/open-sdg/open-sdg-data-starter) and click the green "Use this template" button, then "Create a new repository".
1. Check the "Include all branches" toggle so it is "On". (**required**)
2. As before, you can enter any name for the repository. Here we recommend using "data".
1. As before, change the visibility to be "Public". (**required**)
1. Click "Create repository".
    * Bookmark the created repository -- this is your *SDG data repository*.
1. Go to the [ABAS data starter]() and click the green "Use this template" button, then "Create a new repository".
1. Check the "Include all branches" toggle so it is "On". (**required**)
2. As before, you can enter any name for the repository. Here we recommend using "data".
1. As before, change the visibility to be "Public". (**required**)
1. Click "Create repository".
    * Bookmark the created repository -- this is your *ABASdata repository*.

## Wait for the builds to complete

At this point, both your site repositories and your data repositories will be performing automatic "builds". These take about 5 minutes to complete. You can monitor the progress in each repository by going to the "Actions" section under the repository name. When you see a green checkmark here, the build is complete.

## View the completed builds

Once the builds are complete, you can view them, using the following steps:

1. Go to the *SDG data repository*.
1. Under the repository name, click "Settings".
1. In the sidebar, click on "Pages".
1. You should see "Your site is published at" next to a link.
1. Click that link to view your data service.
1. Bookmark this page -- this is your *SDG data service*.
1. Repeat this for you *ABAS data repository*.
1. Go to the *SDG site repository*.
1. Under the repository name, click "Settings".
1. In the sidebar, click on "Pages".
1. You should see "Your site is published at" next to a link.
1. Click that link to view your site.
1. Bookmark this page -- this is your *SDG site*.
1. Repeat this for your *ABAS site*.

## Connect your site to your data services

You now have a working site and a working data service, however they are not yet connected to each other. We need to tell the site where to find the data service.

1. From the previous step you should now be on your *SDG site*. If not, go back there using your bookmark.
1. In the footer menu at the bottom of any page, click "Configuration".
1. Click on the "Dev" menu option and find the "Remote data prefix" setting.
1. In this field, replacing what is already there, paste in the URL of your *SDG data service* (which you bookmarked above).
1. Continue down to the "Repository URL - Data" setting.
1. In this field, replacing what is already there, paste in the URL of your *SDG data repository* (which you bookmarked above).
1. Scroll to the top and press "Download configuration". You will receive a file download called "site_config.yml".
1. Press "Go to repository".
1. Click "Add file", then "Upload files".
1. Upload the downloaded "site_config.yml" file by dragging it onto the page (this will override the existing file with your changes).
1. Scroll down and press "Commit changes".
1. Repeat this step for your *ABAS site* and your *ABAS data service*.

## Connect your ABAS site to your SDG site

1. In your *ABAS site repository* access the "_config.yml" file.
1. Click the pencil icon on the right to begin editing the file.
1. At the bottom of the file add the following line - using your *SDG site* url
``other_framework_domain: "LINK TO YOUR SDG SITE"``
1. Towards the bottom, select "Create a new branch for this commit and start a pull request."
1. Beneath this, click "Propose changes".
1. Click on the green "Create pull request" button.
1. Wait until you see "All checks have passed". This takes about 5 minutes.
1. Click on the green "Merge pull request" button.

## Recommended

To help with maintenance of your implementation, the following automation is *strongly* recommended:

1. [Protection from breaking changes](automation/github.md)
1. [Triggered site builds](automation/triggered-site-builds.md)

## Next steps

To get started with customising your implementation of Open SDG, try any of these tutorials:

1. [Changing the logo and favicon](tutorials/change-logo.md)
1. [Frontpage configuration](tutorials/frontpage-config.md)
1. [Adding indicators](tutorials/add-indicator.md)
1. [Adding languages](tutorials/add-language.md)
1. [Changing colors](tutorials/change-colors.md)
1. [Changing the site-wide banner](tutorials/change-banner.md)

## Troubleshooting

If this did not appear to work, please consult the [troubleshooting page](troubleshooting.md).
