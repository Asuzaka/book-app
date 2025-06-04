"use client";

import { LOCALES_FAKER } from "@/shared";
import React, { useEffect, useState } from "react";
import { i18n, changeLanguage } from "@/shared/i18n/i18n";
import { useTranslation } from "react-i18next";

export function Widget() {
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
  const [isChanging, setIsChanging] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const handleLanguageChanged = (lang: string) => {
      setCurrentLanguage(lang);
      setIsChanging(false);
    };

    i18n.on("languageChanged", handleLanguageChanged);
    return () => {
      i18n.off("languageChanged", handleLanguageChanged);
    };
  }, []);

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = e.target.value;
    setIsChanging(true);
    try {
      await changeLanguage(newLanguage);
    } catch (error) {
      console.error("Failed to change language:", error);
      setIsChanging(false);
    }
  };

  return (
    <div className="flex flex-col border rounded p-2">
      <label className="text-sm text-gray-500 mb-1">
        {isChanging ? t("loadingLang") : t("language")}
      </label>
      <select
        className={`min-w-[160px] border-none outline-none bg-transparent appearance-none ${
          isChanging ? "cursor-wait opacity-75" : "cursor-pointer"
        }`}
        value={currentLanguage}
        onChange={handleChange}
        disabled={isChanging}
      >
        {LOCALES_FAKER.map((each) => (
          <option key={each.name} value={each.name}>
            {each.text}
          </option>
        ))}
      </select>
    </div>
  );
}
