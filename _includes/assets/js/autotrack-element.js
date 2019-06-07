/**
 * This function returns a javascript object containing autotrack.js properties.
 *
 * These properties can be added to an element with jQuery: $(element).attr(props)
 *
 * See _includes/autotrack.html for parameter descriptions.
 */
opensdg.autotrack = function(preset, category, action, label) {
  var presets = {};
  {%- if site.data.autotrack -%}
    presets = {{ site.data.autotrack | jsonify }};
  {%- endif -%}
  var params = {
    category: category,
    action: action,
    label: label
  };
  if (presets[preset]) {
    params = presets[preset];
  }
  var obj = {
    'data-on': 'click'
  };
  if (params.category) {
    obj['data-event-category'] = params.category;
  }
  if (params.action) {
    obj['data-event-action'] = params.action;
  }
  if (params.label) {
    obj['data-event-label'] = params.label;
  }

  return obj;
};
