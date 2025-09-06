import { useState, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import { X, User, Calendar, FileText } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

const TaskModal = ({ open, onClose, onSave, project }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assigneeInput, setAssigneeInput] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [users, setUsers] = useState([]);

  // Fetch users for assignee dropdown
  useEffect(() => {
    if (open) {
      axios
        .get(`${import.meta.env.VITE_BASE_URL}/users`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
          },
        })
        .then((res) => setUsers(res.data.data || []))
        .catch(() => setUsers([]));
    }
  }, [open]);

  // derive members from project if available, otherwise generate placeholders
  const members = useMemo(() => {
    if (users.length) return users;
    if (project && Array.isArray(project.members) && project.members.length)
      return project.members.map((m) => m.user || m);
    const count = project?.stats?.members ?? 3;
    return Array.from({ length: count }, (_, i) => ({
      name: `Member ${i + 1}`,
      id: i + 1,
    }));
  }, [users, project]);

  if (!open) return null;

  const handleSave = async (e) => {
    e.preventDefault();
    if (!title.trim()) return toast.error("Title is required!");
    const assignee =
      members.find(
        (m) =>
          m.name === assigneeInput ||
          m.email === assigneeInput ||
          String(m.id) === assigneeInput
      ) || {};
    const assigneeId = assignee.id || "";
    if (!assigneeId) return toast.error("Please select a valid assignee!");

    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/tasks/create`,
        {
          title: title.trim(),
          description: description.trim(),
          status: "TODO",
          dueDate: dueDate ? new Date(dueDate).toISOString() : null,
          projectId: project?.id,
          assigneeId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
          },
        }
      );
      toast.success("Task created successfully!");
      onSave && onSave();
      setTitle("");
      setDescription("");
      setAssigneeInput("");
      setDueDate("");
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create task.");
    }
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center px-4">
      <div
        role="button"
        tabIndex={0}
        aria-label="Close task modal"
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        onKeyDown={(e) => {
          if (e.key === "Escape" || e.key === "Enter") onClose();
        }}
      />

      <div className="relative z-70 w-full max-w-lg mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
              <FileText size={18} />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Create Task</h3>
              <div className="text-xs opacity-80">
                Add a task to{" "}
                <span className="font-medium">
                  {project?.name ?? "this project"}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-2 rounded-md hover:bg-white/10"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSave} className="p-5 space-y-4 bg-white">
          <div>
            <label
              htmlFor="task-title"
              className="block text-sm font-medium text-gray-700"
            >
              Title <span className="text-red-500">*</span>
            </label>
            <input
              id="task-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-2 w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="e.g. Design landing page hero"
            />
          </div>

          <div>
            <label
              htmlFor="task-desc"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="task-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-2 w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              rows={4}
              placeholder="More details about this task (optional)"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="task-assignee"
                className="block text-sm font-medium text-gray-700"
              >
                Assignee <span className="text-red-500">*</span>
              </label>
              <div className="mt-2 relative">
                <div className="absolute left-3 top-2 text-gray-400">
                  <User size={16} />
                </div>
                <input
                  id="task-assignee"
                  list="assignees"
                  value={assigneeInput}
                  onChange={(e) => setAssigneeInput(e.target.value)}
                  className="pl-10 pr-3 w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  placeholder="Search or type a name"
                  required
                />
                <datalist id="assignees">
                  {members.map((m) => (
                    <option key={m.id} value={m.name} />
                  ))}
                </datalist>
              </div>
            </div>

            <div>
              <label
                htmlFor="task-due"
                className="block text-sm font-medium text-gray-700"
              >
                Due date
              </label>
              <div className="mt-2 relative">
                <div className="absolute left-3 top-2 text-gray-400">
                  <Calendar size={16} />
                </div>
                <input
                  id="task-due"
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="pl-10 pr-3 w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-200 text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md hover:brightness-105"
            >
              Save Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

TaskModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onSave: PropTypes.func,
  project: PropTypes.object,
};

TaskModal.defaultProps = {
  open: false,
  onClose: () => {},
  onSave: () => {},
  project: null,
};

export default TaskModal;
