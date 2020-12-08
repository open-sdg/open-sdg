$(document).ready(function() {
    $('.nav-tabs').each(function() {
        var tabsList = $(this);

        // Allow clicking on the <li> to trigger tab click.
        tabsList.find('li').click(function(event) {
            $(event.target).find('> a').click();
            event.stopPropagation();
        });
    });
});
