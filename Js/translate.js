// Js/translate.js
// يقوم بتحميل ملف JSON للغة المختارة ويطبّق النصوص على عناصر data-translate

const languageSelect = document.getElementById("languageSelect");

// تحميل ملف JSON وتطبيق الترجمة
async function loadLanguage(lang) {
  try {
    const res = await fetch(`langs/${lang}.json`);
    if (!res.ok) throw new Error("Failed to load language file: " + res.status);
    const translations = await res.json();

    document.querySelectorAll("[data-translate]").forEach(el => {
      const key = el.getAttribute("data-translate");
      // لو العنصر رابط <a> بدون href، اتركه كسطر نصي
      if (translations[key]) {
        el.innerHTML = translations[key];
      } else {
        // لو المفتاح غير موجود ضع المفتاح نفسه (لتسهيل التصحيح)
        el.innerHTML = el.innerHTML || "";
      }
    });

    // ضبط اتجاه النص
    document.documentElement.lang = lang;
    if (lang === "ar") {
      document.body.style.direction = "rtl";
      document.body.style.textAlign = "right";
    } else {
      document.body.style.direction = "ltr";
      document.body.style.textAlign = "left";
    }
  } catch (err) {
    console.error("Translation error:", err);
  }
}

// عندما يختار المستخدم لغة من القائمة
if (languageSelect) {
  languageSelect.addEventListener("change", () => {
    const lang = languageSelect.value;
    localStorage.setItem("lang", lang);
    loadLanguage(lang);
  });

  // تحميل اللغة المحفوظة مسبقًا أو الإنجليزية افتراضيًا
  const savedLang = localStorage.getItem("lang") || "en";
  languageSelect.value = savedLang;
  loadLanguage(savedLang);
} else {
  console.warn("languageSelect element not found. تأكد من وجود عنصر select#languageSelect في index.html");
}
