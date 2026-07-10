import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Bike,
  Wrench,
  Wallet,
  Brain,
} from "lucide-react";

import { Link, NavLink } from "react-router-dom";

const links = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Garage",
    path: "/garage",
    icon: Bike,
  },
  {
    name: "Maintenance",
    path: "/maintenance",
    icon: Wrench,
  },
  {
    name: "Expenses",
    path: "/expenses",
    icon: Wallet,
  },
  {
    name: "AI Diagnosis",
    path: "/diagnosis",
    icon: Brain,
  },
];

export default function Sidebar({
  closeSidebar = () => {},
}) {
  return (
    <aside className="flex h-screen w-72 flex-col border-r border-zinc-800 bg-zinc-950/95 backdrop-blur-xl">

      <Link
        to="/dashboard"
        onClick={closeSidebar}
        className="border-b border-zinc-800 p-8 transition-opacity duration-300 hover:opacity-80"
      >

        <h1 className="text-3xl font-black tracking-tight">
          Revion
        </h1>

        <p className="mt-2 text-sm text-zinc-500">
          Motorcycle OS
        </p>

      </Link>

      <nav className="flex-1 space-y-2 p-5">

        {links.map((link) => {
          const Icon = link.icon;

          return (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={closeSidebar}
            >
              {({ isActive }) => (
                <motion.div
                  whileHover={{
                    x: 6,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  className={`group flex items-center gap-4 rounded-2xl px-5 py-4 transition-all duration-300 ${
                    isActive
                      ? "bg-white text-black shadow-lg"
                      : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                  }`}
                >
                  <Icon
                    size={20}
                    className="transition group-hover:scale-110"
                  />

                  <span className="font-medium">
                    {link.name}
                  </span>

                </motion.div>
              )}
            </NavLink>
          );
        })}

      </nav>

      <div className="border-t border-zinc-800 p-6">

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4">

          <p className="text-xs uppercase tracking-widest text-zinc-500">
            Revion AI
          </p>

          <p className="mt-2 text-sm text-zinc-300">
            Your motorcycle looks healthy today.
          </p>

        </div>

      </div>

    </aside>
  );
}