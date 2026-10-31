
import { useState } from "react";
import { X } from "lucide-react";

function BoardModal({ onClose, onSaveBoard, editingBoard }) {
  const [title, setTitle] = useState(editingBoard?.title || "");
  const [description, setDescription] = useState(
    editingBoard?.description || ""
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Please enter board name");
      return;
    }

    const boardData = {
      id: editingBoard ? editingBoard.id : Date.now(),
      title: title.trim(),
      description: description.trim(),

      // Keep existing tasks when editing a board
      tasks: editingBoard?.tasks || [],
    };

    onSaveBoard(boardData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md rounded-xl p-6"
      >
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold">
            {editingBoard ? "Edit Board" : "Create New Board"}
          </h2>

          <button type="button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <label className="block text-sm font-medium mb-2">
          Board Name
        </label>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Example: Website Development"
          className="w-full border rounded-lg p-3 mb-4 outline-orange-500"
        />

        <label className="block text-sm font-medium mb-2">
          Description
        </label>

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter board description..."
          rows="3"
          className="w-full border rounded-lg p-3 mb-5 outline-orange-500"
        />

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border rounded-lg"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            {editingBoard ? "Update Board" : "Create Board"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default BoardModal;
