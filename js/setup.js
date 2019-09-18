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

var COATCOLORS = [
  'rgb(101,137,164)',
  'rgb(241,43,107)',
  'rgb(146,100,161)',
  'rgb(56,159,117)',
  'rgb(215,210,55)',
  'rgb(0,0,0)'
];

var EYESCOLORS = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];

var randomInteger = function (min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.abs(Math.round(rand));
};

var getRandomString = function (strings) {
  var randomIndex = randomInteger(0, strings.length);
  return strings[randomIndex];
};

var getRandomItem = function () {
  var item = {};

  item.name = getRandomString(NAMES) + ' ' + getRandomString(SURNAMES);
  item.coatColor = getRandomString(COATCOLORS);
  item.eyesColor = getRandomString(EYESCOLORS);

  return item;
};

var getRandomItems = function (count) {
  var items = [];
  for (var i = 0; i < count; i++) {
    var item = getRandomItem();
    items.push(item);
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
  for (var i = 0; i < items.length; i++) {
    var domItem = createDOMItem(items[i], itemTemplate.cloneNode(true));
    dialogList.appendChild(domItem);
  }
};

var dialog = document.querySelector('.setup');
dialog.classList.remove('hidden');

document.querySelector('.setup-similar').classList.remove('hidden');

var dialogList = document.querySelector('.setup-similar-list');

var items = getRandomItems(4);

bindDOMItems(items);