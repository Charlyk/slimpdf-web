import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function FinalCTASection() {
  return (
    <section className="border-t-2 border-border bg-secondary-background py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Card className="mx-auto max-w-2xl text-center">
          <CardContent className="py-10">
            <h2 className="text-2xl font-heading tracking-tight sm:text-3xl">
              Ready to compress your first PDF?
            </h2>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" asChild>
                <Link href="/compress">Compress PDF Free</Link>
              </Button>
              <Button variant="neutral" size="lg" asChild>
                <Link href="/pricing">View Pricing</Link>
              </Button>
            </div>

            <p className="mt-4 text-sm">
              No signup required for free tier
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
