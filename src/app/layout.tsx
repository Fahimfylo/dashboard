import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dashboard App",
  description: "User Management Dashboard with Next.js + TypeScript + Tailwind",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <main className="max-w-6xl mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}
