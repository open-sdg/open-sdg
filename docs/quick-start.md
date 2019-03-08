<h1>Quick Start</h1>

This document will go over the quickest way to get this platform up and running. Here we will choose the simplest approach for automation and hosting, which are to use CircleCI.com and Github.com. Note, however, that there are alternatives to this approach, as detailed under the Automation and Hosting sections.

## Downloading Git

### Windows

You will first need to install [Git for Windows](https://git-scm.com/download/win).

### Mac

You will first need to install [Git for Mac](https://sourceforge.net/projects/git-osx-installer/files/latest/download).

Note for Mac users: Once you click the download file you might be faced with an error saying that the installer "can’t be opened because it is from an unidentified developer". To resolve this issue, right click on the installer and click Open. This will bypass the error.

## Signing up and creating forks

1. If you don't already have a Github.com account, [go to Github.com](https://github.com/) to sign up and then log in.
1. In the same browser, [go to CircleCI.com](https://circleci.com/vcs-authorize/) and click "Log In With Github". Accept any prompts until you are logged in.
1. Go [here](https://github.com/open-sdg/open-sdg-site-starter) and click "Fork" in the upper right. Choose your username to fork the project to your account.
    * Bookmark the forked repository -- this is your "__site repository__".
1. Go [here](https://github.com/open-sdg/open-sdg-data-starter) and click "Fork" in the upper right. Choose your username to fork the project to your account.
    * Bookmark the forked repository -- this is your "__data repository__".

## Create SSH keys

This part may be painful if you are not accustomed to command-line work. But don't worry - it is pretty fast.

1. Open your operating system's Terminal application (use Git BASH, if on Windows).
1. Create the SSH keys by entering the command below, substituting `my-email-address@example.com` with the email address bound to your GitHub account. It might be worth creating a new folder for your keys:

    `ssh-keygen -m pem -t rsa -b 4096 -C "my-email-address@example.com"`
    
    1. When prompted "Enter file in which to save the key", enter `my-site-key`
    1. When prompted "Enter passphrase", just hit `Enter`.
    1. When prompted "Enter same passphrase again", just hit `Enter` again.
1. Repeat the previous steps, only use `my-data-key` instead of `my-site-key`.

Confirm that 4 files have been created:

* my-site-key
* my-site-key.pub
* my-data-key
* my-data-key.pub

## Add the SSH keys to Github.com

1. Go to your "site repository" on Github.com that you bookmarked earlier
    1. Click "Settings" near the top-right.
    1. Click "Deploy keys" in the left menu.
    1. Click "Add deploy key"
    1. For "Title" enter anything, such as `CircleCI key`
    1. For "Key" paste in the contents of `my-site-key.pub` (created earlier)
        * _Tip_: A quick way to see the contents of the file is to go back to the terminal and enter: `cat my-site-key.pub`. Drag-select this output to copy it into your clipboard. On MacOS you can use `cat my-site-key.pub | pbcopy` to copy the contents of `my-site-key.pub` straight to your clipboard
    1. Check "Allow write access"
    1. Click "Add key"
    1. Select and copy the "Fingerprint" that appears (you may need to refresh the page)
1. Click "Code" near the top left to get back to the list of files
    1. In the list of files, drill down to the `.circleci/config.yml` file:
        ```
        .circleci
        └─config.yml
        ```
    1. On the right, click the Pencil icon ("Edit this file").
    1. Paste the copied "Fingerprint" over `PASTE_STAGING_FINGERPRINT_HERE`.
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
    1. In the list of files, drill down to the `scripts/deploy/circleci/deploy_staging.sh` file:
        ```
        scripts
        └─deploy
          └─circleci
            └─deploy_staging.sh
        ```
    1. On the right, click the Pencil icon ("Edit this file").
    1. Update the file as directed in the comments.
    1. At the bottom, click "Commit changes".
1. Repeat these steps for the site repository (bookmarked earlier).

## Update the site Jekyll configuration

1. Go to your fork of the site repository (bookmarked earlier).
1. In the list of files, click `_config.yml`.
1. On the right, click the Pencil icon ("Edit this file").
1. Update the file as directed in the comments.
1. At the bottom, click "Commit changes".

## View the site

1. CircleCI and Github will now build and publish the site. Wait about 5 minutes.
1. View site at: https://my-github-org/github.io/open-sdg-site-starter/ (replacing "my-github-org" as needed).

## Results

At this point, any new updates in the "develop" branches of the repositories will trigger "builds" which automatically deploy to the github.io URLs. These github.io URLs are your __staging__ environments.

## Possible next steps?

1. [Turn on automation in your repositories](../automation/github/)
1. [Add data and metadata to the data repository](../making-updates/)
1. [Tweak and customise the site repository as needed](../customisation/)
1. [Set up the "master" branch to deploy to a separate "production" environment](../deployment/)
