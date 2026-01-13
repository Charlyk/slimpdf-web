import { getTranslations } from "next-intl/server"

import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/sections/hero"
import { HowItWorksSection } from "@/components/sections/how-it-works"
import { LiveToolSection } from "@/components/sections/live-tool"
import { UseCasesSection } from "@/components/sections/use-cases"
import { MarqueeFeaturesSection } from "@/components/sections/marquee-features"
import { FeaturesSection } from "@/components/sections/features"
import { TrustSignalsSection } from "@/components/sections/trust-signals"
import { PricingSection } from "@/components/sections/pricing"
import { FAQSection } from "@/components/sections/faq"
import { FinalCTASection } from "@/components/sections/final-cta"

export async function generateMetadata() {
  const t = await getTranslations("metadata")

  return {
    title: t("title"),
    description: t("description"),
    keywords: "compress pdf online, compress pdf documents online, pdf compression, reduce pdf size, pdf compressor free",
    openGraph: {
      title: t("title"),
      description: t("description"),
      type: "website",
      url: "https://slimpdf.io",
    },
  }
}

export default function Home() {
  // Schema markup for SEO
  const softwareAppSchema = {
    "@context": "https://schema.org/",
    "@type": "SoftwareApplication",
    "name": "SlimPDF",
    "description": "Compress PDF documents online free - up to 90% smaller with no signup required",
    "url": "https://slimpdf.io",
    "applicationCategory": "Productivity",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "description": "Free PDF compression"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "2500"
    }
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Does compression reduce PDF quality?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. SlimPDF uses intelligent compression that removes unnecessary data while preserving text clarity and image quality. We achieve up to 90% size reduction without making PDFs look blurry or illegible."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need to sign up to compress PDFs?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No sign-up required for our free tier. You can compress up to 2 PDFs per day without creating an account. For unlimited compressions, upgrade to Pro with just one click."
        }
      },
      {
        "@type": "Question",
        "name": "Can I compress PDF to 5MB, 3MB, 1MB, or under 500KB?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Our Target Exact Size feature lets you specify your desired file size (5MB, 3MB, 1MB, 500KB, etc.) and we'll compress your PDF until it reaches that target."
        }
      },
      {
        "@type": "Question",
        "name": "Can I compress PDFs on Mac, Windows, and Linux?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! SlimPDF is a web-based tool that works on any device with a browser—Mac, Windows, Linux, iPad, and more. No software installation needed."
        }
      },
      {
        "@type": "Question",
        "name": "Can I compress PDF files for email?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. Many email providers limit attachment sizes to 25MB. Our compression typically reduces files by 60-90%, making them ideal for email."
        }
      },
      {
        "@type": "Question",
        "name": "Are my files secure?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. All transfers use 256-bit encryption. Files are automatically deleted after 1 hour (free) or 24 hours (Pro). We never store or analyze your file contents."
        }
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <HeroSection />
          <LiveToolSection />
          <HowItWorksSection />
          <UseCasesSection />
          <MarqueeFeaturesSection />
          <FeaturesSection />
          <TrustSignalsSection />
          <PricingSection />
          <FAQSection />
          <FinalCTASection />
        </main>
        <Footer />
      </div>
    </>
  )
}
