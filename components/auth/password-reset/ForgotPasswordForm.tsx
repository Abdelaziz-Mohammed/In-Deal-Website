"use client";

import { useState } from "react";
import { forgotPassword } from "@/lib/api/auth";
import { passwordResetStore } from "@/lib/passwordResetStore";
import { useRouter } from "next/navigation";
import { FormField } from "@/components/ui/form-field";
import { useTranslations } from "next-intl";
import { validators } from "@/lib/validators";

export default function ForgotPasswordForm() {
  const t = useTranslations("app.auth.forgotPassword");
  const tv = useTranslations("validation");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const emailError = validators.email(email);

  async function submit() {
    if (emailError) {
      setError(tv("invalid_email"));
      return;
    }

    try {
      setLoading(true);
      setError("");
      await forgotPassword(email);
      passwordResetStore.setEmail(email);
      router.push("/auth/verify-otp");
    } catch (err: any) {
      setError(err.response?.data?.message || t("error_sending_otp"));
      setTimeout(() => setError(""), 10000);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <h2 className="text-xl font-semibold mb-4">{t("title")}</h2>
      <p className="text-sm text-gray-600 mb-6">{t("description")}</p>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}

      <FormField
        label={t("email_label")}
        placeholder={t("email_placeholder")}
        value={email}
        onChange={setEmail}
        required
      />

      <button
        onClick={submit}
        disabled={!email || loading}
        className="w-full mt-4 bg-primary text-white py-2 rounded-md disabled:opacity-50"
      >
        {loading ? t("sending_otp") : t("send_otp")}
      </button>
    </>
  );
}
