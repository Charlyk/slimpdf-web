"use client"

import { FileDown, Target, Zap, Shield } from "lucide-react"
import { useTranslations } from "next-intl"

const featureKeys = [
  { key: "compression", icon: FileDown, variant: "main" as const },
  { key: "targetSize", icon: Target, variant: "dark" as const },
  { key: "batchProcessing", icon: Zap, variant: "dark" as const },
  { key: "security", icon: Shield, variant: "main" as const },
]

export function FeaturesSection() {
  const t = useTranslations("home.features")

  return (
    <section className="border-t-[3px] border-border">
      <div className="grid md:grid-cols-2">
        {featureKeys.map((feature, index) => (
          <div
            key={feature.key}
            className={`
              ${feature.variant === "main"
                ? "bg-background text-foreground"
                : "bg-main text-main-foreground"}
              p-10 md:p-14 border-border
              ${index % 2 === 0 ? "md:border-r-[3px]" : ""}
              ${index < 2 ? "border-b-[3px]" : ""}
            `}
          >
            <div className="flex items-center gap-3 mb-4">
              <feature.icon className="size-8" />
              <h3 className="text-3xl font-heading">{t(`${feature.key}.title`)}</h3>
            </div>
            <p className={`text-xl ${feature.variant === "main" ? "text-foreground/70" : "text-main-foreground/80"}`}>
              {t(`${feature.key}.description`)}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
