import { cn, limitTxt } from "@/lib/utils";
import { Star, StarOff } from "lucide-react";
import { v4 as uuid } from "uuid";
import { sampleMenus } from "menu";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
import Marquee from "@/components/magicui/marquee";
import { twMerge } from "tailwind-merge";

const partners = [
  {
    name: "cesko.png",
    className: "",
  },
  {
    name: "tssu.jpg",
    className: "object-cover",
  },
  {
    name: "tegeta.png",
    className: "",
  },
  // {
  //   name: "tch.png",
  //   className: "",
  // },
  {
    name: "kanti.jpg",
    className: "",
  },
  // {
  //   name: "parlament.jpg",
  //   className: "object-cover",
  // },
  {
    name: "tbc.png",
    className: "",
  },
  {
    name: "bta.jpg",
    className: "",
  },
  {
    name: "diplomatge.jpg",
    className: "",
  },
  {
    name: "evex.png",
    className: "",
  },
  {
    name: "farma.png",
    className: "",
  },
  {
    name: "gefa.jpg",
    className: "",
  },
  {
    name: "isu.png",
    className: "",
  },
  {
    name: "bog.png",
    className: "object-fill",
  },
];

const PartnerCard = ({
  className,
  name,
}: {
  name: string;
  className: string;
}) => {
  return (
    <div
      className={cn(
        `relative h-32 max-h-56 w-32 cursor-pointer overflow-hidden rounded-full 
        border p-4 duration-150 hover:scale-105 max-sm:h-20 max-sm:w-20`,
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:hover:bg-gray-50/[.15 dark:border-gray-50/[.1] dark:bg-gray-50/[.10]",
      )}
    >
      <Image
        src={`/imgs/partners/${name}`}
        alt=""
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className={twMerge("object-contain", className)}
        // className={"object-contain"}
      />
    </div>
  );
};

const PartnersSlider = () => {
  return (
    <div
      className="relative flex h-[230px] w-full flex-col items-center 
    overflow-hidden"
    >
      <h3 className="text-2xl font-bold">ჩვენს ფურშეტს იყენებენ</h3>
      <Marquee
        pauseOnHover
        className="mt-10 flex h-full items-center border [--duration:20s]"
      >
        {partners.map(({ name, className }) => (
          <PartnerCard key={name} name={name} className={className} />
        ))}
      </Marquee>
    </div>
  );
};

export default PartnersSlider;
