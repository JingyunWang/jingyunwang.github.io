(function () {
  const html = document.documentElement;
  const zhBtn = document.getElementById("lang-zh-btn");
  const enBtn = document.getElementById("lang-en-btn");

  function setLang(lang) {
    html.setAttribute("data-lang", lang);
    if (zhBtn && enBtn) {
      if (lang === "zh") {
        zhBtn.classList.add("active");
        enBtn.classList.remove("active");
      } else {
        enBtn.classList.add("active");
        zhBtn.classList.remove("active");
      }
    }
    try {
      localStorage.setItem("siteLang", lang);
    } catch (e) {}
  }

  const saved =
    (typeof window !== "undefined" &&
      window.localStorage &&
      localStorage.getItem("siteLang")) ||
    "zh";
  setLang(saved);

  if (zhBtn) {
    zhBtn.addEventListener("click", () => setLang("zh"));
  }
  if (enBtn) {
    enBtn.addEventListener("click", () => setLang("en"));
  }
})();
