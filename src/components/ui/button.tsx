"use-client";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        accent: "bg-accent text-primary-foreground hover:bg-accent/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        "outline-accent":
          "border border-accent text-accent bg-background scale-100 duration-150 hover:bg-orange-100 focus:border-accent active:bg-accent/30",
        outline:
          "border border-primary bg-background scale-100 duration-150 hover:bg-accent/15 hover:border-accent focus:border-accent active:bg-accent/30",
        "outline-white":
          "border-2 border-white bg-black/15 hover:bg-black/40 text-white",
        secondary: "bg-secondary text-primary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-black/5 hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        text: "p-0 hover:text-accent-foreground",
      },
      size: {
        default: "h-10 px-4 py-2",
        auto: "h-auto w-auto",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-12 rounded-md px-16",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  active?: boolean;
  isLoading?: boolean;
  contentPos?: "start" | "center" | "end";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      isLoading = false,
      contentPos = "center",
      className,
      variant,
      size,
      asChild = false,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        <div className="inline-flex w-fit items-center justify-center">
          <div
            className={`${
              isLoading ? "opacity-0" : "opacity-100"
            } flex w-full items-center justify-${contentPos}`}
          >
            {children}
          </div>
          <div
            className="absolute right-1/2 top-1/2 -translate-y-1/2 translate-x-1/2"
            hidden={!isLoading}
          >
            <Loader2 size={20} />
          </div>
        </div>
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
