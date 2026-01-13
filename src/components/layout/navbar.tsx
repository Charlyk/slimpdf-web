"use client"

import { Link } from "@/i18n/routing"
import { FileText, Menu, X } from "lucide-react"
import { useState } from "react"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navLinkKeys = [
  { href: "/compress", key: "compress" },
  { href: "/merge-pdf", key: "merge" },
  { href: "/image-to-pdf", key: "imageToPdf" },
  { href: "#pricing", key: "pricing" },
  { href: "/docs/api", key: "api" },
]

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const t = useTranslations("navbar.links")
  const tCommon = useTranslations("common")

  return (
    <header className="sticky top-0 z-50 w-full border-b-[3px] border-border bg-secondary-background">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-base border-2 border-border bg-main">
            <FileText className="size-5 text-main-foreground" />
          </div>
          <span className="text-xl font-heading">{tCommon("brandName")}</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinkKeys.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-2 text-base font-base"
            >
              {t(link.key)}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 md:flex">
          <Button variant="neutral" size="sm" asChild>
            <Link href="/login">{tCommon("logIn")}</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/compress">{tCommon("getStarted")}</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="rounded-base border-2 border-border p-2 hover:bg-secondary-background md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={cn("border-t-[3px] border-border bg-secondary-background md:hidden", mobileMenuOpen ? "block" : "hidden")}>
        <nav className="flex flex-col gap-1 p-4">
          {navLinkKeys.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-3 text-base font-base"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t(link.key)}
            </Link>
          ))}
          <div className="mt-4 flex flex-col gap-2 border-t-[3px] border-border pt-4">
            <Button variant="neutral" asChild>
              <Link href="/login">{tCommon("logIn")}</Link>
            </Button>
            <Button asChild>
              <Link href="/compress">{tCommon("getStarted")}</Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  )
}
