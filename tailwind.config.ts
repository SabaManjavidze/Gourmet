import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontSize: {
        xxxs: "8px",
        xxs: "10px",
      },
      screens: {
        "2lg": "1150px",
        "xs": "500px",
      },
      backgroundSize: {
        "90": "90%",
        "120": "120%",
        "130": "130%",
        "140": "140%",
        "160": "160%",
      },
      backgroundImage: {
        "dishes-banner": "url('/imgs/dishes.png')",
        "date": "url('/imgs/date.png')",
        "round-dish1": "url('/imgs/round-dish1.png')",
        "round-dish2": "url('/imgs/round-dish2.png')",
        "about-us-1": "url('/imgs/about-us-1.jpg')",
        "about-us-2": "url('/imgs/about-us-2.jpg')",
        "menu-banner": "url('/imgs/menu.png')",
        "about-us-banner": "url('/imgs/about-us.jpg')",
        "rectangle": "url('/imgs/rectangle.png')",
        "sample-menus": "url('/imgs/sample-menus.png')",
        "vignete":
          "radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(0,0,0,0.3) 95%, rgba(0,212,255,0) 100%);",
        "footer-banner": "url(/imgs/footer.png)",
        "contact-us-banner": "url(/imgs/contact-us.jpg)",
        "nav-logo": "url(/imgs/logo.png)",
        "welcome-banner": "url(/imgs/welcome.png)",
      },
      fontFamily: {
        "georgia": ["Georgia", "sans"],
        "gugeshashvili": ["gugeshashvili", "sans"],
        "lucida-bold": ["Lucida Handwriting Std", "sans"],
        "lucida-light": ["Lucida Handwriting Std Light", "sans"],
        "lucida-rg": ["Lucida Handwriting Std Rg", "sans"],
        "sans": ["Poppins", ...fontFamily.sans],
      },
      colors: {
        "border": "hsl(var(--border))",
        "input": "hsl(var(--input))",
        "ring": "hsl(var(--ring))",
        "background": "hsl(var(--background))",
        "foreground": "hsl(var(--foreground))",
        "brown": "hsl(var(--brown))",
        "primary": {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        "secondary": {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        "destructive": {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        "muted": {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
          sm: "hsl(var(--muted-sm))",
        },
        "accent": {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          light: "hsl(var(--accent-light))",
        },
        "popover": {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        "card": {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        "color-1": "hsl(var(--color-1))",
        "color-2": "hsl(var(--color-2))",
        "color-3": "hsl(var(--color-3))",
        "color-4": "hsl(var(--color-4))",
        "color-5": "hsl(var(--color-5))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "marquee": {
          from: {
            transform: "translateX(0)",
          },
          to: {
            transform: "translateX(calc(-100% - var(--gap)))",
          },
        },
        "marquee-vertical": {
          from: {
            transform: "translateY(0)",
          },
          to: {
            transform: "translateY(calc(-100% - var(--gap)))",
          },
        },
        "orbit": {
          "0%": {
            transform:
              "rotate(0deg) translateY(calc(var(--radius) * 1px)) rotate(0deg)",
          },
          "100%": {
            transform:
              "rotate(360deg) translateY(calc(var(--radius) * 1px)) rotate(-360deg)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "marquee": "marquee var(--duration) linear infinite",
        "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
        "orbit": "orbit calc(var(--duration)*1s) linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
