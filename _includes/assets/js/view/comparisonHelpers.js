function showComparisonLink() {
    $('#comparison').show();
}

function updateWithSelectedComparisonFields() {
    var selectedOption = $('#comparison-select option:selected');
    var selectedFields = [MODEL.helpers.getComparisonBase()];
    selectedFields.push({
        field: $(selectedOption).data('field'),
        values: [$(selectedOption).val()],
    });
    MODEL.updateSelectedFields(selectedFields);
}
