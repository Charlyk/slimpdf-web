import { FileText, ArrowRight, Quote } from "lucide-react"

export function CompressionDemoSection() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-grey-70 sm:text-4xl">
            See the difference
          </h2>
        </div>

        {/* Demo Card */}
        <div className="mx-auto mt-12 max-w-3xl">
          <div className="rounded-2xl border border-grey-20 bg-white p-8 sm:p-12">
            {/* Before/After Visual */}
            <div className="flex items-center justify-center gap-6 sm:gap-12">
              {/* Before */}
              <div className="text-center">
                <p className="text-sm font-medium text-grey-50 uppercase tracking-wide mb-4">
                  Before
                </p>
                <div className="relative mx-auto w-24 h-32 sm:w-32 sm:h-40">
                  <div className="absolute inset-0 rounded-lg border-2 border-grey-20 bg-grey-10 flex items-center justify-center">
                    <FileText className="size-12 sm:size-16 text-grey-40" />
                  </div>
                </div>
                <p className="mt-4 text-2xl font-bold text-grey-70">15.2 MB</p>
              </div>

              {/* Arrow */}
              <div className="flex flex-col items-center">
                <ArrowRight className="size-8 text-brand-60" />
              </div>

              {/* After */}
              <div className="text-center">
                <p className="text-sm font-medium text-grey-50 uppercase tracking-wide mb-4">
                  After
                </p>
                <div className="relative mx-auto w-20 h-28 sm:w-24 sm:h-32">
                  <div className="absolute inset-0 rounded-lg border-2 border-green-300 bg-green-50 flex items-center justify-center">
                    <FileText className="size-10 sm:size-12 text-green-600" />
                  </div>
                </div>
                <p className="mt-4 text-2xl font-bold text-green-600">1.8 MB</p>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-grey-50">
              <span className="rounded-full bg-green-100 px-3 py-1 text-green-700 font-medium">
                Quality preserved
              </span>
              <span className="rounded-full bg-brand-10 px-3 py-1 text-brand-60 font-medium">
                88% smaller
              </span>
              <span className="rounded-full bg-grey-10 px-3 py-1 text-grey-70 font-medium">
                3 seconds
              </span>
            </div>
          </div>

          {/* Testimonial */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-start gap-3">
              <Quote className="size-6 text-brand-60 shrink-0 mt-1" />
              <div className="text-left">
                <p className="text-lg text-grey-70 italic">
                  &#34;I compressed 200 invoices in 10 minutes. Would have taken
                  hours with other tools.&#34;
                </p>
                <p className="mt-3 text-sm text-grey-50">
                  — Sarah K., Accountant
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
