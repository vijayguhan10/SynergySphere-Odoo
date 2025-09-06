import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

const MainLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="text-xl bg-gray-100">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="md:pl-64 flex flex-col min-h-screen pt-14 md:pt-14">
        <Header isOpen={isOpen} setIsOpen={setIsOpen} />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
