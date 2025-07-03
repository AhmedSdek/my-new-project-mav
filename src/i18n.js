// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// const resources = {
//   en: {
//     translation: {
//       welcome: "Welcome",
//       selectDeveloper: "Select Developer",
//       price: "Price",
//     },
//   },
//   ar: {
//     translation: {
//       welcome: "مرحبا",
//       selectDeveloper: "اختر المطور",
//       price: "السعر",
//     },
//   },
// };

i18n.use(initReactI18next).init({
  // resources,
  lng: "en", // اللغة الافتراضية
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
