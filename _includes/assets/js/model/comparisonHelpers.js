/**
 * Model helper functions related to national/global comparison.
 */

/**
 * Check whether raw JSON data are suitable for national/global comparison.
 *
 * @param {Object} data Object imported from JSON file
 * @return {Boolean} Whether or not the data are valid for comparison
 */
function areDataValidForComparison(data) {
    if (!opensdg.doGlobalComparison) {
        return false;
    }
    var reportingTypeData = data[opensdg.reportingTypeColumn];
    if (typeof reportingTypeData === 'undefined') {
        return false;
    }
    if (!(reportingTypeData.includes(opensdg.reportingTypeGlobal))) {
        return false;
    }
    if (!(reportingTypeData.includes(opensdg.reportingTypeNational))) {
        return false;
    }
    return true;
}

/**
 * Remove all of the global data from the input data set and then
 * remove the reporting type column altogether.
 *
 * @param {Array} rows 
 * @return {Array} The rows no global data and no reporting type column.
 */
function removeGlobalData(rows) {
    return rows.filter(function(row) {
        if (typeof row[opensdg.reportingTypeColumn] === 'undefined') {
            return true;
        }
        if (row[opensdg.reportingTypeColumn] === opensdg.reportingTypeGlobal) {
            return false;
        }
        return true;
    }).map(function(row) {
        if (typeof row[opensdg.reportingTypeColumn] != 'undefined') {
            delete row[opensdg.reportingTypeColumn];
        }
        return row;
    });
}

function removeReportingTypeEdge(edgesData) {
    return edgesData.filter(function(edge) {
        return edge.From != opensdg.reportingTypeColumn;
    });
}