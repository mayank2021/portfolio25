import React from "react";
import AnimatedCircles from "../CircleAnimation/CircleAnimation";

interface LeaderboardEntry {
  id: string;
  username: string;
  score: number;
  timestamp: string;
}

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  onClose: () => void;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ entries, onClose }) => {
  // Sort entries by score in descending order (high to low)
  const sortedEntries = [...entries].sort((a, b) => b.score - a.score);

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

      {sortedEntries.length === 0 ? (
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
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
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
          <div className="border border-[rgba(255,255,255,0.3)] rounded-lg p-3 flex justify-between mb-3">
            <p className="font-light text-white tracking-[0.05em] text-[16px] text-center">
              Rank
            </p>
            <p className="font-light text-white tracking-[0.05em] text-[16px] text-center">
              Username
            </p>
            <p className="font-light text-white tracking-[0.05em] text-[16px] text-center">
              Score
            </p>
            <p className="font-light text-white tracking-[0.05em] text-[16px] text-center">
              Date
            </p>
          </div>
          <div className="flex flex-col gap-3">
            {sortedEntries.map((entry, index) => (
              <div
                key={entry.username}
                className={`border ${getStyle(
                  index
                )}  rounded-lg p-3 flex justify-between`}
              >
                <p className="font-light text-white tracking-[0.05em] text-[16px] text-center">
                  {index + 1}
                </p>
                <p className="font-light text-white tracking-[0.05em] text-[16px] text-center">
                  {entry.username}
                </p>
                <p className="font-light text-white tracking-[0.05em] text-[16px] text-center">
                  {entry.score}
                </p>
                <p className="font-light text-white tracking-[0.05em] text-[16px] text-center">
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
