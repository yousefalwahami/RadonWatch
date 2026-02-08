"use client";

import { PredictionResult } from "@/lib/radonModel";
import {
  HEALTH_CANADA_THRESHOLD,
  MITIGATION_STRATEGIES,
} from "@/lib/constants";

interface RiskDashboardProps {
  result: PredictionResult;
}

export default function RiskDashboard({ result }: RiskDashboardProps) {
  const getHealthImpact = () => {
    if (result.radonLevel < 100) {
      return {
        title: "Low Health Risk",
        description:
          "Your radon levels are below 100 Bq/m³. Health Canada considers this low risk. Continue monitoring but no immediate action needed.",
        recommendation: "Test again in 2-5 years to ensure levels remain low.",
      };
    } else if (result.radonLevel < HEALTH_CANADA_THRESHOLD) {
      return {
        title: "Moderate Health Risk",
        description:
          "Your radon levels are between 100-200 Bq/m³. While below the action level, consider taking steps to reduce exposure.",
        recommendation: "Consider mitigation measures and retest annually.",
      };
    } else {
      return {
        title: "High Health Risk - Action Recommended",
        description: `Your radon levels exceed Health Canada's action level of ${HEALTH_CANADA_THRESHOLD} Bq/m³. Radon exposure at this level significantly increases lung cancer risk.`,
        recommendation:
          "Contact a certified radon mitigation professional immediately.",
      };
    }
  };

  const healthImpact = getHealthImpact();

  const getRelevantMitigation = () => {
    if (result.radonLevel < 100) {
      return MITIGATION_STRATEGIES.slice(1, 3); // Sealing and ventilation
    } else if (result.radonLevel < HEALTH_CANADA_THRESHOLD) {
      return MITIGATION_STRATEGIES.slice(0, 3);
    } else {
      return MITIGATION_STRATEGIES; // All strategies
    }
  };

  const relevantMitigation = getRelevantMitigation();

  return (
    <div className="space-y-6">
      {/* Health Impact Card */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg">
        <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          {healthImpact.title}
        </h3>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          {healthImpact.description}
        </p>
        <div className="bg-radon-100 dark:bg-radon-900 border-l-4 border-radon-500 p-4 rounded">
          <p className="text-sm font-semibold text-radon-700 dark:text-radon-300">
            📋 Recommended Action:
          </p>
          <p className="text-sm text-radon-600 dark:text-radon-400 mt-1">
            {healthImpact.recommendation}
          </p>
        </div>
      </div>

      {/* Risk Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow text-center">
          <div className="text-3xl mb-2">🏠</div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {result.radonLevel < 100
              ? "16%"
              : result.radonLevel < 200
                ? "7%"
                : "2%"}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            of Canadian homes at this level
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow text-center">
          <div className="text-3xl mb-2">⏱️</div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            3.8 days
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Radon-222 half-life
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow text-center">
          <div className="text-3xl mb-2">🎯</div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            &lt;200 Bq/m³
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Health Canada target
          </div>
        </div>
      </div>

      {/* Mitigation Strategies */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg">
        <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          Mitigation Options
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Based on your radon level, here are recommended mitigation strategies:
        </p>
        <div className="space-y-4">
          {relevantMitigation.map((strategy, index) => (
            <div
              key={index}
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-radon-500 transition-colors"
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-gray-900 dark:text-white">
                  {strategy.title}
                </h4>
                <span className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-2 py-1 rounded text-xs font-semibold">
                  {strategy.effectiveness} effective
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {strategy.description}
              </p>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">
                  💰 Cost:{" "}
                  <span className="font-semibold">{strategy.cost}</span>
                </span>
                <span className="text-gray-500">🔧 {strategy.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-gradient-to-r from-radon-500 to-radon-700 p-6 rounded-lg shadow-lg text-white">
        <h3 className="text-2xl font-bold mb-4">Next Steps</h3>
        <ol className="space-y-3">
          <li className="flex gap-3">
            <span className="font-bold">1.</span>
            <span>
              Purchase a long-term radon test kit to confirm these predictions
            </span>
          </li>
          <li className="flex gap-3">
            <span className="font-bold">2.</span>
            <span>
              Place the test in your lowest lived-in level for 90+ days
            </span>
          </li>
          <li className="flex gap-3">
            <span className="font-bold">3.</span>
            <span>
              If levels are above 200 Bq/m³, contact a C-NRPP certified
              professional
            </span>
          </li>
          <li className="flex gap-3">
            <span className="font-bold">4.</span>
            <span>Implement recommended mitigation strategies</span>
          </li>
          <li className="flex gap-3">
            <span className="font-bold">5.</span>
            <span>Retest after mitigation to verify success</span>
          </li>
        </ol>

        <div className="mt-6 pt-6 border-t border-radon-400">
          <p className="text-sm opacity-90">
            <strong>⚠️ Important:</strong> This is an educational prediction
            tool. Actual radon levels can only be determined through proper
            testing. Visit{" "}
            <a
              href="https://takeactiononradon.ca/"
              className="underline font-semibold"
              target="_blank"
              rel="noopener noreferrer"
            >
              takeactiononradon.ca
            </a>{" "}
            for test kits.
          </p>
        </div>
      </div>
    </div>
  );
}
