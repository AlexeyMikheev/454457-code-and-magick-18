'use strict';

(function () {
  var ENTER_KEY = 13;
  var ESC_KEY = 27;
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var backEndModule = window.backend;
  var setupModule = window.setup;
  var debounce = window.debounce;

  var setupDialogOpened = false;
  var setupUserNameFocused = false;

  var Coordinate = function (x, y) {
    this.x = x;
    this.y = y;
    this.setX = function (value) {
      this.x = value;
    };
    this.setY = function (value) {
      this.y = value;
    };
  };

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
  var userPictureUploader = dialogHandler.querySelector('input[type=file]');
  var userPicture = dialogHandler.querySelector('.setup-user-pic');

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

    initSetupPictureEvents();

    dialogHandler.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      var dragged = false;

      var startCoords = new Coordinate(evt.clientX, evt.clientY);

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();
        dragged = true;

        var shift = new Coordinate(startCoords.x - moveEvt.clientX, startCoords.y - moveEvt.clientY);

        startCoords.setX(moveEvt.clientX);
        startCoords.setY(moveEvt.clientY);

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

  var bindWizardEvent = function (wizardPart, property, colors, wizardPartHidden, cb) {
    wizardPart.addEventListener('click', function () {
      var color = window.util.getRandomString(colors);
      wizardPart.style[property] = wizardPartHidden.value = color;
      if (cb) {
        debounce(cb, color);
      }
    });
  };

  var initSetupPictureEvents = function () {
    userPictureUploader.addEventListener('change', function () {
      var file = userPictureUploader.files[0];
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          userPicture.src = reader.result;
        });

        reader.readAsDataURL(file);
      }
    });
  };

  var initWizardEvent = function (options, cb) {
    var wizardPart = document.querySelector(options.wizardPartSelector);
    var wizardPartHinned = document.querySelector(options.hiddenInputSelector);
    bindWizardEvent(wizardPart, options.property, options.colors, wizardPartHinned, cb);
  };

  var initWizardEvents = function () {
    var coatOptions = {
      wizardPartSelector: '.setup-wizard .wizard-coat',
      property: 'fill',
      colors: window.util.coatColors,
      hiddenInputSelector: '[name=coat-color]'
    };
    initWizardEvent(coatOptions, setupModule.onWizardCoatChange);

    var eyesOptions = {
      wizardPartSelector: '.setup-wizard .wizard-eyes',
      property: 'fill',
      colors: window.util.eyesColors,
      hiddenInputSelector: '[name=eyes-color]'
    };
    initWizardEvent(eyesOptions, setupModule.onWizardEyesChange);

    var fireballOptions = {
      wizardPartSelector: '.setup-fireball-wrap',
      property: 'backgroundColor',
      colors: window.util.wrapColors,
      hiddenInputSelector: '[name=fireball-color]'
    };
    initWizardEvent(fireballOptions);
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
