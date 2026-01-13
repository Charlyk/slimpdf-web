"use client"

import { Workflow, Zap, Link2, Code, Trash2, Gauge, Webhook, Terminal } from "lucide-react"
import { useTranslations } from "next-intl"

const featureKeys = [
  { key: "n8nIntegration", icon: Workflow },
  { key: "makeIntegration", icon: Link2 },
  { key: "zapierIntegration", icon: Zap },
  { key: "restApiAccess", icon: Code },
  { key: "autoDeletion", icon: Trash2 },
  { key: "apiRequestsPerHour", icon: Gauge },
  { key: "webhookSupport", icon: Webhook },
  { key: "cliTools", icon: Terminal },
]

export function MarqueeFeaturesSection() {
  const t = useTranslations("home.marqueeFeatures")

  return (
    <div className="relative flex w-full overflow-x-hidden border-t-[3px] border-border bg-background text-foreground font-base">
      <div className="animate-marquee whitespace-nowrap py-8">
        {featureKeys.map((feature) => (
          <span key={feature.key} className="mx-6 inline-flex items-center gap-3 text-2xl font-heading">
            <feature.icon className="size-7" />
            {t(feature.key)}
          </span>
        ))}
      </div>

      <div className="absolute top-0 animate-marquee2 whitespace-nowrap py-8">
        {featureKeys.map((feature) => (
          <span key={feature.key} className="mx-6 inline-flex items-center gap-3 text-2xl font-heading">
            <feature.icon className="size-7" />
            {t(feature.key)}
          </span>
        ))}
      </div>
    </div>
  )
}
