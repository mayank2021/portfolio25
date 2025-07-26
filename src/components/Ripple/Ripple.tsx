import React from "react";

// Demo component showing Twitter-style circular wave animation
const Ripple = ({
  src,
  color = "#56d9cd",
}: {
  src?: string;
  color?: string;
}) => {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative w-32 h-32 max-md:w-12 max-md:h-12 flex items-center justify-center">
          <div className="relative w-20 h-20  rounded-full shadow-lg flex items-center justify-center z-10">
            {src ? (
              <img src={src} className="rounded-full" />
            ) : (
              <span className="text-white text-xl font-bold">🐦</span>
            )}
          </div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className={`animate-ripple-1 absolute w-20 h-20 border-2 opacity-60 rounded-full max-md:w-12 max-md:h-12`}
              style={{ borderColor: color }}
            ></div>
            <div
              className={`animate-ripple-2 absolute w-20 h-20 border-2 opacity-80 rounded-full max-md:w-12 max-md:h-12`}
              style={{ borderColor: color }}
            ></div>
            <div
              className={`animate-ripple-3 absolute w-20 h-20 border-2 rounded-full max-md:w-12 max-md:h-12`}
              style={{ borderColor: color }}
            ></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes ripple {
          0% {
            transform: scale(1);
            opacity: 0.6;
          }
          100% {
            transform: scale(1.8);
            opacity: 0;
          }
        }

        .animate-ripple-1 {
          animation: ripple 2s ease-out infinite;
        }

        .animate-ripple-2 {
          animation: ripple 2s ease-out infinite 0.7s;
        }

        .animate-ripple-3 {
          animation: ripple 2s ease-out infinite 1.4s;
        }
      `}</style>
    </div>
  );
};

export default Ripple;
