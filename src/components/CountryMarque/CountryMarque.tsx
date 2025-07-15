import React, { useState } from "react";
import { skills } from "./data";
import Modal from "../Modal/Modal";
import Skills from "@/sections/Skills/Skills";

const dot = (
  <svg
    width="6"
    height="6"
    viewBox="0 0 6 6"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2.90907 0.598634C3.37452 0.598634 3.79343 0.70724 4.1658 0.924452C4.53816 1.14166 4.83295 1.43645 5.05016 1.80882C5.26737 2.18118 5.37598 2.60009 5.37598 3.06554C5.37598 3.51548 5.26737 3.93439 5.05016 4.32227C4.83295 4.69463 4.53816 4.98942 4.1658 5.20663C3.79343 5.42385 3.37452 5.53245 2.90907 5.53245C2.45913 5.53245 2.04022 5.42385 1.65234 5.20663C1.27998 4.98942 0.98519 4.69463 0.767978 4.32227C0.550766 3.93439 0.44216 3.51548 0.44216 3.06554C0.44216 2.60009 0.550766 2.18118 0.767978 1.80882C0.98519 1.43645 1.27998 1.14166 1.65234 0.924452C2.04022 0.70724 2.45913 0.598634 2.90907 0.598634Z"
      fill="white"
      fill-opacity="0.7"
    />
  </svg>
);

const firstRow = [...skills, ...skills, ...skills];
const secondRow = [...skills, ...skills, ...skills];
const thirdRow = [...skills, ...skills, ...skills];
const fourthRow = [...skills, ...skills, ...skills];
const fifthRow = [...skills, ...skills, ...skills];

const CountryMarque = () => {
  const [showSkillsModal, setShowSkillsModal] = useState(false);
  return (
    <div className="w-full bg-[#101010] py-8">
      <p className="font-light text-[#fff] tracking-[0.05em] text-[26px] text-center mb-8">
        Tech Stack
      </p>
      <div className="space-y-8 py-5">
        {/* First row - scrolling right */}
        <div className="relative overflow-hidden">
          <div className="flex w-fit animate-scroll-right hover-pause-row">
            {firstRow.map((university, index) => (
              <div
                key={`right-${index}`}
                className="flex items-center hover-trigger cursor-pointer"
                onClick={() => setShowSkillsModal(true)}
              >
                <div className="flex rounded-[14px] flex-shrink-0 items-center border border-[rgba(255,255,255,0.12)] bg-transparent px-5 py-2 max-md:py-2 max-md:px-[18px] text-white hover-card-animation">
                  <span className="mr-3 text-xl">
                    <img
                      className={`w-7 h-7 max-md:w-5 max-md:h-5 ${university.style}`}
                      src={university.icon}
                      alt={university.name}
                    />
                    {/* {university.icon("w-7 h-7 max-md:w-5 max-md:h-5")} */}
                  </span>
                  <span className="whitespace-nowrap text-[20px] max-md:text-[14px] text-[rgba(255,255,255,0.7)] uppercase">
                    {university.name}
                  </span>
                </div>

                <span className="pr-10 pl-3">{dot}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Second row - scrolling left */}
        <div className="relative overflow-hidden">
          <div className="flex w-fit animate-scroll-left hover-pause-row">
            {secondRow.map((university, index) => (
              <div
                key={`right-${index}`}
                className="flex items-center hover-trigger cursor-pointer"
                onClick={() => setShowSkillsModal(true)}
              >
                <div className="flex rounded-[14px] flex-shrink-0 items-center border border-[rgba(255,255,255,0.12)] bg-transparent px-5 py-2 max-md:py-2 max-md:px-[18px] text-white hover-card-animation">
                  <span className="mr-3 text-xl">
                    <img
                      className={`w-7 h-7 max-md:w-5 max-md:h-5 ${university.style}`}
                      src={university.icon}
                      alt={university.name}
                    />
                    {/* {university.icon("w-7 h-7 max-md:w-5 max-md:h-5")} */}
                  </span>
                  <span className="whitespace-nowrap text-[20px] max-md:text-[14px] text-[rgba(255,255,255,0.7)] uppercase">
                    {university.name}
                  </span>
                </div>

                <span className="pr-10 pl-3">{dot}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Third row - scrolling right */}
        <div className="relative overflow-hidden">
          <div className="flex w-fit animate-scroll-right hover-pause-row">
            {thirdRow.map((university, index) => (
              <div
                key={`right-${index}`}
                className="flex items-center hover-trigger cursor-pointer"
                onClick={() => setShowSkillsModal(true)}
              >
                <div className="flex rounded-[14px] flex-shrink-0 items-center border border-[rgba(255,255,255,0.12)] bg-transparent px-5 py-2 max-md:py-2 max-md:px-[18px] text-white hover-card-animation">
                  <span className="mr-3 text-xl">
                    <img
                      className={`w-7 h-7 max-md:w-5 max-md:h-5 ${university.style}`}
                      src={university.icon}
                      alt={university.name}
                    />
                    {/* {university.icon("w-7 h-7 max-md:w-5 max-md:h-5")} */}
                  </span>
                  <span className="whitespace-nowrap text-[20px] max-md:text-[14px] text-[rgba(255,255,255,0.7)] uppercase">
                    {university.name}
                  </span>
                </div>

                <span className="pr-10 pl-3">{dot}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Fourth row - scrolling left */}
        <div className="relative overflow-hidden">
          <div className="flex w-fit animate-scroll-left hover-pause-row">
            {fourthRow.map((university, index) => (
              <div
                key={`right-${index}`}
                className="flex items-center hover-trigger cursor-pointer"
                onClick={() => setShowSkillsModal(true)}
              >
                <div className="flex rounded-[14px] flex-shrink-0 items-center border border-[rgba(255,255,255,0.12)] bg-transparent px-5 py-2 max-md:py-2 max-md:px-[18px] text-white hover-card-animation">
                  <span className="mr-3 text-xl">
                    <img
                      className={`w-7 h-7 max-md:w-5 max-md:h-5 ${university.style}`}
                      src={university.icon}
                      alt={university.name}
                    />
                    {/* {university.icon("w-7 h-7 max-md:w-5 max-md:h-5")} */}
                  </span>
                  <span className="whitespace-nowrap text-[20px] max-md:text-[14px] text-[rgba(255,255,255,0.7)] uppercase">
                    {university.name}
                  </span>
                </div>

                <span className="pr-10 pl-3">{dot}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Fifth row - scrolling right */}
        <div className="relative overflow-hidden">
          <div className="flex w-fit animate-scroll-right hover-pause-row">
            {fifthRow.map((university, index) => (
              <div
                key={`right-${index}`}
                className="flex items-center hover-trigger cursor-pointer"
                onClick={() => setShowSkillsModal(true)}
              >
                <div className="flex rounded-[14px] flex-shrink-0 items-center border border-[rgba(255,255,255,0.12)] bg-transparent px-5 py-2 max-md:py-2 max-md:px-[18px] text-white hover-card-animation">
                  <span className="mr-3 text-xl">
                    <img
                      className={`w-7 h-7 max-md:w-5 max-md:h-5 ${university.style}`}
                      src={university.icon}
                      alt={university.name}
                    />
                    {/* {university.icon("w-7 h-7 max-md:w-5 max-md:h-5")} */}
                  </span>
                  <span className="whitespace-nowrap text-[20px] max-md:text-[14px] text-[rgba(255,255,255,0.7)] uppercase">
                    {university.name}
                  </span>
                </div>

                <span className="pr-10 pl-3">{dot}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-right {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-33.333%);
          }
        }

        @keyframes scroll-left {
          from {
            transform: translateX(-33.333%);
          }
          to {
            transform: translateX(0);
          }
        }

        .animate-scroll-right {
          animation: scroll-right 80s linear infinite;
        }

        .animate-scroll-left {
          animation: scroll-left 80s linear infinite;
        }

        .hover-pause-row:hover {
          animation-play-state: paused;
        }

        .hover-pause-row:has(.hover-trigger:hover) {
          animation-play-state: paused;
        }

        .hover-card-animation {
          transition: all 0.3s ease;
        }

        .hover-card-animation:hover {
          border-color: rgba(255, 255, 255, 0.5);
          background-color: rgba(255, 255, 255, 0.05);
          box-shadow: 0 4px 12px rgba(255, 255, 255, 0.1);
        }
      `}</style>
      <Modal isOpen={showSkillsModal} onClose={() => setShowSkillsModal(false)}>
        <div className="w-full h-[calc(100vh-84px)] flex items-center justify-center">
          <Skills />
        </div>
      </Modal>
    </div>
  );
};

export default CountryMarque;
