"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

interface ProgressProps
  extends React.ComponentProps<typeof ProgressPrimitive.Root> {
  showLabel?: boolean
  variant?: "default" | "circular"
  size?: "sm" | "default" | "lg"
}

function Progress({
  className,
  value = 0,
  showLabel = false,
  variant = "default",
  size = "default",
  ...props
}: ProgressProps) {
  const sizeClasses = {
    sm: "h-1",
    default: "h-2",
    lg: "h-3",
  }

  if (variant === "circular") {
    const circleSize = size === "sm" ? 48 : size === "lg" ? 80 : 64
    const strokeWidth = size === "sm" ? 4 : size === "lg" ? 6 : 5
    const radius = (circleSize - strokeWidth) / 2
    const circumference = 2 * Math.PI * radius
    const offset = circumference - ((value || 0) / 100) * circumference

    return (
      <div
        className={cn("relative inline-flex items-center justify-center", className)}
        style={{ width: circleSize, height: circleSize }}
      >
        <svg
          className="rotate-[-90deg]"
          width={circleSize}
          height={circleSize}
        >
          {/* Background circle */}
          <circle
            cx={circleSize / 2}
            cy={circleSize / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-grey-20"
          />
          {/* Progress circle */}
          <circle
            cx={circleSize / 2}
            cy={circleSize / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="text-brand-60 transition-all duration-300"
          />
        </svg>
        {showLabel && (
          <span className="absolute text-sm font-bold text-grey-70">
            {Math.round(value || 0)}%
          </span>
        )}
      </div>
    )
  }

  return (
    <div className={cn("w-full", className)}>
      {showLabel && (
        <div className="mb-1 text-sm font-medium text-grey-70">
          {Math.round(value || 0)}%
        </div>
      )}
      <ProgressPrimitive.Root
        data-slot="progress"
        className={cn(
          "relative w-full overflow-hidden rounded-full bg-grey-20",
          sizeClasses[size]
        )}
        {...props}
      >
        <ProgressPrimitive.Indicator
          data-slot="progress-indicator"
          className="h-full w-full flex-1 rounded-full bg-brand-60 transition-all duration-300"
          style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
        />
      </ProgressPrimitive.Root>
    </div>
  )
}

export { Progress }
