/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      yellow: "#ffc430",
      black: "#121212",
      box: "#171717",
      white: "#f6f6f6",
      background: "#0d131a",
      gray: "#1e242a",
      primary: " #6531E0",
      dark: "#1F252C",
      stroke: "#333333",
      transperent: "#ffffff00",
      public: "#25D695",
      workshop: "#3FD0F4",
      ticket: "#F99460",
      card: "#262932",
      green: "#8ECE00",
      "red-gradient": "#F06359",
      "new-bg": "#1B1D22",
      "new-card": "#26272F",
      "icon-bg": "#14171F",
      "icon-border": "#191D26",
      "body-text": "#9697A1",
      "black-light": "#151A21",
      red: "#ff1a1a",
      orange: "#F99460",
    },
    extend: {
      fontFamily: {
        sans: ["Plus Jakarta Sans", "sans-serif"],
      },
      boxShadow: {
        "custom-black": "0px 4px 4px 0px #00000040",
      },
    },
  },
  plugins: [],
  variants: {
    extend: {
      display: ["focus-group"],
    },
  },
};
