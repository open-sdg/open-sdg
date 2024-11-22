<h1>Tutorial: Adding languages</h1>

This tutorial will describe how to add a new language to your Open SDG implementation. This is intended to be a continuation of the [quick start](../quick-start.md) tutorial.

## Topics covered

* SDG Translations project
* Data and site configuration
* Pages and posts
* Other considerations for translation

## Level of difficulty

This tutorial involves working with text files, but requires no previous technical expertise.

Note that there are several aspects of an Open SDG implementation that need to be translated. So, this involves a large effort of translation - in particular with regards to indicator metadata and page content.

## SDG Translations

All of the text used in Open SDG has already been translated into several languages, in the [SDG Translations](https://github.com/open-sdg/sdg-translations) project. Those languages include the 6 official languages of the United Nations (Arabic, Chinese, English, French, Russian, Spanish) as well as several other languages.

In this tutorial, you will add one of these already-translated languages to your Open SDG implementation. Adding a language that is not already part of the SDG Translations project involves a lot of translation, and is covered elsewhere in [the translation documentation](../translation.md).

## Pick a language to add

First, choose one from the available languages. Some examples are listed below, along with their language codes.

* Arabic (ar)
* Armenian (hy)
* Chinese (zh-Hans)
* English (en)
* French (fr)
* German (de)
* Kazakh (kk)
* Russian (ru)
* Spanish (es)

For the remainder of this tutorial, we will assume the chosen language is Russian (ru). But feel free to replace "ru" with your chosen language code below.

## Add the language code in your data repository

1. Log in to Github.com and go to your data repository.
1. In the list of files, click on `config_data.yml`.
1. Click the pencil icon on the right to begin editing the file.
1. Under `languages` add a new line with `- ru`, copying the same indentation and spacing as the previous line. For example:

    ```
    languages:
      - en
      - es
      - ru
    ```
    
1. Towards the bottom, select "Create a new branch for this commit and start a pull request."
1. Beneath this, click "Propose changes".
1. Click on the green "Create pull request" button.
1. Wait until you see "All checks have passed". This takes about 5 minutes.
1. Click on the green "Merge pull request" button.

Before continuing to the next step, wait for another 5 minutes. This gives your data repository time to rebuild with the new language. If you would like to see the progress of the rebuild, you can click on `Actions` (next to `Pull requests`).

## Add the language code in your site repository

1. Still logged in to Github.com, go to your site repository.
1. In the list of files, click on `_config.yml`.
1. Click the pencil icon on the right to begin editing the file.
1. Just as you did in the data repository, under `languages` add a new line with `- ru`.
1. Towards the bottom, select "Create a new branch for this commit and start a pull request."
1. **Change the name of the branch to `language-tutorial`. You will use this same branch name for the remaining changes in this tutorial.**
1. Beneath this, click "Propose changes".
1. Change the name of the pull request to "Language tutorial".
1. Click on the green "Create pull request" button.

**Do not merge this pull request yet - there are some remaining steps.**

Before going further, switch to your newly-created branch:

1. Go to the root of your site repository.
1. Above the list of files, press the drop-down that says `develop`, and select `language-tutorial`.

This *switches* you to the `language-tutorial` branch, which you will use for the remainder of the tutorial.

## Create new versions of posts

If you used the Quick Start to start your implementation of Open SDG, you likely have 1 file in the `_posts` folder. You will need to make a new Russian copy of this file.

1. Still logged in to Github.com, go to your site repository.
1. In the list of files, navigate to `_posts/2020-01-10-test-post-1.md`.
1. Above and to the right of the code, click the `Raw` button.
1. Select the entire chunk of code and copy it to your clipboard (press CTRL + a, and then CTRL + c).
1. Next get back to the site repository's `_posts` folder (click your browser's back button twice).
1. Above the list of files, click the "Add file" drop-down, and select "Create new file".
1. Where it says "Name your file" type `ru/` and then type `2020-01-10-test-post-1.md` (the same file name as the original we copied above).
1. Under "Edit new file" paste the code you copied above (press CTRL + v).

Before adding the new Russian copy of the file to your branch, you will make some changes. Normally you would also do quite a bit of translation, but for now you will only change the `language` and `permalink`. Look for this part:

```
language: en
permalink: /test-post-1/
```

And change it to the following:

```
language: ru
permalink: /ru/test-post-1/
```

Now you can continue to add the new file to your branch:

1. At the bottom you should see "Commit directly to the `language-tutorial` branch".
1. Click the "Commit new file" button.

## Create new versions of pages

If you used the Quick Start to start your implementation of Open SDG, you likely have 7 files in the `_pages` folder. You will need to make a new Russian copies of each of these files. The steps are identical to the steps for "posts" above, but here they are again:

1. Still logged in to Github.com, go to your site repository.
1. In the list of files, navigate to `_pages/about.md`.
1. Above and to the right of the code, click the `Raw` button.
1. Select the entire chunk of code and copy it to your clipboard (press CTRL + a, and then CTRL + c).
1. Next get back to the site repository's `_pages` folder (click your browser's back button twice).
1. Above the list of files, click the "Add file" drop-down, and select "Create new file".
1. Where it says "Name your file" type `ru/` and then type `about.md` (the same file name as the original we copied above).
1. Under "Edit new file" paste the code you copied above (press CTRL + v).

Before adding the new Russian copy of the file to your branch, you will make some changes. Normally you would also do quite a bit of translation, but for now you will only change the `language` and `permalink`. Look for this part:

```
language: en
permalink: /about/
```

And change it to the following:

```
language: ru
permalink: /ru/about/
```

Now you can continue to add the new file to your branch:

1. At the bottom you should see "Commit directly to the `language-tutorial` branch".
1. Click the "Commit changes" button.

Next, repeat the steps in this section for all of the following 6 files:

* /_pages/categories.md
* /_pages/contact.md
* /_pages/cookies.md
* /_pages/faq.md
* /_pages/guidance.md
* /_pages/news.md

## Merge the pull request

Now you are finished with the updates needed for this tutorial. In order to see the changes, all that is left is to merge the pull request.

1. In your site repository, click on "Pull requests".
1. Click on the "Language tutorial" pull request.
1. At the bottom click on the green "Merge pull request" button.

## View your results

Your site will now begin rebuilding. After about 5 minutes, if you visit your site, you should be able to use the language-switcher to change to Russian, on any page.

## Other considerations for translation

Note that there are several other aspects of an Open SDG implementation that need to be translated, including indicator metadata, data disaggregation labels, and even date formats. For a detailed explanation of all of the various translatable aspects of Open SDG, see [the translation documentation](../translation.md).

## Troubleshooting

If this did not appear to work, please consult the [troubleshooting page](../troubleshooting.md).
