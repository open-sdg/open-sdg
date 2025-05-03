function showComparisonLink() {
    $('#comparison').show();
}

function getBoxElementType() {
    var showRadios = (MODEL.validForComparison && opensdg.onComparisonPage);
    return (showRadios) ? 'radio' : 'checkbox';
}
