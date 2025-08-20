"use client";

import { Button } from "@/src/shared/ui";
import { Modal } from "@/src/shared/ui/modal/modal";

export default function Home() {
  return (
    <div>
      <Modal
        openModalBtn={(onClickFn) => (
          <Button variant={"outline"} onClick={onClickFn}>
            OPEN MODAL
          </Button>
        )}
      >
        <h2>header</h2>
        <p>Content</p>
        <p>Content</p>
        <p>Content</p>
      </Modal>
    </div>
  );
}
