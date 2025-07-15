"use client";

import "./styles.css";

export default function MontserratText() {
  return (
    <div className="montserrat-container flex items-center justify-center">
      <svg viewBox="0 0 840 180" className="block w-[840px] h-[180px]">
        <symbol id="s-text">
          <text textAnchor="middle" x="50%" y="80%">
            Mayank
          </text>
        </symbol>
        <g className="g-ants">
          {[...Array(5)].map((_, i) => (
            <use key={i} xlinkHref="#s-text" className="text-copy" />
          ))}
        </g>
      </svg>
    </div>
  );
}
