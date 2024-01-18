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
        paper: "#293243",
        "button-primary": "#768A96",
        "button-secondary": "#AAC7D8",
      },
      textColor: {
        primary: "#B3BDD1",
        secondary: "#D6D7DC",
      },
      fontSize: {
        base: "1rem",
        title: "1.25rem",
      },
      boxShadow: {
        nav: "0 1px 4px 0 rgb(0 0 0 / 37%)",
      },
    },
  },
  plugins: [],
};
export default config
