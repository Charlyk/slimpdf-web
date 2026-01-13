"use client"

import Link from "next/link"
import { Check } from "lucide-react"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function FinalCTASection() {
  const t = useTranslations("home.finalCta")
  const benefits = t.raw("benefits") as string[]

  return (
    <section className="bg-grid-dark border-t-[3px] border-border bg-main py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Card className="mx-auto max-w-2xl text-center">
          <CardContent className="py-10">
            <h2 className="text-2xl font-heading tracking-tight sm:text-3xl">
              {t("title")}
            </h2>
            <p className="mt-3 text-lg">
              {t("subtitle")}
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button className="text-xl px-8 py-6" asChild>
                <Link href="/compress">{t("ctaPrimary")}</Link>
              </Button>
              <Button variant="neutral" className="text-xl px-8 py-6" asChild>
                <a href="#pricing">{t("ctaSecondary")}</a>
              </Button>
            </div>

            {/* Benefits */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
              {benefits.map((benefit, index) => (
                <span key={index} className="flex items-center gap-1.5">
                  <Check className="size-4 text-chart-1" />
                  {benefit}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
