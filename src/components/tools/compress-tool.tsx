"use client"

import { useState, useRef } from "react"
import {
  FileDown,
  X,
  Download,
  CheckCircle2,
  Loader2,
  Upload,
  AlertCircle,
  Zap,
} from "lucide-react"
import { useTranslations, useLocale } from "next-intl"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { SlimPdfClient, RateLimitError, type CompressionQuality, type JobResult, type RateLimitInfo, type SupportedLanguage, type ApiEnvironment } from "@/lib/slimpdf-client/dist"
import { cn } from "@/lib/utils"
import { Link } from "@/i18n/routing"

const API_ENVIRONMENT = (process.env.NEXT_PUBLIC_API_ENVIRONMENT as ApiEnvironment) || "production"

type ProcessingState = "idle" | "selected" | "processing" | "complete" | "error"

const qualityOptions = [
  { value: "low" as const, labelKey: "low", descKey: "lowDesc" },
  { value: "medium" as const, labelKey: "medium", descKey: "mediumDesc" },
  { value: "high" as const, labelKey: "high", descKey: "highDesc" },
  { value: "maximum" as const, labelKey: "maximum", descKey: "maximumDesc" },
]

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B"
  const k = 1024
  const sizes = ["B", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i]
}

// Create a single client instance
const client = new SlimPdfClient({ environment: API_ENVIRONMENT })

interface CompressToolProps {
  className?: string
}

export function CompressTool({ className }: CompressToolProps) {
  const [file, setFile] = useState<File | null>(null)
  const [quality, setQuality] = useState<CompressionQuality>("medium")
  const [state, setState] = useState<ProcessingState>("idle")
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [isRateLimitError, setIsRateLimitError] = useState(false)
  const [result, setResult] = useState<{ originalSize: number; compressedSize: number; reduction: number } | null>(null)
  const [rateLimit, setRateLimit] = useState<RateLimitInfo | undefined>(undefined)
  const [isDragOver, setIsDragOver] = useState(false)
  const jobResultRef = useRef<JobResult | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const t = useTranslations("compress.tool")
  const tCommon = useTranslations("common.rateLimitError")
  const locale = useLocale()

  // Set language for API responses
  client.setLanguage(locale as SupportedLanguage)

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setState("selected")
      setResult(null)
      setError(null)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile && droppedFile.type === "application/pdf") {
      setFile(droppedFile)
      setState("selected")
      setResult(null)
      setError(null)
    }
  }

  const handleProcess = async () => {
    if (!file) return

    setState("processing")
    setProgress(0)
    setError(null)
    setRateLimit(undefined)

    try {
      const pollOptions = {
        onStatusChange: (status: { status: string }) => {
          if (status.status === "pending") {
            setProgress(25)
          } else if (status.status === "processing") {
            setProgress(50)
          }
        },
      }

      // Submit the job
      const response = await client.compress.submit(file, { quality })
      const jobId = response.job_id
      const rateLimitInfo = response.rateLimit

      setProgress(25)

      // Wait for completion
      const status = await client.jobs.waitForCompletion(jobId, pollOptions)

      setProgress(100)

      // Store job result for download
      jobResultRef.current = {
        status,
        download: () => client.jobs.download(jobId),
      }

      // Store rate limit info
      if (rateLimitInfo) {
        setRateLimit(rateLimitInfo)
      }

      const { original_size, output_size, reduction_percent } = status
      setResult({
        originalSize: original_size || file.size,
        compressedSize: output_size || 0,
        reduction: reduction_percent || 0,
      })
      setState("complete")
    } catch (err) {
      console.error("Compression error:", err)
      if (err instanceof RateLimitError) {
        setIsRateLimitError(true)
      } else {
        setIsRateLimitError(false)
      }
      setError(err instanceof Error ? err.message : t("error.generic"))
      setState("error")
    }
  }

  const handleDownload = async () => {
    if (!jobResultRef.current || !file) return

    try {
      const blob = await jobResultRef.current.download()
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = file.name.replace(".pdf", "-compressed.pdf")
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (err) {
      console.error("Download error:", err)
      setError(err instanceof Error ? err.message : "Failed to download file")
    }
  }

  const handleReset = () => {
    setFile(null)
    setState("idle")
    setProgress(0)
    setResult(null)
    setError(null)
    setIsRateLimitError(false)
    setRateLimit(undefined)
    jobResultRef.current = null
    if (inputRef.current) {
      inputRef.current.value = ""
    }
  }

  return (
    <Card className={cn("w-full", className)}>
      <CardContent className="p-6 sm:p-8">
        {/* Idle State - Dropzone */}
        {state === "idle" && (
          <label
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={cn(
              "flex cursor-pointer flex-col items-center justify-center rounded-base border-2 border-dashed py-16 transition-colors",
              isDragOver
                ? "border-main bg-main/10"
                : "border-border hover:border-main hover:bg-main/5"
            )}
          >
            <input
              ref={inputRef}
              type="file"
              accept=".pdf"
              onChange={handleFileSelected}
              className="hidden"
            />
            <Upload className="size-12 text-foreground" />
            <p className="mt-4 text-lg font-heading">{t("dropzone.title")}</p>
            <p className="mt-2 text-sm text-muted-foreground">{t("dropzone.subtitle")}</p>
          </label>
        )}

        {/* Selected State */}
        {state === "selected" && file && (
          <div className="space-y-6">
            {/* File preview */}
            <div className="flex items-center gap-4 rounded-base border-2 border-border bg-background p-4">
              <FileDown className="size-8 text-main shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-heading truncate">{file.name}</p>
                <p className="text-sm text-muted-foreground">{formatFileSize(file.size)}</p>
              </div>
              <button
                onClick={handleReset}
                className="rounded-base p-2 hover:bg-secondary-background border-2 border-transparent hover:border-border"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Quality selector */}
            <div className="space-y-3">
              <Label className="text-base font-heading">{t("qualityLabel")}</Label>
              <RadioGroup
                value={quality}
                onValueChange={(v) => setQuality(v as CompressionQuality)}
                className="grid gap-3"
              >
                {qualityOptions.map((option) => (
                  <label
                    key={option.value}
                    className={cn(
                      "flex items-center gap-3 rounded-base border-2 p-4 cursor-pointer transition-colors",
                      quality === option.value
                        ? "border-main bg-main/5"
                        : "border-border hover:border-main/50"
                    )}
                  >
                    <RadioGroupItem value={option.value} />
                    <div className="flex-1">
                      <p className="font-heading">{t(`quality.${option.labelKey}`)}</p>
                      <p className="text-sm text-muted-foreground">{t(`quality.${option.descKey}`)}</p>
                    </div>
                  </label>
                ))}
              </RadioGroup>
            </div>

            {/* Compress button */}
            <Button onClick={handleProcess} className="w-full text-lg py-6">
              {t("actions.compress")}
            </Button>
          </div>
        )}

        {/* Processing State */}
        {state === "processing" && (
          <div className="py-12 text-center">
            <Loader2 className="mx-auto size-12 animate-spin text-main" />
            <p className="mt-6 text-lg font-heading">{t("processing.compressing")}</p>
            <div className="mt-6 mx-auto max-w-xs">
              <Progress value={progress} className="h-3" />
            </div>
          </div>
        )}

        {/* Error State */}
        {state === "error" && (
          <div className="py-12 text-center">
            <AlertCircle className="mx-auto size-12 text-destructive" />
            <p className="mt-4 text-lg font-heading">
              {isRateLimitError ? tCommon("title") : t("error.title")}
            </p>
            <p className="mt-2 text-muted-foreground">
              {isRateLimitError ? tCommon("message") : error}
            </p>
            {isRateLimitError ? (
              <>
                <Button asChild className="mt-6 text-xl px-8 py-6">
                  <Link href="#pricing">
                    <Zap className="size-5" />
                    {tCommon("upgradeButton")}
                  </Link>
                </Button>
                <p className="mt-4 text-sm text-muted-foreground">
                  {tCommon("tryAgainTomorrow")}
                </p>
              </>
            ) : (
              <Button onClick={handleReset} variant="neutral" className="mt-6 text-xl px-8 py-6">
                {t("error.tryAgain")}
              </Button>
            )}
          </div>
        )}

        {/* Complete State */}
        {state === "complete" && result && (
          <div className="text-center">
            <CheckCircle2 className="mx-auto size-12 text-chart-1" />
            <p className="mt-4 text-lg font-heading">{t("result.title")}</p>

            {/* Size comparison */}
            <div className="mt-6 rounded-base border-2 border-border bg-background p-6">
              <div className="flex items-center justify-center gap-4 text-xl">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">{t("result.originalSize")}</p>
                  <p className="font-heading">{formatFileSize(result.originalSize)}</p>
                </div>
                <span className="text-2xl">→</span>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">{t("result.compressedSize")}</p>
                  <p className="font-heading text-chart-1">{formatFileSize(result.compressedSize)}</p>
                </div>
              </div>
              <p className="mt-4 text-lg font-heading text-chart-1">
                {t("result.reduction", { percent: result.reduction })}
              </p>
            </div>

            <Button onClick={handleDownload} className="mt-6 w-full text-lg py-6">
              <Download className="size-5" />
              {t("result.download")}
            </Button>

            <button
              onClick={handleReset}
              className="mt-4 text-sm font-heading text-main hover:underline cursor-pointer"
            >
              {t("result.another")}
            </button>

            {rateLimit && (
              <p className="mt-4 text-sm text-muted-foreground">
                {t("rateLimit.remaining", { remaining: rateLimit.remaining, limit: rateLimit.limit })}
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
