"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Label } from "./label"

export interface TextFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string
  caption?: string
  error?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  size?: "sm" | "default" | "lg"
  floatingLabel?: boolean
}

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      className,
      label,
      caption,
      error,
      leftIcon,
      rightIcon,
      size = "default",
      floatingLabel = false,
      disabled,
      id,
      placeholder,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = React.useState(false)
    const [hasValue, setHasValue] = React.useState(
      !!props.value || !!props.defaultValue
    )
    const inputId = id || React.useId()

    const sizeClasses = {
      sm: "h-8 text-sm",
      default: "h-10 text-sm",
      lg: "h-12 text-base",
    }

    const iconSizeClasses = {
      sm: "size-4",
      default: "size-4",
      lg: "size-5",
    }

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true)
      props.onFocus?.(e)
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false)
      props.onBlur?.(e)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(!!e.target.value)
      props.onChange?.(e)
    }

    const isFloatingLabelActive = floatingLabel && (isFocused || hasValue)

    return (
      <div className={cn("flex flex-col gap-1.5", className)}>
        {/* Standard Label (non-floating) */}
        {label && !floatingLabel && (
          <Label htmlFor={inputId}>{label}</Label>
        )}

        {/* Input Container */}
        <div className="relative">
          {/* Left Icon */}
          {leftIcon && (
            <div
              className={cn(
                "absolute left-3 top-1/2 -translate-y-1/2 text-grey-50 pointer-events-none",
                isFocused && "text-brand-60",
                error && "text-red-60",
                disabled && "opacity-50"
              )}
            >
              <span className={iconSizeClasses[size]}>{leftIcon}</span>
            </div>
          )}

          {/* Input */}
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            placeholder={floatingLabel ? " " : placeholder}
            className={cn(
              // Base styles
              "flex w-full rounded-lg border bg-white transition-all duration-200 outline-none",
              sizeClasses[size],
              // Padding
              leftIcon ? "pl-10" : "pl-3",
              rightIcon ? "pr-10" : "pr-3",
              // Floating label padding
              floatingLabel && "pt-5 pb-1",
              // Text
              "text-grey-70 placeholder:text-grey-50",
              // Border - default
              "border-grey-20",
              // Hover
              !disabled && "hover:border-grey-40",
              // Focus
              "focus:border-brand-60 focus:ring-2 focus:ring-brand-50/20",
              // Disabled
              disabled && "cursor-not-allowed opacity-50 bg-grey-10",
              // Error state
              error && "border-red-60 focus:border-red-60 focus:ring-red-50/20"
            )}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            {...props}
          />

          {/* Floating Label */}
          {label && floatingLabel && (
            <label
              htmlFor={inputId}
              className={cn(
                "absolute left-3 transition-all duration-200 pointer-events-none",
                leftIcon && "left-10",
                isFloatingLabelActive
                  ? "top-1.5 text-xs text-brand-60 font-medium"
                  : "top-1/2 -translate-y-1/2 text-sm text-grey-50",
                error && isFloatingLabelActive && "text-red-60",
                disabled && "opacity-50"
              )}
            >
              {label}
            </label>
          )}

          {/* Right Icon */}
          {rightIcon && (
            <div
              className={cn(
                "absolute right-3 top-1/2 -translate-y-1/2 text-grey-50 pointer-events-none",
                isFocused && "text-brand-60",
                error && "text-red-60",
                disabled && "opacity-50"
              )}
            >
              <span className={iconSizeClasses[size]}>{rightIcon}</span>
            </div>
          )}
        </div>

        {/* Caption or Error Message */}
        {(caption || error) && (
          <p
            className={cn(
              "text-sm",
              error ? "text-red-60" : "text-grey-50"
            )}
          >
            {error || caption}
          </p>
        )}
      </div>
    )
  }
)
TextField.displayName = "TextField"

export { TextField }
