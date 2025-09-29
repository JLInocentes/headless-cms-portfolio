/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["var(--font-montserrat)"],
        geist_sans: ["var(--font-geist-sans)"],
        geist_mono: ["var(--font-geist-mono)"],
        roboto: ["var(--font-roboto)"],
      },
    },
  },
  plugins: [],
};
