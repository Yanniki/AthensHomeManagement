// Registry of supported languages.
// To add a new language: add an entry here, create locales/<code>.js
// (see locales/en.js for the format) with the same keys as locales/en.js,
// and add a <script src="locales/<code>.js"></script> tag in index.html.
window.AHM = window.AHM || {};
window.AHM.LANGUAGES = [
  { code: "en", label: "English", short: "EN" },
  { code: "el", label: "Ελληνικά", short: "EL" },
];
window.AHM.DEFAULT_LANGUAGE = "en";
