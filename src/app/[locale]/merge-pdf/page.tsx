import { getTranslations } from "next-intl/server"

import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { MergeTool } from "@/components/tools/merge-tool"
import { PricingSection } from "@/components/sections/pricing"
import { MergeHero } from "./merge-hero"
import { MergeUseCases } from "./merge-use-cases"
import { MergeFileTypes } from "./merge-file-types"
import { MergePlatforms } from "./merge-platforms"
import { MergeFeatures } from "./merge-features"
import { MergeHowItWorks } from "./merge-how-it-works"
import { MergeComparison } from "./merge-comparison"
import { MergeSEOContent } from "./merge-seo-content"
import { MergeFAQ } from "./merge-faq"
import { MergeRelatedTools } from "./merge-related-tools"
import { MergeCTA } from "./merge-cta"

export async function generateMetadata() {
  const t = await getTranslations("merge.metadata")

  return {
    title: t("title"),
    description: t("description"),
    keywords: "merge pdf online free, combine pdf files, join pdf, merge pdf mac, merge pdf windows, pdf combiner online, merge multiple pdfs, combine pdfs into one",
    alternates: {
      canonical: "https://slimpdf.io/merge-pdf",
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      type: "website",
      url: "https://slimpdf.io/merge-pdf",
    },
  }
}

export default function MergePdfPage() {
  // Schema markup for SEO
  const webAppSchema = {
    "@context": "https://schema.org/",
    "@type": "WebApplication",
    "name": "SlimPDF Merge",
    "description": "Merge PDF files online free - combine multiple PDFs into one document",
    "url": "https://slimpdf.io/merge-pdf",
    "applicationCategory": "Productivity",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "description": "Free PDF merging - 5 files per day"
    },
    "featureList": [
      "Merge multiple PDFs into one",
      "Drag to reorder files",
      "No quality loss",
      "No watermarks",
      "Up to 50 files with Pro"
    ]
  }

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Merge PDF Files Online",
    "description": "Combine multiple PDF files into one document using SlimPDF's free online merger",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Upload your PDFs",
        "text": "Drag and drop your PDF files or click to browse. Up to 5 files free, 50 with Pro."
      },
      {
        "@type": "HowToStep",
        "name": "Arrange page order",
        "text": "Drag files to reorder them. The merged PDF will follow your arrangement."
      },
      {
        "@type": "HowToStep",
        "name": "Download merged PDF",
        "text": "Click merge and download your combined PDF. No registration required."
      }
    ]
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Will merging affect my PDF quality?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. SlimPDF preserves original quality during merging. Text stays crisp, images stay clear, and all formatting is maintained. We combine page structures without re-encoding content."
        }
      },
      {
        "@type": "Question",
        "name": "Can I change the page order?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. After uploading, drag files to arrange them in any order. The merged PDF will follow your arrangement exactly."
        }
      },
      {
        "@type": "Question",
        "name": "How many files can I merge at once?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Free users can merge up to 5 PDFs per operation. Pro users can merge up to 50 PDFs at once, perfect for large document packages."
        }
      },
      {
        "@type": "Question",
        "name": "Is my PDF secure?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. All uploads use 256-bit SSL encryption. Files are processed in isolated containers and automatically deleted after 1 hour (free) or 24 hours (Pro)."
        }
      },
      {
        "@type": "Question",
        "name": "Can I merge PDFs on my phone?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. SlimPDF works in mobile browsers on iPhone and Android. Upload multiple files, arrange order, and download the merged result."
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
          <MergeHero />

          {/* Tool - Primary CTA */}
          <section id="merge-tool" className="border-t-[3px] border-border bg-secondary-background py-16 sm:py-20 scroll-mt-20">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
              <MergeTool />
            </div>
          </section>

          {/* Use Cases - SEO keywords */}
          <MergeUseCases />

          {/* File Types - SEO keywords */}
          <MergeFileTypes />

          {/* How It Works */}
          <MergeHowItWorks />

          {/* Features */}
          <MergeFeatures />

          {/* Platforms - SEO keywords */}
          <MergePlatforms />

          {/* Comparison Table */}
          <MergeComparison />

          {/* SEO Content */}
          <MergeSEOContent />

          {/* FAQ */}
          <MergeFAQ />

          {/* Pricing */}
          <PricingSection />

          {/* Related Tools */}
          <MergeRelatedTools />

          {/* Final CTA */}
          <MergeCTA />
        </main>
        <Footer />
      </div>
    </>
  )
}
