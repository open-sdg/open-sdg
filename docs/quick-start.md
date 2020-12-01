<h1>Quick Start</h1>

This document will go over the quickest way to get this platform up and running. Here we will choose the simplest approach for automation and hosting, which is to use GitHub. Note, however, that there are alternatives to this approach, as detailed under the Automation and Hosting sections.

> #### Need a quicker quick start?
> This document recommends a double-repository approach,
> which separates your platform into a "site repository" and a "data repository".
> This is a good practice in general, and provides several logistical benefits.
> However, a simpler single-repository approach may be preferred if you just
> want to try out Open SDG locally. In this case, see
> the [open-sdg-simple-starter project](https://github.com/open-sdg/open-sdg-simple-starter).

## Signing up and creating repositories

1. If you don't already have a Github.com account, [go to Github.com](https://github.com/) to sign up and then log in.
1. Go to the [site starter](https://github.com/open-sdg/open-sdg-site-starter) and click the green "Use this template" button.
1. Next you will be prompted to choose a name for your new repository. This will affect the URL at which you access the site later, so choose carefully. A suggestion might be: `sdg-site-australia` (adjusted for your country). Note that you can change this later if needed.
1. Enter a description if you would like. Leave "Public" selected, check the "Include all branches" box, and click "Create repository from template".
    * Bookmark the created repository -- this is your "__site repository__".
1. Go to the [data starter](https://github.com/open-sdg/open-sdg-data-starter) and click the green "Use this template" button.
1. As before, choose a name. This one should refer to "data" instead of "site" (eg, `sdg-data-australia`). As before, leave "Public" selected, check the "Include all branches" box, and click "Create repository from template".
    * Bookmark the created repository -- this is your "__data repository__".

## Update the data repository configuration

This step is necessary before continuing, and also serves to demonstrate how to edit files on Github.com.

1. Go to the data repository.
1. In the list of files, click on `config_data.yml`.
1. Click the pencil icon on the right (You can find it next to the "Raw" and "Blame" buttons.)
1. Add a new line at the top: `# This is a comment`
1. Towards the bottom, select "Create a new branch for this commit and start a pull request."
1. Beneath this, click "Propose changes".
1. Click on the green "Create pull request" button.
1. Wait a moment to see the message that says "Test PRs / test (pull_request) - in progress"
1. Wait until you see "All checks have passed". This takes about 5 minutes.
1. Click on the green "Merge pull request" button.

## Update the site repository configuration

1. Go to the site repository.
1. In the list of files, click on `_config.yml`.
1. Click the pencil icon on the right (You can find it next to the "Raw" and "Blame" buttons.)
1. Update the `baseurl` (line 8) according to the instructions above it. Note that the instructions refer to your **site** repository.
1. Update the `remote_data_prefix` (line 12) according to the instruction above it. Note that the instructions refer to your **data** repository.
1. Update the `data_edit_url` and `metadata_edit_url` (lines 16 and 18) according to the instructions above them.
1. Towards the bottom, select "Create a new branch for this commit and start a pull request."
1. Beneath this, click "Propose changes".
1. Click on the green "Create pull request" button.
1. Wait a moment to see the message that says "Test PRs / test (pull_request) - in progress"
1. Wait until you see "All checks have passed". This takes about 5 minutes.
1. Click on the green "Merge pull request" button.

## View the site

1. GitHub will now build and publish the site. Wait about 5 minutes.
1. Go to the site repository.
1. Under the repository name, click "Settings".
1. Scroll down to the "GitHub Pages" section.
1. You should see "Your site is published at" next to a link.
1. Click that link to view your site.

## Next steps

To get started with customising your implementation of Open SDG, try any of these tutorials:

1. [Changing the logo and favicon](tutorials/change-logo.md)
1. [Frontpage configuration](tutorials/frontpage-config.md)
1. [Adding indicators](tutorials/add-indicator.md)
1. [Adding languages](tutorials/add-language.md)
1. [Changing colors](tutorials/change-colors.md)
1. [Changing the site-wide banner](tutorials/change-banner.md)

## Maintenance

To help with maintenance of your implementation, the following automation is recommended:

1. [Protection from breaking changes](automation/github.md)
1. [Triggered site builds](automation/triggered-site-builds.md)

## Troubleshooting

If this did not appear to work, please consult the [troubleshooting page](troubleshooting.md).
