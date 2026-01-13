"use client"

import { FileDown, Target, Layers, Ban, Trash2, Code } from "lucide-react"
import { useTranslations } from "next-intl"

const featureKeys = [
  { key: "compression", icon: FileDown, variant: "main" as const },
  { key: "targetSize", icon: Target, variant: "dark" as const },
  { key: "batchProcessing", icon: Layers, variant: "dark" as const },
  { key: "noWatermarks", icon: Ban, variant: "main" as const },
  { key: "autoDelete", icon: Trash2, variant: "main" as const },
  { key: "apiAccess", icon: Code, variant: "dark" as const },
]

export function FeaturesSection() {
  const t = useTranslations("home.features")

  return (
    <section className="border-t-[3px] border-border py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h2 className="text-3xl font-heading tracking-tight sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg">
            {t("subtitle")}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featureKeys.map((feature) => (
            <div
              key={feature.key}
              className="rounded-base border-2 border-border bg-background p-6"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="flex size-10 items-center justify-center rounded-base border-2 border-border bg-main text-main-foreground">
                  <feature.icon className="size-5" />
                </div>
                <h3 className="text-xl font-heading">{t(`items.${feature.key}.title`)}</h3>
              </div>
              <p className="text-base text-foreground/70">
                {t(`items.${feature.key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
