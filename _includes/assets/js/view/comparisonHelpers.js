function showComparisonLink() {
    $('#comparison').show();
}

function updateWithSelectedComparisonFields() {
    var selectedOption = $('#fields.comparison-fields input:checked');
    var selectedFields = [MODEL.helpers.getComparisonBase()];
    selectedFields.push({
        field: $(selectedOption).data('field'),
        values: [$(selectedOption).val()],
    });
    MODEL.updateSelectedFields(selectedFields);
}
