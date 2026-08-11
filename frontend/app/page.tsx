import type { Metadata } from "next";
import { PortfolioExperience } from "./components/portfolio-experience";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ramsha Jawaid",
    jobTitle: "Agenti AI Engineer",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Karachi",
      addressCountry: "PK",
    },
    email: "mailto:rijienterprise@gmail.com",
    telephone: "+923132638263",
    url: "https://ramsha-jawaid.vercel.app",
    sameAs: ["https://github.com/roxyross", "https://vercel.com/roxyross-projects"],
    knowsAbout: [
      "Next.js",
      "React",
      "TypeScript",
      "SEO optimization",
      "Lazy loading",
      "FastAPI",
      "E-commerce operations",
      "AI agent workflows",
      "Agenti AI engineering",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PortfolioExperience />
    </>
  );
}
