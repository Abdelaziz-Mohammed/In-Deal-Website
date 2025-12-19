"use client";

import { Link, usePathname } from "@/i18n/navigation";

export default function AuthNav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center justify-center px-12 pt-6 pb-10 gap-28 sm:gap-52">
      <Link
        href="/auth/login"
        className={`${
          pathname === "/auth/login"
            ? "text-primary border-b-2 pb-1 border-b-primary"
            : "text-light-gray"
        } font-medium`}
      >
        Login
      </Link>
      <Link
        href="/auth/register"
        className={`${
          pathname === "/auth/register"
            ? "text-primary border-b-2 pb-1 border-b-primary"
            : "text-light-gray"
        } font-medium`}
      >
        Register
      </Link>
    </nav>
  );
}
