"use client";

import { Book } from "@/entites";
import Image from "next/image";

type Props = { book: Book; onClick: () => void };

export function Widget({ book, onClick }: Props) {
  return (
    <div
      className="cursor-pointer p-2 border rounded shadow hover:shadow-md transition w-full sm:w-[calc(25%-1rem)]"
      onClick={onClick}
    >
      <Image
        src={book.coverUrl}
        alt="Book Cover"
        width={128}
        height={192}
        className="mx-auto object-contain"
      />
      <p className="mt-2 text-center font-medium text-sm">{book.title}</p>
    </div>
  );
}
