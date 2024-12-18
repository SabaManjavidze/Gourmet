import { Button } from "@/components/ui/button";
import Image from "next/image";
export interface MenuPreview {
  id: string;
  title: string;
  picture: string;
  desc: string;
  imgSide: "left" | "right";
}
export function MenuPreviewSection({
  data,
  onOrderClick,
}: {
  data: MenuPreview;
  onOrderClick: (id: string, name: string) => void;
}) {
  return (
    <div className="flex flex-col gap-y-12 max-lg:gap-y-5" id={data.title}>
      <div
        className={`flex w-full items-center max-md:flex-col 
          ${data.imgSide == "right" ? "flex-row-reverse" : null}
         justify-between gap-x-32`}
      >
        <div
          className="relative h-[300px] max-w-[900px] max-lg:hidden max-md:block 
          max-md:w-full max-sm:h-[220px] max-sm:w-[330px] lg:min-w-[450px]"
        >
          <div
            className="absolute right-10 top-[53%] z-0 h-[115%] w-[95%] -translate-y-1/2 
             border-[5px] border-accent max-sm:right-8 max-sm:h-[120%]"
          ></div>
          <Image
            src={data.picture}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            alt="pic"
            fill
            className="yellow-gradient border-8 object-cover shadow-2xl"
          />
        </div>
        <div className="flex w-full flex-col items-start justify-start max-md:mt-12">
          <h3 className="text-xl font-bold">{data.title}</h3>
          <p className="mt-5 text-base leading-7 text-muted-foreground">
            {data.desc}
          </p>
          <Button
            // disabled={data.title != "ყავის შესვენება"}
            onClick={() => onOrderClick(data.id, data.title)}
            className="mt-8 px-4 uppercase max-lg:hidden max-md:mt-3"
            size={"lg"}
            variant={"accent"}
          >
            შეუკვეთე
          </Button>
        </div>
      </div>
      <ul
        className="relative mt-8 grid w-full grid-cols-5 gap-6 bg-white max-xl:grid-cols-4
        max-xl:gap-3 max-lg:mt-0 max-lg:grid-cols-3 max-md:hidden xl:gap-x-16
        "
      >
        {Array(5)
          .fill(1)
          .map((val, idx) => (
            <li
              key={idx}
              className="border-brown-gradient relative h-44 w-64 border-4 
              max-2xl:h-36 max-2xl:w-52 max-xl:w-52 max-lg:h-32 max-lg:w-48 
              xl:h-36 xl:w-48"
            >
              <Image
                src={`/imgs/menu-previews/${data.title}/${data.title.toLowerCase()}${idx + 1}.png`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
                alt=""
              />
            </li>
          ))}
      </ul>
      <div>
        <Button
          onClick={() => onOrderClick(data.id, data.title)}
          // disabled={data.title != "ყავის შესვენება"}
          className="mt-8 px-4 uppercase max-lg:mt-0 max-md:mt-3 lg:hidden"
          size={"lg"}
          variant={"accent"}
        >
          შეუკვეთე
        </Button>
      </div>
    </div>
  );
}
