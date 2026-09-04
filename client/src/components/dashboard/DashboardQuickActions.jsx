import { useNavigate } from "react-router-dom";
import Card from "../ui/Card";
import Button from "../ui/Button";

export default function DashboardQuickActions() {
  const navigate = useNavigate();

  return (
    <Card className="mt-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Quick Actions</h2>
          <p className="mt-2 text-zinc-500">Jump to the section you need.</p>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-4">
        <Button variant="filled" onClick={() => navigate("/garage")}>
          Garage
        </Button>

        <Button variant="outline" onClick={() => navigate("/maintenance")}>
          Maintenance
        </Button>

        <Button variant="outline" onClick={() => navigate("/expenses")}>
          Expenses
        </Button>

        <Button variant="outline" onClick={() => navigate("/diagnosis")}>
          AI Diagnosis
        </Button>
      </div>
    </Card>
  );
}
