/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        museo: "var(--font-museomoderno)",
      },
      backgroundImage: {
        menu: "url(/images/menu.png)",
        hijab: "url(/images/hijab.png)",
        maryam: "url(/images/maryam.jpg)",
      },
    },
  },
  plugins: [],
};
