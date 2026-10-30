import { useState } from "react";
import { X } from "lucide-react";

function TaskModal({ onClose, onAddTask, defaultStatus }) {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Please enter task title");
      return;
    }

    const newTask = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      priority,
      status: defaultStatus,
      dueDate
    };

    onAddTask(newTask);

    console.log("New task added:", newTask);

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">

      <div className="bg-white w-full max-w-md rounded-xl p-6">

        <div className="flex justify-between items-center mb-5">

          <h2 className="text-xl font-bold">
            Add New Task
          </h2>

          <button onClick={onClose}>
            <X />
          </button>

        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block text-sm mb-1">Task Title</label>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
              className="w-full border rounded-lg p-3 outline-none focus:border-orange-400"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Description</label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
              className="w-full border rounded-lg p-3 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Priority</label>

            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full border rounded-lg p-3"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1">Due Date</label>

            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div className="flex gap-3 pt-2">

            <button
              type="button"
              onClick={onClose}
              className="flex-1 border rounded-lg py-3"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex-1 bg-orange-500 text-white rounded-lg py-3"
            >
              Add Task
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default TaskModal;