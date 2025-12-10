// 语言切换：在 <html> 标签上切换 data-lang=cn/en
(function () {
  const root = document.documentElement;
  const buttons = document.querySelectorAll(".lang-btn");

  function setLang(lang) {
    root.setAttribute("data-lang", lang);
    buttons.forEach((btn) => {
      if (btn.dataset.langToggle === lang) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });
  }

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const lang = btn.dataset.langToggle;
      setLang(lang);
    });
  });

  // 默认中文
  setLang("cn");
})();
