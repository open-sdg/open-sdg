<h1>Triggered site builds</h1>

When the site repository is separate from the data repository, there can be a long delay before changes to data appear on the site. This is because the change to the data only triggers a data rebuild, but the site will not change until it is rebuilt. Out of the box, site rebuilds only happen during the nightly build, and whenever a file in the site repository is changed.

This means that, in order to see their updated data on the site, data managers must either:

1. Wait until the next day, or
1. Change a site file to trigger a site build

To solve this problem, the following steps can be taken to set up an automatic site rebuild whenever the data changes.

## Creating an access token

1. Create an access token described in [this official GitHub documentation](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line#creating-a-token). Notes:
    * Select the `repo` permission, as indicated in those instructions.
    * Save the token somewhere private.
1. Copy the access token so that you can paste in the next steps.

## Adding the access token as a "secret"

1. Go to the site repository.
1. Under the repository name, click "Settings".
1. In the left sidebar, click "Secrets".
1. Click "Add a new secret".
1. Under "Name", type the following (case-sensitive): `token`
1. Under "Value", paste in the access token you copied earlier.
1. Click the green "Add secret" button.

Then repeat this for the data repository, as follows:

1. Go to the data repository.
1. Under the repository name, click "Settings".
1. In the left sidebar, click "Secrets".
1. Click "Add a new secret".
1. Under "Name", type the following (case-sensitive): `token`
1. Under "Value", paste in the access token you copied earlier.
1. Click the green "Add secret" button.

## Configuring the automatic rebuild

1. In the list of files in the data repository, click on `.github/workflows`.
1. Click on `deploy-to-staging.yml`.
1. Click the pencil to edit the file.
1. Make changes to the file by following the instructions in the notes.
1. Towards the bottom, select "Create a new branch for this commit and start a pull request."
1. Beneath this, click "Propose file changes".
1. Click on the green "Create pull request" button.
1. Wait a moment to see the message that says "Test PRs / test (pull_request) - in progress"
1. Wait until you see "All checks have passed". This takes about 5 minutes.
1. Click on the green "Merge pull request" button.
