The following is meant to be copy-pasted into a Github issue whenever it is time to start working towards a new release:

In the steps below, "all four repos" refers to open-sdg, sdg-build, sdg-translations, and jekyll-open-sdg-plugins.

# Releasing the "beta1" version (eg 1.3.0-beta1)

* [ ] Create a new dev branch (eg, 1.3.0-dev) in all four repos
* [ ] Make these new dev branches the default branch for all four repos
* [ ] In the new dev branch for open-sdg, make sure that tests run against the new dev branches for the other repos, by updating these files:
     * tests/site/Gemfile
     * tests/data/requirements.txt
* [ ] Push the beta tag for all four repos
* [ ] Do testing, pushing new beta2/beta3/etc tags as needed

# Releasing the new version (eg 1.3.0)

## A. Changelogs and versions

1. [ ] Make sure these open-sdg files have been updated:
    * docs/changelog.md
    * docs/platform.md
2. [ ] Make sure these sdg-build files have been updated:
    * CHANGELOG.md
    * README.md
    * setup.py (version number)
3. [ ] Make sure these sdg-translations files have been updated:
    * www/changelog.md (currently out of date)
4. [ ] Make sure these jekyll-open-sdg-plugins files have been updated:
    * lib/jekyll-open-sdg-plugins/version.rb (version number)
5. [ ] Make sure the upgrade instructions have been added to docs/upgrades/.

## B. Translations

1. [ ] Make sure that any new translations have been translated into all languages. Use machine translation for this, and mark them as "Needs edit" so that a human translator can eventually edit/approve. **This has now been automated for all translation groups except for global_indicators, global_targets, and global_goals, thanks to the "Automatic translation" add-on in Weblate.**
2. [ ] Make sure that Weblate has no pending commits and the Weblate pull-request has been merged.

## C. Tags and branches

1. [ ] Push the new tag for all four repos.
2. [ ] Merge the old dev branch into the new dev branch for all four repos. Eg, if releasing version 1.3.0, merge 1.3.0-dev into 1.4.0-dev.
3. [ ] Merge the old dev branch into the master branch for all four repos. Eg, if releasing version 1.3.0, merge 1.3.0-dev into master.

## D. Packages

1. [ ] Build ("gem build") and push ("gem push") the jekyll-open-sdg-plugins gem to rubygems.org
2. (Not implemented yet) Publish sdg-build to pypi.org.

## E. Starter repositories

1. [ ] Update the open-sdg-data-starter to point to the new tags, by updating these files:
    * https://github.com/open-sdg/open-sdg-data-starter/blob/develop/config_data.yml
    * https://github.com/open-sdg/open-sdg-data-starter/blob/develop/scripts/requirements.txt
2. [ ] Update the open-sdg-site-starter to point to the new tags, by updating these files:
    * https://github.com/open-sdg/open-sdg-site-starter/blob/develop/_config.yml
    * https://github.com/open-sdg/open-sdg-site-starter/blob/develop/Gemfile
3. [ ] Update the open-sdg-simple-starter to point to the new tags, by updating these files:
    * https://github.com/open-sdg/open-sdg-simple-starter/blob/develop/Gemfile
    * https://github.com/open-sdg/open-sdg-simple-starter/blob/develop/requirements.txt
    * https://github.com/open-sdg/open-sdg-simple-starter/blob/develop/config_site.yml
    * https://github.com/open-sdg/open-sdg-simple-starter/blob/develop/config_data.yml
4. [ ] If this release contains any "recommended but optional" features, configure them in the starter repos as needed.

## F. Outreach

1. [ ] Create a release video
2. [ ] Create a post on open-sdg.org
3. [ ] Social media announcements
