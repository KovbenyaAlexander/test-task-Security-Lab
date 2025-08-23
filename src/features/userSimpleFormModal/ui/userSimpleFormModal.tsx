"use client";

import { Button } from "@/src/shared/ui/button";
import { Modal } from "@/src/shared/ui/modal/ui/modal";
import { UserSimpleForm } from "@/src/entities/userSimpleForm";
import { UserSimpleFormData } from "@/src/entities/userSimpleForm/model/types";

export function UserSimpleFormModal() {
  const onSubmit = (data: UserSimpleFormData) => {
    alert(JSON.stringify(data));
  };

  return (
    <div className="flex gap-2">
      <Modal
        title="User Simple Form"
        openModalBtn={(onClickFn) => (
          <Button variant={"outline"} onClick={onClickFn}>
            OPEN SIMPLE FORM
          </Button>
        )}
        preventLeave={{
          message: "unsave changes will be lost",
        }}
      >
        <UserSimpleForm onSubmit={onSubmit} />
      </Modal>
    </div>
  );
}
