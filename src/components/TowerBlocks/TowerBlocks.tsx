import { useEffect, useRef, useState } from "react";
import "./styles.css";
import { Game } from "./block";
import LeaderboardForm from "../LeaderboardForm";

interface LeaderboardEntry {
  id: string;
  username: string;
  score: number;
  timestamp: string;
}

interface TowerBlocksProps {
  leaderboardEntries?: LeaderboardEntry[];
  onLeaderboardSubmit?: (entry: LeaderboardEntry) => void;
}

export default function TowerBlocks({ onLeaderboardSubmit }: TowerBlocksProps) {
  const gameRef = useRef<Game | null>(null);
  const [showLeaderboardForm, setShowLeaderboardForm] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [hasSubmittedReview, setHasSubmittedReview] = useState(false);

  const handleGameEnd = (score: number) => {
    setFinalScore(score);
    // Reset review submission status for new game
    setHasSubmittedReview(false);
  };

  const handleLeaderboardSubmit = (data: {
    email: string;
    username: string;
  }) => {
    const newEntry: LeaderboardEntry = {
      id: Date.now().toString(),
      username: data.username,
      score: finalScore,
      timestamp: new Date().toISOString(),
    };

    // Add to leaderboard via prop callback
    if (onLeaderboardSubmit) {
      onLeaderboardSubmit(newEntry);
    }

    // Mark as submitted and close the form
    setHasSubmittedReview(true);
    setShowLeaderboardForm(false);

    // Here you would typically send the data to your backend
    console.log("Leaderboard submission:", newEntry);

    // You can add API call here in the future
    // Example: submitToLeaderboard(newEntry);
  };

  const handleLeaderboardClose = () => {
    setShowLeaderboardForm(false);
  };

  useEffect(() => {
    // Cleanup any existing game instance
    if (gameRef.current) {
      gameRef.current.destroy();
    }

    // Reset game state for new session
    setFinalScore(0);
    setHasSubmittedReview(false);
    setShowLeaderboardForm(false);

    // Small delay to ensure container has proper dimensions
    const timer = setTimeout(() => {
      gameRef.current = new Game(handleGameEnd);
    }, 100);

    // Cleanup function
    return () => {
      clearTimeout(timer);
      if (gameRef.current) {
        gameRef.current.destroy();
        gameRef.current = null;
      }
    };
  }, []);

  // Effect to manage game input when leaderboard form is shown/hidden
  useEffect(() => {
    if (gameRef.current) {
      gameRef.current.setInputDisabled(showLeaderboardForm);
    }
  }, [showLeaderboardForm]);

  return (
    <div className="relative w-full h-full min-h-[600px] min-w-[800px]">
      <div id="container" className="text-white w-full h-full">
        <div id="game" className="w-full h-full"></div>
        <div id="score">0</div>
        <div id="instructions">
          Click (or press the spacebar) to place the block
        </div>
        <div className="game-over">
          <p className="font-light !text-[#fff] tracking-[0.05em] text-[26px] text-center">
            Game Over
          </p>

          <div className="flex flex-col gap-4 mt-6">
            {!hasSubmittedReview ? (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  // Use the finalScore that was set when game ended
                  if (finalScore > 0) {
                    setShowLeaderboardForm(true);
                  } else {
                    // Fallback: get score from DOM if finalScore wasn't captured
                    const currentScore = parseInt(
                      document.getElementById("score")?.innerText || "0"
                    );
                    setFinalScore(currentScore);
                    setShowLeaderboardForm(true);
                  }
                }}
                className="px-4 py-3 bg-[#5EA239] bg-opacity-70 !text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Submit to Leaderboard
              </button>
            ) : (
              <div className="text-center">
                <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg mb-2">
                  ✅ Score submitted successfully!
                </div>
                <p className="font-light !text-[#fff] tracking-[0.05em] text-[12px] text-center">
                  Your score has been submitted for this game.
                </p>
              </div>
            )}

            <p className="font-light !text-[#fff] tracking-[0.05em] text-[16px] text-center">
              Click or spacebar to start again
            </p>
          </div>
        </div>
        <div className="game-ready">
          <div id="start-button">Start</div>
          <div></div>
        </div>
      </div>

      {/* Leaderboard Form Modal */}
      {showLeaderboardForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
          <LeaderboardForm
            score={finalScore}
            onSubmit={handleLeaderboardSubmit}
            onClose={handleLeaderboardClose}
          />
        </div>
      )}
    </div>
  );
}
