import { useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import Page from "../components/ui/Page";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-950">

      {/* Mobile Header */}

      <div className="sticky top-0 z-50 flex items-center justify-between border-b border-zinc-800 bg-zinc-950/80 px-5 py-4 backdrop-blur-xl lg:hidden">

        <h1 className="text-xl font-black">
          Revion
        </h1>

        <button
          onClick={() =>
            setSidebarOpen((prev) => !prev)
          }
          className="rounded-xl border border-zinc-800 bg-zinc-900 p-2 transition hover:border-sky-400"
        >
          {sidebarOpen ? (
            <X size={22} />
          ) : (
            <Menu size={22} />
          )}
        </button>

      </div>

      {/* Fixed Desktop Sidebar */}

      <div className="fixed inset-y-0 left-0 z-30 hidden lg:block">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}

      <AnimatePresence>

        {sidebarOpen && (
          <>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
              onClick={() =>
                setSidebarOpen(false)
              }
            />

            <motion.div
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 28,
              }}
              className="fixed left-0 top-0 z-50 h-screen lg:hidden"
            >
              <Sidebar
                closeSidebar={() =>
                  setSidebarOpen(false)
                }
              />
            </motion.div>

          </>
        )}

      </AnimatePresence>

      {/* Main Content */}

      <div className="flex min-h-screen flex-col lg:ml-72">

        <Topbar />

        <Page className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </Page>

      </div>

    </div>
  );
}