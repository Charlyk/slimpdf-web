"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "@/lib/utils"

function TooltipProvider({
  delayDuration = 200,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  )
}

function Tooltip({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  )
}

function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
}

interface TooltipContentProps
  extends React.ComponentProps<typeof TooltipPrimitive.Content> {
  variant?: "contrast" | "subtle" | "accent"
}

function TooltipContent({
  className,
  sideOffset = 4,
  variant = "contrast",
  children,
  ...props
}: TooltipContentProps) {
  const variantClasses = {
    contrast: "bg-grey-70 text-white",
    subtle: "bg-white text-grey-70 border border-grey-20 shadow-md",
    accent: "bg-brand-60 text-white",
  }

  const arrowClasses = {
    contrast: "fill-grey-70",
    subtle: "fill-white",
    accent: "fill-brand-60",
  }

  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          "z-50 rounded-lg px-3 py-1.5 text-sm",
          "animate-in fade-in-0 zoom-in-95",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
          "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
          "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          variantClasses[variant],
          className
        )}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow
          className={cn("size-2", arrowClasses[variant])}
        />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
