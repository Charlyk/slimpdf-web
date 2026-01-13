import { Target } from "lucide-react"
import { getTranslations } from "next-intl/server"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "@/i18n/routing"

const targetSizeItems = ["10mb", "5mb", "3mb", "1mb", "500kb", "200kb"]

export async function CompressTargetSizes() {
  const t = await getTranslations("compress.targetSizes")

  return (
    <section className="border-t-[3px] border-border bg-grid bg-secondary-background py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-heading tracking-tight sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {t("subtitle")}
          </p>
        </div>

        {/* Target Sizes Grid */}
        <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {targetSizeItems.map((size) => (
            <Card key={size}>
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-2">
                  <Target className="size-5 text-main" />
                  <h3 className="font-heading">
                    {t(`items.${size}.title`)}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  {t(`items.${size}.description`)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <Button className="text-xl px-8 py-6" asChild>
            <Link href="#pricing">{t("cta")}</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
