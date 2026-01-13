import { Sparkles, ArrowDown } from "lucide-react"
import { getTranslations } from "next-intl/server"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export async function MergeHero() {
  const t = await getTranslations("merge.hero")

  return (
    <section className="bg-grid py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <Badge variant="neutral" className="mb-6">
            <Sparkles className="size-3" />
            {t("badge")}
          </Badge>

          {/* Headline */}
          <h1 className="text-4xl font-heading tracking-tight sm:text-5xl lg:text-6xl">
            {t("title")}{" "}
            <span className="text-main">{t("titleHighlight")}</span>
          </h1>

          {/* Subheadline */}
          <p className="mt-6 text-lg sm:text-xl max-w-2xl mx-auto">
            {t("subtitle")}
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button className="text-xl px-8 py-6" asChild>
              <a href="#merge-tool">
                {t("ctaPrimary")}
                <ArrowDown className="size-5" />
              </a>
            </Button>
            <Button variant="neutral" className="text-xl px-8 py-6" asChild>
              <a href="#pricing">
                {t("ctaSecondary")}
              </a>
            </Button>
          </div>

          {/* Trust indicator */}
          <p className="mt-10 text-sm text-muted-foreground">
            {t("trustIndicator", { count: "25,000+" })}
          </p>
        </div>
      </div>
    </section>
  )
}
