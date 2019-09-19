'use strict';

var NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

var SURNAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];

var COAT_COLORS = [
  'rgb(101,137,164)',
  'rgb(241,43,107)',
  'rgb(146,100,161)',
  'rgb(56,159,117)',
  'rgb(215,210,55)',
  'rgb(0,0,0)'
];

var EYES_COLORS = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];

var ITEMS_COUNT = 4;

var randomInteger = function (min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.abs(Math.round(rand));
};

var getRandomString = function (strings) {
  var randomIndex = randomInteger(0, strings.length - 1);
  return strings[randomIndex];
};

var getRandomItem = function () {
  var item = {};

  item.name = getRandomString(NAMES) + ' ' + getRandomString(SURNAMES);
  item.coatColor = getRandomString(COAT_COLORS);
  item.eyesColor = getRandomString(EYES_COLORS);

  return item;
};

var getRandomItems = function (count) {
  var items = [];
  for (var i = 0; i < count; i++) {
    items.push(getRandomItem());
  }
  return items;
};

var createDOMItem = function (item, template) {
  template.querySelector('.setup-similar-label').textContent = item.name;
  template.querySelector('.wizard-coat').style.fill = item.coatColor;
  template.querySelector('.wizard-eyes').style.fill = item.eyesColor;

  return template;
};

var bindDOMItems = function (items) {
  var itemTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var domItem = null;
  for (var i = 0; i < items.length; i++) {
    domItem = createDOMItem(items[i], itemTemplate.cloneNode(true));
    dialogList.appendChild(domItem);
  }
};

var dialog = document.querySelector('.setup');
dialog.classList.remove('hidden');

document.querySelector('.setup-similar').classList.remove('hidden');

var dialogList = document.querySelector('.setup-similar-list');

var items = getRandomItems(ITEMS_COUNT);

bindDOMItems(items);
