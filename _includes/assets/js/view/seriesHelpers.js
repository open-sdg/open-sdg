/**
 * @param {Object} args
 * @return null
 */
function initialiseSerieses(args) {
    var templateElement = $('#series_template');
    if (templateElement.length > 0) {
        var template = _.template(templateElement.html()),
            serieses = args.serieses || [],
            selectedSeries = args.selectedSeries || null;

        $('#serieses').html(template({
            serieses: serieses,
            selectedSeries: selectedSeries
        }));

        var noSerieses = (serieses.length < 1);
        if (HIDE_SINGLE_SERIES) {
            noSerieses = (serieses.length < 2);
        }

        if (noSerieses) {
            $(OPTIONS.rootElement).addClass('no-serieses');
        }
        else {
            $(OPTIONS.rootElement).removeClass('no-serieses');
        }
    }
}
