import { LANGUAGES } from "./languages.js";
import { initI18n, setLanguage, getStoredLanguage } from "./i18n.js";

document.getElementById("footer-year").textContent = new Date().getFullYear();

/* Language picker */
const langPicker = document.getElementById("lang-picker");
const langToggle = document.getElementById("lang-picker-toggle");
const langMenu = document.getElementById("lang-picker-menu");
const langCurrent = document.getElementById("lang-picker-current");

function renderLangMenu(activeCode) {
  langMenu.innerHTML = "";
  LANGUAGES.forEach((lang) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.type = "button";
    btn.setAttribute("role", "option");
    btn.setAttribute("aria-selected", String(lang.code === activeCode));
    btn.dataset.lang = lang.code;
    btn.innerHTML = `<span>${lang.label}</span>`;
    btn.addEventListener("click", async () => {
      await setLanguage(lang.code);
      closeLangMenu();
    });
    li.appendChild(btn);
    langMenu.appendChild(li);
  });
  const active = LANGUAGES.find((l) => l.code === activeCode);
  langCurrent.textContent = active ? active.short : activeCode.toUpperCase();
}

function openLangMenu() {
  langPicker.classList.add("open");
  langToggle.setAttribute("aria-expanded", "true");
}
function closeLangMenu() {
  langPicker.classList.remove("open");
  langToggle.setAttribute("aria-expanded", "false");
}
langToggle.addEventListener("click", () => {
  langPicker.classList.contains("open") ? closeLangMenu() : openLangMenu();
});
document.addEventListener("click", (e) => {
  if (!langPicker.contains(e.target)) closeLangMenu();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLangMenu();
});

document.addEventListener("languagechange", (e) => renderLangMenu(e.detail.code));

renderLangMenu(getStoredLanguage());
initI18n();

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

/* Contact form -> mailto */
const contactForm = document.getElementById("contact-form");
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(contactForm);
  const name = data.get("name") || "";
  const email = data.get("email") || "";
  const area = data.get("area") || "";
  const message = data.get("message") || "";

  const subject = `Property enquiry from ${name}`;
  const bodyLines = [
    message,
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    area ? `Property area: ${area}` : null,
  ].filter(Boolean);

  const mailto = `mailto:info@athenshomemanagement.gr?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join("\n"))}`;
  window.location.href = mailto;
});
