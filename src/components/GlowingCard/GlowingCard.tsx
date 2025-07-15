"use client";
import React, { useEffect } from "react";
import "./styles.css";
import { useRouter } from "next/navigation";

const GlowingCard = () => {
  const router = useRouter();
  useEffect(() => {
    // Check for CSS.registerProperty support
    if (
      typeof window !== "undefined" &&
      typeof window.CSS?.registerProperty === "function"
    ) {
      console.log("CSS.registerProperty supported 🎉");

      // Register custom properties for animations
      const properties = [
        { name: "--hue", syntax: "<number>", initialValue: "0" },
        { name: "--rotate", syntax: "<number>", initialValue: "0" },
        { name: "--bg-y", syntax: "<number>", initialValue: "0" },
        { name: "--bg-x", syntax: "<number>", initialValue: "0" },
        { name: "--glow-translate-y", syntax: "<number>", initialValue: "0" },
        { name: "--bg-size", syntax: "<number>", initialValue: "0" },
        { name: "--glow-opacity", syntax: "<number>", initialValue: "0" },
        { name: "--glow-blur", syntax: "<number>", initialValue: "0" },
        { name: "--glow-scale", syntax: "<number>", initialValue: "2" },
        { name: "--glow-radius", syntax: "<number>", initialValue: "2" },
        { name: "--white-shadow", syntax: "<number>", initialValue: "0" },
      ];

      properties.forEach((prop) => {
        try {
          window.CSS.registerProperty({
            name: prop.name,
            syntax: prop.syntax,
            inherits: true,
            initialValue: prop.initialValue,
          });
        } catch (_e) {
          console.log(_e);
          // Property already registered or other error
        }
      });
    } else {
      console.log("CSS.registerProperty not supported ❌");
    }
  }, []);

  return (
    <div className="h-[600px] w-[1100px] mx-auto flex items-center justify-center font-mono relative group">
      <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.2)] blur-[100px] z-10"></div>
      <div
        role="button"
        className="glow-card text-white mx-auto flex items-center justify-center"
        tabIndex={0}
        onClick={() => router.push("/beyond-mess")}
      >
        <span className="glow"></span>
        <div className="card-content">
          <div className="border-white w-full h-full">
            <img
              className="w-[70%] mx-auto h-full object-cover"
              src="/images/beyond_mess.png"
              alt="beyond mess"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlowingCard;
