/**
 * @param {Object} args
 * @return null
 */
function initialiseSerieses(args) {
    var activeSeriesInput = $('#serieses').find(document.activeElement),
        seriesWasFocused = (activeSeriesInput.length > 0) ? true : false,
        focusedValue = (seriesWasFocused) ? $(activeSeriesInput).val() : null,
        templateElement = $('#series_template');
    if (templateElement.length > 0) {
        var template = _.template(templateElement.html()),
            serieses = args.serieses || [],
            selectedSeries = args.selectedSeries || null,
            proxySerieses = args.proxySerieses || [];
        $('#serieses').html(template({
            serieses: serieses,
            selectedSeries: selectedSeries,
            proxySerieses: proxySerieses,
            proxyPill: PROXY_PILL,
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
    // Return focus if necessary.
    if (seriesWasFocused) {
        $('#serieses :input[value="' + focusedValue + '"]').focus();
    }
}
