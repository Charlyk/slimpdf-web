"use client"

import { Upload, SlidersHorizontal, Download } from "lucide-react"
import { useTranslations } from "next-intl"

import { Card, CardContent } from "@/components/ui/card"

const steps = [
  { key: "upload", icon: Upload },
  { key: "choose", icon: SlidersHorizontal },
  { key: "download", icon: Download },
]

export function HowItWorksSection() {
  const t = useTranslations("home.howItWorks")

  return (
    <section className="border-t-[3px] border-border py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-heading tracking-tight sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg">
            {t("subtitle")}
          </p>
        </div>

        {/* Steps */}
        <div className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <Card key={step.key} className="relative">
              <CardContent className="pt-8 pb-6 px-6 text-center">
                {/* Step number */}
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 flex size-10 items-center justify-center rounded-full border-2 border-border bg-main text-main-foreground font-heading text-xl">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-base border-2 border-border bg-secondary-background">
                  <step.icon className="size-7" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-heading mb-2">
                  {t(`steps.${step.key}.title`)}
                </h3>
                <p className="text-base">
                  {t(`steps.${step.key}.description`)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
