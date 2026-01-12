import { Workflow, Zap, Link2, Code, Trash2, Gauge, Webhook, Terminal } from "lucide-react"

const features = [
  { label: "n8n Integration", icon: Workflow },
  { label: "Make Integration", icon: Link2 },
  { label: "Zapier Integration", icon: Zap },
  { label: "REST API Access", icon: Code },
  { label: "Auto-deletion", icon: Trash2 },
  { label: "100+ API Requests/hour", icon: Gauge },
  { label: "Webhook Support", icon: Webhook },
  { label: "CLI Tools", icon: Terminal },
]

export function MarqueeFeaturesSection() {
  return (
    <div className="relative flex w-full overflow-x-hidden border-t-[3px] border-border bg-background text-foreground font-base">
      <div className="animate-marquee whitespace-nowrap py-8">
        {features.map((feature) => (
          <span key={feature.label} className="mx-6 inline-flex items-center gap-3 text-2xl font-heading">
            <feature.icon className="size-7" />
            {feature.label}
          </span>
        ))}
      </div>

      <div className="absolute top-0 animate-marquee2 whitespace-nowrap py-8">
        {features.map((feature) => (
          <span key={feature.label} className="mx-6 inline-flex items-center gap-3 text-2xl font-heading">
            <feature.icon className="size-7" />
            {feature.label}
          </span>
        ))}
      </div>
    </div>
  )
}
