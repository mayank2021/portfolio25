import React from "react";

interface SlidingTextProps {
  words?: string[];
}

const AnimatedText: React.FC<SlidingTextProps> = ({
  words = [
    "Commit",
    "Push",
    "Deploy",
    "Design",
    "Develop",
    "Deliver",
    "Hack",
    "Ship",
    "Sleep",
    "Code",
    "Debug",
    "Create",
    "Think",
    "Code",
    "Refactor",
    "Plan",
    "Build",
    "Iterate",
    "Pixels",
    "Logic",
    "Flow",
    "Idea",
    "Code",
    "Impact",
  ],
}) => {
  return (
    <div className="flex items-center justify-center">
      <div className="relative overflow-hidden uppercase text-[20px] leading-10 text-gray-100 h-10">
        <div className="relative font-light overflow-hidden h-10 tracking-[3px]">
          <ul className="flex flex-col animate-text-slide text-center list-none">
            {words.map((word, index) => (
              <li key={index}>{word}</li>
            ))}
          </ul>
        </div>
      </div>

      <style jsx>{`
        @keyframes text-slide {
          0% {
            transform: translateY(0%);
          }
          100% {
            transform: translateY(-92%);
          }
        }

        .animate-text-slide {
          animation: text-slide 25s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default AnimatedText;
