/** @type {import('tailwindcss').Config} */

import tailgridsPlugin from "tailgrids/plugin";

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gray: {
          100: "#fbfbfb",
          300: "#929292",
          6: "#f2f2f2", // merged value from both configurations
          5: "#e0e0e0", // merged value from second configuration
          3: "#828282", // merged value from both configurations
          4: "#bdbdbd", // merged value from second configuration
        },
        white: "#fff",
        dark: "#111",
        "brand-color-2": "#197ec6",
        "brand-color-01": "#00cc9c",
        silver: "#bdbdbd",
        whitesmoke: "#f2f2f2",
        mediumseagreen: "#00b382",
        "not-white": "#f7f8fa",
        gainsboro: "#dedee0",
        indianred: {
          100: "#eb5757",
          200: "#c55757",
        },
        orange: "#ffa400",
        gold: "#ffca2a",
        darkcyan: "#1f8a7d",
        forestgreen: "#32b950",
        goldenrod: "#e6ba1f",
        violet: "#fd8bff",
        mediumorchid: "#bb6bd9",
        skyblue: "#56ccf2",
        "green-1": "#219653",
        mediumaquamarine: "#85e0ab",
        mediumslateblue: "#5d5fef",
        cornflowerblue: "#a5a6f6",
      },
      spacing: {},
      fontFamily: {
        "sf-pro-display": "'SF Pro Display'",
        "font-awesome-5-free": "'Font Awesome 5 Free'",
        poppins: "Poppins",
      },
      borderRadius: {
        "31xl": "50px",
        "81xl": "100px",
        "5xs-5": "7.5px",
      },
    },
    fontSize: {
      sm: "14px",
      "2xs": "11px",
      "5xs": "8px",
      base: "16px",
      "5xl": "24px",
      lgi: "19px",
      xs: "12px",
      inherit: "inherit",
      "3xs": "10px",
      "7xs": "6px",
      "6xs": "7px",
      "13xl": "32px",
      "7xl": "26px",
    },
    screens: {
      mq1325: {
        raw: "screen and (max-width: 1325px)",
      },
      mq1125: {
        raw: "screen and (max-width: 1125px)",
      },
      mq800: {
        raw: "screen and (max-width: 800px)",
      },
      mq450: {
        raw: "screen and (max-width: 450px)",
      },
      lg: {
        max: "1200px",
      },
      mq1050: {
        raw: "screen and (max-width: 1050px)",
      },
      mqMin800: {
        raw: "screen and (min-width: 800px)",
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [tailgridsPlugin],
};
