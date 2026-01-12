import { FileDown, Target, Zap, Code, Clock, Shield } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    icon: FileDown,
    title: "90% compression",
    description: "Server-side Ghostscript delivers professional-grade compression that browser tools can't match.",
  },
  {
    icon: Target,
    title: "Target exact sizes",
    description: "Need under 10MB for email? Set a target size and we'll compress until we hit it.",
  },
  {
    icon: Zap,
    title: "Batch processing",
    description: "Process up to 20 files at once. Download as a single ZIP file.",
  },
  {
    icon: Code,
    title: "API access",
    description: "Integrate compression into your apps with our simple REST API. Pro plan included.",
  },
  {
    icon: Clock,
    title: "Auto-deletion",
    description: "Files are automatically deleted after 1 hour (free) or 24 hours (Pro).",
  },
  {
    icon: Shield,
    title: "Private & secure",
    description: "256-bit encryption. GDPR compliant. We never store or analyze your files.",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-heading tracking-tight sm:text-4xl">
            Everything you need for PDF compression
          </h2>
          <p className="mt-4 text-lg">
            Professional tools without the enterprise price tag
          </p>
        </div>

        {/* Feature Grid */}
        <div className="mx-auto mt-16 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none">
              <CardContent className="p-6">
                <div className="mb-4 inline-flex size-12 items-center justify-center rounded-base border-2 border-border bg-main text-main-foreground">
                  <feature.icon className="size-6" />
                </div>
                <h3 className="font-heading text-lg">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
