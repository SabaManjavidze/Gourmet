"use client";
import { useEffect, useMemo, useState } from "react";
import { SampleMenuCarousel } from "./_components/sample-menu-carousel";
import { ProductsSection } from "./_components/products-section";
import { CateringProvider } from "@/hooks/useCatering";
import PartnersSlider from "../_components/partners-slider";
import UserReviewsCarousel from "@/components/user-reviews/user-reviews-carousel";
import { FAQSection } from "@/components/faq-section";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import setLanguage from "@/actions/set-language";
import { locales } from "@/i18n/config";
import DiscountModal from "../_components/discount-modal";
import { useSession } from "next-auth/react";
export default function Catering() {
  const t = useTranslations("CateringPage");
  const g = useTranslations("General");
  const searchParams = useSearchParams();
  const [discountOpen, setDiscountOpen] = useState(false);
  const session = useSession();

  const discountSeen = useMemo(() => {
    const t = localStorage.getItem("discount");
    if (t) {
      return t == "true";
    }
    return false;
  }, [discountOpen]);

  useEffect(() => {
    const lang = searchParams.get("lang");
    if (lang == "ge" || lang == "en") {
      setLanguage(lang);
    }

    setTimeout(() => {
      setDiscountOpen(true);
    }, 3000);
  }, []);

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
          {t("title")}
        </h1>
        {/* <p
          className="text-shadow-sm z-10 mt-2 text-center text-xl font-normal 
        text-gray-50 max-sm:text-base max-xs:px-12"
        >
          Select, Customize, and Order Delicious Catering for Any Occasion
        </p> */}
      </div>
      {session?.status !== "authenticated" && !discountSeen ? (
        <DiscountModal
          modalOpen={discountOpen}
          closeModal={() => setDiscountOpen(false)}
        />
      ) : null}
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

          {/* <h2 className="mt-24 text-2xl font-semibold uppercase max-sm:text-center max-sm:text-3xl">
            {g("user reviews")}
          </h2>
          <div className="mt-12 flex w-full flex-col items-center justify-center max-md:px-2">
            <UserReviewsCarousel />
          </div> */}

          <h2 className="mt-24 text-2xl font-semibold uppercase max-sm:text-center max-sm:text-3xl">
            {g("faq")}
          </h2>
          <div className="mt-12 flex w-full flex-col items-center justify-center max-md:px-2">
            <FAQSection />
          </div>
        </div>
      </CateringProvider>
    </main>
  );
}
