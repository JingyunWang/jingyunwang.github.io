// 语言切换：通过给 body 加 data-lang 属性控制显示哪种内容
function setLang(lang) {
  document.body.setAttribute("data-lang", lang);
  const zhSpan = document.querySelector(".lang-toggle span[data-lang='zh']");
  const enSpan = document.querySelector(".lang-toggle span[data-lang='en']");
  if (zhSpan && enSpan) {
    zhSpan.classList.toggle("active", lang === "zh");
    enSpan.classList.toggle("active", lang === "en");
  }
}

// 初始化：默认中文
document.addEventListener("DOMContentLoaded", () => {
  // 如果希望记住上次选择的语言，可用 localStorage
  const saved = window.localStorage.getItem("yunisle-lang");
  if (saved === "en" || saved === "zh") {
    setLang(saved);
  } else {
    setLang("zh");
  }

  const zhBtn = document.querySelector(".lang-toggle span[data-lang='zh']");
  const enBtn = document.querySelector(".lang-toggle span[data-lang='en']");
  if (zhBtn) {
    zhBtn.addEventListener("click", () => {
      setLang("zh");
      window.localStorage.setItem("yunisle-lang", "zh");
    });
  }
  if (enBtn) {
    enBtn.addEventListener("click", () => {
      setLang("en");
      window.localStorage.setItem("yunisle-lang", "en");
    });
  }

  // 移动端菜单
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });
  }
});
