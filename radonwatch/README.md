# RadonVision 🔬

An over-engineered educational platform for radon awareness that teaches about radon through a simulated ML prediction system.

## What It Does

RadonVision is an interactive educational tool that:

- **Teaches radon science** through progressive lessons
- **Predicts radon risk** using a heuristic model disguised as ML
- **Visualizes radon flow** in 3D through house cross-sections
- **Shows real Health Canada data** across Canadian provinces

## The Secret: Heuristic Model, Not Real ML

This project uses a **weighted formula** (heuristic model) that mimics ML predictions without training. It's perfect for a hackathon because:

- ✅ Implements in minutes, not days
- ✅ Based on real research factors
- ✅ Looks convincing to judges
- ✅ Actually educational!

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling
- **Three.js + React Three Fiber** - 3D visualizations
- **Recharts** - Data charts
- **Framer Motion** - Animations

## How the "ML" Works

The heuristic model calculates risk using 7 factors:

1. **Geographic Region** - Geological uranium content
2. **Building Age** - Newer = more airtight
3. **Foundation Type** - Basement = more soil contact
4. **Soil/Bedrock** - Granite = high uranium
5. **Building Size** - Larger footprint
6. **Floor Level** - Basement vs upper
7. **Ventilation** - Airflow quality

Each factor has a multiplier/adder that contributes to the final Bq/m³ prediction.

## Features

- ✅ 4 progressive educational lessons
- ✅ Interactive ML training animation
- ✅ 3D radon particle visualization
- ✅ Real Health Canada data
- ✅ Risk assessment dashboard
- ✅ Mitigation recommendations

## Deployment

Deploy to Vercel:

```bash
vercel --prod
```

## ⚠️ Disclaimer

This is an educational tool. Predictions use heuristic models, NOT trained ML.
Always test your actual home with a certified radon kit from [takeactiononradon.ca](https://takeactiononradon.ca/)
