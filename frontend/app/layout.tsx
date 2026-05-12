import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ramsha Jawaid | Full-Stack Developer",
  description:
    "Cyberpunk portfolio for Ramsha Jawaid, full-stack web developer, e-commerce specialist, and AI agent developer in Karachi, Pakistan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
