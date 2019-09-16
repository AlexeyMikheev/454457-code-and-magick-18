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
  var CHARTS_X = 140;
  var CHARTS_Y = 70;
  var CHARTS_HEIGHT = 190;

  var TEXT_COLOR = 'rgb(0, 0, 0)';
  var bottomLabelY = CHARTS_Y + CHARTS_HEIGHT;

  var chartX = CHARTS_X;
  var CHART_WIDTH = 40;
  var CHART_X_PADDING = 50;
  var MAX_CHART_HEIGHT = 140;

  var selfChartFillColor = 'rgba(255, 0, 0, 1)';
  var otherChartFillColor = 'hsl(240, 100%, 50%)';
  var chartScale = calculateChartScale(times, MAX_CHART_HEIGHT);
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

    drawText(ctx, chartX, bottomLabelY, name, textStyle, TEXT_COLOR);
    drawRect(ctx, chartX, chartY, CHART_WIDTH, chartHeight, chartColor);
    drawText(ctx, chartX, topLabelY, time, textStyle, TEXT_COLOR);

    chartX += CHART_WIDTH + CHART_X_PADDING;
  }
};

window.renderStatistics = function (ctx, names, times) {
  if (ctx !== null) {
    drawChartsBottom(ctx);
    drawChartsHeader(ctx);
    drawCharts(ctx, names, times);
  }
};
