"use client";

import Image from "next/image";
import { Book } from "@/entites";
import { useTranslation } from "react-i18next";
import { AiFillLike } from "react-icons/ai";

type Props = {
  book: Book;
  onClick: () => void;
};

export function Widget({ book, onClick }: Props) {
  const { t } = useTranslation();
  return (
    <div
      onClick={onClick}
      className="w-full bg-gray-50 p-4 border rounded shadow"
    >
      <div className="flex gap-4">
        <div className="flex flex-col">
          <Image
            src={book.coverUrl}
            alt="Book Cover"
            width={128}
            height={192}
            className="object-contain"
          />
          <button className="self-center flex w-[50%] rounded-3xl justify-center gap-1 items-center mt-3 bg-blue-500 text-white cursor-pointer">
            {book.likes} <AiFillLike />
          </button>
        </div>
        <div>
          <h2 className="text-xl font-semibold">
            {book.title} <span className="text-gray-400">{t("paperback")}</span>
          </h2>
          <p className="italic">
            {t("by")} <strong>{book.authors}</strong>
          </p>
          <p className="text-gray-600">
            {book.publisher}, {book.year}
          </p>
          <h3 className="mt-2 font-medium">{t("review")}</h3>
          <ul className="space-y-2 mt-2">
            {book.reviews.map((review, i) => (
              <li key={i} className="text-sm">
                “{review.text}”<br />
                <span className="text-gray-500 italic">
                  — {review.reviewer}, {review.company}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
