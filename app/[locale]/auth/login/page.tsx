"use client";

import { useState } from "react";
import { FormField } from "@/components/ui/form-field";
import { validators } from "@/lib/validators";
import Link from "next/link";
import { KeyRound, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/api/auth";
import { saveAuth } from "@/lib/auth";
import { useTranslations } from "next-intl";

export default function LoginPage() {
  const t = useTranslations("app.auth.login");
  const tr = useTranslations("app.auth.register");
  const tv = useTranslations("validation");
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailError = validators.email(email);
  const passwordError = validators.password(password);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    try {
      setLoading(true);
      const { token, user, company } = await login({ email, password });

      saveAuth({ token, user, company });

      router.push("/en/home");
    } catch (err: any) {
      setError(err.response?.data?.message || t("login_failed"));
      setTimeout(() => setError(""), 10000);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col">
      <h2 className="text-3xl text-black font-bold mb-0.5 text-center">{t("welcome")}</h2>
      <p className="text-sm font-normal text-light-gray text-center mb-7.5">{t("please_login")}</p>
      <div className="space-y-4">
        <FormField
          label={tr("labels.email")}
          placeholder={tr("placeholders.email")}
          icon={Mail}
          value={email}
          onChange={setEmail}
          error={email && translateValidation(emailError, tv)}
          className="w-full"
        />
        <FormField
          label={tr("labels.password")}
          placeholder={tr("placeholders.password")}
          icon={KeyRound}
          type="password"
          value={password}
          onChange={setPassword}
          error={password && translateValidation(passwordError, tv)}
        />
        <div className="flex items-center justify-end mb-7">
          <Link
            href="/auth/forgot-password"
            className="text-sm text-[#0F0B03] hover:underline hover:text-primary hoverEffect"
          >
            {t("forgot_password")}
          </Link>
        </div>
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-primary text-white py-2 rounded-md uppercase"
        >
          {loading ? t("signing_in") : t("signin")}
        </button>
        {error && <p className="text-red-500 text-[13px] tracking-0.5">* {error}</p>}
        <div className="text-center text-sm text-[#0F0B03] mt-4">
          {t("dont_have_account")}{" "}
          <Link
            href="/auth/register"
            className="text-[#D98C3A]/90 hover:text-[#D98C3A] hover:underline hoverEffect"
          >
            {t("signup")}
          </Link>
        </div>
      </div>
    </div>
  );
}

function translateValidation(
  msg: string | null,
  tv: ReturnType<typeof useTranslations>
): string | null {
  if (!msg) return null;
  switch (msg) {
    case "Invalid email address":
      return tv("invalid_email");
    case "Password must be at least 8 characters":
      return tv("password_min");
    case "This field is required":
      return tv("required");
    default:
      return msg;
  }
}
