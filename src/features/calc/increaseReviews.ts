import { Book } from "@/entites";

export function Func(
  books: Book[],
  targetAverage: number,
  text: string,
  reviewer: string,
  company: string
): Book[] {
  const totalBooks = books.length;
  if (!totalBooks) return books;

  const currentTotal = books.reduce((sum, b) => sum + b.reviews.length, 0);
  const targetTotal = Math.round(targetAverage * totalBooks);
  let diff = targetTotal - currentTotal;

  if (diff === 0) return books;

  const updated = books.map((b) => ({ ...b, reviews: [...b.reviews] }));

  const sortedIndices = updated
    .map((b, i) => [i, b.reviews.length] as const)
    .sort((a, b) => (diff > 0 ? a[1] - b[1] : b[1] - a[1]))
    .map(([i]) => i);

  let i = 0;
  while (diff !== 0) {
    const book = updated[sortedIndices[i % totalBooks]];
    if (diff > 0) {
      book.reviews.push({ text, reviewer, company });
      diff--;
    } else if (book.reviews.length > 0) {
      book.reviews.pop();
      diff++;
    }
    i++;
  }

  return updated;
}
