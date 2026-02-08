"use client";

import { useState } from "react";
import Link from "next/link";
import Lesson from "@/components/education/Lesson";
import ProgressTracker from "@/components/education/ProgressTracker";
import UraniumDecayChain from "@/components/education/UraniumDecayChain";
import { EDUCATION_STAGES } from "@/lib/constants";

export default function LearnPage() {
  const [currentStage, setCurrentStage] = useState(1);

  const handleLessonComplete = () => {
    if (currentStage < EDUCATION_STAGES.length) {
      setCurrentStage(currentStage + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="text-radon-600 hover:text-radon-700 font-semibold mb-4 inline-block"
          >
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Learn About Radon
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Interactive lessons to understand radon and ML prediction
          </p>
        </div>

        {/* Progress Tracker */}
        <ProgressTracker
          currentStage={currentStage}
          totalStages={EDUCATION_STAGES.length}
          stages={EDUCATION_STAGES}
        />

        {/* Lesson 1: What is Radon? */}
        <div className="mb-8">
          <Lesson
            title="What is Radon?"
            lessonNumber={1}
            isUnlocked={currentStage >= 1}
            onComplete={handleLessonComplete}
            content={
              <div className="space-y-4">
                <p>
                  <strong>Radon (Rn-222)</strong> is a radioactive noble gas
                  that you cannot see, smell, or taste. It`s one of the densest
                  substances that remains a gas under normal conditions and is
                  considered a health hazard due to its radioactivity.
                </p>
                <p>
                  Radon is produced by the natural radioactive decay of{" "}
                  <strong>uranium-238</strong>, which is found in varying
                  amounts in soil, rock, and water throughout Canada. When radon
                  is released from the ground into outdoor air, it gets diluted
                  and is not a concern. However, in enclosed spaces like homes,
                  radon can accumulate to high levels and pose a health risk.
                </p>
                <div className="bg-red-100 dark:bg-red-900 border-l-4 border-red-500 p-4 rounded">
                  <p className="font-semibold text-red-700 dark:text-red-300">
                    ☢️ Health Impact
                  </p>
                  <p className="text-sm text-red-600 dark:text-red-400 mt-2">
                    Radon is the{" "}
                    <strong>#1 cause of lung cancer in non-smokers</strong> and
                    the second leading cause overall after smoking. Health
                    Canada estimates that radon causes 16% of lung cancer deaths
                    in Canada—approximately 3,200 deaths per year.
                  </p>
                </div>
                <p>
                  Because radon is invisible and odorless,{" "}
                  <strong>testing is the only way</strong>
                  to know if your home has high radon levels. That`s why
                  educational tools like RadonVision exist—to help people
                  understand the risk and take action.
                </p>
              </div>
            }
          />
        </div>

        {/* Lesson 2: Where Does It Come From? */}
        <div className="mb-8">
          <Lesson
            title="Where Does It Come From?"
            lessonNumber={2}
            isUnlocked={currentStage >= 2}
            onComplete={handleLessonComplete}
            content={
              <div className="space-y-4">
                <p>
                  Radon is part of a long decay chain that starts with{" "}
                  <strong>uranium-238</strong>, a naturally occurring
                  radioactive element found in bedrock and soil across Canada.
                  Through a series of radioactive decays, uranium eventually
                  produces radon gas.
                </p>

                <UraniumDecayChain />

                <p>The key characteristics that make radon dangerous:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>It`s a gas:</strong> Unlike its parent elements
                    (which are solids), radon can move freely through soil and
                    enter buildings.
                  </li>
                  <li>
                    <strong>Half-life of 3.8 days:</strong> Long enough to
                    accumulate indoors, but short enough to decay while you
                    breathe it in.
                  </li>
                  <li>
                    <strong>Radioactive decay products:</strong> When radon
                    decays, it produces radioactive particles that can stick to
                    lung tissue and cause damage.
                  </li>
                </ul>

                <div className="bg-blue-100 dark:bg-blue-900 border-l-4 border-blue-500 p-4 rounded mt-4">
                  <p className="font-semibold text-blue-700 dark:text-blue-300">
                    🌍 Geographic Variation
                  </p>
                  <p className="text-sm text-blue-600 dark:text-blue-400 mt-2">
                    Different regions of Canada have vastly different radon
                    levels due to geology. Areas with granite bedrock (high
                    uranium content) like parts of Manitoba, Saskatchewan, and
                    the BC Interior tend to have higher radon levels.
                  </p>
                </div>
              </div>
            }
          />
        </div>

        {/* Lesson 3: How Do We Predict It? */}
        <div className="mb-8">
          <Lesson
            title="How Do We Predict It?"
            lessonNumber={3}
            isUnlocked={currentStage >= 3}
            onComplete={handleLessonComplete}
            content={
              <div className="space-y-4">
                <p>
                  RadonVision uses a{" "}
                  <strong>machine learning-inspired heuristic model</strong> to
                  predict radon levels. While it`s not a full neural network
                  trained on data (that would take days!), it demonstrates how
                  ML systems work by analyzing multiple risk factors.
                </p>

                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded">
                  <h4 className="font-bold mb-3 text-gray-900 dark:text-white">
                    7 Risk Factors Analyzed:
                  </h4>
                  <ol className="space-y-2 text-sm">
                    <li>
                      <strong>1. Geographic Region:</strong> Geological uranium
                      content varies by location
                    </li>
                    <li>
                      <strong>2. Building Age:</strong> Newer homes are often
                      more airtight, trapping radon
                    </li>
                    <li>
                      <strong>3. Foundation Type:</strong> Basements have more
                      soil contact
                    </li>
                    <li>
                      <strong>4. Soil/Bedrock Type:</strong> Granite has high
                      uranium, sedimentary is lower
                    </li>
                    <li>
                      <strong>5. Building Size:</strong> Larger footprint = more
                      soil contact area
                    </li>
                    <li>
                      <strong>6. Floor Level:</strong> Radon is highest in
                      basements, lower on upper floors
                    </li>
                    <li>
                      <strong>7. Ventilation:</strong> Good airflow helps
                      disperse radon
                    </li>
                  </ol>
                </div>

                <p>
                  The model calculates a weighted score based on research from
                  Health Canada and scientific literature. Each factor has a
                  &quot;multiplier&quot; or &quot;adder&quot; that contributes to the final
                  prediction. This mimics how a real ML model would learn
                  feature importance from training data.
                </p>

                <div className="bg-purple-100 dark:bg-purple-900 border-l-4 border-purple-500 p-4 rounded">
                  <p className="font-semibold text-purple-700 dark:text-purple-300">
                    🧠 Why This Works
                  </p>
                  <p className="text-sm text-purple-600 dark:text-purple-400 mt-2">
                    Real ML models learn these relationships from data. Our
                    heuristic approach uses pre-defined weights based on
                    research, achieving similar results without the training
                    time. It`s a great educational tool to show how ML thinks!
                  </p>
                </div>
              </div>
            }
          />
        </div>

        {/* Lesson 4: How Do We Fix It? */}
        <div className="mb-8">
          <Lesson
            title="How Do We Fix It?"
            lessonNumber={4}
            isUnlocked={currentStage >= 4}
            onComplete={handleLessonComplete}
            content={
              <div className="space-y-4">
                <p>
                  If testing reveals radon levels above 200 Bq/m³ (Health
                  Canada`s action level), there are proven mitigation strategies
                  that can reduce radon by 80-99%.
                </p>

                <h4 className="font-bold text-lg text-gray-900 dark:text-white mt-6">
                  Most Effective: Sub-Slab Depressurization
                </h4>
                <p>
                  This is the gold standard for radon mitigation. A pipe is
                  inserted through the floor slab into the aggregate below, and
                  a fan draws radon from beneath the foundation and vents it
                  safely above the roof.
                </p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>Effectiveness: 99%</li>
                  <li>Cost: $1,500 - $3,000 (professional installation)</li>
                  <li>Maintenance: Fan runs 24/7, minimal upkeep</li>
                </ul>

                <h4 className="font-bold text-lg text-gray-900 dark:text-white mt-6">
                  Other Strategies
                </h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Sealing cracks and openings:</strong> Helps but not
                    sufficient alone (50% effective)
                  </li>
                  <li>
                    <strong>Improving ventilation (HRV/ERV):</strong> Can reduce
                    levels by 30-50%
                  </li>
                  <li>
                    <strong>Crawlspace ventilation:</strong> For homes with
                    crawlspaces (70% effective)
                  </li>
                </ul>

                <div className="bg-green-100 dark:bg-green-900 border-l-4 border-green-500 p-4 rounded mt-4">
                  <p className="font-semibold text-green-700 dark:text-green-300">
                    ✓ Important Steps
                  </p>
                  <div className="text-sm text-green-600 dark:text-green-400 mt-2 space-y-1">
                    <p>
                      1. <strong>Test first:</strong> Use a long-term test kit
                      (90+ days)
                    </p>
                    <p>
                      2. <strong>Hire certified:</strong> Look for C-NRPP
                      certified professionals
                    </p>
                    <p>
                      3. <strong>Retest after:</strong> Verify mitigation worked
                    </p>
                    <p>
                      4. <strong>Maintain system:</strong> Ensure fan keeps
                      running
                    </p>
                  </div>
                </div>
              </div>
            }
          />
        </div>

        {/* Completion CTA */}
        {currentStage > EDUCATION_STAGES.length && (
          <div className="bg-gradient-to-r from-radon-500 to-radon-700 p-8 rounded-lg shadow-lg text-white text-center">
            <h2 className="text-3xl font-bold mb-4">
              🎉 You`ve Completed All Lessons!
            </h2>
            <p className="mb-6">
              You now understand radon science and how ML systems analyze risk
              factors. Ready to try the prediction tool?
            </p>
            <Link
              href="/predict"
              className="bg-white hover:bg-gray-100 text-radon-700 px-8 py-4 rounded-lg font-bold text-lg inline-block transition-all"
            >
              Predict Your Radon Risk 🔬
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
