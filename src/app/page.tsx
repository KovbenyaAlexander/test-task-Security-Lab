"use client";

import { UserMultistepFormModal } from "../features/userMultistepFormModal";
import { UserSimpleFormModal } from "../features/userSimpleFormModal";
import { UserSimpleForm } from "../entities/userSimpleForm";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6 bg-gray-50">
      <div className="flex items-center justify-center gap-4">
        <UserMultistepFormModal />
        <UserSimpleFormModal />
      </div>

      <div className="w-full max-w-md">
        <UserSimpleForm onSubmit={(data) => alert(JSON.stringify(data))} />
      </div>
    </div>
  );
}
