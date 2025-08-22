"use client";

import { Button } from "@/src/shared/ui";
import { Modal } from "@/src/shared/ui/modal/modal";
import { UserMultistepForm } from "@/src/entities/userMultistepForm";
import { UserMultistepFormData } from "@/src/entities/userMultistepForm/model/types";

export function UserMultistepFormModal() {
  const onSubmit = (data: UserMultistepFormData) => {
    alert(JSON.stringify(data));
  };

  return (
    <div className="flex gap-2">
      <Modal
        openModalBtn={(onClickFn) => (
          <Button variant={"outline"} onClick={onClickFn}>
            OPEN MULTI-STEP FORM
          </Button>
        )}
        preventLeave={{
          message: "unsave changes will be lost",
        }}
      >
        <UserMultistepForm onSubmit={onSubmit} />
      </Modal>
    </div>
  );
}
