// Registry of supported color themes.
// To add a new theme: add an entry here, then add a matching
// [data-theme="<code>"] override block in css/styles.css.
window.AHM = window.AHM || {};
window.AHM.THEMES = [
  { code: "santorini", label: "Santorini Blue", swatch: ["#1d6fb0", "#123c63"] },
  { code: "aegean", label: "Aegean Navy", swatch: ["#0d5eaf", "#0a2e4d"] },
];
window.AHM.DEFAULT_THEME = "santorini";
