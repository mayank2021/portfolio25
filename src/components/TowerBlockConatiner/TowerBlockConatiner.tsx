import React, { useState } from "react";
import Modal from "../Modal/Modal";
import TowerBlocks from "../TowerBlocks";
import Leaderboard from "../Leaderboard";

interface LeaderboardEntry {
  id: string;
  username: string;
  score: number;
  timestamp: string;
}

const TowerBlockConatiner = () => {
  const [showModal, setShowModal] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [leaderboardEntries, setLeaderboardEntries] = useState<
    LeaderboardEntry[]
  >([
    {
      id: "demo1",
      username: "TowerMaster",
      score: 42,
      timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    },
    {
      id: "demo2",
      username: "StackKing",
      score: 38,
      timestamp: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    },
    {
      id: "demo3",
      username: "BlockWizard",
      score: 35,
      timestamp: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
    },
  ]);

  const handleLeaderboardSubmit = (newEntry: LeaderboardEntry) => {
    setLeaderboardEntries((prev) => [...prev, newEntry]);
  };

  return (
    <div className="text-white">
      <div className="w-full flex flex-col gap-2 items-center justify-center">
        <p className="font-light text-[#fff] tracking-[0.05em] text-[26px] text-center">
          Hey! Stacked my way to a score of 42
        </p>
        <p className="font-light text-[#fff] tracking-[0.05em] text-[16px] text-center mb-8">
          Up for a challenge? Try to beat it and submit your score to the
          leaderboard!
        </p>

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
          >
            Let&apos;s go
          </button>
          <button
            onClick={() => setShowLeaderboard(true)}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
          >
            🏆 Leaderboard
          </button>
        </div>
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <TowerBlocks
          leaderboardEntries={leaderboardEntries}
          onLeaderboardSubmit={handleLeaderboardSubmit}
        />
      </Modal>

      {/* Leaderboard Modal */}
      {showLeaderboard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
          <Leaderboard
            entries={leaderboardEntries}
            onClose={() => setShowLeaderboard(false)}
          />
        </div>
      )}
    </div>
  );
};

export default TowerBlockConatiner;
