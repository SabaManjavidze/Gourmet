import { ClearButton } from "@/app/menu/_components/clear-button";
import { HideZeroCheckbox } from "@/app/menu/_components/hidezero-checkbox";
import { MenuTemplate } from "@/app/menu/_components/menu-template";
import { SumSection } from "@/app/menu/_components/sum-section";
import { OrderNowModal } from "@/components/order-now-modal/order-now-modal";
import { MenuProvider } from "@/hooks/useMenu";
import { api } from "@/trpc/react";
import { Loader2, PlusCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { AddProductModal } from "./add-product-modal";
import { BottomButtons } from "./bottom-buttons";
import { NumberOfGuests } from "@/app/menu/_components/number-of-guests";
import Image from "next/image";
import { MenuPreview, MenuPreviewSection } from "./menu-preview-section";
import { LOREM } from "@/lib/constants";
import { MenuVariants } from "@/lib/types";
import { CateringFormModal } from "./catering-form-modal";
import { ProductWithVariants } from "menu";
import { cateringFormType, useCatering } from "@/hooks/useCatering";

// const MenuPreviews: MenuPreview[] = [
//   {
//     title: "Drinks",
//     desc: LOREM,
//     imgSide: "left",
//   },
//   {
//     title: "Coffee Break",
//     desc: LOREM,
//     imgSide: "right",
//   },
//   {
//     title: "Corporate Catering",
//     desc: LOREM,
//     imgSide: "left",
//   },
//   {
//     title: "Party",
//     desc: LOREM,
//     imgSide: "right",
//   },
// ];
export function ProductsSection() {
  const [orderOpen, setOrderOpen] = useState(false);
  const { currMenu, setCurrMenu, formData, setFormData } = useCatering();
  const [selectedMenu, setSelectedMenu] = useState<undefined | string>();
  const [addProdOpen, setAddProdOpen] = useState(false);
  const {
    data: dbMenu,
    isLoading,
    isFetching,
    refetch: getMenuProducts,
    error,
  } = api.sampleMenu.getMenuProducts.useQuery(
    {
      menuId: currMenu?.id as string,
      menuType: formData?.menuType as MenuVariants,
      personRange: formData?.personRange as number,
    },
    { enabled: !!currMenu?.id && !!formData?.menuType },
  );

  const { data: sampleMenus, isLoading: menusLoading } =
    api.sampleMenu.getMenus.useQuery();

  if (error) throw error;
  if (isLoading || menusLoading)
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-background">
        <Loader2 size={50} color={"black"} />
      </div>
    );

  const handleOrderNowClick = () => {
    setOrderOpen(true);
  };
  const closeModal = () => {
    setAddProdOpen(false);
  };
  const addProductsClick = () => {
    setAddProdOpen(true);
  };
  const closeOrderModal = () => {
    setOrderOpen(false);
  };
  const closeSelectedMenu = () => {
    setSelectedMenu(undefined);
    setCurrMenu(undefined);
  };
  const orderClick = (menuId: string, menuName: string) => {
    setSelectedMenu(menuId);
  };
  const onSubmit = async (data: cateringFormType) => {
    if (!sampleMenus || !selectedMenu) return;
    setFormData(data);
    const m = sampleMenus.find((item) => item.id == selectedMenu);
    if (!m) return;
    setCurrMenu({ id: m.id, name: m.name });
    await getMenuProducts();
  };

  return (
    <>
      <CateringFormModal
        onSubmit={onSubmit}
        open={!!selectedMenu}
        closeModal={closeSelectedMenu}
      />
      {!dbMenu || !currMenu || !formData ? (
        <div
          className="mt-16 flex w-full flex-col items-center gap-y-32 
        max-lg:gap-y-24 max-md:gap-y-20"
        >
          {sampleMenus?.map((item, idx) => (
            <div className="w-full" key={idx}>
              <MenuPreviewSection
                data={{
                  desc: LOREM,
                  id: item.id,
                  picture: item.picture ?? "",
                  title: item.name,
                  imgSide: (idx + 1) % 2 == 0 ? "right" : "left",
                }}
                onOrderClick={orderClick}
              />
            </div>
          ))}
        </div>
      ) : (
        <>
          <MenuProvider
            dbMenu={dbMenu?.data ?? {}}
            changes={true}
            personRanges={{
              def: formData.personRange,
              next: Number(dbMenu.nextPersonRange),
            }}
          >
            <OrderNowModal open={orderOpen} closeModal={closeOrderModal} />
            {currMenu && addProdOpen ? (
              <AddProductModal
                menuSample={currMenu.name}
                open={addProdOpen}
                closeModal={closeModal}
              />
            ) : null}
            <MenuTemplate
              // products={dbMenu[currMenu] ?? []}
              addClick={addProductsClick}
              name={currMenu.name}
              id="menu"
              header={
                <div className="mt-8">
                  <NumberOfGuests
                    personRanges={{
                      def: formData.personRange,
                      next: Number(dbMenu.nextPersonRange),
                    }}
                  />

                  <div className="mt-8 flex items-center justify-between px-3">
                    <HideZeroCheckbox iconSide="left" />
                    <ClearButton />
                  </div>
                </div>
              }
            />
            <div className="mt-8">
              <SumSection />
            </div>
            <div className={`sticky bottom-8 mt-8 flex w-full justify-center`}>
              <BottomButtons orderClick={handleOrderNowClick} />
            </div>
          </MenuProvider>
        </>
      )}
    </>
  );
}
