"use client";

import { useEffect, useState } from "react";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import RegisterProgress from "./RegisterProgress";
import { useModal } from "@/hooks/useModal";
import { register, uploadFile, type RegisterPayload } from "@/lib/api/auth";
import { saveAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

type StepOneData = {
  agentName: string;
  jobTitle: string;
  companyName: string;
  phoneNumber: string;
};

type StepTwoData = {
  companyType: string;
  website: string;
  manufacturingStrategy: string;
  industry: string;
  address: string;
  files: File[];
};

export default function RegisterWizard() {
  const [step, setStep] = useState(1);
  const { open } = useModal();
  const router = useRouter();
  const t = useTranslations("app.auth.register");
  const tv = useTranslations("validation");
  const [stepOneData, setStepOneData] = useState<StepOneData | null>(null);
  const [stepTwoData, setStepTwoData] = useState<StepTwoData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  function splitName(fullName: string) {
    const [firstName, ...rest] = fullName.trim().split(" ");
    return {
      firstName,
      lastName: rest.join(" ") || "Agent",
    };
  }

  async function submitRegister(authData: { email: string; password: string }) {
    if (!stepOneData || !stepTwoData) return;

    setIsSubmitting(true);
    setErrors([]);

    const { firstName, lastName } = splitName(stepOneData.agentName);

    const payload: RegisterPayload = {
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
      },
    };

    const fileList = stepTwoData.files || [];

    try {
      const { token, user, company } = await register(payload);
      saveAuth({ token, user, company });

      if (fileList.length) {
        const results = await Promise.allSettled(fileList.map((file) => uploadFile(file)));
        const uploadErrors = results
          .map((r, i) =>
            r.status === "rejected"
              ? `File "${fileList[i].name}": ${extractErrorMessage(r.reason)}`
              : null
          )
          .filter(Boolean) as string[];
        if (uploadErrors.length) {
          setErrors(uploadErrors);
        }
      }

      if (!errors.length) {
        open("success", {
          title: t("success.title"),
          description: t("success.description"),
        });

        setStep(1);
        setStepOneData(null);
        setStepTwoData(null);

        router.push("/en/home");
      }
    } catch (err: any) {
      const msgs = normalizeApiErrors(err);
      setErrors(msgs);
    } finally {
      setIsSubmitting(false);
    }
  }

  function normalizeApiErrors(err: any): string[] {
    const msgs: string[] = [];
    const res = err?.response?.data ?? err;

    if (typeof res?.message === "string") msgs.push(res.message);

    if (Array.isArray(res?.errors)) {
      for (const e of res.errors) {
        if (typeof e === "string") msgs.push(e);
        else if (typeof e?.message === "string") msgs.push(e.message);
        else if (typeof e?.msg === "string") msgs.push(e.msg);
      }
    }

    if (!msgs.length && typeof err?.message === "string") msgs.push(err.message);
    if (!msgs.length) msgs.push(tv("register_failed_generic"));
    return msgs;
  }

  function extractErrorMessage(err: any): string {
    const res = err?.response?.data ?? err;
    if (typeof res?.message === "string") return res.message;
    if (typeof err?.message === "string") return err.message;
    return tv("upload_failed");
  }

  // Clear errors after 5000ms whenever they change
  useEffect(() => {
    if (!errors.length) return;
    const t = setTimeout(() => setErrors([]), 5000);
    return () => clearTimeout(t);
  }, [errors]);

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
            submitRegister(data);
          }}
          submitting={isSubmitting}
          errors={errors}
        />
      )}
    </>
  );
}
