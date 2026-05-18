(function () {
  'use strict';

  var messages = [
    'Click the button to change this message.',
    'Hello! Thanks for trying the interactive button.',
    'You can click again to cycle through messages.',
  ];
  var messageIndex = 0;

  var toggleText = document.getElementById('toggle-text');
  var toggleBtn = document.getElementById('toggle-btn');
  var nameForm = document.getElementById('name-form');
  var userNameInput = document.getElementById('user-name');
  var nameFeedback = document.getElementById('name-feedback');
  var colorButtons = document.querySelectorAll('.color-btn');

  function handleToggleClick() {
    messageIndex = (messageIndex + 1) % messages.length;
    toggleText.textContent = messages[messageIndex];
    toggleBtn.textContent =
      messageIndex === 0 ? 'Change message' : 'Change message again';
  }

  function handleNameSubmit(event) {
    event.preventDefault();
    var name = userNameInput.value.trim();

    if (name === '') {
      nameFeedback.textContent = 'Please enter your name.';
      nameFeedback.className = 'feedback feedback-error';
      userNameInput.focus();
      return;
    }

    nameFeedback.textContent = 'Welcome, ' + name + '! Nice to meet you.';
    nameFeedback.className = 'feedback feedback-success';
  }

  function handleColorClick(event) {
    var button = event.currentTarget;
    var color = button.getAttribute('data-color');
    var label = button.getAttribute('data-label');

    document.body.style.backgroundColor = color;
    document.body.style.backgroundImage = 'none';

    colorButtons.forEach(function (btn) {
      btn.classList.remove('is-active');
      btn.setAttribute('aria-pressed', 'false');
    });

    button.classList.add('is-active');
    button.setAttribute('aria-pressed', 'true');
    document.body.setAttribute('data-bg-label', label);
  }

  toggleBtn.addEventListener('click', handleToggleClick);

  nameForm.addEventListener('submit', handleNameSubmit);

  colorButtons.forEach(function (button) {
    button.setAttribute('aria-pressed', 'false');
    button.addEventListener('click', handleColorClick);
  });
})();
