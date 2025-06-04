export type Book = {
  index: number;
  isbn: string;
  title: string;
  authors: string;
  publisher: string;
  year: number;
  likes: number;
  coverUrl: string;
  reviews: {
    text: string;
    reviewer: string;
    company: string;
  }[];
};
