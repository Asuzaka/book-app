import { LocaleDefinition, fr, de, en, ru, ja, ko } from "@faker-js/faker";

type language = {
  name: string;
  language: LocaleDefinition;
  text: string;
};
export const locales: language[] = [
  { name: "de", language: de, text: "Deutsch" },
  { name: "en", language: en, text: "English (US)" },
  { name: "ru", language: ru, text: "Русский" },
  { name: "ja", language: ja, text: "日本語" },
  { name: "fr", language: fr, text: "Français" },
  { name: "ko", language: ko, text: "한국어" },
  // And more...
];
