"use client";

import { Book } from "@/entites";
import { AdjustReviews } from "@/features";
import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  review: number;
  setBooks: Dispatch<SetStateAction<Book[]>>;
};

export function Widget({ review, setBooks }: Props) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col border rounded px-3 py-2">
      <label className="text-sm text-gray-500 mb-1">{t("review")}</label>
      <input
        type="number"
        value={review}
        step={0.1}
        onChange={(e) => {
          const value = Number(e.target.value);
          if (isNaN(value)) return;
          setBooks((prev) =>
            AdjustReviews(prev, value, t("text"), t("reviewer"), t("company"))
          );
        }}
        className="w-[80px] cursor-pointer"
      />
    </div>
  );
}
