document.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("yunisle-lang");
  const defaultLang = saved === "en" ? "en" : "zh";
  setLang(defaultLang);

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const lang = btn.getAttribute("data-set-lang");
      setLang(lang);
    });
  });

  function setLang(lang) {
    document.body.classList.toggle("lang-zh", lang === "zh");
    document.body.classList.toggle("lang-en", lang === "en");

    document.querySelectorAll("[data-lang]").forEach((el) => {
      const elLang = el.getAttribute("data-lang");
      el.style.display = elLang === lang ? "" : "none";
    });

    document.querySelectorAll(".lang-btn").forEach((btn) => {
      const btnLang = btn.getAttribute("data-set-lang");
      btn.classList.toggle("active", btnLang === lang);
    });

    localStorage.setItem("yunisle-lang", lang);
  }
});
