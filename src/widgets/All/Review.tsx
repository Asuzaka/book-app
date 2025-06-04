"use client";

import { useTranslation } from "react-i18next";

type Props = {
  review: number;
};

export function Widget({ review }: Props) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col border rounded px-3 py-2">
      <label className="text-sm text-gray-500 mb-1">{t("review")}</label>
      <input
        type="number"
        defaultValue={review}
        readOnly
        className="w-[80px] cursor-pointer"
      />
    </div>
  );
}
