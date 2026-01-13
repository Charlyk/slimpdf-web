"use client"

import { useState, useRef } from "react"
import {
  FileDown,
  FilePlus,
  ImageIcon,
  X,
  Download,
  CheckCircle2,
  Loader2,
  Upload,
  AlertCircle,
} from "lucide-react"
import { useTranslations, useLocale } from "next-intl"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SlimPdfClient, type CompressionQuality, type JobResult, type RateLimitInfo, type SupportedLanguage } from "@/lib/slimpdf-client/dist"

const API_URL = process.env.NODE_ENV === "production"
  ? "https://api.slimpdf.io"
  : "https://dev.api.slimpdf.io"

type Tool = "compress" | "merge" | "image-to-pdf"
type ProcessingState = "idle" | "selected" | "processing" | "complete" | "error"

const tools = [
  { id: "compress" as Tool, labelKey: "compress", icon: FileDown, accept: ".pdf" },
  { id: "merge" as Tool, labelKey: "merge", icon: FilePlus, accept: ".pdf" },
  { id: "image-to-pdf" as Tool, labelKey: "imageToPdf", icon: ImageIcon, accept: ".jpg,.jpeg,.png,.webp" },
]

const qualityKeys = ["low", "medium", "high"] as const

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B"
  const k = 1024
  const sizes = ["B", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i]
}

// Create a single client instance
const client = new SlimPdfClient({ baseUrl: API_URL })

// Rate limit display component
function RateLimitDisplay({ rateLimit }: { rateLimit: RateLimitInfo }) {
  const t = useTranslations("home.liveTool.rateLimit")

  return (
    <p className="mt-3 text-sm text-muted-foreground">
      {t("remaining", { remaining: rateLimit.remaining, limit: rateLimit.limit })}
    </p>
  )
}

// Result view components
interface ResultViewProps {
  onDownload: () => void
  onReset: () => void
  rateLimit?: RateLimitInfo
}

interface CompressResultProps extends ResultViewProps {
  originalSize: number
  compressedSize: number
  reduction: number
}

function CompressResult({ originalSize, compressedSize, reduction, onDownload, onReset, rateLimit }: CompressResultProps) {
  const t = useTranslations("home.liveTool.complete")

  return (
    <div className="text-center">
      <CheckCircle2 className="mx-auto size-10 text-chart-1" />
      <p className="mt-4 font-heading">{t("compressTitle")}</p>
      <div className="mt-4 rounded-base border-2 border-border bg-background p-4">
        <p className="text-2xl font-heading">
          {formatFileSize(originalSize)} → <span className="text-chart-1">{formatFileSize(compressedSize)}</span>
        </p>
        <p className="mt-1 text-sm text-chart-1 font-heading">{t("reduction", { percent: reduction })}</p>
      </div>
      <Button onClick={onDownload} className="mt-4 w-full">
        <Download className="size-4" />
        {t("download")}
      </Button>
      <button onClick={onReset} className="mt-3 text-sm font-heading text-main hover:underline cursor-pointer">
        {t("another")}
      </button>
      {rateLimit && <RateLimitDisplay rateLimit={rateLimit} />}
    </div>
  )
}

interface MergeResultProps extends ResultViewProps {
  fileCount: number
  outputSize: number
}

function MergeResult({ fileCount, outputSize, onDownload, onReset, rateLimit }: MergeResultProps) {
  const t = useTranslations("home.liveTool.complete")

  return (
    <div className="text-center">
      <CheckCircle2 className="mx-auto size-10 text-chart-1" />
      <p className="mt-4 font-heading">{t("mergeTitle")}</p>
      <div className="mt-4 rounded-base border-2 border-border bg-background p-4">
        <p className="text-2xl font-heading">
          {t("mergedFiles", { count: fileCount })}
        </p>
        <p className="text-lg mt-1">{formatFileSize(outputSize)}</p>
      </div>
      <Button onClick={onDownload} className="mt-4 w-full">
        <Download className="size-4" />
        {t("download")}
      </Button>
      <button onClick={onReset} className="mt-3 text-sm font-heading text-main hover:underline cursor-pointer">
        {t("another")}
      </button>
      {rateLimit && <RateLimitDisplay rateLimit={rateLimit} />}
    </div>
  )
}

interface ConvertResultProps extends ResultViewProps {
  imageCount: number
  outputSize: number
}

function ConvertResult({ imageCount, outputSize, onDownload, onReset, rateLimit }: ConvertResultProps) {
  const t = useTranslations("home.liveTool.complete")

  return (
    <div className="text-center">
      <CheckCircle2 className="mx-auto size-10 text-chart-1" />
      <p className="mt-4 font-heading">{t("convertTitle")}</p>
      <div className="mt-4 rounded-base border-2 border-border bg-background p-4">
        <p className="text-2xl font-heading">
          {t("convertedImages", { count: imageCount })}
        </p>
        <p className="text-lg mt-1">{formatFileSize(outputSize)}</p>
      </div>
      <Button onClick={onDownload} className="mt-4 w-full">
        <Download className="size-4" />
        {t("download")}
      </Button>
      <button onClick={onReset} className="mt-3 text-sm font-heading text-main hover:underline cursor-pointer">
        {t("another")}
      </button>
      {rateLimit && <RateLimitDisplay rateLimit={rateLimit} />}
    </div>
  )
}

export function LiveToolSection() {
  const [selectedTool, setSelectedTool] = useState<Tool>("compress")
  const [files, setFiles] = useState<File[]>([])
  const [quality, setQuality] = useState<CompressionQuality>("medium")
  const [state, setState] = useState<ProcessingState>("idle")
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<{ originalSize: number; compressedSize: number; reduction: number } | null>(null)
  const [rateLimit, setRateLimit] = useState<RateLimitInfo | undefined>(undefined)
  const jobResultRef = useRef<JobResult | null>(null)

  const t = useTranslations("home.liveTool")
  const locale = useLocale()
  const currentTool = tools.find((t) => t.id === selectedTool)!

  // Set language for API responses
  client.setLanguage(locale as SupportedLanguage)

  const handleFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])
    if (selectedFiles.length > 0) {
      setFiles(selectedFiles)
      setState("selected")
      setResult(null)
      setError(null)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const droppedFiles = Array.from(e.dataTransfer.files)
    if (droppedFiles.length > 0) {
      setFiles(droppedFiles)
      setState("selected")
      setResult(null)
      setError(null)
    }
  }

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index)
    setFiles(newFiles)
    setState(newFiles.length > 0 ? "selected" : "idle")
  }

  const handleProcess = async () => {
    setState("processing")
    setProgress(0)
    setError(null)
    setRateLimit(undefined)

    try {
      let jobId: string
      let rateLimitInfo: RateLimitInfo | undefined

      const pollOptions = {
        onStatusChange: (status: { status: string }) => {
          if (status.status === "pending") {
            setProgress(25)
          } else if (status.status === "processing") {
            setProgress(50)
          }
        },
      }

      // Submit the job and capture rate limit info
      if (selectedTool === "compress") {
        const response = await client.compress.submit(files[0], { quality })
        jobId = response.job_id
        rateLimitInfo = response.rateLimit
      } else if (selectedTool === "merge") {
        const response = await client.merge.submit(files)
        jobId = response.job_id
        rateLimitInfo = response.rateLimit
      } else {
        const response = await client.imageToPdf.submit(files, { pageSize: "original" })
        jobId = response.job_id
        rateLimitInfo = response.rateLimit
      }

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
        originalSize: original_size || files.reduce((sum, f) => sum + f.size, 0),
        compressedSize: output_size || 0,
        reduction: reduction_percent || 0,
      })
      setState("complete")
    } catch (err) {
      console.error("Processing error:", err)
      setError(err instanceof Error ? err.message : "An error occurred during processing")
      setState("error")
    }
  }

  const handleDownload = async () => {
    if (!jobResultRef.current) return

    try {
      const blob = await jobResultRef.current.download()
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url

      // Generate filename based on tool
      let filename: string
      if (selectedTool === "compress") {
        filename = files[0].name.replace(".pdf", "-compressed.pdf")
      } else if (selectedTool === "merge") {
        filename = "merged.pdf"
      } else {
        filename = "converted.pdf"
      }

      a.download = filename
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
    setFiles([])
    setState("idle")
    setProgress(0)
    setResult(null)
    setError(null)
    setRateLimit(undefined)
    jobResultRef.current = null
  }

  return (
    <section className="border-t-[3px] border-border bg-secondary-background py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          {/* Tool Tabs */}
          <Tabs value={selectedTool} onValueChange={(v) => { setSelectedTool(v as Tool); handleReset() }} className="w-full">
            <div className="mb-6 flex justify-center">
              <TabsList className="h-auto">
                {tools.map((tool) => (
                  <TabsTrigger key={tool.id} value={tool.id} className="gap-2 text-lg">
                    <tool.icon className="size-5" />
                    {t(`tabs.${tool.labelKey}`)}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {/* Tool Card */}
            <Card>
              <CardContent className="p-6">
                {/* Idle State - Dropzone */}
                {state === "idle" && (
                  <label
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                    className="flex cursor-pointer flex-col items-center justify-center rounded-base border-2 border-dashed border-border py-12 transition-colors hover:border-main hover:bg-main/5"
                  >
                    <input type="file" accept={currentTool.accept} multiple={selectedTool !== "compress"} onChange={handleFilesSelected} className="hidden" />
                    <Upload className="size-10 text-foreground" />
                    <p className="mt-4 font-heading">{t(`dropzone.${currentTool.labelKey}.title`)}</p>
                    <p className="mt-1 text-sm">{t(`dropzone.${currentTool.labelKey}.limits`)}</p>
                  </label>
                )}

                {/* Selected State */}
                {state === "selected" && (
                  <div className="space-y-4">
                    {files.map((file, index) => (
                      <div key={`${file.name}-${index}`} className="flex items-center gap-3 rounded-base border-2 border-border bg-background p-3">
                        <FileDown className="size-5 text-main shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-heading truncate">{file.name}</p>
                          <p className="text-xs">{formatFileSize(file.size)}</p>
                        </div>
                        <button onClick={() => removeFile(index)} className="rounded-base p-1 hover:bg-secondary-background border-2 border-transparent hover:border-border">
                          <X className="size-4" />
                        </button>
                      </div>
                    ))}

                    {selectedTool === "compress" && (
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-heading">{t("compress.qualityLabel")}</span>
                        <Tabs value={quality} onValueChange={(v) => setQuality(v as CompressionQuality)}>
                          <TabsList>
                            {qualityKeys.map((key) => (
                              <TabsTrigger key={key} value={key} className="text-sm">
                                {t(`compress.quality.${key}`)}
                              </TabsTrigger>
                            ))}
                          </TabsList>
                        </Tabs>
                      </div>
                    )}

                    <Button onClick={handleProcess} className="w-full">
                      {selectedTool === "compress" && t("actions.compress")}
                      {selectedTool === "merge" && t("actions.merge")}
                      {selectedTool === "image-to-pdf" && t("actions.convert")}
                    </Button>
                  </div>
                )}

                {/* Processing State */}
                {state === "processing" && (
                  <div className="py-8 text-center">
                    <Loader2 className="mx-auto size-10 animate-spin text-main" />
                    <p className="mt-4 font-heading">{t("processing.title")}</p>
                    <div className="mt-4 mx-auto max-w-xs">
                      <Progress value={progress} className="h-2" />
                    </div>
                  </div>
                )}

                {/* Error State */}
                {state === "error" && (
                  <div className="py-8 text-center">
                    <AlertCircle className="mx-auto size-10 text-destructive" />
                    <p className="mt-4 font-heading">{t("error.title")}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{error}</p>
                    <Button onClick={handleReset} variant="neutral" className="mt-4">
                      {t("error.tryAgain")}
                    </Button>
                  </div>
                )}

                {/* Complete State */}
                {state === "complete" && result && (
                  <>
                    {selectedTool === "compress" && (
                      <CompressResult
                        originalSize={result.originalSize}
                        compressedSize={result.compressedSize}
                        reduction={result.reduction}
                        onDownload={handleDownload}
                        onReset={handleReset}
                        rateLimit={rateLimit}
                      />
                    )}
                    {selectedTool === "merge" && (
                      <MergeResult
                        fileCount={files.length}
                        outputSize={result.compressedSize}
                        onDownload={handleDownload}
                        onReset={handleReset}
                        rateLimit={rateLimit}
                      />
                    )}
                    {selectedTool === "image-to-pdf" && (
                      <ConvertResult
                        imageCount={files.length}
                        outputSize={result.compressedSize}
                        onDownload={handleDownload}
                        onReset={handleReset}
                        rateLimit={rateLimit}
                      />
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          </Tabs>
        </div>
      </div>
    </section>
  )
}
