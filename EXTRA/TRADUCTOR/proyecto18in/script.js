i18next
  .use(i18nextHttpBackend)
  .use(i18nextBrowserLanguageDetector)
  .init({
    debug: true,
    fallbackLng: "es",
    backend: {
      loadPath: "locales/{{lng}}/translation.json"
    }
  }, function(err, t) {
    updateContent();
  });

function updateContent() {
  document.querySelectorAll("[data-i18n]").forEach(function(element) {
    element.innerHTML = i18next.t(element.getAttribute("data-i18n"));
  });
}

// cambio de idioma con selector
document.getElementById("languageSwitcher").addEventListener("change", function(e) {
  let lng = e.target.value;
  i18next.changeLanguage(lng, () => {
    updateContent();
  });
});
