import { api } from "@/trpc/react";
import { Loader2, PlusCircle } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { CateringFormModal } from "./catering-form-modal";
import { cateringFormType, useCatering } from "@/hooks/useCatering";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CustomCateringFormModal } from "./custom-catering-form-modal";
import { MenuPreviews } from "./product-section/menu-previews";
import { MenuTable } from "./menu-table";
import { CustomCatering } from "@/app/_components/custom-catering";
export function ProductsSection() {
  const [customOpen, setCustomOpen] = useState(false);
  const { currMenu, setCurrMenu, formData, setFormData } = useCatering();
  const [selectedMenu, setSelectedMenu] = useState<undefined | string>();
  const router = useRouter();
  const pathname = usePathname();
  const utils = api.useUtils();
  const searchParams = useSearchParams();
  const menuIdArg = useMemo(() => searchParams.get("menuId"), [searchParams]);
  const menuNameArg = useMemo(
    () => searchParams.get("menuName"),
    [searchParams],
  );
  const menuTypeArg = useMemo(() => searchParams.get("type"), [searchParams]);
  if (
    menuTypeArg !== null &&
    menuTypeArg != "cheap" &&
    menuTypeArg != "standard" &&
    menuTypeArg != "expensive"
  )
    throw new Error("invalid url");
  const personRangeArg = searchParams.get("personRange");
  const {
    data: sampleMenus,
    error,
    isLoading: menusLoading,
  } = api.sampleMenu.getMenus.useQuery();

  if (error) throw error;
  if (menusLoading) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-background">
        <Loader2 size={50} color={"black"} />
      </div>
    );
  }
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
    // await utils.sampleMenu.getMenuProducts.fetch({
    //   menuId: m.id,
    //   menuName: m.name,
    //   menuType: data.menuType,
    //   personRange: data.personRange,
    // });
    router.push(
      pathname +
        `?menuId=${m.id}&menuName=${m.name}&personRange=${data.personRange}&type=${data.menuType}`,
      { scroll: true },
    );
    // await getMenuProducts();
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
      !currMenu ? (
        <>
          <MenuPreviews orderClick={orderClick} />
          <section className="relative flex w-full max-lg:mt-12">
            <CustomCatering />
            {/* <div className="absolute inset-12 bg-black opacity-20 max-sm:inset-3"></div>
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
*/}
          </section>
        </>
      ) : (
        <MenuTable menuNameArg={menuNameArg} menuTypeArg={menuTypeArg} />
      )}
    </>
  );
}
