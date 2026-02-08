"use client";

import { useState } from "react";
import { HomeData } from "@/lib/radonModel";

interface HomeInputFormProps {
  onSubmit: (data: HomeData) => void;
  onRegionChange?: (region: string) => void;
}

export default function HomeInputForm({
  onSubmit,
  onRegionChange,
}: HomeInputFormProps) {
  const [formData, setFormData] = useState<HomeData>({
    region: "",
    age: "",
    foundation: "",
    soilType: "",
    size: "",
    floor: "",
    ventilation: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (field: keyof HomeData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Notify parent when region changes
    if (field === "region" && onRegionChange) {
      onRegionChange(value);
    }
  };

  const isFormValid = Object.values(formData).every((value) => value !== "");

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-dark-card border border-subtle p-6 rounded-lg h-full overflow-y-auto"
    >
      <h2 className="text-2xl font-bold mb-4 text-text-primary font-serif">
        Enter Your Home Details
      </h2>

      {/* Region */}
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1.5 text-gray-700 dark:text-gray-300">
          Geographic Region
        </label>
        <select
          value={formData.region}
          onChange={(e) => handleChange("region", e.target.value)}
          className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
          required
        >
          <option value="">Select your region...</option>
          <option value="BC_Interior">BC Interior</option>
          <option value="BC_Northern">BC Northern</option>
          <option value="BC_Coastal">BC Coastal</option>
          <option value="Alberta">Alberta</option>
          <option value="Saskatchewan">Saskatchewan</option>
          <option value="Manitoba">Manitoba</option>
          <option value="Ontario_North">Ontario (North)</option>
          <option value="Ontario_South">Ontario (South)</option>
          <option value="Quebec_North">Quebec (North)</option>
          <option value="Quebec_South">Quebec (South)</option>
          <option value="New_Brunswick">New Brunswick</option>
          <option value="Nova_Scotia">Nova Scotia</option>
          <option value="PEI">Prince Edward Island</option>
          <option value="Newfoundland">Newfoundland</option>
          <option value="Yukon">Yukon</option>
          <option value="NWT">Northwest Territories</option>
          <option value="Nunavut">Nunavut</option>
        </select>
      </div>

      {/* Building Age */}
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1.5 text-gray-700 dark:text-gray-300">
          Building Age
        </label>
        <select
          value={formData.age}
          onChange={(e) => handleChange("age", e.target.value)}
          className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
          required
        >
          <option value="">Select building age...</option>
          <option value="0-10">0-10 years (Modern)</option>
          <option value="11-20">11-20 years</option>
          <option value="21-40">21-40 years</option>
          <option value="41-60">41-60 years</option>
          <option value="60+">60+ years (Heritage)</option>
        </select>
      </div>

      {/* Foundation Type */}
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1.5 text-gray-700 dark:text-gray-300">
          Foundation Type
        </label>
        <select
          value={formData.foundation}
          onChange={(e) => handleChange("foundation", e.target.value)}
          className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
          required
        >
          <option value="">Select foundation type...</option>
          <option value="basement">Full Basement</option>
          <option value="crawlspace">Crawlspace</option>
          <option value="slab">Slab on Grade</option>
          <option value="elevated">Elevated/Stilts</option>
        </select>
      </div>

      {/* Soil Type */}
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1.5 text-gray-700 dark:text-gray-300">
          Soil/Bedrock Type (if known)
        </label>
        <select
          value={formData.soilType}
          onChange={(e) => handleChange("soilType", e.target.value)}
          className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
          required
        >
          <option value="">Select soil type...</option>
          <option value="granite">Granite (Igneous rock)</option>
          <option value="carbonate">Carbonate/Limestone</option>
          <option value="shale">Shale</option>
          <option value="clay">Clay</option>
          <option value="sand">Sand</option>
          <option value="sedimentary">Sedimentary</option>
          <option value="unknown">Unknown</option>
        </select>
      </div>

      {/* Building Size */}
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1.5 text-gray-700 dark:text-gray-300">
          Building Size
        </label>
        <select
          value={formData.size}
          onChange={(e) => handleChange("size", e.target.value)}
          className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
          required
        >
          <option value="">Select building size...</option>
          <option value="small">&lt;1500 sq ft (Small)</option>
          <option value="medium">1500-2500 sq ft (Medium)</option>
          <option value="large">2500-3500 sq ft (Large)</option>
          <option value="xlarge">&gt;3500 sq ft (Extra Large)</option>
        </select>
      </div>

      {/* Floor Level */}
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1.5 text-gray-700 dark:text-gray-300">
          Primary Living Floor
        </label>
        <select
          value={formData.floor}
          onChange={(e) => handleChange("floor", e.target.value)}
          className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
          required
        >
          <option value="">Select floor level...</option>
          <option value="basement">Basement</option>
          <option value="ground">Ground Floor</option>
          <option value="upper">Upper Floor</option>
        </select>
      </div>

      {/* Ventilation */}
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1.5 text-gray-700 dark:text-gray-300">
          Ventilation Quality
        </label>
        <select
          value={formData.ventilation}
          onChange={(e) => handleChange("ventilation", e.target.value)}
          className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
          required
        >
          <option value="">Select ventilation quality...</option>
          <option value="poor">Poor (Minimal airflow)</option>
          <option value="average">Average (Natural ventilation)</option>
          <option value="good">Good (Windows/fans regularly used)</option>
          <option value="mechanical">Mechanical (HRV/ERV system)</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={!isFormValid}
        className={`w-full py-3 rounded-lg font-bold transition-all ${
          isFormValid
            ? "bg-accent-gold hover:bg-accent-gold/90 text-dark-bg shadow-lg hover:shadow-glow-gold"
            : "bg-dark-card-hover border border-subtle text-text-secondary cursor-not-allowed"
        }`}
      >
        Analyze My Radon Risk 🔬
      </button>
    </form>
  );
}
