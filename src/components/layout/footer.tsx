"use client"

import Link from "next/link"
import { FileText, Sun, Moon } from "lucide-react"

import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"

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

export function Footer() {
  const { setTheme, resolvedTheme } = useTheme()

  return (
    <footer className="border-t-2 border-border">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-base border-2 border-border bg-main">
                <FileText className="size-5 text-main-foreground" />
              </div>
              <span className="text-xl font-heading">SlimPDF</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm">
              Professional PDF compression that actually works. Server-powered tools for developers and businesses.
            </p>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-sm font-heading">Tools</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.tools.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-heading">Company</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-heading">Legal</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t-2 border-border pt-8 sm:flex-row">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} SlimPDF. All rights reserved.
          </p>

          {/* Theme Toggle */}
          <Button
            variant="neutral"
            size="icon"
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            <Sun className="size-5 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute size-5 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
          </Button>
        </div>
      </div>
    </footer>
  )
}
