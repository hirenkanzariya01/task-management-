import { useState } from "react";

function TaskModal({ onClose, onAddTask, onUpdateTask, defaultStatus, editingTask }) {
  const [title, setTitle] = useState(editingTask?.title || "");
  const [description, setDescription] = useState(editingTask?.description || "");
  const [priority, setPriority] = useState(editingTask?.priority || "Medium");
  const [dueDate, setDueDate] = useState(editingTask?.dueDate || "");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Please enter task title");
      return;
    }

    const taskData = {
      id: editingTask ? editingTask.id : Date.now(),
      title,
      description,
      priority,
      dueDate,
      status: editingTask ? editingTask.status : defaultStatus,
    };

    if (editingTask) {
      onUpdateTask(taskData);
      console.log("Task updated:", taskData);
    } else {
      onAddTask(taskData);
      console.log("Task added:", taskData);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl w-full max-w-md space-y-4">
        <h2 className="text-xl font-bold">
          {editingTask ? "Edit Task" : "Add New Task"}
        </h2>

        <input
          className="w-full border p-2 rounded"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="w-full border p-2 rounded"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select
          className="w-full border p-2 rounded"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <input
          type="date"
          className="w-full border p-2 rounded"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="border px-4 py-2 rounded">
            Cancel
          </button>

          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            {editingTask ? "Update Task" : "Add Task"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskModal;