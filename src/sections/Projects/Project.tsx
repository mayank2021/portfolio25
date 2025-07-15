"use client";

import Ripple from "@/components/Ripple/Ripple";
import React, { useState } from "react";

const src =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQj8Xtj2QC5ru7eyRvchnCVppxifpKcuCalQQ&s";

const content = [
  {
    title: "Student Leader | Postman",
    description:
      "Helped the community folks by solving their doubts and provided the needed guidance",
    img: src,
  },
  {
    title: "Vice Tech Secretary’21 | IIITT",
    description:
      "Organized several tech events/fest, managed tech clubs, and represented all students",
    img: src,
  },
  {
    title: "Web Dev Lead | IIITT",
    description:
      "Contributed to the college's software, delivered 20+ workshops, and led the club to wards growth",
    img: src,
  },
  {
    title: "Won 2 Hackathons",
    description:
      "For projects, Todogenix(a personal assistant) and Heal(a disease symptom checker )",
    img: src,
  },
];

const getBorder = (ind: number) => {
  const isFirst = ind === 0;

  if (isFirst) return "border-y border-white";
  else return "border-b border-white";
};

const Projects = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="h-screen">
      <p className="font-light text-[#fff] tracking-[0.05em] text-[26px] text-center mb-8">
        Leadership & Achievement
      </p>
      <div>
        {content?.map(({ title, description, img }, ind) => (
          <div
            key={title}
            className={`${getBorder(
              ind
            )} py-6 px-4  relative overflow-hidden h-[160px] flex flex-col justify-center`}
            onMouseEnter={() => setHoveredIndex(ind)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <p
              className={`font-bold text-[#fff] tracking-[0.05em] text-[58px] absolute transition-transform duration-1000 ease-in-out ${
                hoveredIndex === ind ? "-translate-y-[300%]" : "translate-y-0"
              }`}
            >
              {title}
            </p>
            <p
              className={`font-light text-[#fff] tracking-[0.05em] text-[28px] absolute transition-transform duration-1000 ease-in-out ${
                hoveredIndex === ind ? "translate-y-0" : "translate-y-[300%]"
              }`}
            >
              {description}
            </p>
            <div
              className={`rounded-full absolute right-[16px] top-1/2  -translate-y-1/2 transition-all duration-1000 ease-in-out ${
                hoveredIndex === ind
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-0"
              }`}
            >
              <Ripple color="#56d9cd" src={img} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
