import Card from "../ui/Card";

const features = [
  {
    title: "AI Diagnosis",
    description:
      "Describe your motorcycle's symptoms and receive intelligent troubleshooting suggestions.",
  },
  {
    title: "Maintenance Tracker",
    description:
      "Never miss another oil change, chain clean, or scheduled service.",
  },
  {
    title: "Expense Analytics",
    description:
      "Track every rupee spent on fuel, repairs, insurance, and accessories.",
  },
  {
    title: "Health Score",
    description:
      "Monitor your motorcycle's overall condition with a smart health score.",
  },
];

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="mt-32 scroll-mt-24"
    >
      <h2 className="text-center text-4xl font-bold">
        Everything you need.
      </h2>

      <p className="mx-auto mt-4 max-w-2xl text-center text-zinc-400">
        Revion brings together maintenance, diagnostics,
        analytics, and expense tracking into one modern
        platform.
      </p>

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {features.map((feature) => (
          <Card key={feature.title}>
            <h3 className="text-xl font-semibold">
              {feature.title}
            </h3>

            <p className="mt-3 text-zinc-400">
              {feature.description}
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
}