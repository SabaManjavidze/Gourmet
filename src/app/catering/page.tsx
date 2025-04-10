"use client";
import { useEffect, useMemo, useState } from "react";
import { SampleMenuCarousel } from "./_components/sample-menu-carousel";
import { ProductsSection } from "./_components/products-section";
import { CateringProvider } from "@/hooks/useCatering";
import PartnersSlider from "../_components/partners-slider";
import UserReviewsCarousel from "@/components/user-reviews/user-reviews-carousel";
import { FAQSection } from "@/components/faq-section";
export default function Catering() {
  return (
    <main className="min-h-[140vh]">
      <div className="relative flex h-[500px] flex-col items-center justify-center bg-sample-menus bg-cover bg-center bg-no-repeat">
        {/* <div
          className="absolute right-1/2 top-1/2 h-[200px] w-[1000px] -translate-y-1/2 
        translate-x-1/2 rounded-2xl bg-black/25 blur-2xl 
        max-lg:w-[600px] max-md:w-[400px] max-xs:w-[300px]"
        ></div> */}
        <h1
          className="text-outline z-10 text-center font-lucida-bold 
        text-6xl text-primary-foreground max-md:text-5xl max-sm:text-3xl
        "
        >
          აირჩიე, მოირგე, შეუკვეთე
        </h1>
        {/* <p
          className="text-shadow-sm z-10 mt-2 text-center text-xl font-normal 
        text-gray-50 max-sm:text-base max-xs:px-12"
        >
          Select, Customize, and Order Delicious Catering for Any Occasion
        </p> */}
      </div>
      <CateringProvider>
        <div className="mt-16 flex w-full justify-center">
          <SampleMenuCarousel />
        </div>
        <div className="flex w-full flex-col items-center">
          <div className="w-3/4 rounded-xl pb-12 max-xl:w-5/6">
            <ProductsSection />
          </div>
          <div className="mt-0 w-full overflow-hidden">
            <PartnersSlider />
          </div>

          <h2 className="mt-24 text-2xl font-semibold uppercase max-sm:text-center max-sm:text-3xl">
            მომხმარებლების შეფასებები
          </h2>
          <div className="mt-12 flex w-full flex-col items-center justify-center max-md:px-2">
            <UserReviewsCarousel />
          </div>

          <h2 className="mt-24 text-2xl font-semibold uppercase max-sm:text-center max-sm:text-3xl">
            ხშირად დასმული კითხვები
          </h2>
          <div className="mt-12 flex w-full flex-col items-center justify-center max-md:px-2">
            <FAQSection />
          </div>
        </div>
      </CateringProvider>
    </main>
  );
}
