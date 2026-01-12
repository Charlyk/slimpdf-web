"use client"

import { useState } from "react"
import { Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const plans = [
  {
    name: "Free",
    price: { monthly: 0, yearly: 0 },
    description: "For occasional use",
    features: [
      "2 files per day",
      "20MB max file size",
      "Standard compression",
      "1-hour download links",
    ],
    cta: "Get started",
    popular: false,
  },
  {
    name: "Pro",
    price: { monthly: 9, yearly: 49 },
    description: "For power users",
    features: [
      "Unlimited files",
      "100MB max file size",
      "Target exact file size",
      "Batch processing (20 files)",
      "API access included",
      "24-hour download links",
      "Priority processing",
    ],
    cta: "Start free trial",
    popular: true,
  },
]

export function PricingSection() {
  const [isYearly, setIsYearly] = useState(true)

  return (
    <section className="border-t border-border py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Start free, upgrade when you need more
          </p>

          {/* Billing Toggle */}
          <div className="mt-8 inline-flex items-center rounded-full border border-border bg-muted/50 p-1">
            <button
              onClick={() => setIsYearly(false)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                !isYearly ? "bg-background shadow-sm" : "text-muted-foreground"
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                isYearly ? "bg-background shadow-sm" : "text-muted-foreground"
              )}
            >
              Yearly <span className="text-green-60">-54%</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="mx-auto mt-12 grid max-w-4xl gap-8 md:grid-cols-2">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "relative rounded-xl border p-8",
                plan.popular ? "border-primary bg-primary/5" : "border-border"
              )}
            >
              {plan.popular && (
                <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-60 px-3 py-1 text-xs font-medium text-white">
                  Most popular
                </span>
              )}
              <h3 className="text-xl font-bold">{plan.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>
              <div className="mt-6">
                <span className="text-4xl font-bold">
                  ${plan.price.monthly === 0 ? 0 : isYearly ? plan.price.yearly : plan.price.monthly}
                </span>
                {plan.price.monthly > 0 && (
                  <span className="text-muted-foreground">/{isYearly ? "year" : "month"}</span>
                )}
              </div>
              {plan.price.monthly > 0 && isYearly && (
                <p className="mt-1 text-sm text-muted-foreground">$4.08/month billed annually</p>
              )}
              <ul className="mt-8 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <Check className="mt-0.5 size-4 shrink-0 text-green-60" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                variant={plan.popular ? "default" : "outline"}
                className="mt-8 w-full"
              >
                {plan.cta}
              </Button>
              {plan.popular && (
                <p className="mt-3 text-center text-xs text-muted-foreground">
                  7-day free trial · Cancel anytime
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
