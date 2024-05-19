"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import Image from "next/image";

export function SampleMenuCarousel() {
  const cuisines = [
    {
      title: "coffee with chocolate pie",
      src: "https://s3-alpha-sig.figma.com/img/427b/d879/0cfe56a452f9e94ede1975c8cfba84f0?Expires=1715558400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=iYJQHEI05dbJd4etoJe1UbhboR9A0Yd6q4Tyc3aOWHdzA54hAEPZsPW~TI3oSLECPfMaHn4lvYpJu5FThVRnyPMyIqGdHj84Xqbr-xL5VyWIyaHN2tYZ9eUcA7Q0s0onjl93VlaE2pZ5RCazDddu8D1sdlpdfYUMu2oZFXqQLxLXMzajAj759KFiMc6zIUr7aWP0QtSXRBpUib6sec6FN5gOprrP8CAnqeHEXJO3IdGlBli5OQ96EvM1h5w8EIN7zN38bFBBP8yxFJG6xyPtZund8DD9o2epUdunsDNaxmXHI~BFnKz7i0rw6QG0hjyF6QucE86BgDd5NwPeNM8gQg__",
    },
    {
      title: "coffee with chocolate pie",
      src: "https://s3-alpha-sig.figma.com/img/db2d/26a2/c34b44b1d12626a635fc07be9afb4e34?Expires=1715558400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=S3HzI8VxcnVe1olDbh2R6TmWcJ3j13eWRRbxhr3c8S~RiXBCN4BenIuAW47HSc3Yz45CThSnsq9HQDxTXuRo9nNx1kCzUL6-dmefy0r~I03LCOlspZrUsydhvltgOeZ9Bwl44AFVwZHvQgkHLM243N15XPWsDnLio4VQVfL~lhXartlP6ZKejJpctO2QmKYHO5gSbkCk6YJCnBZkg7kxKpc2snD06HRPluYLgdh0xdF9wDJTdSWseH~2B4EOFK8KACcmMkPa-9RM~T054qfBBHn4mjjnV4eJCXa0Kow4vEoAQqyCrFf0dRObFOlsghtdjbJJ0InE3mQgXVqFXrEv0A__",
    },
    {
      title: "coffee with chocolate pie",
      src: "https://s3-alpha-sig.figma.com/img/4cf6/6574/be2f7f2b2147ae10903c38d3cdcedb0b?Expires=1715558400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=OuLBPO01gS9GAS3-PrpxtKCB-rZwKNNZtYOeBLJDaWnNDV13vevmNBj4ZTOmse0dtiHT0M9DDAsRbXrccis1hlpnVuMDFtNMW7vOePTduynZW9RTbCdcLx1EfY9fTdl2rl8RwQ6DsJvDyJelAZZ1LZSxSzbTbrrN37PB14XVOhRAb5WnDvu3MXGDfhnkRl8QovhBRsaXNwSDZgFiAfiNT6GHqWUlr8qxNp85Y-~KYBH~eX7JAQEQJ6AGUtaaes6dLu1FYVLo4LFNsSLLK9wYY16MXNTkuNtNdghYPJovlSLg5oKsmEdN43BFzEsksmWWkkvMDabaY6~R3H5sCZ4yRA__",
    },
    {
      title: "coffee with chocolate pie",
      src: "https://s3-alpha-sig.figma.com/img/427b/d879/0cfe56a452f9e94ede1975c8cfba84f0?Expires=1715558400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=iYJQHEI05dbJd4etoJe1UbhboR9A0Yd6q4Tyc3aOWHdzA54hAEPZsPW~TI3oSLECPfMaHn4lvYpJu5FThVRnyPMyIqGdHj84Xqbr-xL5VyWIyaHN2tYZ9eUcA7Q0s0onjl93VlaE2pZ5RCazDddu8D1sdlpdfYUMu2oZFXqQLxLXMzajAj759KFiMc6zIUr7aWP0QtSXRBpUib6sec6FN5gOprrP8CAnqeHEXJO3IdGlBli5OQ96EvM1h5w8EIN7zN38bFBBP8yxFJG6xyPtZund8DD9o2epUdunsDNaxmXHI~BFnKz7i0rw6QG0hjyF6QucE86BgDd5NwPeNM8gQg__",
    },
    {
      title: "coffee with chocolate pie",
      src: "https://s3-alpha-sig.figma.com/img/4cf6/6574/be2f7f2b2147ae10903c38d3cdcedb0b?Expires=1715558400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=OuLBPO01gS9GAS3-PrpxtKCB-rZwKNNZtYOeBLJDaWnNDV13vevmNBj4ZTOmse0dtiHT0M9DDAsRbXrccis1hlpnVuMDFtNMW7vOePTduynZW9RTbCdcLx1EfY9fTdl2rl8RwQ6DsJvDyJelAZZ1LZSxSzbTbrrN37PB14XVOhRAb5WnDvu3MXGDfhnkRl8QovhBRsaXNwSDZgFiAfiNT6GHqWUlr8qxNp85Y-~KYBH~eX7JAQEQJ6AGUtaaes6dLu1FYVLo4LFNsSLLK9wYY16MXNTkuNtNdghYPJovlSLg5oKsmEdN43BFzEsksmWWkkvMDabaY6~R3H5sCZ4yRA__",
    },
  ];
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-[90%] max-sm:w-full"
    >
      <CarouselContent>
        {cuisines.map(({ title, src }, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card className="border-4 border-white">
                <CardContent className="relative flex aspect-square items-center justify-center p-6 ">
                  <Image src={src} alt="" fill className="object-cover" />
                  <span className="absolute bottom-0 z-10 w-full bg-black/20 py-4 text-center text-3xl font-normal uppercase text-white max-md:text-xl max-sm:text-base">
                    {title}
                  </span>
                </CardContent>
              </Card>
            </div>
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
