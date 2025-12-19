"use client";

import { useState } from "react";
import { FormField } from "@/components/ui/form-field";
import { validators } from "@/lib/validators";

export default function StepThree({
  onSubmit,
}: {
  onSubmit: (data: { email: string; password: string }) => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordError = validators.password(password);
  const confirmPasswordError =
    confirmPassword && password !== confirmPassword ? "Passwords do not match" : null;

  const valid = !validators.email(email) && !passwordError && !confirmPasswordError;

  return (
    <>
      <p className="text-left text-light-gray text-[14px] mb-3">Finish creating your account</p>

      <div className="space-y-4">
        <FormField
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChange={setEmail}
          error={email && validators.email(email)}
          required={true}
        />

        <FormField
          label="Password"
          placeholder="Enter your password"
          type="password"
          value={password}
          onChange={setPassword}
          error={password && passwordError}
          required={true}
        />

        <FormField
          label="Confirm Password"
          placeholder="Confirm your password"
          type="password"
          value={confirmPassword}
          onChange={setConfirmPassword}
          error={confirmPassword && confirmPasswordError}
          required={true}
        />

        <button
          disabled={!valid}
          onClick={() => onSubmit({ email, password })}
          className="w-full bg-blue-600 text-white py-2 rounded-md disabled:opacity-75 mt-5 uppercase"
        >
          Sign Up
        </button>
      </div>
    </>
  );
}
