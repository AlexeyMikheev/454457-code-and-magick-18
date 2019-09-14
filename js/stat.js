window.renderStatistics = function (ctx, names, times) {
  console.log('renderStatistics');

  var drawRect = function (ctx, x, y, width, height, fillColor) {
    ctx.fillStyle = fillColor;
    ctx.fillRect(x, y, width, height);
  }

  var drawText = function (ctx, x, y, text, fontStyle, fontColor) {
    ctx.font = fontStyle;
    ctx.fillStyle = fontColor;
    ctx.fillText(text, x, y);
  }

  if (ctx != null) {

    var colorRectStyle = "rgba(0, 0, 0, 0.7)";
    drawRect(ctx, 110, 20, 420, 270, colorRectStyle);

    colorRectStyle = "rgb(255, 255, 255)";
    drawRect(ctx, 100, 10, 420, 270, colorRectStyle);

    var textColor = 'rgb(0, 0, 0)';
    var textStyle = 'PT Mono 16px';
    drawText(ctx, 120, 40, "Ура вы победили!", textStyle, textColor);
    drawText(ctx, 120, 60, "Cписок результатов:", textStyle, textColor);

    var chartsX = 140;
    var chartsY = 80;
    var chartWidth = 340;
    var chartHeight = 170;

    colorRectStyle = "rgba(0, 0, 0, 0.7)";
    //drawRect(ctx, chartsX, chartsY, chartWidth, chartHeight, colorRectStyle);

    textColor = 'rgb(0, 0, 0)';
    //var colorStyle = 'rgb(255, 255, 255)';
    var bottomLabelY = chartsY + chartHeight;
    var topLabelY = chartsY + 20;
    var chartY = chartsY + 30;

    drawText(ctx, chartsX, bottomLabelY, 'Вы', textStyle, textColor);
    drawRect(ctx, chartsX, chartY, 50, 120, "blue");
    drawText(ctx, chartsX, topLabelY, 'Очки', textStyle, textColor);

    drawText(ctx, chartsX + 90, bottomLabelY, 'Вы 1', textStyle, textColor);
    drawText(ctx, chartsX + 90, topLabelY, 'Очки', textStyle, textColor);

    drawText(ctx, chartsX + 180, bottomLabelY, 'Вы 2', textStyle, textColor);
    drawText(ctx, chartsX + 180, topLabelY, 'Очки', textStyle, textColor);

    drawText(ctx, chartsX + 270, bottomLabelY, 'Вы 3', textStyle, textColor);
    drawText(ctx, chartsX + 270, topLabelY, 'Очки', textStyle, textColor);
  }
}
