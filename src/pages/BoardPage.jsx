
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Plus, Search } from "lucide-react";
import { DndContext } from "@dnd-kit/core";

import KanbanColumn from "../components/KanbanColumn";
import TaskModal from "../components/TaskModal";
import { getUsers } from "../services/userService";

function BoardPage({ boards, setBoards }) {
  const { boardId } = useParams();
  const navigate = useNavigate();

  console.log("BoardPage rendered");
  console.log("Current Board ID:", boardId);

  const currentBoard = boards.find(
    (board) => String(board.id) === boardId
  );

  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("todo");
  const [editingTask, setEditingTask] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedPriority, setSelectedPriority] = useState("all");
  // Get tasks from selected board
  const tasks = currentBoard?.tasks || [];

  console.log("Current Board:", currentBoard?.title);
  console.log("Total Tasks:", tasks.length);

  // Default Kanban columns
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

  // Update tasks for selected board
  const updateBoardTasks = (callback) => {
    console.log("Updating tasks for board:", boardId);

    setBoards((previousBoards) =>
      previousBoards.map((board) => {
        if (String(board.id) !== boardId) {
          return board;
        }

        const currentTasks = board.tasks || [];
        const updatedTasks = callback(currentTasks);

        console.log("Previous Tasks:", currentTasks);
        console.log("Updated Tasks:", updatedTasks);

        return {
          ...board,
          tasks: updatedTasks,
        };
      })
    );
  };

  // Load team members from DummyJSON
  useEffect(() => {
    const loadUsers = async () => {
      console.log("Fetching team members from DummyJSON...");

      try {
        const userData = await getUsers();

        setUsers(userData);

        console.log("Team members loaded successfully:", userData.length);
        console.table(userData);
      } catch (error) {
        console.error("Failed to load team members:", error);
      }
    };

    loadUsers();
  }, []);

  // Add task
  const addTask = (newTask) => {
    console.log("Adding new task:", newTask);

    updateBoardTasks((previousTasks) => [
      ...previousTasks,
      newTask,
    ]);

    console.log("Task added successfully!");
  };

  // Delete task
  const deleteTask = (id) => {
    console.log("Deleting task:", id);

    updateBoardTasks((previousTasks) =>
      previousTasks.filter((task) => task.id !== id)
    );

    console.log("Task deleted successfully:", id);
  };

  // Update task
  const updateTask = (updatedTask) => {
    console.log("Updating task:", updatedTask);

    updateBoardTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );

    console.log("Task updated successfully:", updatedTask.id);
  };

  // Open task modal
  const openTaskModal = (status = "todo") => {
    console.log("Opening task modal...");
    console.log("Selected column:", status);

    setSelectedStatus(status);
    setEditingTask(null);
    setShowModal(true);
  };

  // Open edit modal
  const openEditModal = (task) => {
    console.log("Opening edit modal for task:", task);

    setEditingTask(task);
    setSelectedStatus(task.status);
    setShowModal(true);
  };

  // Close modal
  const closeModal = () => {
    console.log("Closing task modal");

    setShowModal(false);
    setEditingTask(null);
  };

  // Drag and drop tasks
  const handleDragEnd = (event) => {
    const { active, over } = event;

    console.log("Drag ended:", event);

    if (!over) {
      console.log("Task was not dropped in a valid area");
      return;
    }

    const taskId = Number(
      String(active.id).replace("task-", "")
    );

    const newStatus = String(over.id);

    const columnExists = columns.some(
      (column) => column.id === newStatus
    );

    if (!columnExists) {
      console.warn("Invalid destination column:", newStatus);
      return;
    }

    console.log("Moving task:", taskId);
    console.log("New task status:", newStatus);

    updateBoardTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === taskId
          ? { ...task, status: newStatus }
          : task
      )
    );

    console.log("Task moved successfully!");
  };

  // Board not found
  if (!currentBoard) {
    console.error("Board not found:", boardId);

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

      <div className="flex flex-wrap gap-3 mb-7">
        {/* Search Tasks */}
        <div className="relative max-w-sm flex-1">
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

        {/* Priority Filter */}
        <select
          value={selectedPriority}
          onChange={(e) => {
            setSelectedPriority(e.target.value);
            console.log("Priority filter:", e.target.value);
          }}
          className="p-3 rounded-lg border bg-white outline-none"
        >
          <option value="all">All Priorities</option>
          <option value="High">High Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="Low">Low Priority</option>
        </select>
      </div>
      <DndContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {columns.map((column) => {
            const columnTasks = tasks.filter((task) => {
              const matchesStatus = task.status === column.id;

              const matchesSearch = task.title
                .toLowerCase()
                .includes(search.toLowerCase());

              const matchesPriority =
                selectedPriority === "all" ||
                task.priority === selectedPriority;

              return (
                matchesStatus &&
                matchesSearch &&
                matchesPriority
              );
            });

            console.log(
              `${column.title} tasks:`,
              columnTasks.length
            );

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
