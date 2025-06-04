"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function ErrorPage() {
  const params = useSearchParams();
  const code = params.get("code") || "Error";
  const message = decodeURIComponent(
    params.get("message") || "An unknown error occurred."
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-white text-center">
      <h1 className="text-5xl font-bold text-red-500 mb-4">{code}</h1>
      <p className="text-lg text-gray-700 mb-6 max-w-xl">{message}</p>
      <Link href="/" className="text-blue-600 hover:underline font-medium">
        Go back home
      </Link>
    </div>
  );
}
