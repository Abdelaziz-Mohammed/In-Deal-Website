"use client";

import { useState } from "react";
import { FormField } from "@/components/ui/form-field";
import { FileUploadField } from "@/components/ui/file-upload-field";
import { validators } from "@/lib/validators";

import {
  companyTypes,
  companyIndustries,
  companyManufacturingStrategies,
  companyStates,
} from "@/lib/constants";

export default function StepTwo({
  onNext,
}: {
  onNext: (data: {
    companyType: string;
    website: string;
    manufacturingStrategy: string;
    industry: string;
    state: string;
    address: string;
    files: File[];
  }) => void;
}) {
  const [companyType, setCompanyType] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [companyManufacturingStrategy, setCompanyManufacturingStrategy] = useState("");
  const [companyIndustry, setCompanyIndustry] = useState("");
  const [companyState, setCompanyState] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [companyFiles, setCompanyFiles] = useState<File[]>([]);

  const valid =
    !validators.required(companyType) &&
    !validators.required(companyWebsite) &&
    !validators.required(companyManufacturingStrategy) &&
    !validators.required(companyIndustry) &&
    !validators.required(companyState) &&
    !validators.required(companyAddress) &&
    companyFiles.length > 0;

  return (
    <>
      <p className="text-left text-light-gray text-[14px] mb-3">Tell us about your company</p>

      <div className="space-y-4">
        <FormField
          label="Company type"
          placeholder="Select company type"
          value={companyType}
          onChange={setCompanyType}
          error={companyType && validators.required(companyType)}
          required={true}
          isDropdown={true}
          dropdownOptions={companyTypes.map((type) => ({
            label: type.toLocaleLowerCase(),
            value: type,
          }))}
        />

        <FormField
          label="Company Website"
          placeholder="www.example@gmail.com"
          value={companyWebsite}
          onChange={setCompanyWebsite}
          error={companyWebsite && validators.required(companyWebsite)}
          required={true}
        />

        <FormField
          label="Manufacturing Strategy"
          placeholder="Your company Strategy"
          value={companyManufacturingStrategy}
          onChange={setCompanyManufacturingStrategy}
          error={companyManufacturingStrategy && validators.required(companyManufacturingStrategy)}
          required={true}
          isDropdown={true}
          dropdownOptions={companyManufacturingStrategies.map((strategy) => ({
            label: strategy.toLocaleLowerCase(),
            value: strategy,
          }))}
        />

        <FormField
          label="Company industry"
          placeholder="Select company industry"
          value={companyIndustry}
          onChange={setCompanyIndustry}
          error={companyIndustry && validators.required(companyIndustry)}
          required={true}
          isDropdown={true}
          dropdownOptions={companyIndustries.map((industry) => ({
            label: industry.toLocaleLowerCase(),
            value: industry,
          }))}
        />

        <FormField
          label="Company state"
          placeholder="Select company state"
          value={companyState}
          onChange={setCompanyState}
          error={companyState && validators.required(companyState)}
          required={true}
          isDropdown={true}
          dropdownOptions={companyStates.map((state) => ({
            label: state.toLocaleLowerCase(),
            value: state,
          }))}
        />

        <FormField
          label="Company Address"
          placeholder="Address"
          value={companyAddress}
          onChange={setCompanyAddress}
          error={companyAddress && validators.required(companyAddress)}
          required={true}
        />

        <FileUploadField label="Upload Files" onChange={setCompanyFiles} required={true} />

        <button
          disabled={!valid}
          onClick={() =>
            onNext({
              companyType,
              website: companyWebsite,
              manufacturingStrategy: companyManufacturingStrategy,
              industry: companyIndustry,
              state: companyState,
              address: companyAddress,
              files: companyFiles,
            })
          }
          className="w-full bg-blue-600 text-white py-2 rounded-md disabled:opacity-75 mt-5 uppercase"
        >
          Next
        </button>
      </div>
    </>
  );
}
