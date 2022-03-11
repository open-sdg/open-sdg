$(document).ready(function() {
    $('a[href="#top"]').prepend('<i class="{% if site.bootstrap_5 %}bi bi-arrow-up{% else %}fa fa-arrow-up{% endif %}"></i>');
});
