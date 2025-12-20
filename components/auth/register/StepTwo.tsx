"use client";

import { useState } from "react";
import { FormField } from "@/components/ui/form-field";
import { FileUploadField } from "@/components/ui/file-upload-field";
import { validators } from "@/lib/validators";
import { useTranslations } from "next-intl";

import { companyTypes, companyIndustries, companyManufacturingStrategies } from "@/lib/constants";

export default function StepTwo({
  onNext,
}: {
  onNext: (data: {
    companyType: string;
    website: string;
    manufacturingStrategy: string;
    industry: string;
    address: string;
    files: File[];
  }) => void;
}) {
  const t = useTranslations("app.auth.register");
  const tv = useTranslations("validation");
  const [companyType, setCompanyType] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [companyManufacturingStrategy, setCompanyManufacturingStrategy] = useState("");
  const [companyIndustry, setCompanyIndustry] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [companyFiles, setCompanyFiles] = useState<File[]>([]);

  const valid =
    !validators.required(companyType) &&
    !validators.required(companyWebsite) &&
    !validators.required(companyManufacturingStrategy) &&
    !validators.required(companyIndustry) &&
    !validators.required(companyAddress) &&
    companyFiles.length > 0;

  return (
    <>
      <p className="text-light-gray text-[14px] mb-3">{t("stepTwo.title")}</p>

      <div className="space-y-4">
        <FormField
          label={t("labels.companyType")}
          placeholder={t("placeholders.companyType")}
          value={companyType}
          onChange={setCompanyType}
          error={companyType && translateValidation(validators.required(companyType), tv)}
          required={true}
          isDropdown={true}
          dropdownOptions={companyTypes.map((type) => ({
            label: t(`companyTypes.${type}`),
            value: type,
          }))}
        />

        <FormField
          label={t("labels.companyWebsite")}
          placeholder={t("placeholders.companyWebsite")}
          value={companyWebsite}
          onChange={setCompanyWebsite}
          error={companyWebsite && translateValidation(validators.required(companyWebsite), tv)}
          required={true}
        />

        <FormField
          label={t("labels.manufacturingStrategy")}
          placeholder={t("placeholders.manufacturingStrategy")}
          value={companyManufacturingStrategy}
          onChange={setCompanyManufacturingStrategy}
          error={
            companyManufacturingStrategy &&
            translateValidation(validators.required(companyManufacturingStrategy), tv)
          }
          required={true}
          isDropdown={true}
          dropdownOptions={companyManufacturingStrategies.map((strategy) => ({
            label: t(`companyManufacturingStrategies.${strategy}`),
            value: strategy,
          }))}
        />

        <FormField
          label={t("labels.companyIndustry")}
          placeholder={t("placeholders.companyIndustry")}
          value={companyIndustry}
          onChange={setCompanyIndustry}
          error={companyIndustry && translateValidation(validators.required(companyIndustry), tv)}
          required={true}
          isDropdown={true}
          dropdownOptions={companyIndustries.map((industry) => ({
            label: t(`companyIndustries.${industry}`),
            value: industry,
          }))}
        />

        <FormField
          label={t("labels.companyAddress")}
          placeholder={t("placeholders.companyAddress")}
          value={companyAddress}
          onChange={setCompanyAddress}
          error={companyAddress && translateValidation(validators.required(companyAddress), tv)}
          required={true}
        />

        <FileUploadField
          label={t("labels.uploadFiles")}
          onChange={setCompanyFiles}
          required={true}
        />

        <button
          disabled={!valid}
          onClick={() =>
            onNext({
              companyType,
              website: companyWebsite,
              manufacturingStrategy: companyManufacturingStrategy,
              industry: companyIndustry,
              address: companyAddress,
              files: companyFiles,
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
