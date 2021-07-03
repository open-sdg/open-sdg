<h1>Change Log</h1>

## 1.4.0

* Graph limits fix #1260
* Add slash after 'search' in URL #1256
* Remove unused assets: tether.js, d3 #1234
* Max width so that status will wrap on goal-by-target-vertical #1233
* Fixes for some zoom issues on maps #1228
* Aria attributes to improve accessibility of map search suggestions #1222
* Square points for headline on line charts #1220
* Handle searches with no input #1219
* Include file for custom `<HEAD>` content #1215
* Include file for easier overriding of body classes #1212
* Bug fix: allow multiple multi-level disaggregations #1205
* Remove the selection-bar from the disaggregation control dropdowns #1203
* Hide first-element H1s in metadata for better display of global templates #1199
* In reporting status display "Reported" instead of "Reported online" #1180
* Metadata fields containing "_date" will be formatted as dates #1175
* New date-only Git-based metadata fields open-sdg/sdg-build#244
* Option for a single-icon high-contrast toggle #1171
* Option to use series for chart titles when available #1168
* Darker color for main nav #1142
* Move goal header to include file #1128
* Metadata and data forms and other improvements to config forms #1082

## 1.3.0

* Configurable chart headline colors #1145
* High contrast fix: hover color for disaggregation values in dropdown #1122
* Avoid highlighting entire div on focus #1120
* High contrast fix: Remove hover styles for chart legend #1119
* High contrast fix: Too-many-datasets message #1117
* High contrast fix: Focus color on dropdowns #1116
* High contrast fix: Fix reporting status type styling in goal-by-target-vertical #1112
* Fix support for indicator ID searches in all languages #1110
* Tweak the link/visited colors in high contrast mode #1104
* New 'accessible' color-set option for optimal contrast #1103
* Add gutter to sources tab #1096
* Color adjustments for chart grids #1095
* Switch to Lodash instead of Underscrore #1092
* Bug fix - variable name in config builder #1091
* Use https to avoid mixed content error on config forms #1090
* Do not use empty titles in head #1089
* Refactor and style updates for tags on goal pages #1088
* Fix layout issues with odd-numbered indicator sources #1087
* Reset button for config forms #1086
* Updates to news layout markup/style #1078
* Precision, decimal separator, and data display alterations #1073
* Allow numeric disaggregation #1072
* Translate 'Results found' #1071
* Use configured zip filename #1061
* High contrast fix: chart image downloads #1048
* Reporting status accessibility fixes #1044
* HTML 'lang' attribute should depend on current language #1042
* Map data should use rounding function #1040
* Do not change SVG images in high-contrast mode #1039, #1121
* Show units in chart tooltips #1038
* Improvements to hierarchical sorting of disaggregation controls #1037
* Optimization of validParentsByChild #1036
* Allow alternative unit and series columns #1027
* Per-indicator label for COMPOSITE_BREAKDOWN column #1026
* Changing series should affect the visible units/fields #1025
* Dropdowns in the main menu #1016
* Consistent color-assignments for disaggregations on chart #1011
* Increase goal-by-target-vertical indentation #1008
* Optional left-aligned header, increase awareness for search box, and search results-page tweaks #1002
* Optional previous/next navigation for indicators and goals #1001
* Allow alteration of DataTable configuration and fix tables for "binary" indicators #995
* Support non-numeric years in maps #993
* Standalone (non-SDG) indicators #988

For data-related updates, see the [SDG Build changelog](https://github.com/open-sdg/sdg-build/blob/master/CHANGELOG.md).

## 1.2.0

* Tweak page-content styles for goal pages #1034
* Margin below descriptions on reporting-status and goals pages #1032
* Fix bottom margin on frontpage goal tiles #1009
* Support for goal content #1005
* Tab focus design fixes #990
* Disaggregation status tab #970
* Different canvas fallback for mobile/desktop. #968
* Remove aria-label from table headers #967
* Move fieldset/legend to different spot in markup #966
* Keep swatch colors in Edge/IE + high-contrast mode #957
* Remove rowspan and colspan from table headers #954
* Fix the mobile navigation tab order #952
* Better support for third-party and remote javascript files. #951
* Map color contrast fixes #946
* Map search accessibility #945
* Map fullscreen accessibility #944, #958
* Map slider accessibility #941
* More descriptive disaggregation button label/hierarchy for screenreaders #935
* Use aria-hidden when hiding sidebar #934
* aria-describedby for no-data-hint #933
* Remove role from datatable #927
* Make map unfocusable and remove loading image #926
* Consider hierarchy when sorting fields #920
* Add background colour to goal icons #919
* Allow disabling of news category links #917
* Remove legend clickability #914
* Support for Chart.js annotations #912
* Backwards-compatible array-style for search_index_boost #907
* Add site title to page title #906
* Full indicator name in the page title and h1 #905
* Accessible charts #904, #963
* Use text-colour for table caption #903
* Alert role and screenreader-only warning label for too-many-datasets #902
* Search results link fixes #901
* Chart/table accessibility #894
* Translate page titles and content #891
* Use aside instead of div for news sidebar #890
* Search button outside of label #886
* Revamp of chart/table/map footers #885, #948
* Use text color for disclaimer text #883
* Add aria-label to contrast toggle #882
* Accessibility fixes for sorting tables #880
* Accessibility improvements for chart legends #878
* Remove alert role from disclaimer #877
* Default mouse cursor on disabled elements #876
* Announce changes to the chart/table #875, #916
* Use buttons for the mobile menu/search drop-downs #874
* aria-described-by for indicator disaggregation variable hint #873
* H4 instead of H3 for chart title #872
* More efficient unique function for better support of large datasets #871
* Use darker text color and default to white text in high-contrast #865
* More obvious focus colors #864
* Fieldsets around radios and checkboxes #863
* Better keyboard accessibility for tabbed content #862, #884, #925, #953, #965
* Add an anchor for any back-to-top links #836
* H1 in news and post layouts #835
* Page titles #834
* Allow translated href in footer menu links #825
* More space beneath reporting status goal items #824
* Only link indicator name in goal-by-target #823
* Button revamp #822
* New breadcrumb configuration and separator #821
* Add vertical hover lines to line charts #816
* Refactor metadata tabs to support array structure #812
* Support markdown in the description property of some config settings #811
* Custom source-file downloads #809
* Pad the search bar to avoid hiding terms #807
* Skip map layers that do not have data #806
* Line height fix for Firefox search icon #797
* Simplify goals layout and allow configurable intro #793
* Display a no-data message when chart has no data #786
* Optional setting for language toggle as links #784
* Configurable reporting status title and description #778
* Vertical goal-by-target layout #776, #838
* More usage of variables with status colors and borders #773
* Syntax fix - map tooltips #768
* Support translations in the reporting status extra fields #767
* Fix styling of mobile menu items #765
* Hide map selection legend on mobile #764
* Update tooltips of active selections when the year changes #763
* Translate mobile search buttons #762
* Correct selector to avoid infinite loop #761
* Sort the disaggregations that display in table headers #760
* Visited color for download buttons #759
* Alt tag for loading image #758
* Javascript fixes for IE support #757

The release involved significant changes, in part to resolve serious accessibility issues. Extensive testing has helped us avoid breaking changes, except in regards to chart/table footer fields:

* _includes/components/charts/chart.html
* _includes/components/indicator/table.html

If you have overridden either to these two files, your chart/table "footer fields" may not display properly. More information on the necessary updates is on the [1.2.0 upgrade instructions](upgrades/upgrading-1-2-0.md).

Most files in the _includes and _layouts folders underwent some change in this release. If you are overriding any of those files, your implementation might not benefit from the various enhancements/fixes in the release.

For details on upgrading from 1.0.0 or higher to 1.2.0, see the [1.2.0 upgrade instructions](upgrades/upgrading-1-2-0.md).

## 1.1.0

* Embed using either Pym parent or iframe (#751)
* Use increased font size (#750)
* Link to new site in footer (#746)
* Default to country name for headline label on charts/tables (#744)
* Join data points when data is missing (#742)
* Javascript fixes for IE support (#757)
* Alt tag for loading image (#758)
* Visited color for download buttons (#759)
* Sort the disaggregations that display in table headers (#760)
* Correct selector to avoid infinite loop (#761)
* Translate mobile search buttons (#762)
* Update tooltips of active selections when the year changes (#763, #768)
* Hide map selection legend on mobile (#764)
* Fix styling of mobile menu items (#765)
* Support translations in the reporting status extra fields (#767)
* Syntax fix - map tooltips (#768)
* Backwards compatibility for code mobile search button text (#771)
* Alternate frontpage layout (#772)
* More usage of variables with status colors and borders (#773)
* Vertical goal-by-target layout (#776)
* Configurable reporting status title and description (#778)

The release contains no breaking changes. However, if you are overriding any of the following files, your implementation might not benefit from the various enhancements/fixes in the release:

* _includes/assets/js/indicatorView.js
* _includes/assets/js/menu.js
* _includes/assets/js/model/chartHelpers.js
* _includes/assets/js/plugins/jquery.sdgMap.js
* _includes/components/indicator/data-panes.html
* _includes/components/indicator/data-tabs.html
* _includes/components/indicator/embedded-feature.html
* _includes/components/indicator/indicator-main.html
* _includes/footer.html
* _includes/polyfills.html
* _includes/scripts.html
* _layouts/frontpage.html
* _layouts/goal-by-target.html
* _layouts/goal.html
* _layouts/reportingstatus.html

## 1.0.0

* More consistent template variables without globals (#394)
* Auto fit search bar around placeholder text (#407)
* Add link to Open SDG to footer (#411)
* Configurable footer menu links (#414)
* Escape variables in alt attributes (#415)
* Use indicator_available instead of graph_title for the indicator page H2 (#422)
* Reporting status for any metadata field (#424)
* Switch to Lunr for search functionality (#427)
* Metadata field translation keys (#428)
* Show post excerpts on news page (#431)
* Refactoring of Sass style sheets (#439)
* Ensure that indicator data always has a value (#441)
* Set background to white for pages and footer (#448)
* General javascript cleanup (#451)
* Add box shadows to goal tiles (#452)
* Underline menu items when hovered (#454)
* Move search box above the top navigation (#455)
* Keep searchbox the same size when in focus (#456)
* Multilingual news/posts (#457)
* Make bars striped after unique colors are exhausted (#459)
* Remove uppercase styling for top menu (#461)
* Make serve command for easier local development (#464)
* Adjust homepage whitespace (#465, #473)
* Redesign indicator page tabs (#466, #472, #479)
* Change the styling of the top banner on goal and indicator pages (#474)
* Update the chart download button when data changes (#476)
* Fixed rounding on reporting status page progress bar (#485)
* Add an introduction banner to the frontpage (#486, #545, #565)
* Set aria-label on search button (#487)
* Bulk download link beneath the homepage grid (#489)
* Black text for tab links (#490)
* Set aria-disabled on 'Clear selections' button (#491)
* Chart refactor for limits and stacked bars (#497)
* Fit total number of indicators on one line (#502)
* Also have overall total in box (#505)
* Remove goal line from indicator banner (#506)
* Remove unused images (#509)
* Change the styling of the search input field (#515)
* Fix for the edge case of local data with untranslated builds (#522)
* Update styling of reporting status progress bars (#533, #613)
* Chart title per unit of measurement (#538)
* Upgrade to jQuery 3.4.1 (#547)
* Allow the use of user-defined colors in charts (#553)
* Increase the font size of the header navigation menu (#572)
* Search page design improvements (#586)
* Remove hover styling from metadata fields (#587)
* Align more elements flush to the left (#588)
* Change reporting status progress bar colors to be less dominating (#589)
* High-contrast fixes for chart grids/ticks (#593)
* Indicator cards styling updates (#594)
* Only show disaggregations that have data in drop-downs (#600)
* Move units above subcategories (#603)
* Hide the sub-categories when there are no disaggregations (#604)
* Automatic site builds whenever the data changes (#605)
* Disclaimer configuration and redesign (#620)
* High-contrast support for y-axis scale label (#621)
* Goal page styling updates (#622)
* Fix navigation hover issue (#626)
* Indicator page refactor with more components (#646)
* indicatorModel.js refactor (#652)
* Move indicator available above indicator content (#654)
* Heading styling / font change (#659)
* Move colored bar to top of page (#661)
* More whitespace around search bar/logo (#667)
* Support transparent high-contrast goal images (#671)
* Allow easier customisation of colors through Sass variables(#700, #715, #723)
* Bugfix for search "boost" functionality (#717)
* Add Github issue templates (#718)
* Sitewide link styling (#705)

Breaking changes:

This is a major version upgrade and contains some breaking changes. Full technical details are available in [1.0.0 upgrade instructions](upgrades/upgrading-1-0-0.md). But here is a brief summary of the breaking changes:

* This upgrade should be accompanied by an upgrade to:
    * jekyll-open-sdg-plugins 1.0.0
    * sdg-build 1.0.0
    * sdg-translations 1.0.0
* Some global Liquid variables have changed. For example:
    * `t` has changed to `page.t`
    * `meta` has changed to `page.indicator`
    * `current_language` has changed to `page.language`
    * Details on Liquid variables can be found in [the Jekyll customisation docs](jekyll-templates.md).
* The following include files have been removed:
    * indicator-variables.html
    * goal-variables.html
    * multilingual.html
* The following includes files have been moved:
    * data-notice.html
    * fields-template.html
    * indicator-content.html
    * metadata.html
    * sources.html
    * units-template.html
* All include files and layout files in the platform have been updated.
* The `get_indicator_name` filter is no longer supported. Use `sdg_lookup` and hash objects instead. Eg:

        {% assign indicatorId = '1.1.1' %}
        {% assign myIndicator = indicatorId | sdg_lookup %}

        <p>The name of my indicator is: {{ myIndicator.name }}</p>
        <p>My indicator is in goal {{ myIndicator.goal_number }}.</p>

        {% assign myGoal = myIndicator.goal_number | sdg_lookup %}

        <p>The name of my goal is {{ myGoal.name }}.</p>

    For more details see [the Jekyll customisation docs](jekyll-templates.md).

* The `remotedatabaseurl` setting is no longer supported. Use `remote_data_prefix` instead.
* The `custom_css` configuration option is deprecated. Override [the `_sass/custom.scss` file](https://github.com/open-sdg/open-sdg/blob/master/_sass/custom.scss) instead.
* The H2 on indicator pages is now controlled by the `indicator_available` metadata field, rather than `graph_title`.
* The expected structure of the `data_start_values` metadata field has changed to be a list of objects, rather than a list of strings. See an [example of using data_start_values](indicator-configuration.md#data_start_values).

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

* An new required feature was added in [jekyll-open-sdg-plugins](https://github.com/open-sdg/jekyll-open-sdg-plugins). Make sure your Gemfile is referencing version 0.0.10 of jekyll-open-sdg-plugins, as shown [here](https://github.com/open-sdg/open-sdg-site-starter/blob/develop/Gemfile#L7).
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

* An upstream bug was fixed in [jekyll-open-sdg-plugins](https://github.com/open-sdg/jekyll-open-sdg-plugins). Make sure your Gemfile is referencing version 0.0.6 of jekyll-open-sdg-plugins, as shown [here](https://github.com/open-sdg/open-sdg-site-starter/blob/develop/Gemfile#L7).
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
