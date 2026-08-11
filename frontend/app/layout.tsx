import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ramsha-jawaid.vercel.app"),
  title: {
    default: "Ramsha Jawaid | Agenti AI Engineer, Full-Stack Developer & SEO-Focused Builder",
    template: "%s | Ramsha Jawaid",
  },
  description:
    "Portfolio for Ramsha Jawaid, an Agenti AI Engineer and full-stack web developer, Nexeagent intern, SEO optimization learner, e-commerce specialist, and AI agent developer in Karachi, Pakistan.",
  keywords: [
    "Ramsha Jawaid",
    "Agenti AI Engineer",
    "Full Stack Developer Karachi",
    "Nexeagent intern",
    "SEO optimization",
    "Next.js developer",
    "React developer",
    "AI agent developer",
    "E-commerce specialist",
  ],
  authors: [{ name: "Ramsha Jawaid" }],
  creator: "Ramsha Jawaid",
  openGraph: {
    title: "Ramsha Jawaid | Agenti AI Engineer",
    description:
      "Agenti AI Engineer portfolio covering AI agent workflows, web apps, SEO optimization, lazy-loading performance work, and e-commerce operations.",
    type: "website",
    locale: "en_PK",
    siteName: "Ramsha Jawaid Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ramsha Jawaid | Agenti AI Engineer",
    description:
      "Agenti AI Engineer and Nexeagent intern focused on AI agent workflows and performant, SEO-aware web applications.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
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
