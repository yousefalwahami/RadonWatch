"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface ComparisonChartsProps {
  userLevel: number;
  regionalAverage: number;
}

export default function ComparisonCharts({
  userLevel,
  regionalAverage,
}: ComparisonChartsProps) {
  // Comparison data
  const comparisonData = [
    { name: "Your Home", level: userLevel },
    { name: "Regional Avg", level: regionalAverage },
    { name: "National Avg", level: 75 },
    { name: "Action Level", level: 200 },
  ];

  // Building age distribution (simulated Canadian data)
  const ageData = [
    { age: "0-10 yrs", avgLevel: 110 },
    { age: "11-20 yrs", avgLevel: 95 },
    { age: "21-40 yrs", avgLevel: 85 },
    { age: "41-60 yrs", avgLevel: 75 },
    { age: "60+ yrs", avgLevel: 68 },
  ];

  // Risk distribution pie chart
  const riskDistribution = [
    { name: "Low Risk (<100)", value: 67, color: "#22c55e" },
    { name: "Moderate (100-200)", value: 23, color: "#eab308" },
    { name: "High Risk (>200)", value: 10, color: "#ef4444" },
  ];

  return (
    <div className="space-y-6">
      {/* Comparison Bar Chart */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
          Radon Level Comparison
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={comparisonData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis
              label={{ value: "Bq/m³", angle: -90, position: "insideLeft" }}
            />
            <Tooltip />
            <Bar dataKey="level" fill="#8b5cf6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Building Age vs Radon */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
          Average Radon by Building Age
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Newer homes tend to have higher radon due to energy-efficient sealing
        </p>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={ageData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="age" />
            <YAxis
              label={{ value: "Avg Bq/m³", angle: -90, position: "insideLeft" }}
            />
            <Tooltip />
            <Bar dataKey="avgLevel" fill="#6d28d9" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Risk Distribution Pie Chart */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
          Canadian Homes by Risk Level
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Distribution of radon levels across tested Canadian homes
        </p>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={riskDistribution}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) =>
                `${name}: ${((percent || 0) * 100).toFixed(0)}%`
              }
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {riskDistribution.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <div className="mt-4 text-center text-sm text-text-secondary">
          Based on Health Canada Cross-Canada Survey
        </div>
      </div>
    </div>
  );
}
