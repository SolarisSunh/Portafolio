import React from "react";

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  tone?: "primary" | "neutral";
};

export const Badge: React.FC<BadgeProps> = ({ tone = "primary", className = "", ...props }) => (
  <span
    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
      tone === "primary"
        ? "bg-primary-600/20 text-primary-200 border border-primary-500/30"
        : "bg-white/10 text-white border border-white/15"
    } ${className}`}
    {...props}
  />
);



