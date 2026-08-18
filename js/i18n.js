import { LANGUAGES, DEFAULT_LANGUAGE } from "./languages.js";

const STORAGE_KEY = "ahm_lang";
const cache = new Map();

function getPath(obj, path) {
  return path.split(".").reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
}

async function loadDictionary(code) {
  if (cache.has(code)) return cache.get(code);
  const res = await fetch(`locales/${code}.json`);
  if (!res.ok) throw new Error(`Missing locale file for "${code}"`);
  const dict = await res.json();
  cache.set(code, dict);
  return dict;
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

export function getStoredLanguage() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && LANGUAGES.some((l) => l.code === stored)) return stored;
  return DEFAULT_LANGUAGE;
}

export async function setLanguage(code) {
  if (!LANGUAGES.some((l) => l.code === code)) code = DEFAULT_LANGUAGE;
  const dict = await loadDictionary(code);
  applyTranslations(dict);
  document.documentElement.setAttribute("lang", code);
  localStorage.setItem(STORAGE_KEY, code);
  document.dispatchEvent(new CustomEvent("languagechange", { detail: { code, dict } }));
  return dict;
}

export async function initI18n() {
  return setLanguage(getStoredLanguage());
}
