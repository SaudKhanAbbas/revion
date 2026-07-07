import { Link } from "react-router-dom";

import Button from "../components/ui/Button";
import Container from "../components/layout/Container";
import Footer from "../components/layout/Footer";

import DashboardPreview from "../components/common/DashboardPreview";
import FeaturesSection from "../components/common/FeaturesSection";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <Container>
        <nav className="flex h-20 items-center justify-between">
          <Link to="/">
            <h1 className="text-2xl font-bold tracking-tight">
              Revion
            </h1>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <a
              href="#features"
              className="text-sm text-zinc-400 hover:text-white"
            >
              Features
            </a>

            <a
              href="#about"
              className="text-sm text-zinc-400 hover:text-white"
            >
              About
            </a>

            <a
              href="https://github.com/SaudKhanAbbas/revion"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-zinc-400 hover:text-white"
            >
              GitHub
            </a>

            <Link to="/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </nav>
      </Container>

      <Container>
        <section className="flex flex-col items-center pt-24 text-center">
          <p className="mb-4 rounded-full border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm text-zinc-400">
            AI-Powered Motorcycle Management
          </p>

          <h2 className="max-w-4xl text-5xl font-bold leading-tight md:text-7xl">
            Everything your motorcycle needs,
            <br />
            all in one place.
          </h2>

          <p className="mt-8 max-w-2xl text-lg text-zinc-400">
            Track maintenance, monitor expenses, diagnose issues with AI,
            and keep every ride in peak condition.
          </p>

          <div className="mt-10 flex gap-4">
            <Link to="/signup">
              <Button>Get Started</Button>
            </Link>

            <a
              href="https://github.com/SaudKhanAbbas/revion"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="secondary">
                View GitHub
              </Button>
            </a>
          </div>

          <DashboardPreview />

          <FeaturesSection />
        </section>
      </Container>

      <Footer />
    </main>
  );
}