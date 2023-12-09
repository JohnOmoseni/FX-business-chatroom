/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        sm: "3px",
      },
      boxShadow: {
        100: "0 2px 5px rgba(0, 0, 0, 0.3)",
      },
      colors: {},
      fontFamily: {
        kinn: ["Kinn", "Helvetica", "Arial", "sans-serif"],
        poppins: ["Poppins", "Arial", "sans-serif"],
      },
      fontSize: {
        tiny: ["0.7rem", { lineHeight: "0.9rem" }],
        base: ["0.8rem", { lineHeight: "1.3rem" }],
        regular: ["clamp(0.9rem, 1vw, 1rem)", { lineHeight: "1.4rem" }],
        subtitle: ["clamp(1.2rem, 2vw, 20px)", { lineHeight: "1.3" }],
        secondary: ["clamp(1.4rem, 3vw, 30px) ", { lineHeight: "1.3" }],
        primary: ["clamp(1.6rem, 4vw, 35px)", { lineHeight: "1.2" }],
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".h-100dvh": {
          height: "100dvh",
        },
      };

      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
