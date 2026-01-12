import { FileDown, Target, Zap, Shield } from "lucide-react"

const features = [
  {
    icon: FileDown,
    title: "90% compression",
    description: "Server-side Ghostscript delivers professional-grade compression that browser tools can't match.",
    variant: "main" as const,
  },
  {
    icon: Target,
    title: "Target exact sizes",
    description: "Need under 10MB for email? Set a target size and we'll compress until we hit it.",
    variant: "dark" as const,
  },
  {
    icon: Zap,
    title: "Batch processing",
    description: "Process up to 20 files at once. Download as a single ZIP file.",
    variant: "dark" as const,
  },
  {
    icon: Shield,
    title: "Private & secure",
    description: "256-bit encryption. GDPR compliant. Files auto-deleted after processing.",
    variant: "main" as const,
  },
]

export function FeaturesSection() {
  return (
    <section className="border-t-[3px] border-border">
      <div className="grid md:grid-cols-2">
        {features.map((feature, index) => (
          <div
            key={feature.title}
            className={`
              ${feature.variant === "main"
                ? "bg-background text-foreground"
                : "bg-main text-main-foreground"}
              p-10 md:p-14 border-border
              ${index % 2 === 0 ? "md:border-r-[3px]" : ""}
              ${index < 2 ? "border-b-[3px]" : ""}
            `}
          >
            <div className="flex items-center gap-3 mb-4">
              <feature.icon className="size-8" />
              <h3 className="text-3xl font-heading">{feature.title}</h3>
            </div>
            <p className={`text-xl ${feature.variant === "main" ? "text-foreground/70" : "text-main-foreground/80"}`}>
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
