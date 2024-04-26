document.addEventListener('DOMContentLoaded', function () {
  const body = document.body;
  const toggle = document.getElementById('darkModeToggle');
  const isDarkMode = localStorage.getItem('darkMode') === 'true';

  // Set the initial state of the checkbox and body class
  toggle.checked = isDarkMode;
  body.classList.toggle('dark-mode', isDarkMode);

  toggle.addEventListener('change', function () {
    body.classList.toggle('dark-mode', this.checked);
    localStorage.setItem('darkMode', this.checked);
  });
});
