"use client";
import React, { useState } from "react";

const MobileIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="fill-[#a9a9a9] group-hover:fill-[#fff] transition-all duration-300"
  >
    <circle cx="12" cy="12" r="12" fill="transparent" />
    <path
      d="M21.9994 16.9201V19.9201C22.0006 20.1986 21.9435 20.4743 21.832 20.7294C21.7204 20.9846 21.5567 21.2137 21.3515 21.402C21.1463 21.5902 20.904 21.7336 20.6402 21.8228C20.3764 21.912 20.0968 21.9452 19.8194 21.9201C16.7423 21.5857 13.7864 20.5342 11.1894 18.8501C8.77327 17.3148 6.72478 15.2663 5.18945 12.8501C3.49942 10.2413 2.44769 7.27109 2.11944 4.1801C2.09446 3.90356 2.12732 3.62486 2.21595 3.36172C2.30457 3.09859 2.44702 2.85679 2.63421 2.65172C2.82141 2.44665 3.04925 2.28281 3.30324 2.17062C3.55722 2.05843 3.83179 2.00036 4.10945 2.0001H7.10945C7.59475 1.99532 8.06524 2.16718 8.43321 2.48363C8.80118 2.80008 9.04152 3.23954 9.10944 3.7201C9.23607 4.68016 9.47089 5.62282 9.80945 6.5301C9.94399 6.88802 9.97311 7.27701 9.89335 7.65098C9.8136 8.02494 9.62831 8.36821 9.35944 8.6401L8.08945 9.9101C9.513 12.4136 11.5859 14.4865 14.0894 15.9101L15.3594 14.6401C15.6313 14.3712 15.9746 14.1859 16.3486 14.1062C16.7225 14.0264 17.1115 14.0556 17.4694 14.1901C18.3767 14.5286 19.3194 14.7635 20.2794 14.8901C20.7652 14.9586 21.2088 15.2033 21.526 15.5776C21.8431 15.9519 22.0116 16.4297 21.9994 16.9201Z"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const EmailIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 18 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="fill-[#a9a9a9] group-hover:fill-[#fff] transition-all duration-300"
  >
    <path d="M15.666 0.333496H2.33268C1.41602 0.333496 0.674349 1.0835 0.674349 2.00016L0.666016 12.0002C0.666016 12.9168 1.41602 13.6668 2.33268 13.6668H15.666C16.5827 13.6668 17.3327 12.9168 17.3327 12.0002V2.00016C17.3327 1.0835 16.5827 0.333496 15.666 0.333496ZM15.3327 3.87516L9.44102 7.5585C9.17435 7.72516 8.82435 7.72516 8.55768 7.5585L2.66602 3.87516C2.45768 3.74183 2.33268 3.51683 2.33268 3.27516C2.33268 2.71683 2.94102 2.3835 3.41602 2.67516L8.99935 6.16683L14.5827 2.67516C15.0577 2.3835 15.666 2.71683 15.666 3.27516C15.666 3.51683 15.541 3.74183 15.3327 3.87516Z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 17 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="fill-[#a9a9a9] group-hover:fill-[#fff] transition-all duration-300"
  >
    <path d="M16.664 16.3337H13.3512V11.1367C13.3512 9.89735 13.3291 8.30202 11.6283 8.30202C9.90286 8.30202 9.63885 9.65222 9.63885 11.0464V16.3333H6.32617V5.6461H9.50635V7.1066H9.55095C10.1985 5.99753 11.4069 5.33265 12.6887 5.38033C16.0463 5.38033 16.6654 7.59266 16.6654 10.4709L16.664 16.3337Z" />
    <path d="M2.58886 4.18503C2.58866 4.18503 2.58856 4.18503 2.58846 4.18503C1.53384 4.18503 0.666016 3.31579 0.666016 2.25931C0.666016 1.20284 1.53384 0.333496 2.58846 0.333496C3.64299 0.333496 4.51071 1.20264 4.51091 2.25891C4.51091 2.25901 4.51091 2.25911 4.51091 2.25931C4.51091 3.31559 3.64329 4.18493 2.58886 4.18503Z" />
    <path d="M4.24587 16.3336H0.929688V5.646H4.24587V16.3336Z" />
  </svg>
);

interface AnimatedIconButtonProps {
  icon: React.ReactNode;
  onClick: () => void;
  className?: string;
  backgroundClassName?: string;
}

const AnimatedIconButton: React.FC<AnimatedIconButtonProps> = ({
  icon,
  onClick,
  className,
  backgroundClassName,
}) => (
  <div
    className={`group overflow-hidden relative border-[3px] border-[#a9a9a9] flex items-center gap-2 p-3 rounded-full transition-all duration-700 hover:scale-110 hover:bg-white hover:border-white !cursor-pointer ${
      className || ""
    }`}
    onClick={onClick}
  >
    <div
      className={`!cursor-pointer group-hover:-translate-y-1/2 transition-all duration-700 w-16 h-16 absolute top-1/2 translate-y-[30px] left-1/2 -translate-x-1/2 ${
        backgroundClassName || ""
      }`}
    ></div>
    <div className="relative z-10 !cursor-pointer">{icon}</div>
  </div>
);

interface MessageType {
  title: string;
  value: string;
}

const messages: Record<string, MessageType> = {
  mobile: {
    title: "You just copied my number :)",
    value: "+918859167328",
  },
  mail: {
    title: "You just copied my mail :)",
    value: "mayanksonkar16@gmail.com",
  },
  linkedin: {
    title: "You just copied my LinkedIn :)",
    value: "https://www.linkedin.com/in/mayank-sonkar-17a8401b6/",
  },
};

const Connect = () => {
  const [showAlert, setShowAlert] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = (type: string) => {
    if (type === "mail") {
      // Open email client
      window.location.href = `mailto:${messages[type].value}`;
    } else if (type === "linkedin") {
      // Open LinkedIn profile in new tab
      window.open(messages[type].value, "_blank");
    } else {
      // Copy to clipboard for mobile
      navigator.clipboard.writeText(messages[type].value);
      setShowAlert(messages[type].title);

      // Fade in
      setTimeout(() => {
        setIsVisible(true);
      }, 10);

      // Fade out after 1.5 seconds, then hide after fade out completes
      setTimeout(() => {
        setIsVisible(false);
      }, 1500);

      setTimeout(() => {
        setShowAlert(null);
      }, 2000);
    }
  };

  return (
    <div className="text-white max-w-[1200px] mx-auto flex flex-col items-center justify-center relative">
      <div>
        <p className="font-light text-[#fff] tracking-[0.05em] text-[30px] text-center">
          Say, <p className="text-[#F5513A] inline">Hii!!</p>
        </p>
        <p className="font-light text-[#a9a9a9] tracking-[0.05em] text-[16px] text-center mb-2">
          If you&apos;re as excited as I am!
        </p>
      </div>
      <div className="flex gap-4 px-4 pt-4">
        <AnimatedIconButton
          className="hover:border-[#e4405f]"
          backgroundClassName="bg-[#e4405f]"
          icon={<MobileIcon />}
          onClick={() => handleClick("mobile")}
        />
        <AnimatedIconButton
          className="hover:border-[#dd4b39]"
          backgroundClassName="bg-[#dd4b39]"
          icon={<EmailIcon />}
          onClick={() => handleClick("mail")}
        />
        <AnimatedIconButton
          className="hover:border-[#007bb6]"
          backgroundClassName="bg-[#007bb6]"
          icon={<LinkedInIcon />}
          onClick={() => handleClick("linkedin")}
        />
      </div>

      {/* Custom Alert */}
      {showAlert && (
        <div
          className={`fixed top-8 border border-white right-8 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-500 z-50 transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
        >
          <p className="font-medium">{showAlert}</p>
        </div>
      )}
    </div>
  );
};

export default Connect;
