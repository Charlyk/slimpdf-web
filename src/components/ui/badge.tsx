import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap transition-colors [&_svg]:size-3 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Status badges - outlined
        success: "bg-green-10 text-green-70 border border-green-30",
        error: "bg-red-10 text-red-70 border border-red-30",
        warning: "bg-yellow-10 text-yellow-70 border border-yellow-30",
        info: "bg-blue-10 text-blue-70 border border-blue-30",
        // Status badges - filled
        "success-filled": "bg-green-60 text-white",
        "error-filled": "bg-red-60 text-white",
        "warning-filled": "bg-yellow-50 text-grey-100",
        "info-filled": "bg-blue-60 text-white",
        // Default variants
        default: "bg-brand-60 text-white",
        secondary: "bg-grey-10 text-grey-70 border border-grey-20",
        outline: "bg-transparent text-grey-70 border border-grey-30",
        // Notification badge
        notification: "bg-red-60 text-white min-w-5 h-5 p-0 justify-center",
      },
      size: {
        sm: "text-xs px-2 py-0.5",
        default: "text-xs px-2.5 py-0.5",
        lg: "text-sm px-3 py-1",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Badge({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
