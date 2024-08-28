/** @type {import('tailwindcss').Config} */

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "tc-input-border": "#475569",
        "tc-background": "rgba(247, 248, 250, 1)",
        "tc-sidebar-heading": "rgba(8,36,49,0.5)",
        "tc-black": "rgba(39, 50, 64, 1)",
        "tc-input-background": "rgba(247, 248, 250, 1)",
        "tc-indigo-light": "rgba(112, 127, 221, 0.1)",
        "forest-green": "#32b950",
        "golden-rod": "#e6ba1f",
        "medium-slate-blue": "#5d5fef",
        "corn-flower-blue": "#a5a6f6",
        "indian-red": {
          100: "#eb5757",
        },
        "medium-aqua-marine": "#85e0ab",
        "green-1": "#219653",
        "sky-blue": "#56ccf2",
        "medium-orchid": "#bb6bd9",
        violet: "#fd8bff",
        gold: "#ffca2a",
        "dark-cyan": "#1f8a7d",
        orange: "#ffa400",
        "tc-green": "#00cc9c",
        "tc-blue": "#197ec6",
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
      boxShadow: {
        card: "0px 4px 60px 0px #00000005",
      },
      fontFamily: {
        "sf-pro-display": "SF Pro Display",
      },
    },
  },
};
