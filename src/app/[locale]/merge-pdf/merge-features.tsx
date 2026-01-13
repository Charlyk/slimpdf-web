import { GripVertical, Shield, Files, Clock, Lock, Gift } from "lucide-react"
import { getTranslations } from "next-intl/server"

import { Card, CardContent } from "@/components/ui/card"

const featureItems = [
  { key: "dragReorder", icon: GripVertical },
  { key: "preserveQuality", icon: Shield },
  { key: "largeMerges", icon: Files },
  { key: "fast", icon: Clock },
  { key: "secure", icon: Lock },
  { key: "free", icon: Gift },
]

export async function MergeFeatures() {
  const t = await getTranslations("merge.features")

  return (
    <section className="border-b-[3px] border-border py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-heading tracking-tight sm:text-4xl">
            {t("title")}
          </h2>
        </div>

        {/* Features Grid */}
        <div className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featureItems.map((item) => (
            <Card key={item.key}>
              <CardContent className="p-6">
                <div className="mb-4 flex size-12 items-center justify-center rounded-base border-2 border-border bg-main text-main-foreground">
                  <item.icon className="size-6" />
                </div>
                <h3 className="text-lg font-heading mb-2">
                  {t(`items.${item.key}.title`)}
                </h3>
                <p className="text-sm text-muted-foreground">
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
