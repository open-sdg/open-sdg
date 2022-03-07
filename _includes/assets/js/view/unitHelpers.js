/**
 * @param {Object} args
 * @return null
 */
function initialiseUnits(args) {
    var template = _.template($('#units_template').html()),
        units = args.units || [],
        selectedUnit = args.selectedUnit || null;

    $('#units').html(template({
        units: units,
        selectedUnit: selectedUnit
    }));

    var noUnits = (units.length < 1);
    if (HIDE_SINGLE_UNIT) {
        noUnits = (units.length < 2);
    }

    if (noUnits) {
        $(OPTIONS.rootElement).addClass('no-units');
    }
    else {
        $(OPTIONS.rootElement).removeClass('no-units');
    }
}

/**
 * @param {String} selectedUnit
 * @return null
 */
 function updateUnitElements(selectedUnit) {
    var hasUnit = typeof selectedUnit !== 'undefined';
    var fallback = MODEL.measurementUnit;
    if (hasUnit || fallback) {
        var unitToDisplay = selectedUnit || fallback;
        $('.data-controlled-footer-field.unit-from-data').show();
        $('dd.data-controlled-footer-field.unit-from-data').text(translations.t(unitToDisplay));
    }
    else {
        $('.data-controlled-footer-field.unit-from-data').hide();
    }
}
