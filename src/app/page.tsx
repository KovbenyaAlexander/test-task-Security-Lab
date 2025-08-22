"use client";

import { UserMultistepFormModal } from "../features/userMultistepFormModal";
import { UserSimpleFormModal } from "../features/userSimpleFormModal";

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen gap-4">
      <UserMultistepFormModal />
      <UserSimpleFormModal />
    </div>
  );
}
