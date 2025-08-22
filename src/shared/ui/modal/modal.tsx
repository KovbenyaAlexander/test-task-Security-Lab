"use client";

import React, { createContext, useContext, useMemo, useState } from "react";
import { Button } from "@/src/shared/ui/button/button";

type ModalWindowProps = {
  openModalBtn: (onClick: () => void) => React.ReactNode;
  onClose?: () => void;
  children?: React.ReactNode;
  preventLeave?: {
    message: string;
    isDirty?: boolean;
  };
};

type ModalDirtyContextValue = {
  isDirty: boolean;
  setIsDirty: (v: boolean) => void;
};

const ModalDirtyContext = createContext<ModalDirtyContextValue | null>(null);

export const useModalDirty = () => useContext(ModalDirtyContext);

export function Modal({ onClose, openModalBtn, children, preventLeave }: ModalWindowProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  console.log(`MODAL RERENDER`);

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

  const ctxValue = useMemo<ModalDirtyContextValue>(() => ({ isDirty, setIsDirty }), [isDirty]);

  return (
    <div>
      {openModalBtn(openModal)}

      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white p-6 rounded-xl shadow-xl relative w-[90%] max-w-4xl max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <ModalDirtyContext.Provider value={ctxValue}>{children}</ModalDirtyContext.Provider>
            <Button onClick={closeModal} className="absolute top-4 right-4">
              CLOSE
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
