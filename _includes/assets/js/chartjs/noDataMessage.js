function getTextLinesOnCanvas(ctx, text, maxWidth) {
  var words = text.split(" ");
  var lines = [];
  var currentLine = words[0];

  for (var i = 1; i < words.length; i++) {
      var word = words[i];
      var width = ctx.measureText(currentLine + " " + word).width;
      if (width < maxWidth) {
          currentLine += " " + word;
      } else {
          lines.push(currentLine);
          currentLine = word;
      }
  }
  lines.push(currentLine);
  return lines;
}

function isHighContrast(contrast) {
  if (contrast) {
      return contrast === 'high';
  }
  else {
      return $('body').hasClass('contrast-high');
  }
}

// This plugin displays a message to the user whenever a chart has no data.
Chart.register({
  id: 'open-sdg-no-data-message',
  afterDraw: function(chart) {
    if (chart.data.datasets.length === 0) {

      var ctx = chart.ctx;
      var width = chart.width;
      var height = chart.height;

      chart.clear();

      ctx.save();
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = "normal 40px 'Open Sans', Helvetica, Arial, sans-serif";
      ctx.fillStyle = (isHighContrast()) ? 'white' : 'black';
      var lines = getTextLinesOnCanvas(ctx, translations.indicator.data_not_available, width);
      var numLines = lines.length;
      var lineHeight = 50;
      var xLine = width / 2;
      var yLine = (height / 2) - ((lineHeight / 2) * numLines);
      for (var i = 0; i < numLines; i++) {
        ctx.fillText(lines[i], xLine, yLine);
        yLine += lineHeight;
      }
      ctx.restore();

      $('#selectionsChart').addClass('chart-has-no-data');
    }
    else {
      $('#selectionsChart').removeClass('chart-has-no-data');
    }
  }
});
