import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { LANGUAGE_STORAGE_KEY, supportedLanguages } from "@/shared/index";
import { redirect } from "next/navigation";

declare module "i18next" {
  interface CustomTypeOptions {
    returnNull: false;
  }
}

type SupportedLanguage = (typeof supportedLanguages)[number];

const resources = {};

i18n.use(initReactI18next).init({
  resources,
  supportedLngs: supportedLanguages,
  interpolation: {
    escapeValue: false,
  },
  returnNull: false,
  react: {
    useSuspense: false,
  },
});

const loadLanguage = async (lang: string): Promise<boolean> => {
  if (!supportedLanguages.includes(lang as SupportedLanguage)) {
    throw new Error(`Language ${lang} is not supported`);
  }

  if (i18n.hasResourceBundle(lang, "translation")) {
    return true;
  }

  try {
    const response = await fetch(`/locales/${lang}.json`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const translation = await response.json();
    i18n.addResourceBundle(lang, "translation", translation);
    return true;
  } catch (error) {
    console.error(`Could not load ${lang} translations`, error);
    throw error;
  }
};

const changeLanguage = async (lang: string): Promise<void> => {
  if (i18n.language === lang) return;

  await loadLanguage(lang);
  await i18n.changeLanguage(lang);

  if (typeof window !== "undefined") {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    document.documentElement.lang = lang;
  }
};

const initializeI18n = async (): Promise<void> => {
  if (typeof window === "undefined") return;

  const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);

  if (
    savedLanguage &&
    supportedLanguages.includes(savedLanguage as SupportedLanguage)
  ) {
    await loadLanguage(savedLanguage);
    await i18n.changeLanguage(savedLanguage);
    document.documentElement.lang = savedLanguage;
    return;
  }

  const browserLanguage = navigator.language.split("-")[0];

  if (supportedLanguages.includes(browserLanguage as SupportedLanguage)) {
    await loadLanguage(browserLanguage);
    await i18n.changeLanguage(browserLanguage);
    document.documentElement.lang = browserLanguage;
    return;
  }

  redirect(
    `/error-page?message=Neither saved language nor browser language (${browserLanguage}) is supported`
  );
};

export {
  i18n,
  loadLanguage,
  changeLanguage,
  initializeI18n,
  supportedLanguages,
};
