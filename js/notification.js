'use strict';

(function () {
  var showErrorMessage = function (errorMessage, parentNode) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    parentNode.insertAdjacentElement('afterbegin', node);
  };

  window.notification = showErrorMessage;
})();
