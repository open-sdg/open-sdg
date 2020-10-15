---
# Don't delete this line.
---
{%- include assets/js/autotrack-element.js -%}
{%- include assets/js/plugins/jquery.sdgMap.js -%}
{%- include assets/js/chartjs/rescaler.js -%}
{%- include assets/js/chartjs/noDataMessage.js -%}
{% if site.accessible_charts %}
{%- include assets/js/chartjs/accessibleCharts.js -%}
{% endif %}
{%- include assets/js/event.js -%}
{%- include assets/js/accessibility.js -%}
{%- include assets/js/chartColors.js -%}
{%- include assets/js/indicatorModel.js -%}
{%- include assets/js/mapView.js -%}
{%- include assets/js/indicatorView.js -%}
{%- include assets/js/indicatorController.js -%}
{% if site.accessible_tabs %}
{%- include assets/js/tabs.js -%}
{% endif %}
{%- include assets/js/search.js -%}
{%- include assets/js/menu.js -%}
{%- include assets/js/lib/classList.js -%}
{%- include assets/js/lib/modernizr-custom.js -%}
{%- include assets/js/plugins/leaflet.selectionLegend.js -%}
{%- include assets/js/plugins/leaflet.yearSlider.js -%}
{%- include assets/js/plugins/leaflet.fullscreenAccessible.js -%}
{%- include assets/js/plugins/leaflet.searchAccessible.js -%}
{%- include assets/js/googleAnalytics.js -%}
