const colors = require("tailwindcss/colors");
module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        ...colors,
        bgcareerblog:"#D3E6C7",
        textdarkgray:"#3B3535",
        textgray: "#676767",
        textgraysec:"#5C5C5C",
        textgreen: "#21B200",
        textdarkgreen :"#177B00",
        bgbuttongreen: "#3C733F",
        bgseccion: "#F5F5F5",
        textpink: "#E00025",
        textlightgray: "#667777",
        bgimggray: "#EEEEEE",
        greenblog:"#AED581",
        bgblog:"#FAFAFA",
        searchbg:"#F1F1F1",
        bgproduct:"#F7F7F7",
        textlogingreen:"#056839",
        textlogingray:"#979797",
        textgreenneon:"#264902",
        bglivered:"#B80218",
        textorange:"#E7A52E",
        bgbasket:"#F9FFF1",
        textgold:"#BE9439",
        textbutton:"#10b981",
      },
      
      backgroundImage: (theme) => ({
        "bg-hero": "url('/hero/hero.jpg')",
        "bg-newshero": "url('/hero/newshero.jpg')",
        "bg-aboutushero": "url('/hero/aboutushero.jpg')",
        "bg-blog": "url('/blog/bggreenblog.jpg')",
        "bg-career": "url('/hero/careerhero.jpg')",
        "bg-contact": "url('/contactus/contacthero.jpg')",


        
      }),
      backgroundColor: ['active'],
      spacing: {
        decorate: '26rem',
        xl: '30rem',
        cardbg:'33rem',
        card:'35rem',
        bill :'40rem',
        "75vh":'75vh',
        "90vh":'90vh',

       },
       width: {
        
        '95%': '95.00%',
      },

      fontFamily: {
        Kanit: ["Kanit", "Helvetica", "Arial", "sans-serif"],
        Raleway: ["Raleway", "Helvetica", "Arial", "sans-serif"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [  require('@tailwindcss/line-clamp'),require('@tailwindcss/custom-forms'),],
};
