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
import { OrderNowModal } from "@/components/order-now-modal/order-now-modal";

export function MenuCardModal({
  open,
  closeModal,
}: {
  open: boolean;
  closeModal: () => void;
}) {
  const [orderNow, setOrderNow] = useState(false);

  return (
    <Modal
      isOpen={open}
      closeModal={closeModal}
      className="max-h-[80%] w-[70%] overflow-auto px-36"
    >
      <MenuProvider dbMenu={{ "Canape/Salads": Menu["Canape/Salads"] }}>
        <OrderNowModal
          open={orderNow}
          closeModal={() => setOrderNow(false)}
        ></OrderNowModal>
        <MenuTemplate className="text-sm" name="Canape/Salads" />

        <div className={`sticky bottom-0 mt-8 flex w-full justify-center`}>
          <div className="*:spacing flex w-[501px] justify-between *:border-2 *:py-6 *:text-base *:font-bold *:uppercase *:tracking-wider">
            <Button
              variant={"outline-accent"}
              // onClick={handleSaveClick}
              size={"lg"}
            >
              Save For Later
            </Button>
            <Button
              variant={"accent"}
              onClick={() => setOrderNow(true)}
              size={"lg"}
              className={"border-accent"}
            >
              Order Now
            </Button>
          </div>
        </div>
      </MenuProvider>
    </Modal>
  );
}
