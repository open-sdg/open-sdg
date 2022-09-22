<h1>Tutorial: Creating new pages</h1>

This tutorial will describe how to create new pages and add them to your main menu. It will also cover some steps needed for multilingual implementations.

## Topics covered

* Jekyll pages
* Markdown
* Multilingual pages
* Menu configuration

## Level of difficulty

This tutorial is mostly about content, but does involve the editing of some configuration files. Anyone can follow the steps to complete the tutorial, however you will be using the YAML syntax involved in most Open SDG configurations. YAML requires particular indentation and spacing, so some attention to detail will be needed.

## Decide on a new page to create

In practice, you will need to come up with the title and content for the new page. This may involve some content work, but for now we will just use example text.

## Start a branch

Like many tutorials, we will be changing multiple files. So it is best to create a branch first.

1. In your site repository on Github.com, open the dropdown in the top left which says "develop".
2. Type "create-pages-tutorial"
3. In the dropdown select "Create branch: create-pages-tutorial from 'develop'".

This creates a branch called "create-pages-tutorial" and switches to that branch. We will be working on this branch for the rest of the tutorial.

## Start the new page

1. In your site repository on Github.com, go into the `_pages` folder.
2. Press "Add file" and then "Create new file".
3. Name your file "example.md". Or substitute any other name, as long as it ends with ".md". This extension stands for [Markdown](https://daringfireball.net/projects/markdown/), which will be discussed in more detail below.
4. After typing the name, click into the editor which is open below, in which you can proceed to the next section.

## Add the page's "front matter"

> The term "front matter" refers to a series of key/value pairs in YAML syntax, commonly used in Jekyll and other software. For more information, here is the [Jekyll documentation on front matter](https://jekyllrb.com/docs/front-matter/) and here is an [introductory primer on YAML](https://www.youtube.com/watch?v=1uFVr15xDGg). However, these resources are not required for this tutorial.

With any Jekyll site your pages need to have a "front matter" section at the top. This section must be formatted in a certain way. In our case, it must have 4 particular "fields" (key/value pairs). Here are the steps:

1. Click into the body of the page (under "Edit new file").
2. On the first line, type three dashes: `---`
3. On the next line, type the title field: `title: This is my example title`
4. On the next line, type the language field: `language: en`
5. On the next line, type the permalink field: `permalink: my-example-page/`
6. On the next line, type the layout field: `layout: page`
7. On the next line, type three more dashes: `---`

Afterwards it should look something like this:

```
---
title: This is my example title
language: en
permalink: my-example-page/
layout: page
---
```

Let's go over what these fields do:

* **title**: This is the title of the page. Feel free to change the value here as needed.
* **language**: This is the language of the page, and should correspond to the correct language abbreviation.
* **permalink**: This determines the URL for the page. It should end with a slash, and can have any number of slashes within it. For example, this is also fine: `my/example/page/`. Like any URL, it should not contains spaces. Typically dashes are used instead.
* **layout**: This determines the Jekyll "layout" that is used, and should usually be set to "page".

Finally the triple-dash lines are important because they identify this section as "front matter".

## Add the page's content

Now we can add the actual content of the page. This can be HTML code if you prefer, but typically is easier to use a syntax called Markdown, which is designed to be more human-readable than HTML. For details on using Markdown, [here is a good Markdown guide](https://www.markdownguide.org/basic-syntax/).

For our purposes, we can use a simple example sentence:

```
This is my page content.
```

So, all together with the front matter we added earlier, you should have something like this:

```
---
title: This is my example title
language: en
permalink: my-example-page/
layout: page
---
This is my page content.
```

1. At the bottom select "Commit directly to the `create-pages-tutorial` branch".
1. Click the "Commit changes" button.

## Multilingual: translated versions

If your implementation uses more than one language, then you may notice that the pull-request you have just created will result in failures in the automated tests. This is because the translated versions are missing.

> If your implementation does not use more than one language, you can skip ahead to the "Add a menu item" section.

In Open SDG, the expectation is that every page will be translated into every language. To translate a page, you can simply create another copy of the file. For this explanation, let's assume we need to create a Spanish version.

This is nearly identical to the previous step, but we will put the file in a subfolder for Spanish pages: "es".

1. In your site repository on Github.com, make sure you are still in the `create-pages-tutorial` branch. If not, select in the dropdown on the top left.
1. Go into the `_pages` folder.
1. Press "Add file" and then "Create new file".
1. Name your file "es/example.md". (The "es/" is what creates the subfolder.)

As before we will add "front matter", but there will be three important differences:

1. The "title" will be translated into Spanish.
1. The language will be "es" instead of "en".
1. The permalink will be identical, but it will start with "es/".

So this time the front matter will be:

```
---
title: Este es mi título de ejemplo
language: es
permalink: es/my-example-page/
layout: page
---
```

Next we will add our Spanish content below. So for example, all together it might be:

```
---
title: Este es mi título de ejemplo
language: es
permalink: es/my-example-page/
layout: page
---
Este es el contenido de mi página.
```

Now we can add this change to our branch.

1. At the bottom select "Commit directly to the `create-pages-tutorial` branch".
1. Click the "Commit changes" button.

## Add a menu item

This step is not required, if you would like to add a link to the new page in your main menu, here are the steps:

1. In the root of your site repository on Github.com, make sure you are still in the `create-pages-tutorial` branch. If not, select it from the dropdown on the top left.
1. Go to the `_data` folder and click on `site_config.yml`.
1. Click the pencil icon on the right to begin editing the file.
1. Look for the `menu` section.
1. Add an item at the bottom of the list, using the same syntax and indentation as the others:

        - path: my-example-page/
          translation_key: My menu item

Let's go over what these fields do:

* **path**: This is the path for the page. This should correspond to the "permalink" we chose in the original page's "front matter".
* **translation_key**: This is the label of the menu item. As its name implies, it can be a "translation key" (for more details on translation keys, see the [glossary page in the "translation keys" section](../glossary.md#translation-keys)). In the example above, for simplicity we just used "My menu item". However, in a multilingual implementation, we would certainly want to use a translation key. For example, if you have a translation file called custom.yml with an item in it called "example-menu-label", then you would put "custom.example-menu-label" here.

Now we can add this change to our branch.

1. At the bottom select "Commit directly to the `create-pages-tutorial` branch".
1. Click the "Commit changes" button.

## Merge the pull request

We have now added a page to our site and menu. Perform these last steps to create and merge the pull-request.

1. In the root of your site repository on Github.com, make sure you are still in the `create-pages-tutorial` branch. If not, select it from the dropdown on the top left.
1. Click on the "Pull request" tab and then click the "New pull request" button.
1. Click on the `create-pages-tutorial` branch. You will see that there should be a number of commits and a number of files changed.
1. Click on the green "Create pull request" button. This will take you to another page where you could add a description for the pull request, and then click the "Create pull request" button again.
1. Wait until you see "All checks have passed". This could take about 5 minutes.
1. Click on the green "Merge pull request" button. Note that this relies on [triggered site builds](https://open-sdg.readthedocs.io/en/latest/automation/triggered-site-builds/) already being in place.

## View the results

Your site will now begin rebuilding. After about 5 minutes, if you visit your site, you should see the updated menu and your example page.
