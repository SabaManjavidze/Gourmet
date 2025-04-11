"use server";
import { locales, Locale } from "@/i18n/config";
import { cookies } from "next/headers";

export async function getUserLocale() {
  const cookie_val = cookies().get("language")?.value;
  return (cookie_val as Locale) ?? "ge";
}
export type getUserLocal = Promise<Locale>;
