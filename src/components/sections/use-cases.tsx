"use client"

import { Mail, Sparkles, Apple, FileStack, Target, Shield } from "lucide-react"
import { useTranslations } from "next-intl"

import { Card, CardContent } from "@/components/ui/card"

const useCases = [
  { key: "email", icon: Mail },
  { key: "quality", icon: Sparkles },
  { key: "mac", icon: Apple },
  { key: "largeFiles", icon: FileStack },
  { key: "specificSize", icon: Target },
  { key: "secure", icon: Shield },
]

export function UseCasesSection() {
  const t = useTranslations("home.useCases")

  return (
    <section className="border-t-[3px] border-border bg-secondary-background bg-grid py-20 sm:py-28">
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

        {/* Use Cases Grid */}
        <div className="mx-auto mt-12 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {useCases.map((useCase) => (
            <Card key={useCase.key}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-base border-2 border-border bg-main text-main-foreground">
                    <useCase.icon className="size-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-heading mb-1">
                      {t(`items.${useCase.key}.title`)}
                    </h3>
                    <p className="text-sm">
                      {t(`items.${useCase.key}.description`)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
