import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function FinalCTASection() {
  return (
    <section className="border-t border-border bg-muted/30 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Ready to compress your first PDF?
          </h2>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/compress" className={cn(buttonVariants({ size: "lg" }))}>
              Compress PDF Free
            </Link>
            <Link href="/pricing" className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
              View Pricing
            </Link>
          </div>

          <p className="mt-4 text-sm text-muted-foreground">
            No signup required for free tier
          </p>
        </div>
      </div>
    </section>
  )
}
