---
# Don't delete this line.
---
{%- include assets/js/serviceWorkerInit.js -%}
{%- include assets/js/autotrack-element.js -%}
{%- include assets/js/plugins/jquery.sdgMap.js -%}
{%- include assets/js/chartjs/rescaler.js -%}
{%- include assets/js/chartjs/noDataMessage.js -%}
{% if site.accessible_charts %}
{% if site.chartjs_3 %}
{%- include assets/js/chartjs/accessibleCharts-chartjs3.js -%}
{% else %}
{%- include assets/js/chartjs/accessibleCharts.js -%}
{% endif %}
{% endif %}
{%- include assets/js/event.js -%}
{%- if site.bootstrap_5 %}
{%- include assets/js/bootstrap5/accessibility.js -%}
{%- else -%}
{%- include assets/js/accessibility.js -%}
{%- endif -%}
{%- include assets/js/chartColors.js -%}
{%- include assets/js/indicatorModel.js -%}
{%- include assets/js/mapView.js -%}
{% if site.chartjs_3 %}
{%- include assets/js/indicatorView-chartjs3.js -%}
{% else %}
{%- include assets/js/indicatorView.js -%}
{% endif %}
{%- include assets/js/indicatorController.js -%}
{%- include assets/js/indicatorInit.js -%}
{%- include assets/js/tabs.js -%}
{% if site.accessible_tabs %}
{%- if site.bootstrap_5 -%}
{%- include assets/js/bootstrap5/accessibleTabs.js -%}
{%- else -%}
{%- include assets/js/accessibleTabs.js -%}
{%- endif -%}
{% endif %}
{%- include assets/js/search.js -%}
{%- if site.bootstrap_5 -%}
{%- include assets/js/bootstrap5/cookieConsent.js -%}
{%- else -%}
{%- include assets/js/menu.js -%}
{%- endif -%}
{%- include assets/js/lib/classList.js -%}
{%- include assets/js/lib/modernizr-custom.js -%}
{%- include assets/js/plugins/leaflet.selectionLegend.js -%}
{%- include assets/js/plugins/leaflet.yearSlider.js -%}
{%- include assets/js/plugins/leaflet.fullscreenAccessible.js -%}
{%- include assets/js/plugins/leaflet.searchAccessible.js -%}
{%- include assets/js/backToTop.js -%}
