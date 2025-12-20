"use client";

import { LANGUAGES } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

export default function LanguageToggler() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const selectedLanguage = LANGUAGES.find((language) => language.locale === locale)!;

  const switchLanguage = (requestedLocale: string) => {
    router.replace({ pathname }, { locale: requestedLocale });
    // refresh the page to load locale-specific data
    router.refresh();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 rounded-sm px-4 py-2 outline-none"
        >
          <selectedLanguage.flag className="mr-2 size-4" />
          <span className="font-medium">{selectedLanguage.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {LANGUAGES.map((language) => (
          <DropdownMenuItem
            key={language.locale}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => switchLanguage(language.locale)}
          >
            <language.flag />
            {language.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
