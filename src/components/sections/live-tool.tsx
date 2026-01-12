"use client"

import { useState } from "react"
import {
  FileDown,
  FilePlus,
  ImageIcon,
  X,
  Download,
  CheckCircle2,
  Loader2,
  Upload,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

type Tool = "compress" | "merge" | "image-to-pdf"
type ProcessingState = "idle" | "selected" | "processing" | "complete"

const tools = [
  { id: "compress" as Tool, label: "Compress", icon: FileDown, accept: ".pdf" },
  { id: "merge" as Tool, label: "Merge", icon: FilePlus, accept: ".pdf" },
  { id: "image-to-pdf" as Tool, label: "Image to PDF", icon: ImageIcon, accept: ".jpg,.jpeg,.png,.webp" },
]

const qualityOptions = [
  { id: "low", label: "Low" },
  { id: "medium", label: "Medium" },
  { id: "high", label: "High" },
]

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B"
  const k = 1024
  const sizes = ["B", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i]
}

export function LiveToolSection() {
  const [selectedTool, setSelectedTool] = useState<Tool>("compress")
  const [files, setFiles] = useState<File[]>([])
  const [quality, setQuality] = useState("medium")
  const [state, setState] = useState<ProcessingState>("idle")
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState<{ originalSize: number; compressedSize: number; reduction: number } | null>(null)

  const currentTool = tools.find((t) => t.id === selectedTool)!

  const handleFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])
    if (selectedFiles.length > 0) {
      setFiles(selectedFiles)
      setState("selected")
      setResult(null)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const droppedFiles = Array.from(e.dataTransfer.files)
    if (droppedFiles.length > 0) {
      setFiles(droppedFiles)
      setState("selected")
      setResult(null)
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
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((resolve) => setTimeout(resolve, 150))
      setProgress(i)
    }
    const originalSize = files[0]?.size || 12400000
    const compressedSize = Math.floor(originalSize * 0.17)
    const reduction = Math.round((1 - compressedSize / originalSize) * 100)
    setResult({ originalSize, compressedSize, reduction })
    setState("complete")
  }

  const handleReset = () => {
    setFiles([])
    setState("idle")
    setProgress(0)
    setResult(null)
  }

  return (
    <section className="border-y border-border bg-muted/30 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          {/* Tool Tabs */}
          <div className="mb-6 flex justify-center">
            <div className="inline-flex rounded-lg border border-border bg-background p-1">
              {tools.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => { setSelectedTool(tool.id); handleReset() }}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors",
                    selectedTool === tool.id
                      ? "bg-brand-60 text-white"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <tool.icon className="size-4" />
                  {tool.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tool Card */}
          <div className="rounded-xl border border-border bg-background p-6 shadow-sm">
            {/* Idle State - Dropzone */}
            {state === "idle" && (
              <label
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border py-12 transition-colors hover:border-primary/50 hover:bg-muted/50"
              >
                <input type="file" accept={currentTool.accept} multiple={selectedTool !== "compress"} onChange={handleFilesSelected} className="hidden" />
                <Upload className="size-10 text-muted-foreground" />
                <p className="mt-4 font-medium">Drop files here or click to browse</p>
                <p className="mt-1 text-sm text-muted-foreground">Max 20MB free · 100MB with Pro</p>
              </label>
            )}

            {/* Selected State */}
            {state === "selected" && (
              <div className="space-y-4">
                {files.map((file, index) => (
                  <div key={`${file.name}-${index}`} className="flex items-center gap-3 rounded-lg border border-border bg-muted/30 p-3">
                    <FileDown className="size-5 text-brand-60 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{file.name}</p>
                      <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                    </div>
                    <button onClick={() => removeFile(index)} className="rounded p-1 hover:bg-muted">
                      <X className="size-4 text-muted-foreground" />
                    </button>
                  </div>
                ))}

                {selectedTool === "compress" && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Quality:</span>
                    {qualityOptions.map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => setQuality(opt.id)}
                        className={cn(
                          "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                          quality === opt.id ? "bg-brand-60 text-white" : "bg-muted text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}

                <Button onClick={handleProcess} className="w-full">
                  {selectedTool === "compress" && "Compress PDF"}
                  {selectedTool === "merge" && "Merge PDFs"}
                  {selectedTool === "image-to-pdf" && "Convert to PDF"}
                </Button>
              </div>
            )}

            {/* Processing State */}
            {state === "processing" && (
              <div className="py-8 text-center">
                <Loader2 className="mx-auto size-10 animate-spin text-brand-60" />
                <p className="mt-4 font-medium">Processing...</p>
                <div className="mt-4 mx-auto max-w-xs">
                  <Progress value={progress} className="h-1.5" />
                </div>
              </div>
            )}

            {/* Complete State */}
            {state === "complete" && result && (
              <div className="text-center">
                <CheckCircle2 className="mx-auto size-10 text-green-60" />
                <p className="mt-4 font-medium">Compression complete!</p>
                <div className="mt-4 rounded-lg bg-muted/50 p-4">
                  <p className="text-2xl font-bold">
                    {formatFileSize(result.originalSize)} → <span className="text-green-60">{formatFileSize(result.compressedSize)}</span>
                  </p>
                  <p className="mt-1 text-sm text-green-60 font-medium">{result.reduction}% smaller</p>
                </div>
                <Button className="mt-4 w-full">
                  <Download className="mr-2 size-4" />
                  Download PDF
                </Button>
                <button onClick={handleReset} className="mt-3 text-sm text-brand-60 hover:underline">
                  Compress another file
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
