import { LayoutDashboard, Settings, Users } from "lucide-react";

function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r p-6 hidden md:block">

      <h1 className="text-2xl font-bold text-orange-500">
        TaskFlow.
      </h1>

      <p className="text-xs text-gray-400 mt-10 mb-4">
        WORKSPACE
      </p>

      <div className="flex items-center gap-3 bg-orange-50 text-orange-600 p-3 rounded-lg">
        <LayoutDashboard size={20} />
        My Boards
      </div>

      <div className="flex items-center gap-3 text-gray-500 p-3 mt-2">
        <Users size={20} />
        Team Members
      </div>

      <div className="flex items-center gap-3 text-gray-500 p-3">
        <Settings size={20} />
        Settings
      </div>

    </aside>
  );
}

export default Sidebar;