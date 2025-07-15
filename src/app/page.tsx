"use client";
// import InteractiveCards from "@/components/Card";
import { CountryMarque } from "@/components/CountryMarque";
import BubbleFooter from "@/components/Footer";
import Toggle from "@/components/Toggle";
import TowerBlocks from "@/components/TowerBlocks";
import CompiledThoughts from "@/sections/CompiledThoughts/CompiledThoughts";
import Connect from "@/sections/Connect/Connect";
import Experience from "@/sections/Experience/Experience";
import HeroSection from "@/sections/Hero/Hero";
import Projects from "@/sections/Projects/Project";
import KnowMore from "@/sections/knowMore/knowMore";
import { useState } from "react";

const Home = () => {
  const [funMode, setFunMode] = useState(false);
  return (
    <div className="bg-[#111]">
      <HeroSection funMode={funMode} setFunMode={setFunMode} />
      {funMode ? (
        <div className="z-50 relative flex justify-end items-center gap-2 p-2 mr-3">
          <Toggle onChange={(value: boolean) => setFunMode(value)} />
        </div>
      ) : (
        <>
          <TowerBlocks />
          <Experience />
          <CompiledThoughts />
          <Projects />
          {/* <InteractiveCards /> */}
          <CountryMarque />
          <KnowMore />
          <Connect />
          <BubbleFooter />
        </>
      )}
    </div>
  );
};

export default Home;
