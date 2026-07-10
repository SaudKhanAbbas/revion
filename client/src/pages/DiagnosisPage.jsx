import { useState } from "react";
import {
  Brain,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  LoaderCircle,
} from "lucide-react";
import toast from "react-hot-toast";

import DashboardLayout from "../layouts/DashboardLayout";

import Button from "../components/ui/Button";
import Card from "../components/ui/Card";

import { diagnoseMotorcycle } from "../api/diagnosisApi";

export default function DiagnosisPage() {
  const [symptom, setSymptom] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!symptom.trim()) {
      toast.error("Please describe your motorcycle issue.");
      return;
    }

    try {
      setLoading(true);

      const data = await diagnoseMotorcycle(symptom);

      setResult(data);

      toast.success("Diagnosis completed.");
    } catch (error) {
      console.error(error);

      toast.error("Diagnosis failed.");
    } finally {
      setLoading(false);
    }
  };

  const severityStyles = {
    Low: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20",
    Medium:
      "bg-yellow-500/15 text-yellow-400 border border-yellow-500/20",
    High: "bg-red-500/15 text-red-400 border border-red-500/20",
  };

  return (
    <DashboardLayout>

      <div className="mb-12">

        <p className="text-sm uppercase tracking-[0.3em] text-violet-400">
          Artificial Intelligence
        </p>

        <h1 className="mt-3 text-5xl font-black">
          Smart Diagnosis
        </h1>

        <p className="mt-4 max-w-3xl text-lg text-zinc-400">
          Explain your motorcycle's symptoms and let
          Revion AI analyze possible causes and recommend
          the next steps.
        </p>

      </div>

      <Card>

        <div className="flex items-center gap-4">

          <div className="rounded-2xl bg-violet-500/10 p-4">
            <Brain
              size={30}
              className="text-violet-400"
            />
          </div>

          <div>

            <h2 className="text-2xl font-bold">
              Describe the problem
            </h2>

            <p className="text-zinc-400">
              Include sounds, warning lights,
              vibrations or anything unusual.
            </p>

          </div>

        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8"
        >

          <textarea
            value={symptom}
            onChange={(e) =>
              setSymptom(e.target.value)
            }
            placeholder="Example: Motorcycle won't start, dashboard lights flicker and I hear a clicking sound..."
            className="h-44 w-full rounded-2xl border border-zinc-800 bg-zinc-950 p-5 text-white outline-none transition focus:border-violet-500"
          />

          <Button
            type="submit"
            variant="filled"
            className="mt-6"
            disabled={loading}
          >
            {loading ? (
              <>
                <LoaderCircle
                  size={18}
                  className="mr-2 animate-spin"
                />

                Analyzing...
              </>
            ) : (
              <>
                <Sparkles
                  size={18}
                  className="mr-2"
                />

                Run AI Diagnosis
              </>
            )}
          </Button>

        </form>

      </Card>

      {result && (

        <div className="mt-8 grid gap-6 lg:grid-cols-2">

          <Card>

            <div className="flex items-center gap-3">

              <Brain
                size={22}
                className="text-violet-400"
              />

              <h2 className="text-2xl font-bold">
                Diagnosis
              </h2>

            </div>

            <p className="mt-5 leading-8 text-zinc-300">
              {result.diagnosis}
            </p>

            <div className="mt-8 flex items-center justify-between">

              <span
                className={`rounded-xl px-4 py-2 font-semibold ${
                  severityStyles[result.severity]
                }`}
              >
                {result.severity} Severity
              </span>

              <span className="text-zinc-400">
                {result.confidence}% confidence
              </span>

            </div>

            <div className="mt-5 h-3 overflow-hidden rounded-full bg-zinc-800">

              <div
                className="h-full rounded-full bg-violet-500 transition-all duration-700"
                style={{
                  width: `${result.confidence}%`,
                }}
              />

            </div>

          </Card>

          <Card>

            <div className="flex items-center gap-3">

              <AlertTriangle
                size={22}
                className="text-orange-400"
              />

              <h2 className="text-2xl font-bold">
                Possible Causes
              </h2>

            </div>

            <div className="mt-6 space-y-4">

              {result.possibleCauses.map(
                (cause, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4"
                  >
                    {cause}
                  </div>
                )
              )}

            </div>

          </Card>

          <Card className="lg:col-span-2">

            <div className="flex items-center gap-3">

              <CheckCircle2
                size={22}
                className="text-emerald-400"
              />

              <h2 className="text-2xl font-bold">
                Recommended Actions
              </h2>

            </div>

            <div className="mt-8 space-y-5">

              {result.recommendation.map(
                (step, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 rounded-2xl border border-zinc-800 bg-zinc-950 p-5"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-500 font-bold">
                      {index + 1}
                    </div>

                    <p className="leading-7 text-zinc-300">
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