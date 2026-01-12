import { Check, X } from "lucide-react"

import { cn } from "@/lib/utils"

const features = [
  {
    name: "Daily file limit",
    free: "2-3 files/day",
    pro: "Unlimited",
  },
  {
    name: "Max file size",
    free: "20 MB",
    pro: "100 MB",
  },
  {
    name: "Compression quality",
    free: "Standard preset",
    pro: "All presets + custom",
  },
  {
    name: "Target file size",
    free: false,
    pro: true,
  },
  {
    name: "Batch processing",
    free: false,
    pro: "Up to 20 files",
  },
  {
    name: "API access",
    free: false,
    pro: true,
  },
  {
    name: "Download link expiry",
    free: "1 hour",
    pro: "24 hours",
  },
  {
    name: "Priority processing",
    free: false,
    pro: true,
  },
]

function FeatureValue({ value }: { value: string | boolean }) {
  if (typeof value === "boolean") {
    return value ? (
      <Check className="size-5 text-green-60" />
    ) : (
      <X className="size-5 text-grey-40" />
    )
  }
  return <span className="text-sm text-grey-70">{value}</span>
}

export function FeaturesSection() {
  return (
    <section className="py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-grey-70 sm:text-4xl">
            Free vs Pro
          </h2>
          <p className="mt-4 text-lg text-grey-50">
            Start free, upgrade when you need more power
          </p>
        </div>

        {/* Comparison Table */}
        <div className="mx-auto mt-12 max-w-3xl">
          <div className="overflow-hidden rounded-2xl border border-grey-20">
            {/* Header Row */}
            <div className="grid grid-cols-3 bg-grey-10">
              <div className="px-6 py-4">
                <span className="text-sm font-bold text-grey-70">Feature</span>
              </div>
              <div className="px-6 py-4 text-center">
                <span className="text-sm font-bold text-grey-70">Free</span>
              </div>
              <div className="px-6 py-4 text-center">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-60 px-3 py-1 text-sm font-bold text-white">
                  Pro
                </span>
              </div>
            </div>

            {/* Feature Rows */}
            {features.map((feature, index) => (
              <div
                key={feature.name}
                className={cn(
                  "grid grid-cols-3 border-t border-grey-20",
                  index % 2 === 0 ? "bg-white" : "bg-grey-10/50"
                )}
              >
                <div className="px-6 py-4">
                  <span className="text-sm text-grey-70">{feature.name}</span>
                </div>
                <div className="flex items-center justify-center px-6 py-4">
                  <FeatureValue value={feature.free} />
                </div>
                <div className="flex items-center justify-center px-6 py-4">
                  <FeatureValue value={feature.pro} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
