import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        black: {
          50: "#3F424D",
          100: "#050607",
        },
      },
      fontFamily: {
        inter: ["var(--font-inter)"],
        playfair: ["var(--font-playfair)", "serif"],
      },
      fontSize: {
        zmicro: ["10px", "16px"],
        ztiny: ["12px", "16px"],
        zsmall: ["14px", "20px"],
        znormal: ["16px", "24px"],
        "znormal-decorative": ["16px", "30px"],
        zmoderate: ["18px", "24px"],
        zlarge: ["20px", "28px"],
        znavlink: ["20px", "45px"],
        zxlarge: ["24px", "32px"],
        zslarge: ["28px", "32px"],
        zbig: ["30px", "40px"],
        zbigger: ["32px", "42px"],
        zhuge: ["36px", "48px"],
        zgiant: ["40px", "48px"],
        zhero: ["42px", "56px"],
        zdisplay: ["48px", "60px"],
      },
      backgroundImage: {
        // light: "url('/images/light-bg.png')",
      },
      keyframes: {
        feather: {
          "0%": { transform: "rotate(50deg) translate(-150px, 50px)" },
          "25%": { transform: "rotate(90deg) translate(50px, 100px)" },
          "50%": { transform: "rotate(50deg) translate(100px, 50px)" },
          "75%": { transform: "rotate(90deg) translate(150px, 100px)" },
          "100%": { transform: "rotate(70deg) translate(200px, 75px)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        circle_anim: {
          "0%": {
            opacity: "0",
            transform: "scale(0)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)",
          },
        },
        header_anim: {
          "0%": {
            transform: "translateY(-200px)",
          },
          "90%": {
            transform: "translateY(20px)",
          },
          "100%": {
            transform: "translateY(0px)",
          },
        },
      },
      animation: {
        feather: "feather 4s ease-in-out 1 alternate forwards",
        fadeIn: "fadeIn 1s ease-in forwards",
        show_circle: "circle_anim 1.5s ease-in 11s forwards",
        header: "header_anim 1s ease-in 13s forwards",
      },
    },
  },
};

export default config;
