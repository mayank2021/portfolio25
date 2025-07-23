import React, { useState } from "react";

interface LeaderboardFormProps {
  score: number;
  onSubmit: (data: { email: string; username: string }) => void;
  onClose: () => void;
}

const LeaderboardForm: React.FC<LeaderboardFormProps> = ({
  score,
  onSubmit,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    username: "",
  });

  const validateForm = () => {
    const newErrors = { email: "", username: "" };
    let isValid = true;

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
      isValid = false;
    }

    // Username validation
    if (!formData.username) {
      newErrors.username = "Username is required";
      isValid = false;
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
      isValid = false;
    } else if (formData.username.length > 20) {
      newErrors.username = "Username must be less than 20 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    onSubmit(formData);
    setIsSubmitted(true);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  if (isSubmitted) {
    return (
      <div
        className="bg-[#111] border border-[rgba(255,255,255,0.5)] rounded-lg p-8 max-w-md w-full mx-4 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <p className="font-light text-[#fff] tracking-[0.05em] text-[22px] text-center">
            Score Submitted!
          </p>
          <p className="font-light text-[#a9a9a9] tracking-[0.05em] text-[14px] text-center mb-2">
            Your score is under review and will appear on the leaderboard within
            a few hours if it qualifies for the top 10.
          </p>

          <div className="border border-[#4bae79] rounded-lg p-4 mb-6 text-center">
            <p className="text-sm text-[#4bae79] mb-1 uppercase tracking-[2px]">
              Your Score
            </p>
            <p className="text-3xl font-bold text-[#4bae79]">{score}</p>
          </div>

          <p className="font-light text-[#a9a9a9] tracking-[0.05em] text-[14px] text-center mb-2">
            Thank you for playing! Keep practicing to improve your score.
          </p>
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onClose();
          }}
          className="w-full px-4 py-3 min-w-[140px] text-center bg-[#111] border hover:bg-[rgba(255,255,255,0.2)]   border-[rgba(255,255,255,0.5)] rounded-md shadow-sm  focus:outline-none focus:ring-0 transition-all duration-200 ease-in-out"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <div
      className="bg-[#111] text-white rounded-lg p-8 max-w-md w-full mx-4"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="text-center mb-6">
        <p className="font-light text-[#fff] tracking-[0.05em] text-[26px] text-center">
          Game on
        </p>
        <p className="font-light text-[#a9a9a9] tracking-[0.05em] text-[16px] text-center">
          Submit your score to compete for the top 10 leaderboard.
        </p>
      </div>

      {/* Score Display */}
      <div className="border border-[#4bae79] rounded-lg p-4 mb-6 text-center">
        <p className="text-sm text-[#4bae79] mb-1 uppercase tracking-[2px]">
          Your Score
        </p>
        <p className="text-3xl font-bold text-[#4bae79]">{score}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Username Field */}
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-[#a9a9a9] mb-1"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            value={formData.username}
            onChange={(e) => handleInputChange("username", e.target.value)}
            className={`w-full px-3 py-3 border border-[rgba(255,255,255,0.5)] bg-[#111] rounded-lg focus:ring-2 focus:ring-none outline-none transition-colors text-white placeholder-gray-400 ${
              errors.username ? "border-red-500" : "border-gray-300"
            }`}
            style={{
              WebkitTextFillColor: "white",
              WebkitBoxShadow: "0 0 0px 1000px #111 inset",
            }}
            placeholder="Enter your username"
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">{errors.username}</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-[#a9a9a9] mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className={`w-full px-3 py-3 border border-[rgba(255,255,255,0.5)] bg-[#111] rounded-lg focus:ring-2 focus:ring-none outline-none transition-colors text-white placeholder-gray-400 ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            style={{
              WebkitTextFillColor: "white",
              WebkitBoxShadow: "0 0 0px 1000px #111 inset",
            }}
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onClose();
            }}
            className="w-full px-4 py-3 min-w-[140px] text-center bg-[#111] border hover:bg-[rgba(255,255,255,0.2)]   border-[rgba(255,255,255,0.5)] rounded-md shadow-sm  focus:outline-none focus:ring-0 transition-all duration-200 ease-in-out"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-full px-4 min-w-[140px] text-center py-3 bg-[#111] border hover:bg-[rgba(94,162,57,0.2)]  border-[#5EA239] rounded-md shadow-sm  focus:outline-none focus:ring-0 transition-all duration-200 ease-in-out"
          >
            Submit for Review
          </button>
        </div>
      </form>

      <div className="mt-4 p-3 px-0 rounded-lg">
        <p className="text-sm text-[#a9a9a9] text-center">
          Your score will be reviewed and added to the leaderboard within a few
          hours if it qualifies for the top 10.
        </p>
      </div>
    </div>
  );
};

export default LeaderboardForm;
