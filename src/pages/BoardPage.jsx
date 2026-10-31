
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Plus, Search } from "lucide-react";
import { DndContext, closestCorners } from "@dnd-kit/core";

import KanbanColumn from "../components/KanbanColumn";
import TaskModal from "../components/TaskModal";
import { getUsers } from "../services/userService";

const defaultTasks = [
  {
    id: 1,
    title: "Design landing page",
    description: "Create a clean landing page",
    priority: "High",
    status: "todo",
    dueDate: "2026-11-02",
  },
  {
    id: 2,
    title: "API Integration",
    description: "Connect backend API",
    priority: "Medium",
    status: "inprogress",
    dueDate: "2026-11-05",
  },
  {
    id: 3,
    title: "Complete dashboard",
    description: "Finish dashboard UI",
    priority: "Low",
    status: "done",
    dueDate: "",
  },
];

function BoardPage({ boards, setBoards }) {
  const { boardId } = useParams();
  const navigate = useNavigate();

  const currentBoard = boards.find(
    (board) => String(board.id) === boardId
  );

  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("todo");
  const [editingTask, setEditingTask] = useState(null);
  const [users, setUsers] = useState([]);

  // Keep tasks separate for each board
  const tasks =
    currentBoard?.tasks ??
    (boardId === "1" ? defaultTasks : []);

  const columns = [
    {
      id: "todo",
      title: "To Do",
      color: "bg-orange-500",
    },
    {
      id: "inprogress",
      title: "In Progress",
      color: "bg-blue-500",
    },
    {
      id: "done",
      title: "Done",
      color: "bg-green-500",
    },
  ];

  // Update tasks only for the currently selected board
  const updateBoardTasks = (callback) => {
    setBoards((previousBoards) =>
      previousBoards.map((board) => {
        if (String(board.id) !== boardId) {
          return board;
        }

        const currentTasks =
          board.tasks ??
          (boardId === "1" ? defaultTasks : []);

        return {
          ...board,
          tasks: callback(currentTasks),
        };
      })
    );
  };

  // Load team members from DummyJSON
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const userData = await getUsers();
        setUsers(userData);
        console.log("Team members loaded:", userData.length);
      } catch (error) {
        console.error("Failed to load team members:", error);
      }
    };

    loadUsers();
  }, []);

  // Add task
  const addTask = (newTask) => {
    updateBoardTasks((previousTasks) => [
      ...previousTasks,
      newTask,
    ]);

    console.log("Task added to board:", currentBoard.title);
  };

  // Delete task
  const deleteTask = (id) => {
    updateBoardTasks((previousTasks) =>
      previousTasks.filter((task) => task.id !== id)
    );

    console.log("Task deleted:", id);
  };

  // Update task
  const updateTask = (updatedTask) => {
    updateBoardTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );

    console.log("Task updated:", updatedTask.id);
  };

  // Open task modal
  const openTaskModal = (status = "todo") => {
    setSelectedStatus(status);
    setEditingTask(null);
    setShowModal(true);
  };

  // Edit task
  const openEditModal = (task) => {
    setEditingTask(task);
    setSelectedStatus(task.status);
    setShowModal(true);
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setEditingTask(null);
  };

  // Drag and drop tasks
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    const taskId = Number(
      String(active.id).replace("task-", "")
    );

    const newStatus = String(over.id);

    const columnExists = columns.some(
      (column) => column.id === newStatus
    );

    if (!columnExists) return;

    updateBoardTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === taskId
          ? { ...task, status: newStatus }
          : task
      )
    );

    console.log("Task moved:", taskId, newStatus);
  };

  // Handle invalid board URL
  if (!currentBoard) {
    return (
      <div className="text-center py-16">
        <h2 className="text-xl font-bold mb-3">
          Board not found
        </h2>

        <button
          onClick={() => navigate("/boards")}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg"
        >
          Back to My Boards
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Board Header */}
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <div>
          <h2 className="text-xl font-bold">
            {currentBoard.title}
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            {currentBoard.description}
          </p>
        </div>

        <button
          onClick={() => openTaskModal()}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg flex gap-2 items-center"
        >
          <Plus size={18} />
          Add Task
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-7 max-w-sm">
        <Search
          className="absolute left-3 top-3 text-gray-400"
          size={18}
        />

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search tasks..."
          className="w-full pl-10 p-3 rounded-lg border bg-white outline-none"
        />
      </div>

      {/* Kanban Board */}
      <DndContext
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {columns.map((column) => {
            const columnTasks = tasks.filter((task) => {
              return (
                task.status === column.id &&
                task.title
                  .toLowerCase()
                  .includes(search.toLowerCase())
              );
            });

            return (
              <KanbanColumn
                key={column.id}
                column={column}
                tasks={columnTasks}
                onDelete={deleteTask}
                onEdit={openEditModal}
                onAddClick={() => openTaskModal(column.id)}
                users={users}
              />
            );
          })}
        </div>
      </DndContext>

      {/* Task Modal */}
      {showModal && (
        <TaskModal
          onClose={closeModal}
          onAddTask={addTask}
          onUpdateTask={updateTask}
          defaultStatus={selectedStatus}
          editingTask={editingTask}
          users={users}
        />
      )}
    </div>
  );
}

export default BoardPage;
