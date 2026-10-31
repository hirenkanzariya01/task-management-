
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import BoardPage from "./pages/BoardPage";
import BoardsPage from "./pages/BoardsPage";

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

function App() {
  const [boards, setBoards] = useState(() => {
    const savedBoards = localStorage.getItem("boards");

    if (savedBoards) {
      return JSON.parse(savedBoards);
    }

    return [
      {
        id: 1,
        title: "Website Development",
        description: "Manage frontend and backend development tasks.",
        tasks: defaultTasks,
      },
    ];
  });

  useEffect(() => {
    localStorage.setItem("boards", JSON.stringify(boards));
    console.log("Boards saved successfully");
  }, [boards]);

  return (
    <BrowserRouter>
      <div className="min-h-screen flex bg-slate-50">
        <Sidebar />

        <main className="flex-1 p-5 md:p-8">

          <Routes>
            <Route
              path="/"
              element={<Dashboard boards={boards} />}
            />

            <Route
              path="/board/:boardId"
              element={
                <BoardPage
                  boards={boards}
                  setBoards={setBoards}
                />
              }
            />

            <Route
              path="/board"
              element={<Navigate to="/board/1" replace />}
            />

            <Route
              path="/boards"
              element={
                <BoardsPage
                  boards={boards}
                  setBoards={setBoards}
                />
              }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
