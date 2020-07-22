<h1>Making updates to data and metadata</h1>

This document will describe how to update data and metadata for the Open SDG platform.

## Before you start

These steps have four pre-requisites:

1. An internet connection
2. A web browser
3. A [GitHub.com](https://github.com) account

    If you do not already have one, go to [GitHub](https://github.com) now to sign up for your free account.
4. A working implementation of Open SDG (hereafter referred to as the "staging site")

    In most cases, the "staging site" will be something similar to: `https://my-org.github.io/my-site` (but with `my-org` and `my-site` changed as appropriate). If you do not have such a site available, or you are not sure, check with your team before continuing. Instructions on getting started are available on the [Quick Start page](quick-start.md).

## GitHub.com login

For all of the steps below, you will need to be logged into GitHub.com, in whatever web browser you are using. To check just visit [GitHub.com](https://github.com). If you are not already logged in, click "Sign in" to log in.

NOTE: As long as you continue using the same web browser that you used to log in, the following steps will work. If you switch browsers, or clear your browser cache, you will need to log into GitHub.com again before continuing.

## Making updates by uploading files

Below we will describe how to update the data and metadata for an SDG indicator by uploading files that overwrite existing versions.

Start by ensuring the files you want to upload are in the correct format by following the [guidance about data format](data-format.md) or the [guidance about metadata format](metadata-format.md).

Once you are ready to start making updates go to your data repository on GitHub.

### 1. Make a new branch

Now your data/metadata is ready and you're in the data repository, you need to make a new branch so that your new data/metadata goes through the automated testing process before it is merged on to your staging site.

To make a new branch click the `develop` dropdown and enter a name for your branch in the text box. Name your branch so that it reflects what changes are being made. For example if you are updating the metadata for indicator 1.2.1, you may want to name the branch '1-1-1-metadata'.

Once you have typed the name of your branch, you will need to click `Create branch: [BRANCH-NAME] from 'develop'`, so in this example `Create branch: 1-1-1-metadata from 'develop'`. Once you click on that, your new branch will be created and you will now be on that branch.

**Note:** if you leave the page or the branch for any reason, you will need to make sure you are on the correct branch before continuing with the update. You can do this by selecting that dropdown list, and choosing the branch you created for your update.

### 2. Uploading a file

The upload process for data and metadata is very similar - the only difference is the folder where you upload your file(s). If you're making data updates, upload your file to the `data` folder. If you're making metadata updates, upload your file to the `meta` folder.

Whilst still on the branch you created, go into either the `data` or `meta` folder, depending on the type of update you are making.

To upload a file, you can either:

- drop and drag onto the webpage
- click the `Add file` dropdown and select `Upload files`. Then you will be able to `choose your files` from you file directory

Once you have selected the files you want to upload, add a commit message in the text box `Add files via upload`. In this example, you may write 'Update metadata for 1.1.1'.

Make sure `Commit directly to the [BRANCH-NAME] branch.` (e.g.  `Commit directly to the 1-1-1-metadata branch.`) is selected and then click the green `Commit changes` button.

You're files are now uploaded on to the branch you created in step 1.

### 3. Make a pull request

You now need to make a pull request for the uploaded files to go through the automated testing process.

To do this go to the `Pull requests` tab and click `New pull request`.

Click the `compare: develop` dropdown and select your branch from the list, and ensure the other dropdown displays `base: develop`. Then click the green `Create pull request` button.

Give your pull request a name e.g. 'Update metadata for 1.1.1'. Then click the green `Create pull request button`

The pull request has now been created and you will automatically be taken to it.

**Note:** if you need to come back to this pull request later, you will find it under the `Pull requests` tab.

### 4. Make sure the checks have passed

On the pull request you will see a section about checks, where you can see if checks are:

- in progress: the text will remain amber while checks are in progress - you don't need to do anything
- failed: the text will turn red if the checks have failed - click `Details` next to the check that failed in the check section. You will then be able to see which part of the checks failed, and will be able to expand the section to see what caused the checks to fail. Using the error message, troubleshoot the error and make the required changes to your file and re-upload it to the branch you created in step 1. The checks will then automatically re-run. Go back to the pull request you made previously to check the status of these new checks.
- passed: the text will turn green if the checks have passed - click the green `Merge pull request` button and then click the green `Confirm merge` button

### 5. Wait for your staging site to build

Once you have merged the pull request, you will need to wait for your staging site to build. This can take anywhere between 2 to 10 minutes (and rarely, but sometimes, longer).

To check if your staging site has finished building with your latest changes, go to the `Actions` tab and select the `Deploy to staging` workflow in the left sidebar. When the staging site build has finished the amber in progress symbol will change to a green tick.

Once you can the staging site has finished building (green tick displays), go to the page on the staging site that you are expecting to see changes. In this example, go to the indicator page for 1.1.1.

Make sure that the changes are displaying as expected.

## Making updates using Prose.io

Below we will describe how to update the data and metadata for an SDG indicator using Prose.io.

### 1. Find the indicator on your staging site

Start by visiting that indicator page on your staging site. For example, if you would like to edit indicator 1-1-1, you should go to your staging site, click on Goal 1, and then click on Indicator 1-1-1.

Go ahead and do this now, for any indicator you would like.

### 2. Authorize Prose.io

You should now be on an "indicator page". There will be a tab towards the bottom labeled `Edit`. Click this tab, and then click `Edit Data`.

This will take you to a service called Prose.io.

> Prose.io is a service dedicated to user-friendly editing of GitHub files.
> Because it is a separate service, it requires "authorization" before it can be
> used. See below for details.

If you see a green icon in the lower-right corner, then you need to "authorize" Prose.io before you can use it. Click the icon and accept the prompts that follow.

After the authorization is complete, you will need to make your back to the goal/indicator that you were trying to edit, on the staging site.

### 3. Make changes

#### Editing data

On the indicator page, click the `Edit` tab and then click `Edit Data`.

This takes you to Prose.io. Because Prose.io is now "authorized", you should *not* see the green icon in the lower right corner.

What you *should* see is a spreadsheet-like interface displaying the data for your indicator.

To update some data, simply select a cell and make a change. You can use your keyboard's arrow keys to move around the table, and then type in your update.

Once you have made your update, click on any other cell. You should see a disk icon in the right-hand sidebar. This icon will change slightly, indicating that you have made a change which needs to be saved.

Click the disk icon to save your change. Enter a short description of your change, and then click "Commit".

> Note that your change will not immediately appear on your staging site - the
> change will need to be approved by a platform administrator on your team.

#### Editing metadata

Next we will update metadata. Return to the indicator on your staging site, and again click the "Edit" tab. This time, click "Edit Metadata".

You will be back on Prose.io, but this time there is an extra step to get to the metadata: Click on the metadata icon in the right-hand sidebar.

Now you will see a list of metadata fields. Locate the field you would like to change, and then make your update.

Once you have made your update, click on any other field. You should see a disk icon in the right-hand sidebar. This icon will change slightly, indicating that you have made a change which needs to be saved.

Click the disk icon to save your change. Enter a short description of your change, and then click "Commit".

> Note that your change will not immediately appear on your staging site - the
> change will need to be approved by a platform administrator on your team.
