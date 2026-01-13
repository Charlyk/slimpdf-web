"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

type PlanKey = "free" | "pro" | "business"

const planConfigs: { key: PlanKey; popular: boolean; enterprise: boolean }[] = [
  { key: "free", popular: false, enterprise: false },
  { key: "pro", popular: true, enterprise: false },
  { key: "business", popular: false, enterprise: true },
]

export function PricingSection() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("yearly")
  const isYearly = billingPeriod === "yearly"
  const t = useTranslations("home.pricing")

  const getPrice = (planKey: PlanKey) => {
    if (planKey === "free") return t("plans.free.price")
    if (planKey === "business") return t("plans.business.price")
    return isYearly ? t("plans.pro.priceYearly") : t("plans.pro.priceMonthly")
  }

  const getFeatures = (planKey: PlanKey) => {
    return t.raw(`plans.${planKey}.features`) as string[]
  }

  return (
    <section id="pricing" className="border-y-[3px] border-border bg-secondary-background py-20 sm:py-32 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-heading tracking-tight sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg">
            {t("subtitle")}
          </p>

          {/* Billing Toggle */}
          <Tabs value={billingPeriod} onValueChange={(v) => setBillingPeriod(v as "monthly" | "yearly")} className="mt-8">
            <div className="flex justify-center">
              <TabsList className="h-auto">
                <TabsTrigger value="monthly" className="text-lg">{t("billingToggle.monthly")}</TabsTrigger>
                <TabsTrigger value="yearly" className="text-lg">
                  {t("billingToggle.yearly")} <span className="ml-1 font-bold">{t("billingToggle.yearlyDiscount")}</span>
                </TabsTrigger>
              </TabsList>
            </div>
          </Tabs>
        </div>

        {/* Pricing Cards */}
        <div className="mx-auto mt-12 grid max-w-6xl gap-8 md:grid-cols-3 items-stretch">
          {planConfigs.map((plan) => {
            const features = getFeatures(plan.key)
            const price = getPrice(plan.key)

            return (
              <Card
                key={plan.key}
                className={cn(
                  "relative flex flex-col",
                  plan.popular && "border-main"
                )}
              >
                {plan.popular && (
                  <Badge className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
                    {t("mostPopular")}
                  </Badge>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{t(`plans.${plan.key}.name`)}</CardTitle>
                  <CardDescription className="text-xl">{t(`plans.${plan.key}.description`)}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="mb-6">
                    <span className="text-4xl font-heading">{price}</span>
                    {plan.key === "pro" && (
                      <span className="text-sm">{isYearly ? t("period.year") : t("period.month")}</span>
                    )}
                  </div>
                  {plan.key === "pro" && isYearly && (
                    <p className="mb-6 text-base">{t("billedAnnually")}</p>
                  )}
                  <ul className="space-y-3">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3 text-base">
                        <Check className="mt-0.5 size-4 shrink-0 text-chart-1" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="flex-col gap-3">
                  {plan.popular && (
                    <p className="text-center text-base">
                      {t("guarantee")}
                    </p>
                  )}
                  <Button
                    variant={plan.popular ? "default" : "neutral"}
                    className="w-full text-xl py-6"
                  >
                    {t(`plans.${plan.key}.cta`)}
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
