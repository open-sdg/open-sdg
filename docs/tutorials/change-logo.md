<h1>Tutorial: Changing the logo and favicon</h1>

This tutorial will describe how to change the logo and favicon for your implementation of Open SDG. This is intended to be a continuation of the [quick start](../quick-start.md) tutorial. We will replace the [default logo](https://github.com/open-sdg/open-sdg/blob/master/assets/img/SDG_logo.png) and the [default favicon](https://github.com/open-sdg/open-sdg/tree/master/assets/img/favicons/favicon.ico).

## Find a logo

First, find (or create) a replacement logo image. An obvious choice might be your country's flag (such as those available in [this repository of flag images](https://github.com/hjnilsson/country-flags)) but this is up to your preference. Here are a few guidelines to keep in mind:

1. The image must be a PNG file named `SDG_logo.png`. This is case-sensitive, so make sure the name is exactly right.
2. We recommend the image's width should be at least 600 pixels.
3. We recommend the image's file size should be 50KB or less.

## Upload the logo

Next we will upload the logo to your site repository.

1. In a browser go to github.com and log in, then go to your site repository.
2. In the list of files, navigate to the `assets/img` folder.
3. Click `Add a file` and then `Upload files`.
4. Drag in your new `SDG_logo.png` file or click to browse for it.
5. At the bottom select `Create a new branch for this commit and start a pull request.`
6. Click `Commit changes`.
7. Click `Create pull request`.
8. Wait for the tests to complete, and then click `Merge pull request`.

## Find a favicon

Next we will replace the "favicon" (the small image that appears in browser tabs). Again, the actual image is up to your preference. A common choice, again, is to your your country's flag. For this tutorial we will use the logo you uploaded above.

1. In a browser visit any online favicon generator. The next steps may vary depending on which generator you are using, but we will assume you are using [favicon.io](https://favicon.io/favicon-converter/).
2. Drag in your new `SDG_logo.png` file or click to browse for it.
3. Click `Download`.
4. Extract the zip file somewhere on the computer. It should contain a file called `favicon.ico`.

## Upload the favicon

Finally we will upload the favicon to your site repository.

1. In a browser go to your site repository.
2. In the list of files, navigate to the `assets/img/favicons` folder.
3. Click `Add a file` and then `Upload files`.
4. Drag in the `favicon.ico` file or click to browse for it.
5. At the bottom select `Create a new branch for this commit and start a pull request.`
6. Click `Commit changes`.
7. Click `Create pull request`.
8. Wait for the tests to complete, and then click `Merge pull request`.

## View your results

Your site will now begin rebuilding. After about 5 minutes, if you visit your site you should see the updated logo and favicon.

> Note that browsers tend to cache favicons aggressively. You may need to refresh the page a few times before you see the new favicon.
