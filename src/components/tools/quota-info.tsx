"use client"

import { Zap } from "lucide-react"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/button"
import { Link } from "@/i18n/routing"

interface QuotaInfoProps {
  tool: "compress" | "merge" | "imageToPdf"
}

const RATE_LIMITS = {
  compress: 2,
  merge: 3,
  imageToPdf: 3,
}

export function QuotaInfo({ tool }: QuotaInfoProps) {
  const t = useTranslations("common.quota")
  const limit = RATE_LIMITS[tool]

  return (
    <div className="mt-6 rounded-base border-2 border-border bg-background p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="font-heading text-sm sm:text-base">
            {t("freeLimit", { limit })}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {t("upgradeHint")}
          </p>
        </div>
        <Button asChild className="shrink-0 text-xl px-8 py-6">
          <Link href="/register">
            <Zap className="size-5" />
            {t("upgradeButton")}
          </Link>
        </Button>
      </div>
    </div>
  )
}
