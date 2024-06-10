/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  images: {
    remotePatterns: [
      { hostname: "s3-alpha-sig.figma.com" },
      { hostname: "w7.pngwing.com" },
      { hostname: "lh3.googleusercontent.com" },
    ],
  },
};

export default config;
