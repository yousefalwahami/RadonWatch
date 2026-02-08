import Link from "next/link";
import Card from "@/components/ui/Card";

export default function Home() {
  return (
    <div className="relative z-10">
      <div className="mx-auto px-6 lg:px-16 py-10">
        {/* Header */}
        <header className="flex justify-between items-center mb-20 py-5">
          <div className="font-serif text-3xl font-semibold tracking-wide bg-gradient-to-br from-accent-gold to-accent-blue bg-clip-text text-transparent">
            RadonVision
          </div>
          <nav className="flex gap-10 items-center">
            <Link
              href="/"
              className="text-text-secondary hover:text-text-primary text-sm font-medium tracking-wide transition-colors relative group"
            >
              Home
              <span className="absolute bottom-[-5px] left-0 w-0 h-[1px] bg-accent-gold transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/learn"
              className="text-text-secondary hover:text-text-primary text-sm font-medium tracking-wide transition-colors relative group"
            >
              Learn
              <span className="absolute bottom-[-5px] left-0 w-0 h-[1px] bg-accent-gold transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/predict"
              className="bg-gradient-to-r from-accent-gold to-[#c49563] text-dark-bg px-7 py-3 rounded-full font-semibold text-sm hover:shadow-glow-gold hover:-translate-y-0.5 transition-all duration-200 tracking-wide"
            >
              Analyze Your Home
            </Link>
          </nav>
        </header>

        {/* Hero Section */}
        <section className="text-center mb-24 animate-[fadeIn_1s_ease-out]">
          <h1 className="font-serif text-7xl font-light mb-5 tracking-wide leading-tight">
            Predictive Radon
            <br />
            Analysis
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto tracking-wide">
            Understand your home&apos;s radon risk through AI-powered prediction
            and interactive education.
          </p>
        </section>

        {/* How It Works Section */}
        <section className="mb-16">
          <h2 className="text-center font-serif text-5xl font-normal mb-4 tracking-wide">
            How It Works
          </h2>
          <p className="text-center text-text-secondary mb-16 tracking-wide">
            Three steps to understanding your radon risk.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7 auto-rows-fr">
            {/* Step 1 */}
            <Card delay={0.1}>
              <div className="w-[70px] h-[70px] mx-auto mb-8 flex items-center justify-center bg-accent-gold/10 border border-accent-gold/20 rounded-[18px] relative">
                <svg
                  className="w-9 h-9 stroke-accent-gold fill-none"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
                <div className="absolute -top-2.5 -right-2.5 w-7 h-7 bg-accent-gold text-dark-bg rounded-full text-xs font-bold flex items-center justify-center">
                  1
                </div>
              </div>

              <h3 className="font-serif text-2xl font-semibold mb-4 text-center tracking-wide">
                Learn About Radon
              </h3>
              <p className="text-text-secondary text-center leading-relaxed text-sm tracking-wide">
                Interactive lessons guide you through radon science, from
                uranium decay chains to health impacts. Each lesson unlocks new
                features of our prediction system.
              </p>
            </Card>

            {/* Step 2 */}
            <Card delay={0.2}>
              <div className="w-[70px] h-[70px] mx-auto mb-8 flex items-center justify-center bg-accent-gold/10 border border-accent-gold/20 rounded-[18px] relative">
                <svg
                  className="w-9 h-9 stroke-accent-gold fill-none"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="6" />
                  <circle cx="12" cy="12" r="2" />
                </svg>
                <div className="absolute -top-2.5 -right-2.5 w-7 h-7 bg-accent-gold text-dark-bg rounded-full text-xs font-bold flex items-center justify-center">
                  2
                </div>
              </div>

              <h3 className="font-serif text-2xl font-semibold mb-4 text-center tracking-wide">
                AI Prediction
              </h3>
              <p className="text-text-secondary text-center leading-relaxed text-sm tracking-wide">
                Our neural network analyzes your home&apos;s
                characteristics—region, geology, building age, foundation
                type—to predict radon levels with precision.
              </p>
            </Card>

            {/* Step 3 */}
            <Card delay={0.3}>
              <div className="w-[70px] h-[70px] mx-auto mb-8 flex items-center justify-center bg-accent-gold/10 border border-accent-gold/20 rounded-[18px] relative">
                <svg
                  className="w-9 h-9 stroke-accent-gold fill-none"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <div className="absolute -top-2.5 -right-2.5 w-7 h-7 bg-accent-gold text-dark-bg rounded-full text-xs font-bold flex items-center justify-center">
                  3
                </div>
              </div>

              <h3 className="font-serif text-2xl font-semibold mb-4 text-center tracking-wide">
                Visualize & Act
              </h3>
              <p className="text-text-secondary text-center leading-relaxed text-sm tracking-wide">
                See radon particles rising through your home in 3D. Get
                personalized recommendations and compare your risk to regional
                data from Health Canada.
              </p>
            </Card>
          </div>
        </section>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-subtle to-transparent my-20"></div>

        {/* Footer */}
        <footer className="text-center py-10 text-text-secondary text-xs border-t border-subtle mt-20">
          <p>
            RadonVision © 2026 · Built for health education · Data from Health
            Canada
          </p>
        </footer>
      </div>
    </div>
  );
}
