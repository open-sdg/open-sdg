# Github Pages

Github's "Github Pages" is a great hosting option for Open SDG, because Github is already a central component of the platform. The way Github Pages works is fairly simple: Github will serve your files as a website, for free. All you need to do is push them to a branch called `gh-pages`.

## Pros

* Github Pages is free
* There is no set-up involved
* The "github.io" domain names include a built-in SSL certificate (HTTPS)

## Cons

There aren't many downsides to Github Pages, which is why it is the recommended hosting option in Open SDG.

## Domain name

Out of the box, your Github Pages site will available at a pre-defined URL, according to your Github organisation and the repository name. If your Github organisation is "foo" and your repository name is "bar", then your Github Pages website will be available at `https://foo.github.io/bar`.

You can also [customise the URL](https://help.github.com/articles/using-a-custom-domain-with-github-pages/) to any domain that you own.

## Set-up

As mentioned above, there is no special set-up involved in Github Pages, since we are already using Github to host the repositories.

## Automation

The [site starter](https://github.com/open-sdg/open-sdg-site-starter) and [data starter](https://github.com/open-sdg/open-sdg-data-starter) repositories both include a [script](https://github.com/open-sdg/open-sdg-site-starter/blob/develop/scripts/deploy/circleci/deploy_staging.sh) to help use Github Pages for hosting. Using Github Pages for the "production" environment can be accomplished by having a second Github organisation, and the starter repositories also include everything needed to do this.

The main hurdle in automating deployments to Github Pages is setting up the SSH keys to allow your automation tool to write to the Github repository. For a detailed walk-through of this, see the [Quick Start](../quick-start.md).
