"use client";

import { useState, useEffect } from "react";
import { resetPassword } from "@/lib/api/auth";
import { passwordResetStore } from "@/lib/passwordResetStore";
import { useRouter } from "next/navigation";
import { FormField } from "@/components/ui/form-field";
import { useTranslations } from "next-intl";
import { validators } from "@/lib/validators";

export default function ResetPasswordForm() {
  const t = useTranslations("app.auth.resetPassword");
  const tv = useTranslations("validation");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const email = passwordResetStore.getEmail();
  const otp = passwordResetStore.getOtp();

  const passwordError = validators.password(password);
  const passwordMismatch = password !== confirmPassword && confirmPassword.length > 0;

  useEffect(() => {
    if (!email || !otp) router.replace("/auth/forgot-password");
  }, [email, otp, router]);

  async function submit() {
    if (passwordError) {
      setError(tv("password_min"));
      return;
    }

    if (password !== confirmPassword) {
      setError(tv("passwords_mismatch"));
      return;
    }

    try {
      setLoading(true);
      setError("");
      await resetPassword({ email: email!, otp: otp!, password, confirmPassword });
      passwordResetStore.clear();
      router.push("/auth/login");
    } catch (err: any) {
      setError(err.response?.data?.message || t("error_resetting_password"));
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
        label={t("new_password_label")}
        placeholder={t("new_password_placeholder")}
        type="password"
        value={password}
        onChange={setPassword}
        required
      />

      <FormField
        label={t("confirm_password_label")}
        placeholder={t("confirm_password_placeholder")}
        type="password"
        value={confirmPassword}
        onChange={setConfirmPassword}
        required
      />

      <button
        onClick={submit}
        disabled={!password || !confirmPassword || passwordMismatch || loading}
        className="w-full mt-4 bg-primary text-white py-2 rounded-md disabled:opacity-50"
      >
        {loading ? t("resetting") : t("reset_password")}
      </button>
    </>
  );
}
