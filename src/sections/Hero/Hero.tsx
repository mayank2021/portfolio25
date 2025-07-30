"use client";

import Animation from "@/components/Animation/Animation";
import CanvasDraw from "@/components/CanvasDraw";
import AnimatedCircles from "@/components/CircleAnimation/CircleAnimation";
import Dropdown from "@/components/Dropdown";
import FeatherAnimation from "@/components/Feather/Feather";
// import FlowerAnimation from "@/components/FlowerAnim/FlowerAnim";
import AnimatedText from "@/components/SlidingText/SlidingText";
import Toggle from "@/components/Toggle";
import TypingAnimation from "@/components/TypingAnimation/TypingAnimation";

import React from "react";

const AnimatedArrowButton = () => {
  return (
    <div className="flex items-center justify-center">
      <style jsx>{`
        @keyframes bounceAlpha {
          0% {
            opacity: 1;
            transform: translateX(0px) scale(1);
          }
          25% {
            opacity: 0;
            transform: translateX(10px) scale(0.9);
          }
          26% {
            opacity: 0;
            transform: translateX(-10px) scale(0.9);
          }
          55% {
            opacity: 1;
            transform: translateX(0px) scale(1);
          }
        }

        .bounce-alpha {
          animation: bounceAlpha 1.4s infinite linear;
        }

        .bounce-alpha-delayed {
          animation: bounceAlpha 1.4s infinite linear;
          animation-delay: 0.2s;
        }

        .arrow-icon {
          background-image: url("data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgNTEyIDUxMiI+PHN0eWxlPi5zdDB7ZmlsbDojZmZmfTwvc3R5bGU+PHBhdGggY2xhc3M9InN0MCIgZD0iTTMxOS4xIDIxN2MyMC4yIDIwLjIgMTkuOSA1My4yLS42IDczLjdzLTUzLjUgMjAuOC03My43LjZsLTE5MC0xOTBjLTIwLjEtMjAuMi0xOS44LTUzLjIuNy03My43UzEwOSA2LjggMTI5LjEgMjdsMTkwIDE5MHoiLz48cGF0aCBjbGFzcz0ic3QwIiBkPSJNMzE5LjEgMjkwLjVjMjAuMi0yMC4yIDE5LjktNTMuMi0uNi03My43cy01My41LTIwLjgtNzMuNy0uNmwtMTkwIDE5MGMtMjAuMiAyMC4yLTE5LjkgNTMuMi42IDczLjdzNTMuNSAyMC44IDczLjcuNmwxOTAtMTkweiIvPjwvc3ZnPg==");
          background-size: contain;
          background-repeat: no-repeat;
        }
      `}</style>

      <div
        className="relative ml-1 w-10 h-10 rotate-90 rounded-full cursor-pointer group transition-transform duration-200"
        onClick={() => console.log("Arrow clicked!")}
      >
        <div className="arrow-first absolute w-3 h-3 top-4 left-3 arrow-icon bounce-alpha-delayed"></div>

        <div className="arrow-second absolute w-3 h-3 top-4 left-5 arrow-icon bounce-alpha"></div>
      </div>
    </div>
  );
};

export default function HeroSection({
  funMode,
  setFunMode,
}: {
  funMode: boolean;
  setFunMode: () => void;
}) {
  const scrollToExperience = () => {
    const experienceSection = document.getElementById("experience-section");
    if (experienceSection) {
      experienceSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="relative bg-[#111]">
      <header className="flex pt-6 px-10 max-md:px-4 max-md:pt-2 max-md:items-start justify-between absolute top-0 w-full -translate-y-[200px] animate-header">
        <AnimatedText />
        <div className="flex">
          <div className="flex items-center gap-2 p-2 mr-3 max-md:mr-2 max-md:p-1">
            <Toggle
              onText="XP"
              offText="XP"
              isChecked={funMode}
              onChange={setFunMode}
            />
          </div>
          <Dropdown />
        </div>
      </header>
      {funMode ? (
        <CanvasDraw />
      ) : (
        <>
          <div>
            <div className="bg-[#111] text-white w-full h-[100vh] flex flex-col items-center justify-center">
              <div className="flex flex-col relative">
                <div className="absolute left-[230px] top-[-50px] max-md:left-[90px] max-md:top-[-130px] opacity-0 animate-[fadeIn_1s_ease-in_0s_forwards]">
                  <FeatherAnimation />
                </div>
                <div className="relative pb-0">
                  <TypingAnimation
                    text='git commit -m "Hello World!"'
                    className="self-start font-light text-[#e9f1df] tracking-[0.05em] pl-12 text-[16px] max-md:pl-[20px] max-md:text-[12px]"
                    delay={4000}
                  />
                </div>
                <div className="opacity-0 animate-[fadeIn_2s_ease-in_6s_forwards]">
                  <Animation />
                </div>

                <div className="relative self-end -mt-2 max-md:-mt-0">
                  <TypingAnimation
                    text="just another human writing command for machines"
                    className="font-light min-w-[438px] max-md:hidden h-6 text-[#e9f1df] tracking-[0.05em] pr-9 max-md:pr-[15px] max-md:min-w-[327px] text-[16px] max-md:text-[12px]"
                    delay={8000}
                  />
                  <TypingAnimation
                    text="another human writing command for machines"
                    className="font-light hidden max-md:block min-w-[438px] h-6 text-[#e9f1df] tracking-[0.05em] pr-9 max-md:pr-[13px] max-md:min-w-[300px] text-[16px] max-md:text-[12px]"
                    delay={8000}
                  />
                </div>
              </div>
            </div>
          </div>
          <button
            className="opacity-0 absolute animate-show_circle left-1/2 transform !-translate-x-[50%] bottom-16 text-white"
            onClick={scrollToExperience}
          >
            <AnimatedCircles height={60} width={60}>
              <AnimatedArrowButton />
            </AnimatedCircles>
          </button>
        </>
      )}
    </div>
  );
}
