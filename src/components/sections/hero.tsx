"use client"

import { Link } from "@/i18n/routing"
import { ArrowRight, Sparkles } from "lucide-react"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function HeroSection() {
  const t = useTranslations("home.hero")

  return (
    <section className="bg-grid py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <Badge variant="neutral" className="mb-8">
            <Sparkles className="size-3" />
            {t("badge")}
          </Badge>

          {/* Headline */}
          <h1 className="text-4xl font-heading tracking-tight sm:text-5xl lg:text-6xl">
            {t("title")}{" "}
            <span className="text-main">{t("titleHighlight")}</span>
          </h1>

          {/* Subheadline */}
          <p className="mt-6 text-lg sm:text-xl max-w-3xl mx-auto">
            {t("subtitle")}
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button className="text-xl px-8 py-6" asChild>
              <Link href="/register">
                {t("ctaPrimary")}
                <ArrowRight className="size-5" />
              </Link>
            </Button>
            <Button variant="neutral" className="text-xl px-8 py-6" asChild>
              <a href="#pricing">
                {t("ctaSecondary")}
              </a>
            </Button>
          </div>

          {/* Trust indicator */}
          <p className="mt-10 text-sm">
            {t("trustIndicator", { count: "2,500+" })}
          </p>
        </div>
      </div>
    </section>
  )
}
