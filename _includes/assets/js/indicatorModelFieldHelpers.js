/**
 * Model helper functions related to fields and data.
 */

function nonFieldColumns() {
    // These are the data columns that have a special purpose. All other
    // columns can be considered "field columns".
    return [
      YEAR_COLUMN,
      VALUE_COLUMN,
      UNIT_COLUMN,
      GEOCODE_COLUMN,
      'Observation status',
      'Unit multiplier',
      'Unit measure',
    ];
  }

function getFieldColumnsFromArray(arr) {
  var omitColumns = nonFieldColumns();
  return arr.filter(function(col) { return !omitColumns.includes(col); });
}

function getColumnsFromData(data) {
  return Object.keys(data[0]);
}

function getFieldColumnsFromData(data) {
  return getFieldColumnsFromArray(getColumnsFromData(data));
}

function dataHasColumn(column, data) {
  return getColumnsFromData(data).includes(column);
}

function fieldIsUsedInDataWithUnit(field, unit, data) {
  return data.some(function(row) {
    return row[field] && row[UNIT_COLUMN] === unit;
  }, this);
}

function sortFieldItemStates(fieldItemStates, edges) {
  if (edges.length > 0) {
    var orderedEdges = _.chain(edges)
      .groupBy('From')
      .map(function(value, key) { return [key].concat(_.pluck(value, 'To')); })
      .flatten()
      .value();

    var customOrder = orderedEdges.concat(_.difference(_.pluck(fieldItemStates, 'field'), orderedEdges));

    // now order the fields:
    return _.sortBy(fieldItemStates, function(item) {
      return customOrder.indexOf(item.field);
    });
  }
  return fieldItemStates;
}

function getChildFieldNames(edges) {
  return edges.map(function(edge) { return edge.To; });
}

function getParentFieldNames(edges) {
  return edges.map(function(edge) { return edge.From; });
}

function getChildFieldNamesByParent(edges, parent) {
  var children = edges.filter(function(edge) {
    return edge.From === parent;
  });
  return getChildFieldNames(children);
}

function fieldItemStatesForUnit(fieldItemStates, fieldsByUnit, selectedUnit) {
  return fieldItemStates.filter(function(fis) {
    var fieldsBySelectedUnit = fieldsByUnit.filter(function(fieldByUnit) {
      return fieldByUnit.unit === selectedUnit;
    })[0];
    return fieldsBySelectedUnit.fields.includes(fis.field);
  });
}
