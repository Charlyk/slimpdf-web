"use client"

import { useState } from "react"
import { Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("yearly")
  const isYearly = billingPeriod === "yearly"

  return (
    <section className="border-t-2 border-border py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-heading tracking-tight sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-lg">
            Start free, upgrade when you need more
          </p>

          {/* Billing Toggle */}
          <Tabs value={billingPeriod} onValueChange={(v) => setBillingPeriod(v as "monthly" | "yearly")} className="mt-8">
            <div className="flex justify-center">
              <TabsList>
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                <TabsTrigger value="yearly">
                  Yearly <span className="ml-1 text-chart-1">-54%</span>
                </TabsTrigger>
              </TabsList>
            </div>
          </Tabs>
        </div>

        {/* Pricing Cards */}
        <div className="mx-auto mt-12 grid max-w-4xl gap-8 md:grid-cols-2">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={cn(
                "relative",
                plan.popular && "border-main"
              )}
            >
              {plan.popular && (
                <Badge className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
                  Most popular
                </Badge>
              )}
              <CardHeader>
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <span className="text-4xl font-heading">
                    ${plan.price.monthly === 0 ? 0 : isYearly ? plan.price.yearly : plan.price.monthly}
                  </span>
                  {plan.price.monthly > 0 && (
                    <span className="text-sm">/{isYearly ? "year" : "month"}</span>
                  )}
                </div>
                {plan.price.monthly > 0 && isYearly && (
                  <p className="mb-6 text-sm">$4.08/month billed annually</p>
                )}
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <Check className="mt-0.5 size-4 shrink-0 text-chart-1" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="flex-col gap-3">
                <Button
                  variant={plan.popular ? "default" : "neutral"}
                  className="w-full"
                >
                  {plan.cta}
                </Button>
                {plan.popular && (
                  <p className="text-center text-xs">
                    7-day free trial · Cancel anytime
                  </p>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
