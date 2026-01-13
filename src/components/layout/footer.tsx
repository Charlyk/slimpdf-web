"use client"

import { Link } from "@/i18n/routing"
import { FileText, Sun, Moon } from "lucide-react"
import { useTranslations } from "next-intl"

import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"

const footerLinkKeys = {
  tools: [
    { href: "/compress", key: "compressPdf" },
    { href: "/merge-pdf", key: "mergePdf" },
    { href: "/image-to-pdf", key: "imageToPdf" },
    { href: "/docs/api", key: "apiDocs" },
  ],
  company: [
    { href: "/about", key: "about" },
    { href: "/blog", key: "blog" },
    { href: "/contact", key: "contact" },
  ],
  legal: [
    { href: "/privacy", key: "privacy" },
    { href: "/terms", key: "terms" },
  ],
}

export function Footer() {
  const { setTheme, resolvedTheme } = useTheme()
  const t = useTranslations("footer")
  const tCommon = useTranslations("common")

  return (
    <footer className="border-t-[3px] border-border">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-base border-2 border-border bg-main">
                <FileText className="size-5 text-main-foreground" />
              </div>
              <span className="text-xl font-heading">{tCommon("brandName")}</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm">
              {t("description")}
            </p>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-sm font-heading">{t("sections.tools.title")}</h3>
            <ul className="mt-4 space-y-3">
              {footerLinkKeys.tools.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:underline">
                    {t(`sections.tools.${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-heading">{t("sections.company.title")}</h3>
            <ul className="mt-4 space-y-3">
              {footerLinkKeys.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:underline">
                    {t(`sections.company.${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-heading">{t("sections.legal.title")}</h3>
            <ul className="mt-4 space-y-3">
              {footerLinkKeys.legal.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:underline">
                    {t(`sections.legal.${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t-[3px] border-border pt-8 sm:flex-row">
          <p className="text-sm">
            {t("copyright", { year: new Date().getFullYear() })}
          </p>

          {/* Theme Toggle */}
          <Button
            variant="neutral"
            size="icon"
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            aria-label={t("toggleTheme")}
          >
            <Sun className="size-5 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute size-5 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
          </Button>
        </div>
      </div>
    </footer>
  )
}
