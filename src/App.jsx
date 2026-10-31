import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import BoardPage from "./pages/BoardPage";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex bg-slate-50">
        <Sidebar />

        <main className="flex-1 p-5 md:p-8">
          <Navbar />

          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/board" element={<BoardPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;