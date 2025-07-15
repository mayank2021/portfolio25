"use client";

import { useEffect, useState } from "react";

interface TypingAnimationProps {
  text: string;
  className?: string;
  delay?: number; // Delay in milliseconds before starting the animation
  direction?: "ltr" | "rtl"; // left-to-right or right-to-left
}

const TypingAnimation = ({
  text,
  className = "",
  delay = 0,
  direction = "ltr",
}: TypingAnimationProps) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    // Initial delay before starting the animation
    const startTimeout = setTimeout(() => {
      setStarted(true);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [delay]);

  useEffect(() => {
    if (started && currentIndex < text.length) {
      const timeout = setTimeout(() => {
        if (direction === "ltr") {
          setDisplayText((prev) => prev + text[currentIndex]);
        } else {
          setDisplayText((prev) => text[text.length - 1 - currentIndex] + prev);
        }
        setCurrentIndex((prev) => prev + 1);
      }, 60); // Adjust typing speed here (lower = faster)

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, started, direction]);

  return <p className={className}>{displayText}</p>;
};

export default TypingAnimation;
