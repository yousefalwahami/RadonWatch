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
    <div className="min-h-screen bg-dark-bg py-6">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-6">
          <Link
            href="/"
            className="text-accent-gold hover:text-text-primary font-semibold mb-4 inline-block transition-colors"
          >
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-text-primary mb-2 font-serif">
            Radon Risk Prediction
          </h1>
          <p className="text-text-secondary">
            Enter your home details to get an AI-powered radon risk assessment
          </p>
        </div>

        {/* ML Training Animation (full width) */}
        {isTraining && (
          <MLTrainingAnimation onComplete={handleTrainingComplete} />
        )}

        {/* Split View: Form + Map OR Results + 3D House */}
        {!isTraining && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[600px]">
            {/* LEFT SIDE */}
            <div className="flex flex-col">
              {!prediction ? (
                // Form View
                <HomeInputForm
                  onSubmit={handleFormSubmit}
                  onRegionChange={handleRegionChange}
                />
              ) : (
                // Results View (Scrollable)
                <div className="bg-dark-card border border-subtle rounded-lg overflow-hidden flex flex-col h-full">
                  <div className="p-6 border-b border-subtle">
                    <h2 className="text-2xl font-bold text-text-primary font-serif">
                      Risk Assessment Results
                    </h2>
                  </div>
                  <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    <PredictionResultDisplay
                      result={prediction}
                      regionalAverage={regionalAverage}
                    />

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-4">
                      <button
                        onClick={() => {
                          setPrediction(null);
                          setHomeData(null);
                          setSelectedRegion("");
                        }}
                        className="bg-dark-card-hover hover:bg-accent-gold hover:text-dark-bg border border-subtle text-text-primary px-6 py-3 rounded-lg font-bold transition-all"
                      >
                        ← Test Another Home
                      </button>
                      <button
                        onClick={handleViewDashboard}
                        className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-bold transition-all"
                      >
                        View Full Dashboard →
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT SIDE */}
            <div className="flex flex-col">
              {!prediction ? (
                // Interactive Map View
                <InteractiveProvinceMap selectedRegion={selectedRegion} />
              ) : (
                // 3D House Visualization
                <div className="bg-dark-card border border-subtle p-6 rounded-lg h-full flex flex-col">
                  <div className="mb-4">
                    <h2 className="text-2xl font-bold text-text-primary font-serif mb-2">
                      3D Radon Visualization
                    </h2>
                    <p className="text-text-secondary text-sm">
                      Interactive 3D model showing radon flow through your home
                    </p>
                  </div>
                  <div className="flex-1">
                    <HouseVisualization radonLevel={prediction.radonLevel} />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
