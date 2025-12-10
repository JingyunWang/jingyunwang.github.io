document.addEventListener("DOMContentLoaded", () => {
  // 默认语言
  let currentLang = "cn";

  function applyLang(lang) {
    currentLang = lang;

    document
      .querySelectorAll("[data-lang]")
      .forEach((el) => (el.style.display = el.dataset.lang === lang ? "" : "none"));

    document
      .querySelectorAll("[data-lang-switch]")
      .forEach((btn) => {
        if (btn.dataset.langSwitch === lang) {
          btn.classList.add("lang-btn-active");
        } else {
          btn.classList.remove("lang-btn-active");
        }
      });
  }

  // 语言切换按钮
  document.querySelectorAll("[data-lang-switch]").forEach((btn) => {
    btn.addEventListener("click", () => {
      applyLang(btn.dataset.langSwitch);
    });
  });

  applyLang("cn");

  // 导航当前高亮
  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-link").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === path) {
      link.classList.add("nav-link-active");
    }
  });
});
