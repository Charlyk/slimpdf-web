"use client"

import Link from "next/link"
import { FileText, Sun, Moon, Monitor } from "lucide-react"

import { useTheme } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

const footerLinks = {
  tools: [
    { href: "/compress", label: "Compress PDF" },
    { href: "/merge", label: "Merge PDF" },
    { href: "/image-to-pdf", label: "Image to PDF" },
    { href: "/docs/api", label: "API Docs" },
  ],
  company: [
    { href: "/about", label: "About" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ],
  legal: [
    { href: "/privacy", label: "Privacy" },
    { href: "/terms", label: "Terms" },
  ],
}

const themeOptions = [
  { value: "light" as const, icon: Sun, label: "Light" },
  { value: "dark" as const, icon: Moon, label: "Dark" },
  { value: "system" as const, icon: Monitor, label: "System" },
]

export function Footer() {
  const { theme, setTheme } = useTheme()

  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-brand-60">
                <FileText className="size-5 text-white" />
              </div>
              <span className="text-xl font-bold">SlimPDF</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Professional PDF compression that actually works. Server-powered tools for developers and businesses.
            </p>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-sm font-semibold">Tools</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.tools.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold">Company</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold">Legal</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} SlimPDF. All rights reserved.
          </p>

          {/* Theme Toggle */}
          <div className="flex items-center gap-1 rounded-lg border border-border bg-muted/50 p-1">
            {themeOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setTheme(option.value)}
                className={cn(
                  "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm transition-colors",
                  theme === option.value
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
                title={option.label}
              >
                <option.icon className="size-4" />
                <span className="hidden sm:inline">{option.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
