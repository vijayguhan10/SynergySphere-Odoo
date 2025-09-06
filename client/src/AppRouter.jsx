import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <main className="container mx-auto p-6">
          <Routes>
            <Route
              path="/"
              element={
                <div className="text-center py-20">
                  <h1 className="text-4xl font-bold">SynergeSphere Frontend</h1>
                </div>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default AppRouter;
