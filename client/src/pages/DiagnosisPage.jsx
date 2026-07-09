import { useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";

import { diagnoseMotorcycle } from "../api/diagnosisApi";
import { useToast } from "../context/ToastContext";

export default function DiagnosisPage() {
  const [symptom, setSymptom] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const { showToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!symptom.trim()) {
      showToast("Please enter a symptom.", "error");
      return;
    }

    try {
      setLoading(true);

      const data = await diagnoseMotorcycle(symptom);

      setResult(data);

      showToast(
        "Diagnosis completed successfully.",
        "success"
      );
    } catch (error) {
      console.error(error);

      showToast(
        "Diagnosis failed. Please try again.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const severityColor = {
    Low: "bg-green-500/20 text-green-400",
    Medium: "bg-yellow-500/20 text-yellow-400",
    High: "bg-red-500/20 text-red-400",
  };

  return (
    <DashboardLayout>
      <h1 className="text-4xl font-bold text-white">
        AI Diagnosis
      </h1>

      <p className="mt-2 text-zinc-400">
        Describe what's happening with your motorcycle.
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
          placeholder="Example: My bike won't start and I hear a clicking sound..."
          className="h-40 w-full rounded-2xl border border-zinc-700 bg-zinc-900 p-5 text-white outline-none"
        />

        <Button type="submit">
          {loading
            ? "Analyzing..."
            : "Run Diagnosis"}
        </Button>
      </form>

      {result && (
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <Card>
            <h2 className="text-2xl font-bold text-white">
              Diagnosis
            </h2>

            <p className="mt-4 text-zinc-300">
              {result.diagnosis}
            </p>

            <div className="mt-6">
              <span
                className={`rounded-xl px-4 py-2 font-semibold ${
                  severityColor[result.severity]
                }`}
              >
                {result.severity}
              </span>
            </div>

            <div className="mt-8">
              <div className="mb-2 flex justify-between text-sm text-zinc-400">
                <span>Confidence</span>
                <span>{result.confidence}%</span>
              </div>

              <div className="h-3 rounded-full bg-zinc-800">
                <div
                  className="h-full rounded-full bg-green-400 transition-all duration-500"
                  style={{
                    width: `${result.confidence}%`,
                  }}
                />
              </div>
            </div>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold text-white">
              Possible Causes
            </h2>

            <ul className="mt-5 list-disc space-y-3 pl-5 text-zinc-300">
              {result.possibleCauses.map(
                (cause, index) => (
                  <li key={index}>{cause}</li>
                )
              )}
            </ul>
          </Card>

          <Card className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-white">
              Recommended Actions
            </h2>

            <div className="mt-5 space-y-4">
              {result.recommendation.map(
                (step, index) => (
                  <div
                    key={index}
                    className="flex gap-4"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white font-bold text-black">
                      {index + 1}
                    </div>

                    <p className="flex-1 text-zinc-300">
                      {step}
                    </p>
                  </div>
                )
              )}
            </div>
          </Card>
        </div>
      )}
    </DashboardLayout>
  );
}