import { CateringCarousel } from "@/components/catering-carousel";
import { CuisineCarousel } from "@/components/cuisine-carousel";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  return (
    <main className="">
      <section className="bg-welcome-banner flex h-screen flex-col items-center justify-center gap-y-3 bg-cover bg-center bg-no-repeat text-center">
        <h1 className="font-lucida-rg text-shadow text-6xl italic text-white">
          Welcome to Gourmet
        </h1>
        <h2 className="text-shadow text-4xl text-white">
          Where Culinary Excellence Meets Unparalleled Hospitality
        </h2>
      </section>
      <section className="my-24 flex flex-col items-center justify-center">
        <p className="text-muted-foreground w-[70%] text-center text-lg leading-8 ">
          Welcome to Gourmet, where culinary excellence meets unparalleled
          hospitality. Nestled in the heart of Georgia, our restaurant offers a
          feast for the senses, blending innovative flavors with timeless
          classics.Step into a world of gastronomic delight, where every dish
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

        <p className="text-secondary-foreground mt-2">
          indulge in a symphony of flavors, where every dish is a masterpiece
        </p>
        <div className="mt-16 flex w-full justify-center">
          <CuisineCarousel />
        </div>
      </section>
      <section className="mt-28 flex flex-col items-center">
        <h2 className="text-4xl font-bold">CATERING</h2>

        <p className="text-secondary-foreground mt-2">
          indulge in a symphony of flavors, where every dish is a masterpiece
        </p>
        <div className="mt-16 flex w-full justify-center">
          <CateringCarousel />
        </div>
      </section>
      <section className="mt-28 flex min-h-[660px] items-start justify-center px-20 text-start">
        <div className="w-1/2">
          <h2 className="text-4xl font-bold">ABOUT US</h2>

          <p className="text-secondary-foreground mt-2">
            indulge in a symphony of flavors
          </p>
          <p className="text-muted-foreground mt-5 w-[90%] text-lg leading-8">
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
        <div className="relative flex w-1/2 flex-col items-center">
          <div className="absolute h-[395px] w-[595px]">
            <div className="yellow-gradient absolute -bottom-5 right-12 z-0 h-[420px] w-[555px] border-8"></div>
            <Image
              src="https://s3-alpha-sig.figma.com/img/eff2/8777/17b2f70100740228e3d31c5dc27d3ca3?Expires=1715558400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=CN6psR~MAizTR-J45THHTTSoaE86pm2YRp4gqOH6kZXQMiGpX2vIsASy-UhLCYn3hDsNralgzOY6afrGeUYMO9HuMGl29QFy42OM06jTfCFkAD1cCPa9q-M-EjIKlHIcIobBWJPBopO8TjExSVqdwOooD7oZpuzzWwaxg2HXYqP49Z6UgwOtDnZpRfe4LBh6H~Kyp5VY9FkigpBRvFnggL~nh514JVjFRNhzcfYoRWgAAcXQkbHuSgOwTOt9xSh5eAn0SrdAAeaklpcVwhuFVFnCGFNTfwCmAVTtSJcUntLvHyM26t3W-0bAAtNBdSh08UMoaibQbiXKTdyvoRrkgw__"
              alt=""
              fill
            />
          </div>

          <div className="absolute z-20 h-[395px] w-[595px] translate-x-1/4 translate-y-1/3">
            <div className="yellow-gradient absolute -bottom-5 right-12 z-0 h-[420px] w-[555px] border-8"></div>
            <Image
              src="https://s3-alpha-sig.figma.com/img/7d7f/e9d4/d8e5a98945ca56d6f8831c022a29a1e5?Expires=1715558400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=VjdDZhhddtlFntJx8-xVEFBk81OYc3NH0MeXQl7XtvvCAtZZWNHJvzCP~FBAIwDaqA0ulv6sjGfLRg5vMEv6cmuktwjCxoNERriN14ytY4i22h~voj4zftnWGMKfgjeEdKixfLJJ6gU2WyHqYD6os1xeVIQby2YWk78t6Pzh71C9UiaWyn59Tpsnl-OXcdobIBThhhRmGC5oaQbN-UIs5nO6p~Y9YSNT-fErxulYLl60bNgdv26TiJm8V6Vj6dYfeuAS884QZGGUFhGXPvpwznK99DtntTbmE8ci7-257L5448g~jTpZYw-O3MJYvEA-69wKxkCRX9aUdYOCQFIziA__"
              alt=""
              fill
              // className="yellow-gradient border-8 p-4"
            />
          </div>
        </div>
      </section>
      <section className="bg-contact-us-banner relative flex h-80 bg-cover bg-center bg-no-repeat py-12">
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
