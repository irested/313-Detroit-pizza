/**
 * @type {import('tailwindcss').Config}
 */
module.exports = {
  content: ["./src/**/*.{html,md,njk,js}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      colors: {
        bgColor: "#EDDDD4",
        vert: "#283D3B",
        vertAccent: "#197278",
        orange: "#C44536",
        marron: "#772E25",
      },
      height: {
        12: "3rem",
        14: "3.5rem",
        16: "4rem",
        18: "4.5rem",
        20: "5rem",
      },
      fontFamily: {
        blackHan: ["Black Han Sans", "sans-serif"], // Add Black Han Sans
        bowlby: ['"Bowlby One"', "cursive"], // Add Bowlby One
        roboto: ["Roboto", "sans-serif"], // Add Roboto
      },
    },
  },
};
