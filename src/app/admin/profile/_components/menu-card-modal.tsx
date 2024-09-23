import React, { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { MenuProvider } from "@/hooks/useMenu";
import { MenuTemplate } from "@/app/menu/_components/menu-template";
import { api } from "@/trpc/react";
import { Loader2 } from "lucide-react";
import { BottomButtons } from "@/app/catering/_components/bottom-buttons";
import { AddProductModal } from "@/app/catering/_components/add-product-modal";
import { useAdmin } from "@/hooks/useAdmin";

export function MenuCardModal({
  orderId,
  open,
  closeModal,
}: {
  orderId: string;
  open: boolean;
  closeModal: () => void;
}) {
  const [addOpen, setAddOpen] = useState(false);
  const [changes, setChanges] = useState(false);
  const { selected } = useAdmin();
  const {
    data: order,
    isLoading,
    error,
  } = api.admin.getUserOrder.useQuery(
    {
      orderId,
      userId: selected?.id ?? "",
    },
    { enabled: !!selected },
  );
  if (error) throw error;
  if (isLoading || !order)
    return (
      <Modal
        isOpen={open}
        closeModal={closeModal}
        className="max-h-[80%] w-[70%] overflow-auto px-36"
      >
        <div className="flex min-h-screen w-full items-center justify-center bg-background">
          <Loader2 size={50} color={"black"} />
        </div>
      </Modal>
    );

  return (
    <Modal
      isOpen={open}
      closeModal={() => {
        if (changes) {
          const confirm = window.confirm(
            "You have unsaved changes, are you sure you want to leave?",
          );
          if (!confirm) return;
        }
        closeModal();
      }}
      className="max-h-[80%] w-[70%] overflow-auto px-36"
    >
      <MenuProvider
        dbMenu={{ [order.name]: order.products }}
        setChanges={setChanges}
        userId={selected?.id ?? ""}
        changes={changes}
      >
        {addOpen ? (
          <AddProductModal
            open={addOpen}
            closeModal={() => setAddOpen(false)}
            menuSample={order.name}
          ></AddProductModal>
        ) : null}

        <MenuTemplate
          addClick={() => setAddOpen(true)}
          className="text-sm"
          name={order.name}
        />

        <div className={`sticky bottom-0 mt-8 flex w-full justify-center`}>
          <BottomButtons orderId={order.id} saveText="save" />
        </div>
      </MenuProvider>
    </Modal>
  );
}
