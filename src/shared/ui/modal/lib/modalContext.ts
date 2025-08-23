import { createContext, useContext } from "react";

export type ModalContextValue = {
  isDirty: boolean;
  setIsDirty: (v: boolean) => void;
};

export const ModalContext = createContext<ModalContextValue | null>(null);

export const useModalContext = () => useContext(ModalContext);
