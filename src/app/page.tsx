import { CateringCarousel } from "@/components/catering-carousel";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { NavDrawer } from "./_components/nav-drawer";
import UserReviewsMarquee from "@/components/user-reviews/user-reviews-marquee";

export default async function Home() {
  return (
    <main className="*:mt-20">
      <section className="relative !mt-0 flex h-[70vh] flex-col items-center justify-center gap-y-3 bg-welcome-banner bg-cover bg-center bg-no-repeat text-center max-md:bg-[10%]">
        <div className="absolute inset-0 bg-black/10" />
        <div
          className="bg-vignete absolute right-1/2
         top-1/2 h-[300px] w-[1050px] -translate-y-1/2 translate-x-1/2  rounded-[70px] opacity-50 blur-3xl"
        ></div>
        <h1 className="z-10 font-lucida-bold text-7xl italic text-white max-md:text-5xl max-sm:text-3xl">
          Welcome to Gourmet
        </h1>
        <h2 className="text-shadow z-10 text-2xl italic text-gray-200 max-md:text-xl max-sm:w-4/5 max-sm:text-base">
          Where Culinary Excellence Meets Unparalleled Hospitality
        </h2>
      </section>
      <section className="flex flex-col items-center bg-rectangle bg-cover bg-center bg-no-repeat">
        <h2 className="text-4xl font-bold uppercase">Catering</h2>

        <p className="mt-2 text-secondary-foreground max-sm:px-6 max-sm:text-center">
          indulge in a symphony of flavors, where every dish is a masterpiece
        </p>
        <div className="flex w-full justify-center max-lg:px-20">
          <CateringCarousel />
        </div>
      </section>
      <section className="flex flex-col items-center justify-center">
        <h2 className="text-4xl font-bold uppercase max-md:text-xl max-sm:w-4/5 max-sm:text-base">
          about us
        </h2>
        <p className="mt-5 w-[70%] text-center text-lg leading-8 text-muted-foreground ">
          Welcome to Gourmet, where culinary excellence meets unparalleled
          hospitality. Nestled in the heart of Georgia, our restaurant offers a
          feast for the senses, blending innovative flavors with timeless
          classics. Step into a world of gastronomic delight, where every dish
          tells a story and every bite ignites a culinary adventure. Whether
          you're seeking an intimate dining experience or celebrating a special
          occasion with loved ones, our team is dedicated to creating
          unforgettable moments. Come join us and savor the essence of fine
          dining redefined.
        </p>
        <Button className="mt-8 uppercase" variant={"accent"}>
          Read More
        </Button>
      </section>

      <section className="relative flex h-80 bg-contact-us-banner bg-cover bg-center bg-no-repeat py-12">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="z-10 flex h-full w-full flex-col items-center justify-center">
          <h2 className="text-shadow text-4xl font-semibold text-white">
            CONTACT US
          </h2>

          <p className="text-shadow mt-1 text-lg text-white">
            indulge in a symphony of flavors
          </p>

          <Button className="mt-8 text-lg uppercase" variant={"accent"}>
            Contact Now
          </Button>
        </div>
      </section>
      <section>
        <UserReviewsMarquee />
      </section>
    </main>
  );
}
