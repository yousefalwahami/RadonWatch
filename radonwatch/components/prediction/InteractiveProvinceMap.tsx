"use client";

import { useState, useRef, useEffect } from "react";
import { canadaProvinces } from "@/lib/canadaProvincePaths";

interface InteractiveProvinceMapProps {
  selectedRegion: string;
}

// Maps form region values to province codes
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

export default function InteractiveProvinceMap({
  selectedRegion,
}: InteractiveProvinceMapProps) {
  const [viewBox, setViewBox] = useState({ x: 200, y: 150, width: 1600, height: 1350 });
  const [isPanning, setIsPanning] = useState(false);
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
  const svgRef = useRef<SVGSVGElement>(null);
  const animationRef = useRef<number | null>(null);

  const isRegionSelected = (provinceCode: string): boolean => {
    if (!selectedRegion) return false;
    const selectedAreas = regionAreas[selectedRegion] || [];
    return selectedAreas.includes(provinceCode);
  };

  // Calculate bounding box from SVG path
  const getProvinceBounds = (provinceCode: string) => {
    const province = canadaProvinces.find(p => p.code === provinceCode);
    if (!province) return null;

    const path = province.path;
    const numbers = path.match(/[\d.]+/g)?.map(Number) || [];
    const xs = numbers.filter((_, i) => i % 2 === 0);
    const ys = numbers.filter((_, i) => i % 2 === 1);

    if (xs.length === 0 || ys.length === 0) return null;

    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);

    return { minX, maxX, minY, maxY };
  };

  // Smooth animation to target viewBox
  const animateToViewBox = (startViewBox: { x: number; y: number; width: number; height: number }, targetViewBox: { x: number; y: number; width: number; height: number }, duration = 1200) => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    const startTime = performance.now();

    const easeInOutCubic = (t: number) => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeInOutCubic(progress);

      setViewBox({
        x: startViewBox.x + (targetViewBox.x - startViewBox.x) * easedProgress,
        y: startViewBox.y + (targetViewBox.y - startViewBox.y) * easedProgress,
        width: startViewBox.width + (targetViewBox.width - startViewBox.width) * easedProgress,
        height: startViewBox.height + (targetViewBox.height - startViewBox.height) * easedProgress,
      });

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        animationRef.current = null;
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  };

  // Zoom to selected region
  useEffect(() => {
    if (!selectedRegion) {
      // Zoom out to default view
      animateToViewBox(viewBox, { x: 200, y: 150, width: 1600, height: 1350 });
      return;
    }

    const selectedAreas = regionAreas[selectedRegion] || [];
    if (selectedAreas.length === 0) return;

    const provinceCode = selectedAreas[0];
    const bounds = getProvinceBounds(provinceCode);
    
    if (!bounds) return;

    const width = bounds.maxX - bounds.minX;
    const height = bounds.maxY - bounds.minY;
    const padding = 150; // Add padding around the province

    const targetViewBox = {
      x: bounds.minX - padding,
      y: bounds.minY - padding,
      width: width + padding * 2,
      height: height + padding * 2,
    };

    animateToViewBox(viewBox, targetViewBox);
  }, [selectedRegion]);

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsPanning(false);
    window.addEventListener("mouseup", handleGlobalMouseUp);
    return () => {
      window.removeEventListener("mouseup", handleGlobalMouseUp);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    setIsPanning(true);
    setStartPoint({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!isPanning || !svgRef.current) return;

    const dx = e.clientX - startPoint.x;
    const dy = e.clientY - startPoint.y;

    // Scale movement based on viewBox dimensions
    const scaleX = viewBox.width / svgRef.current.clientWidth;
    const scaleY = viewBox.height / svgRef.current.clientHeight;

    setViewBox((prev) => ({
      ...prev,
      x: prev.x - dx * scaleX,
      y: prev.y - dy * scaleY,
    }));

    setStartPoint({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  const handleWheel = (e: React.WheelEvent<SVGSVGElement>) => {
    e.preventDefault();
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    const zoomFactor = e.deltaY > 0 ? 1.1 : 0.9;

    setViewBox((prev) => {
      const newWidth = prev.width * zoomFactor;
      const newHeight = prev.height * zoomFactor;

      // Limit zoom
      if (newWidth < 1000 || newWidth > 4000) return prev;

      return {
        x: prev.x - (newWidth - prev.width) / 2,
        y: prev.y - (newHeight - prev.height) / 2,
        width: newWidth,
        height: newHeight,
      };
    });
  };

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Floating region label */}
      {selectedRegion && (
        <div className="absolute top-4 left-4 z-10 bg-dark-bg/80 backdrop-blur-sm border border-accent-gold/30 rounded-lg px-4 py-2">
          <p className="text-accent-gold font-semibold text-sm">
            📍 {regionNames[selectedRegion] || ""}
          </p>
        </div>
      )}

      {/* Interactive SVG Map */}
      <svg
        ref={svgRef}
        viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`}
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid meet"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onWheel={handleWheel}
        style={{ cursor: isPanning ? "grabbing" : "grab" }}
      >
        {/* Background gradient - extends beyond visible area */}
        <defs>
          <radialGradient id="mapGlow" cx="50%" cy="50%" r="80%">
            <stop offset="0%" stopColor="#0f1a2e" />
            <stop offset="100%" stopColor="#0a0f1a" />
          </radialGradient>
          <filter id="goldGlow">
            <feDropShadow
              dx="0"
              dy="0"
              stdDeviation="8"
              floodColor="#d4af37"
              floodOpacity="0.5"
            />
          </filter>
        </defs>
        {/*
          <rect x="-500" y="-500" width="3500" height="3000" fill="url(#mapGlow)" />
        */}
        {/* Province shapes from GeoJSON data */}
        {canadaProvinces.map((province) => {
          const isSelected = isRegionSelected(province.code);
          return (
            <g key={province.code}>
              <path
                d={province.path}
                fill={isSelected ? "#d4af37" : "#1e3a5f"}
                stroke={isSelected ? "#f7d794" : "#2a4a6e"}
                strokeWidth={isSelected ? 2.5 : 0.8}
                strokeLinejoin="round"
                filter={isSelected ? "url(#goldGlow)" : undefined}
                style={{
                  transition: "fill 0.4s ease-in-out, stroke 0.4s ease-in-out, filter 0.4s ease-in-out",
                }}
              />
              {/* <text
                x={province.labelX}
                y={province.labelY}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={isSelected ? "#0a0f1a" : "#6b82a8"}
                fontSize={province.code === "PE" ? 20 : 29}
                fontWeight={isSelected ? "bold" : "500"}
                fontFamily="Arial, sans-serif"
                style={{
                  pointerEvents: "none",
                  transition: "fill 0.4s ease-in-out, font-weight 0.4s ease-in-out",
                }}
              >
                {province.code}
              </text> */}
            </g>
          );
        })}
      </svg>

      {/* Hint overlay */}
      {!selectedRegion && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-dark-bg/70 backdrop-blur-sm border border-subtle/40 rounded-lg px-4 py-2">
          <p className="text-xs text-text-secondary text-center">
            Drag to pan • Scroll to zoom • Select a region to highlight
          </p>
        </div>
      )}
    </div>
  );
}
