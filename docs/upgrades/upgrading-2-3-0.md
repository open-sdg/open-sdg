<h1>Upgrading to 2.3.0</h1>

This document is intended for developers, to help with the process of upgrading to version 2.3.0 of Open SDG, from 2.2.0 or higher.

## Upgrade data repository to sdg-build 2.3.0-beta1

In your data repository, update your `requirements.txt` file to:

```
git+https://github.com/open-sdg/sdg-build@2.3.0-beta1
```

## Upgrade translations to sdg-translations 2.3.0-beta1

In your data repository's config file, update the version of sdg-translations in the "translations" section:

```
translations:
  - class: TranslationInputSdgTranslations
    source: https://github.com/open-sdg/sdg-translations.git
    tag: 2.3.0-beta1
```

## Update version of Open SDG to 2.3.0-beta2

In your site repository's `_config.yml` file, update the version of Open SDG in `remote_theme`, like so:

```
remote_theme: open-sdg/open-sdg@2.3.0-beta2
```

## Update version of jekyll-open-sdg-plugins to 2.3.0-beta1

In your site repository's `Gemfile`, update the version of jekyll-open-sdg-plugins like so:

```
gem "jekyll-open-sdg-plugins", "2.3.0.pre.beta1"
```

## Updating overridden files

If you are overriding certain files, you may need to adjust your version in order to benefit from the latest features, bugfixes, and design changes. If you are unsure, check the `_includes` and `_layouts` folders in your site repository. If they contain any of the following files, you may want to incorporate the latest changes into your overrides. The links below will show you the latest changes for each file.

* [_includes/assets/js/chartjs/accessibleCharts.js](https://github.com/open-sdg/open-sdg/compare/2.2.0-dev...2.3.0-dev#diff-2947e02401f2edf7c289455a2552f5132ddcbf5733b817062d363fdb89f89227)
* [_includes/assets/js/indicatorModel.js](https://github.com/open-sdg/open-sdg/compare/2.2.0-dev...2.3.0-dev#diff-899e3bbfb5eeef11ac59cd311c1cf8fa874cb773986b5982832f44ff68f04a8d)
* [_includes/assets/js/indicatorView.js](https://github.com/open-sdg/open-sdg/compare/2.2.0-dev...2.3.0-dev#diff-acba7023c8817a67d9425348551a51700b2bdb142fad73af0bfb272bbdd08a01)
* [_includes/assets/js/mapView.js](https://github.com/open-sdg/open-sdg/compare/2.2.0-dev...2.3.0-dev#diff-4fc5a820f12b634018e2047fcc6eb1d47d5d8c8a8bb7b0f1d2c6a16ebae5a3af)
* [_includes/assets/js/model/chartHelpers.js](https://github.com/open-sdg/open-sdg/compare/2.2.0-dev...2.3.0-dev#diff-efcb68695340818df40f42360a77641dfd5ecfe528f1ff96c41858a2b582d1f5)
* [_includes/assets/js/model/dataHelpers.js](https://github.com/open-sdg/open-sdg/compare/2.2.0-dev...2.3.0-dev#diff-40499d815f640efd89f9d2f3d1a27d4bef263c2f9d54e5116ca880d0da808e6a)
* [_includes/assets/js/model/fieldHelpers.js](https://github.com/open-sdg/open-sdg/compare/2.2.0-dev...2.3.0-dev#diff-c2cd7b81fba018af4d2c5132c4a7cfe8e52512c318b7fef50fa840620360493d)
* [_includes/assets/js/model/helpers.js](https://github.com/open-sdg/open-sdg/compare/2.2.0-dev...2.3.0-dev#diff-9a6c27b8f0d44020c094c3df7498dab23a2563875d29b3f1aaaafb92548915b9)
* [_includes/assets/js/model/tableHelpers.js](https://github.com/open-sdg/open-sdg/compare/2.2.0-dev...2.3.0-dev#diff-16d965080d108134840aa1d4c2aac8931fd27b446cdfacb23cccdc0f29d6e5b9)
* [_includes/assets/js/model/utils.js](https://github.com/open-sdg/open-sdg/compare/2.2.0-dev...2.3.0-dev#diff-1006382140504820335d896018f410459fb716b5816d0bd998b4ca2348f10870)
* [_includes/assets/js/plugins/jquery.sdgMap.js](https://github.com/open-sdg/open-sdg/compare/2.2.0-dev...2.3.0-dev#diff-090de3bceb9b3c5022e042a3d45e82f32e68f7e0c63ca881da87eb4bfec071a3)
* [_includes/assets/js/plugins/leaflet.disaggregationControls.js](https://github.com/open-sdg/open-sdg/compare/2.2.0-dev...2.3.0-dev#diff-9204baadb9a4b331bcb7bd572063083f64b02abcc94dd9b7c5a6608a738f27a2)
* [_includes/assets/js/view/chartHelpers.js](https://github.com/open-sdg/open-sdg/compare/2.2.0-dev...2.3.0-dev#diff-57ca50c7583a665d330ac4d254cffa269768af5b0a14612501fa2c1bae4ddcd2)
* [_includes/assets/js/view/chartTypeBase.js](https://github.com/open-sdg/open-sdg/compare/2.2.0-dev...2.3.0-dev#diff-e3635ad86f7d677a190cb5cedee17194dd3c3602e9cace3f6df122997575dda4)
* [_includes/assets/js/view/dataHelpers.js](https://github.com/open-sdg/open-sdg/compare/2.2.0-dev...2.3.0-dev#diff-9f387ea8e9baf11ade17fb7ac6121eb36698c6bc77cb2832dd696085867eb9be)
* [_includes/assets/js/view/fieldHelpers.js](https://github.com/open-sdg/open-sdg/compare/2.2.0-dev...2.3.0-dev#diff-2ac4edb39262733266f76cd08c0b1151be0bfbea75e21c3beb99bec3adde6d87)
* [_includes/assets/js/view/helpers.js](https://github.com/open-sdg/open-sdg/compare/2.2.0-dev...2.3.0-dev#diff-a72fa66c288892e54b7da213ab409c0548ec0a9ec112e58dc988c67b47fe54c4)
* [_includes/assets/js/view/tableHelpers.js](https://github.com/open-sdg/open-sdg/compare/2.2.0-dev...2.3.0-dev#diff-1be01a56e52c4500f5559b96bffdd01cdb98ee8945683b845115a419caede5dc)
* [_includes/components/charts/annotation_presets.js](https://github.com/open-sdg/open-sdg/compare/2.2.0-dev...2.3.0-dev#diff-59ea8773c497c256bd2c2ea8bc572efb602734c1f18570daff4b232b8cfb3b4a)
* [_includes/components/contrast-toggle.html](https://github.com/open-sdg/open-sdg/compare/2.2.0-dev...2.3.0-dev#diff-453e2dd945df5eecc80b03b3fe4e2e6a41716156989ffd2bb8e31c5b4614677e)
* [_includes/components/download-all-data.html](https://github.com/open-sdg/open-sdg/compare/2.2.0-dev...2.3.0-dev#diff-4f295183567e9e81c009bb8c7f9fdfd558818c87cb900241e873545a25e330ff)
* [_includes/components/indicator/data-footer.html](https://github.com/open-sdg/open-sdg/compare/2.2.0-dev...2.3.0-dev#diff-3d79010b11e5d6fb864201aaad7425f44d009efec9329ed97dd37b75a2d4de2a)
* [_includes/components/indicator/headline.html](https://github.com/open-sdg/open-sdg/compare/2.2.0-dev...2.3.0-dev#diff-a388939c2fb8239009ad8d67432a8543574b4d9f8281c3f1710abe9c9dd11a03)
* [_includes/components/indicator/indicator-main.html](https://github.com/open-sdg/open-sdg/compare/2.2.0-dev...2.3.0-dev#diff-0fe5236d3abca07c9e56d3e8503826f1c9f1564e81c7a160ab15894c6cde0bbc)
* [_includes/components/indicator/metadata-panes.html](https://github.com/open-sdg/open-sdg/compare/2.2.0-dev...2.3.0-dev#diff-2fbe43c361b480b71a69db9b4dc9fca7bc1ffc401638db6ae7d2c979f56dda3c)
* [_includes/components/indicator/metadata-tabs.html](https://github.com/open-sdg/open-sdg/compare/2.2.0-dev...2.3.0-dev#diff-c37a2843627eba2fd96febcd0695eed4804c80180bed8246fcb9d5d59c5b1ad7)
* [_includes/components/indicator/sources-alt.html](https://github.com/open-sdg/open-sdg/compare/2.2.0-dev...2.3.0-dev#diff-93f1ddc798200891356dccfaa92f0879a1a7fcf599d3b43ea01e2555a944e35d)
* [_includes/components/indicator/sources.html](https://github.com/open-sdg/open-sdg/compare/2.2.0-dev...2.3.0-dev#diff-865a7db661a4362ab05dcfbc5563e2f20a10847734838ee7ef9c2d142634b695)
* [_includes/components/reportingstatus/reporting-status-by-field.html](https://github.com/open-sdg/open-sdg/compare/2.2.0-dev...2.3.0-dev#diff-9d06eaea52439196ca0af1f06bb6eb6eb8c74858d3a88227c9d4c9ccc614e396)
* [_includes/components/reportingstatus/reporting-status-by-goal.html](https://github.com/open-sdg/open-sdg/compare/2.2.0-dev...2.3.0-dev#diff-b16d540c8f7a1606591d39a587008fa8dbe96036a4a5a70d79df96d8ff57ea2d)
* [_includes/components/reportingstatus/reporting-status-overall.html](https://github.com/open-sdg/open-sdg/compare/2.2.0-dev...2.3.0-dev#diff-73139ac1d3d1df23afd409fa229236a2352f290528b506bc4fe9a8a1ab232245)
* [_includes/head.html](https://github.com/open-sdg/open-sdg/compare/2.2.0-dev...2.3.0-dev#diff-e241bda4e3c3c6dc1c0b00185b61f6ce19b5eb16e294dd955ca9fa6d01befb0e)
* [_includes/scripts.html](https://github.com/open-sdg/open-sdg/compare/2.2.0-dev...2.3.0-dev#diff-d2aabec5480c331c0119175a7e808edf76bfb7e63bf903691b6c5f4f84eb4476)
* [_layouts/reportingstatus.html](https://github.com/open-sdg/open-sdg/compare/2.2.0-dev...2.3.0-dev#diff-f3789d9a98b0217b53eb383897faf37ac74aedbcc63a078300947d8d65a192cd)
* [_layouts/search.html](https://github.com/open-sdg/open-sdg/compare/2.2.0-dev...2.3.0-dev#diff-f12837113109f2f0551117731fc0167534e09edbd8f768026accc824984c3597)

Note that we strive to avoid any breaking changes, so this process of updating overridden files is optional. However we strongly recommend keeping your overridden files as current as possible.

## New features

This release introduces some optional features that you may be interested in adding to your platform.

### Indicator iframes

This feature allows you to create iframe-friendly versions of each indicator. An iframe is an HTML element that loads another HTML page within the same page. It essentially puts another webpage within the parent page.

The URLs of the iframe-friendly versions will be the same link but with "-iframe" at the end e.g. "/1-1-1" & "/1-1-1-iframe". An example of how to embed this into a new page is shown below:

```
---
title: My page
permalink: /my-page/
layout: page
---
Indicator 1.1.1 should be embedded below:

<script type="text/javascript" src="https://pym.nprapps.org/pym.v1.min.js"></script>
<div id="my-iframe-container"></div>
<script>
    var pymParent = new pym.Parent('my-iframe-container', '{{ site.baseurl }}/1-1-1-iframe', {});
</script>
```
It is also possible to do an iframe directly, however you would lose out on the benefit of the Pym.js library, which is supposed to prevent vertical scrollbars. If you wanted to do this, it would be something like this:

```
---
title: My page
permalink: /my-page/
layout: page
---
Indicator 1.1.1 should be embedded below:

<iframe src="{{ site.baseurl }}/1-1-1-iframe"></iframe>
```

### observation_attributes 

Open SDG now has the functionality to display observation attributes for indicator data in charts, tables and maps. This setting controls the data columns that should be considered "observation attributes", as well as the labels that should be used for these columns when displaying their values in the footer beneath charts and tables. 

There are two steps to displaying observation attributes in your data:  

1. Add the relevant information into your data - this is achieved by adding a COMMENT_OBS column to the indicator data file which is filled in with wording (e.g. Estimated value, Forecast value etc.) for those lines of data that are observation attributes. 

1. Include the observation_attribute setting in your site configuration - add the following lines to the site_config.yml in the site repository: 

```
observation_attributes: 
  - field: COMMENT_OBS 
    label: '' 
```

The default is to display ‘note 1(2,3 etc.)’ after each data point in the tooltips of the chart, table and graph, that is an observation attribute. The number of the note corresponds to a type of observation attribute entered into the COMMENT_OBS column as outlined below: 

```
[note 1] Estimated value 
[note 2] Forecast value 
[note 3] Unvalidated value 
[note 4] Low reliability 
[note 5] Experimental value 
[note 6] Imputed value  
```

You can change the label in the setting to say something other than the default ‘note’ as desired too. 


### Reporting status page - Option to remove "out of scope" disaggregations

Open SDG users will now have the option to show or remove the "Out of Scope" tag on their Reporting Status page in the Disaggregation status. This can now be used to only show indicators where a disaggregation is explicitly mentioned in the indicator title. This will hide the out of scope indicators from the bar on the screen. This should hopefully better represent how many indicators are disaggregated.

To omit "out of scope" from the disaggregation status page, in the data config file, set `ignore_out_of_scope_disaggregation_stats` to true.

```
ignore_out_of_scope_disaggregation_stats: true
```

To change the label of the totals in the disaggregation status page, in the site configuration file (eg, _data/site_config.yml), in the `reporting_status` section add a `disaggregation_indicator_count_label` to the reporting_status section. The default is "indicators", so for example you might want to use "indicators in scope".

```
reporting_status:
    disaggregation_indicator_count_label: indicators in scope
```

### use_new_config_forms

New and improved site configuration forms have been developed to make changes to your site as user friendly as possible. The original forms are still available if you do not change the setting as indicated below and you still access the forms in the same way. 

As usual, there are two ways of updating to your `site_config.yml` file in order to make configuration changes to your site:  

* You can edit the `_data/site_config.yml` file directly, or  
* You can use the site configuration forms via your staging site. 

You can use either method at any time for any change.    

To turn on the new site configuration forms: 

1. Go to the `site_config.yml` file in the `_data` folder in your site repository. 
2. Include this line: 

``` 
use_new_config_forms: true 
```

You can then access the site configuration forms by going to your staging site and in the footer menu at the bottom of any page, click "Configuration". 

From here you can navigate around the forms depending on what setting you would like to change. Every setting has its own section which may consist of checkboxes, text boxes, drop-downs, toggles and list items. You can interact with each of them to update any settings from the default. There is more information provided to give context and guidance for each setting which can be accessed by clicking on the drop-down at the bottom of each setting. 

See the [site configuration forms guidance page](https://open-sdg.readthedocs.io/en/latest/site-configuration-forms/) for more information. 

### Ruby 3

The Open SDG platform now supports Ruby 3, and if you would like to upgrade here are the instructions. Note that this is not required, but if you would like to be on the latest version then it is now possible. To upgrade to Ruby 3, you will need to make changes in your site repository:

* Changes to your "Gemfile"
* Changes to the "workflows" in the .github folder

Here is an illustration of the specific changes needed: https://github.com/open-sdg/open-sdg-site-starter/pull/98/files

## Bug-fixes and improvements

* Fixed an issue where maps were not displaying for some indicators
* Fixed an issue where some series were not appearing
* Country name now translated in table header
* Header columns now pinned in tables
* Added units and series columns to data download files
* Improvements to checkbox selection on indicator pages
* data_start_values on maps: geographical fields now ignored
* Graph annotation label position functionality improved
* Improvements to screenreader and voice control functionality
* Allowed DataSchemaInputSdmxDsd as a data schema
