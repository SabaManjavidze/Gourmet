export type Locale = (typeof locales)[number];
export const locales = ["ge", "en"] as const;
export const defaultLocale: Locale = "ge";
