"use client";

import { useState } from "react";
import { FormField } from "@/components/ui/form-field";
import { validators } from "@/lib/validators";
import { useTranslations } from "next-intl";

export default function StepOne({
  onNext,
}: {
  onNext: (data: {
    agentName: string;
    jobTitle: string;
    companyName: string;
    phoneNumber: string;
  }) => void;
}) {
  const t = useTranslations("app.auth.register");
  const tv = useTranslations("validation");
  const [agentName, setAgentName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const valid =
    !validators.required(agentName) &&
    !validators.required(jobTitle) &&
    !validators.required(company) &&
    !validators.required(phoneNumber);

  const translateValidation = (msg: string | null): string | null => {
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
  };

  return (
    <>
      <p className="text-light-gray text-[14px] mb-3">{t("stepOne.title")}</p>

      <div className="space-y-4">
        <FormField
          label={t("labels.agentName")}
          placeholder={t("placeholders.agentName")}
          value={agentName}
          onChange={setAgentName}
          error={agentName && translateValidation(validators.required(agentName))}
          required={true}
        />

        <FormField
          label={t("labels.jobTitle")}
          placeholder={t("placeholders.jobTitle")}
          value={jobTitle}
          onChange={setJobTitle}
          error={jobTitle && translateValidation(validators.required(jobTitle))}
          required={true}
        />

        <FormField
          label={t("labels.companyName")}
          placeholder={t("placeholders.companyName")}
          value={company}
          onChange={setCompany}
          error={company && translateValidation(validators.required(company))}
          required={true}
        />

        <FormField
          label={t("labels.phoneNumber")}
          placeholder={t("placeholders.phoneNumber")}
          value={phoneNumber}
          onChange={setPhoneNumber}
          error={phoneNumber && translateValidation(validators.required(phoneNumber))}
          required={true}
        />

        <button
          disabled={!valid}
          onClick={() =>
            onNext({
              agentName,
              jobTitle,
              companyName: company,
              phoneNumber,
            })
          }
          className="w-full bg-primary text-white py-2 rounded-md disabled:opacity-75 mt-5 uppercase"
        >
          {t("buttons.next")}
        </button>
      </div>
    </>
  );
}
