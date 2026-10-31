
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FolderKanban,
  Plus,
  Pencil,
  Trash2,
  ArrowRight,
} from "lucide-react";

import BoardModal from "../components/BoardModal";

function BoardsPage({ boards, setBoards }) {

  const [showModal, setShowModal] = useState(false);
  const [editingBoard, setEditingBoard] = useState(null);

  // Open create board modal
  const handleCreateClick = () => {
    setEditingBoard(null);
    setShowModal(true);

    console.log("Opening create board modal");
  };

  // Open edit board modal
  const handleEditClick = (board) => {
    setEditingBoard(board);
    setShowModal(true);

    console.log("Editing board:", board.title);
  };


  const handleSaveBoard = (boardData) => {
    if (editingBoard) {
      setBoards((prevBoards) =>
        prevBoards.map((board) =>
          board.id === boardData.id
            ? { ...board, ...boardData }
            : board
        )
      );

      console.log("Board updated:", boardData.title);
    } else {
      const newBoard = {
        ...boardData,
        tasks: [],
      };

      setBoards((prevBoards) => [...prevBoards, newBoard]);

      console.log("New board created:", newBoard.title);
    }
  };


  // Delete board
  const handleDeleteBoard = (boardId) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this board?"
    );

    if (!confirmDelete) {
      console.log("Board deletion cancelled");
      return;
    }

    setBoards((prevBoards) =>
      prevBoards.filter((board) => board.id !== boardId)
    );

    console.log("Board deleted:", boardId);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingBoard(null);
  };

  return (
    <div>

      {/* Page Header */}
      <div className="flex justify-between items-center flex-wrap gap-4 mb-8">

        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            My Boards
          </h1>

          <p className="text-gray-500 mt-2">
            Create and manage your project boards.
          </p>
        </div>

        <button
          onClick={handleCreateClick}
          className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2.5 rounded-lg hover:bg-orange-600"
        >
          <Plus size={18} />
          Create Board
        </button>

      </div>

      {/* Board Count */}
      <p className="text-sm text-gray-500 mb-5">
        Total Boards: {boards.length}
      </p>

      {/* Board List */}
      {boards.length === 0 ? (

        <div className="bg-white border rounded-xl p-10 text-center">

          <FolderKanban size={40} className="mx-auto text-gray-400" />

          <h2 className="font-semibold text-lg mt-4">
            No boards created yet
          </h2>

          <p className="text-gray-500 text-sm mt-2">
            Create your first board to start managing tasks.
          </p>

        </div>

      ) : (

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

          {boards.map((board) => (

            <div
              key={board.id}
              className="bg-white border rounded-xl p-5 hover:shadow-md transition"
            >

              <div className="flex justify-between items-start">

                <div className="bg-orange-100 p-3 rounded-lg">
                  <FolderKanban
                    size={25}
                    className="text-orange-500"
                  />
                </div>

                <div className="flex gap-2">

                  <button
                    onClick={() => handleEditClick(board)}
                    className="p-2 text-gray-500 hover:text-orange-500"
                    title="Edit board"
                  >
                    <Pencil size={17} />
                  </button>

                  <button
                    onClick={() => handleDeleteBoard(board.id)}
                    className="p-2 text-gray-500 hover:text-red-500"
                    title="Delete board"
                  >
                    <Trash2 size={17} />
                  </button>

                </div>

              </div>

              <h2 className="text-lg font-bold mt-5">
                {board.title}
              </h2>

              <p className="text-sm text-gray-500 mt-2 min-h-10">
                {board.description || "No description available"}
              </p>

              <Link
                to={`/board/${board.id}`}
                className="inline-flex items-center gap-2 mt-5 text-orange-600 font-medium"
              >
                Open Board
                <ArrowRight size={17} />
              </Link>

            </div>

          ))}

        </div>
      )}

      {/* Board Modal */}
      {showModal && (
        <BoardModal
          onClose={closeModal}
          onSaveBoard={handleSaveBoard}
          editingBoard={editingBoard}
        />
      )}

    </div>
  );
}

export default BoardsPage;
