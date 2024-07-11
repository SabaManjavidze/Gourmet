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
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CardBody, CardContainer } from "./3d-card";
import { v4 as uuid } from "uuid";

export function CateringCarousel() {
  const router = useRouter();
  const handleItemClick = (name: string) => {
    router.push(`/catering?menu=${name}`);
  };
  const autoplay = React.useMemo(() => {
    return Autoplay({ delay: 2000 });
  }, []);
  return (
    <Carousel
      plugins={[autoplay as any]}
      opts={{
        align: "center",
        loop: true,
        active: true,
      }}
      className="w-[90%] px-12 max-md:w-full max-md:px-0"
    >
      <CarouselContent>
        {sampleMenus.concat(sampleMenus).map(({ name, src }, index) => (
          <CarouselItem
            key={uuid()}
            className="hover:z-20 max-lg:basis-full lg:basis-1/2 2xl:basis-1/3"
          >
            <Link href={`/catering?menu=${name}`}>
              <CardContainer className="cursor-pointer border-4 border-white hover:z-20">
                <CardBody
                  className="relative flex aspect-square h-96 w-96 
                  items-center justify-center p-6 duration-200 hover:scale-[1.120]  max-md:h-64 max-md:w-64 
                  max-sm:h-60 max-sm:w-60"
                >
                  <Image
                    src={src}
                    alt="no image"
                    fill
                    className="object-cover"
                    onMouseLeave={() => {
                      if (autoplay) {
                        autoplay?.play?.();
                      }
                    }}
                    onMouseEnter={() => {
                      if (autoplay) {
                        autoplay?.stop?.();
                      }
                    }}
                  />
                  <span className="absolute bottom-0 z-10 w-full bg-black/25 py-4 text-center text-3xl font-normal uppercase text-white max-md:text-xl max-sm:text-base">
                    {name}
                  </span>
                </CardBody>
              </CardContainer>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious
        variant={"outline-white"}
        className="h-12 w-12 max-md:h-8 max-md:w-8"
        iconStyle="h-6 w-6"
      />
      <CarouselNext
        variant={"outline-white"}
        className="h-12 w-12 max-md:h-8 max-md:w-8"
        iconStyle="h-6 w-6"
      />
    </Carousel>
  );
}
