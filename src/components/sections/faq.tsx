"use client"

import { useTranslations } from "next-intl"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqKeys = [
  "difference",
  "security",
  "targetSize",
  "watermarks",
  "api",
  "signup",
  "platforms",
  "batch",
]

export function FAQSection() {
  const t = useTranslations("home.faq")

  return (
    <section className="py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-heading tracking-tight sm:text-4xl">
            {t("title")}
          </h2>
        </div>

        <div className="mx-auto mt-12 max-w-3xl">
          <Accordion type="single" collapsible defaultValue="item-0" className="space-y-4">
            {faqKeys.map((key, index) => (
              <AccordionItem key={key} value={`item-${index}`}>
                <AccordionTrigger>{t(`items.${key}.question`)}</AccordionTrigger>
                <AccordionContent className="text-base">{t(`items.${key}.answer`)}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
