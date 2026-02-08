"use client";

import { useEffect, useState } from "react";
import {
  loadRadonData,
  calculateProvinceStats,
  ProvinceStats,
  getRiskColor,
  getRiskLabel,
} from "@/lib/dataLoader";

export default function CanadaMap() {
  const [provinces, setProvinces] = useState<ProvinceStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await loadRadonData();
        const stats = calculateProvinceStats(data);
        setProvinces(stats);
        setLoading(false);
      } catch (err) {
        console.error("Error loading radon data:", err);
        setError("Failed to load radon data");
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg">
        <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          Canada-Wide Radon Risk Map
        </h3>
        <p className="text-gray-600 dark:text-gray-400">Loading real data from Health Canada...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg">
        <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          Canada-Wide Radon Risk Map
        </h3>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        Canada-Wide Radon Risk Map
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
        Real data from Health Canada&apos;s Cross-Canada Survey ({provinces.reduce((sum, p) => sum + p.count, 0).toLocaleString()} measurements)
      </p>

      {/* Map representation */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {provinces.map((province) => (
          <div
            key={province.code}
            className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-semibold text-gray-900 dark:text-white">
                {province.name}
              </h4>
              <span
                className={`${getRiskColor(province.average)} text-white text-xs px-2 py-1 rounded`}
              >
                {getRiskLabel(province.average)}
              </span>
            </div>
            <div className="text-2xl font-bold text-primary-600 mb-1">
              {province.average} Bq/m³
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
              <div>Median: {province.median} Bq/m³</div>
              <div>Range: {province.min} - {province.max} Bq/m³</div>
              <div>{province.count.toLocaleString()} tests</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
          Risk Level Guide
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <div className="bg-green-400 w-4 h-4 rounded"></div>
            <span className="text-gray-700 dark:text-gray-300">
              Low Risk: &lt; 100 Bq/m³
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-yellow-400 w-4 h-4 rounded"></div>
            <span className="text-gray-700 dark:text-gray-300">
              Moderate: 100-200 Bq/m³
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-red-400 w-4 h-4 rounded"></div>
            <span className="text-gray-700 dark:text-gray-300">
              High Risk: &gt;200 Bq/m³
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

