"use client";

import React, { useMemo, useState } from "react";
import { Button } from "@/src/shared/ui/button/ui/button";
import { ModalContext, ModalContextValue } from "../lib/modalContext";

type ModalWindowProps = {
  openModalBtn: (onClick: () => void) => React.ReactNode;
  onClose?: () => void;
  children?: React.ReactNode;
  title?: string;
  preventLeave?: {
    message: string;
    isDirty?: boolean;
  };
};

export function Modal({ onClose, openModalBtn, children, title, preventLeave }: ModalWindowProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const closeModal = () => {
    const dirty = preventLeave?.isDirty ?? isDirty;

    if (preventLeave?.message && dirty) {
      const isLeave = confirm(preventLeave.message);
      if (!isLeave) return;
    }

    if (onClose) {
      onClose();
    }

    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsDirty(false);
    setIsModalOpen(true);
  };

  const ctxValue = useMemo<ModalContextValue>(() => ({ isDirty, setIsDirty }), [isDirty]);

  return (
    <div>
      {openModalBtn(openModal)}

      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-xl shadow-xl relative w-[90%] max-w-4xl max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50 rounded-t-xl">
              <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
              <Button
                onClick={closeModal}
                className="hover:text-gray-800 hover:bg-gray-200 p-2 rounded-full"
              >
                Close modal
              </Button>
            </header>

            <div className="p-6">
              <ModalContext.Provider value={ctxValue}>{children}</ModalContext.Provider>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
