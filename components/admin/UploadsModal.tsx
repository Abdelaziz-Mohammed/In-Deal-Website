"use client";

import { X, Download, FileIcon } from "lucide-react";
import { CompanyDocument } from "@/lib/api/companies";
import { Button } from "@/components/ui/button";

interface UploadsModalProps {
  title: string;
  documents: CompanyDocument[];
  onClose: () => void;
}

function getFileIcon(fileName: string) {
  const ext = fileName.split(".").pop()?.toLowerCase();

  if (ext === "pdf") {
    return (
      <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center text-red-600 font-bold text-xs">
        PDF
      </div>
    );
  } else if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext || "")) {
    return (
      <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center text-blue-600 font-bold text-xs">
        IMG
      </div>
    );
  } else {
    return <FileIcon className="w-8 h-8 text-gray-400" />;
  }
}

export function UploadsModal({ title, documents, onClose }: UploadsModalProps) {
  const handleDownload = (url: string, fileName: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenInNewTab = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-md max-h-[80vh] flex flex-col shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {documents.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No documents uploaded</p>
          ) : (
            <div className="space-y-3">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {getFileIcon(doc.file.fileName)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {doc.file.fileName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {(doc.file.fileMetadata.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleOpenInNewTab(doc.file.publicUrl)}
                      className="p-1.5 hover:bg-gray-200 rounded transition-colors"
                      title="View file"
                    >
                      <FileIcon className="w-4 h-4 text-gray-600" />
                    </button>
                    <button
                      onClick={() => handleDownload(doc.file.publicUrl, doc.file.fileName)}
                      className="p-1.5 hover:bg-gray-200 rounded transition-colors"
                      title="Download file"
                    >
                      <Download className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200">
          <Button variant="outline" className="w-full" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
