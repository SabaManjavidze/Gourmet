import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { api } from "@/trpc/react";
import { User } from "next-auth";
import { Input } from "@/components/ui/input";
import { useMenu } from "@/hooks/useMenu";

export function MenuNameModal({
  open,
  closeModal,
  menuName,
  setMenuName,
}: {
  open: boolean;
  closeModal: () => void;
  menuName: string;
  setMenuName: Dispatch<SetStateAction<string>>;
}) {
  const { handleSaveClick } = useMenu();
  return (
    <Modal
      isOpen={open}
      closeModal={closeModal}
      title="What should the menu name"
      className="h-[120px] w-[700px]"
    >
      <div
        className="relative flex h-full 
        w-full flex-col items-center justify-center"
      >
        <Input
          value={menuName}
          autoFocus
          onKeyDown={(e) => {
            if (e.key == "Enter" && menuName.length > 2) {
              closeModal();
              handleSaveClick();
              setMenuName("");
            }
          }}
          onChange={(e) => {
            setMenuName(e.currentTarget.value);
          }}
          placeholder="Type Menu Name..."
          className="w-full border-black/20 text-base 
        focus-within:!border-t-accent"
        />
      </div>
    </Modal>
  );
}
