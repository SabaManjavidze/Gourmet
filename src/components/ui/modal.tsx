import type { ReactNode } from "react";
import React, { Fragment, useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./dialog";
import { twMerge } from "tailwind-merge";

interface ModalPropType {
  children: ReactNode;
  title?: string | ReactNode;
  isOpen: boolean;
  closeModal: () => void;
  className?: string;
}
export function Modal({
  closeModal,
  isOpen,
  children,
  title,
  className = "",
}: ModalPropType) {
  return (
    <Dialog
      open={isOpen}
      modal
      onOpenChange={(open) => {
        if (!open) closeModal();
      }}
    >
      <DialogContent className={twMerge("", className)}>
        {title != undefined ? (
          typeof title == typeof className ? (
            <DialogHeader className="relative flex w-full justify-center">
              <DialogTitle className="text-center">{title}</DialogTitle>
            </DialogHeader>
          ) : typeof title == typeof {} ? (
            (title as ReactNode)
          ) : null
        ) : null}
        {children}
      </DialogContent>
    </Dialog>
  );
}
