"use server";

import { Locale } from "@/i18n/config";
import { cookies } from "next/headers";

export default async function setLanguage(val: Locale) {
  cookies().set("language", val);
}
