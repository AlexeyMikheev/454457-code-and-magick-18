'use strict';

window.setup = (function () {
  var ITEMS_COUNT = 4;
  var backEndModule = window.backend;

  var createDOMItem = function (item, template) {
    template.querySelector('.setup-similar-label').textContent = item.name;
    template.querySelector('.wizard-coat').style.fill = item.colorCoat;
    template.querySelector('.wizard-eyes').style.fill = item.colorEyes;

    return template;
  };

  var bindDOMItems = function (items) {
    var itemTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
    var domItem = null;
    for (var i = 0; i < ITEMS_COUNT; i++) {
      domItem = createDOMItem(items[i], itemTemplate.cloneNode(true));
      dialogList.appendChild(domItem);
    }
  };

  var onError = function (errorMessage) {
    window.notification(errorMessage, document.body);
  };

  document.querySelector('.setup-similar').classList.remove('hidden');

  var dialogList = document.querySelector('.setup-similar-list');

  backEndModule.load(bindDOMItems, onError);
})();
