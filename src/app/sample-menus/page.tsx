"use client";
import { nanoid } from "nanoid";
import { MenuTemplate } from "../menu/_components/menu-template";
import { menuKey } from "menu";
import { useState } from "react";
import { SampleMenuCarousel } from "./_components/sample-menu-carousel";

export default function SampleMenus() {
  const [currMenu, setCurrMenu] = useState<menuKey>("Coffee Break");
  return (
    <main>
      <div className="flex h-64 items-center justify-center bg-menu-banner bg-cover bg-center bg-no-repeat">
        <h1 className="text-shadow font-lucida-bold text-8xl text-white">
          Menu
        </h1>
      </div>

      <SampleMenuCarousel />
      <div className="mx-44 mt-24 rounded-xl bg-accent/5 p-12 pb-20">
        <div className="flex items-center justify-between border-b border-black pb-4">
          <div className="w-2/3">
            <p className="text-xl font-bold uppercase">items</p>
          </div>
          <div className="flex w-1/3 items-center justify-between text-center *:w-full">
            <p className="text-xl font-bold uppercase">price</p>
            <p className="text-xl font-bold uppercase">quantity</p>
            <p className="text-xl font-bold uppercase">total price</p>
          </div>
        </div>
        <div className="mt-12">
          <MenuTemplate key={nanoid()} name={currMenu} />
        </div>
      </div>
    </main>
  );
}
