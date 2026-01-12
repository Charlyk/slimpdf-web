import { Upload, Settings, Download } from "lucide-react"

const steps = [
  {
    step: 1,
    icon: Upload,
    title: "Upload your file",
    description:
      "Drag and drop your PDF or images, or click to browse. We support files up to 100MB.",
  },
  {
    step: 2,
    icon: Settings,
    title: "Choose your settings",
    description:
      "Select compression quality, arrange pages, or customize output options.",
  },
  {
    step: 3,
    icon: Download,
    title: "Download the result",
    description:
      "Get your processed file instantly. Files are auto-deleted for your privacy.",
  },
]

export function HowItWorksSection() {
  return (
    <section className="bg-grey-10 py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-grey-70 sm:text-4xl">
            How it works
          </h2>
          <p className="mt-4 text-lg text-grey-50">
            Three simple steps to process your files
          </p>
        </div>

        {/* Steps */}
        <div className="mx-auto mt-16 max-w-5xl">
          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((step, index) => (
              <div key={step.step} className="relative">
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="absolute left-1/2 top-12 hidden h-0.5 w-full -translate-y-1/2 bg-grey-20 md:block" />
                )}

                <div className="relative flex flex-col items-center text-center">
                  {/* Step number */}
                  <div className="relative">
                    <div className="flex size-24 items-center justify-center rounded-2xl bg-white shadow-md">
                      <step.icon className="size-10 text-brand-60" />
                    </div>
                    <div className="absolute -right-2 -top-2 flex size-8 items-center justify-center rounded-full bg-brand-60 text-sm font-bold text-white">
                      {step.step}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="mt-6 text-xl font-bold text-grey-70">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-grey-50">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
