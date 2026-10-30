import { MoreHorizontal, Plus } from "lucide-react";
import TaskCard from "./TaskCard";
function KanbanColumn({ column, tasks, onDelete, onEdit, onAddClick }) {
  return (
    <div className="bg-gray-100 p-4 rounded-xl">
      <h2 className="font-bold mb-4">{column.title}</h2>

      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}

      <button onClick={onAddClick} className="mt-3 text-blue-600">
        + Add Task
      </button>
    </div>
  );
}

export default KanbanColumn;