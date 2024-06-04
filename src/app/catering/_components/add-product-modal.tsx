"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { useMenu } from "@/hooks/useMenu";
import { Menu, menuKey, menuKeys } from "menu";
import { nanoid } from "nanoid";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

export function AddProductModal({
  open,
  closeModal,
  menuSample,
}: {
  open: boolean;
  menuSample: menuKey;
  closeModal: () => void;
}) {
  const [filter, setFilter] = useState<menuKey | "">("");
  const handleFilterClick = (name: menuKey) => {
    setFilter(name);
  };
  const { addProduct } = useMenu();
  const [selected, setSelected] = useState<string[]>([]);
  const handleProductClick = (productId: string) => {
    if (selected.includes(productId)) {
      setSelected((prev) => prev.filter((item) => item != productId));
      return;
    }
    setSelected((prev) => [...prev, productId]);
  };
  const handleSave = () => {
    const newProds = selected.map((item) => {
      return {
        name: item,
        price: 3,
      };
    });
    addProduct(menuSample, newProds);
    closeModal();
    setSelected([]);
  };
  const handleCancel = () => {
    closeModal();
    setSelected([]);
  };
  const cls =
    "fixed bottom-8 right-1/2 flex w-1/2 translate-x-1/2 justify-between bg-transparent";
  return (
    <Modal
      isOpen={open}
      closeModal={closeModal}
      className="h-[800px] w-[1000px]"
    >
      <div className="relative overflow-y-auto">
        {selected.length > 0 ? (
          <>
            <div className="fixed bottom-8 right-2/3 translate-x-1/2">
              <Button
                variant={"accent"}
                onClick={handleSave}
                className={"relative px-16 py-6 text-lg "}
              >
                Save
                <p
                  className="absolute -right-2 -top-2 rounded-full border-4 border-white
                  bg-accent p-2 py-0 text-white"
                >
                  {selected.length}
                </p>
              </Button>
            </div>
            <div className="fixed bottom-8 right-1/3 translate-x-1/2 ">
              <Button
                variant={"outline"}
                onClick={handleCancel}
                className={"px-16 py-6 text-lg"}
              >
                Cancel
              </Button>
            </div>
          </>
        ) : null}
        <div className="mt-12 flex w-full flex-col items-center px-4">
          <Input
            placeholder="Search Products..."
            className="w-full border-black/20 py-6 text-xl"
          />
          <div className="mt-2 flex max-w-[890px] justify-around gap-x-2 overflow-x-auto">
            {menuKeys.map((key) => (
              <Button
                variant="outline"
                key={nanoid()}
                onClick={() => {
                  handleFilterClick(key);
                }}
                className={`${key == filter ? "!border-accent-foreground bg-accent/20" : "bg-accent/0"} 
              rounded-xl border-black/20`}
              >
                {key}
              </Button>
            ))}
          </div>
        </div>
        <div className="mt-16 flex flex-col items-center overflow-y-auto">
          {Menu["Canape/Salads"].map((product) => (
            <button
              key={nanoid()}
              className={`flex w-[90%] justify-between border border-t-transparent px-8 py-5 
            text-xl font-semibold duration-150 first:border-t-border hover:border-t 
            hover:!border-accent/50 hover:bg-accent/15 
            ${selected.includes(product.name) ? "border-accent !border-t-accent bg-accent/25" : ""}`}
              onClick={() => handleProductClick(product.name)}
            >
              <h3>{product.name}</h3>
              <h3>${product.price}</h3>
            </button>
          ))}
        </div>
      </div>
    </Modal>
  );
}
