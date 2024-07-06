/** @type {import('tailwindcss').Config} */

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "tc-green": "#00cc9c",
        "tc-blue": "#197ec6",
        "tc-input-border": "#475569",
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
    },
  },
};
