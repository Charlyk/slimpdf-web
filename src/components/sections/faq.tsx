"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

const faqs = [
  {
    question: "How is this different from browser-based tools?",
    answer: "SlimPDF uses server-side Ghostscript, the same engine used by professional print shops. Browser tools are limited to JavaScript compression which typically achieves 20-40% reduction. We achieve up to 90%.",
  },
  {
    question: "Are my files secure?",
    answer: "Yes. All transfers use 256-bit encryption. Files are automatically deleted after 1 hour (free) or 24 hours (Pro). We never store or analyze your file contents.",
  },
  {
    question: "Can I compress to a specific file size?",
    answer: "Yes! Pro users can set a target size like \"under 10MB\" for email. We'll iterate compression until we hit your target while maintaining readable quality.",
  },
  {
    question: "Do you add watermarks?",
    answer: "Never. Your PDF comes out clean on all plans. We believe watermarks ruin the user experience.",
  },
  {
    question: "What's included in API access?",
    answer: "Pro subscribers get full REST API access for compression, merging, and image-to-PDF. Simple endpoints, code examples in multiple languages, and 100 requests/hour.",
  },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Frequently asked questions
          </h2>
        </div>

        <div className="mx-auto mt-12 max-w-3xl divide-y divide-border">
          {faqs.map((faq, index) => (
            <div key={faq.question} className="py-5">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full items-center justify-between text-left"
              >
                <span className="font-medium">{faq.question}</span>
                <ChevronDown
                  className={cn(
                    "size-5 shrink-0 text-muted-foreground transition-transform",
                    openIndex === index && "rotate-180"
                  )}
                />
              </button>
              <div
                className={cn(
                  "overflow-hidden transition-all",
                  openIndex === index ? "mt-4 max-h-96" : "max-h-0"
                )}
              >
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
