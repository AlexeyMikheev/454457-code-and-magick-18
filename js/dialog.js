'use strict';

window.dialog = (function () {

  var ENTER_KEY = 13;
  var ESC_KEY = 27;

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
    initWizardEvent('.setup-wizard .wizard-coat', 'fill', window.util.COAT_COLORS, '[name=coat-color]');
    initWizardEvent('.setup-wizard .wizard-eyes', 'fill', window.util.EYES_COLORS, '[name=eyes-color]');
    initWizardEvent('.setup-fireball-wrap', 'backgroundColor', window.util.WRAP_COLORS, '[name=fireball-color]');
  };

  var setupDialog = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setupDialog.querySelector('.setup-close');

  initDocumentEvents();

  initUserNameEvents();

  initDialogEvents();

  initWizardEvents();

})();
