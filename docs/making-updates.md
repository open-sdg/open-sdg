<h1>Making updates to data and metadata</h1>

This document will describe how to update data and metadata for the Open SDG platform.

## Before you start

These steps have four pre-requisites:

1. An internet connection
2. A web browser
3. A [GitHub.com](https://github.com) account

    If you do not already have one, go to [GitHub](https://github.com) now to sign up for your free account.

    **IMPORTANT NOTE**: The workflow described here, which uses the "Prose.io" service, will **not** work if your GitHub.com account has "write permissions" on the repository. If you are not sure about this, check with your team.

4. A working implementation of Open SDG (hereafter referred to as the "staging site")

    In most cases, the "staging site" will be something similar to: `https://my-org.github.io/my-site` (but with `my-org` and `my-site` changed as appropriate). If you do not have such a site available, or you are not sure, check with your team before continuing. Instructions on getting started are available on the [Quick Start page](quick-start.md).

## GitHub.com login

For all of the steps below, you will need to be logged into GitHub.com, in whatever web browser you are using. To check just visit [GitHub.com](https://github.com). If you are not already logged in, click "Sign in" to log in.

NOTE: As long as you continue using the same web browser that you used to log in, the following steps will work. If you switch browsers, or clear your browser cache, you will need to log into GitHub.com again before continuing.

## Pick an SDG indicator to edit

Below we will describe how to update the data and metadata for an SDG indicator. You will need to visit that goal/indicator on your staging site.

For example, if you would like to edit indicator 1-1-1, you should go to your staging site, click on Goal 1, and then click on Indicator 1-1-1.

Go ahead and do this now, for any indicator you would like.

## Prose.io

You should now be on an "indicator page". There will be a tab towards the bottom labeled `Edit`. Click this tab, and then click `Edit Data`.

This will take you to a service called Prose.io.

> Prose.io is a service dedicated to user-friendly editing of GitHub files.
> Because it is a separate service, it requires "authorization" before it can be
> used. See below for details.

If you see a green icon in the lower-right corner, then you need to "authorize" Prose.io before you can use it. Click the icon and accept the prompts that follow.

After the authorization is complete, you will need to make your back to the goal/indicator that you were trying to edit, on the staging site.

## Editing data

On the indicator page, click the `Edit` tab and then click `Edit Data`.

This takes you to Prose.io. Because Prose.io is now "authorized", you should *not* see the green icon in the lower right corner.

What you *should* see is a spreadsheet-like interface displaying the data for your indicator.

To update some data, simply select a cell and make a change. You can use your keyboard's arrow keys to move around the table, and then type in your update.

Once you have made your update, click on any other cell. You should see a disk icon in the right-hand sidebar. This icon will change slightly, indicating that you have made a change which needs to be saved.

Click the disk icon to save your change. Enter a short description of your change, and then click "Commit".

> Note that your change will not immediately appear on your staging site - the
> change will need to be approved by a platform administrator on your team.

## Editing metadata

Next we will update metadata. Return to the indicator on your staging site, and again click the "Edit" tab. This time, click "Edit Metadata".

You will be back on Prose.io, but this time there is an extra step to get to the metadata: Click on the metadata icon in the right-hand sidebar.

Now you will see a list of metadata fields. Locate the field you would like to change, and then make your update.

Once you have made your update, click on any other field. You should see a disk icon in the right-hand sidebar. This icon will change slightly, indicating that you have made a change which needs to be saved.

Click the disk icon to save your change. Enter a short description of your change, and then click "Commit".

> Note that your change will not immediately appear on your staging site - the
> change will need to be approved by a platform administrator on your team.

## Conclusion

This document has detailed how to use GitHub.com, Prose.io, and your staging site, to update data and metadata for the Open SDG platform.
