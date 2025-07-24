"use client";

import Ripple from "@/components/Ripple/Ripple";
import React, { useState } from "react";

const content = [
  {
    title: "Leadership & Community",
    description:
      "As Postman Student Leader, Vice Tech Secretary ’21, and Web Dev Lead at IIITT, I led tech-driven initiatives, mentored peers, and actively contributed to growing a collaborative community.",
    img: "leadership.png",
  },
  {
    title: "Teaching & Creations",
    description:
      "I’ve conducted over 10 workshops, published blogs, organized tech events, and created 100+ YouTube videos to simplify complex concepts and share knowledge with aspiring developers.",
    img: "teaching.png",
  },
  {
    title: "Initiatives & Innovation",
    description:
      "I founded Beyond Mess, a food delivery platform solving real campus needs—growing it to 100+ daily orders and 400–500 active users. Alongside, I’ve won two hackathons by building impactful solutions.",
    img: "initiative.png",
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
    <div className="py-20 my-20">
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
              className={`font-light text-[#fff] mr-[120px] tracking-[0.05em] text-[28px] absolute transition-transform duration-1000 ease-in-out ${
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
              <Ripple color="#56d9cd" src={`/images/${img}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
