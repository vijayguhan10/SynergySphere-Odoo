import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MainLayout from "./components/MainLayout";
import Home from "./pages/Home";
import ProjectsDashboard from "./pages/ProjectsDashboard";
import Tasks from "./components/Tasks/Tasks"; // Import your Tasks component

const AppRouter = () => {
  return (
    <BrowserRouter>
      <div className=" bg-gray-100">
        <main className="">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<ProjectsDashboard />} />
              <Route path="/tasks" element={<Tasks />} /> {/* Add this line */}
            </Route>
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default AppRouter;
