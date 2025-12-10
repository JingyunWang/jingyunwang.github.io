// 简单的中英文切换：默认中文，点击 EN 显示英文
document.addEventListener("DOMContentLoaded", () => {
  const cnBtn = document.querySelector("[data-lang='cn']");
  const enBtn = document.querySelector("[data-lang='en']");

  function setLang(lang) {
    const cnBlocks = document.querySelectorAll(".lang-cn");
    const enBlocks = document.querySelectorAll(".lang-en");

    if (lang === "cn") {
      cnBlocks.forEach((el) => (el.style.display = "block"));
      enBlocks.forEach((el) => (el.style.display = "none"));
      document.documentElement.lang = "zh";
      cnBtn.classList.add("active");
      enBtn.classList.remove("active");
    } else {
      cnBlocks.forEach((el) => (el.style.display = "none"));
      enBlocks.forEach((el) => (el.style.display = "block"));
      document.documentElement.lang = "en";
      enBtn.classList.add("active");
      cnBtn.classList.remove("active");
    }
  }

  if (cnBtn && enBtn) {
    cnBtn.addEventListener("click", () => setLang("cn"));
    enBtn.addEventListener("click", () => setLang("en"));
  }

  // 默认中文
  setLang("cn");
});
