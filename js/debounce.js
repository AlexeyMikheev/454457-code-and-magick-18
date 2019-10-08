'use strict';
(function () {
  var DELAY = 500;

  var lastTimeout = null;
  window.debounce = function (callback, args) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      callback(args);
    }, DELAY);
  };
})();
