import type { Config } from 'tailwindcss'

const config: Config = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      screens: {
        xs: "0px",
        sm: "600px",
        md: "900px",
        lg: "1200px",
        xl: "1440px",
      },
      backgroundColor: {
        body: "#1b2531",
        paper: "#4362a0",
        "button-primary": "#768A96",
        "button-secondary": "#AAC7D8",
      },
      textColor: {
        "text-primary": "#B3BDD1",
        "text-secondary": "#D6D7DC",
      },
      boxShadow: {
        nav: "0 1px 4px 0 rgb(0 0 0 / 37%)",
      },
    },
  },
  plugins: [],
};
export default config
