import { LayoutDashboard, Settings, FolderOpen, LogOut } from "lucide-react";
import { FaRobot } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { name: "Settings", icon: Settings, path: "/settings" },
  { name: "Files/Documents", icon: FolderOpen, path: "/asset-management" },
  { name: "Ai Visualizer", icon: FaRobot, path: "/ai-visualizer" },
];


const SideBar = ({ isOpen = false, setIsOpen = () => {} }) => {
  const navigate = useNavigate();

  const close = () => setIsOpen(false);

  return (
    <>
      {/* backdrop for mobile */}
      {isOpen && (
        <div
          onClick={close}
          aria-hidden="true"
          className="fixed inset-0 bg-black/40 z-30 sm:hidden"
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen bg-white shadow-xl border-r transform transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`}
        aria-hidden={!isOpen}
      >
        {/* mobile close button */}
        {isOpen && (
          <button
            onClick={close}
            aria-label="Close menu"
            className="sm:hidden absolute top-3 right-3 z-50 p-2 rounded-md bg-white/90 hover:bg-gray-100 border"
          >
            <svg
              className="h-5 w-5 text-gray-700"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}

        <div className="flex flex-col h-full px-4 py-6">
          <div className="mb-6">
            <span className="font-bold text-xl text-blue-700">
              SynergeSphere
            </span>
          </div>

          <nav className="flex-1 space-y-1">
            {menuItems.map(({ name, icon: Icon, path }) => (
              <button
                key={name}
                onClick={() => {
                  navigate(path);
                  close();
                }}
                className="w-full text-left flex items-center gap-3 p-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                <Icon size={18} className="text-gray-500" />
                {name}
              </button>
            ))}
          </nav>

          <div className="mt-auto">
            <button
              onClick={() => navigate("/")}
              className="w-full text-left flex items-center gap-3 p-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default SideBar;
