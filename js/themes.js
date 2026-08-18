// Registry of supported color themes.
// To add a new theme: add an entry here, then add a matching
// [data-theme="<code>"] override block in css/styles.css.
export const THEMES = [
  { code: "warm", label: "Terracotta", swatch: ["#c05b34", "#202a2c"] },
  { code: "ocean", label: "Aegean Blue", swatch: ["#0077b6", "#03045e"] },
];

export const DEFAULT_THEME = "warm";
