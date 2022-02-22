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
