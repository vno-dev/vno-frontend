import {
  format as dfFormat,
  formatDistanceToNowStrict,
  Locale,
} from "date-fns";
import { toDate, DateInput } from "./parse";

export function formatDate(input: DateInput, pattern: string, locale: Locale) {
  return dfFormat(toDate(input), pattern, { locale });
}

export function fromNowStrict(
  input: DateInput,
  locale: Locale,
  addSuffix = true
) {
  return formatDistanceToNowStrict(toDate(input), {
    locale,
    addSuffix,
  });
}
