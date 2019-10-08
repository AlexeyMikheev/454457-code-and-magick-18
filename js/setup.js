'use strict';

(function () {
  var ITEMS_COUNT = 4;

  var wizardCoatColor = null;
  var wizardEyesColor = null;
  var wizards = [];

  var backEndModule = window.backend;

  var similarList = document.querySelector('.setup-similar-list');

  var getWeight = function (wizard) {
    var weight = 0;

    if (wizard.colorCoat === wizardCoatColor) {
      weight += 2;
    }
    if (wizard.colorEyes === wizardEyesColor) {
      weight += 1;
    }

    return weight;
  };

  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  var onWizardEyesChange = function (color) {
    wizardEyesColor = color;
    refreshWizards();
  };

  var onWizardCoatChange = function (color) {
    wizardCoatColor = color;
    refreshWizards();
  };

  var createWizard = function (item, template) {
    template.querySelector('.setup-similar-label').textContent = item.name;
    template.querySelector('.wizard-coat').style.fill = item.colorCoat;
    template.querySelector('.wizard-eyes').style.fill = item.colorEyes;

    return template;
  };

  var refreshWizards = function () {
    renderWizards(wizards.sort(function (left, right) {
      var diffWeight = getWeight(right) - getWeight(left);
      if (diffWeight === 0) {
        diffWeight = namesComparator(left.name, right.name);
      }
      return diffWeight;
    }));
  };

  var renderWizards = function (items) {
    var itemTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
    var domItem = null;
    similarList.innerHTML = '';

    for (var i = 0; i < ITEMS_COUNT; i++) {
      domItem = createWizard(items[i], itemTemplate.cloneNode(true));
      similarList.appendChild(domItem);
    }
  };

  var onError = function (errorMessage) {
    window.notification(errorMessage, document.body);
  };

  var init = function () {
    document.querySelector('.setup-similar').classList.remove('hidden');

    backEndModule.load(function (items) {
      wizards = items;
      refreshWizards();
    }, onError);
  };

  window.setup = {
    onWizardEyesChange: onWizardEyesChange,
    onWizardCoatChange: onWizardCoatChange
  };

  init();
})();
