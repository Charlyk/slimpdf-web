import { getTranslations } from "next-intl/server"

import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { CompressTool } from "@/components/tools/compress-tool"
import { PricingSection } from "@/components/sections/pricing"
import { CompressHero } from "./compress-hero"
import { CompressUseCases } from "./compress-use-cases"
import { CompressTargetSizes } from "./compress-target-sizes"
import { CompressPlatforms } from "./compress-platforms"
import { CompressFeatures } from "./compress-features"
import { CompressHowItWorks } from "./compress-how-it-works"
import { CompressComparison } from "./compress-comparison"
import { CompressSEOContent } from "./compress-seo-content"
import { CompressFAQ } from "./compress-faq"
import { CompressRelatedTools } from "./compress-related-tools"
import { CompressCTA } from "./compress-cta"

export async function generateMetadata() {
  const t = await getTranslations("compress.metadata")

  return {
    title: t("title"),
    description: t("description"),
    keywords: "compress pdf online free, compress pdf for email, compress pdf to 5mb, compress pdf to 10mb, reduce pdf size, pdf compressor online, make pdf smaller, compress pdf on mac, compress pdf on windows",
    alternates: {
      canonical: "https://slimpdf.io/compress",
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      type: "website",
      url: "https://slimpdf.io/compress",
    },
  }
}

export default function CompressPage() {
  // Schema markup for SEO
  const webAppSchema = {
    "@context": "https://schema.org/",
    "@type": "WebApplication",
    "name": "SlimPDF Compress",
    "description": "Compress PDF files online free - reduce file size up to 90% with server-powered Ghostscript compression",
    "url": "https://slimpdf.io/compress",
    "applicationCategory": "Productivity",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "description": "Free PDF compression - 2 files per day"
    },
    "featureList": [
      "Compress PDF up to 90% smaller",
      "No quality loss",
      "No watermarks",
      "Target exact file size",
      "Batch processing"
    ]
  }

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Compress a PDF Online",
    "description": "Reduce PDF file size using SlimPDF's free online compressor",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Upload your PDF",
        "text": "Drag and drop your PDF file or click to browse. Files up to 20MB accepted on free tier."
      },
      {
        "@type": "HowToStep",
        "name": "Choose compression settings",
        "text": "Select compression level: Maximum (smallest file), Balanced, or Minimum (best quality)."
      },
      {
        "@type": "HowToStep",
        "name": "Download compressed PDF",
        "text": "Click download to get your compressed PDF. No registration required."
      }
    ]
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Will compression reduce my PDF quality?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SlimPDF uses intelligent compression that removes unnecessary data while preserving visual quality. Text stays crisp, images stay clear. For documents where quality is critical, use Minimum compression to prioritize appearance over file size."
        }
      },
      {
        "@type": "Question",
        "name": "How much smaller will my PDF get?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Results depend on your PDF content. Documents with many images typically compress 60-90%. Text-heavy PDFs may compress 20-50%. Scanned documents often see the best results."
        }
      },
      {
        "@type": "Question",
        "name": "How do I compress a PDF for email?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Upload your PDF, select Maximum compression, and download the result. If you need a specific size (like under 10MB for Gmail), upgrade to Pro and use the Target Size feature."
        }
      },
      {
        "@type": "Question",
        "name": "Is my PDF secure?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. All uploads use 256-bit SSL encryption. Files are processed in isolated containers and automatically deleted after 1 hour (free) or 24 hours (Pro). We never access or analyze your content."
        }
      },
      {
        "@type": "Question",
        "name": "Can I compress PDFs on my phone?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. SlimPDF works in mobile browsers on iPhone and Android. No app required. Just open slimpdf.io, upload your PDF, and download the compressed version."
        }
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          {/* Hero */}
          <CompressHero />

          {/* Tool - Primary CTA */}
          <section id="compress-tool" className="border-t-[3px] border-border bg-secondary-background py-16 sm:py-20 scroll-mt-20">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
              <CompressTool />
            </div>
          </section>

          {/* Use Cases - SEO keywords */}
          <CompressUseCases />

          {/* Target Sizes - SEO keywords */}
          <CompressTargetSizes />

          {/* How It Works */}
          <CompressHowItWorks />

          {/* Features */}
          <CompressFeatures />

          {/* Platforms - SEO keywords */}
          <CompressPlatforms />

          {/* Comparison Table */}
          <CompressComparison />

          {/* SEO Content */}
          <CompressSEOContent />

          {/* FAQ */}
          <CompressFAQ />

          {/* Pricing */}
          <PricingSection />

          {/* Related Tools */}
          <CompressRelatedTools />

          {/* Final CTA */}
          <CompressCTA />
        </main>
        <Footer />
      </div>
    </>
  )
}
