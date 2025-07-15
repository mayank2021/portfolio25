import React from "react";

interface GlassButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const GlassButton = ({
  children,
  onClick,
  className = "",
  disabled = false,
  ...props
}: GlassButtonProps) => {
  return (
    <button
      className={`
        relative overflow-hidden
        px-4 py-2 text-[16px]
        font-semibold tracking-wide
        cursor-pointer
        transition-all duration-300 ease-out
        backdrop-blur-xl
        bg-white/15
        hover:bg-white/25
        border border-white/20
        hover:border-white/30
        rounded-lg
        text-white
        shadow-[0_8px_32px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.2)]
        hover:shadow-[0_12px_40px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.3)]
        hover:-translate-y-0.5
        active:translate-y-0
        active:shadow-[0_4px_16px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.2)]
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0
        before:content-[''] before:absolute before:top-0 before:-left-full before:w-full before:h-full
        before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent
        before:transition-all before:duration-700 before:ease-out
        hover:before:left-full
        ${className}
      `}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default GlassButton;
