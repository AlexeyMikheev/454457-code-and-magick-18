'use strict';

var drawRect = function (ctx, x, y, width, height, fillColor) {
  ctx.fillStyle = fillColor;
  ctx.fillRect(x, y, width, height);
};

var drawText = function (ctx, x, y, text, fontStyle, fontColor) {
  ctx.font = fontStyle;
  ctx.fillStyle = fontColor;
  ctx.fillText(text, x, y);
};

var calculateChartScale = function (times, maxChartHeightPx) {
  var max = Number.MIN_VALUE;
  for (var i = 0; i < times.length; i++) {
    if (times[i] > max) {
      max = times[i];
    }
  }
  return maxChartHeightPx / max;
};

var drawChartsBottom = function (ctx) {
  var colorRectStyle = 'rgba(0, 0, 0, 0.7)';
  drawRect(ctx, 110, 20, 420, 270, colorRectStyle);

  colorRectStyle = 'rgb(255, 255, 255)';
  drawRect(ctx, 100, 10, 420, 270, colorRectStyle);
};

var drawChartsHeader = function (ctx) {
  var textColor = 'rgb(0, 0, 0)';
  var textStyle = 'PT Mono 16px';
  drawText(ctx, 120, 40, 'Ура вы победили!', textStyle, textColor);
  drawText(ctx, 120, 60, 'Cписок результатов:', textStyle, textColor);
};

var drawCharts = function (ctx, names, times) {
  var chartsX = 140;
  var chartsY = 70;
  // var chartsWidth = 340;
  var chartsHeight = 190;

  // drawRect(ctx, chartsX, chartsY, chartsWidth, chartsHeight, "rgba(0, 0, 0, 0.7)");  // для отладки начала отсчета координат внутри charts

  var textColor = 'rgb(0, 0, 0)';
  var bottomLabelY = chartsY + chartsHeight;

  var chartX = chartsX;
  var chartWidth = 40;
  var chartXPadding = 50;
  var maxChartHeight = 140;

  var selfChartFillColor = 'rgba(255, 0, 0, 1)';
  var otherChartFillColor = 'hsl(240, 100%, 50%)';

  var chartScale = calculateChartScale(times, maxChartHeight);

  var textStyle = 'PT Mono 16px';

  for (var i = 0; i < names.length; i++) {

    var name = names[i];
    var time = Math.round(times[i]);
    var chartHeight = time * chartScale;

    var chartY = bottomLabelY - 20 - chartHeight;
    var topLabelY = chartY - 10;

    var chartColor = otherChartFillColor;

    if (name.toLowerCase() === 'вы') {
      chartColor = selfChartFillColor;
    } else {
      chartColor = 'hsl(240,' + 100 * Math.random() + '%,50%)';
    }

    drawText(ctx, chartX, bottomLabelY, name, textStyle, textColor);
    drawRect(ctx, chartX, chartY, chartWidth, chartHeight, chartColor);
    drawText(ctx, chartX, topLabelY, time, textStyle, textColor);

    chartX += chartWidth + chartXPadding;
  }
};


window.renderStatistics = function (ctx, names, times) {

  if (ctx !== null) {

    drawChartsBottom(ctx);

    drawChartsHeader(ctx);

    drawCharts(ctx, names, times);
  }
};
