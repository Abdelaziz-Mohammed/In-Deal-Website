"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function AuthNav() {
  const pathname = usePathname();
  const t = useTranslations("app.auth.login");

  return (
    <nav className="flex items-center justify-center ltr:px-12 rtl:px-0 pt-6 pb-10 gap-28 rtl:gap-12 sm:gap-52 rtl:sm:gap-28">
      <Link
        href="/auth/login"
        className={`${
          pathname === "/auth/login"
            ? "text-primary border-b-2 pb-1 border-b-primary"
            : "text-light-gray"
        } font-medium`}
      >
        {t("login")}
      </Link>
      <Link
        href="/auth/register"
        className={`${
          pathname === "/auth/register"
            ? "text-primary border-b-2 pb-1 border-b-primary"
            : "text-light-gray"
        } font-medium`}
      >
        {t("register")}
      </Link>
    </nav>
  );
}
