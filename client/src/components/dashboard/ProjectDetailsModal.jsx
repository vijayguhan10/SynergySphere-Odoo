import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import ModalHeader from "./ModalHeader";
import ProjectOverview from "./ProjectOverview";
import ProjectTasks from "./ProjectTasks";
import TaskModal from "./TaskModal";
import TaskDetailModal from "./TaskDetailModal";

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
    onClose();
  };

  const [tab, setTab] = useState("overview");
  const [tasks, setTasks] = useState(project?.tasks ?? []);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const [taskModalOpen, setTaskModalOpen] = useState(false);

  const handleAddClick = () => setTaskModalOpen(true);

  const handleSaveTask = (task) => {
    // prepend the new task so it appears at the top
    setTasks((prev) => [task, ...prev]);
    setTaskModalOpen(false);
  };

  const [taskDetailOpen, setTaskDetailOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleOpenTaskDetail = (task) => {
    setSelectedTask(task);
    setTaskDetailOpen(true);
  };

  const handleSaveTaskDetail = (updated) => {
    setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    setTaskDetailOpen(false);
  };

  const toggleTask = (id) =>
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );

  useEffect(() => {
    setTasks(project?.tasks ?? []);
    setSearch("");
    setFilter("all");
  }, [project?.id]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-blue-900/20 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      <div className="relative z-50 bg-white rounded-xl shadow-xl w-full max-w-2xl mx-4 md:mx-0 max-h-[90vh] overflow-hidden flex flex-col">
        <ModalHeader
          title={isCreate ? "Create Project" : project?.name}
          onClose={onClose}
        />

        <style>{`.psm-scroll::-webkit-scrollbar{width:10px}.psm-scroll::-webkit-scrollbar-thumb{background:rgba(100,116,139,0.6);border-radius:9999px}.psm-scroll::-webkit-scrollbar-track{background:rgba(15,23,42,0.03);border-radius:9999px}`}</style>
        <div
          className="p-6 overflow-y-scroll psm-scroll"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(100,116,139,0.6) rgba(241,245,249,1)",
          }}
        >
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
                <ProjectOverview
                  project={project}
                  total={total}
                  completed={completed}
                  openTasks={openTasks}
                  percent={percent}
                />
              ) : (
                <>
                  <ProjectTasks
                    tasks={tasks}
                    search={search}
                    setSearch={setSearch}
                    filter={filter}
                    setFilter={setFilter}
                    toggleTask={toggleTask}
                    onAddClick={handleAddClick}
                    onOpenTask={handleOpenTaskDetail}
                  />
                  <TaskModal
                    open={taskModalOpen}
                    onClose={() => setTaskModalOpen(false)}
                    onSave={handleSaveTask}
                    project={project}
                  />
                  <TaskDetailModal
                    open={taskDetailOpen}
                    onClose={() => setTaskDetailOpen(false)}
                    task={selectedTask}
                    onSave={handleSaveTaskDetail}
                  />
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsModal;
