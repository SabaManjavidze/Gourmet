import { ClearButton } from "@/app/menu/_components/clear-button";
import { HideZeroCheckbox } from "@/app/menu/_components/hidezero-checkbox";
import { MenuTemplate } from "@/app/menu/_components/menu-template";
import { SumSection } from "@/app/menu/_components/sum-section";
import { OrderNowModal } from "@/components/order-now-modal/order-now-modal";
import { MenuProvider } from "@/hooks/useMenu";
import { api } from "@/trpc/react";
import { Loader2, PlusCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Suspense, useEffect, useState } from "react";
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
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CustomCateringFormModal } from "./custom-catering-form-modal";
import { MenuPreviews } from "./product-section/menu-previews";

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
  const [customOpen, setCustomOpen] = useState(false);
  const { currMenu, setCurrMenu, formData, setFormData } = useCatering();
  const [selectedMenu, setSelectedMenu] = useState<undefined | string>();
  const [addProdOpen, setAddProdOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const searchParams = useSearchParams();
  const menuIdArg = searchParams.get("menuId");
  const menuNameArg = searchParams.get("menuName");
  const menuTypeArg = searchParams.get("type");
  if (
    menuTypeArg !== null &&
    menuTypeArg != "cheap" &&
    menuTypeArg != "standard" &&
    menuTypeArg != "expensive"
  )
    throw new Error("invalid url");
  const personRangeArg = searchParams.get("personRange");
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
    {
      enabled: !!currMenu?.id && !!formData?.menuType,
    },
  );
  const { data: sampleMenus, isLoading: menusLoading } =
    api.sampleMenu.getMenus.useQuery();

  if (error) throw error;
  if (isFetching || isLoading || menusLoading) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-background">
        <Loader2 size={50} color={"black"} />
      </div>
    );
  }
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
  const orderClick = (menuId: string) => {
    setSelectedMenu(menuId);
  };
  const onSubmit = async (data: cateringFormType) => {
    if (!sampleMenus || !selectedMenu) return;
    setFormData(data);
    const m = sampleMenus.find((item) => item.id == selectedMenu);
    if (!m) return;
    setCurrMenu({ id: m.id, name: m.name });
    router.push(
      pathname +
        `?menuId=${m.id}&menuName=${m.name}&personRange=${data.personRange}&type=${data.menuType}`,
      { scroll: true },
    );
    await getMenuProducts();
  };

  return (
    <>
      <CustomCateringFormModal
        // onSubmit={onSubmit}
        open={customOpen}
        closeModal={() => setCustomOpen(false)}
      />
      <CateringFormModal
        onSubmit={onSubmit}
        open={!!selectedMenu}
        closeModal={closeSelectedMenu}
      />
      {!menuTypeArg ||
      !personRangeArg ||
      !menuIdArg ||
      !menuNameArg ||
      !formData ||
      !dbMenu ||
      !currMenu ? (
        <>
          <MenuPreviews orderClick={orderClick} />
          <section
            className="relative flex h-[470px] w-full bg-dishes-banner
      bg-cover bg-center bg-no-repeat py-12 max-lg:mt-12"
          >
            <div className="absolute inset-12 bg-black opacity-20 max-sm:inset-3"></div>
            <div
              className="z-10 flex h-full w-full flex-col items-center 
        justify-center px-40 max-lg:px-20 max-sm:px-5"
            >
              <h2
                className="text-shadow text-center text-4xl font-normal tracking-wide
          text-white underline underline-offset-2 max-xl:text-2xl max-lg:text-xl"
              >
                Select The Menu Of Your Choice
              </h2>

              <p
                className="text-shadow mt-8 text-center text-lg text-white
          max-2xl:leading-8 max-xl:text-lg max-lg:text-base max-sm:text-xs"
              >
                Lorem ipsum dolor sit amet, consectetur adipi scing elit. Etiam
                eu turpis molestie, dictum est a, mattis tellus. Sed dignissim,
                metus nec fringilla accumsan, risus sem sollicitudin lacus,
                utinterdum tellus elit sed risus. Maecenas eget condimentum
                velit, sit amet feugiat lectus. Class aptent taciti sociosqu
                Maecenas eget condimentum velit, sit amet feugiat lectus.
                Classaptent taciti sociosqu
              </p>

              <Button
                className="mt-8 border border-white text-lg uppercase"
                onClick={() => setCustomOpen(true)}
                variant={"accent"}
              >
                order now
              </Button>
            </div>
          </section>
        </>
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
              name={Object.keys(dbMenu.data)[0] ?? currMenu?.name ?? ""}
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
