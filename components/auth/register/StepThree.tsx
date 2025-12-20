"use client";

import { useState } from "react";
import { FormField } from "@/components/ui/form-field";
import { validators } from "@/lib/validators";
import { useTranslations } from "next-intl";

export default function StepThree({
  onSubmit,
  submitting,
  errors,
}: {
  onSubmit: (data: { email: string; password: string }) => void;
  submitting?: boolean;
  errors?: string[];
}) {
  const t = useTranslations("app.auth.register");
  const tv = useTranslations("validation");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordError = validators.password(password);
  const confirmPasswordError =
    confirmPassword && password !== confirmPassword ? tv("passwords_mismatch") : null;

  const valid = !validators.email(email) && !passwordError && !confirmPasswordError;

  return (
    <>
      <p className="text-light-gray text-[14px] mb-3">{t("stepThree.title")}</p>

      <div className="space-y-4">
        <FormField
          label={t("labels.email")}
          placeholder={t("placeholders.email")}
          value={email}
          onChange={setEmail}
          error={email && translateValidation(validators.email(email), tv)}
          required={true}
        />

        <FormField
          label={t("labels.password")}
          placeholder={t("placeholders.password")}
          type="password"
          value={password}
          onChange={setPassword}
          error={password && translateValidation(passwordError, tv)}
          required={true}
        />

        <FormField
          label={t("labels.confirmPassword")}
          placeholder={t("placeholders.confirmPassword")}
          type="password"
          value={confirmPassword}
          onChange={setConfirmPassword}
          error={confirmPassword && confirmPasswordError}
          required={true}
        />

        <button
          disabled={!valid || submitting}
          onClick={() => onSubmit({ email, password })}
          className="w-full bg-primary text-white py-2 rounded-md disabled:opacity-75 mt-5 uppercase"
        >
          {submitting ? t("buttons.submitting") : t("buttons.signUp")}
        </button>

        {errors && errors.length > 0 && (
          <div className="mt-3 text-xs text-red-600" aria-live="polite">
            {errors.map((e, idx) => (
              <div key={idx}>* {e}</div>
            ))}
          </div>
        )}
      </div>
    </>
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
