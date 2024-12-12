/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  plugins: ["prettier-plugin-tailwindcss"],
  overrides: [
    {
      files: "./**/*.ts",
      options: {
        quoteProps: "consistent",
      },
    },
  ],
};

export default config;
