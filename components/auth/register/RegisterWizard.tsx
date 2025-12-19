"use client";

import { useState } from "react";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import RegisterProgress from "./RegisterProgress";
import { useModal } from "@/hooks/useModal";
import { register, uploadFile } from "@/lib/api/auth";
import { saveAuth } from "@/lib/auth";
import { RegisterFormData } from "@/types/registerFormData";

const initialData: RegisterFormData = {
  user: {
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    jobTitle: "",
  },
  company: {
    name: "",
    description: "",
    phone: "",
    website: "",
    companyType: "",
    companyIndustry: "",
    manufacturingStrategy: "",
    address: "",
  },
  files: [],
};

export default function RegisterWizard() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<RegisterFormData>(initialData);
  const { open } = useModal();
  const [stepOneData, setStepOneData] = useState<any>(null);
  const [stepTwoData, setStepTwoData] = useState<any>(null);
  const [credentials, setCredentials] = useState<any>(null);

  function splitName(fullName: string) {
    const [firstName, ...rest] = fullName.trim().split(" ");
    return {
      firstName,
      lastName: rest.join(" ") || "Agent",
    };
  }

  async function submitRegister(authData: { email: string; password: string }) {
    const { firstName, lastName } = splitName(stepOneData.agentName);

    const payload: RegisterFormData = {
      user: {
        username: authData.email,
        email: authData.email,
        password: authData.password,
        firstName,
        lastName,
        jobTitle: stepOneData.jobTitle,
      },
      company: {
        name: stepOneData.companyName,
        description: "",
        phone: stepOneData.phoneNumber,
        website: stepTwoData.website,
        companyType: stepTwoData.companyType,
        companyIndustry: stepTwoData.industry,
        manufacturingStrategy: stepTwoData.manufacturingStrategy,
        locations: stepTwoData.address.split(",").map((loc: string) => loc.trim()),
      },
      files: stepTwoData.files,
    };

    const { token, user, company } = await register(payload);
    saveAuth({ token, user, company });

    // Upload files After register
    await Promise.all(payload.files.map((file) => uploadFile(file)));

    open("success", {
      title: "Application submitted",
      description: "We’ll contact you soon.",
    });
  }

  return (
    <>
      <RegisterProgress step={step} />

      {step === 1 && (
        <StepOne
          onNext={(data) => {
            setStepOneData(data);
            setStep(2);
          }}
        />
      )}

      {step === 2 && (
        <StepTwo
          onNext={(data) => {
            setStepTwoData(data);
            setStep(3);
          }}
        />
      )}

      {step === 3 && (
        <StepThree
          onSubmit={(data) => {
            setCredentials(data);
            submitRegister(data);
          }}
        />
      )}
    </>
  );
}
