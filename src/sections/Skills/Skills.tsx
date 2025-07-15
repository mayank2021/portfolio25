import React from "react";
import { skills } from "../../components/CountryMarque/data";

// Categorize skills based on the original arrays
const languageNames = ["html", "css", "javascript", "typescript", "python"];
const toolsUsedNames = [
  "nextjs",
  "redux",
  "reactjs",
  "redux toolkit",
  "ui/ux(figma)",
  "git",
  "tailwind css",
];
const toolsFamiliarNames = [
  "react-query",
  "material-ui",
  "firebase",
  "fastapi",
  "postgresql",
  "antd components",
];

const Tag = ({
  skill,
  type = "familiar",
}: {
  skill: { name: string; icon: string; style?: string };
  type?: "used" | "familiar";
}) => {
  return (
    <div
      draggable={true}
      className={`border border-white py-2 px-4 rounded-lg tracking-wider uppercase transition-all duration-300 flex items-center gap-2 ${
        type === "used"
          ? "bg-white hover:bg-transparent hover:text-white text-black"
          : "text-white hover:border-transparent"
      }`}
    >
      <img
        src={skill.icon}
        alt={skill.name}
        className={`w-6 h-6 ${skill.style || ""}`}
      />
      <span>{skill.name}</span>
    </div>
  );
};

const Skills = () => {
  const languages = skills.filter((skill) =>
    languageNames.includes(skill.name.toLowerCase())
  );

  const toolsUsed = skills.filter((skill) =>
    toolsUsedNames.includes(skill.name.toLowerCase())
  );

  const toolsFamiliar = skills.filter((skill) =>
    toolsFamiliarNames.includes(skill.name.toLowerCase())
  );

  return (
    <div className="max-w-[1200px] mx-auto">
      <p className="font-light text-[#fff] tracking-[0.05em] text-[26px] text-center mb-8">
        Tech Stack
      </p>
      <div className="flex flex-col gap-4 items-center mb-12">
        <p className="font-light text-[#fff] tracking-[0.05em] text-[20px] text-center">
          Indicators
        </p>
        <div className="flex gap-4">
          <div className="border border-white py-2 px-4 rounded-lg tracking-wider uppercase bg-white text-black flex items-center gap-2">
            <span>Recently used</span>
          </div>
          <div className="border border-white py-2 px-4 rounded-lg tracking-wider uppercase text-white flex items-center gap-2">
            <span>Familiar</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 items-center mb-12">
        <p className="font-light text-[#fff] tracking-[0.05em] text-[20px] text-center">
          Languages
        </p>
        <div className="flex gap-4 flex-wrap justify-center">
          {languages?.map((skill) => (
            <Tag key={skill.name} skill={skill} type="used" />
          ))}
        </div>
      </div>
      <div className="flex flex-col justify-center gap-4 items-center mb-12">
        <p className="font-light text-[#fff] tracking-[0.05em] text-[20px] text-center">
          Technologies
        </p>
        <div className="flex gap-4 flex-wrap justify-center">
          {toolsUsed?.map((skill) => (
            <Tag key={skill.name} skill={skill} type="used" />
          ))}
        </div>
        <div className="flex gap-4 flex-wrap justify-center">
          {toolsFamiliar?.map((skill) => (
            <Tag key={skill.name} skill={skill} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;
