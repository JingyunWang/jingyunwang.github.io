// Language switch + mobile navigation drawer
// Requirements:
// 1) <html data-lang="zh|en">
// 2) Page contains .lang-zh and .lang-en blocks (CSS controls display)
// 3) Any language buttons use data-set-lang="zh|en"
document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  if (!root) return;

  // ---------- Language ----------
  const STORAGE_KEY = "yunisle-lang";
  const langBtnsZh = Array.from(document.querySelectorAll('[data-set-lang="zh"]'));
  const langBtnsEn = Array.from(document.querySelectorAll('[data-set-lang="en"]'));

  const savedLang = window.localStorage.getItem(STORAGE_KEY);
  const initialLang = savedLang === "en" ? "en" : "zh";
  setLang(initialLang);

  langBtnsZh.forEach((btn) =>
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      setLang("zh");
    })
  );
  langBtnsEn.forEach((btn) =>
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      setLang("en");
    })
  );

  function setLang(lang) {
    if (lang !== "zh" && lang !== "en") lang = "zh";
    root.setAttribute("data-lang", lang);

    // active state
    const all = [...langBtnsZh, ...langBtnsEn];
    all.forEach((b) => b.classList.remove("active"));
    if (lang === "zh") langBtnsZh.forEach((b) => b.classList.add("active"));
    if (lang === "en") langBtnsEn.forEach((b) => b.classList.add("active"));

    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch (err) {
      console.warn("Language preference could not be saved:", err);
    }
  }

  // ---------- Active nav highlight ----------
  const path = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll('a[href]').forEach((a) => {
    const href = (a.getAttribute("href") || "").toLowerCase();
    if (!href) return;
    // Exact match for local pages
    if (href === path) a.classList.add("active");
    // Home alias
    if (path === "" && href === "index.html") a.classList.add("active");
  });

  // ---------- Mobile drawer ----------
  const drawer = document.querySelector(".nav-drawer");
  const overlay = document.querySelector(".nav-overlay");
  const openers = Array.from(document.querySelectorAll("[data-nav-open]"));
  const closers = Array.from(document.querySelectorAll("[data-nav-close]"));

  function openDrawer() {
    if (!drawer || !overlay) return;
    drawer.classList.add("is-open");
    overlay.classList.add("is-open");
    drawer.setAttribute("aria-hidden", "false");
    openers.forEach((b) => b.setAttribute("aria-expanded", "true"));
    document.body.style.overflow = "hidden";
  }
  function closeDrawer() {
    if (!drawer || !overlay) return;
    drawer.classList.remove("is-open");
    overlay.classList.remove("is-open");
    drawer.setAttribute("aria-hidden", "true");
    openers.forEach((b) => b.setAttribute("aria-expanded", "false"));
    document.body.style.overflow = "";
  }

  openers.forEach((b) => b.addEventListener("click", (e) => { e.preventDefault(); openDrawer(); }));
  closers.forEach((b) => b.addEventListener("click", (e) => { e.preventDefault(); closeDrawer(); }));
  overlay?.addEventListener("click", closeDrawer);

  // Close drawer when clicking a link
  drawer?.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeDrawer));

  // Esc to close
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeDrawer();
  });
});
