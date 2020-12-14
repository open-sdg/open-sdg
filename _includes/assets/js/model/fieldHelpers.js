/**
 * Model helper functions related to fields and data.
 */

/**
 * @param {Array} rows
 * @param {Array} edges
 * @return {Array} Field item states
 */
function getInitialFieldItemStates(rows, edges, columns) {
  var initial = getFieldColumnsFromData(columns).map(function(field) {
    return {
      field: field,
      hasData: true,
      values: getUniqueValuesByProperty(field, rows).map(function(value) {
        return {
          value: value,
          state: 'default',
          checked: false,
          hasData: true
        };
      }, this),
    };
  }, this);

  return sortFieldItemStates(initial, edges);
}

/**
 * @param {Array} fieldItemStates
 * @param {Array} edges
 * return {Array} Sorted field item states
 */
function sortFieldItemStates(fieldItemStates, edges) {
  if (edges.length > 0) {
    var froms = getUniqueValuesByProperty('From', edges);
    var tos = getUniqueValuesByProperty('To', edges);
    var orderedEdges = froms.concat(tos);
    var fieldsNotInEdges = fieldItemStates
      .map(function(fis) { return fis.field; })
      .filter(function(field) { return !orderedEdges.includes(field); });
    var customOrder = orderedEdges.concat(fieldsNotInEdges);

    return _.sortBy(fieldItemStates, function(item) {
      return customOrder.indexOf(item.field);
    });
  }
  return fieldItemStates;
}

/**
 * @param {Array} fieldItemStates
 * @param {Array} edges
 * @param {Array} selectedFields Field items
 * @param {Object} validParentsByChild Arrays of parents keyed to children
 * @return {Array} Field item states
 */
function getUpdatedFieldItemStates(fieldItemStates, edges, selectedFields, validParentsByChild) {
  var selectedFieldNames = getFieldNames(selectedFields);
  getParentFieldNames(edges).forEach(function(parentFieldName) {
    if (selectedFieldNames.includes(parentFieldName)) {
      var childFieldNames = getChildFieldNamesByParent(edges, parentFieldName);
      var selectedParent = selectedFields.find(function(selectedField) {
        return selectedField.field === parentFieldName;
      }, this);
      fieldItemStates.forEach(function(fieldItem) {
        if (childFieldNames.includes(fieldItem.field)) {
          var fieldHasData = false;
          fieldItem.values.forEach(function(childValue) {
            var valueHasData = false;
            selectedParent.values.forEach(function(parentValue) {
              if (validParentsByChild[fieldItem.field][childValue.value].includes(parentValue)) {
                valueHasData = true;
                fieldHasData = true;
              }
            }, this);
            childValue.hasData = valueHasData;
          }, this);
          fieldItem.hasData = fieldHasData;
        }
      }, this);
    }
  }, this);
  return fieldItemStates;
}

/**
 * @param {Array} fieldItems
 * @return {Array} Field names
 */
function getFieldNames(fieldItems) {
  return fieldItems.map(function(item) { return item.field; });
}

/**
 * @param {Array} edges
 * @return {Array} Names of parent fields
 */
function getParentFieldNames(edges) {
  return edges.map(function(edge) { return edge.From; });
}

/**
 * @param {Array} edges
 * @param {string} parent
 * @return {Array} Children of parent
 */
function getChildFieldNamesByParent(edges, parent) {
  var children = edges.filter(function(edge) {
    return edge.From === parent;
  });
  return getChildFieldNames(children);
}

/**
 * @param {Array} edges
 * @return {Array} Names of child fields
 */
function getChildFieldNames(edges) {
  return edges.map(function(edge) { return edge.To; });
}

/**
 * @param {Array} fieldItemStates
 * @param {Array} fieldsByUnit Objects containing 'unit' and 'fields'
 * @param {string} selectedUnit
 * @param {boolean} dataHasUnitSpecificFields
 * @param {Array} fieldsBySeries Objects containing 'series' and 'fields'
 * @param {string} selectedSeries
 * @param {boolean} dataHasSeriesSpecificFields
 * @param {Array} selectedFields Field items
 * @param {Array} edges
 * @return {Array} Field item states
 */
function fieldItemStatesForView(fieldItemStates, fieldsByUnit, selectedUnit, dataHasUnitSpecificFields, fieldsBySeries, selectedSeries, dataHasSeriesSpecificFields, selectedFields, edges) {
  var states = fieldItemStates.map(function(item) { return item; });
  if (dataHasUnitSpecificFields && dataHasSeriesSpecificFields) {
    states = fieldItemStatesForSeries(fieldItemStates, fieldsBySeries, selectedSeries);
    states = fieldItemStatesForUnit(states, fieldsByUnit, selectedUnit);
  }
  else if (dataHasSeriesSpecificFields) {
    states = fieldItemStatesForSeries(fieldItemStates, fieldsBySeries, selectedSeries);
  }
  else if (dataHasUnitSpecificFields) {
    states = fieldItemStatesForUnit(fieldItemStates, fieldsByUnit, selectedUnit);
  }

  if (selectedFields && selectedFields.length > 0) {
    states.forEach(function(fieldItem) {
      var selectedField = selectedFields.find(function(selectedItem) {
        return selectedItem.field === fieldItem.field;
      });
      if (selectedField) {
        selectedField.values.forEach(function(selectedValue) {
          var fieldItemValue = fieldItem.values.find(function(valueItem) {
            return valueItem.value === selectedValue;
          });
          fieldItemValue.checked = true;
        })
      }
    });
  }
  sortFieldsForView(states, edges);
  return states;
}

/**
 * @param {Array} fieldItemStates
 * @param {Array} edges
 */
function sortFieldsForView(fieldItemStates, edges) {
  var grandparents = [],
      parents = [];
  if (edges) {
    edges.forEach(function(edge) {
      if (!parents.includes(edge.From)) {
        parents.push(edge.From);
      }
    });
    edges.forEach(function(edge) {
      if (parents.includes(edge.To)) {
        grandparents.push(edge.From);
      }
    });
  }
  fieldItemStates.sort(function(a, b) {
    if (grandparents.includes(a.field) && !grandparents.includes(b.field)) {
      return -1;
    }
    else if (grandparents.includes(b.field) && !grandparents.includes(a.field)) {
      return 1;
    }
    else if (parents.includes(a.field) && !parents.includes(b.field)) {
      return -1;
    }
    else if (parents.includes(b.field) && !parents.includes(a.field)) {
      return 1;
    }
    return 0;
  });
}

/**
 * @param {Array} fieldItemStates
 * @param {Array} fieldsByUnit Objects containing 'unit' and 'fields'
 * @param {string} selectedUnit
 * @return {Array} Field item states
 */
function fieldItemStatesForUnit(fieldItemStates, fieldsByUnit, selectedUnit) {
  return fieldItemStates.filter(function(fis) {
    var fieldsBySelectedUnit = fieldsByUnit.filter(function(fieldByUnit) {
      return fieldByUnit.unit === selectedUnit;
    })[0];
    return fieldsBySelectedUnit.fields.includes(fis.field);
  });
}

/**
 * @param {Array} fieldItemStates
 * @param {Array} fieldsBySeries Objects containing 'series' and 'fields'
 * @param {string} selectedSeries
 * @return {Array} Field item states
 */
function fieldItemStatesForSeries(fieldItemStates, fieldsBySeries, selectedSeries) {
  return fieldItemStates.filter(function(fis) {
    var fieldsBySelectedSeries = fieldsBySeries.filter(function(fieldBySeries) {
      return fieldBySeries.series === selectedSeries;
    })[0];
    return fieldsBySelectedSeries.fields.includes(fis.field);
  });
}

/**
 * @param {Array} fieldItems
 * @return {Array} Objects representing disaggregation combinations
 */
function getCombinationData(fieldItems) {

  // First get a list of all the single field/value pairs.
  var fieldValuePairs = [];
  fieldItems.forEach(function(fieldItem) {
    fieldItem.values.forEach(function(value) {
      var pair = {};
      pair[fieldItem.field] = value;
      fieldValuePairs.push(pair);
    });
  });

  // Next get a list of each single pair combined with every other.
  var fieldValuePairCombinations = {};
  fieldValuePairs.forEach(function(fieldValuePair) {
    var combinationsForCurrentPair = Object.assign({}, fieldValuePair);
    fieldValuePairs.forEach(function(fieldValuePairToAdd) {
      // The following conditional reflects that we're not interested in combinations
      // within the same field. (Eg, not interested in combination of Female and Male).
      if (Object.keys(fieldValuePair)[0] !== Object.keys(fieldValuePairToAdd)[0]) {
        Object.assign(combinationsForCurrentPair, fieldValuePairToAdd);
        var combinationKeys = Object.keys(combinationsForCurrentPair).sort();
        var combinationValues = Object.values(combinationsForCurrentPair).sort();
        var combinationUniqueId = JSON.stringify(combinationKeys.concat(combinationValues));
        if (!(combinationUniqueId in fieldValuePairCombinations)) {
          fieldValuePairCombinations[combinationUniqueId] = Object.assign({}, combinationsForCurrentPair);
        }
      }
    });
  });
  fieldValuePairCombinations = Object.values(fieldValuePairCombinations);

  // Return a combination of both.
  return fieldValuePairs.concat(fieldValuePairCombinations);
}

/**
 * @param {Array} startValues Objects containing 'field' and 'value'
 * @param {Array} selectableFieldNames
 * @return {Array} Field items
 */
function selectFieldsFromStartValues(startValues, selectableFieldNames) {
  if (!startValues) {
    return [];
  }
  var allowedStartValues = startValues.filter(function(startValue) {
    var normalField = !nonFieldColumns().includes(startValue.field);
    var allowedField = selectableFieldNames.includes(startValue.field)
    return normalField && allowedField;
  });
  var valuesByField = {};
  allowedStartValues.forEach(function(startValue) {
    if (!(startValue.field in valuesByField)) {
      valuesByField[startValue.field] = [];
    }
    valuesByField[startValue.field].push(startValue.value);
  });
  return Object.keys(valuesByField).map(function(field) {
    return {
      field: field,
      values: valuesByField[field],
    };
  });
}

/**
 * @param {Array} rows
 * @param {Array} selectableFieldNames Field names
 * @param {string} selectedUnit
 * @return {Array} Field items
 */
function selectMinimumStartingFields(rows, selectableFieldNames, selectedUnit) {
  var filteredData = rows;
  if (selectedUnit) {
    filteredData = filteredData.filter(function(row) {
      return row[UNIT_COLUMN] === selectedUnit;
    });
  }
  filteredData = filteredData.filter(function(row) {
    return selectableFieldNames.some(function(fieldName) {
      return row[fieldName];
    });
  });
  // Sort the data by each field. We go in reverse order so that the
  // first field will be highest "priority" in the sort.
  selectableFieldNames.reverse().forEach(function(fieldName) {
    filteredData = _.sortBy(filteredData, fieldName);
  });
  // But actually we want the top-priority sort to be the "size" of the
  // rows. In other words we want the row with the fewest number of fields.
  filteredData = _.sortBy(filteredData, function(row) { return Object.keys(row).length; });

  if (filteredData.length === 0) {
    return [];
  }

  // Convert to an array of objects with 'field' and 'values' keys, omitting
  // any non-field columns.
  return Object.keys(filteredData[0]).filter(function(key) {
    return !nonFieldColumns().includes(key);
  }).map(function(field) {
    return {
      field: field,
      values: [filteredData[0][field]]
    };
  });
}

/**
 * @param {Array} edges
 * @param {Array} fieldItemStates
 * @param {Array} rows
 * @return {Object} Arrays of parents keyed to children
 */
function validParentsByChild(edges, fieldItemStates, rows) {
  var parentFields = getParentFieldNames(edges);
  var childFields = getChildFieldNames(edges);
  var validParentsByChild = {};
  childFields.forEach(function(childField, fieldIndex) {
    var fieldItemState = fieldItemStates.find(function(fis) {
      return fis.field === childField;
    });
    var childValues = fieldItemState.values.map(function(value) {
      return value.value;
    });
    var parentField = parentFields[fieldIndex];
    validParentsByChild[childField] = {};
    childValues.forEach(function(childValue) {
      var rowsWithParentValues = rows.filter(function(row) {
        var childMatch = row[childField] == childValue;
        var parentNotEmpty = row[parentField];
        return childMatch && parentNotEmpty;
      });
      var parentValues = rowsWithParentValues.map(function(row) {
        return row[parentField];
      });
      parentValues = parentValues.filter(isElementUniqueInArray);
      validParentsByChild[childField][childValue] = parentValues;
    });
  });
  return validParentsByChild;
}

/**
 * @param {Array} selectableFields Field names
 * @param {Array} edges
 * @param {Array} selectedFields Field items
 * @return {Array} Field names
 */
function getAllowedFieldsWithChildren(selectableFields, edges, selectedFields) {
  var allowedFields = getInitialAllowedFields(selectableFields, edges);
  var selectedFieldNames = getFieldNames(selectedFields);
  getParentFieldNames(edges).forEach(function(parentFieldName) {
    if (selectedFieldNames.includes(parentFieldName)) {
      var childFieldNames = getChildFieldNamesByParent(edges, parentFieldName);
      allowedFields = allowedFields.concat(childFieldNames);
    }
  }, this);
  return allowedFields.filter(isElementUniqueInArray);
}

/**
 *
 * @param {Array} fieldNames
 * @param {Array} edges
 * @return {Array} Field names
 */
function getInitialAllowedFields(fieldNames, edges) {
  var children = getChildFieldNames(edges);
  return fieldNames.filter(function(field) { return !children.includes(field); });
}

/**
 * @param {Array} selectedFields Field names
 * @param {Array} edges
 * @return {Array} Selected fields without orphans
 */
function removeOrphanSelections(selectedFields, edges) {
  var selectedFieldNames = selectedFields.map(function(selectedField) {
    return selectedField.field;
  });
  edges.forEach(function(edge) {
    if (!selectedFieldNames.includes(edge.From)) {
      selectedFields = selectedFields.filter(function(selectedField) {
        return selectedField.field !== edge.From;
      });
    }
  });
  return selectedFields;
}

/**
 * @param {Array} rows
 * @param {Array} selectedFields Field items
 * @return {Array} Rows
 */
function getDataBySelectedFields(rows, selectedFields) {
  return rows.filter(function(row) {
    return selectedFields.some(function(field) {
      return field.values.includes(row[field.field]);
    });
  });
}
