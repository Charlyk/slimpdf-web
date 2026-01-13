import { FilePlus, ImageIcon, ArrowRight } from "lucide-react"
import { getTranslations } from "next-intl/server"

import { Link } from "@/i18n/routing"

const toolItems = [
  { key: "merge", icon: FilePlus, href: "/merge" },
  { key: "imageToPdf", icon: ImageIcon, href: "/image-to-pdf" },
]

export async function CompressRelatedTools() {
  const t = await getTranslations("compress.relatedTools")

  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-heading tracking-tight sm:text-4xl">
            {t("title")}
          </h2>
        </div>

        {/* Tools Grid */}
        <div className="mx-auto mt-12 grid max-w-2xl gap-6 sm:grid-cols-2">
          {toolItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="block h-full rounded-base border-2 border-border bg-background p-6 shadow-shadow transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none focus:outline-none"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-base border-2 border-border bg-main text-main-foreground">
                    <item.icon className="size-6" />
                  </div>
                  <div>
                    <h3 className="font-heading mb-1">
                      {t(`items.${item.key}.title`)}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {t(`items.${item.key}.description`)}
                    </p>
                  </div>
                </div>
                <ArrowRight className="size-5 text-muted-foreground" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
