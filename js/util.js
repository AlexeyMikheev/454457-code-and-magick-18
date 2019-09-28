'use strict';

window.util = (function () {
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
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ];

  var EYES_COLORS = [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
  ];

  var WRAP_COLORS = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
  ];

  var getRandomInteger = function (min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.abs(Math.round(rand));
  };

  var getRandomString = function (strings) {
    var randomIndex = getRandomInteger(0, strings.length - 1);
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

  return {
    coatColors: COAT_COLORS,
    eyesColors: EYES_COLORS,
    wrapColors: WRAP_COLORS,
    getRandomString: getRandomString,
    getRandomItems: getRandomItems
  };
})();
