import { cn, limitTxt } from "@/lib/utils";
import Marquee from "@/components/magicui/marquee";
import { Star, StarOff } from "lucide-react";
import { v4 as uuid } from "uuid";
import { sampleMenus } from "menu";
import { CardContainer, CardBody } from "../3d-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";

const reviews = [
  {
    name: "Tamar Gelashvili",
    body: "Great Desserts, Excellent Staff and nice indoors seating area. I have only tried their cakes and they are always new and well prepared. I hope they will continue this way.",
    rating: 5,
    img: "/imgs/reviews/Tamar Gelashvili.png",
    url: "https://maps.app.goo.gl/habwA8Lra2WRex6u6",
  },
  {
    name: "Julia",
    body: "The interior looks normal, but dessers are wonderful! Good general food(by weight) Tasty desserts and coffee",
    img: "/imgs/reviews/Julia.png",
    rating: 5,
    url: "https://maps.app.goo.gl/gW3FhZshGRuNePzg8",
  },
  {
    name: "Tale Of",
    body: "Addictive cakes! Just wow! After one slice you'll like to try all the others! I wished there was a metro station in front of this lovely bar so I could go having breakfast there everyday!!",
    rating: 5,
    img: "/imgs/reviews/Tale Of.png",
    url: "https://maps.app.goo.gl/4MHYc5zyRvsp38Er7",
  },
  {
    name: "Giorgi Karkashadze",
    rating: 4,
    body: "Better than most places of similar style, but still lack of choice, and too many things are made with mayo",
    img: "/imgs/reviews/Giorgi Karkashadze.png",
    url: "https://maps.app.goo.gl/mTwXij1xqnURG1hX6",
  },
  {
    name: "Yahya Dalati",
    body: "It was great experience there.",
    rating: 5,
    url: "https://maps.app.goo.gl/mkoMDXYSuCAnprJTA",
    img: "/imgs/reviews/Yahya Dalati.png",
  },
  {
    name: "Mainframe",
    rating: 3,
    body: "Not bad. Staff is very attentive.",
    img: "/imgs/reviews/Mainframe.png",
    url: "https://maps.app.goo.gl/yNMo9qVj77pZUeQr8",
  },
  {
    name: "Валерия Владимировна",
    rating: 5,
    body: "Very beautiful and tasty desserts, you can also snack on salad and cutlets) the interior is modern and very clean, the sellers are polite and one girl even speaks English) and the prices are simply unrealistically low! I advise you to visit them or order delivery of desserts with condensed milk)",
    img: "/imgs/reviews/Валерия Владимировна.png",
    url: "https://maps.app.goo.gl/o1zy8avrUPGYyL2X6",
  },
  {
    name: "Özkan Korkmaz",
    rating: 5,
    body: "A great place, I definitely recommend it.",
    img: "/imgs/reviews/Özkan Korkmaz.png",
    url: "https://maps.app.goo.gl/iryX14EG6FYGo12B7",
  },
];

const ReviewCard = ({
  img,
  name,
  body,
  rating,
  url,
}: {
  img: string;
  name: string;
  body: string;
  rating: number;
  url: string;
}) => {
  return (
    <Link
      href={url}
      target="_blank"
      className={cn(
        "relative h-52 max-h-56 w-64 cursor-pointer overflow-hidden rounded-xl border p-4 duration-150 hover:scale-105",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <div className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            className="rounded-full"
            width="40"
            height="40"
            alt=""
            src={img}
          />
          <div className="flex flex-col justify-center">
            <figcaption className="font-medium dark:text-white">
              {limitTxt(name, 12)}
            </figcaption>
            <span className="flex font-medium dark:text-white/40">
              {[...Array(rating)].map((val) => (
                <Star
                  key={uuid()}
                  size={12}
                  className="fill-yellow-400 text-yellow-400"
                />
              ))}
              {5 - rating > 0
                ? [...Array(5 - rating)].map((val) => (
                  <Star
                    key={uuid()}
                    size={12}
                    className="fill-muted-foreground text-muted-foreground"
                  />
                ))
                : null}
            </span>
          </div>
        </div>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="30"
            height="30"
            viewBox="0 0 48 48"
          >
            <path
              fill="#FFC107"
              d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
            ></path>
            <path
              fill="#FF3D00"
              d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
            ></path>
            <path
              fill="#4CAF50"
              d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
            ></path>
            <path
              fill="#1976D2"
              d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
            ></path>
          </svg>
        </div>
      </div>
      <blockquote className="mt-4 overflow-hidden text-ellipsis [-webkit-box-orient:vertical] [-webkit-line-clamp:4] [display:-webkit-box] hover:flex hover:max-h-[90px] hover:overflow-y-auto">
        {body}
      </blockquote>
      <p className="absolute bottom-2 text-sm text-muted-foreground">
        12/02/2024
      </p>
    </Link>
  );
};

const UserReviewsCarousel = () => {
  return (
    <Carousel
      opts={{
        align: "center",
        loop: true,
      }}
      className="max-w-[75%] px-5 max-md:px-0 max-sm:w-full"
    >
      <CarouselContent className="flex h-56 items-center">
        {reviews
          .concat(reviews)
          .map(({ url, body, img, name, rating }, index) => (
            <CarouselItem
              key={uuid()}
              className="flex justify-center hover:z-20 max-md:basis-full md:basis-1/2 lg:basis-1/3 2xl:basis-1/5"
            >
              <ReviewCard
                url={url}
                body={body}
                img={img}
                name={name}
                rating={rating}
              />
            </CarouselItem>
          ))}
      </CarouselContent>
      <CarouselPrevious
        variant={"outline-white"}
        className="h-12 w-12 max-md:h-8 max-md:w-8"
        iconStyle="h-6 w-6"
      />
      <CarouselNext
        variant={"outline-white"}
        className="h-12 w-12 max-md:h-8 max-md:w-8"
        iconStyle="h-6 w-6"
      />
    </Carousel>
  );
};

export default UserReviewsCarousel;
