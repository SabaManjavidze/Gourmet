import { LOREM } from "@/lib/constants";
import { api } from "@/trpc/react";
import { Button } from "@/components/ui/button";
import { MenuPreviewSection } from "../menu-preview-section";

export function MenuPreviews({
  orderClick,
}: {
  orderClick: (menuId: string) => void;
}) {
  const { data: sampleMenus, isLoading: menusLoading } =
    api.sampleMenu.getMenus.useQuery();
  return (
    <div
      className="mt-16 flex w-full flex-col items-center gap-y-32 
        max-lg:gap-y-24 max-md:gap-y-20"
    >
      {sampleMenus?.map((item, idx) => (
        <div className="w-full" key={idx}>
          <MenuPreviewSection
            data={{
              desc: item.desc ?? "hello",
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
  );
}
