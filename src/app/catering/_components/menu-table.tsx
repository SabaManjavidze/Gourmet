import { ClearButton } from "@/app/menu/_components/clear-button";
import { HideZeroCheckbox } from "@/app/menu/_components/hidezero-checkbox";
import { MenuTemplate } from "@/app/menu/_components/menu-template";
import { NumberOfGuests } from "@/app/menu/_components/number-of-guests";
import { SumSection } from "@/app/menu/_components/sum-section";
import { MenuProvider } from "@/hooks/useMenu";
import { AddProductModal } from "./add-product-modal";
import { BottomButtons } from "./bottom-buttons";
import { useCatering } from "@/hooks/useCatering";
import { api } from "@/trpc/react";
import { MenuVariants } from "@/lib/types";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";

export function MenuTable({
  menuNameArg,
  menuTypeArg,
}: {
  menuNameArg: string;
  menuTypeArg: MenuVariants;
}) {
  const { currMenu, setCurrMenu, formData, setFormData } = useCatering();
  const [addProdOpen, setAddProdOpen] = useState(false);
  const {
    data: dbMenu,
    isLoading,
    isFetching,
    error,
  } = api.sampleMenu.getMenuProducts.useQuery({
    menuId: currMenu?.id as string,
    menuName: menuNameArg,
    assistance: formData?.assistance ?? "არა",
    plates: formData?.plates ?? "ერთჯერადი",
    drinks: formData?.drinks ?? [],
    type: formData?.type as MenuVariants,
    personRange: Math.floor(Number(formData?.personRange) / 10) * 10,
  });
  const t = useTranslations("Menus");
  const closeModal = () => {
    setAddProdOpen(false);
  };
  const addProductsClick = () => {
    setAddProdOpen(true);
  };
  if (error) throw error;
  if (!formData || isFetching || isLoading || !dbMenu) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-background">
        <Loader2 size={50} color={"black"} />
      </div>
    );
  }
  return (
    <>
      <MenuProvider
        dbMenu={dbMenu?.data ?? {}}
        changes={true}
        personRanges={{
          def: Number(formData.personRange),
          next: Number(dbMenu.nextPersonRange),
        }}
      >
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
          title={t(Object.keys(dbMenu.data)[0] ?? currMenu?.name ?? "")}
          name={Object.keys(dbMenu.data)[0] ?? currMenu?.name ?? ""}
          id="menu"
          header={
            <div className="mt-8">
              <NumberOfGuests
                personRanges={{
                  def: Number(formData.personRange),
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
          <BottomButtons />
        </div>
      </MenuProvider>
    </>
  );
}
