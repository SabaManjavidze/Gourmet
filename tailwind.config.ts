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
      backgroundSize: {
        "120": "120%",
        "130": "130%",
        "140": "140%",
      },
      backgroundImage: {
        "footer-banner":
          "url('https://s3-alpha-sig.figma.com/img/5c8a/3840/f212b3b84f86c8903786ecc0ec46f75b?Expires=1715558400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hZf1NJfW3vnk-KY9ynzwgvP6L0yKEJrr1QfM0Gai5XBaPKV7a2i4sfOSJm~tNLllR9KfbO2GRbVp~ZKQFv5Cn9apwjf1l1ZpVUz1MPmUN4bv5v9NlAeHxABUhFXZFCiRuD6PhqS3YU6o6z6iDwBDP7FKv5dBBfEGxyzIq6~zHIAQKReNjt68o5oEr~T0fxuE19MXmaCCUyOa-rjMq6UIRWoO5QJP-TOKIBErUwyn8jtyCvWRgwzG9CwCul9CV7zB5w3yZG8nVKeGmpmxyQ9tgJl8D5TcNoPdeHaGZxUmQ71XPTewvU9z1~zoUY~bOVQ2YPACUVuAstOCKiERnVLdZw__')",
        "contact-us-banner":
          "url('https://s3-alpha-sig.figma.com/img/b163/302b/852039613c95fb37a77f2682998e604f?Expires=1715558400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=YkUbNAurz-CGWD6YPIS2r2x8mVJtR5ykDr-HFixJHPWzfO8~scvwe8OCNQHf8lyC5w-OLGJrBYtEmhZQmko1FDKAm7ZpP8baz-AmwFdRNb8rlbtiJ1i5MFsI9kgxzBqR9PPKgTrOo34nILklPOX~7s8NV9O8P-M5PYpi9yoVyIWGWIKMkKGc3ck3K-olVb-dKVJpcSFPmuPSf8IZxiFeIlwjczIp9ESVO1yQFlqNPcv8zUIBuZQm6ZEDglqkO9QfKs07QymkjJTUmfmC34D7bgWJGjNObguVZ8cAynfBwBEv3xwkEqgpPMziWyS568ideNxSLJO1IBlAAleuTXdd-g__')",
        "nav-logo":
          "url('https://s3-alpha-sig.figma.com/img/b7e5/c233/298fa68a5658fd9b253139b32f4ee1a2?Expires=1715558400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=cYs9DH3LNUTjRxLgFxYvxXvWvozE-6IinqLdWru2K4o2yN3CMf3aH5bAdDRTfNxRy7CLzaGqZ0-fwuFbD6EThbzcd4AIk~HxB1yOEj7SAVFGqEpetLPO2lsS~a7K3Cu8usZJKVqIRPssweVItBegaMANiykupjNHw2K4EgrvRhUxQPhg71VmEa5WmKsUmPfBKa46ly4zvcu5Jd0EC4bevOOX5AIJqBcSJQ7yZxqXm3bVWIxAerXvvZ9J5Itf3OjoXhXQSdp-4ow9EV4CzTGLyNreb43WcUyeYOXdTbUjm~MZ5DcsoeOKm8Y2gRxB2hZGbKHbo~0MQBmJ~CdeY7vj7A__')",
        "welcome-banner":
          "url('https://s3-alpha-sig.figma.com/img/17cb/591c/87f82ed5bc12da87ae137a5eb6e315fe?Expires=1715558400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hkJJsMJi1LesMXPC3glqwQXR8NO-vTaYZZABQElgMuFXmzl9L-L~hD65-6FPeLsKIFgj-AvLz30PnjBeyeeVczeVG7eqH8UaqBQTZgp3Q5XJ5DlzSIG3BQS7vQ7Ohq1y1ofelfLl~e~0naxeCNzfR11hNAMUzqTTbazjpIDwzRdH6sX4pgSy0KBniK8-mV7pAEmpy8pj0A2-PFeI1dHiMblnxVsZ8pGk6AgEJoHIjnx80sjmcLhMzc8aKaDhEAl4haDwxr6NaaBdoFo53i-ZKnkl8S0Ya6yQcYnex2sV5-B0U17TbTjIECyGLduSq8T5aDl0U8aMAfCEPRspPB2hzA__')",
      },
      fontFamily: {
        georgia: ["Georgia", "sans"],
        "lucida-bold": ["Lucida Handwriting Std", "sans"],
        "lucida-light": ["Lucida Handwriting Std Light", "sans"],
        "lucida-rg": ["Lucida Handwriting Std Rg", "sans"],
        sans: ["Poppins", ...fontFamily.sans],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        brown: "hsl(var(--brown))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
