import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";

function KanbanColumn({
  column,
  tasks,
  onDelete,
  onEdit,
  onAddClick,
  users = [],
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`p-4 rounded-xl min-h-96 ${isOver ? "bg-orange-100" : "bg-gray-100"
        }`}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold">{column.title}</h2>
        <span className="text-sm text-gray-500">
          {tasks.length}
        </span>
      </div>

      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onDelete={onDelete}
          onEdit={onEdit}
          users={users}
        />
      ))}

      <button
        onClick={onAddClick}
        className="mt-3 text-blue-600"
      >
        + Add Task
      </button>
    </div>
  );
}

export default KanbanColumn;