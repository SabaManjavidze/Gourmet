"use client";
import type { Dispatch } from "react";
import React, { useState } from "react";
import { nanoid } from "nanoid";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { MenuProvider } from "@/hooks/useMenu";
import { MenuTemplate } from "@/app/menu/_components/menu-template";
import { Menu } from "menu";

export function MenuCardModal({
  open,
  closeModal,
}: {
  open: boolean;
  closeModal: () => void;
}) {
  return (
    <Modal
      isOpen={open}
      closeModal={closeModal}
      className="max-h-[80%] w-[70%] overflow-auto px-36"
    >
      <MenuProvider dbMenu={{ "Canape/Salads": Menu["Canape/Salads"] }}>
        <MenuTemplate className="text-sm" name="Canape/Salads" />
      </MenuProvider>
    </Modal>
  );
}
