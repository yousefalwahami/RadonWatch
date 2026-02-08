"use client";

interface InteractiveProvinceMapProps {
  selectedRegion: string;
}

// Map of regions to their geographic areas for highlighting
const regionAreas: Record<string, string[]> = {
  BC_Interior: ["BC"],
  BC_Northern: ["BC"],
  BC_Coastal: ["BC"],
  Alberta: ["AB"],
  Saskatchewan: ["SK"],
  Manitoba: ["MB"],
  Ontario_North: ["ON"],
  Ontario_South: ["ON"],
  Quebec_North: ["QC"],
  Quebec_South: ["QC"],
  New_Brunswick: ["NB"],
  Nova_Scotia: ["NS"],
  PEI: ["PE"],
  Newfoundland: ["NL"],
  Yukon: ["YT"],
  NWT: ["NT"],
  Nunavut: ["NU"],
};

export default function InteractiveProvinceMap({
  selectedRegion,
}: InteractiveProvinceMapProps) {
  const isRegionSelected = (regionCode: string): boolean => {
    if (!selectedRegion) return false;
    const selectedAreas = regionAreas[selectedRegion] || [];
    return selectedAreas.includes(regionCode);
  };

  const getRegionName = (): string => {
    const regionNames: Record<string, string> = {
      BC_Interior: "BC Interior",
      BC_Northern: "BC Northern",
      BC_Coastal: "BC Coastal",
      Alberta: "Alberta",
      Saskatchewan: "Saskatchewan",
      Manitoba: "Manitoba",
      Ontario_North: "Ontario (North)",
      Ontario_South: "Ontario (South)",
      Quebec_North: "Quebec (North)",
      Quebec_South: "Quebec (South)",
      New_Brunswick: "New Brunswick",
      Nova_Scotia: "Nova Scotia",
      PEI: "Prince Edward Island",
      Newfoundland: "Newfoundland",
      Yukon: "Yukon",
      NWT: "Northwest Territories",
      Nunavut: "Nunavut",
    };
    return regionNames[selectedRegion] || "";
  };

  const provinces = [
    {
      code: "BC",
      name: "British Columbia",
      x: 10,
      y: 120,
      width: 120,
      height: 140,
    },
    { code: "AB", name: "Alberta", x: 140, y: 120, width: 90, height: 140 },
    {
      code: "SK",
      name: "Saskatchewan",
      x: 240,
      y: 130,
      width: 85,
      height: 120,
    },
    { code: "MB", name: "Manitoba", x: 335, y: 140, width: 85, height: 110 },
    { code: "ON", name: "Ontario", x: 430, y: 170, width: 140, height: 90 },
    { code: "QC", name: "Quebec", x: 580, y: 150, width: 130, height: 120 },
    {
      code: "NB",
      name: "New Brunswick",
      x: 720,
      y: 210,
      width: 60,
      height: 50,
    },
    { code: "NS", name: "Nova Scotia", x: 750, y: 265, width: 70, height: 30 },
    { code: "PE", name: "PEI", x: 730, y: 200, width: 25, height: 15 },
    {
      code: "NL",
      name: "Newfoundland",
      x: 770,
      y: 120,
      width: 100,
      height: 110,
    },
    { code: "YT", name: "Yukon", x: 40, y: 20, width: 90, height: 90 },
    {
      code: "NT",
      name: "Northwest Territories",
      x: 150,
      y: 20,
      width: 180,
      height: 90,
    },
    { code: "NU", name: "Nunavut", x: 340, y: 20, width: 280, height: 110 },
  ];

  return (
    <div className="bg-dark-card border border-subtle p-6 rounded-lg h-full flex flex-col">
      <h3 className="text-2xl font-bold mb-2 text-text-primary font-serif">
        Select Your Region
      </h3>
      {selectedRegion ? (
        <p className="text-accent-gold font-semibold mb-4">
          📍 {getRegionName()}
        </p>
      ) : (
        <p className="text-text-secondary mb-4">
          Choose your province or territory from the form
        </p>
      )}

      {/* SVG Map of Canada */}
      <div className="flex-1 flex items-center justify-center">
        <svg
          viewBox="0 0 900 350"
          className="w-full h-full"
          style={{ maxHeight: "500px" }}
        >
          {/* Background */}
          <rect width="900" height="350" fill="#0a0f1a" />

          {/* Water/Ocean - lighter blue background */}
          <rect width="900" height="350" fill="#1a2332" opacity="0.5" />

          {/* Provinces */}
          {provinces.map((province) => {
            const isSelected = isRegionSelected(province.code);
            return (
              <g key={province.code}>
                <rect
                  x={province.x}
                  y={province.y}
                  width={province.width}
                  height={province.height}
                  fill={isSelected ? "#d4af37" : "#2d3748"}
                  stroke={isSelected ? "#f7d794" : "#4a5568"}
                  strokeWidth={isSelected ? 3 : 1.5}
                  rx={4}
                  style={{
                    transition: "all 0.3s ease-in-out",
                  }}
                />
                <text
                  x={province.x + province.width / 2}
                  y={province.y + province.height / 2}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={isSelected ? "#0a0f1a" : "#a0aec0"}
                  fontSize={province.width < 80 ? "10" : "14"}
                  fontWeight={isSelected ? "bold" : "normal"}
                  style={{
                    pointerEvents: "none",
                    transition: "all 0.3s ease-in-out",
                  }}
                >
                  {province.code}
                </text>
              </g>
            );
          })}

          {/* Legend */}
          <g transform="translate(20, 310)">
            <rect
              x="0"
              y="0"
              width="20"
              height="15"
              fill="#2d3748"
              stroke="#4a5568"
              strokeWidth="1"
              rx="2"
            />
            <text x="25" y="12" fill="#a0aec0" fontSize="12">
              Not Selected
            </text>

            <rect
              x="120"
              y="0"
              width="20"
              height="15"
              fill="#d4af37"
              stroke="#f7d794"
              strokeWidth="2"
              rx="2"
            />
            <text x="145" y="12" fill="#d4af37" fontSize="12" fontWeight="bold">
              Selected Region
            </text>
          </g>
        </svg>
      </div>

      {/* Info text */}
      {!selectedRegion && (
        <div className="mt-4 p-4 bg-dark-bg rounded-lg border border-subtle">
          <p className="text-sm text-text-secondary text-center">
            💡 Select a region from the dropdown to see it highlighted on the
            map
          </p>
        </div>
      )}
    </div>
  );
}
