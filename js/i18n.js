window.AHM = window.AHM || {};

(function () {
  const STORAGE_KEY = "ahm_lang";

  function getPath(obj, path) {
    return path.split(".").reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
  }

  function applyTranslations(dict) {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const value = getPath(dict, el.getAttribute("data-i18n"));
      if (value !== undefined) el.textContent = value;
    });

    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      const value = getPath(dict, el.getAttribute("data-i18n-html"));
      if (value !== undefined) el.innerHTML = value;
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const value = getPath(dict, el.getAttribute("data-i18n-placeholder"));
      if (value !== undefined) el.setAttribute("placeholder", value);
    });

    document.querySelectorAll("[data-i18n-aria-label]").forEach((el) => {
      const value = getPath(dict, el.getAttribute("data-i18n-aria-label"));
      if (value !== undefined) el.setAttribute("aria-label", value);
    });

    const title = getPath(dict, "meta.title");
    if (title) document.title = title;

    const description = getPath(dict, "meta.description");
    if (description) {
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute("content", description);
    }
  }

  function getStoredLanguage() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && window.AHM.LANGUAGES.some((l) => l.code === stored)) return stored;
    return window.AHM.DEFAULT_LANGUAGE;
  }

  function setLanguage(code) {
    if (!window.AHM.LANGUAGES.some((l) => l.code === code)) code = window.AHM.DEFAULT_LANGUAGE;
    const dict = window.AHM.locales[code];
    applyTranslations(dict);
    document.documentElement.setAttribute("lang", code);
    localStorage.setItem(STORAGE_KEY, code);
    document.dispatchEvent(new CustomEvent("languagechange", { detail: { code, dict } }));
    return dict;
  }

  function initI18n() {
    return setLanguage(getStoredLanguage());
  }

  window.AHM.i18n = { getStoredLanguage, setLanguage, initI18n };
})();
