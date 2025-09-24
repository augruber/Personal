/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: { extend: {
      scale: {
        98: "0.98",
        102: "1.02", // you can add more if you want
      },
    } 
  },
  plugins: [require("@tailwindcss/typography")], // optional (for .prose)
};