import { signInWithPopup, GoogleAuthProvider, User } from "firebase/auth";
import { auth } from "./config";
const provider = new GoogleAuthProvider();

// Add your admin email here
const ADMIN_EMAILS = [
  "mayanksonkar16@gmail.com", // Replace with your actual email
  // Add more admin emails as needed
];

export const signInWithGoogle = async (): Promise<User | null> => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error("Error signing in:", error);
    throw error;
  }
};

export const signOut = async (): Promise<void> => {
  try {
    await auth.signOut();
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};

export const isAdminUser = (user: User | null): boolean => {
  if (!user?.email) return false;
  return ADMIN_EMAILS.includes(user.email);
};

export { auth };
export type { User };
