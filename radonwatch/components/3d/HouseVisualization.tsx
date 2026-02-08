"use client";

import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

/* ─── Radon particles ──────────────────────────────────────────────── */

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
  const particleCount = Math.min(Math.floor(radonLevel * 2), 1000);

  const particles = useState(() => {
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 3.6;
      positions[i * 3 + 1] = Math.random() * -0.6;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2.8;

      velocities[i * 3] = (Math.random() - 0.5) * 0.008;
      velocities[i * 3 + 1] = Math.random() * 0.015 + 0.008;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.008;

      const intensity = radonLevel / 400;
      colors[i * 3] = Math.min(1, intensity * 2);
      colors[i * 3 + 1] = Math.min(1, 2 - intensity * 2);
      colors[i * 3 + 2] = 0;
    }
    return { positions, velocities, colors };
  })[0];

  useFrame(() => {
    if (!particlesRef.current) return;
    const positions = particlesRef.current.geometry.attributes.position
      .array as Float32Array;
    const velocities = particles.velocities;
    const speedMultiplier = airPressure;
    const dispersal = ventilationActive ? 0.025 : 0;

    for (let i = 0; i < particleCount; i++) {
      const t = (Date.now() / 1000 + i) % 1;
      positions[i * 3] +=
        velocities[i * 3] * speedMultiplier + (t - 0.5) * dispersal;
      positions[i * 3 + 1] += velocities[i * 3 + 1] * speedMultiplier;
      positions[i * 3 + 2] +=
        velocities[i * 3 + 2] * speedMultiplier +
        (((t * 1.5) % 1) - 0.5) * dispersal;

      if (
        positions[i * 3 + 1] > 2.6 ||
        Math.abs(positions[i * 3]) > 2.2 ||
        Math.abs(positions[i * 3 + 2]) > 1.8
      ) {
        const h = (i * 12345 + Date.now()) % 1000;
        positions[i * 3] = (h / 1000 - 0.5) * 3.6;
        positions[i * 3 + 1] = (((h * 7) % 1000) / 1000) * -0.6;
        positions[i * 3 + 2] = (((h * 13) % 1000) / 1000 - 0.5) * 2.8;
      }

      if (ventilationActive && positions[i * 3 + 1] > 1) {
        const dh = (i * 7919 + Date.now()) % 1000;
        positions[i * 3] += (dh / 1000 - 0.5) * 0.04;
        positions[i * 3 + 2] += (((dh * 3) % 1000) / 1000 - 0.5) * 0.04;
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
        size={0.06}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  );
}

/* ─── Pitched roof geometry (gable roof) ────────────────────────── */

function PitchedRoof({
  width,
  depth,
  height,
  color,
  overhang = 0.15,
}: {
  width: number;
  depth: number;
  height: number;
  color: string;
  overhang?: number;
}) {
  const geometry = useMemo(() => {
    const hw = width / 2 + overhang;
    const hd = depth / 2 + overhang;
    const geo = new THREE.BufferGeometry();

    // Two sloping faces + two gable triangles
    const vertices = new Float32Array([
      // Left slope
      -hw,
      0,
      -hd,
      0,
      height,
      -hd,
      -hw,
      0,
      hd,
      0,
      height,
      -hd,
      0,
      height,
      hd,
      -hw,
      0,
      hd,
      // Right slope
      hw,
      0,
      -hd,
      hw,
      0,
      hd,
      0,
      height,
      -hd,
      0,
      height,
      -hd,
      hw,
      0,
      hd,
      0,
      height,
      hd,
      // Front gable
      -hw,
      0,
      -hd,
      hw,
      0,
      -hd,
      0,
      height,
      -hd,
      // Back gable
      -hw,
      0,
      hd,
      0,
      height,
      hd,
      hw,
      0,
      hd,
    ]);

    geo.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
    geo.computeVertexNormals();
    return geo;
  }, [width, depth, height, overhang]);

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial color={color} side={THREE.DoubleSide} />
    </mesh>
  );
}

/* ─── Window component ─────────────────────────────────────────── */

function Window({
  position,
  rotation = [0, 0, 0],
  width = 0.45,
  height = 0.55,
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  width?: number;
  height?: number;
}) {
  return (
    <group position={position} rotation={rotation}>
      {/* Window frame */}
      <mesh>
        <boxGeometry args={[width + 0.06, height + 0.06, 0.06]} />
        <meshStandardMaterial color="#f5f0e8" />
      </mesh>
      {/* Glass */}
      <mesh position={[0, 0, 0.01]}>
        <boxGeometry args={[width, height, 0.04]} />
        <meshStandardMaterial
          color="#a8d8ea"
          transparent
          opacity={0.55}
          roughness={0.1}
          metalness={0.2}
        />
      </mesh>
      {/* Cross frame */}
      <mesh position={[0, 0, 0.035]}>
        <boxGeometry args={[0.03, height, 0.02]} />
        <meshStandardMaterial color="#f5f0e8" />
      </mesh>
      <mesh position={[0, 0, 0.035]}>
        <boxGeometry args={[width, 0.03, 0.02]} />
        <meshStandardMaterial color="#f5f0e8" />
      </mesh>
    </group>
  );
}

/* ─── Door component ───────────────────────────────────────────── */

function Door({
  position,
  rotation = [0, 0, 0],
  color = "#5c3a1e",
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  color?: string;
}) {
  return (
    <group position={position} rotation={rotation}>
      <mesh>
        <boxGeometry args={[0.5, 0.9, 0.08]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {/* Door knob */}
      <mesh position={[0.17, 0, 0.05]}>
        <sphereGeometry args={[0.025, 8, 8]} />
        <meshStandardMaterial color="#c0a060" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}

/* ─── Main house (semi-transparent, showing radon) ────────────── */

function MainHouse() {
  const wallW = 4.0;
  const wallD = 3.2;
  const wallH = 2.2;
  const roofH = 1.1;

  return (
    <group>
      {/* Soil beneath */}
      <mesh position={[0, -0.6, 0]}>
        <boxGeometry args={[wallW + 0.4, 0.8, wallD + 0.4]} />
        <meshStandardMaterial color="#6b4226" />
      </mesh>

      {/* Foundation */}
      <mesh position={[0, -0.1, 0]}>
        <boxGeometry args={[wallW + 0.15, 0.2, wallD + 0.15]} />
        <meshStandardMaterial color="#666666" roughness={0.9} />
      </mesh>

      {/* Basement (semi-transparent) */}
      <mesh position={[0, 0.45, 0]}>
        <boxGeometry args={[wallW, 0.9, wallD]} />
        <meshStandardMaterial
          color="#d4cfc8"
          transparent
          opacity={0.25}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Ground floor slab */}
      <mesh position={[0, 0.95, 0]}>
        <boxGeometry args={[wallW + 0.05, 0.1, wallD + 0.05]} />
        <meshStandardMaterial color="#c4a77d" />
      </mesh>

      {/* Main walls (semi-transparent) */}
      <mesh position={[0, 0.95 + wallH / 2 + 0.05, 0]}>
        <boxGeometry args={[wallW, wallH, wallD]} />
        <meshStandardMaterial
          color="#eae6df"
          transparent
          opacity={0.35}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Pitched roof */}
      <group position={[0, 0.95 + wallH + 0.05, 0]}>
        <PitchedRoof
          width={wallW}
          depth={wallD}
          height={roofH}
          color="#8b2500"
          overhang={0.25}
        />
      </group>

      {/* Front windows */}
      <Window position={[-0.8, 1.8, -wallD / 2 - 0.04]} />
      <Window position={[0.8, 1.8, -wallD / 2 - 0.04]} />

      {/* Front door */}
      <Door position={[0, 1.4, -wallD / 2 - 0.04]} />

      {/* Side windows */}
      <Window
        position={[wallW / 2 + 0.04, 1.8, -0.5]}
        rotation={[0, Math.PI / 2, 0]}
      />
      <Window
        position={[wallW / 2 + 0.04, 1.8, 0.5]}
        rotation={[0, Math.PI / 2, 0]}
      />
      <Window
        position={[-wallW / 2 - 0.04, 1.8, 0]}
        rotation={[0, -Math.PI / 2, 0]}
      />

      {/* Chimney */}
      <mesh position={[0.8, 0.95 + wallH + roofH * 0.6, 0.4]}>
        <boxGeometry args={[0.3, 0.8, 0.3]} />
        <meshStandardMaterial color="#7a3b2e" />
      </mesh>

      {/* Front step */}
      <mesh position={[0, 0.98, -wallD / 2 - 0.3]}>
        <boxGeometry args={[0.9, 0.08, 0.4]} />
        <meshStandardMaterial color="#999" />
      </mesh>
    </group>
  );
}

/* ─── Neighbour house (solid, varied styles) ─────────────────── */

interface NeighborHouseProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  wallColor?: string;
  roofColor?: string;
  wallW?: number;
  wallD?: number;
  wallH?: number;
  roofH?: number;
  hasGarage?: boolean;
}

function NeighborHouse({
  position,
  rotation = [0, 0, 0],
  wallColor = "#d9d0c1",
  roofColor = "#4a4a4a",
  wallW = 3.6,
  wallD = 2.8,
  wallH = 2.0,
  roofH = 0.9,
  hasGarage = false,
}: NeighborHouseProps) {
  return (
    <group position={position} rotation={rotation}>
      {/* Foundation */}
      <mesh position={[0, -0.05, 0]}>
        <boxGeometry args={[wallW + 0.1, 0.1, wallD + 0.1]} />
        <meshStandardMaterial color="#555" roughness={0.9} />
      </mesh>

      {/* Walls */}
      <mesh position={[0, wallH / 2, 0]}>
        <boxGeometry args={[wallW, wallH, wallD]} />
        <meshStandardMaterial color={wallColor} />
      </mesh>

      {/* Pitched roof */}
      <group position={[0, wallH, 0]}>
        <PitchedRoof
          width={wallW}
          depth={wallD}
          height={roofH}
          color={roofColor}
          overhang={0.2}
        />
      </group>

      {/* Front windows */}
      <Window
        position={[-0.65, wallH * 0.55, -wallD / 2 - 0.04]}
        width={0.4}
        height={0.5}
      />
      <Window
        position={[0.65, wallH * 0.55, -wallD / 2 - 0.04]}
        width={0.4}
        height={0.5}
      />

      {/* Front door */}
      <Door position={[0, wallH * 0.32, -wallD / 2 - 0.04]} color="#3e2612" />

      {/* Side windows */}
      <Window
        position={[wallW / 2 + 0.04, wallH * 0.55, 0]}
        rotation={[0, Math.PI / 2, 0]}
        width={0.35}
        height={0.45}
      />
      <Window
        position={[-wallW / 2 - 0.04, wallH * 0.55, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        width={0.35}
        height={0.45}
      />

      {/* Front step */}
      <mesh position={[0, 0.04, -wallD / 2 - 0.2]}>
        <boxGeometry args={[0.7, 0.06, 0.3]} />
        <meshStandardMaterial color="#888" />
      </mesh>

      {/* Garage if applicable */}
      {hasGarage && (
        <group position={[wallW / 2 + 1.0, 0, 0]}>
          <mesh position={[0, 0.7, 0]}>
            <boxGeometry args={[1.8, 1.4, wallD * 0.8]} />
            <meshStandardMaterial color={wallColor} />
          </mesh>
          <group position={[0, 1.4, 0]}>
            <PitchedRoof
              width={1.8}
              depth={wallD * 0.8}
              height={0.45}
              color={roofColor}
              overhang={0.1}
            />
          </group>
          {/* Garage door */}
          <mesh position={[0, 0.55, -wallD * 0.4 - 0.04]}>
            <boxGeometry args={[1.4, 1.0, 0.06]} />
            <meshStandardMaterial color="#e8e0d0" />
          </mesh>
        </group>
      )}
    </group>
  );
}

/* ─── Tree component ───────────────────────────────────────────── */

function Tree({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Trunk */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.08, 0.1, 1.0, 6]} />
        <meshStandardMaterial color="#5c3a1e" />
      </mesh>
      {/* Canopy layers */}
      <mesh position={[0, 1.3, 0]}>
        <sphereGeometry args={[0.55, 8, 6]} />
        <meshStandardMaterial color="#2d5a1e" />
      </mesh>
      <mesh position={[0, 1.7, 0]}>
        <sphereGeometry args={[0.4, 8, 6]} />
        <meshStandardMaterial color="#3a6b2a" />
      </mesh>
    </group>
  );
}

/* ─── Bush component ───────────────────────────────────────────── */

function Bush({ position }: { position: [number, number, number] }) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.25, 6, 5]} />
      <meshStandardMaterial color="#2a5418" />
    </mesh>
  );
}

/* ─── Street / neighbourhood ground ────────────────────────────── */

function Neighbourhood() {
  return (
    <group>
      {/* Large ground plane (grass) — lowest layer */}
      <mesh position={[0, -0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial
          color="#2e5a1a"
          polygonOffset
          polygonOffsetFactor={4}
          polygonOffsetUnits={4}
        />
      </mesh>

      {/* Individual lot lawns (lighter green) for near side — layer 2 */}
      {[-8, 0, 8, 16].map((x, i) => (
        <mesh
          key={`lawn-near-${i}`}
          position={[x, -0.04, 1.5]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[7.2, 6.0]} />
          <meshStandardMaterial
            color="#3a7a28"
            polygonOffset
            polygonOffsetFactor={3}
            polygonOffsetUnits={3}
          />
        </mesh>
      ))}

      {/* Individual lot lawns for far side — layer 2 */}
      {[-8, 0, 8, 16].map((x, i) => (
        <mesh
          key={`lawn-far-${i}`}
          position={[x, -0.04, -10.5]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[7.2, 5.0]} />
          <meshStandardMaterial
            color="#3a7a28"
            polygonOffset
            polygonOffsetFactor={3}
            polygonOffsetUnits={3}
          />
        </mesh>
      ))}

      {/* Road running along X axis (in front of houses) — layer 3 */}
      <mesh position={[0, -0.03, -5.5]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[60, 4.5]} />
        <meshStandardMaterial
          color="#3a3a3a"
          polygonOffset
          polygonOffsetFactor={2}
          polygonOffsetUnits={2}
        />
      </mesh>

      {/* Sidewalks — layer 4 */}
      <mesh position={[0, -0.02, -3.1]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[60, 0.9]} />
        <meshStandardMaterial
          color="#8a8a80"
          polygonOffset
          polygonOffsetFactor={1}
          polygonOffsetUnits={1}
        />
      </mesh>
      <mesh position={[0, -0.02, -7.9]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[60, 0.9]} />
        <meshStandardMaterial
          color="#8a8a80"
          polygonOffset
          polygonOffsetFactor={1}
          polygonOffsetUnits={1}
        />
      </mesh>

      {/* Driveways for main side houses — layer 5 */}
      {[-8, 0, 8, 16].map((x, i) => (
        <mesh
          key={`driveway-near-${i}`}
          position={[x, -0.01, -2.0]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[1.6, 2.2]} />
          <meshStandardMaterial
            color="#6b6b64"
            polygonOffset
            polygonOffsetFactor={-1}
            polygonOffsetUnits={-1}
          />
        </mesh>
      ))}

      {/* Driveways for far side houses — layer 5 */}
      {[-8, 0, 8, 16].map((x, i) => (
        <mesh
          key={`driveway-far-${i}`}
          position={[x, -0.01, -9.0]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[1.6, 2.2]} />
          <meshStandardMaterial
            color="#6b6b64"
            polygonOffset
            polygonOffsetFactor={-1}
            polygonOffsetUnits={-1}
          />
        </mesh>
      ))}

      {/* Road center line (dashed) — topmost layer */}
      {Array.from({ length: 20 }).map((_, i) => (
        <mesh
          key={`stripe-${i}`}
          position={[-19 + i * 2, 0.0, -5.5]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[1.0, 0.12]} />
          <meshStandardMaterial
            color="#e8d44d"
            opacity={0.6}
            transparent
            polygonOffset
            polygonOffsetFactor={-2}
            polygonOffsetUnits={-2}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ─── Exported component ──────────────────────────────────────── */

interface HouseVisualizationProps {
  radonLevel: number;
}

export default function HouseVisualization({
  radonLevel,
}: HouseVisualizationProps) {
  const [airPressure, setAirPressure] = useState(1);
  const [ventilationActive, setVentilationActive] = useState(false);

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Floating controls overlay */}
      <div className="absolute top-4 left-4 z-10 bg-dark-bg/80 backdrop-blur-sm border border-subtle/50 rounded-lg p-3 max-w-xs">
        <div className="space-y-3">
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-white text-xs font-semibold">
                Air Pressure
              </label>
              <span className="text-accent-gold text-xs">
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
              className="w-full h-1"
            />
          </div>

          <button
            onClick={() => setVentilationActive(!ventilationActive)}
            className={`w-full px-3 py-1.5 rounded text-xs font-semibold transition-colors ${
              ventilationActive
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-dark-card-hover hover:bg-dark-card border border-subtle text-text-secondary"
            }`}
          >
            {ventilationActive ? "✓ Ventilation On" : "○ Ventilation Off"}
          </button>
        </div>
      </div>

      {/* Legend overlay */}
      <div className="absolute bottom-4 right-4 z-10 bg-dark-bg/80 backdrop-blur-sm border border-subtle/50 rounded-lg px-3 py-2">
        <div className="flex items-center gap-3 text-xs text-text-secondary">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span>Low</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
            <span>Moderate</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            <span>High</span>
          </div>
        </div>
      </div>

      {/* 3D Canvas */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [6, 6, 10], fov: 45 }}>
          {/* Lighting */}
          <ambientLight intensity={0.5} />
          <directionalLight
            position={[15, 20, 10]}
            intensity={1.0}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          <directionalLight position={[-10, 8, -5]} intensity={0.3} />
          <hemisphereLight
            color="#87ceeb"
            groundColor="#3a5a1e"
            intensity={0.4}
          />

          {/* Fog for depth */}
          <fog attach="fog" args={["#1a1a2e", 30, 60]} />

          {/* Neighbourhood ground, road, driveways */}
          <Neighbourhood />

          {/* ── Near side of street (z > 0) ── */}

          {/* Main house at center */}
          <MainHouse />
          <RadonParticles
            radonLevel={radonLevel}
            airPressure={airPressure}
            ventilationActive={ventilationActive}
          />

          {/* Near-side neighbour: left 1 */}
          <NeighborHouse
            position={[-8, 0, 0]}
            wallColor="#c8b89a"
            roofColor="#5a3a2a"
            wallW={3.4}
            wallD={2.6}
            wallH={1.9}
            roofH={0.85}
            hasGarage
          />

          {/* Near-side neighbour: right 1 */}
          <NeighborHouse
            position={[8, 0, 0]}
            wallColor="#e0d6c8"
            roofColor="#3d3d3d"
            wallW={3.8}
            wallD={3.0}
            wallH={2.1}
            roofH={1.0}
          />

          {/* Near-side neighbour: right 2 */}
          <NeighborHouse
            position={[16, 0, 0]}
            wallColor="#b8a888"
            roofColor="#6b3020"
            wallW={3.2}
            wallD={2.5}
            wallH={1.8}
            roofH={0.8}
            hasGarage
          />

          {/* ── Far side of street (z < -8) ── */}

          <NeighborHouse
            position={[-8, 0, -11]}
            rotation={[0, Math.PI, 0]}
            wallColor="#d4c8b8"
            roofColor="#4a4a4a"
            wallW={3.5}
            wallD={2.7}
            wallH={2.0}
            roofH={0.9}
          />

          <NeighborHouse
            position={[0, 0, -11]}
            rotation={[0, Math.PI, 0]}
            wallColor="#bfae94"
            roofColor="#6a2e1c"
            wallW={3.3}
            wallD={2.6}
            wallH={1.85}
            roofH={0.85}
            hasGarage
          />

          <NeighborHouse
            position={[8, 0, -11]}
            rotation={[0, Math.PI, 0]}
            wallColor="#ddd5c5"
            roofColor="#555"
            wallW={3.7}
            wallD={2.9}
            wallH={2.0}
            roofH={0.95}
          />

          <NeighborHouse
            position={[16, 0, -11]}
            rotation={[0, Math.PI, 0]}
            wallColor="#c5b8a0"
            roofColor="#5e3520"
            wallW={3.0}
            wallD={2.4}
            wallH={1.9}
            roofH={0.8}
          />

          {/* ── Trees ── */}
          <Tree position={[-4.5, 0, 2.5]} />
          <Tree position={[4.2, 0, 3.0]} />
          <Tree position={[12.5, 0, 2.0]} />
          <Tree position={[-11, 0, 1.5]} />
          <Tree position={[-4.5, 0, -13]} />
          <Tree position={[4.5, 0, -13.5]} />
          <Tree position={[12, 0, -12.5]} />
          <Tree position={[19, 0, -13]} />

          {/* ── Bushes along sidewalk ── */}
          <Bush position={[-2.5, 0.2, -2.8]} />
          <Bush position={[2.5, 0.2, -2.8]} />
          <Bush position={[10, 0.2, -2.8]} />
          <Bush position={[-6, 0.2, -2.8]} />

          {/* ── Back yard bushes ── */}
          <Bush position={[-1.5, 0.2, 3.5]} />
          <Bush position={[1.5, 0.2, 3.5]} />

          <OrbitControls
            enablePan={true}
            minDistance={6}
            maxDistance={35}
            maxPolarAngle={Math.PI / 2.1}
            target={[0, 1.2, 0]}
          />
        </Canvas>
      </div>
    </div>
  );
}
