"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { menuKey, sampleMenus } from "menu";
import Image from "next/image";

export function SampleMenuCarousel({
  onItemClick,
  currMenu,
}: {
  onItemClick?: (name: menuKey) => void;
  currMenu: menuKey;
}) {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-[90%] px-12"
    >
      <CarouselContent>
        {sampleMenus.map(({ name, src }, index) => (
          <CarouselItem
            key={name}
            className={`${currMenu == name ? "scale-100" : "scale-90"} w-[95%] duration-300 hover:scale-100 max-sm:w-full md:basis-1/2 lg:basis-1/3`}
          >
            <Card
              onClick={() => onItemClick?.(name)}
              className="cursor-pointer rounded-xl border-[8px] border-b-0 border-[#BF9A50]"
            >
              <CardContent className="relative flex aspect-video items-center justify-center rounded-xl p-6">
                <Image
                  src={src}
                  alt=""
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
        className="h-12 w-12"
        iconStyle="h-6 w-6"
      />
      <CarouselNext
        variant={"default"}
        className="h-12 w-12"
        iconStyle="h-6 w-6"
      />
    </Carousel>
  );
}
