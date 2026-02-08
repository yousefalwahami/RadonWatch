/**
 * Converts Canada provinces GeoJSON to SVG path data
 * Uses a simple projection matching the map.svg viewBox (0 0 2000 1650)
 */
import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const geoJsonPath = join(__dirname, "..", "public", "data", "canada.geojson");
const outputPath = join(__dirname, "..", "lib", "canadaProvincePaths.ts");

const geojson = JSON.parse(readFileSync(geoJsonPath, "utf-8"));

// Province code mapping
const nameToCode = {
  Alberta: "AB",
  "British Columbia": "BC",
  Manitoba: "MB",
  "New Brunswick": "NB",
  "Newfoundland and Labrador": "NL",
  "Northwest Territories": "NT",
  "Nova Scotia": "NS",
  Nunavut: "NU",
  Ontario: "ON",
  "Prince Edward Island": "PE",
  Quebec: "QC",
  Saskatchewan: "SK",
  "Yukon Territory": "YT",
};

// Map label positions from the original map.svg (used for label placement)
const labelPositions = {
  QC: { x: 1425, y: 1171 },
  NL: { x: 1622, y: 1013 },
  ON: { x: 1080, y: 1282 },
  MB: { x: 808.9, y: 1188 },
  SK: { x: 622.1, y: 1158 },
  AB: { x: 424.8, y: 1103 },
  BC: { x: 216.8, y: 1024 },
  YT: { x: 193.2, y: 600.2 },
  NT: { x: 466.9, y: 726.5 },
  NU: { x: 835.3, y: 747.6 },
  NB: { x: 1638, y: 1321 },
  PE: { x: 1704, y: 1222 },
  NS: { x: 1803, y: 1365 },
};

// Projection: Convert lat/lon to SVG coordinates
// We need to match the map.svg viewBox (0 0 2000 1650)
// Canada roughly spans: lon -141 to -52, lat 42 to 84

const lonMin = -141;
const lonMax = -52;
const latMin = 41;
const latMax = 84;

// SVG viewBox
const svgWidth = 2000;
const svgHeight = 1650;

// Padding
const padLeft = 40;
const padRight = 40;
const padTop = 40;
const padBottom = 40;
const drawWidth = svgWidth - padLeft - padRight;
const drawHeight = svgHeight - padTop - padBottom;

function projectLon(lon) {
  return padLeft + ((lon - lonMin) / (lonMax - lonMin)) * drawWidth;
}

function projectLat(lat) {
  // SVG y is inverted vs latitude
  return padTop + ((latMax - lat) / (latMax - latMin)) * drawHeight;
}

function coordsToPath(coords) {
  const points = coords.map(([lon, lat]) => {
    const x = projectLon(lon);
    const y = projectLat(lat);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });

  if (points.length === 0) return "";
  return `M${points.join("L")}Z`;
}

function multiPolygonToPath(multiPolygon) {
  const paths = [];
  for (const polygon of multiPolygon) {
    for (const ring of polygon) {
      const p = coordsToPath(ring);
      if (p) paths.push(p);
    }
  }
  return paths.join(" ");
}

// Generate province paths
const provinces = {};
for (const feature of geojson.features) {
  const name = feature.properties.name;
  const code = nameToCode[name];
  if (!code) {
    console.warn(`Unknown province: ${name}`);
    continue;
  }

  const pathData = multiPolygonToPath(feature.geometry.coordinates);
  provinces[code] = {
    path: pathData,
    label: labelPositions[code] || { x: 0, y: 0 },
    name: name,
  };
}

// Generate TypeScript file
let tsContent = `// Auto-generated from Canada GeoJSON data
// Source: codeforamerica/click_that_hood (public domain)
// Projection: Equirectangular, viewBox 0 0 2000 1650

export interface ProvinceData {
  code: string;
  name: string;
  path: string;
  labelX: number;
  labelY: number;
}

export const canadaProvinces: ProvinceData[] = [\n`;

for (const [code, data] of Object.entries(provinces)) {
  tsContent += `  {\n`;
  tsContent += `    code: "${code}",\n`;
  tsContent += `    name: "${data.name}",\n`;
  tsContent += `    path: "${data.path}",\n`;
  tsContent += `    labelX: ${data.label.x},\n`;
  tsContent += `    labelY: ${data.label.y},\n`;
  tsContent += `  },\n`;
}

tsContent += `];\n`;

writeFileSync(outputPath, tsContent, "utf-8");
console.log(`Generated ${outputPath}`);
console.log(`Provinces: ${Object.keys(provinces).join(", ")}`);

// Also output a quick validation: bounding boxes
for (const [code, data] of Object.entries(provinces)) {
  const nums = data.path.match(/[\d.]+/g).map(Number);
  const xs = nums.filter((_, i) => i % 2 === 0);
  const ys = nums.filter((_, i) => i % 2 === 1);
  console.log(
    `${code}: x=[${Math.min(...xs).toFixed(0)}-${Math.max(...xs).toFixed(0)}] y=[${Math.min(...ys).toFixed(0)}-${Math.max(...ys).toFixed(0)}]`,
  );
}
