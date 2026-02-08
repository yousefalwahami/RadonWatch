"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import RiskDashboard from "@/components/dashboard/RiskDashboard";
import ComparisonCharts from "@/components/dashboard/ComparisonCharts";
import CanadaMap from "@/components/dashboard/CanadaMap";
import { PredictionResult, HomeData } from "@/lib/radonModel";

interface DashboardState {
  prediction: PredictionResult | null;
  regionalAverage: number;
  homeData: HomeData | null;
  isLoaded: boolean;
}

export default function DashboardPage() {
  const router = useRouter();
  const [state, setState] = useState<DashboardState>({
    prediction: null,
    regionalAverage: 0,
    homeData: null,
    isLoaded: false,
  });

  useEffect(() => {
    // Load prediction from sessionStorage after hydration
    const storedPrediction = sessionStorage.getItem("prediction");
    const storedRegionalAvg = sessionStorage.getItem("regionalAverage");
    const storedHomeData = sessionStorage.getItem("homeData");

    if (storedPrediction && storedRegionalAvg) {
      // Use setTimeout to avoid synchronous setState in effect
      setTimeout(() => {
        setState({
          prediction: JSON.parse(storedPrediction),
          regionalAverage: parseInt(storedRegionalAvg),
          homeData: storedHomeData ? JSON.parse(storedHomeData) : null,
          isLoaded: true,
        });
      }, 0);
    } else {
      // No prediction found, redirect to predict page
      router.push("/predict");
    }
  }, [router]);

  if (!state.prediction || !state.isLoaded) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="text-center">
          <p className="text-text-secondary mb-4">
            Loading your results...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/predict"
            className="text-accent-gold hover:text-text-primary font-semibold mb-4 inline-block transition-colors"
          >
            ← Back to Prediction
          </Link>
          <h1 className="text-4xl font-bold text-text-primary mb-2 font-serif">
            Your Radon Risk Dashboard
          </h1>
          <p className="text-text-secondary">
            Comprehensive analysis and recommendations for your home
          </p>
        </div>

        {/* Main Dashboard Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Left Column - Risk Dashboard (2/3 width) */}
          <div className="lg:col-span-2">
            <RiskDashboard result={state.prediction} />
          </div>

          {/* Right Column - Quick Stats */}
          <div className="space-y-6">
            <div className="bg-dark-card border border-subtle p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-text-primary font-serif">
                Your Results
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-text-secondary">
                    Radon Level:
                  </span>
                  <span className="font-bold text-text-primary">
                    {state.prediction.radonLevel} Bq/m³
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Risk Category:
                  </span>
                  <span
                    className={`font-bold ${
                      state.prediction.riskCategory === "LOW"
                        ? "text-green-600"
                        : state.prediction.riskCategory === "MODERATE"
                          ? "text-yellow-600"
                          : "text-red-600"
                    }`}
                  >
                    {state.prediction.riskLabel}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">
                    Regional Avg:
                  </span>
                  <span className="font-bold text-text-primary">
                    {state.regionalAverage} Bq/m³
                  </span>
                </div>
              </div>
            </div>

            {state.homeData && (
              <div className="bg-dark-card border border-subtle p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4 text-text-primary font-serif">
                  Your Home
                </h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-text-secondary">
                      Region:
                    </span>{" "}
                    <span className="text-text-primary">
                      {state.homeData.region.replace(/_/g, " ")}
                    </span>
                  </div>
                  <div>
                    <span className="text-text-secondary">
                      Age:
                    </span>{" "}
                    <span className="text-text-primary">
                      {state.homeData.age} years
                    </span>
                  </div>
                  <div>
                    <span className="text-text-secondary">
                      Foundation:
                    </span>{" "}
                    <span className="text-text-primary capitalize">
                      {state.homeData.foundation}
                    </span>
                  </div>
                  <div>
                    <span className="text-text-secondary">
                      Floor:
                    </span>{" "}
                    <span className="text-text-primary capitalize">
                      {state.homeData.floor}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Comparison Charts */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-6 text-text-primary font-serif">
            Data Analysis & Comparisons
          </h2>
          <ComparisonCharts
            userLevel={state.prediction.radonLevel}
            regionalAverage={state.regionalAverage}
          />
        </div>

        {/* Canada Map */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-6 text-text-primary font-serif">
            Canada-Wide Radon Data
          </h2>
          <CanadaMap />
        </div>

        {/* Bottom CTA */}
        <div className="bg-gradient-to-r from-primary-500 to-primary-700 p-8 rounded-lg shadow-lg text-white text-center">
          <h3 className="text-2xl font-bold mb-4">What&apos;s Next?</h3>
          <p className="mb-6">
            This prediction is educational. Get a real radon test kit to measure
            your actual levels.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a
              href="https://takeactiononradon.ca/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent-gold hover:bg-accent-gold/90 text-dark-bg px-8 py-3 rounded-lg font-bold transition-all"
            >
              Get a Test Kit →
            </a>
            <Link
              href="/predict"
              className="bg-primary-800 hover:bg-primary-900 text-white px-8 py-3 rounded-lg font-bold transition-all"
            >
              Test Another Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
