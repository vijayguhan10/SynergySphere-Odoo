import { useState } from "react";
import { X, Plus } from "lucide-react";

const ProjectDetailsModal = ({
  open,
  project,
  mode = "view",
  onClose = () => {},
}) => {
  const [form, setForm] = useState({
    name: project?.name || "",
    description: project?.description || "",
  });

  if (!open) return null;

  const isCreate = mode === "create";
  const total = project?.stats?.total ?? 0;
  const completed = project?.stats?.completed ?? 0;
  const openTasks = Math.max(0, total - completed);
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  const submit = (e) => {
    e.preventDefault();
    // placeholder: send API request to create/update project
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* bluish translucent backdrop with blur */}
      <div
        className="absolute inset-0 bg-blue-900/20 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      <div className="relative z-50 bg-white rounded-xl shadow-xl w-full max-w-2xl mx-4 md:mx-0">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h3 className="text-lg font-semibold">
            {isCreate ? "Create Project" : project?.name}
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded text-gray-600 hover:bg-gray-100"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6">
          {isCreate ? (
            <form onSubmit={submit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600">
                  Project name
                </label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="mt-1 w-full border rounded px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600">
                  Description
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  className="mt-1 w-full border rounded px-3 py-2"
                  rows={4}
                />
              </div>

              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-blue-600 text-white inline-flex items-center gap-2"
                >
                  <Plus size={14} /> Create
                </button>
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm text-gray-500">Summary</h4>
                <div className="mt-3 flex flex-wrap gap-4 items-center">
                  <div className="p-3 bg-gray-50 rounded-lg min-w-[90px]">
                    <div className="text-xs text-gray-500">Total</div>
                    <div className="text-lg font-semibold text-gray-800">
                      {total}
                    </div>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-lg min-w-[90px]">
                    <div className="text-xs text-gray-500">Completed</div>
                    <div className="text-lg font-semibold text-green-700">
                      {completed}
                    </div>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-lg min-w-[90px]">
                    <div className="text-xs text-gray-500">Open</div>
                    <div className="text-lg font-semibold text-red-600">
                      {openTasks}
                    </div>
                  </div>

                  <div className="flex-1 min-w-[140px]">
                    <div className="text-xs text-gray-500">Progress</div>
                    <div className="mt-2 w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                      <div
                        className="h-3 bg-gradient-to-r from-green-400 to-blue-500"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {percent}% complete
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h5 className="text-sm text-gray-500">Description</h5>
                  <p className="mt-2 text-sm text-gray-700">
                    {project?.description ?? "No description provided."}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-sm text-gray-500">Members</h4>
                <div className="mt-3 flex items-center -space-x-2">
                  <img
                    src={`https://i.pravatar.cc/40?img=${
                      (project?.id ?? 1) + 10
                    }`}
                    alt="m"
                    className="w-8 h-8 rounded-full border-2 border-white"
                  />
                  <img
                    src={`https://i.pravatar.cc/40?img=${
                      (project?.id ?? 1) + 20
                    }`}
                    alt="m"
                    className="w-8 h-8 rounded-full border-2 border-white"
                  />
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <div className="text-sm text-gray-500">Last updated</div>
                  <div className="text-sm font-medium text-gray-700">
                    2 days ago
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <button className="px-3 py-2 rounded bg-gray-100">
                    Edit
                  </button>
                  <button className="px-3 py-2 rounded bg-red-50 text-red-600">
                    Archive
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsModal;
