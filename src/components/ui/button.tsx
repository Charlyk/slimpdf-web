import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-bold transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-50 cursor-pointer select-none",
  {
    variants: {
      variant: {
        // Primary filled button - brand purple
        default:
          "bg-brand-60 text-white hover:bg-brand-70 active:bg-brand-80",
        // Secondary button - subtle grey background
        secondary:
          "bg-grey-10 text-grey-70 hover:bg-grey-20 active:bg-grey-30",
        // Outline button - border with transparent background
        outline:
          "border-2 border-brand-60 bg-transparent text-brand-60 hover:bg-brand-10 active:bg-brand-20",
        // Ghost button - no background, just text
        ghost:
          "bg-transparent text-brand-60 hover:bg-brand-10 active:bg-brand-20",
        // Link button - text with underline
        link: "bg-transparent text-brand-60 underline-offset-4 hover:underline p-0 h-auto",
        // Destructive button - red for dangerous actions
        destructive:
          "bg-red-60 text-white hover:bg-red-70 active:bg-red-80 focus-visible:ring-red-50",
        // Destructive outline
        "destructive-outline":
          "border-2 border-red-60 bg-transparent text-red-60 hover:bg-red-10 active:bg-red-20 focus-visible:ring-red-50",
        // Destructive ghost
        "destructive-ghost":
          "bg-transparent text-red-60 hover:bg-red-10 active:bg-red-20 focus-visible:ring-red-50",
      },
      size: {
        sm: "h-8 px-3 text-sm gap-1.5 [&_svg:not([class*='size-'])]:size-4",
        default: "h-10 px-4 text-sm gap-2 [&_svg:not([class*='size-'])]:size-4",
        lg: "h-12 px-6 text-base gap-2 [&_svg:not([class*='size-'])]:size-5",
        icon: "size-10 p-0",
        "icon-sm": "size-8 p-0",
        "icon-lg": "size-12 p-0",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      fullWidth: false,
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      fullWidth = false,
      asChild = false,
      loading = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button"
    const isDisabled = disabled || loading

    // For icon-only buttons, don't render left/right icons
    const isIconSize = size === "icon" || size === "icon-sm" || size === "icon-lg"

    return (
      <Comp
        ref={ref}
        data-slot="button"
        data-variant={variant}
        data-size={size}
        data-loading={loading}
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        disabled={isDisabled}
        {...props}
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin" />
            {!isIconSize && children && (
              <span className="opacity-0">{children}</span>
            )}
          </>
        ) : (
          <>
            {leftIcon && !isIconSize && leftIcon}
            {children}
            {rightIcon && !isIconSize && rightIcon}
          </>
        )}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
