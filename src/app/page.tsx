import { CateringCarousel } from "@/components/catering-carousel";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { NavDrawer } from "./_components/nav-drawer";

export default async function Home() {
  return (
    <main className="">
      <section className="flex h-screen flex-col items-center justify-center gap-y-3 bg-welcome-banner bg-cover bg-center bg-no-repeat text-center max-md:bg-[10%]">
        <h1 className="text-shadow font-lucida-bold text-7xl italic text-white max-md:text-5xl max-sm:text-3xl">
          Welcome to Gourmet
        </h1>
        <h2 className="text-shadow text-4xl text-gray-50 max-md:text-xl max-sm:w-4/5 max-sm:text-base">
          Where Culinary Excellence Meets Unparalleled Hospitality
        </h2>
      </section>
      <section className="my-24 flex flex-col items-center justify-center">
        <p className="w-[70%] text-center text-lg leading-8 text-muted-foreground ">
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
      <section className="mt-16 flex flex-col items-center">
        <svg
          className="absolute -z-[1]"
          width="100%"
          height="80%"
          viewBox="0 0 1440 546"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 0L720 340L1440 0V546H0V0Z" fill="#FED775" />
        </svg>

        <h2 className="text-4xl font-bold">Catering</h2>

        <p className="mt-2 text-secondary-foreground max-sm:px-6 max-sm:text-center">
          indulge in a symphony of flavors, where every dish is a masterpiece
        </p>
        <div className="mt-16 flex w-full justify-center max-lg:px-20">
          <CateringCarousel />
        </div>
      </section>
      <section className="relative mt-56 flex h-80 bg-contact-us-banner bg-cover bg-center bg-no-repeat py-12">
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
    </main>
  );
}
