// Detect user's preferred color scheme and apply corresponding mode
const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (prefersDarkMode) {
  document.body.classList.add('dark-mode');
}