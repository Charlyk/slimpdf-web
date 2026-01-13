import { Apple, Monitor, Terminal, Smartphone } from "lucide-react"
import { getTranslations } from "next-intl/server"

import { Card, CardContent } from "@/components/ui/card"

const platformItems = [
  { key: "mac", icon: Apple },
  { key: "windows", icon: Monitor },
  { key: "linux", icon: Terminal },
  { key: "mobile", icon: Smartphone },
]

export async function ImageToPdfPlatforms() {
  const t = await getTranslations("imageToPdf.platforms")

  return (
    <section className="border-b-[3px] border-border py-16 sm:py-24">
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

        {/* Platforms Grid */}
        <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {platformItems.map((item) => (
            <Card key={item.key}>
              <CardContent className="p-6 text-center">
                <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full border-2 border-border bg-main text-main-foreground">
                  <item.icon className="size-7" />
                </div>
                <h3 className="font-heading mb-2">
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
