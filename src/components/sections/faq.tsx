"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

const faqs = [
  {
    question: "How does SlimPDF compress files better than browser-based tools?",
    answer:
      "SlimPDF uses server-side processing with Ghostscript, an industry-standard PDF engine. While browser-based tools are limited by JavaScript capabilities and can only achieve 20-40% compression, our server-side approach delivers up to 90% file size reduction while maintaining quality.",
  },
  {
    question: "Are my files secure?",
    answer:
      "Yes. All file transfers use 256-bit SSL encryption. Your files are processed on secure servers and automatically deleted after processing (1 hour for free users, 24 hours for Pro users). We never analyze, share, or store your file contents.",
  },
  {
    question: "Do I need to create an account?",
    answer:
      "No account is required to use our free tools. Simply upload your file and download the result. However, creating a free account lets you track your usage history, and upgrading to Pro unlocks unlimited processing and API access.",
  },
  {
    question: "What file formats do you support?",
    answer:
      "For compression and merging, we support PDF files. For image-to-PDF conversion, we accept JPG, PNG, WebP, TIFF, BMP, and GIF formats. Maximum file sizes are 20MB (free) or 100MB (Pro).",
  },
  {
    question: "Can I compress a PDF to a specific file size?",
    answer:
      "Yes! Pro users can set a target file size (e.g., 'compress to under 5MB'). Our system uses iterative compression to get as close to your target as possible while maintaining readable quality. This is perfect for email attachment limits.",
  },
  {
    question: "What's included in the API access?",
    answer:
      "Pro subscribers get full API access with endpoints for compression, merging, and image-to-PDF conversion. You can integrate SlimPDF directly into your applications with simple REST calls. API documentation and code examples are available in your dashboard.",
  },
  {
    question: "How do I cancel my subscription?",
    answer:
      "You can cancel your Pro subscription anytime from your dashboard. You'll continue to have Pro access until the end of your billing period. We also offer a 7-day money-back guarantee if you're not satisfied.",
  },
]

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div className="border-b border-grey-20">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between py-5 text-left"
      >
        <span className="text-base font-medium text-grey-70">{question}</span>
        <ChevronDown
          className={cn(
            "size-5 shrink-0 text-grey-50 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-200",
          isOpen ? "max-h-96 pb-5" : "max-h-0"
        )}
      >
        <p className="text-grey-50">{answer}</p>
      </div>
    </div>
  )
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="bg-grey-10 py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-grey-70 sm:text-4xl">
            Frequently asked questions
          </h2>
          <p className="mt-4 text-lg text-grey-50">
            Everything you need to know about SlimPDF
          </p>
        </div>

        {/* FAQ List */}
        <div className="mx-auto mt-12 max-w-3xl rounded-2xl bg-white p-6 shadow-sm sm:p-8">
          {faqs.map((faq, index) => (
            <FAQItem
              key={faq.question}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() =>
                setOpenIndex(openIndex === index ? null : index)
              }
            />
          ))}
        </div>
      </div>
    </section>
  )
}
