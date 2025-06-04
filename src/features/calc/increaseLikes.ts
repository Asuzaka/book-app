import { Book } from "@/entites";

export function Func(books: Book[], a: number, limit = 10): Book[] {
  return books.map((book) => {
    if (book.likes > a) return book;

    const min = Math.floor(a) + 1;
    const rand = Math.random() * Math.max(limit - min, 0);
    const likes = Math.min(limit, Math.round((min + rand) * 10) / 10);

    return { ...book, likes };
  });
}
