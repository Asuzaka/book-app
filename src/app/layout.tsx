import type { Metadata } from "next";
import { Suspense } from "react";

import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased px-2">
        <Suspense fallback={null}>{children}</Suspense>
      </body>
    </html>
  );
}
