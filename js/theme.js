import { THEMES, DEFAULT_THEME } from "./themes.js";

const STORAGE_KEY = "ahm_theme";

export function getStoredTheme() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && THEMES.some((t) => t.code === stored)) return stored;
  return DEFAULT_THEME;
}

export function setTheme(code) {
  if (!THEMES.some((t) => t.code === code)) code = DEFAULT_THEME;
  document.documentElement.setAttribute("data-theme", code);
  localStorage.setItem(STORAGE_KEY, code);
  document.dispatchEvent(new CustomEvent("themechange", { detail: { code } }));
  return code;
}

export function initTheme() {
  return setTheme(getStoredTheme());
}
