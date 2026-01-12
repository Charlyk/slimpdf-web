import { XCircle, Check } from "lucide-react"

const problems = [
  {
    problem: '"File too large for email"',
    description: "Attachments rejected by size limits",
  },
  {
    problem: "Browser-based tools crash on big files",
    description: "JavaScript can't handle 50MB+ PDFs",
  },
  {
    problem: "Watermarks on free tools",
    description: "Unprofessional results you can't use",
  },
]

const solutions = [
  "Compress to exact file sizes (under 10MB for email)",
  "Handle files up to 100MB without crashing",
  "No watermarks, ever",
]

export function ProblemSolutionSection() {
  return (
    <section className="bg-grey-10 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-grey-70 sm:text-4xl">
            Tired of these problems?
          </h2>
        </div>

        {/* Problem Cards */}
        <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-3 sm:gap-6">
          {problems.map((item) => (
            <div
              key={item.problem}
              className="rounded-xl border border-red-200 bg-white p-6 text-center"
            >
              <XCircle className="mx-auto size-8 text-red-500" />
              <p className="mt-4 font-semibold text-grey-70">{item.problem}</p>
              <p className="mt-2 text-sm text-grey-50">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Solution */}
        <div className="mx-auto mt-12 max-w-2xl text-center">
          <p className="text-lg text-grey-70">
            <span className="font-semibold text-brand-60">SlimPDF</span> uses
            server-side Ghostscript compression.
            <br />
            Same technology used by print shops and publishers.
          </p>

          {/* Solution Points */}
          <ul className="mt-8 inline-flex flex-col items-start gap-3 text-left">
            {solutions.map((solution) => (
              <li key={solution} className="flex items-center gap-3">
                <Check className="size-5 shrink-0 text-green-60" />
                <span className="text-grey-70">{solution}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
