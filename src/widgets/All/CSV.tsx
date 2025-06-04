import { Book } from "@/entites";

type Props = {
  books: Book[];
  handleExport: (books: Book[]) => void;
};

export function Widget({ books, handleExport }: Props) {
  return (
    <button
      onClick={() => handleExport(books)}
      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
    >
      Export to CSV
    </button>
  );
}
