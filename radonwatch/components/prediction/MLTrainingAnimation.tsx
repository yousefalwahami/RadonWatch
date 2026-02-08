"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ML_TRAINING_PHASES } from "@/lib/radonModel";

interface MLTrainingAnimationProps {
  onComplete: () => void;
}

export default function MLTrainingAnimation({
  onComplete,
}: MLTrainingAnimationProps) {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [progress, setProgress] = useState(0);
  const [metrics, setMetrics] = useState({
    loss: 2.5,
    accuracy: 0,
    epoch: 0,
  });
  const [barHeights] = useState<number[]>(() =>
    Array.from({ length: 20 }).map((_, i) =>
      Math.max(10, 100 - i * 4 - Math.random() * 10),
    ),
  );

  useEffect(() => {
    if (currentPhase >= ML_TRAINING_PHASES.length) {
      setTimeout(onComplete, 500);
      return;
    }

    const phase = ML_TRAINING_PHASES[currentPhase];
    const timer = setTimeout(() => {
      setProgress(phase.progress);
      setCurrentPhase((prev) => prev + 1);

      // Update fake metrics
      setMetrics({
        loss: 2.5 - (phase.progress / 100) * 2.3, // Decreases to ~0.2
        accuracy: phase.progress * 0.94, // Increases to 94%
        epoch: currentPhase + 1,
      });
    }, phase.duration);

    return () => clearTimeout(timer);
  }, [currentPhase, onComplete]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-dark-card border border-subtle p-8 rounded-lg shadow-2xl max-w-2xl w-full"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-text-primary font-serif">
          🧠 Training Neural Network
        </h2>

        {/* Current Phase */}
        <div className="mb-6">
          <p className="text-lg text-text-primary mb-4 text-center">
            {currentPhase < ML_TRAINING_PHASES.length
              ? ML_TRAINING_PHASES[currentPhase].phase
              : "Analysis Complete!"}
          </p>

          {/* Progress Bar */}
          <div className="w-full bg-dark-card-hover border border-subtle rounded-full h-4 mb-2">
            <motion.div
              className="bg-primary-500 h-4 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <div className="flex justify-between text-sm text-text-secondary">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
        </div>

        {/* Training Metrics */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-center">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              Epoch
            </div>
            <div className="text-2xl font-bold text-text-primary">
              {metrics.epoch}/6
            </div>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-center">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              Loss
            </div>
            <div className="text-2xl font-bold text-red-600">
              {metrics.loss.toFixed(3)}
            </div>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-center">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              Accuracy
            </div>
            <div className="text-2xl font-bold text-green-600">
              {metrics.accuracy.toFixed(1)}%
            </div>
          </div>
        </div>

        {/* Fake Loss Curve */}
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Training Loss
          </div>
          <div className="h-24 flex items-end justify-around gap-1">
            {barHeights.map((height, i) => {
              const isActive =
                i < (currentPhase / ML_TRAINING_PHASES.length) * 20;
              return (
                <motion.div
                  key={i}
                  className={`flex-1 rounded-t ${
                    isActive ? "bg-red-500" : "bg-gray-300 dark:bg-gray-700"
                  }`}
                  initial={{ height: 0 }}
                  animate={{ height: isActive ? `${height}%` : 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                />
              );
            })}
          </div>
        </div>

        {/* Feature Engineering Animation */}
        <div className="mt-6 grid grid-cols-2 gap-2 text-xs">
          {[
            "Geographic Features",
            "Building Characteristics",
            "Geological Data",
            "Ventilation Metrics",
            "Foundation Analysis",
            "Regional Patterns",
          ].map((feature, i) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: currentPhase > i ? 1 : 0.3, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`p-2 rounded ${
                currentPhase > i
                  ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-500"
              }`}
            >
              {currentPhase > i ? "✓ " : "○ "}
              {feature}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
