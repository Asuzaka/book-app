"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error("Unhandled error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gray-100 text-center">
      <h1 className="text-4xl font-bold text-red-600 mb-4">
        Something went wrong
      </h1>
      <p className="text-gray-700 mb-6">{error.message}</p>
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Try again
        </button>
        <button
          onClick={() => router.push("/")}
          className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}
