import { LayoutDashboard, KanbanSquare } from "lucide-react";
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r p-6 hidden md:block min-h-screen">

      <h1 className="text-2xl font-bold text-orange-500 mb-8">
        TaskFlow.
      </h1>

      <nav className="space-y-2">

        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg ${
              isActive
                ? "bg-orange-100 text-orange-600 font-semibold"
                : "text-gray-600 hover:bg-gray-100"
            }`
          }
        >
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>

        <NavLink
          to="/boards"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg ${
              isActive
                ? "bg-orange-100 text-orange-600 font-semibold"
                : "text-gray-600 hover:bg-gray-100"
            }`
          }
        >
          <KanbanSquare size={20} />
          My Boards
        </NavLink>

      </nav>

    </aside>
  );
}

export default Sidebar;