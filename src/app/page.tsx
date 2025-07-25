"use client";
import { CountryMarque } from "@/components/CountryMarque";
import BubbleFooter from "@/components/Footer";
import Toggle from "@/components/Toggle";
import TowerBlockConatiner from "@/components/TowerBlockConatiner";
import Experience from "@/sections/Experience/Experience";
import HeroSection from "@/sections/Hero/Hero";
import Projects from "@/sections/Projects/Project";
import { useState } from "react";

const Home = () => {
  const [funMode, setFunMode] = useState(false);
  return (
    <div className="bg-[#111] overflow-x-hidden">
      <HeroSection
        funMode={funMode}
        setFunMode={() => setFunMode((prev) => !prev)}
      />
      {funMode ? (
        <div className="z-50 relative flex justify-end items-center gap-2 p-2 mr-3">
          <Toggle
            onText="XP"
            offText="XP"
            isChecked={funMode}
            onChange={() => setFunMode((prev) => !prev)}
          />
        </div>
      ) : (
        <>
          <Experience />
          <CountryMarque />
          {/* <CompiledThoughts /> */}
          <Projects />
          {/* <InteractiveCards /> */}
          <TowerBlockConatiner />
          <BubbleFooter />
        </>
      )}
    </div>
  );
};

export default Home;
