import { vi, enUS, Locale } from "date-fns/locale";

export type Lang = "vi" | "en";

export const localeMap = {
  vi,
  en: enUS,
} satisfies Record<Lang, Locale>;

export function resolveLocale(lang?: Lang): Locale {
  return localeMap[lang ?? "vi"];
}
