document.addEventListener("DOMContentLoaded", function () {
  var htmlEl = document.documentElement;
  var zhBtn = document.getElementById("lang-zh");
  var enBtn = document.getElementById("lang-en");

  function setLanguage(lang) {
    if (lang !== "zh" && lang !== "en") lang = "zh";
    htmlEl.setAttribute("data-lang", lang);
    try {
      localStorage.setItem("yunisle-lang", lang);
    } catch (e) {
      // 忽略本地存储错误
    }
    if (zhBtn && enBtn) {
      if (lang === "zh") {
        zhBtn.classList.add("active");
        enBtn.classList.remove("active");
      } else {
        enBtn.classList.add("active");
        zhBtn.classList.remove("active");
      }
    }
  }

  // 初始化语言
  var stored = null;
  try {
    stored = localStorage.getItem("yunisle-lang");
  } catch (e) {
    stored = null;
  }
  setLanguage(stored || "zh");

  if (zhBtn) {
    zhBtn.addEventListener("click", function () {
      setLanguage("zh");
    });
  }
  if (enBtn) {
    enBtn.addEventListener("click", function () {
      setLanguage("en");
    });
  }

  // 导航高亮
  var path = window.location.pathname || "";
  var page = path.substring(path.lastIndexOf("/") + 1);
  if (!page || page === "/") {
    page = "index.html";
  }
  var navLinks = document.querySelectorAll(".site-nav a");
  navLinks.forEach(function (link) {
    var href = link.getAttribute("href");
    if (href && href === page) {
      link.classList.add("active");
    }
  });
});
