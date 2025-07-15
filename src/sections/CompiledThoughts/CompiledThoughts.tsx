import GlowingCard from "@/components/GlowingCard/GlowingCard";
import React from "react";

const CompiledThoughts = () => {
  return (
    <div className="min-h-screen py-16 relative text-white">
      <p className="font-light text-[#fff] tracking-[0.05em] text-[26px] text-center mb-16">
        Compiled Thoughts
      </p>
      <div>
        <GlowingCard />
      </div>
    </div>
  );
};

export default CompiledThoughts;
