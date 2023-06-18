import i18next from "i18next";
import ns1 from "./locales/en/common.json";
import ns2 from "./locales/mm/common.json";
import { initReactI18next } from "react-i18next";

export const defaultNS = "ns1";
export const resources = {
  en: {
    translation: ns1,
  },
  mm: {
    translation: ns2,
  },
};

i18next.use(initReactI18next).init({
  lng: "mm",
  resources,
});

export default i18next;
