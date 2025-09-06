import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MainLayout from "./components/MainLayout";
import Home from "./pages/Home";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <main className="container mx-auto p-6">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* All other routes use the main layout */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              {/* add other app routes here, they will render inside MainLayout */}
            </Route>
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default AppRouter;
