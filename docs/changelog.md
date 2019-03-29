<h1>Change Log</h1>

### 0.5.0

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
* Make it easier to override Google Analytics (#128)

Breaking changes:

* The reporting status page is now tied directly to the `_prose.yml` file in the data repository. Make sure that the order of the "options" under `reporting_status` matches the order you would like them to appear on the page.
* All goal pages will need updated permalinks! You may also want to create redirects from the old permalinks. More information is [here](https://github.com/open-sdg/open-sdg/pull/123#issue-261720878).
* In addition, if you have overridden any of the following files, check [this diff](https://github.com/open-sdg/open-sdg/compare/0.4.0...0.5.0) to see if you need to make any updates to your overriddes:
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

### 0.4.0

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

### 0.3.1

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
