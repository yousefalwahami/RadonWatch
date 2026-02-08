"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import UraniumDecayChain from "@/components/education/UraniumDecayChain";

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "What is Radon?",
    options: [
      "A radioactive metal found in building materials",
      "A colorless, odorless radioactive gas from uranium decay",
      "A type of harmful bacteria in soil",
      "A chemical produced by household products",
    ],
    correctAnswer: 1,
    explanation:
      "Radon is a naturally occurring radioactive noble gas produced when uranium-238 in soil and rock decays. It cannot be detected by sight, smell, or taste.",
  },
  {
    id: 2,
    question: "What is the Canadian guideline for radon in homes?",
    options: ["50 Bq/m³", "100 Bq/m³", "200 Bq/m³", "400 Bq/m³"],
    correctAnswer: 2,
    explanation:
      "Health Canada recommends taking action to reduce radon if levels are at or above 200 Bq/m³. This is approximately equivalent to 5.4 pCi/L in US units.",
  },
  {
    id: 3,
    question: "Why is radon dangerous to your health?",
    options: [
      "It causes immediate respiratory irritation when inhaled",
      "Its decay products stick to lung tissue and emit damaging alpha radiation",
      "It reacts chemically with lung tissue causing burns",
      "It displaces oxygen in the air making it hard to breathe",
    ],
    correctAnswer: 1,
    explanation:
      "The danger comes from radon's decay products (progeny) - particularly polonium-218 and polonium-214. These solid radioactive particles stick to lung tissue and emit alpha radiation directly into cells, damaging DNA and potentially causing lung cancer over time.",
  },
  {
    id: 4,
    question: "What is radon-222's half-life?",
    options: ["3.8 minutes", "3.8 hours", "3.8 days", "3.8 years"],
    correctAnswer: 2,
    explanation:
      "Radon-222 has a half-life of 3.8 days. This duration is long enough for radon to escape from soil and accumulate in buildings, but short enough to be highly radioactive.",
  },
  {
    id: 5,
    question: "How long should you test for radon?",
    options: ["24 hours", "7 days", "91 days (3 months)", "365 days (1 year)"],
    correctAnswer: 2,
    explanation:
      "Health Canada recommends a minimum of 91 days for long-term testing, ideally during the heating season (October-April). Radon levels fluctuate daily and seasonally, so long-term testing provides the most accurate estimate of annual average exposure.",
  },
  {
    id: 6,
    question: "What is the most effective radon mitigation method?",
    options: [
      "Sealing all foundation cracks",
      "Opening windows for ventilation",
      "Active soil depressurization (sub-slab suction)",
      "Installing air purifiers",
    ],
    correctAnswer: 2,
    explanation:
      "ASD systems are the gold standard for radon mitigation, reducing levels by 90-99%. They work by creating negative pressure beneath the foundation to prevent radon from entering, then venting it safely outside.",
  },
];

const SECTIONS = [
  { id: "what-is-radon", label: "What is Radon?" },
  { id: "science", label: "The Science Behind Radon" },
  { id: "entry", label: "How Radon Enters Your Home" },
  { id: "health", label: "Health Effects" },
  { id: "testing", label: "Testing for Radon" },
  { id: "mitigation", label: "Reducing Radon Levels" },
  { id: "canada", label: "Radon in Canada" },
  { id: "quiz", label: "Final Quiz" },
];

export default function LearnPage() {
  const [currentPage, setCurrentPage] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const handleQuizAnswer = (questionId: number, answerIndex: number) => {
    setQuizAnswers((prev) => ({ ...prev, [questionId]: answerIndex }));
  };

  const quizScore = Object.entries(quizAnswers).filter(
    ([id, answer]) => QUIZ_QUESTIONS[parseInt(id) - 1].correctAnswer === answer,
  ).length;

  const goToPage = (pageIndex: number) => {
    setCurrentPage(pageIndex);
  };

  const nextPage = () => {
    if (currentPage < SECTIONS.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const renderPageContent = () => {
    switch (currentPage) {
      case 0: // What is Radon
        return (
          <div className="space-y-8 animate-fadeIn">
            <div>
              <h2 className="text-4xl font-bold text-text-primary mb-6 font-serif border-b border-subtle pb-3">
                What is Radon?
              </h2>
            </div>

            <div className="space-y-6 text-text-secondary">
              <div>
                <h3 className="text-2xl font-semibold text-text-primary mb-4 font-serif">
                  The Basics
                </h3>
                <p className="leading-relaxed mb-4">
                  <strong className="text-text-primary">
                    Radon is a radioactive gas
                  </strong>{" "}
                  that you cannot see, smell, or taste. It is:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>Colorless and odorless</li>
                  <li>Chemically inert (a noble gas)</li>
                  <li>Naturally occurring</li>
                  <li>Present in nearly all soil and rock</li>
                  <li>The second leading cause of lung cancer after smoking</li>
                </ul>
                <p className="leading-relaxed">
                  Radon is formed naturally from the breakdown of uranium in
                  rocks and soil. Because it&apos;s a gas, it can move freely
                  through the ground and enter buildings, where it can
                  accumulate to dangerous levels.
                </p>
              </div>

              <div className="bg-dark-card border border-subtle rounded-lg p-6">
                <h4 className="text-xl font-semibold text-text-primary mb-3 font-serif">
                  Key Facts
                </h4>
                <ul className="space-y-2">
                  <li>
                    •{" "}
                    <strong className="text-text-primary">
                      Every home in Canada has some radon
                    </strong>{" "}
                    — the question is how much
                  </li>
                  <li>
                    • Radon is responsible for an estimated{" "}
                    <strong className="text-text-primary">
                      21,000 lung cancer deaths per year
                    </strong>{" "}
                    in the United States
                  </li>
                  <li>
                    • In Canada, approximately{" "}
                    <strong className="text-text-primary">
                      16% of lung cancer deaths
                    </strong>{" "}
                    are attributed to radon exposure
                  </li>
                  <li>
                    •{" "}
                    <strong className="text-text-primary">
                      1 in 5 Canadian homes
                    </strong>{" "}
                    has radon levels above Health Canada&apos;s guideline of 200
                    Bq/m³
                  </li>
                  <li>
                    • The only way to know your radon level is to{" "}
                    <strong className="text-text-primary">
                      test your home
                    </strong>
                  </li>
                </ul>
              </div>

              <div className="bg-accent-gold/10 border-l-4 border-accent-gold rounded-r-lg p-6">
                <h4 className="text-xl font-semibold text-accent-gold mb-3 font-serif">
                  Why Should You Care?
                </h4>
                <p className="leading-relaxed mb-4">
                  Radon is a serious public health issue that often goes
                  undetected because:
                </p>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>It&apos;s completely imperceptible to human senses</li>
                  <li>Health effects take years or decades to appear</li>
                  <li>Many people are simply unaware of the risk</li>
                  <li>Testing is not routinely done in most homes</li>
                </ol>
                <p className="mt-4 font-semibold text-text-primary">
                  The good news: Radon problems can be fixed, and mitigation
                  systems are highly effective at reducing radon levels by up to
                  99%.
                </p>
              </div>
            </div>
          </div>
        );

      case 1: // The Science Behind Radon
        return (
          <div className="space-y-8 animate-fadeIn">
            <div>
              <h2 className="text-4xl font-bold text-text-primary mb-6 font-serif border-b border-subtle pb-3">
                The Science Behind Radon
              </h2>
            </div>

            <div className="space-y-6 text-text-secondary">
              <div>
                <h3 className="text-2xl font-semibold text-text-primary mb-4 font-serif">
                  The Uranium Decay Chain
                </h3>
                <p className="leading-relaxed mb-4">
                  Radon doesn&apos;t just appear out of nowhere — it&apos;s part
                  of a complex radioactive decay process that takes billions of
                  years.
                </p>
                <p className="leading-relaxed mb-4">
                  <strong className="text-text-primary">Uranium-238</strong> is
                  a naturally occurring radioactive element found in rocks and
                  soil all over the world. It has a half-life of 4.5 billion
                  years, meaning it&apos;s been around since Earth was formed
                  and will continue to exist for billions more years.
                </p>
                <p className="leading-relaxed">
                  As uranium decays, it goes through a series of transformations
                  called a{" "}
                  <strong className="text-text-primary">decay chain</strong>,
                  producing different elements along the way. This process
                  involves{" "}
                  <strong className="text-text-primary">
                    14 separate transformations
                  </strong>{" "}
                  before finally becoming stable lead-206.
                </p>
              </div>

              <div className="my-8">
                <UraniumDecayChain />
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-text-primary mb-4 font-serif">
                  Radon-222: The Problem Isotope
                </h3>
                <p className="leading-relaxed mb-4">
                  There are actually three naturally occurring radon isotopes:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>
                    <strong className="text-text-primary">Radon-222</strong>{" "}
                    (from uranium-238 decay): Half-life of 3.8 days
                  </li>
                  <li>
                    <strong className="text-text-primary">Radon-220</strong> or
                    &quot;Thoron&quot; (from thorium-232 decay): Half-life of 56
                    seconds
                  </li>
                  <li>
                    <strong className="text-text-primary">Radon-219</strong> or
                    &quot;Actinon&quot; (from uranium-235 decay): Half-life of 4
                    seconds
                  </li>
                </ul>
                <div className="bg-dark-card border border-subtle rounded-lg p-6">
                  <p className="font-semibold text-text-primary mb-3">
                    Radon-222 is the only one that matters for indoor air
                    quality because:
                  </p>
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>
                      Its half-life of 3.8 days is long enough for it to travel
                      from deep soil into buildings
                    </li>
                    <li>
                      Radon-220 decays too quickly (56 seconds) to travel far
                      from its source
                    </li>
                    <li>
                      Radon-219 is extremely rare and decays almost instantly
                    </li>
                  </ol>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-text-primary mb-4 font-serif">
                  Types of Radiation
                </h3>
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-dark-card border border-subtle rounded-lg p-5">
                    <h4 className="text-lg font-semibold text-accent-gold mb-3">
                      Alpha Radiation (α)
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <strong>Composition:</strong> 2 protons + 2 neutrons
                      </li>
                      <li>
                        <strong>Penetrating power:</strong> Very low — stopped
                        by paper or skin
                      </li>
                      <li>
                        <strong>Damage potential:</strong> EXTREMELY HIGH when
                        inside the body
                      </li>
                    </ul>
                  </div>
                  <div className="bg-dark-card border border-subtle rounded-lg p-5">
                    <h4 className="text-lg font-semibold text-accent-blue mb-3">
                      Beta Radiation (β)
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <strong>Composition:</strong> High-speed electrons
                      </li>
                      <li>
                        <strong>Penetrating power:</strong> Medium — stopped by
                        aluminum
                      </li>
                      <li>
                        <strong>Damage potential:</strong> Moderate
                      </li>
                    </ul>
                  </div>
                  <div className="bg-dark-card border border-subtle rounded-lg p-5">
                    <h4 className="text-lg font-semibold text-text-primary mb-3">
                      Gamma Radiation (γ)
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <strong>Composition:</strong> High-energy waves
                      </li>
                      <li>
                        <strong>Penetrating power:</strong> Very high
                      </li>
                      <li>
                        <strong>Damage potential:</strong> Lower per particle
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-red-900/20 border-l-4 border-red-500 rounded-r-lg p-6">
                  <h4 className="text-xl font-semibold text-red-400 mb-3">
                    Why Alpha Radiation is So Dangerous
                  </h4>
                  <p className="leading-relaxed mb-4">
                    Even though alpha particles can&apos;t penetrate skin,
                    they&apos;re devastating when emitted{" "}
                    <strong className="text-text-primary">
                      inside the lungs
                    </strong>
                    :
                  </p>
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>
                      <strong>High Energy Transfer:</strong> Alpha particles
                      dump massive amounts of energy into cells over a very
                      short distance
                    </li>
                    <li>
                      <strong>Direct DNA Damage:</strong> They create dense
                      tracks of ionization, breaking DNA strands
                    </li>
                    <li>
                      <strong>100x More Damaging:</strong> Alpha radiation is
                      about 100 times more effective at causing cancer than beta
                      or gamma radiation
                    </li>
                  </ol>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-text-primary mb-4 font-serif">
                  Radon Progeny: The Real Culprits
                </h3>
                <p className="leading-relaxed mb-4">
                  <strong className="text-accent-gold">
                    Here&apos;s the critical point:
                  </strong>{" "}
                  It&apos;s not radon gas itself that causes most of the lung
                  damage — it&apos;s the{" "}
                  <strong className="text-text-primary">
                    radon decay products
                  </strong>{" "}
                  (also called radon progeny or radon daughters).
                </p>
                <p className="leading-relaxed mb-4">
                  When radon-222 decays, it produces four very short-lived
                  radioactive elements:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>
                    <strong className="text-text-primary">Polonium-218</strong>{" "}
                    (half-life: 3.1 minutes) — alpha emitter
                  </li>
                  <li>
                    <strong className="text-text-primary">Lead-214</strong>{" "}
                    (half-life: 27 minutes) — beta emitter
                  </li>
                  <li>
                    <strong className="text-text-primary">Bismuth-214</strong>{" "}
                    (half-life: 20 minutes) — beta emitter
                  </li>
                  <li>
                    <strong className="text-text-primary">Polonium-214</strong>{" "}
                    (half-life: 0.00016 seconds) — alpha emitter
                  </li>
                </ul>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-dark-card border border-subtle rounded-lg p-5">
                    <h4 className="font-semibold text-text-primary mb-3">
                      Radon gas (Rn-222):
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li>
                        • Is a gas, so you inhale it and exhale most of it
                      </li>
                      <li>
                        • Has a 3.8-day half-life, so much of it decays outside
                        your body
                      </li>
                      <li>
                        • Doesn&apos;t chemically interact with lung tissue
                      </li>
                    </ul>
                  </div>
                  <div className="bg-accent-gold/10 border border-accent-gold rounded-lg p-5">
                    <h4 className="font-semibold text-accent-gold mb-3">
                      Radon progeny:
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li>• Are solid metal particles, not gases</li>
                      <li>• Attach to dust particles in the air</li>
                      <li>
                        • <strong>Stick to lung tissue when inhaled</strong>
                      </li>
                      <li>• Continue decaying while lodged in the lungs</li>
                      <li>
                        • Emit alpha particles directly into sensitive lung
                        cells
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 2: // How Radon Enters Your Home
        return (
          <div className="space-y-8 animate-fadeIn">
            <div>
              <h2 className="text-4xl font-bold text-text-primary mb-6 font-serif border-b border-subtle pb-3">
                How Radon Enters Your Home
              </h2>
            </div>

            <div className="space-y-6 text-text-secondary">
              <div>
                <h3 className="text-2xl font-semibold text-text-primary mb-4 font-serif">
                  Sources of Radon
                </h3>
                <div className="bg-dark-card border border-subtle rounded-lg p-6 mb-4">
                  <h4 className="text-lg font-semibold text-accent-gold mb-3">
                    Primary Source: Soil and Rock (95%+ of cases)
                  </h4>
                  <p className="leading-relaxed mb-3">
                    Radon is produced continuously in the ground from uranium
                    decay. The concentration depends on:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong>Uranium content of bedrock:</strong> Granite,
                      shale, and phosphate rock are typically higher
                    </li>
                    <li>
                      <strong>Soil permeability:</strong> Sandy or gravelly soil
                      allows more radon movement than clay
                    </li>
                    <li>
                      <strong>Moisture content:</strong> Dry soil allows easier
                      radon transport
                    </li>
                    <li>
                      <strong>Bedrock fractures:</strong> Cracks and fissures
                      provide pathways for radon
                    </li>
                  </ul>
                </div>
                <div className="bg-dark-card border border-subtle rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-text-primary mb-3">
                    Secondary Sources:
                  </h4>
                  <ul className="space-y-2">
                    <li>
                      • <strong>Well water:</strong> Radon dissolves in
                      groundwater and is released when water is used
                    </li>
                    <li>
                      • <strong>Building materials:</strong> Some concrete,
                      bricks, granite, and stone can emit radon (rare)
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-text-primary mb-4 font-serif">
                  Entry Pathways
                </h3>
                <p className="leading-relaxed mb-4">
                  Radon enters buildings through tiny openings and gaps:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-dark-card border border-subtle rounded-lg p-5">
                    <h4 className="font-semibold text-accent-gold mb-3">
                      1. Cracks in foundation
                    </h4>
                    <p className="text-sm">
                      Even hairline cracks allow radon entry. The slab perimeter
                      crack (where floor meets wall) is a major entry point.
                    </p>
                  </div>
                  <div className="bg-dark-card border border-subtle rounded-lg p-5">
                    <h4 className="font-semibold text-accent-gold mb-3">
                      2. Construction joints
                    </h4>
                    <p className="text-sm">
                      Gaps between poured concrete sections and joins between
                      different building materials.
                    </p>
                  </div>
                  <div className="bg-dark-card border border-subtle rounded-lg p-5">
                    <h4 className="font-semibold text-accent-gold mb-3">
                      3. Service pipe gaps
                    </h4>
                    <p className="text-sm">
                      Plumbing penetrations, electrical conduits, and utility
                      lines.
                    </p>
                  </div>
                  <div className="bg-dark-card border border-subtle rounded-lg p-5">
                    <h4 className="font-semibold text-accent-gold mb-3">
                      4. Cavities in walls
                    </h4>
                    <p className="text-sm">
                      Hollow block walls act as pathways. Radon can travel
                      vertically through wall cavities.
                    </p>
                  </div>
                  <div className="bg-dark-card border border-subtle rounded-lg p-5">
                    <h4 className="font-semibold text-accent-gold mb-3">
                      5. Floor drains & sumps
                    </h4>
                    <p className="text-sm">
                      Open sumps without sealed lids and dried-up floor drain
                      traps.
                    </p>
                  </div>
                  <div className="bg-dark-card border border-subtle rounded-lg p-5">
                    <h4 className="font-semibold text-accent-gold mb-3">
                      6. Crawl spaces
                    </h4>
                    <p className="text-sm">
                      Direct soil contact provides large surface area for radon
                      entry.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-text-primary mb-4 font-serif">
                  The Stack Effect: Why Radon Accumulates Indoors
                </h3>
                <p className="leading-relaxed mb-4">
                  Buildings act like chimneys, creating negative pressure at the
                  foundation level:
                </p>
                <div className="bg-dark-card border border-subtle rounded-lg p-6 mb-4">
                  <h4 className="text-lg font-semibold text-text-primary mb-3">
                    How It Works:
                  </h4>
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>Warm air rises inside the building</li>
                    <li>
                      This creates slightly lower air pressure in the basement
                    </li>
                    <li>
                      The pressure difference pulls soil gas (including radon)
                      into the building
                    </li>
                    <li>
                      Radon concentrations build up indoors, especially in lower
                      levels
                    </li>
                  </ol>
                </div>
                <div className="bg-accent-blue/10 border-l-4 border-accent-blue rounded-r-lg p-6">
                  <h4 className="text-lg font-semibold text-accent-blue mb-3">
                    This explains why:
                  </h4>
                  <ul className="space-y-2">
                    <li>
                      •{" "}
                      <strong>
                        Radon levels are typically highest in winter
                      </strong>
                    </li>
                    <li>
                      •{" "}
                      <strong>
                        Basements have higher concentrations than upper floors
                      </strong>
                    </li>
                    <li>
                      •{" "}
                      <strong>
                        Modern, well-sealed homes can trap more radon
                      </strong>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case 3: // Health Effects
        return (
          <div className="space-y-8 animate-fadeIn">
            <div>
              <h2 className="text-4xl font-bold text-text-primary mb-6 font-serif border-b border-subtle pb-3">
                Health Effects of Radon
              </h2>
            </div>

            <div className="space-y-6 text-text-secondary">
              <div>
                <h3 className="text-2xl font-semibold text-text-primary mb-4 font-serif">
                  Lung Cancer: The Primary Risk
                </h3>
                <div className="bg-red-900/20 border-l-4 border-red-500 rounded-r-lg p-6 mb-4">
                  <p className="leading-relaxed mb-3">
                    Radon exposure is the{" "}
                    <strong className="text-text-primary">
                      second leading cause of lung cancer
                    </strong>{" "}
                    after smoking, responsible for:
                  </p>
                  <ul className="space-y-2">
                    <li>
                      •{" "}
                      <strong className="text-red-400">
                        21,000 lung cancer deaths per year
                      </strong>{" "}
                      in the United States (EPA estimate)
                    </li>
                    <li>
                      •{" "}
                      <strong className="text-red-400">
                        ~16% of all lung cancer deaths
                      </strong>{" "}
                      in Canada
                    </li>
                    <li>
                      •{" "}
                      <strong className="text-red-400">
                        The #1 cause of lung cancer in non-smokers
                      </strong>
                    </li>
                  </ul>
                </div>

                <h4 className="text-xl font-semibold text-text-primary mb-3 font-serif">
                  How Radon Causes Lung Cancer
                </h4>
                <p className="leading-relaxed mb-4">
                  When you breathe air containing radon:
                </p>
                <ol className="list-decimal pl-6 space-y-3 mb-6">
                  <li>
                    <strong className="text-text-primary">
                      Radon gas enters lungs:
                    </strong>{" "}
                    Most radon is exhaled, but some decays while in your lungs
                  </li>
                  <li>
                    <strong className="text-text-primary">
                      Radon progeny stick to lung tissue:
                    </strong>{" "}
                    Solid decay products (especially Po-218 and Po-214) attach
                    to the bronchial epithelium
                  </li>
                  <li>
                    <strong className="text-text-primary">
                      Alpha particles damage DNA:
                    </strong>{" "}
                    These progeny emit alpha radiation directly into lung cells
                  </li>
                  <li>
                    <strong className="text-text-primary">
                      Cellular damage accumulates:
                    </strong>{" "}
                    Over years of exposure, the radiation breaks DNA strands,
                    creates reactive oxygen species, and damages chromosomes
                  </li>
                  <li>
                    <strong className="text-text-primary">
                      Mutations lead to cancer:
                    </strong>{" "}
                    Eventually, enough DNA damage accumulates to transform
                    normal cells into cancer cells
                  </li>
                </ol>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-text-primary mb-4 font-serif">
                  The Smoking Connection: A Deadly Synergy
                </h3>
                <p className="leading-relaxed mb-4 text-accent-gold font-semibold">
                  The combination of smoking and radon is far more dangerous
                  than either alone.
                </p>
                <div className="bg-dark-card border border-subtle rounded-lg p-6 mb-4">
                  <h4 className="text-lg font-semibold text-text-primary mb-3">
                    Risk Comparison (at 50 Bq/m³):
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-text-secondary mb-1">
                        Never-smoker:
                      </p>
                      <p className="text-2xl font-bold text-accent-blue">
                        2 in 1,000
                      </p>
                      <p className="text-xs text-text-secondary">
                        chance of lung cancer death
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-text-secondary mb-1">
                        Smoker:
                      </p>
                      <p className="text-2xl font-bold text-red-400">
                        20 in 1,000
                      </p>
                      <p className="text-xs text-text-secondary">
                        chance of lung cancer death
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-amber-900/20 border-l-4 border-amber-500 rounded-r-lg p-6">
                  <h4 className="text-lg font-semibold text-amber-400 mb-3">
                    The synergy explained:
                  </h4>
                  <ul className="space-y-2">
                    <li>
                      • Smoking damages lung tissue and impairs natural repair
                      mechanisms
                    </li>
                    <li>
                      • Radon&apos;s alpha radiation hits already-damaged cells
                    </li>
                    <li>• Combined DNA damage overwhelms cellular repair</li>
                    <li>
                      • The two carcinogens work together, not just additively
                    </li>
                  </ul>
                  <p className="mt-4 font-semibold text-text-primary">
                    Key message: If you smoke and have radon in your home, your
                    lung cancer risk is catastrophically high. Quit smoking AND
                    fix the radon problem.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-text-primary mb-4 font-serif">
                  Vulnerable Populations
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-dark-card border border-subtle rounded-lg p-5">
                    <h4 className="font-semibold text-accent-gold mb-2">
                      Children
                    </h4>
                    <ul className="text-sm space-y-1">
                      <li>
                        • Breathe faster, inhaling more radon per body weight
                      </li>
                      <li>• More years of life for cancer to develop</li>
                      <li>• Cells dividing more rapidly</li>
                    </ul>
                  </div>
                  <div className="bg-dark-card border border-subtle rounded-lg p-5">
                    <h4 className="font-semibold text-accent-gold mb-2">
                      Smokers
                    </h4>
                    <ul className="text-sm space-y-1">
                      <li>• 8-9x higher risk from radon than non-smokers</li>
                      <li>• Synergistic effect compounds both risks</li>
                    </ul>
                  </div>
                  <div className="bg-dark-card border border-subtle rounded-lg p-5">
                    <h4 className="font-semibold text-accent-gold mb-2">
                      Work-from-home
                    </h4>
                    <ul className="text-sm space-y-1">
                      <li>• More time at home = higher cumulative exposure</li>
                      <li>• Includes retirees, remote workers</li>
                    </ul>
                  </div>
                  <div className="bg-dark-card border border-subtle rounded-lg p-5">
                    <h4 className="font-semibold text-accent-gold mb-2">
                      Former miners
                    </h4>
                    <ul className="text-sm space-y-1">
                      <li>• Already have elevated lifetime exposure</li>
                      <li>• Additional residential exposure increases risk</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 4: // Testing for Radon
        return (
          <div className="space-y-8 animate-fadeIn">
            <div>
              <h2 className="text-4xl font-bold text-text-primary mb-6 font-serif border-b border-subtle pb-3">
                Testing for Radon
              </h2>
            </div>

            <div className="space-y-6 text-text-secondary">
              <div className="bg-accent-gold/10 border-l-4 border-accent-gold rounded-r-lg p-6 mb-6">
                <h3 className="text-2xl font-semibold text-accent-gold mb-3 font-serif">
                  Why Test?
                </h3>
                <p className="leading-relaxed mb-4 text-text-primary font-semibold">
                  The only way to know your radon level is to test.
                </p>
                <p className="leading-relaxed mb-3">You cannot:</p>
                <ul className="space-y-2">
                  <li>• Smell, see, or taste radon</li>
                  <li>• Predict levels from neighbors&apos; tests</li>
                  <li>• Assume safety based on home age or construction</li>
                  <li>• Use regional maps as a definitive guide</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-text-primary mb-4 font-serif">
                  Health Canada Guidelines
                </h3>
                <div className="bg-dark-card border border-accent-gold rounded-lg p-6 mb-4">
                  <p className="text-3xl font-bold text-accent-gold mb-2">
                    200 Bq/m³
                  </p>
                  <p className="text-sm text-text-secondary mb-4">
                    Action Level (≈ 5.4 pCi/L in US units)
                  </p>
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold text-text-primary">
                        Below 200 Bq/m³:
                      </p>
                      <p className="text-sm">
                        Risk is lower, but not zero. Consider mitigation to
                        reduce risk further.
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold text-text-primary">
                        200-600 Bq/m³:
                      </p>
                      <p className="text-sm">
                        Mitigation recommended within 2 years
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold text-text-primary">
                        Above 600 Bq/m³:
                      </p>
                      <p className="text-sm">
                        Mitigation recommended within 1 year
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-text-primary mb-4 font-serif">
                  Types of Radon Tests
                </h3>

                <h4 className="text-xl font-semibold text-text-primary mb-3 font-serif">
                  Long-Term Tests (Recommended)
                </h4>
                <p className="leading-relaxed mb-4">
                  <strong className="text-accent-gold">Duration:</strong> 3 to
                  12 months (minimum 91 days)
                </p>
                <div className="bg-accent-blue/10 border-l-4 border-accent-blue rounded-r-lg p-6 mb-6">
                  <h5 className="font-semibold text-accent-blue mb-2">
                    Why long-term?
                  </h5>
                  <ul className="space-y-2">
                    <li>• Radon levels fluctuate daily and seasonally</li>
                    <li>• Can vary by factor of 2-3 within a single day</li>
                    <li>
                      • Long-term average is most accurate for annual exposure
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <div className="bg-dark-card border border-subtle rounded-lg p-5">
                    <h5 className="font-semibold text-accent-gold mb-2">
                      1. Alpha Track Detectors
                    </h5>
                    <p className="text-sm mb-3">
                      Small passive device (size of a hockey puck) containing a
                      special film that records alpha particle tracks.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-text-secondary mb-1">
                          Cost:
                        </p>
                        <p className="font-semibold">$50-75 CAD</p>
                      </div>
                      <div>
                        <p className="text-xs text-text-secondary mb-1">
                          Pros:
                        </p>
                        <p className="text-sm">
                          Accurate, inexpensive, no power needed
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-dark-card border border-subtle rounded-lg p-5">
                    <h5 className="font-semibold text-accent-gold mb-2">
                      2. Electronic Radon Monitors
                    </h5>
                    <p className="text-sm mb-3">
                      Battery or plug-in device that provides real-time hourly
                      or daily readings.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-text-secondary mb-1">
                          Cost:
                        </p>
                        <p className="font-semibold">$150-400 CAD</p>
                      </div>
                      <div>
                        <p className="text-xs text-text-secondary mb-1">
                          Pros:
                        </p>
                        <p className="text-sm">
                          Immediate feedback, see daily patterns, reusable
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 5: // Reducing Radon Levels
        return (
          <div className="space-y-8 animate-fadeIn">
            <div>
              <h2 className="text-4xl font-bold text-text-primary mb-6 font-serif border-b border-subtle pb-3">
                Reducing Radon Levels
              </h2>
            </div>

            <div className="space-y-6 text-text-secondary">
              <div className="bg-accent-gold/10 border-l-4 border-accent-gold rounded-r-lg p-6">
                <h3 className="text-2xl font-semibold text-accent-gold mb-3 font-serif">
                  Should You Mitigate?
                </h3>
                <p className="leading-relaxed mb-4">
                  <strong className="text-text-primary">
                    Health Canada recommends mitigation if:
                  </strong>
                </p>
                <ul className="space-y-2">
                  <li>• Radon level is ≥200 Bq/m³ (5.4 pCi/L)</li>
                  <li>• You&apos;re concerned about risk at any level</li>
                  <li>
                    • You want to reduce radon as much as reasonably possible
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-text-primary mb-4 font-serif">
                  Active Soil Depressurization (ASD) - The Gold Standard
                </h3>

                <div className="bg-dark-card border border-accent-gold rounded-lg p-6 mb-6">
                  <h4 className="text-lg font-semibold text-text-primary mb-3">
                    How it works:
                  </h4>
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>
                      One or more 3-4 inch (75-100 mm) PVC pipes are installed
                      through the foundation slab
                    </li>
                    <li>Pipes extend to suction point(s) beneath the slab</li>
                    <li>
                      A continuously-running fan creates negative pressure under
                      the slab
                    </li>
                    <li>
                      Radon-laden soil gas is drawn out before it enters the
                      home
                    </li>
                    <li>
                      Gas is vented safely above the roof line, away from
                      windows
                    </li>
                  </ol>
                </div>

                <div className="bg-green-900/20 border-l-4 border-green-500 rounded-r-lg p-6 mb-6">
                  <h4 className="text-lg font-semibold text-green-400 mb-3">
                    Why it&apos;s the most effective:
                  </h4>
                  <ul className="space-y-2">
                    <li>
                      • Addresses the source (prevents entry rather than
                      diluting radon indoors)
                    </li>
                    <li>• Works regardless of weather or lifestyle</li>
                    <li>
                      •{" "}
                      <strong className="text-text-primary">
                        Can reduce levels by 90-99%
                      </strong>
                    </li>
                    <li>• Operates 24/7 automatically</li>
                  </ul>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-dark-card border border-subtle rounded-lg p-5 text-center">
                    <p className="text-sm text-text-secondary mb-2">
                      Installation
                    </p>
                    <p className="text-2xl font-bold text-accent-gold">
                      $1,500-$3,000
                    </p>
                    <p className="text-xs text-text-secondary mt-1">
                      CAD average
                    </p>
                  </div>
                  <div className="bg-dark-card border border-subtle rounded-lg p-5 text-center">
                    <p className="text-sm text-text-secondary mb-2">
                      Annual Operating Cost
                    </p>
                    <p className="text-2xl font-bold text-accent-blue">
                      $50-$150
                    </p>
                    <p className="text-xs text-text-secondary mt-1">
                      per year (electricity)
                    </p>
                  </div>
                  <div className="bg-dark-card border border-subtle rounded-lg p-5 text-center">
                    <p className="text-sm text-text-secondary mb-2">
                      Maintenance
                    </p>
                    <p className="text-2xl font-bold text-text-primary">
                      Minimal
                    </p>
                    <p className="text-xs text-text-secondary mt-1">
                      Fan replacement every 10-15 years
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 6: // Radon in Canada
        return (
          <div className="space-y-8 animate-fadeIn">
            <div>
              <h2 className="text-4xl font-bold text-text-primary mb-6 font-serif border-b border-subtle pb-3">
                Radon in Canada
              </h2>
            </div>

            <div className="space-y-6 text-text-secondary">
              <div>
                <h3 className="text-2xl font-semibold text-text-primary mb-4 font-serif">
                  Canadian Radon Statistics
                </h3>
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-dark-card border border-accent-gold rounded-lg p-6 text-center">
                    <p className="text-4xl font-bold text-accent-gold mb-2">
                      16.6%
                    </p>
                    <p className="text-sm">
                      of Canadian homes exceed 200 Bq/m³ guideline
                    </p>
                    <p className="text-xs text-text-secondary mt-1">
                      (Almost 1 in 5 homes)
                    </p>
                  </div>
                  <div className="bg-dark-card border border-accent-gold rounded-lg p-6 text-center">
                    <p className="text-4xl font-bold text-accent-gold mb-2">
                      ~3,300
                    </p>
                    <p className="text-sm">
                      lung cancer deaths per year in Canada
                    </p>
                    <p className="text-xs text-text-secondary mt-1">
                      attributable to radon
                    </p>
                  </div>
                </div>

                <div className="bg-dark-card border border-subtle rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-text-primary mb-3">
                    Regional Variations (2024 study):
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center border-b border-subtle pb-2">
                      <span>Interior BC</span>
                      <span className="font-semibold text-red-400">
                        ~33% above 200 Bq/m³
                      </span>
                    </div>
                    <div className="flex justify-between items-center border-b border-subtle pb-2">
                      <span>Prairie provinces</span>
                      <span className="font-semibold text-amber-400">
                        20-25% above guideline
                      </span>
                    </div>
                    <div className="flex justify-between items-center border-b border-subtle pb-2">
                      <span>Atlantic Canada</span>
                      <span className="font-semibold text-blue-400">
                        10-15% above guideline
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-text-primary mb-4 font-serif">
                  Canadian Radon Resources
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-dark-card border border-subtle rounded-lg p-5">
                    <h4 className="font-semibold text-accent-gold mb-2">
                      C-NRPP
                    </h4>
                    <p className="text-sm mb-2">
                      Canadian-National Radon Proficiency Program
                    </p>
                    <p className="text-xs text-text-secondary">
                      Certifies radon measurement and mitigation professionals
                    </p>
                  </div>
                  <div className="bg-dark-card border border-subtle rounded-lg p-5">
                    <h4 className="font-semibold text-accent-gold mb-2">
                      Health Canada
                    </h4>
                    <p className="text-sm mb-2">Sets national guidelines</p>
                    <p className="text-xs text-text-secondary">
                      Publishes guides, fact sheets, and survey data
                    </p>
                  </div>
                  <div className="bg-dark-card border border-subtle rounded-lg p-5">
                    <h4 className="font-semibold text-accent-gold mb-2">
                      Take Action on Radon
                    </h4>
                    <p className="text-sm mb-2">National awareness campaign</p>
                    <p className="text-xs text-text-secondary">
                      Test kit purchasing information
                    </p>
                  </div>
                  <div className="bg-dark-card border border-subtle rounded-lg p-5">
                    <h4 className="font-semibold text-accent-gold mb-2">
                      BC Lung Foundation
                    </h4>
                    <p className="text-sm mb-2">Long-term detector kits</p>
                    <p className="text-xs text-text-secondary">
                      $49.99 including analysis
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 7: // Final Quiz
        return (
          <div className="space-y-8 animate-fadeIn">
            <div>
              <h2 className="text-4xl font-bold text-text-primary mb-6 font-serif border-b border-subtle pb-3">
                Final Quiz
              </h2>
            </div>

            <p className="text-text-secondary mb-8">
              Test your knowledge! Answer these questions to verify your
              understanding of radon. You&apos;ll receive immediate feedback.
            </p>

            <div className="space-y-6">
              {QUIZ_QUESTIONS.map((question) => {
                const selectedAnswer = quizAnswers[question.id];
                const hasAnswered = selectedAnswer !== undefined;
                const isCorrect = selectedAnswer === question.correctAnswer;

                return (
                  <div
                    key={question.id}
                    className="bg-dark-card border border-subtle rounded-lg p-6"
                  >
                    <h3 className="text-lg font-semibold text-text-primary mb-4">
                      Question {question.id}: {question.question}
                    </h3>
                    <div className="space-y-3">
                      {question.options.map((option, index) => {
                        const isSelected = selectedAnswer === index;
                        const isThisCorrect = question.correctAnswer === index;

                        return (
                          <button
                            key={index}
                            onClick={() => handleQuizAnswer(question.id, index)}
                            className={`w-full text-left p-4 rounded-lg border transition-all ${
                              isSelected && !hasAnswered
                                ? "border-accent-gold bg-accent-gold/10"
                                : !hasAnswered
                                  ? "border-subtle hover:border-accent-gold/50 hover:bg-dark-card-hover"
                                  : isSelected && isCorrect
                                    ? "border-green-500 bg-green-900/20"
                                    : isSelected && !isCorrect
                                      ? "border-red-500 bg-red-900/20"
                                      : isThisCorrect && hasAnswered
                                        ? "border-green-500/50 bg-green-900/10"
                                        : "border-subtle bg-dark-card-hover/50 cursor-default"
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              {hasAnswered && isThisCorrect && (
                                <span className="text-green-400 text-lg">
                                  ✓
                                </span>
                              )}
                              {hasAnswered && isSelected && !isCorrect && (
                                <span className="text-red-400 text-lg">✗</span>
                              )}
                              <span
                                className={
                                  hasAnswered && isThisCorrect
                                    ? "text-green-400"
                                    : "text-text-secondary"
                                }
                              >
                                {option}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                    {hasAnswered && (
                      <div
                        className={`mt-4 p-4 rounded-lg border-l-4 ${
                          isCorrect
                            ? "border-green-500 bg-green-900/20"
                            : "border-red-500 bg-red-900/20"
                        }`}
                      >
                        <p
                          className={`font-semibold mb-2 ${
                            isCorrect ? "text-green-400" : "text-red-400"
                          }`}
                        >
                          {isCorrect ? "✓ Correct!" : "✗ Incorrect"}
                        </p>
                        <p className="text-sm text-text-secondary">
                          {question.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {Object.keys(quizAnswers).length === QUIZ_QUESTIONS.length && (
              <div className="mt-8 bg-gradient-to-r from-accent-gold/20 to-accent-blue/20 border border-accent-gold rounded-lg p-8 text-center">
                <h3 className="text-3xl font-bold text-text-primary mb-4 font-serif">
                  Quiz Complete!
                </h3>
                <p className="text-5xl font-bold text-accent-gold mb-4">
                  {quizScore} / {QUIZ_QUESTIONS.length}
                </p>
                <p className="text-text-secondary mb-6">
                  {quizScore === QUIZ_QUESTIONS.length
                    ? "🎉 Perfect score! You're a radon expert!"
                    : quizScore >= QUIZ_QUESTIONS.length * 0.7
                      ? "Great job! You have a solid understanding of radon."
                      : "Keep learning! Review the material to strengthen your knowledge."}
                </p>
                <div className="flex gap-4 justify-center flex-wrap">
                  <button
                    onClick={() => {
                      setQuizAnswers({});
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="bg-dark-card hover:bg-dark-card-hover border border-subtle text-text-primary px-6 py-3 rounded-lg font-semibold transition-all"
                  >
                    Retake Quiz
                  </button>
                  <Link
                    href="/predict"
                    className="bg-accent-gold hover:bg-accent-gold/90 text-dark-bg px-6 py-3 rounded-lg font-semibold transition-all inline-block"
                  >
                    Predict Your Radon Risk →
                  </Link>
                </div>
              </div>
            )}

            <div className="bg-gradient-to-r from-accent-gold/10 to-accent-blue/10 border border-accent-gold rounded-lg p-8 text-center mt-8">
              <h2 className="text-3xl font-bold text-text-primary mb-4 font-serif">
                Ready to Take Action?
              </h2>
              <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
                You now have comprehensive knowledge about radon. Use our
                AI-powered prediction tool to estimate radon levels in your
                home, or visit our dashboard to explore radon data across
                Canada.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Link
                  href="/predict"
                  className="bg-accent-gold hover:bg-accent-gold/90 text-dark-bg px-8 py-4 rounded-lg font-bold text-lg transition-all inline-block"
                >
                  Predict Radon Risk
                </Link>
                <Link
                  href="/dashboard"
                  className="bg-dark-card hover:bg-dark-card-hover border border-subtle text-text-primary px-8 py-4 rounded-lg font-bold text-lg transition-all inline-block"
                >
                  View Dashboard
                </Link>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg flex flex-col">
      {/* Top Navigation */}
      <div className="border-b border-subtle bg-dark-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/"
            className="text-accent-gold hover:text-text-primary font-semibold transition-colors inline-flex items-center gap-2"
          >
            <span>←</span> Back to Home
          </Link>
        </div>
      </div>

      <div className="flex flex-1">
        {/* Side Navigation */}
        <aside className="hidden lg:block w-80 border-r border-subtle bg-dark-card/30">
          <div className="p-6 sticky top-0">
            <h2 className="text-2xl font-bold text-text-primary mb-6 font-serif">
              Learning Center
            </h2>
            <nav className="space-y-1">
              {SECTIONS.map((section, index) => (
                <button
                  key={section.id}
                  onClick={() => goToPage(index)}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                    currentPage === index
                      ? "bg-accent-gold text-dark-bg font-semibold"
                      : "text-text-secondary hover:text-text-primary hover:bg-dark-card-hover"
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </nav>

            {/* Progress Indicator */}
            <div className="mt-8 pt-6 border-t border-subtle">
              <p className="text-sm text-text-secondary mb-2">Progress</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-dark-card-hover rounded-full h-2">
                  <div
                    className="bg-accent-gold rounded-full h-2 transition-all duration-300"
                    style={{
                      width: `${((currentPage + 1) / SECTIONS.length) * 100}%`,
                    }}
                  ></div>
                </div>
                <span className="text-sm font-semibold text-accent-gold">
                  {currentPage + 1}/{SECTIONS.length}
                </span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col">
          <div className="flex-1 px-4 lg:px-12 py-12 max-w-5xl mx-auto w-full">
            {/* Header */}
            <div className="mb-12">
              <h1 className="text-5xl font-bold text-text-primary mb-4 font-serif">
                RadonVision Learning Center
              </h1>
              <p className="text-xl text-text-secondary">
                Complete Guide to Understanding Radon
              </p>
            </div>

            {/* Page Content */}
            {renderPageContent()}
          </div>

          {/* Navigation Buttons */}
          <div className="border-t border-subtle bg-dark-card/30 px-4 lg:px-12 py-6">
            <div className="max-w-5xl mx-auto flex justify-between items-center">
              <button
                onClick={prevPage}
                disabled={currentPage === 0}
                className={`px-6 py-3 rounded-lg font-semibold transition-all inline-flex items-center gap-2 ${
                  currentPage === 0
                    ? "bg-dark-card text-text-secondary cursor-not-allowed opacity-50"
                    : "bg-dark-card hover:bg-dark-card-hover border border-subtle text-text-primary"
                }`}
              >
                <span>←</span> Previous
              </button>

              <span className="text-sm text-text-secondary hidden md:block">
                {SECTIONS[currentPage].label}
              </span>

              <button
                onClick={nextPage}
                disabled={currentPage === SECTIONS.length - 1}
                className={`px-6 py-3 rounded-lg font-semibold transition-all inline-flex items-center gap-2 ${
                  currentPage === SECTIONS.length - 1
                    ? "bg-dark-card text-text-secondary cursor-not-allowed opacity-50"
                    : "bg-accent-gold hover:bg-accent-gold/90 text-dark-bg"
                }`}
              >
                Next <span>→</span>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
