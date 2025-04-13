import { CateringCarousel } from "@/components/catering-carousel";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { NavDrawer } from "./_components/nav-drawer";
import UserReviewsCarousel from "@/components/user-reviews/user-reviews-carousel";
import { useMemo } from "react";
import { FAQSection } from "@/components/faq-section";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("HomePage");
  const g = useTranslations("General");
  return (
    <main className="*:mt-20">
      <section className="relative !mt-0 flex h-[70vh] flex-col items-center justify-center gap-y-3 bg-welcome-banner bg-cover bg-center bg-no-repeat text-center max-md:bg-[10%]">
        <div className="absolute inset-0 bg-black/10" />
        {/* <div */}
        {/*   className="absolute right-1/2 top-1/2 */}
        {/*  h-[300px] w-[1050px] -translate-y-1/2 translate-x-1/2 rounded-[70px] bg-vignete opacity-50  */}
        {/*  blur-3xl max-lg:w-[600px] max-md:w-[400px] max-xs:w-[300px]" */}
        {/* ></div> */}
        <h1
          className="text-shadow z-10 font-lucida-bold text-7xl italic 
        text-white max-md:text-5xl max-sm:text-4xl"
        >
          {t("title")}
        </h1>
        {/* <h2 className="text-shadow z-10 text-2xl italic text-gray-200 max-md:text-xl max-sm:w-4/5 max-sm:text-base">
          Where Culinary Excellence Meets Unparalleled Hospitality
        </h2> */}
      </section>
      <section className="flex flex-col items-center bg-cover bg-center bg-no-repeat">
        <h2 className="text-4xl font-bold uppercase">{t("fourshet")}</h2>
        <p
          className="mt-4 text-lg text-muted-foreground max-sm:px-6
        max-sm:text-center"
        >
          {t("fourshet_sub")}
        </p>
        <div
          className="flex w-full justify-center bg-rectangle bg-cover bg-center bg-no-repeat 
        max-lg:px-20 max-sm:px-16"
        >
          <CateringCarousel />
        </div>
      </section>
      <section className="flex flex-col items-center justify-center">
        <h2 className="text-4xl font-bold uppercase max-md:text-xl max-sm:w-4/5 ">
          {g("about_us")}
          {/* about us */}
        </h2>
        <p
          className="mt-5 w-[70%] text-center text-lg leading-8 text-muted-foreground
        max-sm:text-left "
        >
          {t("about_us_sub")}
          {/* Welcome to Gourmet, where culinary excellence meets unparalleled
          hospitality. Nestled in the heart of Georgia, our restaurant offers a
          feast for the senses, blending innovative flavors with timeless
          classics. Step into a world of gastronomic delight, where every dish
          tells a story and every bite ignites a culinary adventure. Whether
          you're seeking an intimate dining experience or celebrating a special
          occasion with loved ones, our team is dedicated to creating
          unforgettable moments. Come join us and savor the essence of fine
          dining redefined. */}
        </p>
        <Link href="/about-us">
          <Button className="mt-8 uppercase" variant={"accent"}>
            {g("see full")}
          </Button>
        </Link>
      </section>

      <section className="relative flex h-80 bg-contact-us-banner bg-cover bg-center bg-no-repeat py-12">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="z-10 flex h-full w-full flex-col items-center justify-center">
          <h2 className="text-shadow text-4xl font-semibold text-white max-sm:text-center max-sm:text-2xl">
            {t("contact_socmedia")}
          </h2>
          <Link href="#footer" scroll={true}>
            <Button className="mt-8 text-lg uppercase" variant={"accent"}>
              {g("contact us")}
            </Button>
          </Link>
        </div>
      </section>
      {/* <section className="flex flex-col items-center justify-center">
        <h2 className="text-4xl font-semibold uppercase max-sm:text-center max-sm:text-3xl">
          {g("user reviews")}
        </h2>
        <div className="mt-12 flex w-full flex-col items-center justify-center max-md:px-2">
          <UserReviewsCarousel />
        </div>
      </section> */}
      <section className="flex flex-col items-center justify-center">
        <h2 className="text-4xl font-semibold uppercase max-sm:text-center max-sm:text-3xl">
          {g("faq")}
        </h2>
        <div className="mt-12 flex w-full flex-col items-center justify-center max-md:px-2">
          <FAQSection />
        </div>
      </section>
    </main>
  );
}
