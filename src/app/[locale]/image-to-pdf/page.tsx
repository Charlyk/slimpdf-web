import { getTranslations } from "next-intl/server"

import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { ImageToPdfTool } from "@/components/tools/image-to-pdf-tool"
import { PricingSection } from "@/components/sections/pricing"
import { ImageToPdfHero } from "./image-to-pdf-hero"
import { ImageToPdfUseCases } from "./image-to-pdf-use-cases"
import { ImageToPdfFormats } from "./image-to-pdf-formats"
import { ImageToPdfPlatforms } from "./image-to-pdf-platforms"
import { ImageToPdfFeatures } from "./image-to-pdf-features"
import { ImageToPdfHowItWorks } from "./image-to-pdf-how-it-works"
import { ImageToPdfComparison } from "./image-to-pdf-comparison"
import { ImageToPdfSEOContent } from "./image-to-pdf-seo-content"
import { ImageToPdfFAQ } from "./image-to-pdf-faq"
import { ImageToPdfRelatedTools } from "./image-to-pdf-related-tools"
import { ImageToPdfCTA } from "./image-to-pdf-cta"

export async function generateMetadata() {
  const t = await getTranslations("imageToPdf.metadata")

  return {
    title: t("title"),
    description: t("description"),
    keywords: "image to pdf, jpg to pdf, png to pdf, convert image to pdf, photo to pdf, picture to pdf, webp to pdf, image to pdf converter online free",
    alternates: {
      canonical: "https://slimpdf.io/image-to-pdf",
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      type: "website",
      url: "https://slimpdf.io/image-to-pdf",
    },
  }
}

export default function ImageToPdfPage() {
  // Schema markup for SEO
  const webAppSchema = {
    "@context": "https://schema.org/",
    "@type": "WebApplication",
    "name": "SlimPDF Image to PDF",
    "description": "Convert images to PDF online free - JPG, PNG, WebP to PDF converter",
    "url": "https://slimpdf.io/image-to-pdf",
    "applicationCategory": "Productivity",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "description": "Free image to PDF conversion - 10 images per day"
    },
    "featureList": [
      "Convert JPG, PNG, WebP to PDF",
      "Multiple images to one PDF",
      "Choose page size (A4, Letter, Original)",
      "Drag to reorder pages",
      "No watermarks"
    ]
  }

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Convert Images to PDF Online",
    "description": "Convert JPG, PNG, and other images to PDF using SlimPDF's free online converter",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Upload your images",
        "text": "Drag and drop images or click to browse. JPG, PNG, WebP, TIFF, BMP, GIF supported."
      },
      {
        "@type": "HowToStep",
        "name": "Arrange and configure",
        "text": "Drag images to reorder pages. Choose A4, Letter, or original page size."
      },
      {
        "@type": "HowToStep",
        "name": "Download your PDF",
        "text": "Click convert and download your PDF instantly. No registration required."
      }
    ]
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Will conversion reduce my image quality?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. SlimPDF preserves original image quality during conversion. Your images will look exactly the same in the PDF as they do as standalone files."
        }
      },
      {
        "@type": "Question",
        "name": "What image formats are supported?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SlimPDF supports JPG, JPEG, PNG, WebP, TIFF, BMP, and GIF. Static GIFs are converted; for animated GIFs, only the first frame is used."
        }
      },
      {
        "@type": "Question",
        "name": "How many images can I convert at once?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Free users can convert up to 10 images per PDF. Pro users can combine up to 100 images into a single PDF document."
        }
      },
      {
        "@type": "Question",
        "name": "Can I choose the page size?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Select A4 (international), Letter (US), or Original to keep your image's exact dimensions as the page size."
        }
      },
      {
        "@type": "Question",
        "name": "Can I convert images on my phone?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. SlimPDF works in mobile browsers on iPhone and Android. Upload photos directly from your camera roll and download the PDF."
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
          <ImageToPdfHero />

          {/* Tool - Primary CTA */}
          <section id="convert-tool" className="border-t-[3px] border-border bg-secondary-background py-16 sm:py-20 scroll-mt-20">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
              <ImageToPdfTool />
            </div>
          </section>

          {/* Use Cases - SEO keywords */}
          <ImageToPdfUseCases />

          {/* Formats - SEO keywords */}
          <ImageToPdfFormats />

          {/* How It Works */}
          <ImageToPdfHowItWorks />

          {/* Features */}
          <ImageToPdfFeatures />

          {/* Platforms - SEO keywords */}
          <ImageToPdfPlatforms />

          {/* Comparison Table */}
          <ImageToPdfComparison />

          {/* SEO Content */}
          <ImageToPdfSEOContent />

          {/* FAQ */}
          <ImageToPdfFAQ />

          {/* Pricing */}
          <PricingSection />

          {/* Related Tools */}
          <ImageToPdfRelatedTools />

          {/* Final CTA */}
          <ImageToPdfCTA />
        </main>
        <Footer />
      </div>
    </>
  )
}
