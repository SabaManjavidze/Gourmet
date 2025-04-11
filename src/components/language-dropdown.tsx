"use client";
import { Button } from "./ui/button";
import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import {
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { Capitalize } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { twMerge } from "tailwind-merge";
import setLanguage from "@/actions/set-language";
import { getUserLocale } from "@/lib/locale";
import { Locale } from "@/i18n/config";

const langs = {
  ge: "Georgian",
  en: "English",
};
export function LanguageDropdown({
  className = "",
  iconSize,
}: {
  iconSize?: number | string;
  className?: string;
}) {
  const languages = Object.keys(langs) as unknown as (keyof typeof langs)[];
  const [lang, setLang] = useState<Locale>("ge");
  const [open, setOpen] = useState(false);
  async function setlanguage() {
    const locale = await getUserLocale();
    setLang(locale);
  }
  useLayoutEffect(() => {
    setlanguage();
  }, []);
  return (
    <DropdownMenu open={open} onOpenChange={(o) => setOpen(o)}>
      <DropdownMenuTrigger asChild className="min-w-28">
        <Button
          variant="text"
          size={"auto"}
          className={twMerge(
            `w-full gap-x-2 hover:!bg-transparent hover:text-accent focus-visible:ring-0 focus-visible:ring-offset-0 ${open ? "text-accent" : ""} flex justify-between px-2`,
            className,
          )}
        >
          <p>{Capitalize(langs[lang])}</p>
          <ChevronDown className={"ml-1 duration-150"} size={iconSize} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Select Language</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={lang}
          onValueChange={(val) => {
            if (!languages.includes(val as any)) return;
            setLanguage(val as any);
            setLang(val as Locale);
          }}
        >
          {languages.map((l) => (
            <DropdownMenuRadioItem
              className={`${l == lang ? "text-accent" : ""}`}
              key={l}
              value={l}
            >
              {Capitalize(langs[l])}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
