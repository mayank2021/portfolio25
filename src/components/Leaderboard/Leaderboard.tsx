import React from "react";

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

  return (
    <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">🏆 Leaderboard</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
          aria-label="Close leaderboard"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
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
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No scores yet!
          </h3>
          <p className="text-gray-600">
            Be the first to submit your score to the leaderboard.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rank
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Username
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedEntries.map((entry, index) => (
                <tr
                  key={entry.id}
                  className={`${index < 3 ? "bg-gradient-to-r" : ""} ${
                    index === 0
                      ? "from-yellow-50 to-yellow-100"
                      : index === 1
                      ? "from-gray-50 to-gray-100"
                      : index === 2
                      ? "from-orange-50 to-orange-100"
                      : "hover:bg-gray-50"
                  } transition-colors duration-200`}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <div className="flex items-center">
                      {index === 0 && (
                        <span className="text-yellow-500 mr-2 text-lg">🥇</span>
                      )}
                      {index === 1 && (
                        <span className="text-gray-400 mr-2 text-lg">🥈</span>
                      )}
                      {index === 2 && (
                        <span className="text-orange-400 mr-2 text-lg">🥉</span>
                      )}
                      #{index + 1}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                    {entry.username}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        index === 0
                          ? "bg-yellow-100 text-yellow-800"
                          : index === 1
                          ? "bg-gray-100 text-gray-800"
                          : index === 2
                          ? "bg-orange-100 text-orange-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {entry.score}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(entry.timestamp).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {sortedEntries.length > 0 && (
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Showing top {sortedEntries.length} players
          </p>
          <div className="mt-4">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
