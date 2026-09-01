var THEMES = window.AHM.THEMES;
var initI18n = window.AHM.i18n.initI18n;
var setTheme = window.AHM.theme.setTheme;
var getStoredTheme = window.AHM.theme.getStoredTheme;
var initTheme = window.AHM.theme.initTheme;

document.getElementById("footer-year").textContent = new Date().getFullYear();

/* Generic picker open/close helpers */
const openPickers = new Set();

function openPicker(el, toggle) {
  el.classList.add("open");
  toggle.setAttribute("aria-expanded", "true");
  openPickers.add(el);
}
function closePicker(el, toggle) {
  el.classList.remove("open");
  toggle.setAttribute("aria-expanded", "false");
  openPickers.delete(el);
}
document.addEventListener("click", (e) => {
  openPickers.forEach((el) => {
    if (!el.contains(e.target)) {
      const toggle = el.querySelector(".picker-toggle");
      closePicker(el, toggle);
    }
  });
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    openPickers.forEach((el) => closePicker(el, el.querySelector(".picker-toggle")));
  }
});

/* Language picker removed for now — site is English-only. */
initI18n();

/* Theme picker */
const themePicker = document.getElementById("theme-picker");
const themeToggle = document.getElementById("theme-picker-toggle");
const themeMenu = document.getElementById("theme-picker-menu");
const themeCurrent = document.getElementById("theme-picker-current");
const themeSwatch = document.getElementById("theme-picker-swatch");

function swatchBackground(colors) {
  return `linear-gradient(135deg, ${colors[0]} 50%, ${colors[1]} 50%)`;
}

function renderThemeMenu(activeCode) {
  themeMenu.innerHTML = "";
  THEMES.forEach((theme) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.type = "button";
    btn.setAttribute("role", "option");
    btn.setAttribute("aria-selected", String(theme.code === activeCode));
    btn.dataset.theme = theme.code;
    btn.innerHTML = `<span class="swatch-dot" style="background:${swatchBackground(theme.swatch)}"></span><span>${theme.label}</span>`;
    btn.addEventListener("click", () => {
      setTheme(theme.code);
      closePicker(themePicker, themeToggle);
    });
    li.appendChild(btn);
    themeMenu.appendChild(li);
  });
  const active = THEMES.find((t) => t.code === activeCode) || THEMES[0];
  themeCurrent.textContent = active.label;
  themeSwatch.style.background = swatchBackground(active.swatch);
}

themeToggle.addEventListener("click", () => {
  themePicker.classList.contains("open") ? closePicker(themePicker, themeToggle) : openPicker(themePicker, themeToggle);
});
document.addEventListener("themechange", (e) => renderThemeMenu(e.detail.code));

renderThemeMenu(getStoredTheme());
initTheme();

/* Mobile nav */
const header = document.querySelector(".site-header");
const navToggle = document.getElementById("nav-toggle");
navToggle.addEventListener("click", () => {
  const isOpen = header.classList.toggle("nav-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.innerHTML = isOpen
    ? '<svg width="22" height="22"><use href="#icon-close"/></svg>'
    : '<svg width="22" height="22"><use href="#icon-menu"/></svg>';
});
document.querySelectorAll(".site-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    header.classList.remove("nav-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.innerHTML = '<svg width="22" height="22"><use href="#icon-menu"/></svg>';
  });
});
