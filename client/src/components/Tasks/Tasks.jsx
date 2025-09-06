import {
  Filter,
  SortAsc,
  Group,
  LayoutList,
  Calendar,
  Timer,
  Users,
  MessageSquare,
  BarChart2,
  ClipboardList,
  Plus,
  Eye,
  MessageCircle,
  Edit,
  Save,
} from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { format } from "date-fns";

// Helper to decode JWT and get userId
const getUserIdFromToken = () => {
  try {
    const token = localStorage.getItem("jwt_token");
    if (!token) return null;
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.userId || payload.id || payload.sub;
  } catch {
    return null;
  }
};

const tagColors = {
  High: "bg-red-100 text-red-600",
  Medium: "bg-orange-100 text-orange-600",
  Low: "bg-green-100 text-green-600",
  Marketing: "bg-pink-100 text-pink-600",
  "Figma Design": "bg-blue-100 text-blue-600",
  Backend: "bg-purple-100 text-purple-600",
  Content: "bg-yellow-100 text-yellow-600",
};

const userAvatars = [
  "https://randomuser.me/api/portraits/men/32.jpg",
  "https://randomuser.me/api/portraits/women/44.jpg",
  "https://randomuser.me/api/portraits/men/54.jpg",
  "https://randomuser.me/api/portraits/women/65.jpg",
];

const statusColumns = [
  { label: "To Do" },
  { label: "In progress" },
  { label: "In Review" },
];

const Tasks = ({ projectId, assigneeId }) => {
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editStatus, setEditStatus] = useState("");
  const userId = getUserIdFromToken();

  // Fetch tasks by project, assignee, or all
  useEffect(() => {
    const fetchTasks = async () => {
      let url = `${import.meta.env.VITE_BASE_URL}/tasks`;
      if (projectId)
        url = `${import.meta.env.VITE_BASE_URL}/tasks/project/${projectId}`;
      else if (assigneeId)
        url = `${import.meta.env.VITE_BASE_URL}/tasks/assignee/${assigneeId}`;
      try {
        const res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
          },
        });
        setTasks(res.data.data || []);
      } catch (err) {
        toast.error("Failed to fetch tasks");
      }
    };
    fetchTasks();
  }, [projectId, assigneeId]);

  // Edit task logic
  const startEdit = (task) => {
    setEditingTaskId(task.id);
    setEditTitle(task.title);
    setEditDesc(task.description);
    setEditStatus(task.status);
  };

  const saveEdit = async (task) => {
    // Only allow if user is assignee
    if (userId !== task.assigneeId) {
      toast.error("You are not allowed to update this task.");
      return;
    }
    try {
      await axios.put(
        `${import.meta.env.VITE_BASE_URL}/tasks/${task.id}`,
        {
          title: editTitle,
          description: editDesc,
          status: editStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
          },
        }
      );
      toast.success("Task updated!");
      setEditingTaskId(null);
      // Refresh tasks
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/tasks/project/${task.projectId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
          },
        }
      );
      setTasks(res.data.data || []);
    } catch (err) {
      toast.error("Failed to update task.");
    }
  };

  const getTasksByStatus = (status) =>
    tasks.filter((task) => {
      if (status === "To Do") return task.status === "TODO";
      if (status === "In progress") return task.status === "IN_PROGRESS";
      if (status === "In Review") return task.status === "IN_REVIEW";
      return false;
    });

  // Enhanced card UI
  return (
    <div className="p-2 sm:p-4 lg:p-6 bg-gradient-to-br from-purple-50 via-white to-blue-50 min-h-screen">
      <div className="flex flex-wrap items-center gap-2 sm:gap-4 lg:gap-6 mb-4 sm:mb-6">
        <button className="flex items-center gap-2 text-gray-700 font-medium">
          <ClipboardList size={20} />
          Overview
        </button>
        <button className="flex items-center gap-2 text-gray-700 font-medium">
          <LayoutList size={20} />
          Board
        </button>
        <button className="flex items-center gap-2 text-gray-700 font-medium">
          List
        </button>
        <button className="flex items-center gap-2 text-gray-700 font-medium">
          <Calendar size={20} />
          Calendar
        </button>
        <button className="flex items-center gap-2 text-gray-700 font-medium">
          <Timer size={20} />
          Time-line
        </button>
        <button className="flex items-center gap-2 text-gray-700 font-medium">
          <BarChart2 size={20} />
          Workload
        </button>
        <button className="flex items-center gap-2 text-gray-700 font-medium">
          <MessageSquare size={20} />
          Message
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-2 sm:mb-4">
        <button className="flex items-center gap-2 px-2 py-1 sm:px-3 rounded bg-gray-100 text-gray-700 text-xs sm:text-sm">
          <Filter size={16} />
          Filter
        </button>
        <button className="flex items-center gap-2 px-2 py-1 sm:px-3 rounded bg-gray-100 text-gray-700 text-xs sm:text-sm">
          <SortAsc size={16} />
          Sort
        </button>
        <button className="flex items-center gap-2 px-2 py-1 sm:px-3 rounded bg-gray-100 text-gray-700 text-xs sm:text-sm">
          <Group size={16} />
          Group
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {statusColumns.map((col) => (
          <div key={col.label}>
            <div className="flex items-center justify-between mb-2 sm:mb-4">
              <span className="font-semibold text-base sm:text-lg">
                {col.label}
              </span>
              <span className="text-gray-500">
                {getTasksByStatus(col.label).length}
              </span>
              <button className="ml-auto text-gray-400 hover:text-gray-700">
                <Plus size={18} />
              </button>
            </div>
            <div className="space-y-2 sm:space-y-4">
              {getTasksByStatus(col.label).map((task) => (
                <div
                  key={task.id}
                  className="bg-white rounded-2xl shadow-lg border p-5 transition hover:shadow-xl"
                >
                  <div className="flex items-center gap-2 mb-2">
                    {task.tags &&
                      task.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`px-2 py-0.5 rounded text-xs font-semibold mr-2 ${
                            tagColors[tag] || "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    <span className="ml-auto text-xs font-bold text-gray-400">
                      #{task.id}
                    </span>
                  </div>
                  {editingTaskId === task.id ? (
                    <>
                      <input
                        className="font-semibold text-base mb-2 w-full border rounded px-2 py-1"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                      />
                      <textarea
                        className="text-gray-500 text-sm mb-2 w-full border rounded px-2 py-1"
                        value={editDesc}
                        onChange={(e) => setEditDesc(e.target.value)}
                      />
                      <select
                        className="mb-2 px-2 py-1 rounded border w-full"
                        value={editStatus}
                        onChange={(e) => setEditStatus(e.target.value)}
                      >
                        <option value="TODO">To Do</option>
                        <option value="IN_PROGRESS">In Progress</option>
                        <option value="IN_REVIEW">In Review</option>
                        <option value="COMPLETED">Completed</option>
                      </select>
                      <button
                        className="flex items-center gap-2 px-4 py-2 rounded bg-green-600 text-white font-semibold shadow hover:bg-green-700"
                        onClick={() => saveEdit(task)}
                        type="button"
                      >
                        <Save size={16} />
                        Save
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="font-semibold text-lg mb-1">
                        {task.title}
                      </div>
                      <div className="text-gray-500 text-sm mb-2">
                        {task.description}
                      </div>
                      <div className="flex flex-wrap gap-2 mb-2">
                        <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs">
                          Status:{" "}
                          <span className="font-semibold">{task.status}</span>
                        </span>
                        <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">
                          Due:{" "}
                          {task.dueDate
                            ? format(new Date(task.dueDate), "dd MMM yyyy")
                            : "No due"}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-2">
                        <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded text-xs">
                          Project: {task.project?.name || "N/A"}
                        </span>
                        <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs flex items-center gap-1">
                          <Users size={14} />
                          Assignee: {task.assignee?.name || "Unassigned"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex -space-x-2">
                          <img
                            src={
                              userAvatars[
                                ((task.assigneeId || 1) - 1) %
                                  userAvatars.length
                              ]
                            }
                            alt="User"
                            className="w-7 h-7 rounded-full border-2 border-white shadow"
                          />
                        </div>
                        <div className="flex items-center gap-4 text-gray-400">
                          <Eye size={16} />
                          <span className="text-xs">{task.views || 0}</span>
                          <MessageCircle size={16} />
                          <span className="text-xs">{task.comments || 0}</span>
                          {userId === task.assigneeId && (
                            <button
                              className="ml-2 text-blue-600 hover:text-blue-800"
                              onClick={() => startEdit(task)}
                              type="button"
                            >
                              <Edit size={16} />
                            </button>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div>
        {/* Toasts are handled globally via App-level ToastContainer */}
      </div>
    </div>
  );
};

export default Tasks;
