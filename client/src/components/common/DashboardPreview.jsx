import { motion } from "framer-motion";
import {
  Activity,
  Brain,
  Fuel,
  Wrench,
  ShieldCheck,
  ArrowUpRight,
  Bell,
  TrendingUp,
} from "lucide-react";

export default function DashboardPreview() {
  const stats = [
    {
      icon: Activity,
      title: "Health Score",
      value: "94%",
      color: "text-emerald-400",
    },
    {
      icon: Wrench,
      title: "Next Service",
      value: "620 km",
      color: "text-sky-400",
    },
    {
      icon: Fuel,
      title: "Monthly Cost",
      value: "₹3,420",
      color: "text-orange-400",
    },
    {
      icon: Brain,
      title: "AI Status",
      value: "Healthy",
      color: "text-violet-400",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative mt-28 w-full"
    >
      <div className="absolute inset-0 -z-10 flex justify-center">
        <div className="h-80 w-80 rounded-full bg-sky-400/10 blur-[150px]" />
      </div>

      <div className="overflow-hidden rounded-[36px] border border-zinc-800 bg-zinc-900/70 shadow-[0_25px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl">

        <div className="flex items-center justify-between border-b border-zinc-800 px-8 py-6">

          <div>
            <p className="text-sm uppercase tracking-widest text-zinc-500">
              Dashboard
            </p>

            <h2 className="mt-2 text-3xl font-black">
              Welcome back, Rider.
            </h2>
          </div>

          <div className="flex items-center gap-4">

            <button className="rounded-2xl border border-zinc-800 bg-zinc-900 p-3 transition hover:border-sky-400">
              <Bell
                size={18}
                className="text-zinc-400"
              />
            </button>

            <div className="flex items-center gap-2 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-2">

              <ShieldCheck
                size={18}
                className="text-emerald-400"
              />

              <span className="font-medium text-emerald-400">
                Excellent
              </span>

            </div>

          </div>

        </div>

        <div className="grid gap-6 p-8 lg:grid-cols-[1.2fr_0.8fr]">

          <div>

            <div className="grid gap-5 sm:grid-cols-2">

              {stats.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.title}
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: index * 0.08,
                    }}
                    className="rounded-3xl border border-zinc-800 bg-zinc-950/60 p-6 transition hover:border-sky-400/30"
                  >
                    <div className="flex items-center justify-between">

                      <Icon
                        size={22}
                        className={item.color}
                      />

                      <ArrowUpRight
                        size={18}
                        className="text-zinc-600"
                      />

                    </div>

                    <p className="mt-6 text-sm text-zinc-500">
                      {item.title}
                    </p>

                    <h3 className="mt-2 text-3xl font-bold">
                      {item.value}
                    </h3>

                  </motion.div>
                );
              })}

            </div>

          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-950/60 p-6">

            <div className="flex items-center justify-between">

              <h3 className="text-xl font-bold">
                Recent Activity
              </h3>

              <TrendingUp
                size={20}
                className="text-emerald-400"
              />

            </div>

            <div className="mt-8 space-y-6">

              <div>
                <p className="text-white">
                  Oil changed
                </p>

                <p className="text-sm text-zinc-500">
                  3 days ago
                </p>
              </div>

              <div>
                <p className="text-white">
                  Chain cleaned
                </p>

                <p className="text-sm text-zinc-500">
                  1 week ago
                </p>
              </div>

              <div>
                <p className="text-white">
                  AI scan completed
                </p>

                <p className="text-sm text-zinc-500">
                  Motorcycle looks healthy
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

    </motion.section>
  );
}