"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import HomeInputForm from "@/components/prediction/HomeInputForm";
import MLTrainingAnimation from "@/components/prediction/MLTrainingAnimation";
import PredictionResultDisplay from "@/components/prediction/PredictionResult";
import InteractiveProvinceMap from "@/components/prediction/InteractiveProvinceMap";
import {
  calculateRadonRisk,
  getRegionalAverage,
  HomeData,
  PredictionResult,
} from "@/lib/radonModel";

// Dynamically import 3D component to avoid SSR issues
const HouseVisualization = dynamic(
  () => import("@/components/3d/HouseVisualization"),
  { ssr: false },
);

export default function PredictPage() {
  const router = useRouter();
  const [homeData, setHomeData] = useState<HomeData | null>(null);
  const [isTraining, setIsTraining] = useState(false);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [regionalAverage, setRegionalAverage] = useState(0);
  const [selectedRegion, setSelectedRegion] = useState<string>("");

  const handleFormSubmit = (data: HomeData) => {
    setHomeData(data);
    setIsTraining(true);
  };

  const handleRegionChange = (region: string) => {
    setSelectedRegion(region);
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
    <div className="h-screen bg-dark-bg overflow-hidden flex flex-col">
      {/* Header - compact */}
      <div className="px-6 pt-4 pb-2 flex-shrink-0">
        <Link
          href="/"
          className="text-accent-gold hover:text-text-primary font-semibold text-sm inline-block transition-colors"
        >
          ← Back to Home
        </Link>
        <h1 className="text-2xl font-bold text-text-primary font-serif">
          Radon Risk Prediction
        </h1>
      </div>

      {/* ML Training Animation (full width) */}
      {isTraining && (
        <div className="flex-1 px-6">
          <MLTrainingAnimation onComplete={handleTrainingComplete} />
        </div>
      )}

      {/* Split View: Form + Map OR Results + 3D House */}
      {!isTraining && (
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-[380px_1fr] min-h-0">
          {/* LEFT SIDE */}
          <div className="flex flex-col min-h-0 overflow-y-auto">
            {!prediction ? (
              // Form View
              <HomeInputForm
                onSubmit={handleFormSubmit}
                onRegionChange={handleRegionChange}
              />
            ) : (
              // Results View (Scrollable)
              <div className="flex flex-col h-full overflow-hidden">
                <div className="px-5 py-3 border-b border-subtle flex-shrink-0">
                  <h2 className="text-lg font-bold text-text-primary font-serif">
                    Risk Assessment Results
                  </h2>
                </div>
                <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
                  <PredictionResultDisplay
                    result={prediction}
                    regionalAverage={regionalAverage}
                  />

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-3 pb-4">
                    <button
                      onClick={() => {
                        setPrediction(null);
                        setHomeData(null);
                        setSelectedRegion("");
                      }}
                      className="bg-dark-card-hover hover:bg-accent-gold hover:text-dark-bg border border-subtle text-text-primary px-4 py-2.5 rounded-lg font-bold text-sm transition-all"
                    >
                      ← Test Another Home
                    </button>
                    <button
                      onClick={handleViewDashboard}
                      className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2.5 rounded-lg font-bold text-sm transition-all"
                    >
                      View Full Dashboard →
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT SIDE - fills remaining space seamlessly */}
          <div className="relative min-h-0">
            {!prediction ? (
              <InteractiveProvinceMap selectedRegion={selectedRegion} />
            ) : (
              <HouseVisualization radonLevel={prediction.radonLevel} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
