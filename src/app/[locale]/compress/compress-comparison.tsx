import { getTranslations } from "next-intl/server"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const comparisonRows = [
  "compression",
  "largeFiles",
  "targetSize",
  "cost",
  "signup",
  "watermark",
]

export async function CompressComparison() {
  const t = await getTranslations("compress.comparison")

  return (
    <section className="bg-grid bg-secondary-background py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-heading tracking-tight sm:text-4xl">
            {t("title")}
          </h2>
        </div>

        {/* Comparison Table */}
        <div className="mx-auto mt-12 max-w-4xl overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b-2">
                <TableHead className="font-heading text-base py-4">
                  {t("headers.feature")}
                </TableHead>
                <TableHead className="font-heading text-base text-center py-4">
                  {t("headers.browser")}
                </TableHead>
                <TableHead className="font-heading text-base text-center py-4">
                  {t("headers.adobe")}
                </TableHead>
                <TableHead className="font-heading text-base text-center py-4">
                  {t("headers.slimpdf")}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {comparisonRows.map((row) => (
                <TableRow key={row} className="border-b">
                  <TableCell className="py-4 font-medium">
                    {t(`rows.${row}.feature`)}
                  </TableCell>
                  <TableCell className="py-4 text-center text-muted-foreground">
                    {t(`rows.${row}.browser`)}
                  </TableCell>
                  <TableCell className="py-4 text-center text-muted-foreground">
                    {t(`rows.${row}.adobe`)}
                  </TableCell>
                  <TableCell className="py-4 text-center font-medium">
                    {t(`rows.${row}.slimpdf`)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  )
}
