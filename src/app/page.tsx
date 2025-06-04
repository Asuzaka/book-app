"use client";

import { Book } from "@/entites";
import { AverageReview, IncreaseLikes } from "@/features";
import { i18n, initializeI18n } from "@/shared/i18n/i18n";
import {
  Card,
  ExpandedCard,
  Lanugage,
  Likes,
  Loader,
  Review,
  Row,
  Seed,
  ViewMode,
} from "@/widgets";
import { redirect } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

export default function Home() {
  const [language, setLangueage] = useState<string>("");
  const [seed, setSeed] = useState<number>(0);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<"table" | "gallery">("table");
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [review, setReview] = useState<number>(0);
  const [likes, setLikes] = useState<number>(0);

  const page = useRef(3);
  const isLoading = useRef(false);
  const { t } = useTranslation();

  const getBooks = useCallback(
    async function getBooks(lng: string) {
      try {
        isLoading.current = true;
        const response = await fetch(
          `http://localhost:3000/api/${lng}/${seed}?page=1`
        );
        const response2 = await fetch(
          `http://localhost:3000/api/${lng}/${seed}?page=2`
        );
        const data = await response.json();
        const data2 = await response2.json();
        setBooks([...data.books, ...data2.books]);
        isLoading.current = false;
      } catch {
        redirect(
          `/error-page?code=500&message=There was an error loading books`
        );
      }
    },
    [seed]
  );

  const LoadBooks = useCallback(
    async function getBooks() {
      try {
        isLoading.current = true;
        setLoading(true);
        const response = await fetch(
          `http://localhost:3000/api/${language}/${seed}?page=${page.current}`
        );
        const data = await response.json();

        setBooks((prev) => [...prev, ...data.books]);
        page.current = page.current + 1;
        isLoading.current = false;
        setLoading(false);
      } catch {
        redirect(
          `/error-page?code=500&message=There was an error loading more books`
        );
      }
    },
    [seed, language]
  );

  const handleScroll = useCallback(() => {
    const { scrollY, innerHeight } = window;
    const { scrollHeight } = document.documentElement;
    if (scrollY + innerHeight >= scrollHeight && !isLoading.current) {
      LoadBooks();
    }
  }, [LoadBooks]);

  useEffect(() => {
    setReview(AverageReview(books));
  }, [books]);

  useEffect(() => {
    setBooks((prev) => IncreaseLikes(prev, likes));
  }, [likes]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    initializeI18n().then(() => {
      getBooks(i18n.language);
      setLangueage(i18n.language);
    });

    const handleLanguageChanged = (lng: string) => {
      getBooks(lng);
      setLangueage(i18n.language);
      page.current = 3;
      window.scrollTo({ top: 0 });
    };

    i18n.on("languageChanged", handleLanguageChanged);

    return () => {
      i18n.off("languageChanged", handleLanguageChanged);
    };
  }, [getBooks]);

  return (
    <div className="pb-4">
      <div className="fixed top-0 left-0 z-30 w-full bg-white p-4 shadow-sm flex flex-wrap items-center gap-10">
        <Lanugage />
        <Seed seed={seed} setSeed={setSeed} />
        <Likes likes={likes} setLikes={setLikes} />
        <Review review={review} />
        <ViewMode
          viewMode={viewMode}
          setViewMode={setViewMode}
          setExpandedIndex={setExpandedIndex}
        />
      </div>

      {viewMode === "table" ? (
        <>
          <div className="fixed top-[98px] left-0 z-20 w-full bg-white border-b-2 font-semibold flex">
            <div className="p-2 w-10" />
            <div className="p-2 w-10">#</div>
            <div className="p-2 flex-1">{t("isbn")}</div>
            <div className="p-2 flex-1">{t("title")}</div>
            <div className="p-2 flex-1">{t("authors")}</div>
            <div className="p-2 flex-1">{t("publisher")}</div>
          </div>
          <div className="pt-[150px]">
            {books.map((each) => (
              <Row key={each.isbn} book={each} />
            ))}
          </div>
        </>
      ) : (
        <div className="pt-[150px] flex flex-wrap gap-4">
          {books.map((book, i) =>
            expandedIndex === i ? (
              <ExpandedCard
                key={book.isbn}
                book={book}
                onClick={() => setExpandedIndex(null)}
              />
            ) : (
              <Card
                key={book.isbn}
                book={book}
                onClick={() => setExpandedIndex(i)}
              />
            )
          )}
        </div>
      )}

      {loading && <Loader />}
    </div>
  );
}
