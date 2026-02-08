// Health Canada thresholds and risk levels
export const HEALTH_CANADA_THRESHOLD = 200; // Bq/m³

export const RISK_LEVELS = {
  LOW: { min: 0, max: 100, label: "Low Risk", color: "green" },
  MODERATE: { min: 100, max: 200, label: "Moderate Risk", color: "yellow" },
  HIGH: { min: 200, max: Infinity, label: "High Risk", color: "red" },
} as const;

// Regional multipliers based on Health Canada data
export const REGION_MULTIPLIERS: Record<string, number> = {
  BC_Interior: 2.5, // High risk: granite bedrock
  BC_Northern: 2.3,
  BC_Coastal: 0.8, // Low risk: sedimentary
  Alberta: 2.2, // Prairie provinces high risk
  Saskatchewan: 2.1,
  Manitoba: 1.8,
  Ontario_North: 1.7,
  Ontario_South: 1.5,
  Quebec_North: 1.8,
  Quebec_South: 1.6,
  New_Brunswick: 1.5,
  Nova_Scotia: 1.4,
  PEI: 1.3,
  Newfoundland: 1.4,
  Yukon: 2.0,
  NWT: 1.9,
  Nunavut: 1.6,
};

// Building age multipliers (newer = worse due to energy efficiency)
export const AGE_MULTIPLIERS: Record<string, number> = {
  "0-10": 1.4, // Modern energy-efficient homes trap radon
  "11-20": 1.3,
  "21-40": 1.2,
  "41-60": 1.0,
  "60+": 0.9, // Older homes more permeable
};

// Foundation type impact
export const FOUNDATION_ADDERS: Record<string, number> = {
  basement: 40, // Direct soil contact
  crawlspace: 30,
  slab: 10,
  elevated: 0,
};

// Soil type (geological factor)
export const SOIL_MULTIPLIERS: Record<string, number> = {
  granite: 1.5, // High uranium content
  carbonate: 1.3,
  shale: 1.25,
  clay: 1.2,
  sand: 1.0,
  sedimentary: 0.8,
  unknown: 1.0,
};

// Building size multipliers (larger footprint = more soil contact)
export const SIZE_MULTIPLIERS: Record<string, number> = {
  small: 0.9, // <1500 sq ft
  medium: 1.0, // 1500-2500 sq ft
  large: 1.2, // 2500-3500 sq ft
  xlarge: 1.4, // >3500 sq ft
};

// Floor level multipliers
export const FLOOR_MULTIPLIERS: Record<string, number> = {
  basement: 1.3,
  ground: 1.0,
  upper: 0.7,
};

// Ventilation quality multipliers
export const VENTILATION_MULTIPLIERS: Record<string, number> = {
  poor: 1.3,
  average: 1.0,
  good: 0.8,
  mechanical: 0.6, // HRV/ERV systems
};

// Mitigation strategies
export const MITIGATION_STRATEGIES = [
  {
    title: "Sub-Slab Depressurization",
    description:
      "Install a pipe and fan system to draw radon from beneath the foundation",
    cost: "$1,500 - $3,000",
    effectiveness: "99%",
    difficulty: "Professional",
  },
  {
    title: "Sealing Cracks",
    description: "Seal foundation cracks and openings to reduce radon entry",
    cost: "$500 - $1,500",
    effectiveness: "50%",
    difficulty: "DIY/Professional",
  },
  {
    title: "Improve Ventilation",
    description: "Install HRV/ERV system or increase natural ventilation",
    cost: "$2,000 - $6,000",
    effectiveness: "30-50%",
    difficulty: "Professional",
  },
  {
    title: "Crawlspace Ventilation",
    description: "Improve airflow in crawlspace with fans and vents",
    cost: "$800 - $2,000",
    effectiveness: "70%",
    difficulty: "Professional",
  },
];

// Educational content stages
export const EDUCATION_STAGES = [
  {
    id: 1,
    title: "What is Radon?",
    unlocks: "basic_info",
  },
  {
    id: 2,
    title: "Where Does It Come From?",
    unlocks: "decay_chain",
  },
  {
    id: 3,
    title: "How Do We Predict It?",
    unlocks: "prediction_model",
  },
  {
    id: 4,
    title: "How Do We Fix It?",
    unlocks: "mitigation",
  },
];
