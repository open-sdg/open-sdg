/**
 * @param {null|undefined|Float|String} value
 * @param {Object} info
 * @param {Object} context
 * @return {null|undefined|Float|String}
 */
function alterDataDisplay(value, info, context) {
    // If value is empty, we will not alter it.
    if (value == null || value == undefined) {
        return value;
    }
    // Before passing to user-defined dataDisplayAlterations, let's
    // do our best to ensure that it starts out as a number.
    var altered = value;
    if (typeof altered !== 'number') {
        altered = Number(value);
    }
    // If that gave us a non-number, return original.
    if (isNaN(altered)) {
        return value;
    }
    // Now go ahead with user-defined alterations.
    opensdg.dataDisplayAlterations.forEach(function (callback) {
        altered = callback(altered, info, context);
    });
    // If the returned value is not a number, use the legacy logic for
    // precision and decimal separator.
    if (typeof altered !== 'number') {
        // Now apply our custom precision control if needed.
        if (VIEW._precision || VIEW._precision === 0) {
            altered = Number.parseFloat(altered).toFixed(VIEW._precision);
        }
        // Now apply our custom decimal separator if needed.
        if (OPTIONS.decimalSeparator) {
            altered = altered.toString().replace('.', OPTIONS.decimalSeparator);
        }
    }
    // Otherwise if we have a number, use toLocaleString instead.
    else {
        var localeOpts = {};
        if (VIEW._precision || VIEW._precision === 0) {
            localeOpts.minimumFractionDigits = VIEW._precision;
            localeOpts.maximumFractionDigits = VIEW._precision;
        }
        altered = altered.toLocaleString(opensdg.language, localeOpts);
    }
    return altered;
}
