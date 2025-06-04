import Papa from "papaparse";
import { Book } from "@/entites";

export function Func(books: Book[]) {
  const booksForCsv = books.map((book) => ({
    ...book,
    reviews: JSON.stringify(book.reviews),
  }));

  const csv = Papa.unparse(booksForCsv);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "books.csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
