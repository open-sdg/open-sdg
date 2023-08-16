<h1>Analytics</h1>

Out of the box, Open SDG sends information to Google Analytics for certain events:

* All page loads
* User changes data tabs (Table, Chart, etc.)
* User changes metadata tabs (National, Global, etc.)
* User changes the contrast setting
* User downloads a CSV file

## Google Analytics ID

In order to turn on the analytics functionality, you must set the [Google Analytics ID](https://support.google.com/analytics/answer/1008080?hl=en) in the site repository's production Open SDG configuration file. This is typically the `_data/site_config_prod.yml` file.

There are several ways to specify this configuration, but here is an example:

```
analytics:
  gtag: 'Paste ID Here'
```

For more details, see the documentation on this [analytics site configuration setting](configuration.md#analytics).

It is recommend to only put this in `_data/site_config_prod.yml`, and not in `_data/site_config.yml`, because you would not want to confuse your metrics by mixing staging and production together.

## Customising the Google Analytics parameters

If you would like to change the Google Analytics parameters (category/action/label) that Open SDG sends, you can create a data file at this path in your site repository: `data/autotrack.yml`

The contents of this YAML file can override any tracked event, according to their "preset" value. For example:

```
my_preset:
  category: My category
  action: My action
  label: My label
```

## Tracking new click events

You can track a new click event using either HTML or Javascript.

### Tracking a click event with HTML

Here is an example of tracking a new click event using HTML, in a Jekyll page or layout:

```
Below is a call-to-action that we would like to track.

<a href="/my-url" {% include autotrack.html preset="my_preset" category="My category" action="My action" %}>
  My link
</a>

```

### Tracking a click event with Javascript

Here is an example of tracking a new click event using Javascript:

```
<a href="/my-url" id="my-link">My link</a>

<script>
var attributes = opensdg.autotrack('my_preset', 'My category', 'My action');
$('#my-link').attr(attributes);
</script>
```
