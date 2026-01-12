"use client"

import { useState } from "react"
import Link from "next/link"
import {
  FileDown,
  FilePlus,
  ImageIcon,
  Shield,
  Zap,
  Trash2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const tools = [
  {
    id: "compress",
    label: "Compress PDF",
    icon: FileDown,
    href: "/compress",
    description: "Reduce PDF file size by up to 90% while maintaining quality",
    color: "bg-brand-60",
  },
  {
    id: "merge",
    label: "Merge PDF",
    icon: FilePlus,
    href: "/merge",
    description: "Combine multiple PDFs into a single document",
    color: "bg-green-60",
  },
  {
    id: "image-to-pdf",
    label: "Image to PDF",
    icon: ImageIcon,
    href: "/image-to-pdf",
    description: "Convert JPG, PNG, and other images to PDF",
    color: "bg-blue-60",
  },
]

const trustBadges = [
  {
    icon: Trash2,
    label: "Files deleted after processing",
  },
  {
    icon: Shield,
    label: "256-bit encryption",
  },
  {
    icon: Zap,
    label: "No account required",
  },
]

export function HeroSection() {
  const [selectedTool, setSelectedTool] = useState(tools[0])

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-10 to-white py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-grey-70 sm:text-5xl lg:text-6xl">
            Compress, Merge & Convert PDFs{" "}
            <span className="text-brand-60">Fast & Free</span>
          </h1>
          <p className="mt-6 text-lg text-grey-50 sm:text-xl">
            Server-powered PDF tools with up to 90% compression. No watermarks.
            No signup required.
          </p>
        </div>

        {/* Tool Selector */}
        <div className="mx-auto mt-12 max-w-3xl">
          {/* Tabs */}
          <div className="flex justify-center">
            <div className="inline-flex rounded-full bg-grey-10 p-1">
              {tools.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => setSelectedTool(tool)}
                  className={cn(
                    "flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-all",
                    selectedTool.id === tool.id
                      ? "bg-white text-grey-70 shadow-sm"
                      : "text-grey-50 hover:text-grey-70"
                  )}
                >
                  <tool.icon className="size-4" />
                  <span className="hidden sm:inline">{tool.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Selected Tool Card */}
          <div className="mt-8 rounded-2xl border border-grey-20 bg-white p-8 shadow-lg">
            <div className="flex flex-col items-center text-center">
              <div
                className={cn(
                  "flex size-16 items-center justify-center rounded-2xl",
                  selectedTool.color
                )}
              >
                <selectedTool.icon className="size-8 text-white" />
              </div>
              <h2 className="mt-4 text-2xl font-bold text-grey-70">
                {selectedTool.label}
              </h2>
              <p className="mt-2 text-grey-50">{selectedTool.description}</p>
              <Button size="lg" className="mt-6" asChild>
                <Link href={selectedTool.href}>
                  Start {selectedTool.label.split(" ")[0]}ing
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mx-auto mt-12 flex max-w-2xl flex-wrap items-center justify-center gap-6 sm:gap-8">
          {trustBadges.map((badge) => (
            <div
              key={badge.label}
              className="flex items-center gap-2 text-sm text-grey-50"
            >
              <badge.icon className="size-4 text-green-60" />
              <span>{badge.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
