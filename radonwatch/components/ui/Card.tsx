"use client";

import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export default function Card({
  children,
  delay = 0,
  className = "",
}: CardProps) {
  return (
    <div
      className={`
        bg-dark-card border border-subtle rounded-[20px] px-10 py-[50px]
        relative overflow-hidden group flex flex-col justify-center items-center
        transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)]
        hover:bg-dark-card-hover hover:-translate-y-2 hover:border-accent-gold/30
        animate-[slideUp_0.6s_ease-out_backwards]
        ${className}
      `}
      style={{ animationDelay: `${delay}s` }}
    >
      {/* Glow overlay on hover */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-accent-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" />

      {/* Content */}
      <div className="relative w-full">{children}</div>
    </div>
  );
}
