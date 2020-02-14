<h1>Change Log</h1>

## 1.0.0

* More consistent template variables without globals (#394)
* Auto fit search bar around text (#407)
* Add link to Open SDG to footer (#411)
* Configurable footer menu links (#414)
* Escape variables in alt attributes (#415)
* Use indicator_available instead of graph_title for the indicator page H2 (#422)
* Reporting status for any metadata field (#424)
* Switch to Lunr for search functionality (#427)
* Metadata field translation keys (#428)
* Show post excerpts on news page (#431)
* Sass refactor (#439)
* Ensure that indicator data always has a value (#441)
* Set background to white for pages and footer (#448)
* General javascript cleanup (#451)
* Add box shadows to goal tiles (#452)
* Underline menu items when hovered (#454)
* Move search box above the top navigation (#455)
* Keep searchbox the same size when in focus (#456)
* Multilingual news/posts (#457)
* Make bars striped when necessary (#459)
* Remove uppercase styling for top menu (#461)
* Make serve command for easier local development (#464)
* Adjust homepage whitespace (#465, #473)
* Redesign indicator page tabs (#466, #472, #479)
* Change the styling of the top banner on goal and indicator pages (#474)
* Update the chart download button when data changes (#476)
* Fixed rounding on reporting status page progress bar (#485)

Breaking changes:

* This upgrade should be accompanied by an upgrade to:
    * jekyll-open-sdg-plugins 1.0.0
    * sdg-build 1.0.0
* `t` has changed to `page.t`. Eg: t.general.goal is now page.t.general.goal. All overridden templates should be updated accordingly.
* The following include files have been removed:
    * indicator-variables.html
    * goal-variables.html
    * multilingual.html

    This means that global variables like `meta`, `current_language`, etc. are no longer available. All overridden templates that include these files will need to be updated. To fix, remove the "include" statements and remove any use of global variables. It may be easier to start with the updated version of the file from Open SDG, and then re-apply your modifications.

* Along the lines of the item above - expect that ALL templates in the platform have been updated. So every overridden layout and/or include file will potentially need to be updated.
* The `get_indicator_name` filter is no longer supported. The metadata field `indicator_name` is now the sole (and required) source of indicator names.
* The "subfolder approach" for translation is no longer supported and has been removed from the documentation.
* The `remotedatabaseurl` setting is no longer supported. Sites should use `remote_data_prefix` instead, if not already.
* The `custom_css` configuration option is deprecated in favor of a more standard Jekyll approach. To add custom styles it is recommended to put a `custom.scss` in your site repository's `_sass` folder. This has the effect of overriding [this file](https://github.com/open-sdg/open-sdg/blob/master/_sass/custom.scss
* The H2 on indicator pages is now controlled by the `indicator_available` metadata field. Previously it was controlled by `graph_title`, which also displays above the graph. Be aware that if your indicators do not have anything in the `indicator_available` field, this H2 will no longer display.

## 0.10.0

* Functionality and docs for a 'languages_public' mapping (#360)
* Footerfield for Copyright (#364)
* Configurable URLs for the edit buttons (#368)
* Metadata tabs configuration (#378)
* Ability to hide empty metadata (#378)
* Add footer to embed tag (#401)

Breaking changes:

* This upgrade should be accompanied by an upgrade to:
    * jekyll-open-sdg-plugins 0.0.16
* In addition, if you have overridden any of the following files, check [this diff](https://github.com/open-sdg/open-sdg/compare/0.9.0...0.10.0) to see if you need to make any updates to your overriddes:
    * _includes/assets/js/indicatorModel.js
    * _includes/components/breadcrumb.html
    * _includes/components/edit-buttons.html
    * _includes/components/headline.html
    * _includes/components/language-toggle.html
    * _includes/components/metadata.html
    * _includes/goal-variables.html
    * _includes/head.html
    * _includes/indicator-variables.html
    * _includes/multilingual.html
    * _includes/scripts.html
    * _layouts/goal-by-target.html
    * _layouts/goal.html
    * _layouts/indicator.html

## 0.9.0

* Center embed title (#330)
* Move charset to beginning of head (#333)
* Fixes for forcing units/disaggregation when there is no headline (#338)
* Switch to flattened global translations (#344)
* Allow min and max value to be set on y axis (#351, #352)

Breaking changes:

* This upgrade MUST be accompanied by an upgrade to both:
    * sdg-translations 0.8.0 (or higher)
    * jekyll-open-sdg-plugins 0.0.14 (or higher)
* In addition, if you have overridden any of the following files, check [this diff](https://github.com/open-sdg/open-sdg/compare/0.8.0...0.9.0) to see if you need to make any updates to your overriddes:
    * _includes/assets/js/indicatorView.js
    * _includes/components/breadcrumb.html
    * _includes/components/charts/bar.html
    * _includes/components/charts/line.html
    * _includes/head.html
    * _includes/indicator-variables.html
    * _layouts/frontpage.html
    * _layouts/goal-by-target.html
    * _layouts/goal.html
    * _layouts/indicator-json.html
    * _layouts/indicator.html
    * _layouts/reportingstatus.html
    * assets/css/default.scss

## 0.8.0

* Translate regions on maps (#255)
* Translate each part of the combined disaggregation labels (#256)
* Set a body class for each layout (#257)
* Force a specific unit if needed when no headline data (#264)
* Use page.url instead of page.permalink to determine active menu item (#266)
* Fixed typo in quickstart (#270)
* Fix search bar styling for IE and mobile (#273)
* Screen reader to read out disaggregation is expandable/collapsible and what state it is in (#317)
* Prefix social media platform links with platform name (#318)
* Clean up embed code and make more configurable (#319)
* Make search bar obvious to screen readers (#320)
* Give goal page title in format `Goal # - Goal title` (#321)
* Screen reader to indicate when check boxes are selected (#323)
* Add configurable data notice to indicator pages (#296)
* Stop disclaimer from overhanging if text is long (#309)
* Have list of sources in graph footer rather than just one (#311)
* Mobile menu fix (#324)
* Allow markdown in all visible metadata fields (#303)
* Optional alternative contrast button (#325)
* Chart attributes changes from canvas to html (#315)

Breaking changes:

* You should be using SDG Translations 0.7.0 or higher before upgrading to this release
* Embedded feature configuration has changed. If you are using the embedded option you need to alter the metadata tags to account for these changes.
* After this change, all sites will need to have jekyll-open-sdg-plugins 0.0.13 or later.
* In addition, if you have overridden any of the following files, check [this diff](https://github.com/open-sdg/open-sdg/compare/0.7.0...0.8.0) to see if you need to make any updates to your overriddes:
   * _includes/assets/js/indicatorModel.js
   * _includes/assets/js/indicatorView.js
   * _includes/assets/js/menu.js
   * _includes/assets/js/plugins/jquery.sdgMap.js
   * _includes/components/data-notice.html
   * _includes/components/metadata.html
   * _includes/footer.html
   * _includes/head.html
   * _includes/header.html
   * _includes/search.html
   * _layouts/indicator.html
   * assets/css/default.scss

## 0.7.0

* Create search button (#244, #251)
* Translate the var_hint_replacement variable (#246)
* Add sticky share buttons (#242)
* Make sure the target name is also white in high-contrast (#241)
* Refactor/cleanup of footerFields for charts/tables (#239)
* Hide/show the sidebar depending on the active tab (#233)
* Translate the units of measurement in the Y axis (#228)
* Correct the initially-selected unit when headline doesn't use first unit (#220)
* Remove data rounding and provide an easier way to add custom rounding (#212)
* Catch another spot where zeroes are getting clobbered: the headline (#211)
* Enable support for buttons on mobile top level menu (#210)
* Expect dash-delimited translation keys for indicators/targets (#206)
* A more precise check for data (disaggregation) translations. (#202)
* Support zero values (#201)
* Disaggregation accordions: Move ARIA expanded status to button (#200)

Breaking changes:

* Rounding of data has been removed by default. For instructions on adding it back, and controlling the behavior, see #212.
* Translation keys for indicators/targets are now expected to be dash-delimited instead of dot-delimited. This means that you should **not** upgrade to this release until you are using SDG Translations [0.6.0](https://github.com/open-sdg/sdg-translations/releases/tag/0.6.0) or higher.
* Data disaggregation translation keys (ie, translations inside a `data.yml` file) are now expected to be case-sensitive matches, and are no longer automatically converted to lowercase.
* In addition, if you have overridden any of the following files, check [this diff](https://github.com/open-sdg/open-sdg/compare/0.6.0...0.7.0) to see if you need to make any updates to your overriddes:
    * _includes/assets/js/accessibility.js
    * _includes/assets/js/indicatorModel.js
    * _includes/assets/js/indicatorView.js
    * _includes/assets/js/menu.js
    * _includes/assets/js/search.js
    * _includes/components/fields-template.html
    * _includes/components/units-template.html
    * _includes/head.html
    * _includes/javascript-variables.html
    * _includes/multilingual-js-base.html
    * _includes/scripts.html
    * _includes/search.html
    * _layouts/indicator.html
    * assets/css/default.scss

## 0.6.0

* Translate 'goal x' on search results page (#191)
* Translate 'indicators' on reporting status page (#190)
* Add facebook option to footer (#189)
* Autotrack for Google Analytics (#188)
* Better selection of fields when there is no headline (#186)
* Only add the (fake) goal 18 if there are exactly 17 goals (#184)
* Allow either multiple or single map layers (#183)
* Round the percentages on reporting status page (#182)
* Wrap the text of the 'Source' metadata below charts (#181)
* Ensure binary graphs always stretch from Yes (1) to No (-1) (#177)
* More robust way to display indicator names (#173)
* Update Bootstrap to 3.4.1 (#170)
* Accessibility: update footer as unordered list (#167)
* All-around cleanup, documentation, and light refactor of Chart.js stuff (#166)
* Add ARIA expanded attribute to dissaggregation selectors (#162)
* Polyfills for Array.forEach and String.includes (#154)
* Add notapplicable as fully supported status (#150)
* Configurable frontpage headings (#147)
* Exclude column 'Unit measure' from display (#145)

Breaking changes:

* An new required feature was added in [jekyll-open-sdg-plugins](https://github.com/open-sdg/jekyll-open-sdg-plugins). Make sure your Gemfile is referencing version 0.0.10 of jekyll-open-sdg-plugins, as shown [here](https://github.com/open-sdg/open-sdg-site-starter/blob/develop/Gemfile#L8).
* In addition, if you have overridden any of the following files, check [this diff](https://github.com/open-sdg/open-sdg/compare/0.5.0...0.6.0) to see if you need to make any updates to your overriddes:
    * _includes/assets/js/accessibility.js
    * _includes/assets/js/googleAnalytics.js
    * _includes/assets/js/indicatorModel.js
    * _includes/assets/js/indicatorView.js
    * _includes/assets/js/plugins/jquery.sdgMap.js
    * _includes/components/charts/bar.html
    * _includes/components/charts/binary.html
    * _includes/components/charts/chart.html
    * _includes/components/charts/line.html
    * _includes/components/fields-template.html
    * _includes/footer.html
    * _includes/head.html
    * _includes/indicator-variables.html
    * _includes/javascript-variables.html
    * _includes/polyfills.html
    * _includes/scripts.html
    * _layouts/frontpage.html
    * _layouts/goal-by-target.html
    * _layouts/goal.html
    * _layouts/indicator-json.html
    * _layouts/indicator.html
    * _layouts/reportingstatus.html
    * _layouts/search.html
    * assets/css/default.scss
    * assets/js/sdg.js

## 0.5.0

Refactoring, re-structuring, bug fixes, and enhancements.

* Revamp reporting status page to allow for custom types (#111)
* Support translation of data columns/filters (#117, #137)
* Add optional layout for two-column goal pages (#118)
* Maps: skip missing years in the year slider (#119)
* Prevent issues with special characters on search page (#120)
* Allow control of text of non-global metadata tab (#121)
* Translate additional elements (#116, #122)
* Change goal paths to use numbers (#123)
* Use scope=row to improve table accessibility (#124)
* Sort list of years to fix possible mapping problems with year slider (#126)
* Make it easier to override Google Analytics (#128)
* Keep 2 special columns out of disaggregation filters (#131)

Breaking changes:

* An upstream bug was fixed in [jekyll-open-sdg-plugins](https://github.com/open-sdg/jekyll-open-sdg-plugins). Make sure your Gemfile is referencing version 0.0.6 of jekyll-open-sdg-plugins, as shown [here](https://github.com/open-sdg/open-sdg-site-starter/blob/develop/Gemfile#L8).
* The reporting status page has been refactored, and the following changes will be needed:
    * In the data repository, make sure the order of the `reporting_status` options in your `_prose.yml` file matches the order you would like them to appear on the page. Example [here](https://github.com/open-sdg/open-sdg-data-starter/commit/3f22d5529c1b3084c3b06665a5e2920cff0aff17).
    * In the data repository, make sure you are using at least version 0.3.0 of SDG Build. Example [here](https://github.com/open-sdg/open-sdg-data-starter/commit/55d91b5952b3cd6ca6d1ddc4601354e8acc4c22b).
    * In the site repository, make sure you are pulling in this new data in the `jekyll_get_json` section. Example [here](https://github.com/open-sdg/open-sdg-site-starter/commit/7986def8a1b82f8754f22a69154560ac33374dd3).
* All goal pages will need updated permalinks. Example [here](https://github.com/open-sdg/open-sdg-site-starter/commit/f421fa542687dfba2fcf93c209a8bdf9d4498c0a).
* You may also want to create redirects from the old permalinks. Example [here](https://github.com/GSA/sdg-indicators-usa/commit/648c1a9ae037ea22ed65bcf4158f7d1612934d2b) and [here](https://github.com/brockfanning/sdg-indicators/commit/e0093955cdafef93e31847cba61837881ada3e04).
* In addition, if you have overridden any of the following files, check [this diff](https://github.com/open-sdg/open-sdg/compare/0.4.0...0.5.0) to see if you need to make any updates to your overriddes:
    * _includes/assets/js/indicatorModel.js
    * _includes/assets/js/indicatorView.js
    * _includes/assets/js/plugins/jquery.sdgMap.js
    * _includes/assets/js/plugins/leaflet.yearSlider.js
    * _includes/assets/js/search.js
    * _includes/components/fields-template.html
    * _includes/components/headline.html
    * _includes/components/units-template.html
    * _includes/footer.html
    * _includes/head.html
    * _includes/indicator-variables.html
    * _layouts/frontpage.html
    * _layouts/goal.html
    * _layouts/indicator.html
    * _layouts/reportingstatus.html
    * _layouts/search.html
    * assets/css/default.scss

## 0.4.0

Minor release with some multilingual enhancements and other bug fixes.

* Fix bug with maps that have more than 2 layers (#104)
* Optional method for translating metadata (#102)
* Translate the country name/adjective on the homepage (#101)
* Remove all goal images from this project (#99)
* Fix problems with double-quotes breaking the search page (#98)
* Translate indicator tags on goal pages (#96)
* Simpler translation of navigation menu items (#94)

**This release will require at least one update to your code.**:

Breaking changes:

* You should add the following line to your `_config.yml` file:
    ```
    goal_image_base: https://open-sdg.github.io/sdg-translations/assets/img/goals
    ```
* In addition, if you have overridden any of the following files, check [this diff](https://github.com/open-sdg/open-sdg/compare/0.3.1...0.4.0) to see if you need to make any updates to your overriddes:
    * _includes/assets/js/plugins/jquery.sdgMap.js
    * _includes/components/metadata.html
    * _includes/header.html
    * _layouts/frontpage.html
    * _layouts/goal.html
    * _layouts/indicator.html
    * _layouts/reportingstatus.html
    * _layouts/search.html
    * _layouts/indicator-json.html
    * assets/css/default.scss

## 0.3.1

Patch release with some accessibility and bug fixes.

* Bugfix for page titles (#64)
* Accessibility improvements for high contrast mode (#2) (#4)
* Search queries now use a `?q=<search-term>` string for better GA compatibility (#81)

Breaking changes: For any sites that have overridden the theme, they will need to add `{% include multilingual.html %}` at the top of each page as this has been moved out of `head.html`.

## 0.3.0

* Changelog added (#47)
* Update community page after US launch (#46)
* Remove the hardcoded menu (#43)
* Leaflet map (#34)

## 0.2.0

* Cucumber tests (#48)
* Configurable Twitter link (#44)
* Makefile for CI (#38)
* Max height on disclaimer component (5bbeeb2ab8bf056800c423d9427653950b64f894)
* Lots of documentation updates

## 0.1.0

This is the initial release, consisting of code developed in collaboration between teams in the UK and the US. This release is production-ready, but further development and documentation will be done, leading up to a 1.0.0 release.
