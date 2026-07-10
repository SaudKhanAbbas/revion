import { motion } from "framer-motion";
import {
  Brain,
  Wrench,
  Wallet,
  Activity,
  ArrowUpRight,
} from "lucide-react";

import Card from "../ui/Card";

const features = [
  {
    title: "AI Diagnosis",
    description:
      "Describe your motorcycle's symptoms and receive intelligent troubleshooting powered by Gemini AI.",
    icon: Brain,
    color: "text-sky-400",
  },
  {
    title: "Maintenance Tracker",
    description:
      "Stay ahead of every service with reminders, history and maintenance logs.",
    icon: Wrench,
    color: "text-orange-400",
  },
  {
    title: "Expense Analytics",
    description:
      "Monitor every rupee spent on fuel, insurance, repairs and accessories.",
    icon: Wallet,
    color: "text-emerald-400",
  },
  {
    title: "Health Score",
    description:
      "Understand your motorcycle's condition instantly with a dynamic health score.",
    icon: Activity,
    color: "text-violet-400",
  },
];

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="mt-40"
    >
      <div className="mx-auto max-w-3xl text-center">
        <p className="font-medium uppercase tracking-[0.3em] text-sky-400">
          Features
        </p>

        <h2 className="mt-5 text-5xl font-black tracking-tight text-white">
          Built for riders who
          <br />
          expect more.
        </h2>

        <p className="mt-6 text-lg leading-8 text-zinc-400">
          Everything from AI diagnostics to maintenance,
          expenses and health monitoring lives inside one
          premium dashboard.
        </p>
      </div>

      <div className="mt-20 grid gap-8 md:grid-cols-2">
        {features.map((feature, index) => {
          const Icon = feature.icon;

          return (
            <motion.div
              key={feature.title}
              initial={{
                opacity: 0,
                y: 25,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.08,
              }}
            >
              <Card className="group h-full">
                <div className="flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-800">
                    <Icon
                      size={26}
                      className={feature.color}
                    />
                  </div>

                  <ArrowUpRight
                    size={18}
                    className="text-zinc-600 transition group-hover:text-sky-400"
                  />
                </div>

                <h3 className="mt-8 text-2xl font-bold text-white">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-7 text-zinc-400">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}