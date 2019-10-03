'use strict';

(function () {
  var ENTER_KEY = 13;
  var ESC_KEY = 27;

  var backEndModule = window.backend;

  var setupDialogOpened = false;
  var setupUserNameFocused = false;

  var openDialog = function () {
    setupDialogOpened = true;
    setupDialog.style.left = setupDialogCoords.x;
    setupDialog.style.top = setupDialogCoords.y;
    setupDialog.classList.remove('hidden');
  };

  var setupDialog = document.querySelector('.setup');
  var setupDialogCoords = {
    x: setupDialog.style.left,
    y: setupDialog.style.top
  };

  var setupWizardForm = document.querySelector('.setup-wizard-form');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setupDialog.querySelector('.setup-close');
  var dialogHandler = setupDialog.querySelector('.upload');

  var closeDialog = function () {
    setupDialogOpened = false;
    setupDialog.classList.add('hidden');
  };

  var initDocumentEvents = function () {
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC_KEY && setupDialogOpened && !setupUserNameFocused) {
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

    dialogHandler.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      var dragged = false;

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();
        dragged = true;

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        setupDialog.style.top = (setupDialog.offsetTop - shift.y) + 'px';
        setupDialog.style.left = (setupDialog.offsetLeft - shift.x) + 'px';
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);

        if (dragged) {
          var onDialogHandlerClick = function (clickEvt) {
            clickEvt.preventDefault();
            dialogHandler.removeEventListener('click', onDialogHandlerClick);
          };
          dialogHandler.addEventListener('click', onDialogHandlerClick);
        }
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  };

  var bindWizardEvent = function (wizardPart, property, colors, wizardPartHidden) {
    wizardPart.addEventListener('click', function () {
      var color = window.util.getRandomString(colors);
      wizardPart.style[property] = wizardPartHidden.value = color;
    });
  };

  var initWizardEvent = function (wizardPartSelector, property, colors, hiddenInputSelector) {
    var wizardPart = document.querySelector(wizardPartSelector);
    var wizardPartHinned = document.querySelector(hiddenInputSelector);
    bindWizardEvent(wizardPart, property, colors, wizardPartHinned);
  };

  var initWizardEvents = function () {
    initWizardEvent('.setup-wizard .wizard-coat', 'fill', window.util.coatColors, '[name=coat-color]');
    initWizardEvent('.setup-wizard .wizard-eyes', 'fill', window.util.eyesColors, '[name=eyes-color]');
    initWizardEvent('.setup-fireball-wrap', 'backgroundColor', window.util.wrapColors, '[name=fireball-color]');
  };

  var onError = function (errorMessage) {
    window.notification(errorMessage, setupWizardForm);
  };

  var initFormEvents = function () {
    setupWizardForm.addEventListener('submit', function (evt) {
      evt.preventDefault();
      backEndModule.save(new FormData(setupWizardForm), closeDialog, onError);
    });
  };

  initDocumentEvents();

  initUserNameEvents();

  initDialogEvents();

  initWizardEvents();

  initFormEvents();
})();
