
import { Link,  } from "react-router-dom";
import {
  FolderKanban,
  ArrowRight,
  Plus,
  LayoutDashboard,
} from "lucide-react";

function BoardCard({ board }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition">
      <div className="flex justify-between items-start">
        <div className="bg-orange-100 p-3 rounded-lg">
          <FolderKanban size={25} className="text-orange-500" />
        </div>
      </div>

      <h2 className="text-lg font-bold mt-5">
        {board.title}
      </h2>

      <p className="text-sm text-gray-500 mt-2">
        {board.description || "No description available"}
      </p>

      <Link
        to={`/board/${board.id}`}
        className="inline-flex items-center gap-2 mt-5 text-orange-600 font-medium hover:gap-3 transition-all"
      >
        Open Board
        <ArrowRight size={17} />
      </Link>
    </div>
  );
}

function Dashboard({ boards }) {
  // const navigate = useNavigate();

  // const handleCreateBoard = () => {
  //   console.log("Redirecting to board creation");

  //   navigate("/boards");
  // };

  return (
    <div className="space-y-8">
      {/* Dashboard Header */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div>


          <h1 className="text-2xl font-bold text-gray-800">
            Welcome to TaskFlow!
          </h1>

          <p className="text-gray-500 mt-2">
            Manage your projects and organize your daily tasks.
          </p>
        </div>

        {/* <button
          onClick={handleCreateBoard}
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2.5 rounded-lg transition"
        >
          <Plus size={18} />
          Create Board
        </button> */}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

        <div className="bg-white border rounded-xl p-5">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="text-orange-500" size={25} />

            <div>
              <p className="text-sm text-gray-500">
                Available Boards
              </p>

              <h3 className="font-semibold text-gray-800">
                {boards.length} {boards.length === 1 ? "Board" : "Boards"}
              </h3>
            </div>
          </div>
        </div>
      </div>

   
      <section>
        <div className="flex justify-between items-center mb-5">
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              My Boards
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Your available projects
            </p>
          </div>
        </div>

        {boards.length === 0 ? (
          <div className="bg-white border rounded-xl p-8 text-center">
            <FolderKanban
              size={35}
              className="mx-auto text-gray-400"
            />

            <p className="text-gray-500 mt-3">
              No boards available. Create your first board.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {boards.map((board) => (
              <BoardCard key={board.id} board={board} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Dashboard;
