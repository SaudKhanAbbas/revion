import { AnimatePresence, motion } from "framer-motion";
import {
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import GaragePage from "./pages/GaragePage";
import MaintenancePage from "./pages/MaintenancePage";
import ExpensesPage from "./pages/ExpensesPage";
import DiagnosisPage from "./pages/DiagnosisPage";
import NotFoundPage from "./pages/NotFoundPage";

function PageTransition({ children }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 12,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: -12,
      }}
      transition={{
        duration: 0.25,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
}

function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes
        location={location}
        key={location.pathname}
      >
        <Route
          path="/"
          element={
            <PageTransition>
              <LandingPage />
            </PageTransition>
          }
        />

        <Route
          path="/login"
          element={
            <PageTransition>
              <LoginPage />
            </PageTransition>
          }
        />

        <Route
          path="/signup"
          element={
            <PageTransition>
              <SignupPage />
            </PageTransition>
          }
        />

        <Route
          path="/dashboard"
          element={
            <PageTransition>
              <DashboardPage />
            </PageTransition>
          }
        />

        <Route
          path="/garage"
          element={
            <PageTransition>
              <GaragePage />
            </PageTransition>
          }
        />

        <Route
          path="/maintenance"
          element={
            <PageTransition>
              <MaintenancePage />
            </PageTransition>
          }
        />

        <Route
          path="/expenses"
          element={
            <PageTransition>
              <ExpensesPage />
            </PageTransition>
          }
        />

        <Route
          path="/diagnosis"
          element={
            <PageTransition>
              <DiagnosisPage />
            </PageTransition>
          }
        />

        <Route
          path="*"
          element={
            <PageTransition>
              <NotFoundPage />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default App;