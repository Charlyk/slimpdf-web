"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { CheckIcon, MinusIcon } from "lucide-react"

import { cn } from "@/lib/utils"

interface CheckboxProps
  extends React.ComponentProps<typeof CheckboxPrimitive.Root> {
  indeterminate?: boolean
}

function Checkbox({
  className,
  indeterminate,
  ...props
}: CheckboxProps) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        // Base
        "peer size-5 shrink-0 rounded border-2 transition-all duration-200 outline-none",
        // Default state
        "border-grey-30 bg-white",
        // Hover
        "hover:border-brand-50",
        // Checked state
        "data-[state=checked]:bg-brand-60 data-[state=checked]:border-brand-60 data-[state=checked]:text-white",
        // Indeterminate state
        "data-[state=indeterminate]:bg-brand-60 data-[state=indeterminate]:border-brand-60 data-[state=indeterminate]:text-white",
        // Focus
        "focus-visible:ring-2 focus-visible:ring-brand-50/20 focus-visible:ring-offset-2",
        // Disabled
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-grey-10",
        // Error
        "aria-invalid:border-red-60 aria-invalid:data-[state=checked]:bg-red-60 aria-invalid:data-[state=checked]:border-red-60",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current"
      >
        {indeterminate ? (
          <MinusIcon className="size-3.5 stroke-[3]" />
        ) : (
          <CheckIcon className="size-3.5 stroke-[3]" />
        )}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
