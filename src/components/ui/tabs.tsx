"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Tab = {
  title: string;
  value: string;
  content?: string | React.ReactNode;
};

export const Tabs = ({
  tabs: propTabs,
  perspective = false,
  containerClassName,
  activeTabClassName,
  tabClassName,
  contentClassName,
}: {
  tabs: Tab[];
  containerClassName?: string;
  activeTabClassName?: string;
  tabClassName?: string;
  contentClassName?: string;
  perspective?: boolean;
}) => {
  const [active, setActive] = useState<Tab>(propTabs[0] as Tab);
  const [tabs, setTabs] = useState<Tab[]>(propTabs);

  const moveSelectedTabToTop = (idx: number) => {
    if (perspective) {
      const newTabs = [...propTabs];
      const selectedTab = newTabs.splice(idx, 1);
      newTabs.unshift(selectedTab[0] as Tab);
      setTabs(newTabs);
      setActive(newTabs[0] as Tab);
    } else {
      setActive(propTabs[idx] as Tab);
    }
  };

  const [hovering, setHovering] = useState(false);

  return (
    <>
      <div
        className={cn(
          "no-visible-scrollbar relative flex w-full max-w-full flex-row items-center justify-start overflow-auto [perspective:1000px] sm:overflow-visible",
          containerClassName,
        )}
      >
        {propTabs.map((tab, idx) => (
          <button
            key={tab.title}
            onClick={() => {
              moveSelectedTabToTop(idx);
            }}
            onMouseEnter={() => setHovering(perspective && true)}
            onMouseLeave={() => setHovering(false)}
            className={cn("relative rounded-full px-4 py-2", tabClassName)}
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {active.value === tab.value && (
              <motion.div
                layoutId="clickedbutton"
                transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                className={cn(
                  "absolute inset-0 rounded-full bg-accent",
                  activeTabClassName,
                )}
              />
            )}

            <span
              className={`relative block ${active.value == tab.value ? "text-primary-foreground" : "text-primary"}`}
            >
              {tab.title}
            </span>
          </button>
        ))}
      </div>
      <FadeInDiv
        tabs={perspective ? tabs : [active]}
        perspective={perspective}
        key={active.value}
        hovering={hovering}
        className={cn(
          perspective && hovering ? "mt-32" : "mt-8",
          contentClassName,
        )}
      />
    </>
  );
};

export const FadeInDiv = ({
  className,
  tabs,
  hovering,
  perspective,
}: {
  className?: string;
  key?: string;
  tabs: Tab[];
  perspective: boolean;
  hovering?: boolean;
}) => {
  const isActive = (tab: Tab) => {
    return tab.value === tabs?.[0]?.value;
  };
  return (
    <div className="relative h-full w-full">
      {tabs.map((tab, idx) => (
        <motion.div
          key={tab.value}
          layoutId={tab.value}
          transition={{ duration: 0.3 }}
          style={{
            scale: 1 - idx * 0.1,
            top: hovering ? idx * -50 : 0,
            zIndex: -idx,
            opacity: idx < 3 ? 1 - idx * 0.3 : 0,
          }}
          animate={{
            y: isActive(tab)
              ? [perspective ? 0 : -50, perspective ? 40 : -10, 0]
              : 0,
            x: !perspective && isActive(tab) ? [-50, -10, 0] : 0,
            opacity: perspective ? undefined : [0, 0.5, 1],
          }}
          className={cn(
            `-none absolute left-0 top-0 h-full w-full ${perspective ? "" : isActive(tab) ? "" : "!opacity-0"}`,
            className,
          )}
        >
          {tab.content}
        </motion.div>
      ))}
    </div>
  );
};
