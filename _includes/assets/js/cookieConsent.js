{% if site.cookie_consent_form.enabled %}
// Add the cookie settings link in the footer.
$(document).ready(function() {
if (klaroConfig && klaroConfig.noAutoLoad !== true) {
  var cookieLink = $('<li class="cookie-settings"><a>' + translations.cookies.cookie_settings + '</a></li>');
  $(cookieLink).click(function() {
      klaro.show();
  });
  $('#footerLinks ul').append(cookieLink);
}
});
{% endif %}
