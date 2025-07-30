"use client";

import React, { useState, useEffect } from "react";
import {
  getPendingScores,
  approveScore,
  rejectScore,
  PendingScore,
} from "../../libs/firebase/leaderboard";
import {
  auth,
  signInWithGoogle,
  signOut,
  isAdminUser,
  User,
} from "../../libs/firebase/auth";
import { onAuthStateChanged } from "firebase/auth";

export default function AdminPage() {
  const [pendingScores, setPendingScores] = useState<PendingScore[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [processingIds, setProcessingIds] = useState<Set<string>>(new Set());
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("Auth state changed:", user);
      setUser(user);
      setAuthLoading(false);
      if (user && isAdminUser(user)) {
        console.log("User is admin, fetching scores");
        fetchPendingScores();
      } else {
        console.log("User is not admin or not signed in");
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchPendingScores = async () => {
    try {
      setIsLoading(true);
      console.log("Current user:", user);
      console.log("User email:", user?.email);
      console.log("Is admin:", isAdminUser(user));
      const scores = await getPendingScores();
      setPendingScores(scores);
      setError("");
    } catch (err) {
      console.error("Error fetching pending scores:", err);
      console.error("Error details:", err);
      setError(`Failed to load pending scores. Error: ${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async (scoreId: string, score: PendingScore) => {
    if (!scoreId) return;

    setProcessingIds((prev) => new Set(prev).add(scoreId));

    try {
      await approveScore(scoreId, score);
      // Remove from pending list
      setPendingScores((prev) => prev.filter((s) => s.id !== scoreId));
    } catch (err) {
      console.error("Error approving score:", err);
      setError("Failed to approve score. Please try again.");
    } finally {
      setProcessingIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(scoreId);
        return newSet;
      });
    }
  };

  const handleReject = async (scoreId: string) => {
    if (!scoreId) return;

    setProcessingIds((prev) => new Set(prev).add(scoreId));

    try {
      await rejectScore(scoreId);
      // Remove from pending list
      setPendingScores((prev) => prev.filter((s) => s.id !== scoreId));
    } catch (err) {
      console.error("Error rejecting score:", err);
      setError("Failed to reject score. Please try again.");
    } finally {
      setProcessingIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(scoreId);
        return newSet;
      });
    }
  };

  const formatDate = (
    timestamp:
      | { toDate?: () => Date }
      | Date
      | string
      | number
      | null
      | undefined
  ) => {
    if (!timestamp) return "Unknown";
    try {
      const date =
        timestamp &&
        typeof timestamp === "object" &&
        "toDate" in timestamp &&
        timestamp.toDate
          ? timestamp.toDate()
          : new Date(timestamp as Date | string | number);
      return date.toLocaleString();
    } catch {
      return "Invalid Date";
    }
  };

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch {
      setError("Failed to sign in. Please try again.");
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch {
      setError("Failed to sign out. Please try again.");
    }
  };

  // Auth loading state
  if (authLoading) {
    return (
      <div className="text-white p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto border-4 border-[#4BAE79] border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-[#a9a9a9]">Checking authentication...</p>
          </div>
        </div>
      </div>
    );
  }

  // Not signed in
  if (!user) {
    return (
      <div className="text-white p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-12">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-[#4BAE79] mb-4">
                Admin Access Required
              </h1>
              <p className="text-[#a9a9a9] text-lg mb-8">
                Please sign in with your Google account to access the admin
                dashboard.
              </p>
              <button
                onClick={handleSignIn}
                className="bg-[#4BAE79] hover:bg-[#5EA239] text-white px-8 py-3 rounded-lg font-medium transition-colors"
              >
                Sign in with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Not an admin user
  if (!isAdminUser(user)) {
    return (
      <div className="text-white p-8">
        <div className="max-w-6xl mx-auto">
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
            <h1 className="text-4xl font-bold text-red-400 mb-4">
              Access Denied
            </h1>
            <p className="text-[#a9a9a9] text-lg mb-4">
              Your account ({user.email}) does not have admin privileges.
            </p>
            <button
              onClick={handleSignOut}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold text-[#4BAE79] mb-2">
                Admin Dashboard
              </h1>
              <p className="text-[#a9a9a9] text-lg">
                Manage pending score submissions
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-[#4BAE79]">Signed in as</p>
                <p className="text-sm text-[#a9a9a9]">{user?.email}</p>
              </div>
              <button
                onClick={handleSignOut}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 border border-red-500 rounded-lg bg-red-50 bg-opacity-10">
            <p className="text-red-500">{error}</p>
            <button
              onClick={fetchPendingScores}
              className="mt-2 text-sm text-red-300 hover:text-red-100 underline"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#111] border border-[rgba(255,255,255,0.3)] rounded-lg p-6">
            <h3 className="text-[#4BAE79] text-sm uppercase tracking-wider mb-2">
              Pending Reviews
            </h3>
            <p className="text-3xl font-bold">{pendingScores.length}</p>
          </div>
          <div className="bg-[#111] border border-[rgba(255,255,255,0.3)] rounded-lg p-6">
            <h3 className="text-[#4BAE79] text-sm uppercase tracking-wider mb-2">
              Status
            </h3>
            <p className="text-lg">{isLoading ? "Loading..." : "Ready"}</p>
          </div>
          <div className="bg-[#111] border border-[rgba(255,255,255,0.3)] rounded-lg p-6">
            <h3 className="text-[#4BAE79] text-sm uppercase tracking-wider mb-2">
              Actions
            </h3>
            <button
              onClick={fetchPendingScores}
              disabled={isLoading}
              className="text-sm bg-[#4BAE79] hover:bg-[#5EA239] disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 rounded-md transition-colors"
            >
              Refresh
            </button>
          </div>
        </div>

        {/* Pending Scores List */}
        <div className="bg-[#111] border border-[rgba(255,255,255,0.3)] rounded-lg overflow-hidden">
          <div className="p-6 border-b border-[rgba(255,255,255,0.3)]">
            <h2 className="text-2xl font-semibold text-[#4BAE79]">
              Pending Score Reviews
            </h2>
          </div>

          {isLoading ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 mx-auto border-4 border-[#4BAE79] border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-[#a9a9a9]">Loading pending scores...</p>
            </div>
          ) : pendingScores.length === 0 ? (
            <div className="p-12 text-center">
              <div className="text-[#a9a9a9] mb-4">
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
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="text-xl font-semibold mb-2">All caught up!</p>
              <p className="text-[#a9a9a9]">
                No pending score reviews at the moment.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[rgba(255,255,255,0.3)]">
                    <th className="text-left p-4 text-[#4BAE79] font-medium">
                      Username
                    </th>
                    <th className="text-left p-4 text-[#4BAE79] font-medium">
                      Email
                    </th>
                    <th className="text-left p-4 text-[#4BAE79] font-medium">
                      Score
                    </th>
                    <th className="text-left p-4 text-[#4BAE79] font-medium">
                      Submitted
                    </th>
                    <th className="text-left p-4 text-[#4BAE79] font-medium">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {pendingScores.map((score) => (
                    <tr
                      key={score.id}
                      className="border-b border-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.05)]"
                    >
                      <td className="p-4">
                        <div className="font-medium">{score.username}</div>
                      </td>
                      <td className="p-4">
                        <div className="text-[#a9a9a9]">{score.email}</div>
                      </td>
                      <td className="p-4">
                        <div className="text-2xl font-bold text-[#4BAE79]">
                          {score.score.toLocaleString()}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="text-[#a9a9a9] text-sm">
                          {formatDate(score.submittedAt)}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              score.id && handleApprove(score.id, score)
                            }
                            disabled={!score.id || processingIds.has(score.id)}
                            className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-md text-sm font-medium transition-colors"
                          >
                            {processingIds.has(score.id || "")
                              ? "Approving..."
                              : "Approve"}
                          </button>
                          <button
                            onClick={() => score.id && handleReject(score.id)}
                            disabled={!score.id || processingIds.has(score.id)}
                            className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-md text-sm font-medium transition-colors"
                          >
                            {processingIds.has(score.id || "")
                              ? "Rejecting..."
                              : "Reject"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
