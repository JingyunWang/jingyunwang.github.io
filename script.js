// script.js
// 负责中 / 英文切换。依赖：
// 1. <html data-lang="zh"> 这个属性
// 2. 页面中有 .lang-zh 与 .lang-en 两种内容块
// 3. 顶部有 #lang-zh 与 #lang-en 两个按钮

document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const btnZh = document.getElementById("lang-zh");
  const btnEn = document.getElementById("lang-en");

  // 安全兜底：如果没有按钮，直接返回，避免报错
  if (!root || (!btnZh && !btnEn)) return;

  const STORAGE_KEY = "yunisle-lang";

  // 从 localStorage 读取上次选择；默认中文
  const savedLang = window.localStorage.getItem(STORAGE_KEY);
  const initialLang = savedLang === "en" ? "en" : "zh";

  setLang(initialLang);

  if (btnZh) {
    btnZh.addEventListener("click", (e) => {
      e.preventDefault();
      setLang("zh");
    });
  }

  if (btnEn) {
    btnEn.addEventListener("click", (e) => {
      e.preventDefault();
      setLang("en");
    });
  }

  /**
   * 切换语言
   * @param {"zh" | "en"} lang
   */
  function setLang(lang) {
    if (lang !== "zh" && lang !== "en") lang = "zh";

    // 设置在 <html> 上，CSS 里根据 data-lang 控制显示
    root.setAttribute("data-lang", lang);

    // 按钮高亮切换（配合 .lang-btn.active 与 CSS 渐变滑块）
    if (btnZh && btnEn) {
      if (lang === "zh") {
        btnZh.classList.add("active");
        btnEn.classList.remove("active");
      } else {
        btnEn.classList.add("active");
        btnZh.classList.remove("active");
      }
    }

    // 记住选择
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch (err) {
      // 如果用户禁用存储，就静默忽略，不影响页面使用
      console.warn("Language preference could not be saved:", err);
    }
  }
});

// ====== Mobile drawer nav (append) ======
document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const openers = document.querySelectorAll(".nav-toggle, .nav-fab");
  const closers = document.querySelectorAll("[data-nav-close]");
  const drawer = document.getElementById("mobile-drawer");

  function setOpen(isOpen) {
    if (!root) return;
    root.classList.toggle("nav-open", isOpen);

    // aria-expanded sync
    openers.forEach((btn) => btn.setAttribute("aria-expanded", String(isOpen)));

    if (!isOpen) return;
    // focus first link for accessibility (optional but nice)
    const firstLink = drawer?.querySelector("a");
    firstLink?.focus?.();
  }

  openers.forEach((btn) => {
    btn?.addEventListener("click", () => setOpen(true));
  });
  closers.forEach((btn) => {
    btn?.addEventListener("click", () => setOpen(false));
  });

  // close on ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setOpen(false);
  });

  // drawer language buttons (do not break your original logic)
  const zhM = document.getElementById("lang-zh-m");
  const enM = document.getElementById("lang-en-m");

  function applyLang(lang) {
    if (!root) return;
    if (lang !== "zh" && lang !== "en") lang = "zh";
    root.setAttribute("data-lang", lang);
    try { window.localStorage.setItem("yunisle-lang", lang); } catch(_) {}

    // sync desktop buttons if present
    const zh = document.getElementById("lang-zh");
    const en = document.getElementById("lang-en");
    if (zh && en) {
      zh.classList.toggle("active", lang === "zh");
      en.classList.toggle("active", lang === "en");
    }
  }

  zhM?.addEventListener("click", (e) => { e.preventDefault(); applyLang("zh"); setOpen(false); });
  enM?.addEventListener("click", (e) => { e.preventDefault(); applyLang("en"); setOpen(false); });
});





