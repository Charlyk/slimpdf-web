"use client"

import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

interface SwitchProps
  extends React.ComponentProps<typeof SwitchPrimitive.Root> {
  size?: "default" | "lg"
}

function Switch({
  className,
  size = "default",
  ...props
}: SwitchProps) {
  const sizeClasses = {
    default: "h-5 w-9",
    lg: "h-6 w-11",
  }

  const thumbSizeClasses = {
    default: "size-4 data-[state=checked]:translate-x-4",
    lg: "size-5 data-[state=checked]:translate-x-5",
  }

  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer inline-flex shrink-0 items-center rounded-full transition-all duration-200 outline-none",
        // Unchecked state
        "bg-grey-30",
        // Checked state
        "data-[state=checked]:bg-brand-60",
        // Focus
        "focus-visible:ring-2 focus-visible:ring-brand-50/20 focus-visible:ring-offset-2",
        // Disabled
        "disabled:cursor-not-allowed disabled:opacity-50",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none block rounded-full bg-white shadow-sm transition-transform",
          "data-[state=unchecked]:translate-x-0.5",
          thumbSizeClasses[size]
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
