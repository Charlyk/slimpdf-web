import { Upload, Settings, Download } from "lucide-react"
import { getTranslations } from "next-intl/server"

import { Card, CardContent } from "@/components/ui/card"

const steps = [
  { key: "upload", icon: Upload },
  { key: "arrange", icon: Settings },
  { key: "download", icon: Download },
]

export async function ImageToPdfHowItWorks() {
  const t = await getTranslations("imageToPdf.howItWorks")

  return (
    <section className="border-y-[3px] border-border bg-secondary-background py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-heading tracking-tight sm:text-4xl">
            {t("title")}
          </h2>
        </div>

        {/* Steps */}
        <div className="mx-auto mt-12 grid max-w-4xl gap-8 md:grid-cols-3">
          {steps.map((step) => (
            <Card key={step.key}>
              <CardContent className="p-6 text-center">
                <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full border-2 border-border bg-main text-main-foreground">
                  <step.icon className="size-8" />
                </div>
                <h3 className="text-lg font-heading mb-2">
                  {t(`steps.${step.key}.title`)}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t(`steps.${step.key}.description`)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
