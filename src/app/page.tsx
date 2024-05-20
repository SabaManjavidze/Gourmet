import { CateringCarousel } from "@/components/catering-carousel";
import { CuisineCarousel } from "@/components/cuisine-carousel";
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

        <h2 className="text-4xl font-bold">Our CUISINE</h2>

        <p className="mt-2 text-secondary-foreground max-sm:px-6 max-sm:text-center">
          indulge in a symphony of flavors, where every dish is a masterpiece
        </p>
        <div className="mt-16 flex w-full justify-center max-lg:px-20">
          <CuisineCarousel />
        </div>
      </section>
      <section className="mt-28 flex flex-col items-center">
        <h2 className="text-4xl font-bold">CATERING</h2>

        <p className="mt-2 text-secondary-foreground max-sm:px-6 max-sm:text-center">
          indulge in a symphony of flavors, where every dish is a masterpiece
        </p>
        <div className="mt-16 flex w-full justify-center max-lg:px-12">
          <CateringCarousel />
        </div>
      </section>
      <section className="relative mt-28 flex min-h-[660px] w-full items-start justify-center px-28 text-start max-lg:px-10">
        <div className="z-30 w-full text-center max-lg:flex max-lg:h-[500px] max-lg:flex-col max-lg:justify-center lg:block lg:h-auto xl:z-0 xl:w-1/2 xl:text-start">
          <h2 className="lg:text-shadow-lg xl:-text-shadow  text-4xl font-bold text-white xl:text-black">
            ABOUT US
          </h2>

          <p className="text-shadow-lg xl:-text-shadow mt-2 text-gray-100 xl:text-secondary-foreground">
            indulge in a symphony of flavors
          </p>
          <p className="text-shadow-lg xl:-text-shadow mt-5 text-lg leading-8 text-white max-lg:w-full max-lg:text-base xl:w-[90%] xl:text-muted-foreground">
            Welcome to Gourmet, where culinary excellence meets unparalleled
            hospitality. Nestled in the heart of Georgia, our restaurant offers
            a feast for the senses, blending innovative flavors with timeless
            classics.Step into a world of gastronomic delight, where every dish
            tells a story and every bite ignites a culinary adventure. Whether
            you're seeking an intimate dining experience or celebrating a
            special occasion with loved ones, our team is dedicated to creating
            unforgettable moments. Come join us and savor the essence of fine
            dining redefined.
          </p>

          <Button className="mt-8 uppercase" variant={"accent"}>
            Order Now
          </Button>
        </div>
        <div className="absolute flex w-full flex-col items-center lg:-translate-y-12 xl:relative xl:w-1/2 xl:translate-y-0">
          <div
            className="absolute block max-lg:h-[500px] max-lg:w-full max-md:h-[500px] md:translate-x-0 lg:h-[355px] lg:w-[660px] 
          lg:-translate-x-1/4 2lg:h-[425px] 2lg:w-[730px] xl:h-[275px] xl:w-[475px] 2xl:h-[305px] 2xl:w-[505px] "
          >
            <div className="relative h-full w-full">
              <div className="absolute inset-0 z-10 bg-black opacity-20 max-lg:opacity-40"></div>
              <div className="yellow-gradient absolute -bottom-5 right-12 z-0 hidden border-8 xl:block xl:h-[300px] xl:w-[440px] 2xl:h-[330px] 2xl:w-[475px]"></div>
              <Image
                src="https://s3-alpha-sig.figma.com/img/eff2/8777/17b2f70100740228e3d31c5dc27d3ca3?Expires=1715558400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=CN6psR~MAizTR-J45THHTTSoaE86pm2YRp4gqOH6kZXQMiGpX2vIsASy-UhLCYn3hDsNralgzOY6afrGeUYMO9HuMGl29QFy42OM06jTfCFkAD1cCPa9q-M-EjIKlHIcIobBWJPBopO8TjExSVqdwOooD7oZpuzzWwaxg2HXYqP49Z6UgwOtDnZpRfe4LBh6H~Kyp5VY9FkigpBRvFnggL~nh514JVjFRNhzcfYoRWgAAcXQkbHuSgOwTOt9xSh5eAn0SrdAAeaklpcVwhuFVFnCGFNTfwCmAVTtSJcUntLvHyM26t3W-0bAAtNBdSh08UMoaibQbiXKTdyvoRrkgw__"
                alt=""
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div
            className="absolute z-20 translate-x-1/4  translate-y-[20%] md:hidden lg:block lg:h-[355px] lg:w-[660px] 
          2lg:h-[425px] 2lg:w-[730px] xl:h-[275px] xl:w-[475px] xl:translate-y-1/4 2xl:h-[305px] 2xl:w-[505px]"
          >
            <div className="relative h-full w-full">
              <div className="absolute inset-0 z-10 bg-black opacity-20"></div>
              <div className="yellow-gradient absolute -bottom-5 right-12 z-0 hidden border-8 xl:block xl:h-[300px] xl:w-[440px] 2xl:h-[330px] 2xl:w-[475px]"></div>
              <Image
                src="https://s3-alpha-sig.figma.com/img/7d7f/e9d4/d8e5a98945ca56d6f8831c022a29a1e5?Expires=1715558400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=VjdDZhhddtlFntJx8-xVEFBk81OYc3NH0MeXQl7XtvvCAtZZWNHJvzCP~FBAIwDaqA0ulv6sjGfLRg5vMEv6cmuktwjCxoNERriN14ytY4i22h~voj4zftnWGMKfgjeEdKixfLJJ6gU2WyHqYD6os1xeVIQby2YWk78t6Pzh71C9UiaWyn59Tpsnl-OXcdobIBThhhRmGC5oaQbN-UIs5nO6p~Y9YSNT-fErxulYLl60bNgdv26TiJm8V6Vj6dYfeuAS884QZGGUFhGXPvpwznK99DtntTbmE8ci7-257L5448g~jTpZYw-O3MJYvEA-69wKxkCRX9aUdYOCQFIziA__"
                alt=""
                fill
                // className="yellow-gradient border-8 p-4"
              />
            </div>
          </div>
        </div>
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
    </main>
  );
}
