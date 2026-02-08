"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import HomeInputForm from "@/components/prediction/HomeInputForm";
import MLTrainingAnimation from "@/components/prediction/MLTrainingAnimation";
import PredictionResultDisplay from "@/components/prediction/PredictionResult";
import {
  calculateRadonRisk,
  getRegionalAverage,
  HomeData,
  PredictionResult,
} from "@/lib/radonModel";

// Dynamically import 3D component to avoid SSR issues
const HouseVisualization = dynamic(
  () => import("@/components/3d/HouseVisualization"),
  { ssr: false }
);

export default function PredictPage() {
  const router = useRouter();
  const [homeData, setHomeData] = useState<HomeData | null>(null);
  const [isTraining, setIsTraining] = useState(false);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [regionalAverage, setRegionalAverage] = useState(0);

  const handleFormSubmit = (data: HomeData) => {
    setHomeData(data);
    setIsTraining(true);
  };

  const handleTrainingComplete = () => {
    if (!homeData) return;

    // Calculate prediction
    const result = calculateRadonRisk(homeData);
    const regAvg = getRegionalAverage(homeData.region);

    setPrediction(result);
    setRegionalAverage(regAvg);
    setIsTraining(false);

    // Store in sessionStorage for dashboard
    if (typeof window !== "undefined") {
      sessionStorage.setItem("prediction", JSON.stringify(result));
      sessionStorage.setItem("regionalAverage", regAvg.toString());
      sessionStorage.setItem("homeData", JSON.stringify(homeData));
    }
  };

  const handleViewDashboard = () => {
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="text-primary-600 hover:text-primary-700 font-semibold mb-4 inline-block"
          >
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Radon Risk Prediction
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Enter your home details to get an AI-powered radon risk assessment
          </p>
        </div>

        {/* Input Form (shown when no prediction yet) */}
        {!prediction && !isTraining && (
          <HomeInputForm onSubmit={handleFormSubmit} />
        )}

        {/* ML Training Animation */}
        {isTraining && (
          <MLTrainingAnimation onComplete={handleTrainingComplete} />
        )}

        {/* Results */}
        {prediction && !isTraining && (
          <div className="space-y-8">
            {/* Prediction Result */}
            <PredictionResultDisplay
              result={prediction}
              regionalAverage={regionalAverage}
            />

            {/* 3D Visualization */}
            <div>
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                3D Radon Visualization
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                See how radon flows through your home. Try adjusting the
                controls!
              </p>
              <HouseVisualization radonLevel={prediction.radonLevel} />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  setPrediction(null);
                  setHomeData(null);
                }}
                className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all"
              >
                ← Test Another Home
              </button>
              <button
                onClick={handleViewDashboard}
                className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all"
              >
                View Full Dashboard →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
