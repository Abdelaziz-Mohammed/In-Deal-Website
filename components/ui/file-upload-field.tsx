"use client";

import { useState } from "react";
import { CloudUpload, X } from "lucide-react";
import { cn } from "@/lib/utils";

const MAX_FILE_SIZE_MB = 10;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

type Props = {
  label: string;
  required?: boolean;
  onChange: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  helperText?: string;
};

export function FileUploadField({
  label,
  required,
  onChange,
  accept = ".pdf,.doc,.docx,image/*",
  multiple = true,
  helperText = "PDF, DOC, DOCX, or Images (Max 10MB)",
}: Props) {
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  function validateFiles(selected: File[]) {
    for (const file of selected) {
      if (file.size > MAX_FILE_SIZE_BYTES) {
        return `${file.name} exceeds ${MAX_FILE_SIZE_MB}MB`;
      }
    }
    return null;
  }

  function handleFiles(selectedFiles: File[]) {
    const validationError = validateFiles(selectedFiles);
    if (validationError) {
      setError(validationError);
      return;
    }

    const updatedFiles = multiple ? [...files, ...selectedFiles] : selectedFiles;
    setFiles(updatedFiles);
    setError(null);
    onChange(updatedFiles);
  }

  function removeFile(index: number) {
    const updated = files.filter((_, i) => i !== index);
    setFiles(updated);
    onChange(updated);
  }

  return (
    <div className="space-y-1 w-full">
      <label className="text-sm font-medium pb-1 inline-block">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>

      <label
        htmlFor="file-upload"
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          handleFiles(Array.from(e.dataTransfer.files));
        }}
        className={cn(
          "flex flex-col items-center justify-center gap-2",
          "cursor-pointer rounded-md border border-dashed",
          "px-4 py-6 text-center transition",
          isDragging ? "border-primary bg-blue-50" : "bg-muted"
        )}
      >
        <CloudUpload className="h-6 w-6 text-primary" />

        <p className="text-sm">Click or drag files to upload</p>
        <p className="text-xs text-muted-foreground">{helperText}</p>

        <input
          id="file-upload"
          type="file"
          className="hidden"
          accept={accept}
          multiple={multiple}
          onChange={(e) => handleFiles(Array.from(e.target.files || []))}
        />
      </label>

      {error && <p className="text-xs text-red-500">{error}</p>}

      {/* File Preview */}
      {files.length > 0 && (
        <ul className="space-y-1">
          {files.map((file, index) => (
            <li
              key={index}
              className="flex items-center justify-between rounded-md border px-3 py-2 text-sm"
            >
              <div>
                <p className="font-medium">{file.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>

              <button
                type="button"
                onClick={() => removeFile(index)}
                className="text-red-500 hover:text-red-700"
              >
                <X size={16} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
