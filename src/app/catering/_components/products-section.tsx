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
    console.log({ mname: m.name });
    setCurrMenu({ id: m.id, name: m.name });
    // await utils.sampleMenu.getMenuProducts.fetch({
    //   menuId: m.id,
    //   menuName: m.name,
    //   menuType: data.menuType,
    //   personRange: data.personRange,
    // });
    const { personRange, type, ...params } = data;
    const dataParam = `data=${JSON.stringify(params)}`;
    router.push(
      pathname +
        `?menuId=${m.id}&menuName=${m.name}&type=${data.type}&${dataParam}&personRange=${data.personRange}`,
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
          <section className="relative flex w-full flex-col text-center font-semibold max-lg:mt-12">
            <h2>
              თუ მასშტაბურ ღონისძიებას (ქორწილი, კორპორაციული წვეულება,
              კონფერენცია) გეგმავთ, გირჩევთ, დაუკავშირდეთ „გურმეს“ მენეჯერს,
              რომელიც დაგეხმარებათ ქეითერინგის მოცულობის განსაზღვრაში და სწორი
              კერძების შერჩევაში, კონსულტაცია უფასოა.
            </h2>
            <CustomCatering onClick={() => setCustomOpen(true)} />
          </section>
        </>
      ) : (
        <MenuTable menuNameArg={menuNameArg} menuTypeArg={menuTypeArg} />
      )}
    </>
  );
}
