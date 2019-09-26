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

var ITEMS_COUNT = 4;

var ENTER_KEY = 13;
var ESC_KEY = 27;

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

document.querySelector('.setup-similar').classList.remove('hidden');

var dialogList = document.querySelector('.setup-similar-list');
var items = getRandomItems(ITEMS_COUNT);

bindDOMItems(items);

var setupDialog = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setupDialog.querySelector('.setup-close');

var setupDialogOpened = false;
var setupUserNameFocused = false;

var openDialog = function () {
  setupDialogOpened = true;
  setupDialog.classList.remove('hidden');
};

var closeDialog = function () {
  setupDialogOpened = false;
  setupDialog.classList.add('hidden');
};

var initDocumentEvents = function () {
  document.addEventListener('keydown', function (event) {
    if (event.keyCode === ESC_KEY && setupDialogOpened && !setupUserNameFocused) {
      closeDialog();
    }
  });
};

var initUserNameEvents = function () {
  var setupUserName = setupDialog.querySelector('.setup-user-name');
  setupUserName.addEventListener('focusin', function () {
    setupUserNameFocused = true;
  });
  setupUserName.addEventListener('focusout', function () {
    setupUserNameFocused = false;
  });
};

var initDialogEvents = function () {
  setupOpen.addEventListener('click', function () {
    openDialog();
  });

  setupOpen.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEY) {
      openDialog();
    }
  });

  setupClose.addEventListener('click', function () {
    closeDialog();
  });

  setupClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEY) {
      closeDialog();
    }
  });
};

var bindWizardEvent = function (wizardPart, property, colors, wizardPartHidden) {
  wizardPart.addEventListener('click', function () {
    var color = getRandomString(colors);
    wizardPart.style[property] = wizardPartHidden.value = color;
  });
};

var initWizardEvent = function (wizardPartSelector, property, colors, hiddenInputSelector) {
  var wizardPart = document.querySelector(wizardPartSelector);
  var wizardPartHinned = document.querySelector(hiddenInputSelector);
  bindWizardEvent(wizardPart, property, colors, wizardPartHinned);
};

var initWizardEvents = function () {
  initWizardEvent('.setup-wizard .wizard-coat', 'fill', COAT_COLORS, '[name=coat-color]');
  initWizardEvent('.setup-wizard .wizard-eyes', 'fill', EYES_COLORS, '[name=eyes-color]');
  initWizardEvent('.setup-fireball-wrap', 'backgroundColor', WRAP_COLORS, '[name=fireball-color]');
};

initDocumentEvents();

initUserNameEvents();

initDialogEvents();

initWizardEvents();
