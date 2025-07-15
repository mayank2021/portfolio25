import React from "react";

const FlowerAnimation = () => {
  // Create 18 petals (boxes 1-18)
  const petals = Array.from({ length: 18 }, (_, i) => i + 1);

  return (
    <div className="w-full flex items-center justify-center overflow-hidden">
      <style jsx>{`
        .box {
          position: absolute;
          top: 36px;
          right: 40px;
          width: 20px;
          height: 10px;
          background: hsla(30, 100%, 50%, 0.25);
          border: 1px solid orange;
          animation: blossom 4s ease-in-out infinite;
          border-radius: 50% / 10px;
          transform-origin: left center;
        }

        .box1 {
          transform: rotateZ(0deg);
        }
        .box2 {
          transform: rotateZ(20deg);
        }
        .box3 {
          transform: rotateZ(40deg);
        }
        .box4 {
          transform: rotateZ(60deg);
        }
        .box5 {
          transform: rotateZ(80deg);
        }
        .box6 {
          transform: rotateZ(100deg);
        }
        .box7 {
          transform: rotateZ(120deg);
        }
        .box8 {
          transform: rotateZ(140deg);
        }
        .box9 {
          transform: rotateZ(160deg);
        }
        .box10 {
          transform: rotateZ(180deg);
        }
        .box11 {
          transform: rotateZ(200deg);
        }
        .box12 {
          transform: rotateZ(220deg);
        }
        .box13 {
          transform: rotateZ(240deg);
        }
        .box14 {
          transform: rotateZ(260deg);
        }
        .box15 {
          transform: rotateZ(280deg);
        }
        .box16 {
          transform: rotateZ(300deg);
        }
        .box17 {
          transform: rotateZ(320deg);
        }
        .box18 {
          transform: rotateZ(340deg);
        }

        @keyframes blossom {
          50% {
            transform: rotateZ(0deg) rotateX(180deg);
            opacity: 0.1;
          }
        }
      `}</style>

      <div>
        {petals.map((i) => (
          <div key={i} className={`box box${i}`}></div>
        ))}
      </div>
    </div>
  );
};

export default FlowerAnimation;
