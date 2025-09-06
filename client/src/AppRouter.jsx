import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./pages/Login";
import MainLayout from "./components/MainLayout";
import Home from "./pages/Home";
import ProjectsDashboard from "./pages/ProjectsDashboard";
import Tasks from "./components/Tasks/Tasks"; // Import your Tasks component
import Message from "./components/Message/Message";
import Notification from "./components/Notification/Notification";
import User from "./components/Users/User";
import Project from "./components/Projects/Project";
const AppRouter = () => {
  return (
    <BrowserRouter>
      <div className=" bg-gray-100">
        <main className="">
          <Routes>
            <Route path="/login" element={<Auth />} />

            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<ProjectsDashboard />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/messages" element={<Message />} />
              <Route path="/notifications" element={<Notification />} />
              <Route path="/projects" element={<Project />} />
              <Route path="/users" element={<User />} />
               {/* Add this line */}
            </Route>
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default AppRouter;
