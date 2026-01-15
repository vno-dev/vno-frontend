import { DEVTOOL } from "@/config/env";
import { DEFAULT_METADATA } from "@/config/metadata";
import { cn } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { Geist, Geist_Mono, Inter, Montserrat } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const montserrat = Montserrat({
    subsets: ["vietnamese"],
    variable: "--font-montserrat",
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
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
        <html
            translate="no"
            lang={locale}
            suppressHydrationWarning
        >
            <body
                className={cn(
                    montserrat.variable,
                    inter.variable,
                    geistSans.variable,
                    geistMono.variable,
                    "antialiased"
                )}
            >
                <Providers>{children}</Providers>

                <Analytics />

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
