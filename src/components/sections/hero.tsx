"use client"

import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function HeroSection() {
  return (
    <section className="bg-grid py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <Badge variant="neutral" className="mb-8">
            <Sparkles className="size-3" />
            Server-powered compression
          </Badge>

          {/* Headline */}
          <h1 className="text-4xl font-heading tracking-tight sm:text-5xl lg:text-6xl">
            Compress PDFs up to{" "}
            <span className="text-main">90% smaller</span>
          </h1>

          {/* Subheadline */}
          <p className="mt-6 text-lg sm:text-xl">
            Professional Ghostscript compression that actually works.
            No watermarks. No signup required. Files auto-deleted after download.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button className="text-xl px-8 py-6" asChild>
              <Link href="/compress">
                Start compressing
                <ArrowRight className="size-5" />
              </Link>
            </Button>
            <Button variant="neutral" className="text-xl px-8 py-6" asChild>
              <Link href="/pricing">
                View pricing
              </Link>
            </Button>
          </div>

          {/* Trust indicator */}
          <p className="mt-10 text-sm">
            Trusted by <span className="font-heading">2,500+</span> developers and businesses worldwide
          </p>
        </div>
      </div>
    </section>
  )
}
