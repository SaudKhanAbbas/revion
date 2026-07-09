import { useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import Button from "../components/ui/Button";

import { diagnoseMotorcycle } from "../api/diagnosisApi";

export default function DiagnosisPage() {
  const [symptom, setSymptom] = useState("");

  const [result, setResult] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!symptom.trim()) return;

    try {
      setLoading(true);

      const data = await diagnoseMotorcycle(symptom);

      setResult(data);
    } catch (error) {
      console.error(error);
      alert("Diagnosis failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-4xl font-bold text-white">
        AI Diagnosis
      </h1>

      <p className="mt-2 text-zinc-400">
        Describe the problem with your motorcycle.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-4"
      >
        <textarea
          value={symptom}
          onChange={(e) =>
            setSymptom(e.target.value)
          }
          placeholder="Example: My bike won't start..."
          className="h-40 w-full rounded-2xl border border-zinc-700 bg-zinc-900 p-5 text-white outline-none"
        />

        <Button type="submit">
          {loading
            ? "Diagnosing..."
            : "Run Diagnosis"}
        </Button>
      </form>

      {result && (
        <div className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
          <h2 className="text-2xl font-bold text-white">
            Diagnosis Result
          </h2>

          <div className="mt-6 space-y-5">
            <div>
              <p className="text-zinc-400">
                Diagnosis
              </p>

              <p className="text-lg text-white">
                {result.diagnosis}
              </p>
            </div>

            <div>
              <p className="text-zinc-400">
                Recommendation
              </p>

              <p className="text-lg text-white">
                {result.recommendation}
              </p>
            </div>

            <div>
              <p className="text-zinc-400">
                Severity
              </p>

              <span
                className={`inline-block rounded-xl px-4 py-2 font-semibold ${
                  result.severity === "High"
                    ? "bg-red-500/20 text-red-400"
                    : result.severity ===
                      "Medium"
                    ? "bg-yellow-500/20 text-yellow-400"
                    : "bg-zinc-700 text-zinc-300"
                }`}
              >
                {result.severity}
              </span>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}