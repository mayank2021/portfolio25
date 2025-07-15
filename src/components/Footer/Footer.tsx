import React, { useMemo } from "react";

const BubbleFooter = () => {
  // Generate bubble data with random properties
  const bubbleData = useMemo(
    () =>
      Array.from({ length: 128 }, (_, i) => ({
        id: i,
        size: 2 + Math.random() * 4,
        distance: 6 + Math.random() * 4,
        position: -5 + Math.random() * 110,
        time: 2 + Math.random() * 2,
        delay: -1 * (2 + Math.random() * 2),
      })),
    []
  );

  return (
    <>
      <footer className="footer">
        <div className="bubbles">
          {bubbleData.map((bubble) => (
            <div
              key={bubble.id}
              className="bubble"
              style={
                {
                  left: `${bubble.position}%`,
                  animationDuration: `${bubble.time}s, ${bubble.time}s`,
                  animationDelay: `${bubble.delay}s, ${bubble.delay}s`,
                  "--bubble-size": `${bubble.size}rem`,
                  "--bubble-distance": `${bubble.distance}rem`,
                } as React.CSSProperties
              }
            />
          ))}
        </div>
        <div className="content">
          <div className="links-container">
            <p
              style={{
                color: "black",
              }}
            >
              hello world
            </p>
          </div>
          <div className="brand-section  text-black">
            <p
              style={{
                color: "black",
              }}
            >
              hello world
            </p>
          </div>
        </div>
      </footer>

      {/* SVG Filter for blob effect */}
      <svg style={{ position: "fixed", top: "100vh", width: 0, height: 0 }}>
        <defs>
          <filter id="blob">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="blob"
            />
          </filter>
        </defs>
      </svg>

      <style jsx>{`
        .footer {
          z-index: 1;
          --footer-background: #fff;
          display: grid;
          position: relative;
          height: 12rem;
        }

        .bubbles {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1rem;
          background: var(--footer-background);
          filter: url("#blob");
        }

        .bubble {
          position: absolute;
          background: var(--footer-background);
          border-radius: 100%;
          animation-name: bubble-size, bubble-move;
          animation-timing-function: ease-in, ease-in;
          animation-iteration-count: infinite, infinite;
          animation-fill-mode: both, both;
          transform: translate(-50%, 100%);
        }

        .content {
          z-index: 2;
          display: grid;
          grid-template-columns: 1fr auto;
          grid-gap: 4rem;
          padding: 2rem;
          background: var(--footer-background);
        }

        .content a,
        .content p {
          color: #f5f7fa;
          text-decoration: none;
        }

        .content strong {
          color: white;
        }

        .content p {
          margin: 0;
          font-size: 0.75rem;
        }

        .links-container {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .link-column {
          margin: 0.25rem 0;
        }

        .link-column > * {
          margin-right: 0.5rem;
        }

        .brand-section {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .image {
          align-self: center;
          width: 4rem;
          height: 4rem;
          margin: 0.25rem 0;
          background-size: cover;
          background-position: center;
        }

        @keyframes bubble-size {
          0%,
          75% {
            width: var(--bubble-size, 4rem);
            height: var(--bubble-size, 4rem);
          }
          100% {
            width: 0rem;
            height: 0rem;
          }
        }

        @keyframes bubble-move {
          0% {
            bottom: -4rem;
          }
          100% {
            bottom: var(--bubble-distance, 10rem);
          }
        }

        /* Responsive design */
        @media (max-width: 768px) {
          .content {
            grid-template-columns: 1fr;
            grid-gap: 2rem;
          }

          .links-container {
            flex-direction: row;
            flex-wrap: wrap;
            gap: 1rem;
          }

          .link-column {
            flex: 1;
            min-width: 120px;
          }
        }
      `}</style>
    </>
  );
};

export default BubbleFooter;
