"use client";

import { motion } from "framer-motion";

export default function UraniumDecayChain() {
  const decaySteps = [
    {
      element: "U-238",
      name: "Uranium-238",
      halfLife: "4.5 billion years",
      color: "bg-blue-500",
    },
    {
      element: "Th-234",
      name: "Thorium-234",
      halfLife: "24 days",
      color: "bg-purple-500",
    },
    {
      element: "Pa-234",
      name: "Protactinium-234",
      halfLife: "1.2 minutes",
      color: "bg-pink-500",
    },
    {
      element: "U-234",
      name: "Uranium-234",
      halfLife: "245,000 years",
      color: "bg-indigo-500",
    },
    {
      element: "Th-230",
      name: "Thorium-230",
      halfLife: "75,000 years",
      color: "bg-violet-500",
    },
    {
      element: "Ra-226",
      name: "Radium-226",
      halfLife: "1,600 years",
      color: "bg-fuchsia-500",
    },
    {
      element: "Rn-222",
      name: "Radon-222 ☢️",
      halfLife: "3.8 days",
      color: "bg-red-500",
      highlight: true,
    },
  ];

  return (
    <div className="my-8">
      <h3 className="text-xl font-bold mb-4 text-center text-gray-900 dark:text-white">
        Uranium Decay Chain → Radon
      </h3>
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 flex-wrap">
        {decaySteps.map((step, index) => (
          <motion.div
            key={step.element}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.2 }}
            className="flex items-center gap-2"
          >
            <div
              className={`${step.color} text-white p-4 rounded-lg shadow-lg ${
                step.highlight ? "ring-4 ring-yellow-400 scale-110" : ""
              }`}
            >
              <div className="text-2xl font-bold text-center">
                {step.element}
              </div>
              <div className="text-xs text-center mt-1">{step.name}</div>
              <div className="text-xs text-center opacity-90 mt-1">
                {step.halfLife}
              </div>
            </div>
            {index < decaySteps.length - 1 && (
              <div className="text-3xl text-gray-400">→</div>
            )}
          </motion.div>
        ))}
      </div>
      <p className="text-center mt-6 text-gray-600 dark:text-gray-400 text-sm">
        Radon-222 is a radioactive gas that escapes from soil and enters homes
        through cracks and openings.
      </p>
    </div>
  );
}
