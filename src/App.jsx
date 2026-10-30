import { useState, useEffect } from "react";
import { Plus, Search } from "lucide-react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import KanbanColumn from "./components/KanbanColumn";
import TaskModal from "./components/TaskModal";
import { getUsers } from "./services/userService";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("todo");
  const [editingTask, setEditingTask] = useState(null);
  const [users, setUsers] = useState([]);

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
      return JSON.parse(savedTasks);
    }

    return [
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
  });
  const columns = [
    {
      id: "todo",
      title: "To Do",
      color: "bg-orange-500"
    },
    {
      id: "inprogress",
      title: "In Progress",
      color: "bg-blue-500"
    },
    {
      id: "done",
      title: "Done",
      color: "bg-green-500"
    }
  ];

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    console.log("Tasks saved successfully!");
  }, [tasks]);

  // Add new task
  const addTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
    console.log("Task added successfully");
  };

  // Delete task
  const deleteTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== id)
    );

    console.log("Task deleted:", id);
  };

  // Open task modal
  const openTaskModal = (status = "todo") => {
    setSelectedStatus(status);
    setShowModal(true);
  };

  const updateTask = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingTask(null);
  };


  useEffect(() => {
    const loadUsers = async () => {
      const userData = await getUsers();
      setUsers(userData);
    };

    loadUsers();
  }, []);

  return (
    <div className="min-h-screen flex bg-slate-50">

      <Sidebar />

      <main className="flex-1 p-5 md:p-8">

        <Navbar />

        {/* Board Header */}

        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">

          <div>
            <h2 className="text-xl font-bold">
              Website Development
            </h2>

            <p className="text-sm text-gray-400 mt-1">
              Manage your project tasks
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          {columns.map((column) => {

            const columnTasks = tasks.filter((task) => {
              return (
                task.status === column.id &&
                task.title.toLowerCase().includes(search.toLowerCase())
              );
            });

            return (
              <KanbanColumn
                key={column.id}
                column={column}
                tasks={columnTasks}
                onDelete={deleteTask}
                onAddClick={openTaskModal}
                onEdit={openEditModal}
              />
            );
          })}

        </div>

      </main>

      {/* Add Task Modal */}

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

export default App;