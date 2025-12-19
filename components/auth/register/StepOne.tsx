"use client";

import { useState } from "react";
import { FormField } from "@/components/ui/form-field";
import { validators } from "@/lib/validators";

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
  const [agentName, setAgentName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const valid =
    !validators.required(agentName) &&
    !validators.required(jobTitle) &&
    !validators.required(company) &&
    !validators.required(phoneNumber);

  return (
    <>
      <p className="text-left text-light-gray text-[14px] mb-3">
        Enter your details to create an account{" "}
      </p>

      <div className="space-y-4">
        <FormField
          label="Agent Name"
          placeholder="Enter your agent name"
          value={agentName}
          onChange={setAgentName}
          error={agentName && validators.required(agentName)}
          required={true}
        />

        <FormField
          label="Agent Job Title"
          placeholder="Enter agent job title"
          value={jobTitle}
          onChange={setJobTitle}
          error={jobTitle && validators.required(jobTitle)}
          required={true}
        />

        <FormField
          label="Company Name"
          placeholder="Your company name"
          value={company}
          onChange={setCompany}
          error={company && validators.required(company)}
          required={true}
        />

        <FormField
          label="Phone Number"
          placeholder="Phone number"
          value={phoneNumber}
          onChange={setPhoneNumber}
          error={phoneNumber && validators.required(phoneNumber)}
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
          Next
        </button>
      </div>
    </>
  );
}
