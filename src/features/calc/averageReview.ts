import { Book } from "@/entites";

export function Func(books: Book[]): number {
  if (!books.length) return 0;

  const total = books.length;
  const sum = books.reduce((acc, b) => acc + b.reviews.length, 0);

  return parseFloat((sum / total).toFixed(1));
}
