import { api } from "@/trpc/react";
import { Loader2, PlusCircle } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { CateringFormModal, cateringFormType } from "./catering-form-modal";
import { useCatering } from "@/hooks/useCatering";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CustomCateringFormModal } from "./custom-catering-form-modal";
import { MenuPreviews } from "./product-section/menu-previews";
import { MenuTable } from "./menu-table";
import { CustomCatering } from "@/app/_components/custom-catering";
import { useTranslations } from "next-intl";
export function ProductsSection() {
  const t = useTranslations("Custom Catering");
  const {
    currMenu,
    setCurrMenu,
    formData,
    setFormData,
    customOpen,
    setCustomOpen,
  } = useCatering();
  const [selectedMenu, setSelectedMenu] = useState<undefined | string>();
  const router = useRouter();
  const pathname = usePathname();
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
    // console.log({ mname: m.name });
    setCurrMenu({ id: m.id, name: m.name });
    const { personRange, type, ...params } = data;
    const dataParam = `data=${JSON.stringify(params)}`;
    router.push(
      pathname +
        `?menuId=${m.id}&menuName=${m.name}&type=${data.type}&${dataParam}&personRange=${data.personRange}`,
      { scroll: true },
    );
  };

  return (
    <>
      <CustomCateringFormModal
        // onSubmit={onSubmit}
        open={customOpen}
        closeModal={() => setCustomOpen(false)}
      />
      <CateringFormModal
        menuName={
          sampleMenus?.find((m) => m.id == selectedMenu)?.name ?? "hello"
        }
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
          <section
            className="relative mt-12 flex w-full 
          flex-col items-center justify-center text-center font-semibold"
          >
            <h2 className="text-center text-5xl font-semibold">{t("title")}</h2>
            <h3 className="mt-5 max-w-[840px] text-center text-base">
              {t("sub")}
            </h3>
            <CustomCatering onClick={() => setCustomOpen(true)} />
          </section>
          <MenuPreviews orderClick={orderClick} />
        </>
      ) : (
        <MenuTable menuNameArg={menuNameArg} menuTypeArg={menuTypeArg} />
      )}
    </>
  );
}
