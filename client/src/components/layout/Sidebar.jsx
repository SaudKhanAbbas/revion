import { NavLink } from "react-router-dom";

const links = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Garage", path: "/garage" },
  { name: "Maintenance", path: "/maintenance" },
  { name: "Expenses", path: "/expenses" },
  { name: "AI Diagnosis", path: "/diagnosis" },
];

export default function Sidebar({
  closeSidebar = () => {},
}) {
  return (
    <aside className="flex h-screen w-64 flex-col border-r border-zinc-800 bg-zinc-950">
      <div className="border-b border-zinc-800 p-6">
        <h1 className="text-2xl font-bold text-white">
          Revion
        </h1>
      </div>

      <nav className="flex flex-1 flex-col gap-2 p-4">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            onClick={closeSidebar}
            className={({ isActive }) =>
              `rounded-xl px-4 py-3 transition ${
                isActive
                  ? "bg-white text-black"
                  : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}