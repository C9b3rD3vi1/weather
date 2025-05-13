import type { Config } from "tailwindcss";
import daisyui from "daisyui";

const config: Config & { daisyui: { themes: string[] } } = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      "light",
      "dark",
      "cupcake",
      "dracula",
      "synthwave",
      "corporate",
      "fantasy",
    ],
  },
};
export default config;
