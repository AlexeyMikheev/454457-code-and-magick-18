'use strict';

(function () {
  var showErrorMessage = function (errorMessageText, parentNode) {
    var errorMessage = document.createElement('div');
    errorMessage.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    errorMessage.style.position = 'absolute';
    errorMessage.style.left = 0;
    errorMessage.style.right = 0;
    errorMessage.style.fontSize = '30px';

    errorMessage.textContent = errorMessageText;
    parentNode.insertAdjacentElement('afterbegin', errorMessage);
  };

  window.notification = showErrorMessage;
})();
