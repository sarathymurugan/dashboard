import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        "Dashboard": "Dashboard",
        "Home": "Home",
        "Analytics": "Analytics",
        "Settings": "Settings",
        "Upload CSV": "Upload CSV",
        "Export CSV": "Export CSV",
        "Export PDF": "Export PDF",
        "User Data": "User Data",
      },
    },
    es: {
      translation: {
        "Dashboard": "Tablero",
        "Home": "Inicio",
        "Analytics": "Analíticas",
        "Settings": "Configuraciones",
        "Upload CSV": "Subir CSV",
        "Export CSV": "Exportar CSV",
        "Export PDF": "Exportar PDF",
        "User Data": "Datos del Usuario",
      },
    },
    ta: {
      translation: {
        "Dashboard": "டாஷ்போர்ட்",
        "Home": "முகப்பு",
        "Analytics": "பகுப்பாய்வு",
        "Settings": "அமைப்புகள்",
        "Upload CSV": "CSV பதிவேற்று",
        "Export CSV": "CSV ஏற்றுமதி",
        "Export PDF": "PDF ஏற்றுமதி",
        "User Data": "பயனர் தரவு",
      },
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
