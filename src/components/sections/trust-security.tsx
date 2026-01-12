import { Lock, Trash2, EyeOff, Globe } from "lucide-react"

const trustItems = [
  {
    icon: Lock,
    title: "256-bit encrypted",
    description: "Bank-level encryption for all file transfers",
  },
  {
    icon: Trash2,
    title: "Auto-deleted",
    description: "Files removed after 1 hour (24h for Pro)",
  },
  {
    icon: EyeOff,
    title: "No storage",
    description: "We never keep or analyze your files",
  },
  {
    icon: Globe,
    title: "GDPR compliant",
    description: "Full compliance with privacy regulations",
  },
]

export function TrustSecuritySection() {
  return (
    <section className="bg-grey-10 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-grey-70 sm:text-4xl">
            Your files are safe
          </h2>
        </div>

        {/* Trust Grid */}
        <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trustItems.map((item) => (
            <div
              key={item.title}
              className="rounded-xl bg-white p-6 text-center shadow-sm"
            >
              <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-brand-10">
                <item.icon className="size-6 text-brand-60" />
              </div>
              <h3 className="mt-4 font-semibold text-grey-70">{item.title}</h3>
              <p className="mt-2 text-sm text-grey-50">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
