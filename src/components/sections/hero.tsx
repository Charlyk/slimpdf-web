"use client"

import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function HeroSection() {
  return (
    <section className="relative py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-1.5 text-sm">
            <Sparkles className="size-4 text-brand-60" />
            <span className="text-muted-foreground">Server-powered compression</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Compress PDFs up to{" "}
            <span className="text-brand-60">90% smaller</span>
          </h1>

          {/* Subheadline */}
          <p className="mt-6 text-lg text-muted-foreground sm:text-xl">
            Professional Ghostscript compression that actually works.
            No watermarks. No signup required. Files auto-deleted after download.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/compress" className={cn(buttonVariants({ size: "lg" }), "gap-2")}>
              Start compressing
              <ArrowRight className="size-4" />
            </Link>
            <Link href="/pricing" className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
              View pricing
            </Link>
          </div>

          {/* Trust indicator */}
          <p className="mt-10 text-sm text-muted-foreground">
            Trusted by <span className="font-semibold text-foreground">2,500+</span> developers and businesses worldwide
          </p>
        </div>
      </div>
    </section>
  )
}
