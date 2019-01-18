<h1>Github and automated tests</h1>

Whatever service you choose for automation, you will need to enable the "hooks" in your Github repositories so that the automated testing will happen. The goal is for automated tests to run every time a "pull request" is created. This way, if the pull request would have broken something, you will know in advance.

The procedure is the same for both the site repository and the data repository:

1. Go to the repository in Github
1. Click the "Settings" tab
1. Click the "Branches" sidebar item
1. Make sure the "default" branch is: `develop`
1. Under "Branch protection rules" click "Add rule"
1. Under "Apply rule to" enter `develop`
1. Check the box "Require status checks to pass before merging"
1. Under "Status checks found in the last week for this repository" check the appropriate box.

The last step above depends on your choice of automation service, but that is where you tell Github that some tests need to pass. Perform the steps above for both the site repository and the data repository.
