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
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
    <section className="border-t-[3px] border-border bg-secondary-background py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          {/* Tool Tabs */}
          <Tabs value={selectedTool} onValueChange={(v) => { setSelectedTool(v as Tool); handleReset() }} className="w-full">
            <div className="mb-6 flex justify-center">
              <TabsList>
                {tools.map((tool) => (
                  <TabsTrigger key={tool.id} value={tool.id} className="gap-2">
                    <tool.icon className="size-4" />
                    {tool.label}
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
                    <p className="mt-4 font-heading">Drop files here or click to browse</p>
                    <p className="mt-1 text-sm">Max 20MB free · 100MB with Pro</p>
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
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-heading">Quality:</span>
                        {qualityOptions.map((opt) => (
                          <button
                            key={opt.id}
                            onClick={() => setQuality(opt.id)}
                            className={cn(
                              "rounded-base border-2 border-border px-3 py-1.5 text-sm font-base transition-all",
                              quality === opt.id
                                ? "bg-main text-main-foreground shadow-shadow"
                                : "bg-secondary-background hover:translate-x-boxShadowX hover:translate-y-boxShadowY"
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
                    <Loader2 className="mx-auto size-10 animate-spin text-main" />
                    <p className="mt-4 font-heading">Processing...</p>
                    <div className="mt-4 mx-auto max-w-xs">
                      <Progress value={progress} className="h-2" />
                    </div>
                  </div>
                )}

                {/* Complete State */}
                {state === "complete" && result && (
                  <div className="text-center">
                    <CheckCircle2 className="mx-auto size-10 text-chart-1" />
                    <p className="mt-4 font-heading">Compression complete!</p>
                    <div className="mt-4 rounded-base border-2 border-border bg-background p-4">
                      <p className="text-2xl font-heading">
                        {formatFileSize(result.originalSize)} → <span className="text-chart-1">{formatFileSize(result.compressedSize)}</span>
                      </p>
                      <p className="mt-1 text-sm text-chart-1 font-heading">{result.reduction}% smaller</p>
                    </div>
                    <Button className="mt-4 w-full">
                      <Download className="size-4" />
                      Download PDF
                    </Button>
                    <button onClick={handleReset} className="mt-3 text-sm font-heading text-main hover:underline">
                      Compress another file
                    </button>
                  </div>
                )}
              </CardContent>
            </Card>
          </Tabs>
        </div>
      </div>
    </section>
  )
}
