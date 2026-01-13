import { ScanLine, Camera, Presentation, Archive } from "lucide-react"
import { getTranslations } from "next-intl/server"

import { Card, CardContent } from "@/components/ui/card"

const useCaseItems = [
  { key: "documents", icon: ScanLine },
  { key: "portfolios", icon: Camera },
  { key: "presentations", icon: Presentation },
  { key: "archives", icon: Archive },
]

export async function ImageToPdfUseCases() {
  const t = await getTranslations("imageToPdf.useCases")

  return (
    <section className="border-t-[3px] border-border py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-heading tracking-tight sm:text-4xl">
            {t("title")}
          </h2>
        </div>

        {/* Use Cases Grid */}
        <div className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-2">
          {useCaseItems.map((item) => (
            <Card key={item.key}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-base border-2 border-border bg-main text-main-foreground">
                    <item.icon className="size-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-heading mb-2">
                      {t(`items.${item.key}.title`)}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {t(`items.${item.key}.description`)}
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
