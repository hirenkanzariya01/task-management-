import { Calendar, MoreHorizontal, User, Trash2 } from "lucide-react";

function TaskCard({ task, onDelete }) {

  const priorityColor = {
    High: "bg-red-100 text-red-600",
    Medium: "bg-yellow-100 text-yellow-600",
    Low: "bg-green-100 text-green-600"
  };

  return (
    <div className="bg-white p-4 rounded-xl border shadow-sm">

      <div className="flex justify-between items-center">

        <span className={`text-xs px-2 py-1 rounded ${priorityColor[task.priority]}`}>
          {task.priority}
        </span>

        <button
          onClick={() => onDelete(task.id)}
          className="text-gray-400 hover:text-red-500"
          title="Delete task"
        >
          <Trash2 size={16} />
        </button>

      </div>

      <h3 className="font-semibold text-gray-800 mt-4">
        {task.title}
      </h3>

      <p className="text-sm text-gray-400 mt-2">
        {task.description}
      </p>

      <div className="flex justify-between items-center mt-5 text-gray-400">

        <div className="flex items-center gap-2 text-xs">
          <Calendar size={15} />
          {task.dueDate || "No due date"}
        </div>

        <User size={17} />

      </div>

    </div>
  );
}

export default TaskCard;