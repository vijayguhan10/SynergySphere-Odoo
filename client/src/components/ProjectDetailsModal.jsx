import { useState, useEffect } from "react";
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

  const [tab, setTab] = useState("overview");
  // local task state so users can interact with tasks in the modal (client-side only)
  const [tasks, setTasks] = useState(project?.tasks ?? []);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all"); // all | open | done

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  // keep local tasks in sync when the project prop changes (e.g., opening a different project)
  useEffect(() => {
    setTasks(project?.tasks ?? []);
    setSearch("");
    setFilter("all");
  }, [project?.id]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* bluish translucent backdrop with blur */}
      <div
        className="absolute inset-0 bg-blue-900/20 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      <div className="relative z-50 bg-white rounded-xl shadow-xl w-full max-w-2xl mx-4 md:mx-0 max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex-shrink-0 flex items-center justify-between px-6 py-4 border-b">
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

        {/* scoped scrollbar styles for visible scrollbar */}
        <style>{`.psm-scroll::-webkit-scrollbar{width:10px}.psm-scroll::-webkit-scrollbar-thumb{background:rgba(100,116,139,0.6);border-radius:9999px}.psm-scroll::-webkit-scrollbar-track{background:rgba(15,23,42,0.03);border-radius:9999px}`}</style>
        <div
          className="p-6 overflow-y-scroll psm-scroll"
          style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(100,116,139,0.6) rgba(241,245,249,1)" }}
        >
          {/* simple tabs */}
          <div className="mb-4 flex items-center gap-3">
            <button
              onClick={() => setTab("overview")}
              className={`px-3 py-2 rounded-md text-sm ${
                tab === "overview"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setTab("tasks")}
              className={`px-3 py-2 rounded-md text-sm ${
                tab === "tasks"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              Tasks
            </button>
          </div>
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
            <div>
              {tab === "overview" ? (
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
              ) : (
                <div>
                  <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex-1">
                      <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search tasks"
                        className="w-full px-3 py-2 border rounded"
                      />
                    </div>

                    <div className="flex items-center gap-2 flex-nowrap overflow-x-auto">
                      <button
                        onClick={() => setFilter("all")}
                        className={`px-3 py-2 rounded-md text-sm whitespace-nowrap flex-shrink-0 ${
                          filter === "all"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        All
                      </button>
                      <button
                        onClick={() => setFilter("open")}
                        className={`px-3 py-2 rounded-md text-sm whitespace-nowrap flex-shrink-0 ${
                          filter === "open"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        Open
                      </button>
                      <button
                        onClick={() => setFilter("done")}
                        className={`px-3 py-2 rounded-md text-sm whitespace-nowrap flex-shrink-0 ${
                          filter === "done"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        Done
                      </button>
                      <button
                        onClick={() => {}}
                        className="inline-flex items-center gap-2 bg-green-600 text-white px-3 py-1 rounded-md flex-shrink-0 whitespace-nowrap"
                      >
                        <Plus size={14} /> Add Task
                      </button>
                    </div>
                  </div>
                  

                  <div className="space-y-3">
                    {tasks
                      .filter((t) => {
                        if (filter === "open") return !t.completed;
                        if (filter === "done") return t.completed;
                        return true;
                      })
                      .filter((t) => {
                        if (!search.trim()) return true;
                        const s = search.toLowerCase();
                        return (
                          t.title.toLowerCase().includes(s) ||
                          (t.assignee?.name || "").toLowerCase().includes(s)
                        );
                      })
                      .map((t) => (
                        <div
                          key={t.id}
                          onClick={() => toggleTask(t.id)}
                          className={`cursor-pointer bg-white border rounded-lg p-3 flex items-center justify-between hover:shadow-sm transition ${
                            t.completed ? "opacity-70" : ""
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium text-gray-700">
                              {t.assignee?.initials ??
                                t.assignee?.name?.slice(0, 2).toUpperCase()}
                            </div>
                            <div>
                              <div
                                className={`font-medium ${
                                  t.completed
                                    ? "line-through text-gray-500"
                                    : "text-gray-800"
                                }`}
                              >
                                {t.title}
                              </div>
                              <div className="text-xs text-gray-500">
                                {t.assignee?.name ?? "Unassigned"} •{" "}
                                {t.dueDate ?? "No due"}
                              </div>
                            </div>
                          </div>
                          <div
                            className={`text-sm ${
                              t.completed ? "text-green-600" : "text-gray-500"
                            }`}
                          >
                            {t.completed ? "Done" : "Open"}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsModal;
