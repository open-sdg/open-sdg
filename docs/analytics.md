<h1>Analytics</h1>

Out of the box, Open SDG sends information to Google Analytics for certain events:

* User changes data tabs (Table, Chart, etc.)
* User changes metadata tabs (National, Global, etc.)
* User changes the contrast setting
* User downloads a CSV file

## Customising the Google Analytics parameters

If you would like to change the Google Analytics parameters (category/action/label) that Open SDG sends, you can create a data file at this path in your site repository: `data/autotrack.yml`

The contents of this YAML file can override any tracked event, according to their "preset" value. For example:

```
preset_name:
  category: My category name
  action: My action name
  label: My label name
```
