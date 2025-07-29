import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "./config";
import { ReviewedScore } from "./leaderboard";

const REVIEWED_SCORES_COLLECTION = "reviewedScores";

/**
 * Clean up duplicate reviewed scores - keeps only the highest score per email
 * This should be run once to fix existing duplicates
 */
export const cleanupDuplicateReviewedScores = async (): Promise<void> => {
  try {
    console.log("Starting cleanup of duplicate reviewed scores...");

    // Get all reviewed scores
    const q = query(
      collection(db, REVIEWED_SCORES_COLLECTION),
      orderBy("score", "desc")
    );

    const querySnapshot = await getDocs(q);
    const allScores = querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as ReviewedScore)
    );

    // Group by email and find duplicates
    const scoresByEmail = new Map<string, ReviewedScore[]>();

    allScores.forEach((score) => {
      const email = score.email || "no-email"; // Handle old entries without email
      if (!scoresByEmail.has(email)) {
        scoresByEmail.set(email, []);
      }
      scoresByEmail.get(email)!.push(score);
    });

    let deletedCount = 0;

    // For each email, keep only the highest score and delete the rest
    for (const [email, scores] of scoresByEmail.entries()) {
      if (scores.length > 1) {
        console.log(`Found ${scores.length} scores for email: ${email}`);

        // Sort by score (highest first)
        scores.sort((a, b) => b.score - a.score);

        // Keep the first (highest) score, delete the rest
        const scoresToDelete = scores.slice(1);

        for (const scoreToDelete of scoresToDelete) {
          if (scoreToDelete.id) {
            await deleteDoc(
              doc(db, REVIEWED_SCORES_COLLECTION, scoreToDelete.id)
            );
            console.log(
              `Deleted duplicate score: ${scoreToDelete.score} for ${email}`
            );
            deletedCount++;
          }
        }
      }
    }

    console.log(
      `Cleanup completed. Deleted ${deletedCount} duplicate entries.`
    );
  } catch (error) {
    console.error("Error during cleanup:", error);
    throw error;
  }
};

/**
 * Clean up entries that don't have email field (old format)
 */
export const cleanupScoresWithoutEmail = async (): Promise<void> => {
  try {
    console.log("Cleaning up scores without email field...");

    const querySnapshot = await getDocs(
      collection(db, REVIEWED_SCORES_COLLECTION)
    );
    const allScores = querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as ReviewedScore)
    );

    let deletedCount = 0;

    for (const score of allScores) {
      if (!score.email && score.id) {
        await deleteDoc(doc(db, REVIEWED_SCORES_COLLECTION, score.id));
        console.log(
          `Deleted score without email: ${score.username} - ${score.score}`
        );
        deletedCount++;
      }
    }

    console.log(
      `Cleanup completed. Deleted ${deletedCount} entries without email.`
    );
  } catch (error) {
    console.error("Error during email cleanup:", error);
    throw error;
  }
};
