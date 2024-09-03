/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  daisyui: {
    themes: [
      {
        bikehubtheme: {
          primary: "#2BE6A7",

          secondary: "#0000ff",

          accent: "#00f6ba",

          neutral: "#2BE6A7",

          "base-100": "#ffffff",

          info: "#00b2fc",

          success: "#30b93e",

          warning: "#bc7000",

          error: "#d30045",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
