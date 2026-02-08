import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-radon-900 via-radon-700 to-radon-500">
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center text-white mb-16">
          <h1 className="text-6xl font-bold mb-6">RadonVision 🔬</h1>
          <p className="text-2xl mb-4 opacity-90">
            An Over-Engineered Educational Platform for Radon Awareness
          </p>
          <p className="text-lg max-w-3xl mx-auto opacity-75">
            Learn about radon through an interactive ML prediction system.
            Discover how machine learning analyzes geological and building
            factors to predict radon levels in Canadian homes.
          </p>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-xl text-center">
            <div className="text-5xl mb-3">☢️</div>
            <div className="text-3xl font-bold text-radon-600 mb-2">16%</div>
            <p className="text-gray-600 dark:text-gray-400">
              of Canadian homes have high radon levels
            </p>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-xl text-center">
            <div className="text-5xl mb-3">🫁</div>
            <div className="text-3xl font-bold text-radon-600 mb-2">#1</div>
            <p className="text-gray-600 dark:text-gray-400">
              cause of lung cancer in non-smokers
            </p>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-xl text-center">
            <div className="text-5xl mb-3">🧠</div>
            <div className="text-3xl font-bold text-radon-600 mb-2">AI</div>
            <p className="text-gray-600 dark:text-gray-400">
              powered prediction using 7 risk factors
            </p>
          </div>
        </div>

        {/* What You'll Learn */}
        <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-xl mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white text-center">
            What You'll Learn
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <div className="text-3xl">📚</div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  Interactive Education
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Progressive lessons on radon science, from uranium decay to
                  mitigation strategies
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-3xl">🤖</div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  ML Prediction System
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Watch a neural network analyze your home's characteristics in
                  real-time
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-3xl">🎨</div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  3D Visualization
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  See radon particles flowing through a cross-section of your
                  home
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-3xl">🗺️</div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  Real Canadian Data
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Explore Health Canada's radon measurements across provinces
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <Link
            href="/learn"
            className="bg-white hover:bg-gray-100 text-radon-700 px-8 py-4 rounded-lg font-bold text-lg shadow-lg transition-all hover:shadow-xl"
          >
            Start Learning 📚
          </Link>
          <Link
            href="/predict"
            className="bg-radon-800 hover:bg-radon-900 text-white px-8 py-4 rounded-lg font-bold text-lg shadow-lg transition-all hover:shadow-xl"
          >
            Try the Prediction Tool 🔬
          </Link>
        </div>

        {/* Disclaimer */}
        <div className="mt-16 text-center text-white text-sm opacity-75 max-w-2xl mx-auto">
          <p>
            ⚠️ This is an educational tool demonstrating ML concepts.
            Predictions are based on heuristic models, not trained neural
            networks. Always test your actual home with a certified radon test
            kit.
          </p>
        </div>
      </main>
    </div>
  );
}
