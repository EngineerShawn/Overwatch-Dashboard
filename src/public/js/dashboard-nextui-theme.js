document.addEventListener('DOMContentLoaded', function () {
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;

  if (!themeToggle || !body) {
    console.warn('Theme toggle button or body not found. Theme switching disabled.');
    return;
  }
  
  const icon = themeToggle.querySelector('i'); // Assuming an <i> tag holds the icon

  // Function to set the theme
  function setTheme(theme) {
    if (theme === 'dark') {
      body.classList.add('dark-mode');
      if (icon) { icon.classList.remove('fa-sun'); icon.classList.add('fa-moon'); }
      localStorage.setItem('dashboardTheme', 'dark');
    } else {
      body.classList.remove('dark-mode');
      if (icon) { icon.classList.remove('fa-moon'); icon.classList.add('fa-sun'); }
      localStorage.setItem('dashboardTheme', 'light');
    }
  }

  // Apply saved theme on load
  const savedTheme = localStorage.getItem('dashboardTheme') || 'light'; // Default to light
  setTheme(savedTheme);

  // Toggle theme on button click
  themeToggle.addEventListener('click', () => {
    const newTheme = body.classList.contains('dark-mode') ? 'light' : 'dark';
    setTheme(newTheme);
  });
});