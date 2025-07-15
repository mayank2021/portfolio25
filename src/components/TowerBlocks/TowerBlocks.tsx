import { useEffect, useRef } from "react";
import "./styles.css";
import { Game } from "./block";

export default function TowerBlocks() {
  const gameRef = useRef<Game | null>(null);

  useEffect(() => {
    // Cleanup any existing game instance
    if (gameRef.current) {
      gameRef.current.destroy();
    }

    // Create new game instance
    gameRef.current = new Game();

    // Cleanup function
    return () => {
      if (gameRef.current) {
        gameRef.current.destroy();
        gameRef.current = null;
      }
    };
  }, []);

  return (
    <div className="relative h-screen">
      <div id="container" className="text-white">
        <div id="game"></div>
        <div id="score">0</div>
        <div id="instructions">
          Click (or press the spacebar) to place the block
        </div>
        <div className="game-over">
          <h2>Game Over</h2>
          <p>You did great, you&apos;re the best.</p>
          <p>Click or spacebar to start again</p>
        </div>
        <div className="game-ready">
          <div id="start-button">Start</div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
