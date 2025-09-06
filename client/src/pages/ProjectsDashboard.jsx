import { Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProjectDetailsModal from "../components/ProjectDetailsModal";
import { projects as sampleProjects } from "../data/sampleData";

const ProjectsDashboard = () => {
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get("create") === "true") {
      setSelected(null);
      setOpen(true);
    }
  }, [searchParams]);

  const openProject = (p) => {
    setSelected(p);
    setOpen(true);
  };

  const close = () => {
    setOpen(false);
    // clear query param when closing create
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
          <button className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700">
            <Plus size={16} />
            New Project
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleProjects.map((p) => (
          <article
            key={p.id}
            className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition cursor-pointer"
            onClick={() => openProject(p)}
          >
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-semibold text-gray-800">{p.name}</h3>
              <div className="text-sm text-gray-500">ID #{p.id}</div>
            </div>

            <div className="mt-3">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-50 text-blue-600 px-2 py-1 rounded-md text-xs font-medium">
                    {p.stats.total} tasks
                  </div>
                  <div className="bg-green-50 text-green-700 px-2 py-1 rounded-md text-xs font-medium">
                    {p.stats.completed} done
                  </div>
                  <div className="bg-red-50 text-red-600 px-2 py-1 rounded-md text-xs">
                    {p.stats.total - p.stats.completed} open
                  </div>
                  <div className="bg-gray-50 text-gray-700 px-2 py-1 rounded-md text-xs">
                    {p.stats.members} members
                  </div>
                </div>
              </div>

              {/* progress bar */}
              <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-2 bg-gradient-to-r from-green-400 to-blue-500"
                  style={{
                    width: `${Math.round(
                      (p.stats.completed / Math.max(1, p.stats.total)) * 100
                    )}%`,
                  }}
                />
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex -space-x-2">
                <img
                  src={`https://i.pravatar.cc/40?img=${p.id + 10}`}
                  alt="member"
                  className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                />
                <img
                  src={`https://i.pravatar.cc/40?img=${p.id + 20}`}
                  alt="member"
                  className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                />
              </div>

              <button className="text-sm text-blue-600 hover:underline">
                Open
              </button>
            </div>
            <div className="mt-2 text-xs text-gray-400">Updated 2d ago</div>
          </article>
        ))}
      </div>

      <ProjectDetailsModal open={open} project={selected} onClose={close} />

      {/* Floating action button for mobile */}
      <button className="fixed bottom-6 right-6 sm:hidden bg-blue-600 text-white p-4 rounded-full shadow-lg">
        <Plus size={20} />
      </button>

      {/* Prominent new project button for small screens below the grid */}
      <div className="sm:hidden mt-6">
        <button className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-3 rounded-lg shadow hover:bg-blue-700">
          <Plus size={16} /> Create Project
        </button>
      </div>
    </div>
  );
};

export default ProjectsDashboard;
