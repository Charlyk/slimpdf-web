"use client"

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
  XIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4 text-green-60" />,
        info: <InfoIcon className="size-4 text-blue-60" />,
        warning: <TriangleAlertIcon className="size-4 text-yellow-60" />,
        error: <OctagonXIcon className="size-4 text-red-60" />,
        loading: <Loader2Icon className="size-4 animate-spin text-brand-60" />,
        close: <XIcon className="size-4" />,
      }}
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-white group-[.toaster]:text-grey-70 group-[.toaster]:border-grey-20 group-[.toaster]:shadow-md group-[.toaster]:rounded-lg",
          title: "group-[.toast]:text-grey-70 group-[.toast]:font-bold",
          description: "group-[.toast]:text-grey-50",
          actionButton:
            "group-[.toast]:bg-brand-60 group-[.toast]:text-white group-[.toast]:rounded-full group-[.toast]:font-bold group-[.toast]:px-3",
          cancelButton:
            "group-[.toast]:bg-grey-10 group-[.toast]:text-grey-70 group-[.toast]:rounded-full",
          closeButton:
            "group-[.toast]:bg-grey-10 group-[.toast]:text-grey-50 group-[.toast]:border-grey-20 group-[.toast]:hover:bg-grey-20",
          success: "group-[.toaster]:border-l-4 group-[.toaster]:border-l-green-60",
          error: "group-[.toaster]:border-l-4 group-[.toaster]:border-l-red-60",
          warning: "group-[.toaster]:border-l-4 group-[.toaster]:border-l-yellow-60",
          info: "group-[.toaster]:border-l-4 group-[.toaster]:border-l-blue-60",
        },
      }}
      style={
        {
          "--normal-bg": "var(--white)",
          "--normal-text": "var(--grey-70)",
          "--normal-border": "var(--grey-20)",
          "--border-radius": "0.5rem",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
