/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#121212",
        secondary: "#159c45",
        "secondary-hover": "#0c5d29",
      },
    },
  },
  plugins: [],
};
