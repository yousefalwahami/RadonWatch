"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface LessonProps {
  title: string;
  content: React.ReactNode;
  onComplete: () => void;
  isUnlocked: boolean;
  lessonNumber: number;
}

export default function Lesson({
  title,
  content,
  onComplete,
  isUnlocked,
  lessonNumber,
}: LessonProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  const handleComplete = () => {
    setIsCompleted(true);
    onComplete();
  };

  if (!isUnlocked) {
    return (
      <div className="bg-dark-card/50 border border-subtle p-6 rounded-lg opacity-50">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-10 h-10 bg-text-secondary/20 border border-subtle rounded-full flex items-center justify-center">
            <span className="text-text-secondary font-bold">
              {lessonNumber}
            </span>
          </div>
          <h2 className="text-2xl font-bold text-text-secondary font-serif">
            🔒 {title}
          </h2>
        </div>
        <p className="text-text-secondary">
          Complete the previous lesson to unlock
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg border-2 border-primary-400"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
          <span className="text-white font-bold">{lessonNumber}</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {title}
        </h2>
      </div>

      <div className="prose dark:prose-invert max-w-none mb-6">{content}</div>

      {!isCompleted && (
        <button
          onClick={handleComplete}
          className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          Complete Lesson →
        </button>
      )}

      {isCompleted && (
        <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
          <span className="text-2xl">✓</span>
          <span className="font-semibold">Lesson Completed!</span>
        </div>
      )}
    </motion.div>
  );
}
