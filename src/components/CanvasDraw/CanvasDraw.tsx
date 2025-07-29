"use client";

import { useEffect, useRef } from "react";

export default function CanvasTrail() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let mouseX = 0;
    let mouseY = 0;
    let px = 0;
    let py = 0;
    let size = 0;
    let red = 0;
    let green = 255;
    let blue = 255;
    let spread = 4;

    const SPEED_X = 0.15;
    const SPEED_Y = 0.15;
    const MAX_LENGTH = 120;
    const RED_STEP = 0.02;
    const GREEN_STEP = 0.015;
    const BLUE_STEP = 0.025;

    class Point {
      constructor(
        public x: number,
        public y: number,
        public dx: number,
        public dy: number,
        public size: number,
        public color: string
      ) {}

      spread() {
        this.x += this.dx;
        this.y += this.dy;
      }
    }

    const points: Point[] = [];

    function drawLines() {
      const total = points.length;
      for (let i = total - 1; i > 1; i--) {
        const p0 = points[i];
        const p1 = points[i - 1];
        const p2 = points[i - 2];

        if (!context) return;
        context.beginPath();
        context.strokeStyle = p0.color;
        context.lineWidth = p0.size;
        context.globalAlpha = i / total;
        context.moveTo((p1.x + p0.x) / 2, (p1.y + p0.y) / 2);
        context.quadraticCurveTo(
          p1.x,
          p1.y,
          (p1.x + p2.x) / 2,
          (p1.y + p2.y) / 2
        );
        context.stroke();

        p0.spread();
      }

      points[0]?.spread();
      points[total - 1]?.spread();
    }

    function draw() {
      if (!context || !canvas) return;
      let dx = (mouseX - px) * SPEED_X;
      let dy = (mouseY - py) * SPEED_Y;

      dx = Math.max(-spread, Math.min(spread, dx));
      dy = Math.max(-spread, Math.min(spread, dy));

      px = mouseX;
      py = mouseY;

      points.push(
        new Point(
          px,
          py,
          dx,
          dy,
          Math.abs(Math.sin((size += 0.125)) * 10) + 1,
          `rgb(${Math.floor(
            Math.sin((red += RED_STEP)) * 128 + 128
          )},${Math.floor(
            Math.sin((green += GREEN_STEP)) * 128 + 128
          )},${Math.floor(Math.sin((blue += BLUE_STEP)) * 128 + 128)})`
        )
      );

      if (points.length > MAX_LENGTH) points.shift();

      context.globalCompositeOperation = "source-over";
      context.globalAlpha = 1;
      context.fillStyle = "rgba(0, 0, 0, 0.05)";
      context.fillRect(0, 0, canvas.width, canvas.height);

      context.globalCompositeOperation = "lighter";
      drawLines();
      drawLines();
      drawLines();
    }

    function update() {
      requestAnimationFrame(update);
      draw();
    }

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function init() {
      if (!canvas) return;
      canvas.onmousemove = (e) => {
        mouseX = e.pageX;
        mouseY = e.pageY;
      };

      document.onmouseenter = (e) => {
        mouseX = e.pageX;
        mouseY = e.pageY;
        points.forEach((p) => {
          p.x = mouseX;
          p.y = mouseY;
        });
      };

      canvas.ontouchmove = (e) => {
        if (e.targetTouches.length > 0) {
          mouseX = e.targetTouches[0].pageX;
          mouseY = e.targetTouches[0].pageY;
          spread = 1;
        }
      };

      canvas.ontouchstart = (e) => {
        if (e.targetTouches.length > 0) {
          spread = 0;
          mouseX = e.targetTouches[0].pageX;
          mouseY = e.targetTouches[0].pageY;
          points.forEach((p) => {
            p.x = mouseX;
            p.y = mouseY;
          });
        }
        // Only preventDefault if e.target is an Element and does not have href
        const target = e.target as Element | null;
        if (target && !(target instanceof HTMLAnchorElement && target.href)) {
          e.preventDefault();
        }
      };

      window.addEventListener("resize", resize);
      resize();

      mouseX = (canvas?.width ?? window.innerWidth) / 2;
      mouseY = (canvas?.height ?? window.innerHeight) / 2;

      update();
    }

    init();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full cursor-pointer select-none"
    />
  );
}
