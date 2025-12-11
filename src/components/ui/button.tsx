import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

export const Button: React.FC<ButtonProps> = ({ variant = "primary", className = "", ...props }) => {
  const base =
    "inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-500";
  const styles =
    variant === "primary"
      ? "bg-primary-600 hover:bg-primary-700 text-white shadow"
      : variant === "secondary"
      ? "bg-white/10 hover:bg-white/15 text-white border border-white/10"
      : "bg-transparent hover:bg-white/5 text-white";
  return <button className={`${base} ${styles} ${className}`} {...props} />;
};



