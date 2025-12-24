"use client";

import { useState, useEffect } from "react";
import { verifyOtp } from "@/lib/api/auth";
import { passwordResetStore } from "@/lib/passwordResetStore";
import { useRouter } from "next/navigation";
import { FormField } from "@/components/ui/form-field";
import { useTranslations } from "next-intl";

export default function VerifyOtpForm() {
  const t = useTranslations("app.auth.verifyOtp");
  const tv = useTranslations("validation");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const email = passwordResetStore.getEmail();

  useEffect(() => {
    if (!email) router.replace("/auth/forgot-password");
  }, [email, router]);

  async function submit() {
    if (!otp || otp.length !== 6) {
      setError(tv("otp_invalid"));
      return;
    }

    try {
      setLoading(true);
      setError("");
      await verifyOtp(email!, otp);
      passwordResetStore.setOtp(otp);
      router.push("/auth/reset-password");
    } catch (err: any) {
      setError(err.response?.data?.message || t("error_verifying_otp"));
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
        label={t("otp_label")}
        placeholder={t("otp_placeholder")}
        value={otp}
        onChange={setOtp}
        required
      />

      <button
        onClick={submit}
        disabled={!otp || loading}
        className="w-full mt-4 bg-primary text-white py-2 rounded-md disabled:opacity-50"
      >
        {loading ? t("verifying") : t("verify")}
      </button>
    </>
  );
}
