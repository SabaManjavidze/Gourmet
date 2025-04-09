"use client";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import React, { Suspense, useEffect, useState } from "react";
import { Video } from "../_components/video";
import PartnersSlider from "../_components/partners-slider";
import Link from "next/link";

export default function AboutUsPage() {
  // const { data: session } = useSession();

  return (
    <div className="*:mt-20">
      <section
        className="relative !mt-0 flex h-[70vh] flex-col items-center justify-center gap-y-3 
      bg-about-us-banner bg-cover bg-center bg-no-repeat text-center max-md:bg-[10%]"
      >
        <div className="absolute inset-0 bg-black/10" />
        {/* <div
          className="absolute right-1/2 top-1/2 h-[300px] w-[1050px]  -translate-y-1/2 translate-x-1/2 rounded-[70px] 
          bg-vignete opacity-50 blur-3xl max-lg:w-[600px] max-md:w-[400px] max-sm:w-[250px]"
        ></div> */}
        <h1
          className="text-outline z-10 font-lucida-bold text-6xl italic 
        text-white max-md:text-5xl max-sm:text-3xl"
        >
          ჩვენს შესახებ
        </h1>
        {/* <h2 className="z-10 text-2xl text-primary-foreground max-md:text-xl max-sm:w-4/5 max-sm:text-base">
          Select, Customize, And Order Delicious Catering For Any Occasion
        </h2> */}
      </section>
      <section className="flex flex-col items-center max-md:mt-10">
        {/* <h2 className="text-4xl font-bold">What We Offer</h2> */}
        <div
          className="flex h-[430px] items-center justify-center px-24 *:flex-1 
        max-lg:px-16 max-md:mt-8 max-md:h-[500px] max-md:flex-col max-md:px-5 max-sm:h-[800px] max-xs:h-[800px]"
        >
          {/* hidden on mobile */}
          <div
            className="h-full w-full bg-about-us-1 bg-cover bg-center bg-no-repeat
          max-md:hidden"
          ></div>
          <div className="flex !flex-[2] flex-col items-center gap-y-3 max-md:!flex-1">
            <p
              className="mt-12 h-96 overflow-y-scroll px-20 text-center text-xl leading-10 
            text-muted-sm max-2xl:leading-8 max-xl:mx-16 max-xl:text-lg 
            max-lg:mx-6 max-lg:text-base max-md:mx-0 max-md:mt-0 max-md:h-auto max-sm:px-12
            "
            >
              “გურმე” არის კაფე საკონდიტრო რომელიც საქართველოს ბაზარზე 2012
              წლიდან ოპერირებს და მომხმარებელს სრულყოფილ სერვისს სთავაზობს. ჩვენ
              დაარსების დღიდან უმაღლესი ხარისხის ნედლეულით დამზადებულ უგემრიელს
              პროდუქციას ვთავაზობთ ჩვენს მომხმარებელს, ასევე ვთავაზობთ
              ქეითერინგის სერვის რომელიც თქვენს სტუმრებს არ დაავიწყდებათ. ამ
              დროისთვის, კომპანია ფლობს დიდ საწარმოს მირიან მეფის 70-ში, ასევე,
              სტუმრებს თბილისის მასშტაბით მასპინძლობს “გურმეს” არაერთი კაფე.
            </p>

            <Link href="/catering">
              <Button
                className="mt-8 px-4 uppercase max-md:mt-3"
                size={"lg"}
                variant={"accent"}
              >
                შეუკვეთე
              </Button>
            </Link>
          </div>
          <div className="flex h-full w-full max-md:mt-5">
            <div
              className="h-full w-full bg-about-us-1 bg-cover bg-center bg-no-repeat
          md:hidden"
            ></div>
            <div
              className="h-full w-full bg-about-us-2 bg-cover bg-center bg-no-repeat
            max-xs:hidden"
            ></div>
          </div>
        </div>
      </section>
      <section className="flex flex-col items-center">
        <div
          className="mt-10 flex h-[500px] w-full items-center justify-center 
        px-10 max-xl:flex-col max-lg:h-[700px] max-md:h-[550px] max-sm:h-[850px]"
        >
          <div className="flex h-full w-full justify-between max-sm:flex-col max-sm:items-center max-sm:justify-center">
            <div className="*:mr-13 flex h-full justify-center max-xl:flex-col *:max-md:mr-0">
              <div
                className="h-full w-full bg-round-dish1 bg-contain bg-top bg-no-repeat
            max-xl:w-3/4 max-md:w-full max-md:bg-center max-sm:h-72"
              ></div>
              <p
                className="menu-title-gradient flex w-full items-end text-left 
            text-4xl font-bold leading-[55px] max-xl:text-3xl
            max-xl:leading-[58px] max-lg:h-full max-md:h-auto max-md:text-center max-md:text-2xl"
              >
                სივრცე გემრიელი
              </p>
            </div>
            <div className="max-sm:mt-5">
              {/* <Suspense fallback={<p>Loading video...</p>}> */}
              <Video src="/videos/1.mp4" />
              {/* </Suspense> */}
            </div>
            <div
              className="flex h-full justify-center *:ml-14 max-xl:flex-col 
            max-lg:items-center max-md:hidden max-md:flex-col-reverse *:max-md:ml-0"
            >
              <p
                className="menu-title-gradient w-full text-left text-4xl font-bold 
            leading-[55px] max-xl:text-3xl max-xl:leading-[58px] max-md:text-center
            max-md:text-2xl"
              >
                სივრცე გემრიელი
              </p>
              <div
                className="h-full w-full bg-round-dish2 bg-contain bg-bottom 
            bg-no-repeat max-xl:w-3/4 max-lg:bg-top max-md:w-full max-md:bg-center"
              ></div>
            </div>
          </div>
          {/* <div
            className="bg-about-us-2 h-full w-full bg-contain bg-center 
          bg-no-repeat max-lg:mt-10 lg:hidden"
          ></div> */}
        </div>
      </section>
      <section
        className="flex items-center justify-center gap-x-10 px-24 
      *:w-full max-md:flex-col max-sm:px-6"
      >
        <div className="flex flex-col items-start justify-center">
          <h2
            className="text-3xl font-bold max-xl:text-2xl max-lg:text-xl
          max-md:text-center"
          >
            ISO სერთიფიცირებული
          </h2>
          <p
            className="mt-6 h-72 overflow-y-scroll text-left text-lg
          leading-10 text-muted-foreground max-xl:text-lg max-lg:text-base
          max-md:text-center"
          >
            აუდიტის შედეგად, „გურმემ“ ISO 22000:2018 საერთაშორისო სერტიფიკატი
            აიღო. სერტიფიკატის გაცემამდე, პოლონური აუდიტორული კომპანია Grand
            Cert რამდენიმე თვის განმავლობაში ატარებდა შემოწმებას. სერტიფიკატის
            მიღებამდე კომპანიაში შემოწმდა ყველა დეტალი - შენობა-ნაგებობა,
            დანადგარები, ტექნოლოგიური პროცესები და ა.შ. „გურმეს“ გუნდმა
            გაითვალისწინა ყველა ის პირობა, რომელსაც ISO სერტიფიკატის მქონე
            კომპანია უნდა აკმაყოფილებდეს. სპეციალურად შეირჩა პროდუქციის ყველა
            მომწოდებელი, კონტროლდებოდა პროდუქტების ხარისხი და სერთიფიკატები. ISO
            22000:2018 სერტიფიკატი კონკრეტულად კვებით-სამრეწველო მიმართულებას
            ეხება. აღნიშნული სერტიფიკატი მომხმარებლისთვის გარანტიაა, რომ
            კომპანიაში წარმოებული პროდუქცია და მომსახურება არის მაღალი ხარისხის
            და ჯანმრთელობისთვის უსაფრთხო.
          </p>
          <Link href="/catering">
            <Button
              className="mt-8 px-4 uppercase"
              size={"lg"}
              variant={"accent"}
            >
              შეუკვეთე
            </Button>
          </Link>
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
        <div className="absolute inset-12 bg-black opacity-20 max-sm:inset-3"></div>
        <div
          className="z-10 flex h-full w-full flex-col items-center 
        justify-center px-40 max-md:px-20 max-sm:px-5"
        >
          <h2
            className="text-shadow text-center text-4xl font-normal tracking-wide
          text-white underline underline-offset-2 max-xl:text-2xl max-lg:text-xl"
          >
            აირჩიეთ მენიუ
          </h2>

          {/* <p
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
          </p> */}
          <Link href="/catering">
            <Button
              className="mt-8 border border-white text-lg uppercase"
              variant={"accent"}
            >
              შეუკვეთე
            </Button>
          </Link>
        </div>
      </section>
      <PartnersSlider />
    </div>
  );
}
