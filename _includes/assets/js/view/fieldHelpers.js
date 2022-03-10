/**
 * @param {Object} args
 * @return null
 */
function initialiseFields(args) {
    var fieldsContainValues = args.fields.some(function (field) {
        return field.values.length > 0;
    });
    if (fieldsContainValues) {
        var template = _.template($("#item_template").html());

        if (!$('button#clear').length) {
            $('<button id="clear" disabled="disabled" aria-disabled="true" class="disabled">' + translations.indicator.clear_selections + ' <i class="{% if site.bootstrap_5 %}bi bi-x-lg{% else %}fa fa-remove{% endif %}"></i></button>').insertBefore('#fields');
        }

        $('#fields').html(template({
            fields: args.fields,
            allowedFields: args.allowedFields,
            childFields: _.uniq(args.edges.map(function (edge) { return edge.To })),
            edges: args.edges
        }));

        $(OPTIONS.rootElement).removeClass('no-fields');

    } else {
        $(OPTIONS.rootElement).addClass('no-fields');
    }
}

/**
 * @return null
 */
function updateWithSelectedFields() {
    MODEL.updateSelectedFields(_.chain(_.map($('#fields input:checked'), function (fieldValue) {
        return {
            value: $(fieldValue).val(),
            field: $(fieldValue).data('field')
        };
    })).groupBy('field').map(function (value, key) {
        return {
            field: key,
            values: _.map(value, 'value')
        };
    }).value());
}

/**
 * @param {Element} fieldGroupElement
 * @return null
 */
function sortFieldGroup(fieldGroupElement) {
    var sortLabels = function (a, b) {
        var aObj = { hasData: $(a).attr('data-has-data'), text: $(a).text() };
        var bObj = { hasData: $(b).attr('data-has-data'), text: $(b).text() };
        if (aObj.hasData == bObj.hasData) {
            return (aObj.text > bObj.text) ? 1 : -1;
        }
        return (aObj.hasData < bObj.hasData) ? 1 : -1;
    };
    fieldGroupElement.find('label')
        .sort(sortLabels)
        .appendTo(fieldGroupElement.find('#indicatorData .variable-options'));
}
