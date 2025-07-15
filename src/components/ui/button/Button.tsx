import clsx from "clsx";
import { SpinLoader } from "../loader";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  shape?: "rounded" | "square";
  size?: "small" | "large" | "medium";
  variant?:
    | "fill-white"
    | "fill-black"
    | "stroked-white"
    | "stroked-black"
    | "translucent-white"
    | "translucent-black"
    | "ghost-white"
    | "ghost-black";
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loading?: boolean;
}

const sizeStyle = {
  small: "py-2 px-5 text-btn-13 tracking-[1px]",
  large: "py-4 px-6 text-btn-14 tracking-[0px]",
  medium: "py-3 px-6 text-btn-13 tracking-[1px]",
};

const shapeStyle = {
  rounded: "rounded-full",
  square: "rounded-none",
};

const variantStyle = {
  "fill-white": "bg-white text-black disabled:bg-zgrey-500",
  "fill-black": "bg-[#1A1A1A] text-white disabled:bg-zgrey-500",
  "stroked-white":
    "bg-transparent border border-white text-white disabled:border-zgrey-700",
  "stroked-black":
    "bg-transparent border border-[#1A1A1A] text-[#1A1A1A] disabled:border-zgrey-700",
  "translucent-white": "bg-[#FFFFFF14] text-white backdrop-blur-md",
  "translucent-black": "bg-[#1A1A1A14] text-[#1A1A1A] backdrop-blur-md",
  "ghost-white": "bg-transparent text-white",
  "ghost-black": "bg-transparent text-zgrey-900",
};

const Button = ({
  className,
  shape = "rounded",
  size = "large",
  variant = "fill-white",
  leftIcon,
  rightIcon,
  loading,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      className={clsx(
        "flex items-center justify-center gap-2 cursor-pointer outline-none font-bold disabled:text-zgrey-700 disabled:cursor-not-allowed",
        shapeStyle[shape],
        sizeStyle[size],
        variantStyle[variant],
        className
      )}
    >
      {loading ? (
        <SpinLoader isDark height={16} width={16} disabled={props.disabled} />
      ) : leftIcon ? (
        <div className={`${props.disabled ? "opacity-30" : "opacity-100"}`}>
          {leftIcon}
        </div>
      ) : null}
      {props.children}
      {!loading && rightIcon ? (
        <div className={`${props.disabled ? "opacity-30" : "opacity-100"}`}>
          {rightIcon}
        </div>
      ) : null}
    </button>
  );
};

export default Button;
