import { Plus } from "lucide-react";

const ProjectTasks = ({
  tasks,
  search,
  setSearch,
  filter,
  setFilter,
  toggleTask,
  onAddClick,
}) => {
  return (
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
            onClick={onAddClick}
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
                    {t.assignee?.name ?? "Unassigned"} • {t.dueDate ?? "No due"}
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
  );
};

export default ProjectTasks;
