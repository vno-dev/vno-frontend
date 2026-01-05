import { parseISO, isValid } from "date-fns";

export type DateInput = Date | string | number;

export function toDate(input: DateInput): Date {
  const date =
    input instanceof Date
      ? input
      : typeof input === "string"
      ? parseISO(input)
      : new Date(input);

  if (!isValid(date)) {
    throw new Error("Invalid date input");
  }

  return date;
}
