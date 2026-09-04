import { useEffect, useState } from "react";
import { BookOpen, Wrench, ShieldAlert, Sparkles, CircleGauge } from "lucide-react";
import toast from "react-hot-toast";

import DashboardLayout from "../layouts/DashboardLayout";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import SkeletonCard from "../components/ui/SkeletonCard";

import { getServiceGuides, getServiceCategories } from "../api/serviceGuideApi";

export default function ServiceGuidePage() {
  const [guides, setGuides] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategories = async () => {
    try {
      const res = await getServiceCategories();
      if (res.success) {
        setCategories(res.data);
      }
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const fetchGuides = async (categoryId = null) => {
    try {
      setLoading(true);
      setError(null);
      const res = await getServiceGuides(categoryId);
      if (res.success) {
        setGuides(res.data);
      } else {
        setError(res.message || "Failed to load service guides.");
      }
    } catch (err) {
      console.error("Error fetching service guides:", err);
      setError(
        err.response?.data?.message || "Failed to connect to Service Catalog database."
      );
      toast.error("Could not load service catalog.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchGuides();
  }, []);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    fetchGuides(categoryId);
  };

  return (
    <DashboardLayout>
      {/* Header Banner */}
      <div className="mb-10">
        <p className="text-sm uppercase tracking-[0.3em] text-emerald-400">
          Factory Service Specs
        </p>
        <h1 className="mt-3 text-5xl font-black tracking-tight">
          Maintenance Catalog
        </h1>
        <p className="mt-4 max-w-3xl text-lg text-zinc-400">
          Recommended service intervals, maintenance procedures, and estimated service costs for peak motorcycle health.
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="mb-8 flex flex-wrap items-center gap-3">
        <Button
          variant={selectedCategory === null ? "filled" : "outline"}
          onClick={() => handleCategorySelect(null)}
          className="rounded-xl px-5 py-2.5 text-sm font-medium"
        >
          All Recommendations
        </Button>

        {categories.map((cat) => (
          <Button
            key={cat.id}
            variant={selectedCategory === cat.id ? "filled" : "outline"}
            onClick={() => handleCategorySelect(cat.id)}
            className="rounded-xl px-5 py-2.5 text-sm font-medium"
          >
            {cat.name}
          </Button>
        ))}
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      ) : error ? (
        /* Error State */
        <Card className="py-16 text-center border-red-500/20 bg-red-500/5">
          <ShieldAlert size={56} className="mx-auto text-red-400" />
          <h2 className="mt-4 text-2xl font-bold text-white">Service Catalog Unavailable</h2>
          <p className="mt-2 text-zinc-400 max-w-md mx-auto">{error}</p>
          <Button
            className="mt-6"
            onClick={() => fetchGuides(selectedCategory)}
          >
            Retry Connection
          </Button>
        </Card>
      ) : guides.length === 0 ? (
        /* Empty State */
        <Card className="py-16 text-center">
          <BookOpen size={56} className="mx-auto text-zinc-600" />
          <h3 className="mt-4 text-2xl font-bold">No Service Recommendations Found</h3>
          <p className="mt-2 text-zinc-400">Try selecting a different service category.</p>
        </Card>
      ) : (
        /* Service Guides Grid */
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {guides.map((guide) => (
            <Card key={guide.guide_id} className="flex flex-col justify-between hover:border-zinc-700 transition">
              <div>
                <div className="flex items-start justify-between gap-4">
                  <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
                    {guide.category_name}
                  </span>

                  <span className="text-lg font-black text-white">
                    ₹{Number(guide.estimated_cost).toLocaleString("en-IN")}
                  </span>
                </div>

                <h3 className="mt-4 text-2xl font-bold text-white leading-snug">
                  {guide.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                  {guide.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400">
                <div className="flex items-center gap-2">
                  <CircleGauge size={16} className="text-sky-400" />
                  <span>Interval: <strong className="text-zinc-200">{guide.interval_km.toLocaleString()} km</strong></span>
                </div>

                <div className="flex items-center gap-1 text-zinc-500">
                  <Wrench size={14} />
                  <span>Standard Service</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
