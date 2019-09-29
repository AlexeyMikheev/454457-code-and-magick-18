'use strict';

window.setup = (function () {
  var ITEMS_COUNT = 4;

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
  var items = window.util.getRandomItems(ITEMS_COUNT);

  bindDOMItems(items);
})();
