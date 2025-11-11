import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import "@/styles/novel/prosemirror.css";
import "katex/dist/katex.min.css";
import { getLocale, getTranslations } from "next-intl/server";
import { DEFAULT_METADATA } from "@/config/metadata";
import { cn } from "@/lib/utils";
import { DEVTOOL } from "@/config/env";
import Providers from "./providers";

const montserrat = Montserrat({
  subsets: ["vietnamese"],
  variable: "--font-montserrat",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations("site");
  return {
    ...DEFAULT_METADATA,
    title: {
      default: `VNO | ${t("title")}`,
      template: `%s | ${t("title")}`,
    },
  };
};

export const viewport: Viewport = {
  initialScale: 1,
  userScalable: false,
  minimumScale: 1,
  maximumScale: 1,
  interactiveWidget: "resizes-content",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale} suppressHydrationWarning className="select-none">
      <body className={cn(montserrat.variable, "antialiased")}>
        <Providers>{children}</Providers>

        {DEVTOOL.ENABLED && (
          <div
            dangerouslySetInnerHTML={{
              __html: `<script src="https://cdn.jsdelivr.net/npm/eruda"></script><script>eruda.init();</script>`,
            }}
          />
        )}
      </body>
    </html>
  );
}
