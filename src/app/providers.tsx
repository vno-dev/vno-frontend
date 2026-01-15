import { ThemeProvider } from "@/components/layouts/themes";
import ClientBootstraping from "@/features/bootstraping";
import { DirectionProvider } from "@/providers/directions";
import { FontProvider } from "@/providers/fonts";
import AppSessionProvider from "@/providers/nextauth-session";
import RqProvider from "@/providers/react-query";
import { SoundEffectProvider } from "@/providers/sounds-effect";
import { NextIntlClientProvider } from "next-intl";
import NextTopLoader from "nextjs-toploader";
import { NuqsAdapter } from 'nuqs/adapters/next/app';

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <RqProvider>
            <NextIntlClientProvider>
                <AppSessionProvider>
                    <NuqsAdapter>
                        <SoundEffectProvider>
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
                        </SoundEffectProvider>
                    </NuqsAdapter>
                </AppSessionProvider>
            </NextIntlClientProvider>
        </RqProvider>
    );
}
