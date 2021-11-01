module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        cover: "540px",
        "cover-360": "360px",
        hcard: "204px",
        wcard: "340px",
      },
      colors: {
        brownnav: "#C18F54",
        navtext: "#908376",
        creambg: "#FEFAF5",
        creamads: "#FEEFDC",
        topbg: "#E2D2C7",
        textred: "#E00025",
        viewbrown: "#CB9374",
        bgtag: "#E9E3DC",
        textaboutus: "#7E6252",
        bgsection: "#EADFDD",
        bgcard: "#F6F4F2",
        orangetext: "#D1733D",
        textgray: "#666464",
        textbrown: "#8B5723",
        create: "#cc9944",
      },
      inset: {
        ck5: "480px",
      },
      fontFamily: {
        Times: ["Times", "sans-serif"],
        Prompt: ["Prompt", "sans-serif"],
      },
    },
  },
  variants: {
    extend: {
      lineClamp: ["hover"],
      height: ["hover"],
    },
  },

  plugins: [
    require("tailwindcss-neumorphism"),
    require("@tailwindcss/line-clamp"),
  ],
};
