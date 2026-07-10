import { motion } from "framer-motion";
import {
  ArrowRight,
  GitBranch,
  Sparkles,
} from "lucide-react";

import { Link } from "react-router-dom";

import Button from "../components/ui/Button";
import Container from "../components/layout/Container";
import Footer from "../components/layout/Footer";

import DashboardPreview from "../components/common/DashboardPreview";
import FeaturesSection from "../components/common/FeaturesSection";

export default function LandingPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-zinc-950 text-white">
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top,#0ea5e920,transparent_45%)]" />

      <div className="absolute left-1/2 top-[-250px] -z-10 h-[650px] w-[650px] -translate-x-1/2 rounded-full bg-sky-400/10 blur-[180px]" />

      <Container>
        <motion.nav
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex h-24 items-center justify-between"
        >
          <Link to="/">
            <h1 className="text-3xl font-black tracking-tight">
              Revion
            </h1>
          </Link>

          <div className="hidden items-center gap-10 lg:flex">
            <a
              href="#features"
              className="text-zinc-400 transition hover:text-white"
            >
              Features
            </a>

            <a
              href="https://github.com/SaudKhanAbbas/revion"
              target="_blank"
              rel="noreferrer"
              className="text-zinc-400 transition hover:text-white"
            >
              GitHub
            </a>

            <Link to="/login">
              <Button variant="ghost">
                Login
              </Button>
            </Link>

            <Link to="/signup">
              <Button variant="filled">
                Get Started
              </Button>
            </Link>
          </div>
        </motion.nav>

        <section className="relative pt-24">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.15,
              duration: 0.7,
            }}
            className="mx-auto flex max-w-fit items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/10 px-5 py-2"
          >
            <Sparkles
              size={16}
              className="text-sky-400"
            />

            <span className="text-sm text-sky-300">
              Powered by Gemini AI
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 0.25,
              duration: 0.8,
            }}
            className="mx-auto mt-10 max-w-6xl text-center text-6xl font-black leading-[1.05] tracking-tight md:text-8xl"
          >
            The operating system
            <br />
            for your motorcycle.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 0.35,
              duration: 0.8,
            }}
            className="mx-auto mt-8 max-w-3xl text-center text-xl leading-9 text-zinc-400"
          >
            Track maintenance, monitor expenses,
            receive AI-powered diagnostics and
            manage every aspect of your ride
            from one beautiful dashboard.
          </motion.p>

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.45,
              duration: 0.8,
            }}
            className="mt-12 flex flex-wrap justify-center gap-5"
          >
            <Link to="/signup">
              <Button
                className="px-8 py-4 text-base"
                variant="filled"
              >
                Get Started

                <ArrowRight
                  size={18}
                  className="ml-2"
                />
              </Button>
            </Link>

            <a
              href="https://github.com/SaudKhanAbbas/revion"
              target="_blank"
              rel="noreferrer"
            >
              <Button
                variant="outline"
                className="px-8 py-4 text-base"
              >
                <GitBranch
                  size={18}
                  className="mr-2"
                />

                View Source
              </Button>
            </a>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.6,
              duration: 0.8,
            }}
          >
            <DashboardPreview />
          </motion.div>

          <div className="mt-20 flex flex-wrap items-center justify-center gap-10 text-sm text-zinc-500">
            <span>✓ AI Diagnosis</span>
            <span>✓ Maintenance Tracking</span>
            <span>✓ Expense Analytics</span>
            <span>✓ Motorcycle Health Score</span>
          </div>
        </section>

        <section
          id="features"
          className="mt-40"
        >
          <FeaturesSection />
        </section>
      </Container>

      <Footer />
    </main>
  );
}