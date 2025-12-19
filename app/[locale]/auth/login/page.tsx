"use client";

import { useState } from "react";
import { FormField } from "@/components/ui/form-field";
import { validators } from "@/lib/validators";
import Link from "next/link";
import { KeyRound, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/api/auth";
import { saveAuth } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailError = validators.email(email);
  const passwordError = validators.password(password);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    try {
      setLoading(true);
      const { token, user, company } = await login({ email, password });

      saveAuth({ token, user, company });

      router.push("/");
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col">
      <h2 className="text-3xl text-black font-bold mb-0.5 text-center">Welcome Back!</h2>
      <p className="text-sm font-normal text-light-gray text-center mb-7.5">
        Please login to your account
      </p>
      <div className="space-y-4">
        <FormField
          label="Email"
          placeholder="Email"
          icon={Mail}
          value={email}
          onChange={setEmail}
          error={email && emailError}
          className="w-full"
        />
        <FormField
          label="Password"
          placeholder="Password"
          icon={KeyRound}
          type="password"
          value={password}
          onChange={setPassword}
          error={password && passwordError}
        />
        <div className="flex items-center justify-end mb-7">
          <Link
            href="/auth/forgot-password"
            className="text-sm text-[#0F0B03] hover:underline hover:text-primary hoverEffect"
          >
            Forgot Password?
          </Link>
        </div>
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-primary text-white py-2 rounded-md uppercase"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
        {error && <p className="text-red-500 text-[13px] tracking-0.5">* {error}</p>}
        <div className="text-center text-sm text-[#0F0B03] mt-4">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/register"
            className="text-[#D98C3A]/90 hover:text-[#D98C3A] hover:underline hoverEffect"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
