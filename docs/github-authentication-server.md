<h1>GitHub Authentication Server</h1>

When making changes using the site/indicator/metadata configuration forms, the standard procedure is:

1. Make changes in the form
1. Download the file
1. Go to GitHub
1. Upload the file
1. Create a pull-request

It is possible to setup a GitHub authentication server and then configure the forms to push the changes directly to GitHub. This has the effect of removing steps 2-5 above, and may be worthwhile if you make changes often.

This document will detail the process for setting this up. The general steps are:

1. Create a GitHub "OAuth" app
1. Create a new GitHub "auth-serverless" repository
1. Set up a free Vercel.com proxy service
1. Make some changes to the site configuration

Before going through these steps, first go to https://github.com and log in.

## Step 1 - Create a new GitHub "auth-serverless" repository

1. Go to https://github.com/open-sdg/open-sdg-github-auth-serverless
1. Click "Use this template" and "Create a new repository"
1. If necessary select any option under "Owner"
1. Enter any "Repository name" (remember it for later)
1. Click "Create repository"

## Step 2 - Create a GitHub "OAuth" app

1. Go to https://github.com/settings/developers
1. Click "New OAuth App"
1. Enter any "Application name"
1. For "Homepage URL", enter the URL of your staging site. Eg: https://my-organization.github.io/my-site-repository
1. Under "Redirect URI", enter the same URL of your staging site. Eg: https://my-organization.github.io/my-site-repository.
1. Important: Check the "Allow wildcard matching" box.
1. Click "Register application"
1. Note the "Client ID" that you see - this will be needed in the next step.
1. Click "Generate new client secret" and note the "Client secret" that you see - this will be needed in the next step.

## Step 3 - Set up a free Vercel.com proxy service

1. Go to https://vercel.com
1. Click "Sign up"
1. Click "Continue with GitHub"
1. Follow the prompts to authorize using your GitHub account.
1. Click "Add new" and "Project"
1. Under "Import Git Repository" click "GitHub".
1. Click the "Install" button and choose your GitHub organization.
1. Select "Only select repositories" and then select the repository you created in Step 1 above.
1. Click "Install"
1. Click "Import" next to your repository
1. Expand the "Environment Variables" section
1. For "Key", enter: GITHUB_CLIENT_ID
1. For "Value", enter the Client ID you noted above in Step 2.
1. Click "Add more"
1. For "Key", enter: GITHUB_CLIENT_SECRET
1. For "Value", enter the Client secret you noted above in Step 2.
1. Click "Deploy" at the bottom.
1. On the project page, under "Domains" you should see a *.vercel.app domain. Take note of that domain for later.

## Step 4 - Update the site configuration

1. Visit your staging site and go to the site configuration form (the "Configuration" link in the footer).
1. Go to the "Forms" section.
1. First, go to the **Site config form** section. (You can skip this if you do not intended to use the site config form, such as if you plan to hand-edit your site config file.)
    1. Under "Config file folder", enter the folder inside the site repository that contains the site_config.yml file. Usually this is **_data**.
    1. Under "Github Client ID" enter the Client ID from above in Step 2. NOTE - This is the "Client ID" - NOT the "secret". The secret should NOT be added here, because this is public.
    1. Under "Github Proxy URL" enter the domain you noted at the end of Step 3.
    1. Under "Github repository" enter the name of the site repository. For example, if your site repository is https://github.com/my-organization/my-site-repository, you would enter "my-site-repository".
    1. Under "Github Owner" enter the name of the organization for the site repository. For example, if your site repository is https://github.com/my-organization/my-site-repository, you would enter "my-organization".
1. Next, go to the **Indicator config form** section. (You can skip this if you do not intended to use the indicator config form, such as if you plan to hand-edit your indicator config files.)
    1. Under "Config file folder", enter the folder inside the data repository that contains the indicator configuration files. Usually this is **indicator-config**.
    1. Under "Github Client ID" enter the Client ID from above in Step 2. NOTE - This is the "Client ID" - NOT the "secret". The secret should NOT be added here, because this is public.
    1. Under "Github Proxy URL" enter the domain you noted at the end of Step 3.
    1. Under "Github repository" enter the name of the data repository. For example, if your data repository is https://github.com/my-organization/my-data-repository, you would enter "my-data-repository".
    1. Under "Github Owner" enter the name of the organization for the data repository. For example, if your data repository is https://github.com/my-organization/my-data-repository, you would enter "my-organization".
1. Finally, go to the **Metadata config form** section. (You can skip this if you do not intended to use the metadata config form - such as if you plan to use Word documents for metadata, or you plan to hand-edit your metadata config files.)
    1. Under "Config file folder", enter the folder inside the data repository that contains the metadata configuration files. Usually this is **meta**.
    1. Under "Github Client ID" enter the Client ID from above in Step 2. NOTE - This is the "Client ID" - NOT the "secret". The secret should NOT be added here, because this is public.
    1. Under "Github Proxy URL" enter the domain you noted at the end of Step 3.
    1. Under "Github repository" enter the name of the data repository. For example, if your data repository is https://github.com/my-organization/my-data-repository, you would enter "my-data-repository".
    1. Under "Github Owner" enter the name of the organization for the data repository. For example, if your data repository is https://github.com/my-organization/my-data-repository, you would enter "my-organization".
1. Click "Download configuration" at the top, and then upload the downloaded site_config.yml file to the site repository under the "_data" folder.
1. After this change deploys, when you go to the configuration forms on the staging site, you should see a "Login to GitHub" button, which you can press to authenticate to GitHub. After authenticating, you should be able to press the "Push to GitHub" button to push any future changes directly to pull-requests in GitHub.

NOTE: The pull-requests generated by this approach still need to be merged in GitHub, as normal.
