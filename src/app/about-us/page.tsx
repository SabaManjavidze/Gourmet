"use client";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

export default function AboutUsPage() {
  const { data: session } = useSession();

  return (
    <div className="*:mt-20">
      <section
        className="bg-about-us-banner relative !mt-0 flex h-[70vh] flex-col items-center justify-center 
      gap-y-3 bg-cover bg-center bg-no-repeat text-center max-md:bg-[10%]"
      >
        <div className="absolute inset-0 bg-black/10" />
        <div
          className="absolute right-1/2 top-1/2 h-[300px] w-[1050px]  -translate-y-1/2 translate-x-1/2 rounded-[70px] 
          bg-vignete opacity-50 blur-3xl max-lg:w-[600px] max-md:w-[400px]"
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

        <div className="flex h-[430px] items-center justify-center px-24 *:flex-1">
          <div className="bg-video1 h-full w-full bg-contain bg-no-repeat"></div>
          <div className="flex !flex-[2] flex-col items-center gap-y-3">
            <p className="px-20 text-center text-xl leading-10 text-muted-foreground">
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
          <div className="bg-video2 h-full w-full bg-contain bg-no-repeat"></div>
        </div>
      </section>
      <section className="flex flex-col items-center">
        <div className="mt-10 flex h-[500px] w-full items-center justify-center px-10">
          <div className="flex h-full w-full justify-center *:mr-14">
            <div className="bg-round-dish1 h-full w-full bg-contain bg-top bg-no-repeat"></div>
            <p className="menu-title-gradient w-72 text-left text-4xl font-bold leading-[55px]">
              Make a wish & you will get the dish..!
            </p>
          </div>
          <div className="bg-video2 h-full w-full bg-contain bg-center bg-no-repeat"></div>
          <div className="flex h-full w-full justify-center *:ml-14">
            <p className="menu-title-gradient w-72 text-left text-4xl font-bold leading-[55px]">
              Get the delicious food on your tables
            </p>
            <div className="bg-round-dish2 h-full w-full bg-contain bg-bottom bg-no-repeat"></div>
          </div>
        </div>
      </section>
      <section className="flex items-center justify-center px-24 *:flex-1">
        <div className="flex flex-col items-start justify-center">
          <h2 className="text-3xl font-bold">
            Avail Our Services For All Kind Of Events
          </h2>
          <p className="mt-6 text-left text-xl leading-10 text-muted-foreground">
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
          className="bg-date flex h-[500px] w-full items-center justify-center 
        bg-contain bg-center bg-no-repeat"
        ></div>
      </section>
      <section className="bg-dishes-banner relative mx-32 flex h-[470px] bg-cover bg-center bg-no-repeat py-12">
        <div className="absolute inset-12 bg-black opacity-20"></div>
        <div className="z-10 flex h-full w-full flex-col items-center justify-center px-40">
          <h2 className="text-shadow text-4xl font-normal tracking-wide text-white underline underline-offset-2">
            Select The Menu Of Your Choice
          </h2>

          <p className="text-shadow mt-8 text-center text-lg text-white">
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
