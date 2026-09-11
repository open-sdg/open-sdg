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

## Step 1 - Create a GitHub "OAuth" app

1. Go to https://github.com/settings/developers
1. Click "New OAuth App"
1. Enter any "Application name"
1. For "Homepage URL", enter the URL of your staging site. Eg: https://my-organization.github.io/my-site-repository
1. Click "Register application"

## Step 2 - Create a new GitHub "auth-serverless" repository

1. Go to https://github.com/open-sdg/open-sdg-github-auth-serverless
1. Click "Use this template" and "Create a new repository"
1. If necessary select any option under "Owner"
1. Enter any "Repository name" (remember it for later)
1. Click "Create repository"

## Step 3 - Set up a free Vercel.com proxy service

1. Go to https://vercel.com
1. Click "Sign up"
1. Click "Continue with GitHub"
1. Follow the prompts to complete the GitHub sign-in process
1. 