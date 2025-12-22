import { ThemeProvider } from "@/components/layouts/themes";
import RqProvider from "@/providers/react-query";
import NextTopLoader from "nextjs-toploader";
import { NextIntlClientProvider } from "next-intl";
import AppSessionProvider from "@/providers/nextauth-session";
import { FontProvider } from "@/providers/fonts";
import ClientBootstraping from "@/features/bootstraping";
import { DirectionProvider } from "@/providers/directions";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <FontProvider>
        <DirectionProvider>
          <NextTopLoader color="var(--foreground)" showSpinner={false} />
          <NextIntlClientProvider>
            <RqProvider>
              <AppSessionProvider>
                <ClientBootstraping />
                {children}
              </AppSessionProvider>
            </RqProvider>
          </NextIntlClientProvider>
        </DirectionProvider>
      </FontProvider>
    </ThemeProvider>
  );
}
