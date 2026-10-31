import { Pencil, Trash2, GripVertical } from "lucide-react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

function TaskCard({ task, onDelete, onEdit, users = [] }) {
  const assignedUser = users.find(
    (user) => user.id === Number(task.assignedTo)
  );

  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    isDragging,
  } = useDraggable({
    id: `task-${task.id}`,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white p-4 rounded-xl shadow-sm border mb-3"
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <button
            ref={setActivatorNodeRef}
            {...listeners}
            {...attributes}
            className="cursor-grab text-gray-400"
            title="Drag task"
          >
            <GripVertical size={18} />
          </button>

          <h3 className="font-semibold">{task.title}</h3>
        </div>

        <div className="flex gap-2">
          <button onClick={() => onEdit(task)}>
            <Pencil size={16} />
          </button>

          <button onClick={() => onDelete(task.id)}>
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <p className="text-sm text-gray-500 mt-2">
        {task.description}
      </p>

      {assignedUser && (
        <div className="flex items-center gap-2 mt-3">
          <img
            src={assignedUser.image}
            alt={assignedUser.firstName}
            className="w-7 h-7 rounded-full"
          />

          <span className="text-sm text-gray-600">
            {assignedUser.firstName} {assignedUser.lastName}
          </span>
        </div>
      )}

      <p className="text-xs mt-3">
        Priority: {task.priority}
      </p>

      <p className="text-xs text-gray-400">
        Due: {task.dueDate || "No due date"}
      </p>
    </div>
  );
}

export default TaskCard;