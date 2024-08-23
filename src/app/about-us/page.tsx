"use client";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

export default function AboutUsPage() {
  const { data: session } = useSession();

  return (
    <div className="*:mt-20">
      <section
        className="relative !mt-0 flex h-[70vh] flex-col items-center justify-center gap-y-3 
      bg-about-us-banner bg-cover bg-center bg-no-repeat text-center max-md:bg-[10%]"
      >
        <div className="absolute inset-0 bg-black/10" />
        <div
          className="absolute right-1/2 top-1/2 h-[300px] w-[1050px]  -translate-y-1/2 translate-x-1/2 rounded-[70px] 
          bg-vignete opacity-50 blur-3xl max-lg:w-[600px] max-md:w-[400px] max-sm:w-[250px]"
        ></div>
        <h1 className="text-outline z-10 font-lucida-bold text-6xl italic text-white max-md:text-5xl max-sm:text-3xl">
          About Us
        </h1>
        <h2 className="z-10 text-2xl text-primary-foreground max-md:text-xl max-sm:w-4/5 max-sm:text-base">
          Select, Customize, And Order Delicious Catering For Any Occasion
        </h2>
      </section>
      <section className="flex flex-col items-center">
        <h2 className="text-4xl font-bold">What We Offer</h2>
        <div
          className="flex h-[430px] items-center justify-center px-24 *:flex-1 max-lg:px-16
        max-md:mt-8 max-md:h-[500px] max-md:flex-col max-md:px-5 max-sm:h-[600px] max-xs:h-[800px]"
        >
          {/* hidden on mobile */}
          <div
            className="h-full w-full bg-video1 bg-contain bg-center bg-no-repeat
          max-md:hidden"
          ></div>
          <div className="flex !flex-[2] flex-col items-center gap-y-3 max-md:!flex-1">
            <p
              className="px-20 text-center text-xl leading-10 text-muted-foreground 
            max-2xl:leading-8 max-xl:px-16 max-xl:text-lg max-lg:px-12 max-lg:text-base
            "
            >
              Lorem ipsum dolor sit amet, consectetur adipi scing elit. Etiam eu
              turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus
              nec fringilla accumsan, risus sem sollicitudin lacus, utinterdum
              tellus elit sed risus. Maecenas eget condimentum velit, sit amet
              feugiat lectus. Class aptent taciti sociosqu Maecenas eget
              condimentum velit, sit amet feugiat lectus. Classaptent taciti
              sociosqu
            </p>

            <Button
              className="mt-8 px-4 uppercase max-md:mt-3"
              size={"lg"}
              variant={"accent"}
            >
              order now
            </Button>
          </div>
          <div className="flex h-full w-full">
            <div
              className="h-full w-full bg-video1 bg-contain bg-center bg-no-repeat
          md:hidden"
            ></div>
            <div
              className="h-full w-full bg-video2 bg-contain bg-center bg-no-repeat
            max-xs:hidden"
            ></div>
          </div>
        </div>
      </section>
      <section className="flex flex-col items-center">
        <div
          className="mt-10 flex h-[500px] w-full items-center 
        justify-center px-10 max-xl:flex-col max-lg:h-[700px] max-md:h-[800px]"
        >
          <div className="flex h-full w-full justify-center">
            <div className="flex h-full justify-center *:mr-14 max-xl:flex-col *:max-md:mr-0">
              <div
                className="h-full w-full bg-round-dish1 bg-contain bg-top bg-no-repeat
            max-xl:w-3/4 max-md:w-full max-md:bg-center"
              ></div>
              <p
                className="menu-title-gradient w-72 text-left text-4xl font-bold 
            leading-[55px] max-xl:text-3xl max-xl:leading-[58px] max-lg:h-full
            max-md:h-auto max-md:text-center max-md:text-2xl"
              >
                Make a wish & you will get the dish..!
              </p>
            </div>
            <div
              className="h-full w-full bg-video2 bg-contain bg-center 
          bg-no-repeat max-lg:hidden"
            ></div>
            <div
              className="flex h-full justify-center *:ml-14 max-xl:flex-col 
            max-lg:items-center max-md:hidden max-md:flex-col-reverse *:max-md:ml-0"
            >
              <p
                className="menu-title-gradient w-72 text-left text-4xl font-bold 
            leading-[55px] max-xl:text-3xl max-xl:leading-[58px] max-md:text-center
            max-md:text-2xl"
              >
                Get the delicious food on your tables
              </p>
              <div
                className="h-full w-full bg-round-dish2 bg-contain bg-bottom 
            bg-no-repeat max-xl:w-3/4 max-lg:bg-top max-md:w-full max-md:bg-center"
              ></div>
            </div>
          </div>
          <div
            className="h-full w-full bg-video2 bg-contain bg-center 
          bg-no-repeat max-lg:mt-10 lg:hidden"
          ></div>
        </div>
      </section>
      <section
        className="flex items-center justify-center gap-x-10 px-24 
      *:w-full max-md:flex-col max-sm:px-12"
      >
        <div className="flex flex-col items-start justify-center">
          <h2 className="text-3xl font-bold max-xl:text-2xl max-lg:text-xl">
            Avail Our Services For All Kind Of Events
          </h2>
          <p
            className="mt-6 text-left text-xl leading-10 text-muted-foreground
          max-xl:text-lg max-lg:text-base"
          >
            Lorem ipsum dolor sit amet, consectetur adipi scing elit. Etiam eu
            turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus
            nec fringilla accumsan, risus sem sollicitudin lacus, utinterdum
            tellus elit sed risus. Maecenas eget condimentum velit, sit amet
            feugiat lectus. Class aptent taciti sociosqu Maecenas eget
            condimentum velit, sit amet feugiat lectus. Classaptent taciti
            sociosqu
          </p>
          <Button
            className="mt-8 px-4 uppercase"
            size={"lg"}
            variant={"accent"}
          >
            order now
          </Button>
        </div>
        <div
          className="flex h-[500px] w-full items-center justify-center bg-date bg-contain 
        bg-center bg-no-repeat max-md:h-[300px] max-md:bg-top"
        ></div>
      </section>
      <section
        className="max-lg:8 relative mx-32 flex h-[470px] bg-dishes-banner 
      bg-cover bg-center bg-no-repeat py-12 max-xl:mx-12 max-md:mx-0"
      >
        <div className="absolute inset-12 bg-black opacity-20"></div>
        <div
          className="z-10 flex h-full w-full flex-col items-center 
        justify-center px-40 max-md:px-20"
        >
          <h2
            className="text-shadow text-center text-4xl font-normal tracking-wide
          text-white underline underline-offset-2 max-xl:text-2xl max-lg:text-xl"
          >
            Select The Menu Of Your Choice
          </h2>

          <p
            className="text-shadow mt-8 text-center text-lg text-white
          max-2xl:leading-8 max-xl:text-lg max-lg:text-base max-sm:text-xs"
          >
            Lorem ipsum dolor sit amet, consectetur adipi scing elit. Etiam eu
            turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus
            nec fringilla accumsan, risus sem sollicitudin lacus, utinterdum
            tellus elit sed risus. Maecenas eget condimentum velit, sit amet
            feugiat lectus. Class aptent taciti sociosqu Maecenas eget
            condimentum velit, sit amet feugiat lectus. Classaptent taciti
            sociosqu
          </p>

          <Button
            className="mt-8 border border-white text-lg uppercase"
            variant={"accent"}
          >
            order now
          </Button>
        </div>
      </section>
    </div>
  );
}
