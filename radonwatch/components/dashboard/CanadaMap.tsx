"use client";

export default function CanadaMap() {
  // Regional radon data (average Bq/m³)
  const regions = [
    { name: "British Columbia", avg: 95, risk: "moderate" },
    { name: "Alberta", avg: 132, risk: "moderate" },
    { name: "Saskatchewan", avg: 125, risk: "moderate" },
    { name: "Manitoba", avg: 105, risk: "moderate" },
    { name: "Ontario", avg: 89, risk: "low" },
    { name: "Quebec", avg: 95, risk: "moderate" },
    { name: "New Brunswick", avg: 88, risk: "low" },
    { name: "Nova Scotia", avg: 82, risk: "low" },
    { name: "PEI", avg: 75, risk: "low" },
    { name: "Newfoundland", avg: 80, risk: "low" },
    { name: "Yukon", avg: 118, risk: "moderate" },
    { name: "NWT", avg: 110, risk: "moderate" },
    { name: "Nunavut", avg: 92, risk: "moderate" },
  ];

  const getRiskColor = (avg: number) => {
    if (avg < 100) return "bg-green-400";
    if (avg < 150) return "bg-yellow-400";
    return "bg-red-400";
  };

  const getRiskLabel = (avg: number) => {
    if (avg < 100) return "Low Risk";
    if (avg < 150) return "Moderate Risk";
    return "High Risk";
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        Canada-Wide Radon Risk Map
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
        Average radon levels by province/territory based on Health Canada data
      </p>

      {/* Simplified map representation (list view for hackathon speed) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {regions.map((region) => (
          <div
            key={region.name}
            className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-semibold text-gray-900 dark:text-white">
                {region.name}
              </h4>
              <div
                className={`w-3 h-3 rounded-full ${getRiskColor(region.avg)}`}
              />
            </div>
            <div className="text-2xl font-bold text-radon-600 mb-1">
              {region.avg}{" "}
              <span className="text-sm font-normal text-gray-500">Bq/m³</span>
            </div>
            <div className="text-xs text-gray-500">
              {getRiskLabel(region.avg)}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-green-400" />
            <span className="text-gray-600 dark:text-gray-400">
              &lt;100 Bq/m³ (Low)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-yellow-400" />
            <span className="text-gray-600 dark:text-gray-400">
              100-150 Bq/m³ (Moderate)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-red-400" />
            <span className="text-gray-600 dark:text-gray-400">
              &gt;150 Bq/m³ (High)
            </span>
          </div>
        </div>
        <p className="text-xs text-center text-gray-500 mt-4">
          Data source: Health Canada Cross-Canada Radon Survey
        </p>
      </div>
    </div>
  );
}
