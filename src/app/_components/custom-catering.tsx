import OrbitingCircles from "@/components/magicui/orbiting-circles";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function CustomCatering() {
  return (
    <div
      className="relative flex h-[500px] w-full flex-col items-center 
      justify-center overflow-hidden rounded-lg bg-background max-sm:h-[350px]"
    >
      <div className="">
        <Button
          className="z-20 whitespace-pre-wrap rounded-2xl bg-accent/70 py-10 text-7xl
        font-semibold leading-none text-accent-light hover:bg-accent/80 active:bg-accent
        max-sm:text-6xl"
        >
          Create Your Own
        </Button>
      </div>

      {/* Inner Circles */}
      <OrbitingCircles
        className="size-[60px] border-none bg-transparent"
        duration={4}
        delay={0}
        radius={80}
      >
        <Icons.whatsapp />
      </OrbitingCircles>
      <OrbitingCircles
        className="size-[60px] border-none bg-transparent"
        duration={4}
        delay={10}
        radius={80}
      >
        <Icons.notion />
      </OrbitingCircles>

      {/* Outer Circles (reverse) */}
      <OrbitingCircles
        className="size-[80px] border-none bg-transparent"
        radius={190}
        duration={4}
        delay={0}
        reverse
      >
        <Icons.googleDrive />
      </OrbitingCircles>
      <OrbitingCircles
        className="size-[80px] border-none bg-transparent"
        radius={190}
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