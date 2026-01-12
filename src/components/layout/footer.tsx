import Link from "next/link"
import { FileText } from "lucide-react"

const footerLinks = {
  tools: [
    { href: "/compress", label: "Compress PDF" },
    { href: "/merge", label: "Merge PDF" },
    { href: "/image-to-pdf", label: "Image to PDF" },
  ],
  company: [
    { href: "/pricing", label: "Pricing" },
    { href: "/docs/api", label: "API Docs" },
    { href: "/blog", label: "Blog" },
  ],
  legal: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-grey-20 bg-grey-10">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-brand-60">
                <FileText className="size-5 text-white" />
              </div>
              <span className="text-xl font-bold text-grey-70">SlimPDF</span>
            </Link>
            <p className="mt-4 text-sm text-grey-50">
              Fast PDF tools that just work. Compress, merge, and convert with
              server-powered processing.
            </p>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-sm font-bold text-grey-70">Tools</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.tools.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-grey-50 transition-colors hover:text-grey-70"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-bold text-grey-70">Company</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-grey-50 transition-colors hover:text-grey-70"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-bold text-grey-70">Legal</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-grey-50 transition-colors hover:text-grey-70"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-grey-20 pt-8">
          <p className="text-center text-sm text-grey-50">
            &copy; {new Date().getFullYear()} SlimPDF. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
