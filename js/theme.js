window.AHM = window.AHM || {};

(function () {
  const STORAGE_KEY = "ahm_theme";

  function getStoredTheme() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && window.AHM.THEMES.some((t) => t.code === stored)) return stored;
    return window.AHM.DEFAULT_THEME;
  }

  function setTheme(code) {
    if (!window.AHM.THEMES.some((t) => t.code === code)) code = window.AHM.DEFAULT_THEME;
    document.documentElement.setAttribute("data-theme", code);
    localStorage.setItem(STORAGE_KEY, code);
    document.dispatchEvent(new CustomEvent("themechange", { detail: { code } }));
    return code;
  }

  function initTheme() {
    return setTheme(getStoredTheme());
  }

  window.AHM.theme = { getStoredTheme, setTheme, initTheme };
})();
