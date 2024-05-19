"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerTrigger,
  DrawerPortal,
  DrawerOverlay,
  DrawerContent,
  DrawerTitle,
} from "@/components/ui/drawer";
import { DialogPortal } from "@radix-ui/react-dialog";

export function NavDrawer({
  open,
  closeDrawer,
}: {
  open: boolean;
  closeDrawer: () => void;
}) {
  return (
    <Drawer direction="right" open={open} onClose={closeDrawer} modal>
      <DrawerPortal>
        <DrawerOverlay className="fixed inset-0 bg-black/40" />
        <DrawerContent className="fixed left-[unset] mt-0 flex h-full w-[400px] flex-col rounded-tl-[10px] rounded-tr-none bg-white max-[570px]:w-[300px] max-[400px]:w-[200px]"></DrawerContent>
      </DrawerPortal>
    </Drawer>
  );
}
