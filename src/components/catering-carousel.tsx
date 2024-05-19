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
import Image from "next/image";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";

export function CateringCarousel() {
  const cuisines = [
    {
      title: "cream pie",
      src: "https://s3-alpha-sig.figma.com/img/9866/959e/5c220717bb92206c49c0b3e0064078fa?Expires=1715558400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=pUzDVwIm7Qi5yMXFRD2t7gRacBoQ9YnRr1fT8auF6pxreyvlj7jFlriY9OJCYc79a~l7Ev34lTwsH62XZEX6mp6Xwg3OYn~2vGmnAwZGhx3UreerB9bNosdKVjB3YvcCjAWppaohP0wveH1uDUlYE3UbOBRcwXwpp08O9Wa-tBYh5DYhRxs6KwNIV4oj9hSEKuNKU0X908KnvqBQZpedIBAPgFHv2zF62z3XAfE5Fv4mQfFS8s6VA7ga32Let~39d4LCsj3yC5juMpO8iV~U1KiDcvH79D-YNNn0bCm-dMPwY4tGJq7FM2~cDUBSlYS~a1k3l6FYNxCTWE0JkiKeQw__",
      price: "10.00",
    },
    {
      title: "cream pie",
      src: "https://s3-alpha-sig.figma.com/img/9866/959e/5c220717bb92206c49c0b3e0064078fa?Expires=1715558400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=pUzDVwIm7Qi5yMXFRD2t7gRacBoQ9YnRr1fT8auF6pxreyvlj7jFlriY9OJCYc79a~l7Ev34lTwsH62XZEX6mp6Xwg3OYn~2vGmnAwZGhx3UreerB9bNosdKVjB3YvcCjAWppaohP0wveH1uDUlYE3UbOBRcwXwpp08O9Wa-tBYh5DYhRxs6KwNIV4oj9hSEKuNKU0X908KnvqBQZpedIBAPgFHv2zF62z3XAfE5Fv4mQfFS8s6VA7ga32Let~39d4LCsj3yC5juMpO8iV~U1KiDcvH79D-YNNn0bCm-dMPwY4tGJq7FM2~cDUBSlYS~a1k3l6FYNxCTWE0JkiKeQw__",
      price: "10.00",
    },
    {
      title: "cream pie",
      src: "https://s3-alpha-sig.figma.com/img/9866/959e/5c220717bb92206c49c0b3e0064078fa?Expires=1715558400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=pUzDVwIm7Qi5yMXFRD2t7gRacBoQ9YnRr1fT8auF6pxreyvlj7jFlriY9OJCYc79a~l7Ev34lTwsH62XZEX6mp6Xwg3OYn~2vGmnAwZGhx3UreerB9bNosdKVjB3YvcCjAWppaohP0wveH1uDUlYE3UbOBRcwXwpp08O9Wa-tBYh5DYhRxs6KwNIV4oj9hSEKuNKU0X908KnvqBQZpedIBAPgFHv2zF62z3XAfE5Fv4mQfFS8s6VA7ga32Let~39d4LCsj3yC5juMpO8iV~U1KiDcvH79D-YNNn0bCm-dMPwY4tGJq7FM2~cDUBSlYS~a1k3l6FYNxCTWE0JkiKeQw__",
      price: "10.00",
    },
    {
      title: "cream pie",
      src: "https://s3-alpha-sig.figma.com/img/9866/959e/5c220717bb92206c49c0b3e0064078fa?Expires=1715558400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=pUzDVwIm7Qi5yMXFRD2t7gRacBoQ9YnRr1fT8auF6pxreyvlj7jFlriY9OJCYc79a~l7Ev34lTwsH62XZEX6mp6Xwg3OYn~2vGmnAwZGhx3UreerB9bNosdKVjB3YvcCjAWppaohP0wveH1uDUlYE3UbOBRcwXwpp08O9Wa-tBYh5DYhRxs6KwNIV4oj9hSEKuNKU0X908KnvqBQZpedIBAPgFHv2zF62z3XAfE5Fv4mQfFS8s6VA7ga32Let~39d4LCsj3yC5juMpO8iV~U1KiDcvH79D-YNNn0bCm-dMPwY4tGJq7FM2~cDUBSlYS~a1k3l6FYNxCTWE0JkiKeQw__",
      price: "10.00",
    },
    {
      title: "cream pie",
      src: "https://s3-alpha-sig.figma.com/img/9866/959e/5c220717bb92206c49c0b3e0064078fa?Expires=1715558400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=pUzDVwIm7Qi5yMXFRD2t7gRacBoQ9YnRr1fT8auF6pxreyvlj7jFlriY9OJCYc79a~l7Ev34lTwsH62XZEX6mp6Xwg3OYn~2vGmnAwZGhx3UreerB9bNosdKVjB3YvcCjAWppaohP0wveH1uDUlYE3UbOBRcwXwpp08O9Wa-tBYh5DYhRxs6KwNIV4oj9hSEKuNKU0X908KnvqBQZpedIBAPgFHv2zF62z3XAfE5Fv4mQfFS8s6VA7ga32Let~39d4LCsj3yC5juMpO8iV~U1KiDcvH79D-YNNn0bCm-dMPwY4tGJq7FM2~cDUBSlYS~a1k3l6FYNxCTWE0JkiKeQw__",
      price: "10.00",
    },
  ];
  return (
    <Carousel
      opts={{
        align: "center",
        loop: true,
      }}
      className="w-[90%]"
    >
      <CarouselContent>
        {cuisines.map(({ title, src, price }, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
            <div className="p-1">
              <Card className="border-4 border-brown">
                <CardContent className="relative flex aspect-square items-center justify-center p-6 ">
                  <Image src={src} alt="" fill className="object-cover" />
                  <span className="absolute bottom-0 z-10 w-full bg-yellow-50/60 py-4 text-center text-3xl font-normal uppercase text-white">
                    <p className="font-semibold text-black">{title}</p>
                    <p className="font-semibold text-red-900">${price}</p>
                    <Button variant={"secondary"} className="mt-4 px-3">
                      <ShoppingCart className="mr-2" />
                      ADD TO CART
                    </Button>
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
