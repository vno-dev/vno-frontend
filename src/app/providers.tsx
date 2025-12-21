import { ThemeProvider } from "@/components/layouts/themes";
import RqProvider from "@/providers/react-query";
import NextTopLoader from "nextjs-toploader";
import AppWrapper from "@/components/layouts/wrapper";
import { NextIntlClientProvider } from "next-intl";
import AppSessionProvider from "@/providers/session";
import { FontProvider } from "@/providers/font";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <NextTopLoader color="var(--foreground)" showSpinner={false} />
      <NextIntlClientProvider>
        <RqProvider>
          <AppSessionProvider>
            <AppWrapper>
              <FontProvider>{children}</FontProvider>
            </AppWrapper>
          </AppSessionProvider>
        </RqProvider>
      </NextIntlClientProvider>
    </ThemeProvider>
  );
}
