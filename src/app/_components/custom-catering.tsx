import OrbitingCircles from "@/components/magicui/orbiting-circles";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState, useEffect } from "react";

export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState("base");

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) setBreakpoint("base");
      else if (width < 768) setBreakpoint("sm");
      else if (width < 1024) setBreakpoint("md");
      else setBreakpoint("lg");
    };

    handleResize(); // Set initially
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return breakpoint;
}

export function CustomCatering({ onClick }: { onClick?: () => void }) {
  const t = useTranslations("Custom Catering");
  const breakpoint = useBreakpoint();

  // Dynamically adjust radii based on screen size
  const radiusMap = {
    base: 50,
    sm: 70,
    md: 100,
    lg: 140,
  };

  const innerRadius = (radiusMap as any)[breakpoint];
  const outerRadius = innerRadius * 2;

  return (
    <div
      id="custom-catering"
      className="relative flex h-[400px] w-full flex-col items-center justify-center overflow-hidden rounded-lg
      bg-background sm:h-[500px] md:h-[600px] lg:h-[700px]"
    >
      <div className="z-20">
        <Button
          onClick={onClick}
          className="whitespace-pre-wrap rounded-2xl bg-accent/70 py-6 text-2xl font-semibold leading-none text-accent-light
          hover:bg-accent/80 active:bg-accent sm:py-8 sm:text-4xl md:py-10 md:text-5xl lg:text-6xl"
        >
          {t("btn_title")}
        </Button>
      </div>

      {/* Inner Circles */}
      <OrbitingCircles
        className="size-[40px] border-none bg-transparent sm:size-[50px] md:size-[60px]"
        duration={4}
        delay={0}
        radius={innerRadius}
      >
        <Icons.whatsapp />
      </OrbitingCircles>
      <OrbitingCircles
        className="size-[40px] border-none bg-transparent sm:size-[50px] md:size-[60px]"
        duration={4}
        delay={10}
        radius={innerRadius}
      >
        <Icons.notion />
      </OrbitingCircles>

      {/* Outer Circles (reverse) */}
      <OrbitingCircles
        className="size-[50px] border-none bg-transparent sm:size-[65px] md:size-[80px]"
        radius={outerRadius}
        duration={4}
        delay={0}
        reverse
      >
        <Icons.googleDrive />
      </OrbitingCircles>
      <OrbitingCircles
        className="size-[50px] border-none bg-transparent sm:size-[65px] md:size-[80px]"
        radius={outerRadius}
        duration={4}
        delay={10}
        reverse
      >
        <Icons.gitHub />
      </OrbitingCircles>
    </div>
  );
}
const Icons = {
  gitHub: () => (
    <Image width={350} height={350} src="/imgs/circle-food.png" alt="" />
  ),
  notion: () => (
    <Image width={350} height={350} src="/imgs/round-dish1.png" alt="" />
  ),
  openai: () => (
    <Image width={350} height={350} src="/imgs/round-dish2.png" alt="" />
  ),
  googleDrive: () => (
    <Image width={350} height={350} src="/imgs/round-dish1.png" alt="" />
  ),
  whatsapp: () => (
    <Image width={350} height={350} src="/imgs/circle-food.png" alt="" />
  ),
};
