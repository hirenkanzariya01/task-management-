import { Bell, User } from "lucide-react";

function Navbar() {
  return (
    <nav className="flex justify-between items-center mb-8">

      <div>
        <p className="text-sm text-gray-400">
          Workspace / Projects
        </p>

        <h2 className="text-2xl font-bold text-gray-800">
          My Projects
        </h2>
      </div>

      <div className="flex items-center gap-4">

        <button className="p-2 bg-white border rounded-lg">
          <Bell size={20} />
        </button>

        <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center">
          <User size={20} />
        </div>

      </div>

    </nav>
  );
}

export default Navbar;