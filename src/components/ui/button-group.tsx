import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonGroupVariants = cva("inline-flex", {
  variants: {
    size: {
      sm: "",
      default: "",
      lg: "",
    },
  },
  defaultVariants: {
    size: "default",
  },
})

const buttonGroupItemVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-bold transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-brand-50 focus-visible:ring-offset-0 cursor-pointer select-none border border-grey-20 bg-white text-brand-60 hover:bg-brand-10 active:bg-brand-20",
  {
    variants: {
      size: {
        sm: "h-8 px-3 text-sm gap-1.5",
        default: "h-10 px-4 text-sm gap-2",
        lg: "h-12 px-6 text-base gap-2",
      },
      position: {
        first: "rounded-l-full border-r-0",
        middle: "border-r-0",
        last: "rounded-r-full",
        only: "rounded-full",
      },
      selected: {
        true: "bg-brand-60 text-white border-brand-60 hover:bg-brand-70 active:bg-brand-80",
        false: "",
      },
    },
    defaultVariants: {
      size: "default",
      position: "only",
      selected: false,
    },
  }
)

interface ButtonGroupContextValue {
  size: "sm" | "default" | "lg"
}

const ButtonGroupContext = React.createContext<ButtonGroupContextValue>({
  size: "default",
})

export interface ButtonGroupProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof buttonGroupVariants> {}

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className, size = "default", children, ...props }, ref) => {
    const childArray = React.Children.toArray(children)
    const childCount = childArray.length

    const childrenWithPosition = React.Children.map(children, (child, index) => {
      if (!React.isValidElement(child)) return child

      let position: "first" | "middle" | "last" | "only" = "only"
      if (childCount === 1) {
        position = "only"
      } else if (index === 0) {
        position = "first"
      } else if (index === childCount - 1) {
        position = "last"
      } else {
        position = "middle"
      }

      return React.cloneElement(child as React.ReactElement<ButtonGroupItemProps>, {
        position,
      })
    })

    return (
      <ButtonGroupContext.Provider value={{ size: size || "default" }}>
        <div
          ref={ref}
          role="group"
          className={cn(buttonGroupVariants({ size, className }))}
          {...props}
        >
          {childrenWithPosition}
        </div>
      </ButtonGroupContext.Provider>
    )
  }
)
ButtonGroup.displayName = "ButtonGroup"

export interface ButtonGroupItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    Omit<VariantProps<typeof buttonGroupItemVariants>, "size"> {
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const ButtonGroupItem = React.forwardRef<HTMLButtonElement, ButtonGroupItemProps>(
  (
    {
      className,
      position = "only",
      selected = false,
      leftIcon,
      rightIcon,
      children,
      ...props
    },
    ref
  ) => {
    const { size } = React.useContext(ButtonGroupContext)

    return (
      <button
        ref={ref}
        type="button"
        data-selected={selected}
        className={cn(
          buttonGroupItemVariants({ size, position, selected, className })
        )}
        {...props}
      >
        {leftIcon && leftIcon}
        {children}
        {rightIcon && rightIcon}
      </button>
    )
  }
)
ButtonGroupItem.displayName = "ButtonGroupItem"

export { ButtonGroup, ButtonGroupItem, buttonGroupVariants, buttonGroupItemVariants }
