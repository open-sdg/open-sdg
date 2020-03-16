<h1>Quick Start</h1>

This document will go over the quickest way to get this platform up and running. Here we will choose the simplest approach for automation and hosting, which is to use GitHub Actions. Note, however, that there are alternatives to this approach, as detailed under the Automation and Hosting sections.

> #### Need a quicker quick start?
> This document recommends a double-repository approach,
> which separates your platform into a "site repository" and a "data repository".
> This is a good practice in general, and provides several logistical benefits.
> However, a simpler single-repository approach may be preferred if you just
> want to try out Open SDG locally. In this case, see
> [here](https://github.com/open-sdg/open-sdg-simple-starter).

## Signing up and creating repositories

1. If you don't already have a Github.com account, [go to Github.com](https://github.com/) to sign up and then log in.
1. Go [here](https://github.com/open-sdg/open-sdg-site-starter) and click the green "Use this template" button.
1. Next you will be prompted to choose a name for your new repository. This will affect the URL at which you access the site later, so choose carefully. A suggestion might be: `sdg-site-australia` (adjusted for your country). Note that you can change this later if needed.
1. Enter a description if you would like. Leave "Public" selected, and click "Create repository from template".
    * Bookmark the created repository -- this is your "__site repository__".
1. Go [here](https://github.com/open-sdg/open-sdg-data-starter) and click the green "Use this template" button.
1. As before, choose a name. This one should refer to "data" instead of "site" (eg, `sdg-data-australia`). As before, leave "Public" selected and click "Create repository from template".
    * Bookmark the created repository -- this is your "__data repository__".

## Creating an access token

This step is temporarily necessary because of a bug involving GitHub Actions and GitHub Pages. The bug is being discussed [here](https://github.community/t5/GitHub-Actions/Github-action-not-triggering-gh-pages-upon-push/td-p/26869/highlight/true).

1. Create an access token described [here](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line#creating-a-token). Notes:
    * Select the `repo` permission, as indicated in those instructions.
    * Save the token somewhere private.
1. Copy the access token so that you can paste in the next steps.
1. Go to the site repository you bookmarked earlier.
1. Under the repository name, click "Settings".
1. In the left sidebar, click "Secrets".
1. Click "Add a new secret".
1. Under "Name", type the following (case-sensitive): `token`
1. Under "Value", paste in the access token you copied earlier.
1. Click the green "Add secret" button.
1. Repeat all the steps above, but for the "data" repository you bookmarked earlier.

## Update the data repository configuration

This step is necessary before continuing, and also serves to demonstrate how to edit files on Github.com.

1. Go to the data repository.
1. In the list of files, click on `config_data.yml`.
1. Click the pencil icon on the right (You can find it next to the History button.)
1. Adjust the list of language codes under `languages` by adding or changing as needed. If you would like multiple languages, they should be one per line, like so:

    ```
    languages:
      - fr
      - es
    ```

1. If you did not need to adjust the list of language codes, simply make any other change in the file. For example, add a new line at the top: `# This is a comment`
1. Towards the bottom, select "Create a new branch for this commit and start a pull request."
1. Beneath this, click "Propose file changes".
1. Click on the green "Create pull request" button.
1. Wait a moment to see the message that says "Test PRs / test (pull_request) - in progress"
1. Wait until you see "All checks have passed". This takes about 5 minutes.
1. Click on the green "Merge pull request" button.

This is a commonly-used way to edit files in GitHub. In summary, the steps are:

* Find the file
* Edit the file
* Create the pull request
* Merge the pull request

## Update the site repository configuration

1. Go to the site repository.
1. In the list of files, click on `_config.yml`.
1. Click the pencil icon on the right (You can find it next to the History button.)
1. You will see some instructions in the file. Update the code as directed.
1. In particular, adjust the language codes under `languages` in the same way you did with the data repository.
1. Towards the bottom, select "Create a new branch for this commit and start a pull request."
1. Beneath this, click "Propose file changes".
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

## Turn on automated testing

Both the site repository and the data repository can benefit from automated tests. Automated tests will ensure that changes do not break your site. Use the following steps to turn this on:

1. Go to the data repository
1. Under the repository name, click "Settings".
1. In the left sidebar, click "Branches".
1. Make sure the "default" branch is: `develop`
1. Under "Branch protection rules" click "Add rule"
1. Under "Branch name pattern" enter `develop`
1. Check the box "Require status checks to pass before merging"
1. Under "Status checks found in the last week for this repository" check the box for "test".
1. Click the green "Create" button.
1. Repeat the above steps, but for the site repository.

## Results

At this point, any new proposed file changes in the repositories will trigger the automated tests. Also, when approved (aka "merged") the updated builds are automatically deployed to "GitHub Pages". These "GitHub Pages" URLs are your __staging__ environments.

## Possible next steps?

1. [Add data and metadata to the data repository](./making-updates.md)
1. [Tweak and customise the site repository as needed](./customisation.md)
1. [Set up separate "production" environments](./deployment.md)
