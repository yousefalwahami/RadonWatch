import Papa from "papaparse";

export interface RadonDataRow {
  ResultNumber: string;
  ProvinceTerritory: string;
  HealthRegion2007: string;
  HealthRegionCode2007: string;
  ForwardSortationAreaCodes: string;
  TestDurationInDays: string;
  AverageRadonConcentrationInBqPerM3: string;
}

export interface ProvinceStats {
  name: string;
  code: string;
  average: number;
  median: number;
  count: number;
  min: number;
  max: number;
}

// Province code mapping
const PROVINCE_MAP: Record<string, string> = {
  NL: "Newfoundland and Labrador",
  PE: "Prince Edward Island",
  NS: "Nova Scotia",
  NB: "New Brunswick",
  QC: "Quebec",
  ON: "Ontario",
  MB: "Manitoba",
  SK: "Saskatchewan",
  AB: "Alberta",
  BC: "British Columbia",
  YT: "Yukon",
  NT: "Northwest Territories",
  NU: "Nunavut",
};

export async function loadRadonData(): Promise<RadonDataRow[]> {
  const response = await fetch("/data/radon-concentration.csv");
  const csvText = await response.text();

  return new Promise((resolve, reject) => {
    Papa.parse<RadonDataRow>(csvText, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        resolve(results.data);
      },
      error: (error: Error) => {
        reject(error);
      },
    });
  });
}

export function calculateProvinceStats(data: RadonDataRow[]): ProvinceStats[] {
  const provinceData = new Map<string, number[]>();

  // Group concentrations by province
  data.forEach((row) => {
    const province = row.ProvinceTerritory;
    const concentration = parseFloat(
      row.AverageRadonConcentrationInBqPerM3.replace("<", "")
    );

    if (!isNaN(concentration) && concentration > 0 && province) {
      if (!provinceData.has(province)) {
        provinceData.set(province, []);
      }
      provinceData.get(province)!.push(concentration);
    }
  });

  // Calculate stats for each province
  const stats: ProvinceStats[] = [];

  provinceData.forEach((concentrations, code) => {
    const sorted = concentrations.sort((a, b) => a - b);
    const sum = sorted.reduce((a, b) => a + b, 0);
    const average = Math.round(sum / sorted.length);
    const median = Math.round(
      sorted.length % 2 === 0
        ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
        : sorted[Math.floor(sorted.length / 2)]
    );

    stats.push({
      name: PROVINCE_MAP[code] || code,
      code,
      average,
      median,
      count: sorted.length,
      min: Math.round(sorted[0]),
      max: Math.round(sorted[sorted.length - 1]),
    });
  });

  return stats.sort((a, b) => b.average - a.average);
}

export function getRiskLevel(concentration: number) {
  if (concentration < 100) return "low";
  if (concentration < 200) return "moderate";
  return "high";
}

export function getRiskColor(concentration: number) {
  if (concentration < 100) return "bg-green-400";
  if (concentration < 200) return "bg-yellow-400";
  return "bg-red-400";
}

export function getRiskLabel(concentration: number) {
  if (concentration < 100) return "Low Risk";
  if (concentration < 200) return "Moderate Risk";
  return "High Risk";
}
