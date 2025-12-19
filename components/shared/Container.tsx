import React from "react";
import { cn } from "@/lib/utils";

export default function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("container mx-auto px-4 xl:max-w-7xl", className)}>{children}</div>;
}
