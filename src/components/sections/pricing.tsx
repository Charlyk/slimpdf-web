"use client"

import { useState } from "react"
import { Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const plans = [
  {
    name: "Free",
    description: "For occasional use",
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      "2-3 files per day",
      "Up to 20MB files",
      "Standard compression",
      "1-hour download links",
      "Basic tools access",
    ],
    cta: "Get Started",
    ctaVariant: "outline" as const,
    popular: false,
  },
  {
    name: "Pro",
    description: "For power users",
    monthlyPrice: 9,
    yearlyPrice: 49,
    features: [
      "Unlimited files",
      "Up to 100MB files",
      "All quality presets",
      "Target exact file size",
      "Batch processing (20 files)",
      "API access included",
      "24-hour download links",
      "Priority processing",
    ],
    cta: "Upgrade to Pro",
    ctaVariant: "default" as const,
    popular: true,
  },
]

export function PricingSection() {
  const [isYearly, setIsYearly] = useState(true)

  return (
    <section className="py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-grey-70 sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-lg text-grey-50">
            Start free, upgrade when you need more
          </p>

          {/* Billing Toggle */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <span
              className={cn(
                "text-sm font-medium",
                !isYearly ? "text-grey-70" : "text-grey-50"
              )}
            >
              Monthly
            </span>
            <Switch checked={isYearly} onCheckedChange={setIsYearly} />
            <span
              className={cn(
                "text-sm font-medium",
                isYearly ? "text-grey-70" : "text-grey-50"
              )}
            >
              Yearly
            </span>
            {isYearly && (
              <Badge variant="success" size="sm">
                Save 54%
              </Badge>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="mx-auto mt-12 grid max-w-4xl gap-8 md:grid-cols-2">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "relative rounded-2xl border p-8",
                plan.popular
                  ? "border-brand-60 bg-white shadow-lg"
                  : "border-grey-20 bg-white"
              )}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                  Most Popular
                </Badge>
              )}

              {/* Plan Header */}
              <div className="text-center">
                <h3 className="text-xl font-bold text-grey-70">{plan.name}</h3>
                <p className="mt-1 text-sm text-grey-50">{plan.description}</p>

                {/* Price */}
                <div className="mt-6">
                  <span className="text-4xl font-bold text-grey-70">
                    $
                    {plan.monthlyPrice === 0
                      ? 0
                      : isYearly
                        ? plan.yearlyPrice
                        : plan.monthlyPrice}
                  </span>
                  {plan.monthlyPrice > 0 && (
                    <span className="text-grey-50">
                      /{isYearly ? "year" : "month"}
                    </span>
                  )}
                </div>
              </div>

              {/* Features */}
              <ul className="mt-8 space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="mt-0.5 size-5 shrink-0 text-green-60" />
                    <span className="text-sm text-grey-70">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                variant={plan.ctaVariant}
                fullWidth
                className="mt-8"
              >
                {plan.cta}
              </Button>

              {plan.monthlyPrice > 0 && (
                <p className="mt-4 text-center text-xs text-grey-50">
                  7-day money-back guarantee
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
