# Quick Start

This document will go over the quickest way to get this platform up and running. Here we will choose the simplest approach for automation and hosting, which are to use CircleCI.com and Github.com. Note, however, that there are alternatives to this approach, as detailed in the [Automation](automation/index.md) and [Hosting](hosting/index.md) pages.

## Windows users

If your operating system is Microsoft's Windows, you will first need to install [Git for Windows](https://git-scm.com/download/win).

## Sign up for Github.com

If you don't already have a Github.com account, [go here](https://github.com/) to sign up and then log in.

## Log in to CircleCI.com

In the same browser, [go here](https://circleci.com/vcs-authorize/) and click "Log In With Github". Accept any prompts until you are logged in.

## Fork the starter repositories

1. Go [here](https://github.com/open-sdg/open-sdg-site-starter) and click "Fork" in the upper right.
    * Bookmark the forked repository -- this is your "site repository".
1. Go [here](https://github.com/open-sdg/open-sdg-data-starter) and click "Fork" in the upper right.
    * Bookmark the forked repository -- this is your "data repository".

## Create SSH keys

This part may be painful if you are not accustomed to command-line work. But don't worry - it is pretty fast.

1. Open your operating system's Terminal application (use Git BASH, if on Windows).
1. Create the SSH keys (substituting a real email address):
    `ssh-keygen -t rsa -b 4096 -C "my-email-address@example.com"`
    1. When prompted "Enter file in which to save the key", enter `my-site-key`
    1. When prompted "Enter passphrase", just hit `Enter`.
    1. When prompted "Enter same passphrase again", just hit `Enter` again.
1. Repeat the previous step, only use `my-data-key` instead of `my-site-key`.

Confirm that 4 files have been created:

* my-site-key
* my-site-key.pub
* my-data-key
* my-data-key.pub

## Add the SSH keys to Github.com

1. Add the "site repository" key
    1. Go to your "site repository" on Github.com that you bookmarked earlier
    1. Click "Settings" near the top-right.
    1. Click "Deploy keys" in the left menu.
    1. Click "Add deploy key"
    1. For "Title" enter anything, such as `CircleCI key`
    1. For "Key" paste in the contents of `my-site-key.pub` (created earlier)
    1. Check "Allow write access"
    1. Click "Add key"
    1. Select and copy the "Fingerprint" that appears (you may need to refresh the page)
    1. Click "Code" near the top left
    1. In the list of files, click `.circleci`, then `config.yml`.
    1. On the right, click the Pencil icon ("Edit this file").
    1. Paste the copied "Fingerprint" over `PASTE_FINGERPRINT_HERE`.
    1. At the bottom, click "Commit changes".
1. Repeat the above steps, but this time for the "data repository", and using the contents of `my-data-key.pub` instead.

## Add projects to CircleCI.com

1. Go to the [CircleCI dashboard](https://circleci.com/dashboard).
1. In the left sidebar, click "Add Projects".
1. Across from "open-sdg-site-starter" click "Set Up Project".
    1. Scroll down and click "Start Building".
    1. At this point, CircleCI will attempt to "build" the project, and will fail. You can ignore this and continue below.
    1. Click the gear icon in the upper right.
    1. Click "SSH Permissions" in the left sidebar.
    1. Click "Add SSH Key".
    1. Under "Hostname" enter: gh-staging
    1. Under "Private key", enter the contents of `my-site-key` (the file *without* the ".pub", created earlier)
    1. Click "Add SSH key".
1. Go back to step #3 above and repeat the process with the "open-sdg-data-starter" repository.

## Update the deployment scripts

1. Go to your fork of the data repository (bookmarked earlier).
    1. In the list of files, drill down to the `deploy_staging.sh` file:
        ```
        scripts
        └─deploy
        └─circleci
            └─deploy_staging.sh
        ```
    1. Once on the `deploy_staging.sh` file, on the right, click the Pencil icon ("Edit this file").
    1. Update the value of the `GH_ORG_STAGING` variable, according to your fork.
    1. At the bottom, click "Commit changes".
1. Repeat these steps for the site repository (bookmarked earlier).

## Update the site Jekyll configuration

1. Go to your fork of the site repository (bookmarked earlier).
1. In the list of files, click `_config.yml`.
1. On the right, click the Pencil icon ("Edit this file").
1. Update the file by changing, if needed, any instances of:
    * MY-GITHUB-ORG
    * OPEN-SDG-SITE-STARTER
    * OPEN-SDG-DATA-STARTER
1. At the bottom, click "Commit changes".
