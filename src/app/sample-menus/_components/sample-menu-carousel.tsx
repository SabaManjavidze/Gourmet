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
      className="w-[90%] px-4"
    >
      <CarouselContent>
        {sampleMenus.map(({ name, src }, index) => (
          <CarouselItem
            key={name}
            className={`${currMenu == name ? "scale-90" : "scale-100"} duration-300 max-sm:w-full md:basis-1/2 lg:basis-1/3`}
          >
            <Card
              onClick={() => onItemClick?.(name)}
              className="cursor-pointer rounded-md border-[8px] border-[#BF9A50]"
            >
              <CardContent className="relative flex aspect-video items-center justify-center p-6 ">
                <Image
                  src={src}
                  alt=""
                  fill
                  className="object-cover object-center"
                />
                <span
                  className="absolute bottom-0 z-10 w-full bg-black/20 py-4 
                  text-center text-3xl font-normal uppercase text-white 
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
