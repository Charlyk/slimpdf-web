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
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SlimPdfClient, type CompressionQuality, type JobResult } from "@/lib/slimpdf-client/dist"

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
const client = new SlimPdfClient({
  environment: process.env.NODE_ENV === "production" ? "production" : "development",
})

// Result view components
interface ResultViewProps {
  onDownload: () => void
  onReset: () => void
}

interface CompressResultProps extends ResultViewProps {
  originalSize: number
  compressedSize: number
  reduction: number
}

function CompressResult({ originalSize, compressedSize, reduction, onDownload, onReset }: CompressResultProps) {
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
        {t("compressAnother")}
      </button>
    </div>
  )
}

interface MergeResultProps extends ResultViewProps {
  fileCount: number
  outputSize: number
}

function MergeResult({ fileCount, outputSize, onDownload, onReset }: MergeResultProps) {
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
        {t("mergeAnother")}
      </button>
    </div>
  )
}

interface ConvertResultProps extends ResultViewProps {
  imageCount: number
  outputSize: number
}

function ConvertResult({ imageCount, outputSize, onDownload, onReset }: ConvertResultProps) {
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
        {t("convertAnother")}
      </button>
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
  const jobResultRef = useRef<JobResult | null>(null)

  const t = useTranslations("home.liveTool")
  const currentTool = tools.find((t) => t.id === selectedTool)!

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

    try {
      let jobResult: JobResult

      const pollOptions = {
        onStatusChange: (status: { status: string }) => {
          if (status.status === "pending") {
            setProgress(25)
          } else if (status.status === "processing") {
            setProgress(50)
          }
        },
      }

      if (selectedTool === "compress") {
        jobResult = await client.compress.submitAndWait(files[0], { quality }, pollOptions)
      } else if (selectedTool === "merge") {
        jobResult = await client.merge.submitAndWait(files, pollOptions)
      } else {
        jobResult = await client.imageToPdf.submitAndWait(files, { pageSize: "original" }, pollOptions)
      }

      setProgress(100)
      jobResultRef.current = jobResult

      const { original_size, output_size, reduction_percent } = jobResult.status
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
                    <p className="mt-4 font-heading">{t("dropzone.title")}</p>
                    <p className="mt-1 text-sm">{t("dropzone.limits")}</p>
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
                        <span className="text-sm font-heading">{t("quality.label")}</span>
                        <Tabs value={quality} onValueChange={(v) => setQuality(v as CompressionQuality)}>
                          <TabsList>
                            {qualityKeys.map((key) => (
                              <TabsTrigger key={key} value={key} className="text-sm">
                                {t(`quality.${key}`)}
                              </TabsTrigger>
                            ))}
                          </TabsList>
                        </Tabs>
                      </div>
                    )}

                    <Button onClick={handleProcess} className="w-full">
                      {selectedTool === "compress" && t("actions.compressPdf")}
                      {selectedTool === "merge" && t("actions.mergePdfs")}
                      {selectedTool === "image-to-pdf" && t("actions.convertToPdf")}
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
                      />
                    )}
                    {selectedTool === "merge" && (
                      <MergeResult
                        fileCount={files.length}
                        outputSize={result.compressedSize}
                        onDownload={handleDownload}
                        onReset={handleReset}
                      />
                    )}
                    {selectedTool === "image-to-pdf" && (
                      <ConvertResult
                        imageCount={files.length}
                        outputSize={result.compressedSize}
                        onDownload={handleDownload}
                        onReset={handleReset}
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
