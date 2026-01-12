import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps extends React.ComponentProps<"input"> {
  error?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        data-slot="input"
        data-error={error}
        className={cn(
          // Base styles
          "flex h-10 w-full rounded-lg border bg-white px-3 py-2 text-sm text-grey-70 transition-all duration-200",
          // Placeholder
          "placeholder:text-grey-50",
          // Border
          "border-grey-20",
          // Hover
          "hover:border-grey-40",
          // Focus
          "focus:outline-none focus:border-brand-60 focus:ring-2 focus:ring-brand-50/20",
          // Disabled
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-grey-10",
          // Error state
          error && "border-red-60 focus:border-red-60 focus:ring-red-50/20",
          // File input styles
          "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-grey-70",
          className
        )}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
