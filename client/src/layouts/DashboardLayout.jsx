import { useState } from "react";

import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="lg:hidden border-b border-zinc-800 p-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="rounded-lg border border-zinc-700 px-4 py-2 text-white"
        >
          ☰ Menu
        </button>
      </div>

      <div className="flex">
        <div
          className={`fixed inset-y-0 left-0 z-40 transform transition-transform duration-300 lg:static lg:translate-x-0 ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }`}
        >
          <Sidebar closeSidebar={() => setSidebarOpen(false)} />
        </div>

        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <div className="flex min-h-screen flex-1 flex-col">
          <Topbar />

          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}