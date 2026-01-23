import { LOREM } from "@/lib/constants";
import { api } from "@/trpc/react";
import { Button } from "@/components/ui/button";
import { MenuPreviewSection } from "../menu-preview-section";
import { useTranslations } from "next-intl";

export function MenuPreviews({
  orderClick,
}: {
  orderClick: (menuId: string) => void;
}) {
  const { data: sampleMenus, isLoading: menusLoading } =
    api.sampleMenu.getMenus.useQuery();
  const t = useTranslations("Menus");
  const corporateMenu = sampleMenus?.find(
    (m) => m.name === "კორპორაციული ღონისძიება",
  );
  return (
    <div className="mt-10 flex w-full flex-col items-center gap-y-16 max-lg:gap-y-24 max-md:gap-y-20">
      {sampleMenus?.map((item, idx) => (
        <div className="w-full" key={idx}>
          <MenuPreviewSection
            data={{
              desc: t(item.name + "_sub"),
              id: item.id,
              picture: item.picture ?? "",
              title: item.name,
              imgSide: (idx + 1) % 2 == 0 ? "right" : "left",
            }}
            onOrderClick={
              item.name === "წვეულება" && corporateMenu
                ? () => orderClick(corporateMenu.id)
                : orderClick
            }
          />
        </div>
      ))}
    </div>
  );
}
