// Language toggle handler
function setLanguage(lang) {
  const body = document.body;
  const cnBtn = document.getElementById("lang-cn-btn");
  const enBtn = document.getElementById("lang-en-btn");

  if (!body || !cnBtn || !enBtn) return;

  if (lang === "en") {
    body.classList.add("en");
    enBtn.classList.add("active");
    cnBtn.classList.remove("active");
    localStorage.setItem("yunisle-lang", "en");
  } else {
    body.classList.remove("en");
    cnBtn.classList.add("active");
    enBtn.classList.remove("active");
    localStorage.setItem("yunisle-lang", "cn");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Load saved language preference
  const saved = localStorage.getItem("yunisle-lang");
  setLanguage(saved === "en" ? "en" : "cn");

  const cnBtn = document.getElementById("lang-cn-btn");
  const enBtn = document.getElementById("lang-en-btn");

  if (cnBtn) {
    cnBtn.addEventListener("click", () => setLanguage("cn"));
  }

  if (enBtn) {
    enBtn.addEventListener("click", () => setLanguage("en"));
  }
});
