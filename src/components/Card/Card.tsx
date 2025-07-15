import React, { useState, useRef, useEffect } from "react";

const Card = ({ dataImage, header, content }) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const mouseLeaveTimeoutRef = useRef(null);

  useEffect(() => {
    if (cardRef.current) {
      const { offsetWidth, offsetHeight } = cardRef.current;
      setDimensions({ width: offsetWidth, height: offsetHeight });
    }
  }, []);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - dimensions.width / 2;
    const y = e.clientY - rect.top - dimensions.height / 2;

    setMouse({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (mouseLeaveTimeoutRef.current) {
      clearTimeout(mouseLeaveTimeoutRef.current);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseLeaveTimeoutRef.current = setTimeout(() => {
      setMouse({ x: 0, y: 0 });
    }, 1000);
  };

  const mousePX = dimensions.width ? mouse.x / dimensions.width : 0;
  const mousePY = dimensions.height ? mouse.y / dimensions.height : 0;

  const cardStyle = {
    transform: `rotateY(${mousePX * 30}deg) rotateX(${mousePY * -30}deg)`,
  };

  const cardBgStyle = {
    transform: `translateX(${mousePX * -40}px) translateY(${mousePY * -40}px)`,
    backgroundImage: `url(${dataImage})`,
  };

  return (
    <div
      ref={cardRef}
      className={`card-wrap ${isHovered ? "hovered" : ""}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="card" style={cardStyle}>
        <div className="card-bg" style={cardBgStyle}></div>
        <div className="card-info">
          <h1>{header}</h1>
          <p>{content}</p>
        </div>
      </div>
    </div>
  );
};

export default function InteractiveCards() {
  return (
    <div className="app">
      <style jsx>{`
        .app {
          margin: 40px 0;
          font-family: "Raleway", sans-serif;
          font-size: 14px;
          font-weight: 500;
          background-color: #bcaaa4;
          -webkit-font-smoothing: antialiased;
          min-height: 100vh;
        }

        .title {
          font-family: "Raleway", sans-serif;
          font-size: 24px;
          font-weight: 700;
          color: #5d4037;
          text-align: center;
          margin-bottom: 40px;
        }

        .container {
          padding: 40px 80px;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
        }

        .card-wrap {
          margin: 10px;
          transform: perspective(800px);
          transform-style: preserve-3d;
          cursor: pointer;
          transition: all 0.6s cubic-bezier(0.445, 0.05, 0.55, 0.95);
        }

        .card-wrap.hovered .card-info {
          transform: translateY(0);
        }

        .card-wrap.hovered .card-info p {
          opacity: 1;
        }

        .card-wrap.hovered .card-info,
        .card-wrap.hovered .card-info p {
          transition: 0.6s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .card-wrap.hovered .card-info:after {
          transition: 5s cubic-bezier(0.23, 1, 0.32, 1);
          opacity: 1;
          transform: translateY(0);
        }

        .card-wrap.hovered .card-bg {
          transition: 0.6s cubic-bezier(0.23, 1, 0.32, 1),
            opacity 5s cubic-bezier(0.23, 1, 0.32, 1);
          opacity: 0.8;
        }

        .card-wrap.hovered .card {
          transition: 0.6s cubic-bezier(0.23, 1, 0.32, 1),
            box-shadow 2s cubic-bezier(0.23, 1, 0.32, 1);
          box-shadow: rgba(255, 255, 255, 0.2) 0 0 40px 5px,
            rgba(255, 255, 255, 1) 0 0 0 1px, rgba(0, 0, 0, 0.66) 0 30px 60px 0,
            inset #333 0 0 0 5px, inset white 0 0 0 6px;
        }

        .card {
          position: relative;
          flex: 0 0 240px;
          width: 240px;
          height: 320px;
          background-color: #333;
          overflow: hidden;
          border-radius: 10px;
          box-shadow: rgba(0, 0, 0, 0.66) 0 30px 60px 0, inset #333 0 0 0 5px,
            inset rgba(255, 255, 255, 0.5) 0 0 0 6px;
          transition: 1s cubic-bezier(0.445, 0.05, 0.55, 0.95);
        }

        .card-bg {
          opacity: 0.5;
          position: absolute;
          top: -20px;
          left: -20px;
          width: calc(100% + 40px);
          height: calc(100% + 40px);
          background-repeat: no-repeat;
          background-position: center;
          background-size: cover;
          transition: 1s cubic-bezier(0.445, 0.05, 0.55, 0.95),
            opacity 5s 1s cubic-bezier(0.445, 0.05, 0.55, 0.95);
          pointer-events: none;
        }

        .card-info {
          padding: 20px;
          position: absolute;
          bottom: 0;
          color: #fff;
          transform: translateY(40%);
          transition: 0.6s 1.6s cubic-bezier(0.215, 0.61, 0.355, 1);
          z-index: 1;
        }

        .card-info p {
          opacity: 0;
          text-shadow: rgba(0, 0, 0, 1) 0 2px 3px;
          transition: 0.6s 1.6s cubic-bezier(0.215, 0.61, 0.355, 1);
          line-height: 1.5em;
          margin-top: 10px;
        }

        .card-info * {
          position: relative;
          z-index: 1;
        }

        .card-info:after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          z-index: 0;
          width: 100%;
          height: 100%;
          background-image: linear-gradient(
            to bottom,
            transparent 0%,
            rgba(0, 0, 0, 0.6) 100%
          );
          background-blend-mode: overlay;
          opacity: 0;
          transform: translateY(100%);
          transition: 5s 1s cubic-bezier(0.445, 0.05, 0.55, 0.95);
        }

        .card-info h1 {
          font-family: "Playfair Display", serif;
          font-size: 36px;
          font-weight: 700;
          text-shadow: rgba(0, 0, 0, 0.5) 0 10px 10px;
          margin: 0;
        }

        @media (max-width: 768px) {
          .container {
            padding: 20px 40px;
          }

          .card-wrap {
            margin: 5px;
          }
        }
      `}</style>

      <h1 className="title">Hover over the card</h1>
      <div className="container">
        <Card
          dataImage="https://images.unsplash.com/photo-1479660656269-197ebb83b540?dpr=2&auto=compress,format&fit=crop&w=1199&h=798&q=80&cs=tinysrgb&crop="
          header="Canyons"
          content="Lorem ipsum dolor sit amet, consectetur adipisicing elit."
        />
      </div>
    </div>
  );
}
