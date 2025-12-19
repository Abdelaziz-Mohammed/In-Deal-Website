"use client";

import { useModal } from "@/hooks/useModal";

export function ModalRoot() {
  const { isOpen, content, close } = useModal();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 max-w-sm w-full">
        <h3 className="text-lg font-semibold">{content.title}</h3>
        <p className="text-sm mt-2">{content.description}</p>

        <div className="mt-4 flex gap-2 justify-end">
          <button className="border px-4 py-2 rounded-md" onClick={close}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
