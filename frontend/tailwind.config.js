/** @type {import('tailwindcss').Config} */

import tailgridsPlugin from "tailgrids/plugin";

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "tc-green": "#00cc9c",
        "tc-blue": "#197ec6",
        // "tc-gray": "#e5e7eb",
        "tc-input-border": "#475569",
        "forest-green": "#32b950",
        "golden-rod": "#e6ba1f",
        "medium-slate-blue": "#5d5fef",
        "corn-flower-blue": "#a5a6f6",
        "indian-red": {
          100: "#eb5757",
          // 200: "#c55757",
        },
        "medium-aqua-marine": "#85e0ab",
        "green-1": "#219653",
        "sky-blue": "#56ccf2",
        "medium-orchid": "#bb6bd9",
        violet: "#fd8bff",
        gold: "#ffca2a",
        "dark-cyan": "#1f8a7d",
        orange: "#ffa400",
        /*--------------------------------------------------*/
        // gray: {
        //   100: "#fbfbfb",
        //   300: "#929292",
        //   6: "#f2f2f2", // merged value from both configurations
        //   5: "#e0e0e0", // merged value from second configuration
        //   3: "#828282", // merged value from both configurations
        //   4: "#bdbdbd", // merged value from second configuration
        // },
        // white: "#fff",
        // dark: "#111",
        // // "brand-color-2": "#197ec6",
        // // "brand-color-01": "#00cc9c",
        // silver: "#bdbdbd",
        // whitesmoke: "#f2f2f2",
        // mediumseagreen: "#00b382",
        // "not-white": "#f7f8fa",
        // gainsboro: "#dedee0",
        // indianred: {
        //   100: "#eb5757",
        //   200: "#c55757",
        // },
        // orange: "#ffa400",
        // gold: "#ffca2a",
        // darkcyan: "#1f8a7d",
        // forestgreen: "#32b950",
        // goldenrod: "#e6ba1f",
        // violet: "#fd8bff",
        // mediumorchid: "#bb6bd9",
        // skyblue: "#56ccf2",
        // "green-1": "#219653",
        // mediumaquamarine: "#85e0ab",
        // mediumslateblue: "#5d5fef",
        // cornflowerblue: "#a5a6f6",
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
      screens: {
        xs: "480px",
        sm: "640px",
        md: "768px",
        mqMin800: "800px",
        mqMin850: "850px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
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
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [tailgridsPlugin],
};
