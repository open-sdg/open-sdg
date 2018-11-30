# Forking

Two separate repositories are needed to have a working implementation of this platform. In order to help you get started quickly, there are "starter" repositories available for easy forking:

1. [sdg-indicators-starter](https://github.com/OpenDataEnterprise/sdg-indicators-starter)
    * Contains specific configuration and content for your platform (pages, documents, menus, etc.)
    * Powered by [Jekyll](https://jekyllrb.com)
    * Will be referred to in this documentation as the "site repository"
2. [sdg-data-starter](https://github.com/OpenDataEnterprise/sdg-data-starter)
    * Contains the SDG indicator data and metadata for your platform
        * Data is stored in CSV files
        * Metadata is stored in YAML files
    * Will be referred to in this documentation as the "data repository"

## Forking the repositories

Log into Github.com and fork both of the above-mentioned repositories, by visiting the repositories and selecting the `Fork` button in the upper right.

Notice that the URLs of your forks will change depending on the Github account that you "forked to". For example, if your Github account is `my-github-account`, then your forks' URLs will be:
* https://github.com/my-github-account/sdg-indicators-starter
* https://github.com/my-github-account-sdg-data-starter

## Renaming the repositories

Next it is recommended that you rename your repositories to more accurately reflect your implementation of the platform. For example, if the platform is for the country of Sweden, you might rename the repositories to:
    * sdg-indicators-sweden
    * sdg-data-sweden

Here are the steps, for each of the two repositories:
* Select the "Settings" option in the upper menu
* Under "Repository name" make your change
* Select "Rename"

Notice that the URLs of your forks have now changed again. Combining the examples used so far, the URLs might be something like:
* https://github.com/my-github-account/sdg-indicators-sweden
* https://github.com/my-github-account/sdg-data-sweden

Going forward, these are the URLs you will most frequently visit in implementing and maintaining the platform.
