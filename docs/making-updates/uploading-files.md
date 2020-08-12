<h1>Making updates by uploading files</h1>

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
