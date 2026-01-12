"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"

import { cn } from "@/lib/utils"

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn("grid gap-3", className)}
      {...props}
    />
  )
}

function RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        // Base
        "peer aspect-square size-5 shrink-0 rounded-full border-2 transition-all duration-200 outline-none",
        // Default state
        "border-grey-30 bg-white",
        // Hover
        "hover:border-brand-50",
        // Checked state
        "data-[state=checked]:border-brand-60",
        // Focus
        "focus-visible:ring-2 focus-visible:ring-brand-50/20 focus-visible:ring-offset-2",
        // Disabled
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-grey-10",
        // Error
        "aria-invalid:border-red-60",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="flex items-center justify-center"
      >
        <div className="size-2.5 rounded-full bg-brand-60" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
}

export { RadioGroup, RadioGroupItem }
