import * as d from "@/lib/date";
import { resolveLocale, Lang } from "@/lib/date/locale";
import { getCookie } from "cookies-next/client";

type NullableDateInput = d.DateInput | null | undefined;

export function date(input: NullableDateInput) {
  const lang = (getCookie("lang") ?? "vi") as Lang;
  const locale = resolveLocale(lang);

  if (!input) {
    return {
      format: () => "Invalid date input",
      fromNow: () => "Invalid date input",
    };
  }

  return {
    format: (pattern: string) =>
      d.formatDate(input, pattern, locale),

    fromNow: () =>
      d.fromNowStrict(input, locale),
  };
}
