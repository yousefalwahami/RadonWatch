"use client";

import { PredictionResult } from "@/lib/radonModel";
import { HEALTH_CANADA_THRESHOLD } from "@/lib/constants";

interface PredictionResultProps {
  result: PredictionResult;
  regionalAverage: number;
}

export default function PredictionResultDisplay({
  result,
  regionalAverage,
}: PredictionResultProps) {
  const getRiskIcon = () => {
    switch (result.riskCategory) {
      case "LOW":
        return "✅";
      case "MODERATE":
        return "⚠️";
      case "HIGH":
        return "🚨";
    }
  };

  const getRiskBgColor = () => {
    switch (result.riskCategory) {
      case "LOW":
        return "bg-green-100 dark:bg-green-900 border-green-500";
      case "MODERATE":
        return "bg-yellow-100 dark:bg-yellow-900 border-yellow-500";
      case "HIGH":
        return "bg-red-100 dark:bg-red-900 border-red-500";
    }
  };

  const getRiskTextColor = () => {
    switch (result.riskCategory) {
      case "LOW":
        return "text-green-700 dark:text-green-300";
      case "MODERATE":
        return "text-yellow-700 dark:text-yellow-300";
      case "HIGH":
        return "text-red-700 dark:text-red-300";
    }
  };

  return (
    <div className="space-y-6">
      {/* Main Result Card */}
      <div className={`p-6 rounded-lg border-4 ${getRiskBgColor()}`}>
        <div className="text-center">
          <div className="text-5xl mb-3">{getRiskIcon()}</div>
          <h2 className="text-3xl font-bold mb-2 text-text-primary font-serif">
            {result.radonLevel} Bq/m³
          </h2>
          <p className={`text-xl font-semibold ${getRiskTextColor()}`}>
            {result.riskLabel}
          </p>
          <p className="text-xs text-text-secondary mt-2">
            Confidence Interval: {result.confidenceInterval.lower} -{" "}
            {result.confidenceInterval.upper} Bq/m³
          </p>
        </div>

        {/* Comparison to Threshold */}
        <div className="mt-4 pt-4 border-t border-gray-300 dark:border-gray-600">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-gray-600 dark:text-gray-400">
              Your Level
            </span>
            <span className="text-xs text-gray-600 dark:text-gray-400">
              Health Canada Action Level ({HEALTH_CANADA_THRESHOLD} Bq/m³)
            </span>
          </div>
          <div className="relative h-6 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 rounded-full">
            <div
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 bg-white border-2 border-gray-900 rounded-full transition-all duration-700"
              style={{
                left: `${Math.min((result.radonLevel / 400) * 100, 100)}%`,
              }}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 w-0.5 h-full bg-white opacity-70"
              style={{ left: `${(HEALTH_CANADA_THRESHOLD / 400) * 100}%` }}
            />
          </div>
          <div className="flex justify-between mt-1 text-xs text-text-secondary">
            <span>0</span>
            <span>400+</span>
          </div>
        </div>
      </div>

      {/* Comparison to Regional Average */}
      <div className="bg-dark-card border border-subtle p-4 rounded-lg">
        <h3 className="text-lg font-bold mb-3 text-text-primary font-serif">
          Regional Comparison
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">
              Your Home
            </div>
            <div className="text-2xl font-bold text-primary-600">
              {result.radonLevel}
            </div>
            <div className="text-xs text-gray-500">Bq/m³</div>
          </div>
          <div className="text-center p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">
              Regional Avg
            </div>
            <div className="text-2xl font-bold text-gray-600 dark:text-gray-400">
              {regionalAverage}
            </div>
            <div className="text-xs text-gray-500">Bq/m³</div>
          </div>
        </div>
        <p className="text-center mt-3 text-xs text-gray-600 dark:text-gray-400">
          {result.radonLevel > regionalAverage
            ? `Your home is ${((result.radonLevel / regionalAverage - 1) * 100).toFixed(0)}% above the regional average`
            : `Your home is ${((1 - result.radonLevel / regionalAverage) * 100).toFixed(0)}% below the regional average`}
        </p>
      </div>

      {/* Factor Breakdown */}
      <div className="bg-dark-card border border-subtle p-4 rounded-lg">
        <h3 className="text-lg font-bold mb-3 text-text-primary font-serif">
          Risk Factor Breakdown
        </h3>
        <p className="text-xs text-text-secondary mb-3">
          These factors contributed to your radon prediction:
        </p>
        <div className="space-y-2">
          {result.factorBreakdown.map((factor, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                {factor.factor}
              </span>
              <div className="flex items-center gap-2">
                <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                  <div
                    className={`h-1.5 rounded-full ${
                      factor.value > 0 ? "bg-red-500" : "bg-green-500"
                    }`}
                    style={{
                      width: `${Math.min(Math.abs(factor.value) / 2, 100)}%`,
                    }}
                  />
                </div>
                <span
                  className={`text-xs font-semibold w-16 text-right ${
                    factor.value > 0
                      ? "text-red-600 dark:text-red-400"
                      : "text-green-600 dark:text-green-400"
                  }`}
                >
                  {factor.impact}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
