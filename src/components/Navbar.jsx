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

     

    </nav>
  );
}

export default Navbar;