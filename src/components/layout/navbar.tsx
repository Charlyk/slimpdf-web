"use client"

import Link from "next/link"
import { FileText, Menu, X } from "lucide-react"
import { useState } from "react"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/compress", label: "Compress" },
  { href: "/merge", label: "Merge" },
  { href: "/image-to-pdf", label: "Image to PDF" },
  { href: "/pricing", label: "Pricing" },
  { href: "/docs/api", label: "API" },
]

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-brand-60">
            <FileText className="size-5 text-white" />
          </div>
          <span className="text-xl font-bold">SlimPDF</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 md:flex">
          <Link href="/login" className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}>
            Log in
          </Link>
          <Link href="/compress" className={cn(buttonVariants({ variant: "default", size: "sm" }))}>
            Get started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="rounded-lg p-2 text-muted-foreground hover:bg-muted md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={cn("border-t border-border bg-background md:hidden", mobileMenuOpen ? "block" : "hidden")}>
        <nav className="flex flex-col gap-1 p-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-4 py-3 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-4 flex flex-col gap-2 border-t border-border pt-4">
            <Link href="/login" className={cn(buttonVariants({ variant: "outline" }), "w-full")}>
              Log in
            </Link>
            <Link href="/compress" className={cn(buttonVariants({ variant: "default" }), "w-full")}>
              Get started
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}
