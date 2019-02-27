<h1>Change Log</h1>

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
