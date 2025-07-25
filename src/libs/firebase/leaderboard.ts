import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  limit,
  Timestamp,
  where,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "./config";

export interface PendingScore {
  id?: string;
  username: string;
  email: string;
  score: number;
  submittedAt: Timestamp;
  status: "pending" | "reviewed" | "rejected";
}

export interface ReviewedScore {
  id?: string;
  username: string;
  email: string;
  score: number;
  submittedAt: Timestamp;
  reviewedAt: Timestamp;
  rank?: number;
}

// Collection references
const PENDING_SCORES_COLLECTION = "pendingScores";
const REVIEWED_SCORES_COLLECTION = "reviewedScores";

/**
 * Submit a score for review
 * If email already exists in pending scores, update it; otherwise create new entry
 */
export const submitScoreForReview = async (scoreData: {
  username: string;
  email: string;
  score: number;
}): Promise<void> => {
  try {
    // Check if there's already a pending score for this email
    const existingQuery = query(
      collection(db, PENDING_SCORES_COLLECTION),
      where("email", "==", scoreData.email),
      where("status", "==", "pending")
    );

    const existingSnapshot = await getDocs(existingQuery);

    const newScoreData: Omit<PendingScore, "id"> = {
      ...scoreData,
      submittedAt: Timestamp.now(),
      status: "pending",
    };

    if (!existingSnapshot.empty) {
      // Update existing pending score
      const existingDoc = existingSnapshot.docs[0];
      const existingData = existingDoc.data() as PendingScore;

      // Only update if the new score is higher than the existing one
      if (scoreData.score > existingData.score) {
        await updateDoc(doc(db, PENDING_SCORES_COLLECTION, existingDoc.id), {
          ...newScoreData,
          // Keep original submission time if you want, or update it
          submittedAt: Timestamp.now(), // Update to show latest submission
        });
        console.log(
          `Updated existing pending score for ${scoreData.email} with higher score: ${scoreData.score}`
        );
      } else {
        console.log(
          `Score ${scoreData.score} not higher than existing score ${existingData.score} for ${scoreData.email}`
        );
        throw new Error(
          `Your previous score (${existingData.score}) is higher than or equal to this submission (${scoreData.score}). Only higher scores can replace existing submissions.`
        );
      }
    } else {
      // Create new pending score
      await addDoc(collection(db, PENDING_SCORES_COLLECTION), newScoreData);
      console.log(`Created new pending score for ${scoreData.email}`);
    }
  } catch (error) {
    console.error("Error submitting score for review:", error);
    if (error.message.includes("higher than or equal")) {
      throw error; // Re-throw our custom error message
    }
    throw new Error("Failed to submit score for review");
  }
};

/**
 * Get all pending scores (for admin review)
 */
export const getPendingScores = async (): Promise<PendingScore[]> => {
  try {
    const q = query(
      collection(db, PENDING_SCORES_COLLECTION),
      where("status", "==", "pending")
    );

    const querySnapshot = await getDocs(q);
    const scores = querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as PendingScore)
    );

    // Sort in JavaScript instead of Firestore to avoid index requirement
    return scores.sort((a, b) => {
      const aTime = a.submittedAt?.toDate?.() || new Date(0);
      const bTime = b.submittedAt?.toDate?.() || new Date(0);
      return bTime.getTime() - aTime.getTime(); // Newest first
    });
  } catch (error) {
    console.error("Error fetching pending scores:", error);
    throw new Error("Failed to fetch pending scores");
  }
};

/**
 * Approve a pending score and move it to reviewed scores
 * Automatically handles duplicates by email - always updates existing entry
 */
export const approveScore = async (
  pendingScoreId: string,
  pendingScore: PendingScore
): Promise<void> => {
  try {
    const reviewedScore: Omit<ReviewedScore, "id"> = {
      username: pendingScore.username,
      email: pendingScore.email,
      score: pendingScore.score,
      submittedAt: pendingScore.submittedAt,
      reviewedAt: Timestamp.now(),
    };

    // First, check for existing entry by email
    const existingByEmailQuery = query(
      collection(db, REVIEWED_SCORES_COLLECTION),
      where("email", "==", pendingScore.email)
    );
    const existingByEmailSnapshot = await getDocs(existingByEmailQuery);

    // Also check for existing entries by username (for old entries without email)
    const existingByUsernameQuery = query(
      collection(db, REVIEWED_SCORES_COLLECTION),
      where("username", "==", pendingScore.username)
    );
    const existingByUsernameSnapshot = await getDocs(existingByUsernameQuery);

    // Collect all existing entries that need to be cleaned up
    const allExistingDocs = new Set();
    existingByEmailSnapshot.docs.forEach((doc) => allExistingDocs.add(doc));
    existingByUsernameSnapshot.docs.forEach((doc) => allExistingDocs.add(doc));

    if (allExistingDocs.size > 0) {
      // Update the first document and delete the rest
      const docsArray = Array.from(allExistingDocs) as any[];
      const firstDoc = docsArray[0];

      // Update the first document
      await updateDoc(doc(db, REVIEWED_SCORES_COLLECTION, firstDoc.id), {
        ...reviewedScore,
      });
      console.log(
        `Updated reviewed score for ${pendingScore.email} (${pendingScore.username})`
      );

      // Delete any additional duplicate documents
      for (let i = 1; i < docsArray.length; i++) {
        await deleteDoc(doc(db, REVIEWED_SCORES_COLLECTION, docsArray[i].id));
        console.log(`Deleted duplicate entry for ${pendingScore.username}`);
      }
    } else {
      // Add new reviewed score (first time approval)
      await addDoc(collection(db, REVIEWED_SCORES_COLLECTION), reviewedScore);
      console.log(
        `Added new reviewed score for ${pendingScore.email} (${pendingScore.username})`
      );
    }

    // Update pending score status
    await updateDoc(doc(db, PENDING_SCORES_COLLECTION, pendingScoreId), {
      status: "reviewed",
    });
  } catch (error) {
    console.error("Error approving score:", error);
    throw new Error("Failed to approve score");
  }
};

/**
 * Reject a pending score
 */
export const rejectScore = async (pendingScoreId: string): Promise<void> => {
  try {
    await updateDoc(doc(db, PENDING_SCORES_COLLECTION, pendingScoreId), {
      status: "rejected",
    });
  } catch (error) {
    console.error("Error rejecting score:", error);
    throw new Error("Failed to reject score");
  }
};

/**
 * Get top reviewed scores for leaderboard display
 */
export const getTopReviewedScores = async (
  limitCount: number = 10
): Promise<ReviewedScore[]> => {
  try {
    const q = query(
      collection(db, REVIEWED_SCORES_COLLECTION),
      orderBy("score", "desc"),
      limit(limitCount)
    );

    const querySnapshot = await getDocs(q);
    const scores = querySnapshot.docs.map(
      (doc, index) =>
        ({
          id: doc.id,
          ...doc.data(),
          rank: index + 1,
        } as ReviewedScore)
    );

    return scores;
  } catch (error) {
    console.error("Error fetching top reviewed scores:", error);
    throw new Error("Failed to fetch leaderboard scores");
  }
};

/**
 * Get user's best score by email
 */
export const getUserBestScore = async (
  email: string
): Promise<ReviewedScore | null> => {
  try {
    const q = query(
      collection(db, REVIEWED_SCORES_COLLECTION),
      where("email", "==", email),
      orderBy("score", "desc"),
      limit(1)
    );

    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      return null;
    }

    const doc = querySnapshot.docs[0];
    return {
      id: doc.id,
      ...doc.data(),
    } as ReviewedScore;
  } catch (error) {
    console.error("Error fetching user's best score:", error);
    return null;
  }
};
