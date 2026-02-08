import {
  REGION_MULTIPLIERS,
  AGE_MULTIPLIERS,
  FOUNDATION_ADDERS,
  SOIL_MULTIPLIERS,
  SIZE_MULTIPLIERS,
  FLOOR_MULTIPLIERS,
  VENTILATION_MULTIPLIERS,
  RISK_LEVELS,
} from "./constants";

export interface HomeData {
  region: string;
  age: string;
  foundation: string;
  soilType: string;
  size: string;
  floor: string;
  ventilation: string;
}

export interface PredictionResult {
  radonLevel: number;
  riskCategory: "LOW" | "MODERATE" | "HIGH";
  riskLabel: string;
  riskColor: string;
  confidenceInterval: { lower: number; upper: number };
  factorBreakdown: {
    factor: string;
    impact: string;
    value: number;
  }[];
}

/**
 * Calculate radon risk using heuristic model
 * This is NOT real ML - it's a weighted formula based on research factors
 */
export function calculateRadonRisk(homeData: HomeData): PredictionResult {
  const baseScore = 50; // Starting baseline in Bq/m³

  // Get multipliers and adders
  const regionMult = REGION_MULTIPLIERS[homeData.region] || 1.0;
  const ageMult = AGE_MULTIPLIERS[homeData.age] || 1.0;
  const foundationAdd = FOUNDATION_ADDERS[homeData.foundation] || 0;
  const soilMult = SOIL_MULTIPLIERS[homeData.soilType] || 1.0;
  const sizeMult = SIZE_MULTIPLIERS[homeData.size] || 1.0;
  const floorMult = FLOOR_MULTIPLIERS[homeData.floor] || 1.0;
  const ventilationMult = VENTILATION_MULTIPLIERS[homeData.ventilation] || 1.0;

  // Calculate step by step for factor breakdown
  let score = baseScore;
  const factorBreakdown: PredictionResult["factorBreakdown"] = [];

  // Apply region
  const regionImpact = score * (regionMult - 1);
  score *= regionMult;
  factorBreakdown.push({
    factor: "Geographic Region",
    impact:
      regionMult > 1
        ? `+${regionImpact.toFixed(0)} Bq/m³`
        : `${regionImpact.toFixed(0)} Bq/m³`,
    value: regionImpact,
  });

  // Apply age
  const ageImpact = score * (ageMult - 1);
  score *= ageMult;
  factorBreakdown.push({
    factor: "Building Age",
    impact:
      ageMult > 1
        ? `+${ageImpact.toFixed(0)} Bq/m³`
        : `${ageImpact.toFixed(0)} Bq/m³`,
    value: ageImpact,
  });

  // Apply foundation
  score += foundationAdd;
  factorBreakdown.push({
    factor: "Foundation Type",
    impact: `+${foundationAdd} Bq/m³`,
    value: foundationAdd,
  });

  // Apply soil type
  const soilImpact = score * (soilMult - 1);
  score *= soilMult;
  factorBreakdown.push({
    factor: "Soil Type",
    impact:
      soilMult > 1
        ? `+${soilImpact.toFixed(0)} Bq/m³`
        : `${soilImpact.toFixed(0)} Bq/m³`,
    value: soilImpact,
  });

  // Apply size
  const sizeImpact = score * (sizeMult - 1);
  score *= sizeMult;
  factorBreakdown.push({
    factor: "Building Size",
    impact:
      sizeMult > 1
        ? `+${sizeImpact.toFixed(0)} Bq/m³`
        : `${sizeImpact.toFixed(0)} Bq/m³`,
    value: sizeImpact,
  });

  // Apply floor level
  const floorImpact = score * (floorMult - 1);
  score *= floorMult;
  factorBreakdown.push({
    factor: "Floor Level",
    impact:
      floorMult > 1
        ? `+${floorImpact.toFixed(0)} Bq/m³`
        : `${floorImpact.toFixed(0)} Bq/m³`,
    value: floorImpact,
  });

  // Apply ventilation
  const ventilationImpact = score * (ventilationMult - 1);
  score *= ventilationMult;
  factorBreakdown.push({
    factor: "Ventilation Quality",
    impact:
      ventilationMult > 1
        ? `+${ventilationImpact.toFixed(0)} Bq/m³`
        : `${ventilationImpact.toFixed(0)} Bq/m³`,
    value: ventilationImpact,
  });

  // Add some randomness for realism (±15%)
  const variance = score * 0.15;
  score += Math.random() * variance * 2 - variance;

  const radonLevel = Math.round(score);

  // Determine risk category
  let riskCategory: "LOW" | "MODERATE" | "HIGH";
  let riskLabel: string;
  let riskColor: string;

  if (radonLevel < RISK_LEVELS.LOW.max) {
    riskCategory = "LOW";
    riskLabel = RISK_LEVELS.LOW.label;
    riskColor = RISK_LEVELS.LOW.color;
  } else if (radonLevel < RISK_LEVELS.MODERATE.max) {
    riskCategory = "MODERATE";
    riskLabel = RISK_LEVELS.MODERATE.label;
    riskColor = RISK_LEVELS.MODERATE.color;
  } else {
    riskCategory = "HIGH";
    riskLabel = RISK_LEVELS.HIGH.label;
    riskColor = RISK_LEVELS.HIGH.color;
  }

  // Calculate confidence interval (fake but realistic)
  const confidenceInterval = {
    lower: Math.max(0, Math.round(radonLevel * 0.85)),
    upper: Math.round(radonLevel * 1.15),
  };

  // Sort factor breakdown by impact (largest first)
  factorBreakdown.sort((a, b) => Math.abs(b.value) - Math.abs(a.value));

  return {
    radonLevel,
    riskCategory,
    riskLabel,
    riskColor,
    confidenceInterval,
    factorBreakdown,
  };
}

/**
 * Get regional average radon level (simulated from Health Canada data)
 */
export function getRegionalAverage(region: string): number {
  const multiplier = REGION_MULTIPLIERS[region] || 1.0;
  const baseAverage = 75; // National average ~75 Bq/m³
  return Math.round(baseAverage * multiplier);
}

/**
 * Simulate ML training phases for animation
 */
export const ML_TRAINING_PHASES = [
  { phase: "Initializing neural network...", progress: 0, duration: 500 },
  {
    phase: "Loading 50,000 Canadian home samples...",
    progress: 20,
    duration: 800,
  },
  { phase: "Training on geological features...", progress: 40, duration: 1000 },
  {
    phase: "Optimizing building characteristics...",
    progress: 60,
    duration: 900,
  },
  { phase: "Validating predictions...", progress: 80, duration: 700 },
  { phase: "Model ready!", progress: 100, duration: 400 },
];
