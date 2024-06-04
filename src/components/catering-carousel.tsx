"use client";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { sampleMenus } from "menu";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function CateringCarousel() {
  const router = useRouter();
  const handleItemClick = (name: string) => {
    router.push(`/catering?menu=${name}`);
  };
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-[90%] px-24 max-sm:w-full"
    >
      <CarouselContent>
        {sampleMenus.map(({ name, src }, index) => (
          <CarouselItem key={index} className="px-6 md:basis-1/2 lg:basis-1/3">
            <Card
              onClick={() => handleItemClick(name)}
              className="cursor-pointer border-4 border-white"
            >
              <CardContent className="relative flex aspect-square items-center justify-center p-6 ">
                <Image src={src} alt="" fill className="object-cover" />
                <span className="absolute bottom-0 z-10 w-full bg-black/20 py-4 text-center text-3xl font-normal uppercase text-white max-md:text-xl max-sm:text-base">
                  {name}
                </span>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious
        variant={"outline-white"}
        className="h-12 w-12"
        iconStyle="h-6 w-6"
      />
      <CarouselNext
        variant={"outline-white"}
        className="h-12 w-12"
        iconStyle="h-6 w-6"
      />
    </Carousel>
  );
}
