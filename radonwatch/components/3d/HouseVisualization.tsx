"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

interface RadonParticlesProps {
  radonLevel: number;
  airPressure: number;
  ventilationActive: boolean;
}

function RadonParticles({
  radonLevel,
  airPressure,
  ventilationActive,
}: RadonParticlesProps) {
  const particlesRef = useRef<THREE.Points>(null);

  // Calculate particle count based on radon level
  const particleCount = Math.min(Math.floor(radonLevel * 2), 1000);

  const particles = useState(() => {
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      // Start particles in the soil/foundation area
      positions[i * 3] = (Math.random() - 0.5) * 4; // x
      positions[i * 3 + 1] = Math.random() * -1; // y (below ground)
      positions[i * 3 + 2] = (Math.random() - 0.5) * 3; // z

      // Upward velocity
      velocities[i * 3] = (Math.random() - 0.5) * 0.01;
      velocities[i * 3 + 1] = Math.random() * 0.02 + 0.01; // Upward
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.01;

      // Color based on concentration (green to yellow to red)
      const intensity = radonLevel / 400;
      colors[i * 3] = Math.min(1, intensity * 2); // R
      colors[i * 3 + 1] = Math.min(1, 2 - intensity * 2); // G
      colors[i * 3 + 2] = 0; // B
    }

    return { positions, velocities, colors };
  })[0];

  useFrame(() => {
    if (!particlesRef.current) return;

    const positions = particlesRef.current.geometry.attributes.position
      .array as Float32Array;
    const velocities = particles.velocities;

    const speedMultiplier = airPressure;
    const dispersal = ventilationActive ? 0.03 : 0;

    for (let i = 0; i < particleCount; i++) {
      // Update positions based on velocities
      // Use time-based variation instead of Math.random for deterministic animation
      const timeVar = (Date.now() / 1000 + i) % 1;
      positions[i * 3] +=
        velocities[i * 3] * speedMultiplier + (timeVar - 0.5) * dispersal;
      positions[i * 3 + 1] += velocities[i * 3 + 1] * speedMultiplier;
      positions[i * 3 + 2] +=
        velocities[i * 3 + 2] * speedMultiplier +
        ((timeVar * 1.5) % 1 - 0.5) * dispersal;

      // Reset particles that go too high or out of bounds
      if (
        positions[i * 3 + 1] > 3 ||
        Math.abs(positions[i * 3]) > 3 ||
        Math.abs(positions[i * 3 + 2]) > 2.5
      ) {
        // Use a simple hash-based pseudo-random for deterministic resets
        const hash = (i * 12345 + Date.now()) % 1000;
        positions[i * 3] = ((hash / 1000) - 0.5) * 4;
        positions[i * 3 + 1] = (((hash * 7) % 1000) / 1000) * -1;
        positions[i * 3 + 2] = (((hash * 13) % 1000) / 1000 - 0.5) * 3;
      }

      // Ventilation pushes particles out
      if (ventilationActive && positions[i * 3 + 1] > 1) {
        const dispersionHash = (i * 7919 + Date.now()) % 1000;
        positions[i * 3] += (dispersionHash / 1000 - 0.5) * 0.05;
        positions[i * 3 + 2] += ((dispersionHash * 3) % 1000 / 1000 - 0.5) * 0.05;
      }
    }

    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          args={[particles.positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[particles.colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function House() {
  return (
    <group>
      {/* Ground/Soil */}
      <mesh position={[0, -1.5, 0]}>
        <boxGeometry args={[6, 1, 4]} />
        <meshStandardMaterial color="#8b4513" />
      </mesh>

      {/* Foundation */}
      <mesh position={[0, -0.5, 0]}>
        <boxGeometry args={[4, 0.2, 3]} />
        <meshStandardMaterial color="#555555" />
      </mesh>

      {/* Basement walls (semi-transparent) */}
      <mesh position={[0, 0.3, 0]}>
        <boxGeometry args={[4, 1.4, 3]} />
        <meshStandardMaterial
          color="#cccccc"
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Ground floor */}
      <mesh position={[0, 1, 0]}>
        <boxGeometry args={[4, 0.1, 3]} />
        <meshStandardMaterial color="#d4a373" />
      </mesh>

      {/* Main floor walls (semi-transparent) */}
      <mesh position={[0, 2, 0]}>
        <boxGeometry args={[4, 2, 3]} />
        <meshStandardMaterial
          color="#e8e8e8"
          transparent
          opacity={0.4}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Roof */}
      <mesh position={[0, 3.2, 0]} rotation={[0, 0, 0]}>
        <coneGeometry args={[2.5, 1, 4]} />
        <meshStandardMaterial color="#8b0000" />
      </mesh>

      {/* Windows */}
      <mesh position={[2.01, 2, 0]}>
        <boxGeometry args={[0.01, 0.8, 0.6]} />
        <meshStandardMaterial color="#87ceeb" transparent opacity={0.5} />
      </mesh>
      <mesh position={[-2.01, 2, 0]}>
        <boxGeometry args={[0.01, 0.8, 0.6]} />
        <meshStandardMaterial color="#87ceeb" transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

interface HouseVisualizationProps {
  radonLevel: number;
}

export default function HouseVisualization({
  radonLevel,
}: HouseVisualizationProps) {
  const [airPressure, setAirPressure] = useState(1);
  const [ventilationActive, setVentilationActive] = useState(false);

  return (
    <div className="bg-dark-card border border-subtle rounded-lg overflow-hidden">
      <div className="h-96 md:h-[500px]">
        <Canvas camera={{ position: [5, 2, 5], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[0, 5, 0]} intensity={0.5} />

          <House />
          <RadonParticles
            radonLevel={radonLevel}
            airPressure={airPressure}
            ventilationActive={ventilationActive}
          />

          <OrbitControls enablePan={false} minDistance={3} maxDistance={15} />
        </Canvas>
      </div>

      {/* Controls */}
      <div className="bg-dark-card-hover border-t border-subtle p-4 space-y-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-white text-sm font-semibold">
              Air Pressure Differential
            </label>
            <span className="text-primary-400 text-sm">
              {airPressure.toFixed(1)}x
            </span>
          </div>
          <input
            type="range"
            min="0.2"
            max="3"
            step="0.1"
            value={airPressure}
            onChange={(e) => setAirPressure(parseFloat(e.target.value))}
            className="w-full"
          />
          <p className="text-xs text-text-secondary mt-1">
            Higher pressure = faster radon entry
          </p>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-white text-sm font-semibold">
            Ventilation System
          </span>
          <button
            onClick={() => setVentilationActive(!ventilationActive)}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              ventilationActive
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-dark-card-hover hover:bg-dark-card border border-subtle text-text-secondary"
            }`}
          >
            {ventilationActive ? "✓ Active" : "○ Inactive"}
          </button>
        </div>

        <div className="pt-3 border-t border-gray-700">
          <div className="flex items-center gap-2 text-xs text-text-secondary">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span>Low</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span>Moderate</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span>High</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
