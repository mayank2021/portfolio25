import React, { useState, useEffect } from "react";
import AnimatedCircles from "../CircleAnimation/CircleAnimation";
import {
  getTopReviewedScores,
  ReviewedScore,
} from "../../libs/firebase/leaderboard";

interface LeaderboardEntry {
  id: string;
  username: string;
  score: number;
  timestamp: string;
}

interface LeaderboardProps {
  entries?: LeaderboardEntry[]; // Made optional since we'll fetch from Firebase
  onClose: () => void;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ entries = [], onClose }) => {
  const [firebaseEntries, setFirebaseEntries] = useState<ReviewedScore[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        setIsLoading(true);
        const topScores = await getTopReviewedScores(10);
        setFirebaseEntries(topScores);
        setError("");
      } catch (err) {
        console.error("Error fetching leaderboard:", err);
        setError("Failed to load leaderboard data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaderboardData();
  }, []);

  // Use Firebase data if available, otherwise fall back to passed entries
  const displayEntries =
    firebaseEntries.length > 0
      ? firebaseEntries.map((entry) => ({
          id: entry.id || entry.username,
          username: entry.username,
          score: entry.score,
          timestamp: entry.submittedAt.toDate().toISOString(),
        }))
      : entries;

  // Sort entries by score in descending order (high to low)
  const sortedEntries = [...displayEntries].sort((a, b) => b.score - a.score);

  const getStyle = (index: number) => {
    if (index === 0)
      return "border-[rgba(254,186,23,0.5)] bg-[rgba(254,186,23,0.1)]";
    if (index === 1)
      return "border-[rgba(233,227,223,0.5)] bg-[rgba(233,227,223,0.1)]";
    if (index === 2)
      return "border-[rgba(167,101,69,0.5)] bg-[rgba(167,101,69,0.1)]";

    return "border-[rgba(255,255,255,0.3)]";
  };

  return (
    <div className="bg-[#111] relative border border-[rgba(255,255,255,0.3)] rounded-lg p-8 max-w-3xl w-full mx-4 max-h-[80vh] overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-col gap-0 text-left">
          <p className="text-[#4BAE79] font-medium uppercase tracking-[0.09em] text-[22px]">
            Leaderboard
          </p>
          {sortedEntries.length !== 0 && (
            <p className="font-light text-[#A9A9A9] tracking-[0.05em] text-[16px]">
              Your name here? That’s no accident — legends stack like you!
            </p>
          )}
        </div>
        <button onClick={onClose} className="text-white absolute top-5 right-5">
          <AnimatedCircles text="X" textStyle="text-white font-bold" />
        </button>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <div className="w-16 h-16 mx-auto border-4 border-[#4BAE79] border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-[#ffff] font-medium uppercase tracking-[0.09em] text-[22px]">
            Loading...
          </p>
          <p className="font-light text-[#A9A9A9] tracking-[0.05em] text-[16px]">
            Fetching the latest scores
          </p>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <div className="text-red-400 mb-4">
            <svg
              className="w-16 h-16 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p className="text-[#ffff] font-medium uppercase tracking-[0.09em] text-[22px]">
            Error Loading Data
          </p>
          <p className="font-light text-[#A9A9A9] tracking-[0.05em] text-[16px]">
            {error}
          </p>
        </div>
      ) : sortedEntries.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg
              className="w-16 h-16 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          </div>

          <p className="text-[#ffff] font-medium uppercase tracking-[0.09em] text-[22px]">
            No scores yet!
          </p>
          <p className="font-light text-[#A9A9A9] tracking-[0.05em] text-[16px]">
            Be the first to submit your score to the leaderboard.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden shadow rounded-lg ">
          <div className="border border-[rgba(255,255,255,0.3)] rounded-lg p-3 grid grid-cols-[1fr_2fr_1fr_1.5fr] gap-4 mb-3">
            <p className="font-light text-white tracking-[0.05em] text-[16px] text-left">
              Rank
            </p>
            <p className="font-light text-white tracking-[0.05em] text-[16px] text-left">
              Username
            </p>
            <p className="font-light text-white tracking-[0.05em] text-[16px] text-left">
              Score
            </p>
            <p className="font-light text-white tracking-[0.05em] text-[16px] text-left">
              Date
            </p>
          </div>
          <div className="flex flex-col gap-3">
            {sortedEntries.map((entry, index) => (
              <div
                key={entry.username}
                className={`border ${getStyle(
                  index
                )}  rounded-lg p-3 grid grid-cols-[1fr_2fr_1fr_1.5fr] gap-4`}
              >
                <p className="font-light text-white tracking-[0.05em] text-[16px] text-left">
                  {index + 1}
                </p>
                <p className="font-light text-white tracking-[0.05em] text-[16px] text-left">
                  {entry.username}
                </p>
                <p className="font-light text-white tracking-[0.05em] text-[16px] text-left">
                  {entry.score}
                </p>
                <p className="font-light text-white tracking-[0.05em] text-[16px] text-left">
                  {new Date(entry.timestamp).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
