"use client";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
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
import { v4 as uuid, v4 } from "uuid";
import { api } from "@/trpc/react";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";

export function CateringCarousel() {
  const router = useRouter();
  const handleItemClick = (name: string) => {
    router.push(`/catering?menu=${name}`);
  };
  const t = useTranslations("Menus");
  const {
    data: sampleMenus,
    isLoading,
    error,
  } = api.sampleMenu.getMenus.useQuery();
  const autoplay = React.useMemo(() => {
    return Autoplay({ delay: 2000 });
  }, []);
  if (isLoading || !sampleMenus)
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-background">
        <Loader2 size={50} color={"black"} />
      </div>
    );
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
        {sampleMenus.map(({ id, name, picture }, index) => (
          <CarouselItem
            key={id}
            className="hover:z-20 max-lg:basis-full lg:basis-1/2 2xl:basis-1/3"
          >
            <Link href={`/catering#${name}`}>
              <CardContainer className="cursor-pointer border-4 border-white hover:z-20">
                <CardBody
                  className="relative flex aspect-square h-96 w-96 
                  items-center justify-center p-6 duration-200 hover:scale-[1.120]  max-md:h-64 max-md:w-64 
                  max-sm:h-60 max-sm:w-60"
                >
                  <Image
                    src={
                      picture !== "" && picture !== null
                        ? picture
                        : "https://i0.wp.com/www.glennhager.com/wp-content/uploads/2018/03/table.jpg"
                    }
                    alt="no image"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
                    {t(name)}
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
