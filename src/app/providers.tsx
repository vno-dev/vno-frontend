import { ThemeProvider } from "@/components/layouts/themes";
import RqProvider from "@/providers/react-query";
import NextTopLoader from "nextjs-toploader";
import { NextIntlClientProvider } from "next-intl";
import AppSessionProvider from "@/providers/nextauth-session";
import { FontProvider } from "@/providers/fonts";
import ClientBootstraping from "@/features/bootstraping";
import { DirectionProvider } from "@/providers/directions";
import { NuqsAdapter } from 'nuqs/adapters/next/app'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <RqProvider>
      <NextIntlClientProvider>
        <AppSessionProvider>
          <NuqsAdapter>
            <ThemeProvider
              disableTransitionOnChange
              attribute="class"
              defaultTheme="light"
              enableSystem
            >
              <FontProvider>
                <DirectionProvider>
                  <NextTopLoader
                    color="var(--foreground)"
                    showSpinner={false}
                  />
                  <ClientBootstraping />
                  {children}
                </DirectionProvider>
              </FontProvider>
            </ThemeProvider>
          </NuqsAdapter>
        </AppSessionProvider>
      </NextIntlClientProvider>
    </RqProvider>
  );
}
