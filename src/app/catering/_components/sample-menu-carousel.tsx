"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { api } from "@/trpc/react";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { currMenuType, useCatering } from "@/hooks/useCatering";

export function SampleMenuCarousel() {
  const { currMenu, setCurrMenu } = useCatering();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const {
    data: sampleMenus,
    isLoading,
    error,
  } = api.sampleMenu.getMenus.useQuery();

  useEffect(() => {
    const menuArg = searchParams.get("menu");
    // if (!isLoading && sampleMenus?.[0]) {
    if (!isLoading && sampleMenus?.[0] && menuArg) {
      // setCurrMenu({ name: menuArg ?? sampleMenus[0].name, id: "" });
      setCurrMenu({ name: menuArg, id: "" });
      document
        .getElementById("menu")
        ?.scrollIntoView({ inline: "end", behavior: "smooth" });
    }
  }, [isLoading, sampleMenus]);
  if (error) throw error;
  if (isLoading || !sampleMenus)
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-background">
        <Loader2 size={50} color={"black"} />
      </div>
    );
  const onItemClick = (item: currMenuType) => {
    // document
    //   .getElementById(item.name)
    //   ?.scrollIntoView({ inline: "start", behavior: "smooth" });
    // router.replace(pathname + `?menu=${item.name}`, { scroll: false });
    router.replace(pathname + `#${item.name}`, { scroll: true });
    setCurrMenu(undefined);
  };
  return (
    <Carousel
      opts={{ loop: false }}
      className="w-[90%] px-12 max-md:w-4/5 max-md:px-5"
    >
      <CarouselContent>
        {sampleMenus.map(({ name, picture, id }, index) => (
          <CarouselItem
            key={id}
            className={`${currMenu?.name == name ? "scale-100" : "scale-90"} w-[95%] duration-300 hover:scale-100 max-sm:w-full md:basis-1/2 lg:basis-1/3`}
          >
            <Card
              onClick={() => onItemClick({ name, id })}
              className="cursor-pointer rounded-xl border-[8px] border-b-0 border-[#BF9A50]"
            >
              <CardContent className="relative flex aspect-video items-center justify-center rounded-xl p-6">
                <Image
                  src={
                    picture !== "" && picture !== null
                      ? picture
                      : "https://i0.wp.com/www.glennhager.com/wp-content/uploads/2018/03/table.jpg"
                  }
                  alt=""
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  fill
                  className="rounded-lg object-cover object-center"
                />
                <span
                  className="absolute bottom-0 z-10 w-full border-t border-t-[#BF9A50] bg-black/30 py-4 text-center 
                  font-lucida-bold text-3xl font-normal text-white 
                  max-md:text-xl max-sm:text-base"
                >
                  {name}
                </span>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious
        variant={"default"}
        className="h-12 w-12 max-md:h-8 max-md:w-8 max-sm:ml-4 md:ml-4"
        iconStyle="h-6 w-6"
      />
      <CarouselNext
        variant={"default"}
        className="h-12 w-12 max-md:h-8 max-md:w-8 max-sm:mr-4 md:mr-4"
        iconStyle="h-6 w-6"
      />
    </Carousel>
  );
}
