import { getTranslations } from "next-intl/server"

export async function MergeSEOContent() {
  const t = await getTranslations("merge.seoContent")
  const content = t.raw("content") as Array<{ heading: string; text: string }>

  return (
    <section className="border-t-[3px] border-border py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-heading tracking-tight sm:text-4xl text-center mb-12">
            {t("title")}
          </h2>

          {/* Content Sections */}
          <div className="space-y-10">
            {content.map((section, index) => (
              <article key={index}>
                <h3 className="text-xl font-heading mb-3">
                  {section.heading}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {section.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
