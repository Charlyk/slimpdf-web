"use client"

import { useState, useRef } from "react"
import {
  ImageIcon,
  X,
  Download,
  CheckCircle2,
  Loader2,
  Upload,
  AlertCircle,
  GripVertical,
} from "lucide-react"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { SlimPdfClient, type PageSize, type JobResult, type RateLimitInfo } from "@/lib/slimpdf-client/dist"
import { cn } from "@/lib/utils"

const API_URL = process.env.NODE_ENV === "production"
  ? "https://api.slimpdf.io"
  : "https://dev.api.slimpdf.io"

type ProcessingState = "idle" | "selected" | "processing" | "complete" | "error"

const pageSizeOptions = [
  { value: "a4" as const, labelKey: "a4" },
  { value: "letter" as const, labelKey: "letter" },
  { value: "original" as const, labelKey: "original" },
]

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/tiff", "image/bmp", "image/gif"]

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B"
  const k = 1024
  const sizes = ["B", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i]
}

// Create a single client instance
const client = new SlimPdfClient({ baseUrl: API_URL })

interface ImageToPdfToolProps {
  className?: string
}

interface ImageFile {
  file: File
  preview: string
}

export function ImageToPdfTool({ className }: ImageToPdfToolProps) {
  const [images, setImages] = useState<ImageFile[]>([])
  const [pageSize, setPageSize] = useState<PageSize>("a4")
  const [state, setState] = useState<ProcessingState>("idle")
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<{ imageCount: number; totalSize: number } | null>(null)
  const [rateLimit, setRateLimit] = useState<RateLimitInfo | undefined>(undefined)
  const [isDragOver, setIsDragOver] = useState(false)
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
  const jobResultRef = useRef<JobResult | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const t = useTranslations("imageToPdf.tool")

  const handleFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])
    addImages(selectedFiles)
  }

  const addImages = (files: File[]) => {
    const imageFiles = files.filter(f => ACCEPTED_TYPES.includes(f.type))
    if (imageFiles.length > 0) {
      const newImages = imageFiles.map(file => ({
        file,
        preview: URL.createObjectURL(file),
      }))
      setImages(prev => [...prev, ...newImages])
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
    const droppedFiles = Array.from(e.dataTransfer.files)
    addImages(droppedFiles)
  }

  const handleRemoveImage = (index: number) => {
    setImages(prev => {
      const newImages = [...prev]
      URL.revokeObjectURL(newImages[index].preview)
      newImages.splice(index, 1)
      if (newImages.length === 0) {
        setState("idle")
      }
      return newImages
    })
  }

  // Drag reordering
  const handleImageDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index)
    e.dataTransfer.effectAllowed = "move"
  }

  const handleImageDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    if (draggedIndex === null || draggedIndex === index) return

    setImages(prev => {
      const newImages = [...prev]
      const [draggedImage] = newImages.splice(draggedIndex, 1)
      newImages.splice(index, 0, draggedImage)
      return newImages
    })
    setDraggedIndex(index)
  }

  const handleImageDragEnd = () => {
    setDraggedIndex(null)
  }

  const handleProcess = async () => {
    if (images.length === 0) return

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
      const files = images.map(img => img.file)
      const response = await client.imageToPdf.submit(files, { pageSize })
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

      setResult({
        imageCount: images.length,
        totalSize: status.output_size || 0,
      })
      setState("complete")
    } catch (err) {
      console.error("Conversion error:", err)
      setError(err instanceof Error ? err.message : t("error.generic"))
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
      a.download = "images.pdf"
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
    images.forEach(img => URL.revokeObjectURL(img.preview))
    setImages([])
    setState("idle")
    setProgress(0)
    setResult(null)
    setError(null)
    setRateLimit(undefined)
    jobResultRef.current = null
    if (inputRef.current) {
      inputRef.current.value = ""
    }
  }

  const handleAddMore = () => {
    inputRef.current?.click()
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
              accept="image/jpeg,image/png,image/webp,image/tiff,image/bmp,image/gif"
              multiple
              onChange={handleFilesSelected}
              className="hidden"
            />
            <Upload className="size-12 text-foreground" />
            <p className="mt-4 text-lg font-heading">{t("dropzone.title")}</p>
            <p className="mt-2 text-sm text-muted-foreground">{t("dropzone.subtitle")}</p>
          </label>
        )}

        {/* Selected State */}
        {state === "selected" && images.length > 0 && (
          <div className="space-y-6">
            {/* Image list header */}
            <div className="flex items-center justify-between">
              <p className="font-heading">{t("fileList.title")} ({images.length})</p>
              <p className="text-sm text-muted-foreground">{t("fileList.reorderHint")}</p>
            </div>

            {/* Image list */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {images.map((image, index) => (
                <div
                  key={`${image.file.name}-${index}`}
                  draggable
                  onDragStart={(e) => handleImageDragStart(e, index)}
                  onDragOver={(e) => handleImageDragOver(e, index)}
                  onDragEnd={handleImageDragEnd}
                  className={cn(
                    "relative group rounded-base border-2 border-border bg-background overflow-hidden cursor-grab active:cursor-grabbing transition-colors",
                    draggedIndex === index && "border-main ring-2 ring-main/20"
                  )}
                >
                  <div className="aspect-square relative">
                    <img
                      src={image.preview}
                      alt={image.file.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors" />
                    <div className="absolute top-1 left-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <GripVertical className="size-5 text-white drop-shadow" />
                    </div>
                    <button
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-1 right-1 rounded-full bg-black/60 p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80"
                    >
                      <X className="size-4 text-white" />
                    </button>
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-2 py-1">
                      <p className="text-xs text-white truncate">{image.file.name}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add more images */}
            <input
              ref={inputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/tiff,image/bmp,image/gif"
              multiple
              onChange={handleFilesSelected}
              className="hidden"
            />
            <button
              onClick={handleAddMore}
              className="w-full rounded-base border-2 border-dashed border-border py-3 text-sm font-medium text-muted-foreground hover:border-main hover:text-foreground transition-colors"
            >
              + Add more images
            </button>

            {/* Page size selector */}
            <div className="space-y-3">
              <Label className="text-base font-heading">{t("pageSize.label")}</Label>
              <RadioGroup
                value={pageSize}
                onValueChange={(v) => setPageSize(v as PageSize)}
                className="flex flex-wrap gap-3"
              >
                {pageSizeOptions.map((option) => (
                  <label
                    key={option.value}
                    className={cn(
                      "flex items-center gap-2 rounded-base border-2 px-4 py-2 cursor-pointer transition-colors",
                      pageSize === option.value
                        ? "border-main bg-main/5"
                        : "border-border hover:border-main/50"
                    )}
                  >
                    <RadioGroupItem value={option.value} />
                    <span className="text-sm font-medium">{t(`pageSize.${option.labelKey}`)}</span>
                  </label>
                ))}
              </RadioGroup>
            </div>

            {/* Convert button */}
            <Button onClick={handleProcess} className="w-full text-lg py-6">
              {t("actions.convert")}
            </Button>
          </div>
        )}

        {/* Processing State */}
        {state === "processing" && (
          <div className="py-12 text-center">
            <Loader2 className="mx-auto size-12 animate-spin text-main" />
            <p className="mt-6 text-lg font-heading">{t("processing.converting")}</p>
            <div className="mt-6 mx-auto max-w-xs">
              <Progress value={progress} className="h-3" />
            </div>
          </div>
        )}

        {/* Error State */}
        {state === "error" && (
          <div className="py-12 text-center">
            <AlertCircle className="mx-auto size-12 text-destructive" />
            <p className="mt-4 text-lg font-heading">{t("error.title")}</p>
            <p className="mt-2 text-muted-foreground">{error}</p>
            <Button onClick={handleReset} variant="neutral" className="mt-6">
              {t("error.tryAgain")}
            </Button>
          </div>
        )}

        {/* Complete State */}
        {state === "complete" && result && (
          <div className="text-center">
            <CheckCircle2 className="mx-auto size-12 text-chart-1" />
            <p className="mt-4 text-lg font-heading">{t("result.title")}</p>

            {/* Result info */}
            <div className="mt-6 rounded-base border-2 border-border bg-background p-6">
              <div className="flex items-center justify-center gap-6 text-lg">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">{t("result.imageCount", { count: result.imageCount })}</p>
                </div>
                <div className="h-8 w-px bg-border" />
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">{t("result.fileSize", { size: formatFileSize(result.totalSize) })}</p>
                </div>
              </div>
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
