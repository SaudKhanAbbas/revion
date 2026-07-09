import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import GaragePage from "./pages/GaragePage";
import MaintenancePage from "./pages/MaintenancePage";
import ExpensesPage from "./pages/ExpensesPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/garage" element={<GaragePage />} />
      <Route path="/maintenance" element={<MaintenancePage />} />
      <Route path="/expenses" element={<ExpensesPage />} />
    </Routes>
  );
}

export default App;