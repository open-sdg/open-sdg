<h1>Cookies and privacy</h1>

## Cookies and privacy in Open SDG

Out of the box, Open SDG sets one cookie called "contrast" which is used to remember a user's choice of high-contrast mode.

If `analytics.ga_prod` has been set in the site configuration then the Google Analytics cookies will be present as well.

If `sharethis_property` has been set in the site configuration then the ShareThis cookies will be present as well.

Open SDG also uses a Google Webfont ("Open Sans"). Although this does not set a cookie, it does carry privacy concerns.

## Using a cookie consent form

To enable a cookie consent form, use the `cookie_consent_form.enabled` site configuration. This form uses the open-source cookie consent system [Klaro](https://heyklaro.com/docs/). If would like to customize the behavior of this system, or you have added custom third-party services, then you may need to override the `_includes/cookies-config.js` file. For detail on this file, see the [Klaro documentation](https://heyklaro.com/docs/integration/annotated-configuration).
