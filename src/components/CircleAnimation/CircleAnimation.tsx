import { cn } from "@/libs/utils/util";
import React from "react";

const AnimatedCircles = ({
  text,
  textStyle,
  src,
  className,
  width = 50,
  height = 50,
  children,
}: {
  text?: string;
  textStyle?: string;
  src?: string;
  className?: string;
  width?: number;
  height?: number;
  children?: React.ReactNode;
}) => {
  return (
    <>
      <style jsx>{`
        .circles {
          height: ${width}px;
          width: ${height}px;
        }

        .circle {
          box-sizing: border-box;
          border-width: 0.5vmin;
          border-style: solid;
          border-color: transparent;
          border-radius: 200% 250% 300% 180% / 220% 280% 190% 240%;
          mix-blend-mode: screen;
        }

        .circle:nth-child(1) {
          border-color: #db4437;
          transform-origin: 50% 50%;
          animation: spin1 5.5s linear infinite;
        }

        .circle:nth-child(2) {
          border-color: #f4b400;
          transform-origin: 50% 50%;
          animation: spin2 5.5s linear infinite;
        }

        .circle:nth-child(3) {
          border-color: #4285f4;
          transform-origin: 50% 50%;
          animation: spin3 5.5s linear infinite;
        }

        .circle:nth-child(4) {
          border-color: #0f9d58;
          transform-origin: 50% 50%;
          animation: spin4 5.5s linear infinite;
        }

        @keyframes spin1 {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes spin2 {
          0% {
            transform: rotate(72deg);
          }
          100% {
            transform: rotate(-288deg);
          }
        }

        @keyframes spin3 {
          0% {
            transform: rotate(-144deg);
          }
          100% {
            transform: rotate(216deg);
          }
        }

        @keyframes spin4 {
          0% {
            transform: rotate(216deg);
          }
          100% {
            transform: rotate(-144deg);
          }
        }
        }
      `}</style>

      <div
        className={cn("bg-black flex items-center justify-center", className)}
      >
        <div className="circles relative">
          <div className="circle absolute w-full h-full"></div>
          <div className="circle absolute w-full h-full"></div>
          <div className="circle absolute w-full h-full"></div>
          <div className="circle absolute w-full h-full"></div>

          <div
            className={cn(
              "absolute flex justify-center items-center w-[75%] h-[75%] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center"
            )}
          >
            {children ? children : null}
            {text && <p className={textStyle}>{text}</p>}
            {src && <img src={src} className={`rounded-full`} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default AnimatedCircles;
