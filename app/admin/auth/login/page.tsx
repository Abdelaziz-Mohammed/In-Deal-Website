"use client";

import { useState } from "react";
import { FormField } from "@/components/ui/form-field";
import { Button } from "@/components/ui/button";
import { validators } from "@/lib/validators";
import { KeyRound, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { adminLogin } from "@/lib/api/admin-auth";
import { saveAuth } from "@/lib/auth";
import { AuthCard } from "@/components/auth/AuthCard";
import Container from "@/components/shared/Container";
import Logo from "@/components/shared/Logo";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState({ email: false, password: false });
  const emailError = touched.email ? validators.email(email) : null;
  const passwordError = touched.password ? validators.password(password) : null;
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    try {
      setLoading(true);
      setError("");
      const { token, user } = await adminLogin({ email, password });

      saveAuth({ token, user });

      router.push("/admin/dashboard");
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Login failed. Please try again.";
      setError(errorMessage);
      setTimeout(() => setError(""), 10000);
    } finally {
      setLoading(false);
    }
  }

  const isFormValid = email && password && !emailError && !passwordError;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="py-4 px-4 bg-white border-b">
        <Container>
          <Logo />
        </Container>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4">
        <AuthCard>
          <h2 className="text-3xl text-black font-bold mb-0.5 text-center">Admin Login</h2>
          <p className="text-sm font-normal text-gray-500 text-center mb-7.5">
            Please login with your admin credentials
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            <FormField
              label="Email Address"
              placeholder="Enter your email"
              icon={Mail}
              value={email}
              onChange={setEmail}
              onBlur={() => setTouched({ ...touched, email: true })}
              error={emailError}
              type="email"
              required
            />

            <FormField
              label="Password"
              placeholder="Enter your password"
              icon={KeyRound}
              value={password}
              onChange={setPassword}
              onBlur={() => setTouched({ ...touched, password: true })}
              error={passwordError}
              type="password"
              required
            />
          </div>

          <Button
            className="w-full mt-7.5 bg-primary hover:bg-primary/90"
            onClick={handleLogin}
            disabled={!isFormValid || loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </AuthCard>
      </div>
    </div>
  );
}
