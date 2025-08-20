"use client";

import React, { useState } from "react";
import { Button } from "@/src/shared/ui";

type ModalWindowProps = {
  openModalBtn: (onClick: () => void) => React.ReactNode;
  onCloseCallback?: () => void;
  children?: React.ReactNode;
};

export function Modal({ onCloseCallback, openModalBtn, children }: ModalWindowProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    if (onCloseCallback) {
      onCloseCallback();
    }
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

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
            {children}
            <Button onClick={closeModal} className="absolute top-4 right-4">
              CLOSE
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
