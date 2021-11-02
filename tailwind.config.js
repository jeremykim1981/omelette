const colors = require("tailwindcss/colors");
module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontSize: {
      xss: " 0.7rem",
      xs: ".75rem",
      sm: ".875rem",
      tiny: ".875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
    },
    extend: {
      spacing: {
        question: "472px",
      },
      colors: {
        ...colors,

        textyellow: "#EFCF1B",
        download: "#906D31",
        logouttext: "#906D31",
        bgbottom: "#72605E",
        logintext: "#72605E",
        browntext: "#88735B",
        bghidebrown: "#443936",
      },
      screens: {
        xs: "250px",
      },
      width: {
        "55%": "55%",
        "65%": "62%",
        "45%": "43%",
        "76%": "76.5%",
      },
      // backgroundImage: (theme) => ({
      //   "bg-hero": "url('../bg.jpg')",

      // }),

      fontFamily: {
        Krungsri: ["Krungsri"],
      },
    },
  },

  variants: {},
  plugins: [],
};
