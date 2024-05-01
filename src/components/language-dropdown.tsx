"use client";
import { Button } from "./ui/button";
import { useState } from "react";
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

export function LanguageDropdown() {
  const languages = ["english", "georgian"] as const;
  const [lang, setLang] = useState<(typeof languages)[number]>("english");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="min-w-28">
        <Button variant="outline" className="flex justify-between px-2">
          <p>{Capitalize(lang)}</p>
          <ChevronDown className="ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Select Language</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={lang} onValueChange={setLang as any}>
          {languages.map((lang) => (
            <DropdownMenuRadioItem value={lang}>
              {Capitalize(lang)}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
