import { Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProjectDetailsModal from "../components/dashboard/ProjectDetailsModal";
import ProjectCreateModal from "../components/dashboard/ProjectCreateModal";
import axios from "axios";
import { toast } from "react-toastify";

const ProjectsDashboard = () => {
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  // Fetch all projects on mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/projects/getall`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
            },
          }
        );
        setProjects(res.data);
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to fetch projects.");
      }
    };
    fetchProjects();
  }, []);

  // Open modal if ?create=true
  useEffect(() => {
    if (searchParams.get("create") === "true") {
      setSelected(null);
      setOpen(true);
    }
  }, [searchParams]);

  // Fetch individual project details
  const openProject = async (p) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/projects/${p.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
          },
        }
      );
      setSelected(res.data);
      setOpen(true);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to fetch project details."
      );
    }
  };

  const openCreate = () => setCreateOpen(true);

  const handleCreateSave = (project) => {
    setProjects((prev) => [project, ...prev]);
    setCreateOpen(false);
  };

  const close = () => {
    setOpen(false);
    if (searchParams.get("create") === "true") setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Projects
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            All projects you are a member of
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <button
            onClick={openCreate}
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
          >
            <Plus size={16} />
            New Project
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p) => {
          // Calculate stats from backend data
          const stats = {
            total: Array.isArray(p.tasks) ? p.tasks.length : 0,
            completed: Array.isArray(p.tasks)
              ? p.tasks.filter((t) => t.status === "COMPLETED").length
              : 0,
            members: Array.isArray(p.members) ? p.members.length : 0,
          };
          return (
            <article
              key={p.id}
              className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition cursor-pointer"
              onClick={() => openProject(p)}
            >
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-semibold text-gray-800">
                  {p.name}
                </h3>
                <div className="text-sm text-gray-500">ID #{p.id}</div>
              </div>

              <div className="mt-3">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-50 text-blue-600 px-2 py-1 rounded-md text-xs font-medium">
                      {stats.total} tasks
                    </div>
                    <div className="bg-green-50 text-green-700 px-2 py-1 rounded-md text-xs font-medium">
                      {stats.completed} done
                    </div>
                    <div className="bg-red-50 text-red-600 px-2 py-1 rounded-md text-xs">
                      {stats.total - stats.completed} open
                    </div>
                    <div className="bg-gray-50 text-gray-700 px-2 py-1 rounded-md text-xs">
                      {stats.members} members
                    </div>
                  </div>
                </div>

                {/* progress bar */}
                <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-2 bg-gradient-to-r from-green-400 to-blue-500"
                    style={{
                      width: `${Math.round(
                        (stats.completed / Math.max(1, stats.total)) * 100
                      )}%`,
                    }}
                  />
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex -space-x-2">
                  {Array.isArray(p.members) &&
                    p.members
                      .slice(0, 2)
                      .map((m, idx) => (
                        <img
                          key={m.user?.id || idx}
                          src={`https://i.pravatar.cc/40?img=${
                            (m.user?.id || idx) + 10
                          }`}
                          alt={m.user?.name || "member"}
                          className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                        />
                      ))}
                </div>

                <button className="text-sm text-blue-600 hover:underline">
                  Open
                </button>
              </div>
              <div className="mt-2 text-xs text-gray-400">
                Updated {p.updatedAt ? p.updatedAt : "recently"}
              </div>
            </article>
          );
        })}
      </div>

      <ProjectDetailsModal open={open} project={selected} onClose={close} />
      <ProjectCreateModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onSave={handleCreateSave}
      />

      {/* Floating action button for mobile */}
      <button
        onClick={openCreate}
        className="fixed bottom-6 right-6 sm:hidden bg-blue-600 text-white p-4 rounded-full shadow-lg"
      >
        <Plus size={20} />
      </button>
    </div>
  );
};

export default ProjectsDashboard;
