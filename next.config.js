/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const config = {
  images: {
    remotePatterns: [
      { hostname: "s3-alpha-sig.figma.com" },
      { hostname: "platform-lookaside.fbsbx.com" },
      { hostname: "w7.pngwing.com" },
      { hostname: "lh3.googleusercontent.com" },
      { hostname: "i0.wp.com" },
      { hostname: "cdn.brandfetch.io" },
    ],
  },
};
export default withNextIntl(config);
