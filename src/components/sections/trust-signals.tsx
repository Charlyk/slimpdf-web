"use client"

import { Lock, Trash2, Database, ShieldCheck } from "lucide-react"
import { useTranslations } from "next-intl"

import { Card, CardContent } from "@/components/ui/card"

const trustItems = [
  { key: "encryption", icon: Lock },
  { key: "autoDelete", icon: Trash2 },
  { key: "noStorage", icon: Database },
  { key: "gdpr", icon: ShieldCheck },
]

export function TrustSignalsSection() {
  const t = useTranslations("home.trustSignals")

  return (
    <section className="border-t-[3px] border-border py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-heading tracking-tight sm:text-4xl">
            {t("title")}
          </h2>
        </div>

        {/* Trust Grid */}
        <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trustItems.map((item) => (
            <Card key={item.key}>
              <CardContent className="p-6 text-center">
                <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full border-2 border-border bg-main text-main-foreground">
                  <item.icon className="size-7" />
                </div>
                <h3 className="text-lg font-heading mb-2">
                  {t(`items.${item.key}.title`)}
                </h3>
                <p className="text-sm">
                  {t(`items.${item.key}.description`)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
