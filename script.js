// 语言切换 & 当前导航高亮
document.addEventListener("DOMContentLoaded", function () {
  const defaultLang = localStorage.getItem("yunisle-lang") || "zh";
  setLanguage(defaultLang);

  const langButtons = document.querySelectorAll("[data-lang-switch]");
  langButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const lang = btn.getAttribute("data-lang-switch");
      setLanguage(lang);
      localStorage.setItem("yunisle-lang", lang);
    });
  });

  // 根据当前路径高亮导航
  const path = window.location.pathname;
  const navLinks = document.querySelectorAll(".nav-links a");
  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (path.endsWith(href) || (path === "/" && href === "index.html")) {
      link.classList.add("nav-active");
    }
  });
});

function setLanguage(lang) {
  const nodes = document.querySelectorAll(".lang");
  nodes.forEach((node) => {
    if (node.getAttribute("data-lang") === lang) {
      node.style.display = "";
    } else {
      node.style.display = "none";
    }
  });

  const buttons = document.querySelectorAll("[data-lang-switch]");
  buttons.forEach((btn) => {
    const isActive = btn.getAttribute("data-lang-switch") === lang;
    btn.classList.toggle("active", isActive);
  });
}
