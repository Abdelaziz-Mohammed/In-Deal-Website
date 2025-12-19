import React from "react";

export function AuthCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full max-w-130 rounded-xl bg-white shadow-lg pt-10 pb-18 px-4 sm:px-8 border-t border-t-primary mx-4 my-20">
      {children}
    </div>
  );
}
