import { MoreHorizontal, Plus } from "lucide-react";
import TaskCard from "./TaskCard";

function KanbanColumn({ column, tasks, onDelete, onAddClick }) {

  return (
    <div className="bg-gray-100 rounded-xl p-4 min-h-96">

      <div className="flex justify-between items-center mb-5">

        <div className="flex items-center gap-2">

          <div className={`w-2 h-2 rounded-full ${column.color}`} />

          <h3 className="font-semibold">
            {column.title}
          </h3>

          <span className="text-xs bg-white px-2 py-1 rounded">
            {tasks.length}
          </span>

        </div>

        <MoreHorizontal size={20} />

      </div>

      <div className="space-y-3">

        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={onDelete}
          />
        ))}

      </div>

      <button
        onClick={() => onAddClick(column.id)}
        className="flex items-center gap-2 text-gray-500 text-sm mt-4 hover:text-orange-500"
      >
        <Plus size={17} />
        Add a task
      </button>

    </div>
  );
}

export default KanbanColumn;