"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./select";

type Props = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string | null;
  placeholder?: string;
  type?: string;
  className?: string;
  icon?: LucideIcon;
  required?: boolean;
  isDropdown?: boolean;
  dropdownOptions?: { label: string; value: string }[];
};

export function FormField({
  label,
  value,
  onChange,
  error,
  placeholder,
  type = "text",
  className,
  icon: Icon,
  required,
  isDropdown = false,
  dropdownOptions = [],
}: Props) {
  const isValid = Boolean(value) && !error;

  const fieldClasses = cn(
    "w-full rounded-md border px-3 py-2 outline-none transition placeholder:text-sm",
    Icon && "pl-10",
    error && "border-red-500 focus:ring-red-500",
    isValid && "border-green-500 focus:ring-green-500"
  );

  return (
    <div className={cn("space-y-1 w-full", className)}>
      <label className="text-sm font-medium pb-1 inline-block">
        {label} {required && <span className="text-red-500"> *</span>}
      </label>
      <div className="relative">
        {Icon && (
          <Icon
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
            size={18}
          />
        )}
        {!isDropdown && (
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            type={type}
            placeholder={placeholder}
            className={fieldClasses}
          />
        )}
        {isDropdown && (
          <Select value={value} onValueChange={onChange}>
            <SelectTrigger className={cn(fieldClasses, "h-10 flex items-center")}>
              <SelectValue placeholder={placeholder || "Select an option"} />
            </SelectTrigger>
            <SelectContent>
              {dropdownOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
