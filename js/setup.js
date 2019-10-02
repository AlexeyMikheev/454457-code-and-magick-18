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

  var showErrorMessage = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  document.querySelector('.setup-similar').classList.remove('hidden');

  var dialogList = document.querySelector('.setup-similar-list');

  backEndModule.load(bindDOMItems, showErrorMessage);
})();
