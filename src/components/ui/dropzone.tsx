"use client"

import * as React from "react"
import { File, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "./button"

interface DropzoneProps extends React.HTMLAttributes<HTMLDivElement> {
  onFilesSelected?: (files: File[]) => void
  accept?: string
  multiple?: boolean
  maxSize?: number // in bytes
  disabled?: boolean
  label?: string
  description?: string
}

function Dropzone({
  className,
  onFilesSelected,
  accept,
  multiple = false,
  maxSize,
  disabled = false,
  label = "Upload files",
  description,
  ...props
}: DropzoneProps) {
  const [isDragOver, setIsDragOver] = React.useState(false)
  const [files, setFiles] = React.useState<File[]>([])
  const inputRef = React.useRef<HTMLInputElement>(null)

  const handleDragOver = React.useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      if (!disabled) {
        setIsDragOver(true)
      }
    },
    [disabled]
  )

  const handleDragLeave = React.useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(false)
  }, [])

  const processFiles = React.useCallback(
    (fileList: FileList | null) => {
      if (!fileList) return

      const newFiles = Array.from(fileList).filter((file) => {
        if (maxSize && file.size > maxSize) {
          return false
        }
        return true
      })

      const selectedFiles = multiple ? newFiles : newFiles.slice(0, 1)
      setFiles(selectedFiles)
      onFilesSelected?.(selectedFiles)
    },
    [maxSize, multiple, onFilesSelected]
  )

  const handleDrop = React.useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragOver(false)

      if (disabled) return
      processFiles(e.dataTransfer.files)
    },
    [disabled, processFiles]
  )

  const handleFileSelect = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      processFiles(e.target.files)
    },
    [processFiles]
  )

  const handleClick = React.useCallback(() => {
    if (!disabled) {
      inputRef.current?.click()
    }
  }, [disabled])

  const removeFile = React.useCallback(
    (index: number) => {
      const newFiles = files.filter((_, i) => i !== index)
      setFiles(newFiles)
      onFilesSelected?.(newFiles)
    },
    [files, onFilesSelected]
  )

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <div className={cn("w-full", className)} {...props}>
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        onClick={handleClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            handleClick()
          }
        }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "relative flex flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed p-8 transition-all duration-200 cursor-pointer",
          // Default state
          "border-grey-30 bg-grey-10",
          // Hover state
          "hover:border-brand-50 hover:bg-brand-10/50",
          // Drag over state
          isDragOver && "border-brand-60 bg-brand-10",
          // Disabled state
          disabled && "cursor-not-allowed opacity-50 hover:border-grey-30 hover:bg-grey-10"
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileSelect}
          disabled={disabled}
          className="hidden"
        />

        <Button
          type="button"
          variant="default"
          size="default"
          disabled={disabled}
          onClick={(e) => {
            e.stopPropagation()
            handleClick()
          }}
        >
          {label}
        </Button>

        {description && (
          <p className="text-sm text-grey-50 text-center">{description}</p>
        )}
      </div>

      {/* Selected files list */}
      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((file, index) => (
            <div
              key={`${file.name}-${index}`}
              className="flex items-center gap-3 rounded-lg border border-grey-20 bg-white p-3"
            >
              <File className="size-5 text-grey-50 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-grey-70 truncate">
                  {file.name}
                </p>
                <p className="text-xs text-grey-50">
                  {formatFileSize(file.size)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="rounded-lg p-1 text-grey-50 hover:text-grey-70 hover:bg-grey-10 transition-colors"
              >
                <X className="size-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export { Dropzone }
