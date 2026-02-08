"use client";

import { motion } from "framer-motion";

interface ProgressTrackerProps {
  currentStage: number;
  totalStages: number;
  stages: { id: number; title: string; unlocks: string }[];
}

export default function ProgressTracker({
  currentStage,
  totalStages,
  stages,
}: ProgressTrackerProps) {
  const progress = (currentStage / totalStages) * 100;

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg mb-8">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        Learning Progress
      </h3>

      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
          <span>
            Stage {currentStage} of {totalStages}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
          <motion.div
            className="bg-radon-500 h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Stage indicators */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stages.map((stage) => {
          const isCompleted = stage.id < currentStage;
          const isCurrent = stage.id === currentStage;
          const isLocked = stage.id > currentStage;

          return (
            <div
              key={stage.id}
              className={`p-3 rounded-lg text-center ${
                isCompleted
                  ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
                  : isCurrent
                    ? "bg-radon-100 dark:bg-radon-900 text-radon-700 dark:text-radon-300"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-400"
              }`}
            >
              <div className="text-2xl mb-1">
                {isCompleted ? "✓" : isLocked ? "🔒" : "📚"}
              </div>
              <div className="text-xs font-medium">{stage.title}</div>
              <div className="text-xs mt-1 opacity-75">
                {isCompleted
                  ? "Completed"
                  : isCurrent
                    ? "In Progress"
                    : "Locked"}
              </div>
            </div>
          );
        })}
      </div>

      {/* Features unlocked */}
      {currentStage > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Features Unlocked:
          </h4>
          <div className="flex flex-wrap gap-2">
            {stages.slice(0, currentStage).map((stage) => (
              <span
                key={stage.id}
                className="bg-radon-100 dark:bg-radon-900 text-radon-700 dark:text-radon-300 px-3 py-1 rounded-full text-xs font-medium"
              >
                {stage.unlocks}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
